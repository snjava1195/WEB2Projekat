import { Component, OnInit } from '@angular/core';
import { UserService } from './../users/user.service';
import { User } from './../users/user';
import { CookieService } from 'ngx-cookie-service';
import { ReserveCarService } from '../reserve-car/reserve-car.service';
import { CarReservation } from '../reserve-car/car-reservation';
import { Observable } from 'rxjs';
import { Car } from '../companies/car';
import { CarService } from '../companies/car.service';
import { RentACarService } from '../companies/rent-a-car.service';
import { RentACar } from '../companies/rent-a-car';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})


export class UserDashboardComponent{

  loggedUser: User;
  username: string;

  carReservations: Observable<CarReservation[]>;

  selectedCarReservation: CarReservation;
  rentaCarName: string;
  rentaCarId: Int16Array;
  rentaCarRate: number;
  id: any;

  showCarReservation : boolean;
  selectedCar: Car;
  selectedRentaCar: RentACar;
  price: number;
  message: string;
  rate: number;
  past: boolean;
  stillOnTime: boolean;
  
  constructor(private userService: UserService, private cookieService: CookieService, 
              private reserveCarService: ReserveCarService, private carService: CarService, 
              private rentaCarService: RentACarService, private activatedroute: ActivatedRoute){
                this.activatedroute.params.subscribe(data => {
                  this.id = data;
                  console.log(data);
                })
                 }
            

            

  ngOnInit(): void{
    this.getLoggedUser();
    this.selectedCarReservation = null;
    
    this.rentaCarName = '';
    this.selectedCar = new Car();
    this.selectedRentaCar = new RentACar();
    this.price = 0;
    this.rentaCarRate = 0;
    this.message = '';
    this.rate = 0;
    this.past = false;
    this.stillOnTime = false;
  }


  onReset(){
    this.getLoggedUser();
    this.selectedCarReservation = null;
    
    this.rentaCarName = '';
    this.selectedCar = new Car();
    this.selectedRentaCar = new RentACar();
    this.price = 0;
    this.rentaCarRate = 0;
    this.message = '';
    this.rate = 0;
    this.past = false;
    this.stillOnTime = false;
  }

  
  logout(){
    this.loggedUser = null;
    this.cookieService.delete('loggedId');
  }

  getLoggedUser() {
    if(this.cookieService.check('loggedId')){
      this.userService.getUserById(this.cookieService.get('loggedId')).subscribe(
        (val) => {
          this.loggedUser = val;
          this.username = val.Name;

          // flight reservations
          this.carReservations = this.reserveCarService.getUsersCarReservations(val.UserId);
        });
    }

  }
  




  onSelectCarReservation(cr: CarReservation){
      this.selectedCarReservation = cr;      
      
      this.price  = cr.Price;

       this.carService.getCarById(cr.CarId).subscribe(
          (val) =>{
            this.selectedCar = val;
            console.log(this.selectedCar.Name);
            this.showCarReservation = true;
            
               this.rentaCarService.getRentaCarById(val.RentaCarId).subscribe(
                (v) => {
                   this.selectedRentaCar = v;
                   this.rentaCarName = v.Name;
                   this.rentaCarRate = v.Rate;
                });

          });

       this.reserveCarService.isCarReservationPast(cr.Id).subscribe(
          (val) => {
                this.past = val;
          });

       this.reserveCarService.minTwoDaysLeft(cr.Id).subscribe(
          (val) => {
              this.stillOnTime = val;
          });
  }





  rateRentaCar(){ 
    var newRate: number =
    newRate =  Number.parseInt((this.selectedRentaCar.Rate * this.selectedRentaCar.RatedBy).toString())
              + Number.parseInt(this.rate.toString());
    this.selectedRentaCar.RatedBy++;
    this.selectedRentaCar.Rate = Number.parseFloat(( newRate/this.selectedRentaCar.RatedBy).toFixed(2) )  ;
    this.rentaCarRate = this.selectedRentaCar.Rate;
  
    this.rentaCarService.updateRentaCar(this.selectedRentaCar).subscribe(
      () =>{
        this.message = 'Rent-a-car is rated.';
        this.rate = 0;
      }
    );
  }


  rateCar(){  
    var newRate: number = 
    Number.parseInt((this.selectedCar.Rate * this.selectedCar.RatedBy).toString())
    + Number.parseInt(this.rate.toString());

    this.selectedCar.RatedBy ++;
    this.selectedCar.Rate = Number.parseFloat(( newRate / this.selectedCar.RatedBy).toFixed(2));
  
    this.carService.updateCar(this.selectedCar).subscribe(
      () =>{
        this.message = 'Car is rated.';
        this.rate = 0;        
      }
    );
     
  }


  cancelCarReservation(){
    this.reserveCarService.deleteCarReservation(this.selectedCarReservation.Id).subscribe(
      () => {
          this.message = "Your reservation has been canceled.";         
      });
  }


}
