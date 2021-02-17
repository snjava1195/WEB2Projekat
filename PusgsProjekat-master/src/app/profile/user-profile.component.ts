import { OnInit } from "@angular/core";
import { Component } from "@angular/core";
import { User } from "../users/user";
import { UserService } from "../users/user.service";;
import { CookieService } from "ngx-cookie-service";
import { Observable } from 'rxjs';
import { FriendService } from './friend.service';
import { FormBuilder, Validators, NgForm, FormGroup, FormControl } from "@angular/forms";

@Component({
    selector: 'user-profile',
    templateUrl: './user-profile.component.html',
    styleUrls: ['../../../src/app/user-dashboard/user-dashboard.component.css']
})


export class UserProfileComponent implements OnInit{

loggedUser: User;
username: string;


saved = false;
userForm: any;

message=null;

userToSearch: any;
donesearch: boolean;


usersFoundByName: Observable<User[]>;
usersFoundByLastName: Observable<User[]>;

selectedUser: User;
friends: Observable<User[]>;

constructor(private userService: UserService, private friendService: FriendService,
    private cookieService: CookieService, private fb: FormBuilder){}


ngOnInit(){
    this.getLoggedUser();

    this.userForm = this.fb.group({
           Name: ['' , [Validators.required]],
           LastName: ['', [Validators.required]],
           Password: ['', [Validators.required]],
           ConfirmPassword: ['', [Validators.required]],
           Email: ['', [Validators.required]],
           Phone: ['', [Validators.required]],
           City: ['', [Validators.required]],
         });

    this.userToSearch = null;
    this.donesearch = false;
    this.selectedUser = null;
}


getLoggedUser(){
    this.userService.getUserById(this.cookieService.get('loggedId')).subscribe(
        (val) => {
            this.loggedUser = val;
            this.username = val.Name;

            this.loadFriends(val.UserId.toString());
           this.setOldValues(this.loggedUser);
        });
}



setOldValues(user: User){
    this.userForm.controls.Name.setValue(user.Name);
    this.userForm.controls.LastName.setValue(user.LastName); 
    this.userForm.controls.Email.setValue(user.Email);
    this.userForm.controls.Phone.setValue(user.Phone);
    this.userForm.controls.Password.setValue(user.Password);
    this.userForm.controls.ConfirmPassword.setValue(user.ConfirmPassword);
    this.userForm.controls.City.setValue(user.City);
}


setNewValues(user: User){

    if(this.userForm.get('Name').value)
        user.Name = this.userForm.get('Name').value;
  
    if(this.userForm.get('LastName').value)
        user.LastName = this.userForm.get('LastName').value;
  
    if(this.userForm.get('Email').value)    
        user.Email = this.userForm.get('Email').value;
    
    if(this.userForm.get('Phone').value)
        user.Phone = this.userForm.get('Phone').value;
    
    if(this.userForm.get('Password').value)
        user.Password = this.userForm.get('Password').value;
    
    if(this.userForm.get('ConfirmPassword'))  
        user.ConfirmPassword = this.userForm.get('ConfirmPassword').value;
    
    if(this.userForm.get('City').value)
         user.City = this.userForm.get('City').value;
}




loadFriends(loggedUserId: string){
    this.friends =  this.friendService.getFriends(loggedUserId);
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
      this.loadFriends(this.loggedUser.UserId.toString());
      this.message = null;  
      this.saved = false;  
      this.userToSearch = null;
      this.selectedUser = null;
      this.donesearch = false;
  } 
  

  searchUsers(){
    this.usersFoundByName = this.userService.getUsersByName(this.userToSearch);
    this.usersFoundByLastName = this.userService.getUsersByLastName(this.userToSearch);
    this.donesearch = true;
  }
  
  onSelectUser(user: User){
    this.selectedUser = user;
  }
  
  
  addFriend(){}




}