import {Injectable} from '@angular/core';
import { HttpHeaders } from '@angular/common/http'; 
import { Flight } from './flight';
import { Observable } from 'rxjs'; 
import { HttpClient } from "@angular/common/http";
import {Airline} from './airline'
@Injectable({
    providedIn : 'root'    
})

export class FlightService{

   
    url = 'https://localhost:44325/api/Flight';
    url2 = 'https://localhost:44325/api/Airline';
    constructor(private http: HttpClient){}

    getAllAirlines(): Observable<Flight[]> {  
        return this.http.get<Flight[]>(this.url + '/AllFlightDetails');  
      }  
      getAirlineById(airlineId: Int16Array): Observable<Flight> {  
        return this.http.get<Flight>(this.url + '/GetAirlineDetailsById/' + airlineId);  
      }  
      createAirline(airline: Flight): Observable<Flight> {  
        const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };  
        return this.http.post<Flight>(this.url + '/InsertFlightDetails/',  
        airline, httpOptions);  
      }  
      updateAirline(airline: Flight): Observable<Flight> {  
        const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };  
        return this.http.put<Flight>(this.url + '/UpdateAirlineDetails/',  
        airline, httpOptions);  
      }  
      deleteAirlineById(airlineId: Int16Array): Observable<number> {  
        const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };  
        return this.http.delete<number>(this.url + '/DeleteAirlineDetails?id=' +airlineId,  
     httpOptions);  
      }  

      getAllAirlineIds(): Observable<Airline[]>
      {
        return this.http.get<Airline[]>(this.url + '/AirlineList');
      }

      loadFlightsByAirlineId(airlineId: Int16Array): Observable<Flight[]>
      {
        return this.http.get<Flight[]>(this.url+'/AllFlightDetailsById/' + airlineId);
      }
    }