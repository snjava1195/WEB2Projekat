import { RentACar } from './rent-a-car';
import { Car } from './car';
import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs'; 

@Injectable({
    providedIn: 'root'
})

export class CarService{

    constructor(private http: HttpClient){}

    url = 'https://localhost:44325/api/Car';

    getCars(): Observable<Car[]> {
        return this.http.get<Car[]>(this.url + '/AllCars');
    }

    getCarByName(carName: string) : Observable<Car[]>{
        return this.http.get<Car[]>(this.url + '/GetCarByName/' + carName);
    }

    getCarById(carId: Int16Array): Observable<Car>{
        return this.http.get<Car>(this.url + '/GetCarById/'+ carId);
    }

    
    getCarByRate(carRate: Number) : Observable<Car[]>{
        return this.http.get<Car[]>(this.url + '/GetCarByRate?carRate=' + carRate);
    }
    

    getCarByPrice(minPrice: Number, maxPrice: Number): Observable<Car[]>{
        return this.http.get<Car[]>(this.url + '/GetCarByPrice?min=' + minPrice + '&max=' + maxPrice );
    }

    createCar(car: Car) : Observable<Car>{
        const httpOptions = {headers: new HttpHeaders({'Content-Type': 'application/json'} ) };
        return this.http.post<Car>(this.url + '/InsertCar', car, httpOptions);
    }

    updateCar(car: Car) : Observable<Car>{
        const httpOptions = {headers: new HttpHeaders({'Content-Type': 'application/json'} ) };
        return this.http.put<Car>(this.url + '/UpdateCar', car, httpOptions);
    }

    deleteCar(carId: Int16Array): Observable<number>{
        const httpOptions = {headers: new HttpHeaders({'Contnent-Type': 'application/json'} ) };
        return this.http.delete<number>(this.url + '/DeleteCar?id='+ carId, httpOptions);
    }




}