import { Component, OnInit } from "@angular/core";
import { Observable } from 'rxjs';
import { FormBuilder, Validators, NgForm, FormGroup, FormControl} from "@angular/forms";
import {FlightService} from "./flight.service";
import { Flight } from './flight';
import{MatDatepickerModule} from '@angular/material/datepicker';
import { DatePipe } from '@angular/common';
import {Airline} from './airline';
@Component({
    selector: 'flights',
    templateUrl: '../companies/flight.component.html',
    styleUrls: ['./airline.component.css']
})

export class FlightComponent implements OnInit {

   
        dataSaved = false;
    flightForm: any;
    allFlights: Observable<Flight[]>;
    flightIdUpdate=null;
    message=null;
    
    datumPoletanja: any;
    datumSletanja: any;
    SelAirlineId:Int16Array;
    _allAirlineIds: Observable<Airline[]>;
   
    constructor(private formbulider: FormBuilder, private addFlightService:FlightService, private datePipe: DatePipe) { }

    ngOnInit():void{
        this.flightForm = this.formbulider.group({
        DatumPoletanja: ['', [Validators.required]],
        DatumSletanja: ['', [Validators.required]],
       VremeTrajanjaLeta: ['', [Validators.required]],
       DuzinaPutovanja: ['', [Validators.required]],
       BrojPresedanja: ['', [Validators.required]],
       Cena: ['', [Validators.required]],
       MestoPoletanja: ['', [Validators.required]],
       MestoSletanja: ['', [Validators.required]],
       AirlineAdmin: ['', [Validators.required]]

        });
        this.FillAirlineIds();
        this.loadAllAirlines();
       
    }

    FillAirlineIds()
      {
        debugger;
        this._allAirlineIds = this.addFlightService.getAllAirlineIds();
      }
    loadAllAirlines(){
        this.allFlights = this.addFlightService.getAllAirlines();
    }
    onFormSubmit() {  
        this.dataSaved = false;  
        const flight = this.flightForm.value;  
        //airline.AdminId = this.SelAdminId;
        this.CreateAirline(flight);  
        this.flightForm.reset();  
      }  
      loadAirlineToEdit(userId: Int16Array) {  
        this.addFlightService.getAirlineById(userId).subscribe(flight=> {  
          this.message = null;  
          this.dataSaved = false;  
          this.flightIdUpdate = flight.Id;  
          //this.flightForm.get('UserId').setValue(airline.Id);  
         this.flightForm.get('DatumPoletanja').setValue(flight.DatumPoletanja);  
          this.flightForm.get('DatumSletanja').setValue(flight.DatumSletanja);  
          this.flightForm.get('VremeTrajanjaLeta').setValue(flight.VremeTrajanjaLeta);  
          this.flightForm.get('DuzinaPutovanja').setValue(flight.DuzinaPutovanja);
          this.flightForm.get('BrojPresedanja').setValue(flight.BrojPresedanja);
          this.flightForm.get('Cena').setValue(flight.Cena);
          this.flightForm.get('MestoPoletanja').setValue(flight.MestoPoletanja);
          this.flightForm.get('MestoSletanja').setValue(flight.MestoSletanja);
        });  
      
      }  
      CreateAirline(airline: Flight) {  
        if (this.flightIdUpdate == null) {
          debugger;
     
         airline.DatumPoletanja = this.datePipe.transform(this.datumPoletanja, 'short');
         airline.DatumSletanja = this.datePipe.transform(this.datumSletanja, 'short');
 
          airline.IdAvioKompanije = this.SelAirlineId ; 
          this.addFlightService.createAirline(airline).subscribe(  
            () => {  
                
              this.dataSaved = true;  
              this.message = 'Record saved Successfully';  
              this.loadAllAirlines();
              this.flightIdUpdate = null;  
              this.flightForm.reset();  
             // this.dat.reset();
            }  
          );  
        } else {  
          airline.Id = this.flightIdUpdate;  
          this.addFlightService.updateAirline(airline).subscribe(() => {  
            this.dataSaved = true;  
            this.message = 'Record Updated Successfully';  
            this.loadAllAirlines();  
            this.flightIdUpdate = null;  
            this.flightForm.reset();  
          });  
        }  
      }   
      deleteUser(airlineId: Int16Array) {  
        if (confirm("Are you sure you want to delete this ?")) {   
        this.addFlightService.deleteAirlineById(airlineId).subscribe(() => {  
          this.dataSaved = true;  
          this.message = 'Record Deleted Succefully';  
          this.loadAllAirlines();  
          this.flightIdUpdate = null;  
          this.flightForm.reset();  
      
        });  
      }  
    }  
      resetForm() {  
        this.flightForm.reset();  
        this.message = null;  
        this.dataSaved = false;  
      }
      
  

    }
  
  