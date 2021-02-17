import { OnInit } from "@angular/core";
import { Component } from "@angular/core";
import { User } from "../users/user";
import { UserService } from "../users/user.service";;
import { CookieService } from "ngx-cookie-service";
import { Observable } from 'rxjs';
import { FriendService } from './friend.service';
import { FormBuilder, Validators, NgForm, FormGroup, FormControl } from "@angular/forms";

import { Location } from '@angular/common';

@Component({
    selector: 'admin-profile',
    templateUrl: './admin-profile.component.html',
    styleUrls: ['../../../src/app/user-dashboard/user-dashboard.component.css']
})


export class AdminProfileComponent implements OnInit{

loggedUser: User;
username: string;


saved = false;
adminForm: any;

message=null;


constructor(private userService: UserService, private friendService: FriendService,
    private cookieService: CookieService, private fb: FormBuilder, private location: Location){}


ngOnInit(){
    this.getLoggedUser();

    this.adminForm = this.fb.group({
           Name: ['' , [Validators.required]],
           LastName: ['', [Validators.required]],
           Password: ['', [Validators.required]],
           ConfirmPassword: ['', [Validators.required]],
           Email: ['', [Validators.required]],
           Phone: ['', [Validators.required]],
           City: ['', [Validators.required]],
         });

}


getLoggedUser(){
    this.userService.getUserById(this.cookieService.get('loggedId')).subscribe(
        (val) => {
            this.loggedUser = val;
            this.username = val.Name;

           this.setOldValues(this.loggedUser);
        });
}



setOldValues(user: User){
    this.adminForm.controls.Name.setValue(user.Name);
    this.adminForm.controls.LastName.setValue(user.LastName); 
    this.adminForm.controls.Email.setValue(user.Email);
    this.adminForm.controls.Phone.setValue(user.Phone);
    this.adminForm.controls.Password.setValue(user.Password);
    this.adminForm.controls.ConfirmPassword.setValue(user.ConfirmPassword);
    this.adminForm.controls.City.setValue(user.City);
}


setNewValues(user: User){

    if(this.adminForm.get('Name').value)
        user.Name = this.adminForm.get('Name').value;
  
    if(this.adminForm.get('LastName').value)
        user.LastName = this.adminForm.get('LastName').value;
  
    if(this.adminForm.get('Email').value)    
        user.Email = this.adminForm.get('Email').value;
    
    if(this.adminForm.get('Phone').value)
        user.Phone = this.adminForm.get('Phone').value;
    
    if(this.adminForm.get('Password').value)
        user.Password = this.adminForm.get('Password').value;
    
    if(this.adminForm.get('ConfirmPassword'))  
        user.ConfirmPassword = this.adminForm.get('ConfirmPassword').value;
    
    if(this.adminForm.get('City').value)
         user.City = this.adminForm.get('City').value;
}


  
  
onSubmit(user: User){
    this.setNewValues(user);
    this.userService.updateUser(user).subscribe(
        () => {
            this.message = 'Updated';
            this.saved = true;
        });
  }
  
  
  
  onReset() {   
      this.setOldValues(this.loggedUser);
      this.message = null;  
      this.saved = false;  

  } 
  


  onBack(){
    this.location.back();
  }
 




}