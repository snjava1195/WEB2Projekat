import { RentACar } from './rent-a-car';
import { Car } from './car';
import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs'; 

@Injectable({
    providedIn: 'root'
})

export class RentACarService{

    url = 'https://localhost:44325/api/RentaCar';

    constructor(private http: HttpClient){}
      
    getRentaCars(): Observable<RentACar[]> {
        return this.http.get<RentACar[]>(this.url + '/AllRentaCars');
    }
 
    getRentaCarById(rentaCarId: Int16Array): Observable<RentACar>{
        return this.http.get<RentACar>(this.url + '/GetRentaCarById?rentaCarId='+ rentaCarId);
    }

    getRentaCarByName(rentaCarName: string): Observable<RentACar[]>{
        return this.http.get<RentACar[]>(this.url + '/GetRentaCarByName/' + rentaCarName);
    }

    getRentaCarByLocation(rentaCarLocation: string): Observable<RentACar[]>{
        return this.http.get<RentACar[]>(this.url + '/GetRentaCarByLocation/' + rentaCarLocation);
    }
   

    createRentaCar(rentaCar: RentACar) : Observable<RentACar>{
        const httpOptions = {headers: new HttpHeaders({'Content-Type': 'application/json'} ) };
        return this.http.post<RentACar>(this.url + '/InsertRentaCar/', rentaCar, httpOptions);
    }

    updateRentaCar(rentaCar: RentACar) : Observable<RentACar>{
        const httpOptions = {headers: new HttpHeaders({'Content-Type': 'application/json'}) };
        return this.http.put<RentACar>(this.url + '/UpdateRentaCar/', rentaCar, httpOptions);
    }

    deleteRentaCarById(rentaCarId : Int16Array): Observable<number> {
        const httpOptions = {headers: new HttpHeaders( {'Content-Type': 'application/json' }) };
        return this.http.delete<number>(this.url + '/DeleteRentaCar?id=' + rentaCarId, httpOptions);
    }


}