import { RentACar } from './rent-a-car';
import { BranchOffice } from './branch.office'
import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs'; 

@Injectable({
    providedIn: 'root'
})

export class BranchOfficeService{

    constructor(private http: HttpClient){}

    url = 'https://localhost:44325/api/BranchOffice';


    getBranchOffices() : Observable<BranchOffice[]>{
        return this.http.get<BranchOffice[]>(this.url + '/AllBranchOffices');
    }

    createBranchOffice(office: BranchOffice): Observable<BranchOffice>{
        const httpOptions = {headers: new HttpHeaders({'Content-Type': 'application/json'} )};
        return this.http.post<BranchOffice>(this.url + '/InsertBranchOffice', office, httpOptions);
    }

    updateBranchOffice(office: BranchOffice): Observable<BranchOffice>{
        const httpOptions = {headers: new HttpHeaders({'Content-Type': 'application/json'} ) };
        return this.http.put<BranchOffice>(this.url + '/UpdateBranchOffice', office, httpOptions);
    }

    deleteBranchOffice(branchOfficeId: Int16Array): Observable<number>{
        const httpOptions = {headers: new HttpHeaders({'Content-Type': 'application/json'} ) };
        return this.http.delete<number>(this.url + '/DeleteBranchOffice?id=' + branchOfficeId, httpOptions);
    }

    getBranchOfficesFromRentaCar(rentaCarID: Int16Array): Observable<BranchOffice[]> {
        return this.http.get<BranchOffice[]>(this.url + '/BranchOfficesFromRentaCar?rentaCarID=' + rentaCarID);
    }

}