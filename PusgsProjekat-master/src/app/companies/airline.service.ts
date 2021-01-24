import { Airline } from './airline';
import { Flight } from './flight';
import { Injectable } from '@angular/core';
 import { HttpHeaders } from '@angular/common/http'; 
 import { Observable } from 'rxjs'; 
import { HttpClient } from "@angular/common/http";
@Injectable({
    providedIn: 'root'
})

export class AirlineService{

    //constructor(){}
    url = 'https://localhost:44325/api/Airline';
    constructor(private http: HttpClient){}
  /*  mockedAirlines(){
        let airlines = new Array<Airline>();

        airlines.push(new Airline('Qatar Airways', 1, 'qatara@qa.net', 'aviokompanija'));
        airlines.push(new Airline('Singapore Airlines', 2, 'singa@s.com', 'Aviokompanija'));
        airlines.push(new Airline('Emirates', 3, 'acctpay2emirates.com', 'aviokompanija'));
        airlines.push(new Airline('EVA Air', 4, 'feedback@evaair.com',  'aviokompanija'));
        airlines.push(new Airline('Hainan Airlines', 5, 'webetservice.hnair.com',  'aviokompanija'));
        airlines.push(new Airline('Thai Airways', 6, 'contact@service.thaiairways.com', 'aviokompanija'));
        airlines.push(new Airline('Qantas Airways', 7, 'info@qantas.com', 'aviokompanija'));
        
        return  airlines;
    }*/

    loadAirlines() : Observable<Airline[]> {  
                return this.http.get<Airline[]>(this.url + '/AllAirlineDetails'); 
    }
    loadFlights(){
        let allFlights = new Array<Flight>();
                  
        allFlights.push(new Flight('Madrid','Belgrade', new Date(2020, 4, 4, 18, 0), 200));
        allFlights.push(new Flight('Tivat', 'Belgrade', new Date(2020, 6, 1, 19, 30), 60));      
        allFlights.push(new Flight('Moscow','Belgrade', new Date(2020, 5, 1, 3, 30), 150));
        allFlights.push(new Flight('New York', 'Belgrade', new Date(2020, 8, 20, 13), 500 ));
        allFlights.push(new Flight('Cairo', 'Belgrade', new Date(2020, 7, 10, 9), 250));

        allFlights.push(new Flight('Belgrade', 'Madrid', new Date(2020, 4, 10, 6, 30), 200));
        allFlights.push(new Flight('Belgrade', 'Cairo', new Date(2020, 7, 28, 10, 30), 250));
        allFlights.push(new Flight('Belgrade', 'Tivat', new Date(2020, 6, 15, 7), 60));
        allFlights.push(new Flight('Belgrade', 'Moscow', new Date(2020, 5, 7, 8), 150));
        allFlights.push(new Flight('Belgrade', 'NewYork', new Date( 2020, 8, 30, 12), 500));

        return allFlights;
    }

}
// import {Injectable} from '@angular/core';
// import { HttpHeaders } from '@angular/common/http'; 
// import { Airline } from '../companies/airline';
// import { Observable } from 'rxjs'; 
// import { HttpClient } from "@angular/common/http";

// @Injectable({
//     providedIn : 'root'    
// })

// export class AirlineService{

   
//     url = 'https://localhost:44325/api/Airline';
//     url2 = 'https://localhost:44325/api/Airline';
//     constructor(private http: HttpClient){}

//     getAllAirlines(): Observable<Airline[]> {  
//         return this.http.get<Airline[]>(this.url + '/AllAirlineDetails');  
//       }  
//       getAirlineById(airlineId: Int16Array): Observable<Airline> {  
//         return this.http.get<Airline>(this.url + '/GetAirlineDetailsById/' + airlineId);  
//       }  
//       createAirline(airline: Airline): Observable<Airline> {  
//         const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };  
//         return this.http.post<Airline>(this.url + '/InsertAirlineDetails/',  
//         airline, httpOptions);  
//       }  
//       updateAirline(airline: Airline): Observable<Airline> {  
//         const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };  
//         return this.http.put<Airline>(this.url + '/UpdateAirlineDetails/',  
//         airline, httpOptions);  
//       }  
//       deleteAirlineById(airlineId: Int16Array): Observable<number> {  
//         const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };  
//         return this.http.delete<number>(this.url + '/DeleteAirlineDetails?id=' +airlineId,  
//      httpOptions);  
//       }  
  
      

// }