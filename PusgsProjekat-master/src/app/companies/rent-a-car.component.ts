import { Component, OnInit } from "@angular/core";
import { RentACar } from "src/app/companies/rent-a-car";
import { RentACarService } from "src/app/companies/rent-a-car.service";
import { Car } from './car';
import { CarService } from "src/app/companies/car.service"; 
import { Observable } from 'rxjs';
import { BranchOfficeService } from "./branch.office.service";
import { TagPlaceholder } from "@angular/compiler/src/i18n/i18n_ast";
import { threadId } from "worker_threads";

@Component({
    selector: 'rent-a-car',
    templateUrl: '../companies/rent-a-car.component.html',
    styleUrls: ['./rent-a-car.component.css']
})

export class RentACarComponent implements OnInit {
    rentACars: Observable<RentACar[]>;
    selectedRentACar: RentACar;

    rentaCar: Observable<RentACar>;
    foundAtRentaCar: string;
    foundCars: Observable<Car[]>;

    donesearch: boolean;
    carToSearch: any;
    selectedCar: Car;

    by: any;
    minPrice: any;
    maxPrice: any;

    constructor(private rentACarService: RentACarService, private carService: CarService, 
        private branchOfficeService: BranchOfficeService){}


    ngOnInit(): void {
        this.loadRentACars();

        this.selectedRentACar = null;       
        this.selectedCar = null;
        this.carToSearch = '';
        this.donesearch = false;
    }

    onReset(){
        this.selectedRentACar = null;       
        this.selectedCar = null;
        this.carToSearch = '';
        this.donesearch = false;

        this.by = null;   
        this.maxPrice = null;
        this.minPrice = null;
    }

    loadRentACars(){
        this.rentACars = this.rentACarService.getRentaCars();
    } 

    onSelect(rc: RentACar): void{
        this.selectedRentACar = rc;
        this.selectedRentACar.Cars = this.carService.getCarsFromRentaCar(rc.Id);  
        this.selectedRentACar.BranchOffices = this.branchOfficeService.getBranchOfficesFromRentaCar(rc.Id);       
    }


    doSearchCar() : void{     

       if(this.by == 'name')
        this.foundCars = this.carService.getCarByName(this.carToSearch);
        else{
            if(this.by == 'rate')
            this.foundCars = this.carService.getCarByRate(this.carToSearch); 
    
            else{
                if(this.by == 'price'){
                    if(this.minPrice == null)
                        this.minPrice = 0;
            
                    if(this.maxPrice == null) 
                        this.maxPrice = 1000;   
            
                    this.foundCars = this.carService.getCarByPrice(this.minPrice, this.maxPrice);
                
            }
        }

       }     
        this.by = null;   
        this.maxPrice = null;
        this.minPrice = null;

        this.donesearch = true; 
    }




    getRentaCar(car: Car): void {
       this.rentACarService.getRentaCarById(car.RentaCarId).subscribe(
           (val) => {
               this.foundAtRentaCar = val.Name;
       });

       this.selectedCar = car; 
    }


    
}