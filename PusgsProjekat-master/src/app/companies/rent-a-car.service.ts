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
      
    getRentACars(): Observable<RentACar[]> {
        return this.http.get<RentACar[]>(this.url + '/AllRentaCarDetails');
    }
 
    getRentaCarById(rentaCarId: Int16Array): Observable<RentACar>{
        return this.http.get<RentACar>(this.url + '/GetRentaCarDetailsById/'+ rentaCarId);
    }

    createRentaCar(rentaCar: RentACar) : Observable<RentACar>{
        const httpOptions = {headers: new HttpHeaders({'Content-Type': 'application/json'} ) };
        return this.http.post<RentACar>(this.url + '/InsertRentaCarDetails/', rentaCar, httpOptions);
    }

    updateRentaCar(rentaCar: RentACar) : Observable<RentACar>{
        const httpOptions = {headers: new HttpHeaders({'Content-Type': 'application/json'}) };
        return this.http.put<RentACar>(this.url + '/UpdateRentaCarDetails/', rentaCar, httpOptions);
    }

    deleteRentaCarById(rentaCarId : Int16Array): Observable<number> {
        const httpOptions = {headers: new HttpHeaders( {'Content-Type': 'application/json' }) };
        return this.http.delete<number>(this.url + '/DeleteRentaCarDetails?id=' + rentaCarId, httpOptions);
    }



    loadCars(){
        let allCars = new Array<Car>();
        
        allCars.push(new Car('Golf'));
        allCars.push(new Car('Lada'));
        allCars.push(new Car('Yugo'));
        allCars.push(new Car('Zastava'));
        allCars.push(new Car('Mercedes'));
        allCars.push(new Car('BMW'));
        allCars.push(new Car('Fiat'));
        allCars.push(new Car('Ferrari'));

        return allCars;
    }
}