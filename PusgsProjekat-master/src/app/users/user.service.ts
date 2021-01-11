import {Injectable} from '@angular/core';
import { HttpHeaders } from '@angular/common/http'; 
import { User } from './user';
import { Observable } from 'rxjs'; 
import { HttpClient } from "@angular/common/http";

@Injectable({
    providedIn : 'root'    
})

export class UserService{

   
    url = 'https://localhost:44325/api/User';
    url2 = 'https://localhost:44325/api/Admin';
    constructor(private http: HttpClient){}

    getAllUser(): Observable<User[]> {  
        return this.http.get<User[]>(this.url + '/AllUserDetails');  
      }  
      getUserById(userId: Int16Array): Observable<User> {  
        return this.http.get<User>(this.url + '/GetUserDetailsById/' + userId);  
      }  
      createUser(user: User): Observable<User> {  
        const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };  
        return this.http.post<User>(this.url + '/InsertUserDetails/',  
        user, httpOptions);  
      }  
      updateUser(user: User): Observable<User> {  
        const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };  
        return this.http.put<User>(this.url + '/UpdateUserDetails/',  
        user, httpOptions);  
      }  
      deleteUserById(userid: Int16Array): Observable<number> {  
        const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };  
        return this.http.delete<number>(this.url + '/DeleteUserDetails?id=' +userid,  
     httpOptions);  
      }  
      addCarAdmin(email:string): Observable<number>
      {
        const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };
        return this.http.post<number>(this.url2 + '/SetAsCarAdmin?email=' + email, httpOptions);
      }

      addAirlineAdmin(email:string): Observable<number>
      {
        const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };
        return this.http.post<number>(this.url2 + '/SetAsAirlineAdmin?email=' + email, httpOptions);
      }
      

}