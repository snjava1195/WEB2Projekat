import { Component, OnInit } from "@angular/core";
import { RentACar } from "src/app/companies/rent-a-car";
import { RentACarService } from "src/app/companies/rent-a-car.service";
import { Car } from './car';
import { CarService } from "src/app/companies/car.service"; 
import { Observable } from 'rxjs';
import { BranchOfficeService } from "./branch.office.service";
import { TagPlaceholder } from "@angular/compiler/src/i18n/i18n_ast";

@Component({
    selector: 'rent-a-car',
    templateUrl: '../companies/rent-a-car.component.html',
    styleUrls: ['./rent-a-car.component.css']
})

export class RentACarComponent implements OnInit {
    rentaCarForm: any;

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
        private branchOfficeService: BranchOfficeService){
        this.selectedRentACar = new RentACar('','','', 0);
        
        this.carToSearch = '';
        this.donesearch = false;
    }


    ngOnInit(): void {
        this.loadRentACars();
    }

    loadRentACars(){
        this.rentACars = this.rentACarService.getRentaCars();
    } 

    onSelect(rc: RentACar): void{
        this.selectedRentACar = rc;
        this.selectedRentACar.Cars = this.carService.getCars();  
        this.selectedRentACar.BranchOffices = this.branchOfficeService.getBranchOffices();        
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

       
    }




    getRentaCar(car: Car): void {
       this.rentACarService.getRentaCarById(car.RentaCarId).subscribe(
           (val) => {
               this.foundAtRentaCar = val.Name;
       });
       this.donesearch = true;  
    }


    
}