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
    url2 = 'https://localhost:44325/api/RentaCar';

    constructor(private http: HttpClient){}

    mockedRentACars(){
        let rentacars = new Array<RentACar>();

        rentacars.push(new RentACar('Nista GSP', 'nistagsp@yahoo.com', 'neki rent-a-car', 1 ));
        rentacars.push(new RentACar('Samo kamilom', 'samo.kamilom@gmail.com', 'neki drugi rent-a-car', 5));
        rentacars.push(new RentACar('Just Rent', 'just.rent@gmail.com', 'neki treci', 9));
        rentacars.push(new RentACar('Brm brm', 'brm.brm@yahoo.com', 'cetvrti rent-a-car', 4));
     
        return  rentacars;
    }


      
    getRentACars(): Observable<RentACar[]> {
        return this.http.get<RentACar[]>(this.url + '/AllRentaCarDetails');
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