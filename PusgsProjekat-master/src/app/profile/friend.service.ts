import {Injectable} from '@angular/core';
import { HttpHeaders } from '@angular/common/http'; 
import { User } from '../users/user';
import { Observable } from 'rxjs'; 
import { HttpClient } from "@angular/common/http";
import { FriendRequest } from './friend-request';
import { Friendship } from './friendship';

@Injectable({
    providedIn : 'root'    
})

export class FriendService{

   
    url = 'https://localhost:44325/api/Friend';

    constructor(private http: HttpClient){}

    getFriends(userId: string): Observable<User[]> {  
        return this.http.get<User[]>(this.url + '/UsersFriends?userId=' + userId );  
    }  

    
    friendsOrNot(sender: string, notified: string): Observable<boolean>{
        return this.http.get<boolean>(this.url + '/FriendsOrNot?sender=' + sender 
        + '&notified=' + notified);
    }
    
    sendRequest(request: FriendRequest): Observable<FriendRequest> {
        const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
     
        return this.http.post<FriendRequest>(this.url + '/SendRequest/', request, httpOptions);
    }
    
    sentRequests(sender: string): Observable<string[]> {
        return this.http.get<string[]>(this.url + '/SentRequests?sender=' + sender);
    }

    gotRequests(notified: string): Observable<string[]> {
        return this.http.get<string[]>(this.url + '/GotRequests?notified=' + notified);
    }

    acceptRequest(friendship: Friendship): Observable<Friendship>{
        const httpOptions = { headers: new HttpHeaders({'Content-Type': 'application/json'}) };
        
        return this.http.post<Friendship>(this.url + '/AcceptRequest/', friendship, httpOptions);
    }


    removeRequest(sender: Int16Array, notified: Int16Array) : Observable<number>{
        const httpOptions = { headers: new HttpHeaders({'Content-Type': 'application/json'}) };
       
        return this.http.delete<number>(this.url + '/RemoveRequest?sender=' + sender + 
         '&notified=' + notified, httpOptions);
    } 


    removeFriendship(friend1: string, friend2: string): Observable<number>{
        const httpOptions = { headers: new HttpHeaders({'Content-Type': 'application/json'}) };

        return this.http.delete<number>(this.url + '/RemoveFriend?friend1=' + friend1 +
        '&friend2=' + friend2, httpOptions);
    }



}