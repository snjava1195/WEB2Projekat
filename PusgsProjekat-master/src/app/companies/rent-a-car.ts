import { Car } from './car';

export class RentACar{
    name: string;
    address: string;
    description: string;
    rate: number;

    cars: Array<Car>;

    constructor(n: string, a: string, d: string, r: number){
        this.name = n;
        this.address = a;
        this.description = d;
        this.rate = r;

        this.cars = new Array<Car>();
    }

}