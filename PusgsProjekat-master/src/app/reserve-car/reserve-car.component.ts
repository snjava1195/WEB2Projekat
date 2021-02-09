import { Component, OnInit } from "@angular/core";
import { RentACar } from "src/app/companies/rent-a-car";
import { RentACarService } from "src/app/companies/rent-a-car.service";
import { Car } from 'src/app/companies/car';
import { CarService } from "src/app/companies/car.service"; 
import { from, Observable } from 'rxjs';
import { BranchOfficeService } from "src/app/companies/branch.office.service";
import { FormBuilder, Validators, NgForm, FormGroup, FormControl, ReactiveFormsModule} from "@angular/forms";
import { ThrowStmt } from "@angular/compiler";
import { ActivatedRoute, NavigationEnd, Router } from "@angular/router";

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

    showResForm: boolean;


constructor( private rentACarService: RentACarService, 
    private carService: CarService, private branchOfficeService: BranchOfficeService, 
    private fb: FormBuilder ){}

ngOnInit(): void{


    this.loadRentaCars();

     this.parameter = null;
     this.foundRentaCars = null;
     this.selectedRentaCar = null;
     this.rentaCarToSearch = null;
     this.donerentacarsearch = false;
     this.donecarsearch = false;
     this.showResForm = false;

     this.cars = null; 

     this.reservationForm = this.fb.group({
        Type: ['', [Validators.required]],
        DateFrom: ['', [Validators.required]],
        BranchOfficeFrom: ['', [Validators.required]],
        DateTo: ['', [Validators.required]],
        BranchOfficeTo: ['', [Validators.required]]
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
}


loadRentaCars(){
  this.rentaCars = this.rentACarService.getRentaCars();                        
} 



onSelect(rc: RentACar): void{
    this.selectedRentaCar = rc;
    this.selectedRentaCar.Cars = this.carService.getCarsFromRentaCar(rc.Id);
    this.selectedRentaCar.BranchOffices = this.branchOfficeService.getBranchOfficesFromRentaCar(rc.Id);  
    
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
    this.cars = this.carService.getSearchedCars( this.reservationForm.get('Type').value, this.selectedRentaCar.Id);
    this.donecarsearch = true;
}

showCar(car: Car){
       this.selectedCar = car;

     //  this.donecarsearch = true;
}
 
 
onSelectCar(car: Car) : void {
     this.selectedCar = car;
}


reserveCar(){
 /// id ulogovanog korisnika is session
    console.log('rezervisan je ' + this.selectedCar.Name);
}





}