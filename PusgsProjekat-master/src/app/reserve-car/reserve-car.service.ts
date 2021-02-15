import { CarReservation } from './car-reservation';
import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs'; 

@Injectable({
    providedIn: 'root'
})

export class ReserveCarService{

    constructor(private http: HttpClient){}

    url = 'https://localhost:44325/api/CarReservation';

    getCarReservations(): Observable<CarReservation[]> {
        return this.http.get<CarReservation[]>(this.url + '/AllCarReservations');
    }


    createCarReservation(data: CarReservation): Observable<CarReservation>{
       const httpOptions = {headers: new HttpHeaders({'Content-Type': 'application/json'} ) };
       return this.http.post<CarReservation>(this.url + '/InsertCarReservation', data  , httpOptions);
    }

    isCarReserved(carId: Int16Array, dateFrom: Date, dateTo: Date) : Observable<boolean>{
        return this.http.get<boolean>(this.url + '/IsCarReserved?carId=' + carId + 
        '&dateFrom=' + JSON.stringify(dateFrom) + '&dateTo=' + JSON.stringify(dateTo) );
    }




}