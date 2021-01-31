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

    url = 'https://localhost:44325/api/Airline';
    constructor(private http: HttpClient){}

  /*  
        airlines.push(new Airline('Emirates', 3, 'acctpay2emirates.com', 'aviokompanija'));
        airlines.push(new Airline('Hainan Airlines', 5, 'webetservice.hnair.com',  'aviokompanija'));
        airlines.push(new Airline('Thai Airways', 6, 'contact@service.thaiairways.com', 'aviokompanija'));
        airlines.push(new Airline('Qantas Airways', 7, 'info@qantas.com', 'aviokompanija'));      
    }*/

    loadAirlines() : Observable<Airline[]> {  
                return this.http.get<Airline[]>(this.url + '/AllAirlineDetails'); 
    }
    
}
