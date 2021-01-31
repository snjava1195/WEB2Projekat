import { Observable } from 'rxjs';
import { BranchOffice } from './branch.office';
import { Car } from './car';

export class RentACar{
    Id: Int16Array;
    Name: string;
    Address: string;
    City: string;
    Description: string;
    Rate: number;
    RatedBy: number;


    Cars: Observable<Car[]>;
    BranchOffices: Observable<BranchOffice[]>;

    constructor(n: string, a: string, d: string, r: number){
        this.Name = n;
        this.Address = a;
        this.Description = d;
        this.Rate = r;
    }

}