import {Injectable} from '@angular/core';
import { HttpHeaders } from '@angular/common/http'; 
import { Airline } from '../companies/airline';
import { Observable } from 'rxjs'; 
import { HttpClient } from "@angular/common/http";

@Injectable({
    providedIn : 'root'    
})

export class AddAirlineService{

   
    url = 'https://localhost:44325/api/Airline';
    url2 = 'https://localhost:44325/api/Airline';
    constructor(private http: HttpClient){}

    getAllAirlines(): Observable<Airline[]> {  
        return this.http.get<Airline[]>(this.url + '/AllAirlineDetails');  
      }  
      getAirlineById(airlineId: Int16Array): Observable<Airline> {  
        return this.http.get<Airline>(this.url + '/GetAirlineDetailsById/' + airlineId);  
      }  
      createAirline(airline: Airline): Observable<Airline> {  
        const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };  
        return this.http.post<Airline>(this.url + '/InsertAirlineDetails/',  
        airline, httpOptions);  
      }  
      updateAirline(airline: Airline): Observable<Airline> {  
        const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };  
        return this.http.put<Airline>(this.url + '/UpdateAirlineDetails/',  
        airline, httpOptions);  
      }  
      deleteAirlineById(airlineId: Int16Array): Observable<number> {  
        const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };  
        return this.http.delete<number>(this.url + '/DeleteAirlineDetails?id=' +airlineId,  
     httpOptions);  
      }  
  
      

}