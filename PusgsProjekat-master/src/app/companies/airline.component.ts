import { Component, OnInit } from "@angular/core";
import { Airline } from "src/app/companies/airline"
import { AirlineService } from "src/app/companies/airline.service";
import { Flight } from './flight';

@Component({
    selector: 'airlines',
    templateUrl: '../companies/airlines.component.html',
    styleUrls: ['./airline.component.css']
})

export class AirlineComponent {

    airlines: Array<Airline>;
    selectedAirline: Airline;
    flights : Array<Flight>;

    num: number;

    toSearch: string;
    afterSearch: string;
    airline: Airline;

    constructor(private airlineService: AirlineService){
        this.airlines = new Array<Airline>();
        this.selectedAirline = new Airline('',0,'','');
      
        this.flights = new Array<Flight>();
       
        this.toSearch = '';
    }

    loadAirlines() : void{
        this.airlines = this.airlineService.loadAirlines();
    }

    onSelect(ac: Airline): void{
        this.selectedAirline = ac;
        this.num = Math.random() * 5;
    }

    loadFlights() : void{
        this.selectedAirline.flights = this.airlineService.loadFlights().slice(this.num, this.num+5);
    }

    doSearch() : void{  
     this.afterSearch = "Ne postoji takva aviokompanija.";  

        for(let i = 0; i< this.airlineService.loadAirlines().length; i++){           
         this.airline = this.airlineService.loadAirlines()[i] ;
             
            if( this.airline.name === this.toSearch){
                 this.afterSearch  = "Aviokompanija koju ste tražili: " + this.airline.name;
            }
        }
     }

}