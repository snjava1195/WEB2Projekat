import { Component, OnInit } from "@angular/core";
import { RentACar } from "src/app/companies/rent-a-car";
import { RentACarService } from "src/app/companies/rent-a-car.service";
import { Car } from './car';


@Component({
    selector: 'rent-a-car',
    templateUrl: '../companies/rent-a-car.component.html',
    styleUrls: ['./rent-a-car.component.css']
})

export class RentACarComponent{

    rentACars: Array<RentACar>;
    selectedRentACar: RentACar;
    num: number;

    toSearch: string;
    afterSearch: string;
    c : Car;

    constructor(private rentACarService: RentACarService){
        this.rentACars = new Array<RentACar>();
        this.selectedRentACar = new RentACar('','','',0);

        this.toSearch = '';
    }

    loadRentACars() : void{
        this.rentACars = this.rentACarService.loadRentACars();
    }

    onSelect(rc: RentACar): void{
        this.selectedRentACar = rc;
        this.num = Math.random() * 5;
    }

    loadCars(): void{
        this.selectedRentACar.cars = this.rentACarService.loadCars().slice(this.num, this.num+5);
    }

    doSearch() : void{       
    this.afterSearch = "Ne postoji takvo vozilo."

        for(let i = 0; i< this.rentACarService.loadCars().length; i++){          
        this.c = this.rentACarService.loadCars()[i] ;    
            if( this.c.name === this.toSearch){
                this.afterSearch  = "Vozilo koje ste tražili: " + this.c.name;
            }
 
       }
    }


    
}