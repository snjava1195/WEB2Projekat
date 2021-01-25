import { Car } from './car';

export class RentACar{
    Id: Int16Array;
    Name: string;
    Address: string;
    Description: string;
    Rate: number;

    cars: Array<Car>;

    constructor(n: string, a: string, d: string, r: number){
        this.Name = n;
        this.Address = a;
        this.Description = d;
        this.Rate = r;

        this.cars = new Array<Car>();
    }

}