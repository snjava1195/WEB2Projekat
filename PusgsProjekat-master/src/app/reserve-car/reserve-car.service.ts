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

    getUsersCarReservations(userId: Int16Array): Observable<CarReservation[]>{
        return this.http.get<CarReservation[]>(this.url + '/GetUsersCarReservations?userId=' + userId);
    }

    createCarReservation(data: CarReservation): Observable<CarReservation>{
       const httpOptions = {headers: new HttpHeaders({'Content-Type': 'application/json'} ) };
       return this.http.post<CarReservation>(this.url + '/InsertCarReservation', data  , httpOptions);
    }

    isCarReserved(carId: Int16Array, dateFrom: Date, dateTo: Date) : Observable<boolean>{
        return this.http.get<boolean>(this.url + '/IsCarReserved?carId=' + carId + 
        '&dateFrom=' + JSON.stringify(dateFrom) + '&dateTo=' + JSON.stringify(dateTo) );
    }

    isCarReservationPast(rcId: Int16Array) : Observable<boolean>{
        return this.http.get<boolean>(this.url + '/CarReservationPast/' + rcId);
    }

    minTwoDaysLeft(rcId: Int16Array) : Observable<boolean>{
        return this.http.get<boolean>(this.url + '/MinTwoDaysLeft/' + rcId);
    }
    
    deleteCarReservation(rcId: Int16Array): Observable<number>{
        const httpOptions = {headers: new HttpHeaders( {'Content-Type': 'application/json' }) };
        return this.http.delete<number>(this.url + '/DeleteCarReservation?rcId=' + rcId, httpOptions);
    }




}