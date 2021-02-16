import { Component, OnInit } from "@angular/core";
import { RentACar } from "src/app/companies/rent-a-car";
import { RentACarService } from "src/app/companies/rent-a-car.service";
import { Car } from 'src/app/companies/car';
import { CarService } from "src/app/companies/car.service"; 
import { from, Observable, forkJoin } from 'rxjs';
import { BranchOfficeService } from "src/app/companies/branch.office.service";
import { FormBuilder, Validators, NgForm, FormGroup, FormControl, ReactiveFormsModule} from "@angular/forms";
import { ThrowStmt } from "@angular/compiler";
import { ActivatedRoute, NavigationEnd, Router } from "@angular/router";
import { BranchOffice } from "../companies/branch.office";
import { CookieService } from "ngx-cookie-service";
import { User } from "../users/user";
import { UserService } from "../users/user.service";
import { ReserveCarService } from "./reserve-car.service";
import { CarReservation } from "./car-reservation";

@Component({
    selector: 'reserve-car',
    templateUrl: './reserve-car.component.html',
    styleUrls: ['../../../src/app/companies/rent-a-car.component.css']
})


export class ReserveRentaCarComponent implements OnInit{

    rentaCars: Observable<RentACar[]>;
    foundRentaCars: Observable<RentACar[]>;
    selectedRentaCar: RentACar;
    rentaCarToSearch: string;
    donerentacarsearch: boolean;
    donecarsearch: boolean;
    parameter: any;

    reservationForm: any;
    selectedCar: Car;
    cars: Observable<Car[]>;

    branchOffices: Observable<BranchOffice[]>;

    showResForm: boolean;

    loggedUser: User;
    carReservation: CarReservation;
    message = null;

    fullPrice: number;

constructor(private fb: FormBuilder, private rentACarService: RentACarService, 
    private carService: CarService, private branchOfficeService: BranchOfficeService, 
    private cookieService: CookieService, private userService: UserService, 
    private reserveCarService: ReserveCarService ){}

ngOnInit(): void{

    this.loadRentaCars();
    this.getLoggedUser();

     this.parameter = null;
     this.foundRentaCars = null;
     this.selectedRentaCar = null;
     this.rentaCarToSearch = null;
     this.donerentacarsearch = false;
     this.donecarsearch = false;
     this.showResForm = false;

     this.cars = null; 
     this.loggedUser = null;
     this.carReservation = null;
     this.fullPrice = 0;

     this.reservationForm = this.fb.group({
        Type: ['', [Validators.required]],
        DateFrom: ['', [Validators.required]],
        BranchOfficeFrom: ['', [Validators.required]], 
        DateTo: ['', [Validators.required]],
        BranchOfficeTo: ['', [Validators.required]], 
        Passengers: ['', Validators.required],
        MinPrice: [''],
        MaxPrice: ['']
      }); 
          
}


onReset() {
    this.parameter = null;
    this.foundRentaCars = null;
    this.selectedRentaCar = null;
    this.rentaCarToSearch = null;
    this.donerentacarsearch = false;
    this.donecarsearch = false;

    this.cars = null;
    this.selectedCar = null;
    this.reservationForm.reset();
    this.showResForm = false;
    this.message = null;
    this.fullPrice = 0;
}


loadRentaCars(){
  this.rentaCars = this.rentACarService.getRentaCars();
} 



onSelect(rc: RentACar): void{
    this.selectedRentaCar = rc;
    this.selectedRentaCar.Cars = this.carService.getCarsFromRentaCar(rc.Id);
    this.selectedRentaCar.BranchOffices = this.branchOfficeService.getBranchOfficesFromRentaCar(rc.Id);  
    
    this.branchOffices = this.selectedRentaCar.BranchOffices;
    this.showResForm = false;

    this.donecarsearch = false;
    this.cars = null;
    this.selectedCar = null;
}


doSearchRentaCar() : void{
if(this.parameter == 'city')
    this.foundRentaCars = this.rentACarService.getRentaCarByLocation(this.rentaCarToSearch);
else
    this.foundRentaCars = this.rentACarService.getRentaCarByName(this.rentaCarToSearch);


this.donerentacarsearch = true;

}


sortRentaCars() : void{
    if(this.parameter == 'name')
        this.rentaCars = this.rentACarService.sortRentaCarsByName();
    else
        this.rentaCars = this.rentACarService.sortRentaCarsByCity();

}


searchCars(){
    if(!this.reservationForm.get('MinPrice').value )
    this.reservationForm.controls['MinPrice'].setValue(0);

    if(!this.reservationForm.get('MaxPrice').value )
    this.reservationForm.controls['MaxPrice'].setValue(100);

    this.cars = this.carService.getSearchedCars( this.selectedRentaCar.Id, this.reservationForm.get('Type').value,
    this.reservationForm.get('Passengers').value, this.reservationForm.get('MinPrice').value, this.reservationForm.get('MaxPrice').value );

    this.donecarsearch = true;
}



getDays(){
    var dateTo = new Date(this.reservationForm.get('DateTo').value);
    var dateFrom = new Date(this.reservationForm.get('DateFrom').value);
   
    this.fullPrice = this.selectedCar.Price * (dateTo.getDate() - dateFrom.getDate()  );
}

showCar(car: Car){
       this.selectedCar = car;

       this.reservationForm.controls['Type'].setValue(car.Type);
       this.showResForm = true;
}
 


onSelectCar(car: Car) : void {
     this.selectedCar = car;
}


getLoggedUser(){
    this.userService.getUserById(this.cookieService.get('loggedId')).subscribe(
        (val) => {
            this.loggedUser = val;
        });
}




reserveCar(cr: CarReservation){
   
    cr.CarId = this.selectedCar.Id;
    cr.UserId = this.loggedUser.UserId;

    cr.DateFrom = this.reservationForm.get('DateFrom').value;
    cr.DateTo = this.reservationForm.get('DateTo').value;  
        

    cr.CarName = this.selectedCar.Name;
   
    cr.Price = this.fullPrice;    

    this.reserveCarService.isCarReserved(cr.CarId, cr.DateFrom, cr.DateTo).subscribe(
        (val)=>{
            if(val){
                this.message = 'This car is taken. Please, try another one.';
                this.selectedCar = null; 
            }
            else{             
               this.reserveCarService.createCarReservation(cr).subscribe(
                    () => {
                        this.message = 'You reserved the car.';
                         this.selectedCar = null;
                    });                
            }
        });       


}






}