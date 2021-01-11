import { Injectable } from '@angular/core';  
import {HttpClient} from '@angular/common/http';  
import {HttpHeaders} from '@angular/common/http';  
import { from, Observable } from 'rxjs'; 

@Injectable({
  providedIn: 'root'
})
export class LoginService {  
  Url :string;  
  token : string;  
  header : any;  
  constructor(private http : HttpClient) {   
    this.Url = 'https://localhost:44325/api/User'; 
    const headerSettings: {[name: string]: string | string[]; } = {};  
    this.header = new HttpHeaders(headerSettings);  
  }  

  Login(model : any){  
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };  
   return this.http.post<any>(this.Url+'/UserLogin',model,{ headers: this.header});  
  }  

   
}  
