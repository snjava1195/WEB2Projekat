import { Observable } from 'rxjs';
import { Flight } from './flight';

export class Airline {
    Id: Int16Array;
    Name: string;
    Address: string; 
 //   rate: number;
    Description: string;
    AdminId: Int16Array;
    flights: Observable<Flight[]>;
   
    constructor(n: string,  r: number, a: string, d: string)
    {
        this.Name = n;
        this.Address = a;
      //  this.rate = r;
        this.Description = d;   
        
        this.flights = new Observable<Flight[]>();
    }

}