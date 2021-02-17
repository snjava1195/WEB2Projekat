import {Injectable} from '@angular/core';
import { HttpHeaders } from '@angular/common/http'; 
import { Observable } from 'rxjs'; 
import { HttpClient } from "@angular/common/http";
import {FlightSearch} from './flight-search';
import {Flight} from '../companies/flight';
import { Console } from 'console';
import { logging } from 'protractor';
import { ShowReservations } from '../show-reservations/show-reservations';

@Injectable({
    providedIn : 'root'    
})

export class SearchFlightService{
    url = 'https://localhost:44325/api/SearchFlight';
    constructor(private http: HttpClient){}

    searchFlight(datumPoletanja:string, datumSletanja:string, mestoPoletanja:string, mestoSletanja:string, klasa:string, pravac:string, brojPutnika:Int16Array): Observable<ShowReservations[]> {  
        const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };  
        return this.http.get<ShowReservations[]>(this.url + '/SearchFlightDetails?datumPoletanja=' + datumPoletanja + '&datumSletanja=' + datumSletanja + '&mestoPoletanja=' + mestoPoletanja + '&mestoSletanja=' + mestoSletanja + '&klasa=' + klasa + '&pravac=' + pravac + '&brojPutnika=' + brojPutnika, httpOptions);  
      }  

    getSearchResults()
    {
        const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };  
        return this.http.get<ShowReservations[]>(this.url+'/GetSearchResults', httpOptions);
    }

    reserveFlight(flightId: Int16Array, userId:string, price:BigInt)
    {
        debugger;
        
        const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };  
        // return this.http.post<Int16Array>(this.url + '/ReserveFlight', httpOptions);
        return this.http.post<Int16Array>(this.url + '/ReserveFlight?flightId=' + flightId + '&userId=' + userId + '&price=' + price, httpOptions); 
        
    }

    getReservations(userId:string)
    {
        debugger;
        const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };  
        return this.http.get<ShowReservations[]>(this.url + '/GetReservations?userId=' + userId, httpOptions);
    }

    cancelReservation(userId:string, flightId:Int16Array)
    {
        debugger;
        const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };
        return this.http.delete<number>(this.url + '/CancelReservation?userId=' + userId + '&flightId=' + flightId,httpOptions);
    }
}