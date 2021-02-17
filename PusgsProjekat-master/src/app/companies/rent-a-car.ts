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

    constructor(){}
    

}