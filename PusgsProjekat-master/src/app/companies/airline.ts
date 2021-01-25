import { Flight } from './flight';

export class Airline {
    Id: Int16Array;
    Name: string;
    Address: string; 
 //   rate: number;
    Description: string;

    flights: Array<Flight>;
   
    constructor(n: string,  r: number, a: string, d: string)
    {
        this.Name = n;
        this.Address = a;
      //  this.rate = r;
        this.Description = d;   
        
        this.flights = new Array<Flight>();
    }

}