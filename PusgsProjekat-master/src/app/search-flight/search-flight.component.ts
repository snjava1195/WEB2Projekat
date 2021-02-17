import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, NgForm, FormGroup, FormControl} from "@angular/forms";
import { SearchFlightService} from './search-flight.service';
import { Observable } from 'rxjs';
import {FlightSearch} from './flight-search';
import { DatePipe } from '@angular/common';
import { Flight } from '../companies/flight';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-search-flight',
  templateUrl: './search-flight.component.html',
  styleUrls: ['./search-flight.component.css']
})
export class SearchFlightComponent implements OnInit {

  
  
  
  //public Pravac: {name: string}[] = [];
  allClasses: Array<Class>;
  allPravci: Array<Pravac>;
  allFlights: Observable<Flight[]>;
  searchFlightForm: any;
  datumPoletanja: any;
    datumSletanja: any;
    dataSaved = false;
    message=null;
    SelClass: string;
    SelPravac: string;
    id: string;
  constructor(private formbulider: FormBuilder, private searchFlightService:SearchFlightService, private datePipe: DatePipe, private activatedroute: ActivatedRoute) { 
    this.activatedroute.paramMap.subscribe(data => {
      this.id = data.get('id');
    })
  }

  ngOnInit(): void {
    this.allClasses =  [{ name:'nesto'}, { name:'nestodrugo'}]
    this.allPravci = [{name: 'Jedan pravac'}, {name: 'Povratna'}];
    this.searchFlightForm = this.formbulider.group({
      //   UserId: ['', [Validators.required]],
      DatumPoletanja: ['', [Validators.required]],
      DatumSletanja: ['', [Validators.required]],
      MestoPoletanja: ['', [Validators.required]],
      MestoSletanja: ['', [Validators.required]],
      Class: ['', [Validators.required]],
      Pravac: ['', [Validators.required]],
      BrojPutnika: ['', [Validators.required]],
        

       });
  }
  GetSearchResults()
  {
    this.allFlights = this.searchFlightService.getSearchResults();
  }
  onFormSubmit() {  
    this.dataSaved = false;  
    const flight = this.searchFlightForm.value;  
    //airline.AdminId = this.SelAdminId;
    this.CreateAirline(flight);  
    debugger;
   // this.reserveFlight();

    this.searchFlightForm.reset();  
  }  

  CreateAirline(airline: FlightSearch) {  
    
      debugger;
 
     airline.DatumPoletanja = this.datePipe.transform(this.datumPoletanja, 'short');
     airline.DatumSletanja = this.datePipe.transform(this.datumSletanja, 'short');
    airline.Klasa = this.SelClass;
    airline.Pravac = this.SelPravac;
      airline.Klasa = this.SelClass ; 
       this.searchFlightService.searchFlight(airline.DatumPoletanja, airline.DatumSletanja, airline.MestoPoletanja, airline.MestoSletanja, airline.Klasa, airline.Pravac, airline.BrojPutnika).subscribe(  
        () => {  
            
          this.dataSaved = true;  
          this.message = 'Record saved Successfully';  
          //this.GetSearchResults();
          //this.loadAllAirlines();
          //this.flightIdUpdate = null;  
          this.searchFlightForm.reset();  
         // this.dat.reset();
        }  
      );  
      this.allFlights = this.searchFlightService.searchFlight(airline.DatumPoletanja, airline.DatumSletanja, airline.MestoPoletanja, airline.MestoSletanja, airline.Klasa, airline.Pravac, airline.BrojPutnika);
      
    }  
    
    reserveFlight(flightId: Int16Array)
    {
      debugger;
      this.searchFlightService.reserveFlight(flightId, this.id).subscribe(()=>{
        this.dataSaved = true;
      });
      
    }
      
  

}

export class Class{
  name: string
  constructor(name)
  {
    this.name = name;
  }
}

export class Pravac{
  name: string
  constructor(name)
    {
      this.name = name;
    }
}
