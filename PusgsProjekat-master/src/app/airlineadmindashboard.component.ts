import { Component, OnInit } from "@angular/core";
import { Observable } from 'rxjs';
import { FlightService } from "./companies/flight.service";
import { Flight } from './companies/flight';

@Component({
    selector: 'airlineadmindashboards',
    templateUrl: './airlineadmindashboard.component.html',
    styleUrls: ['./airlineadmindashboard.component.css']
})

export class AirlineadmindashboardComponent {

    flights: Observable<Flight[]>;
    selectedFlight: Flight;
    //flights : Array<Flight>;
    
    num: number;

    toSearch: string;
    afterSearch: string;
    flight: Flight;

    constructor(private flightService: FlightService){
        //this.flights = new Observable<Flight[]>();
        //this.selectedAirline = new Airline('',0,'','');
      
       
       
        this.toSearch = '';
    }

    loadAirlines(){
        this.flights = this.flightService.getAllAirlines();            
    }
    

    onSelect(ac: Flight) : void{
        this.selectedFlight = ac;
        this.num = Math.random() * 5;
    }

}