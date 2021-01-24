import { Flight } from './flight';

export class Airline {
    id: Int16Array;
    name: string;
    address: string; 
 //   rate: number;
    description: string;

    flights: Array<Flight>;
   
    constructor(n: string,  r: number, a: string, d: string)
    {
        this.name = n;
        this.address = a;
      //  this.rate = r;
        this.description = d;   
        
        this.flights = new Array<Flight>();
    }

}