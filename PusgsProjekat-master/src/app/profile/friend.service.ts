import {Injectable} from '@angular/core';
import { HttpHeaders } from '@angular/common/http'; 
import { User } from '../users/user';
import { Observable } from 'rxjs'; 
import { HttpClient } from "@angular/common/http";

@Injectable({
    providedIn : 'root'    
})

export class FriendService{

   
    url = 'https://localhost:44325/api/Friend';

    constructor(private http: HttpClient){}

    getFriends(userId: string): Observable<User[]> {  
        return this.http.get<User[]>(this.url + '/UsersFriends?userId=' + userId );  
    }  

      

}