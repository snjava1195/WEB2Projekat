import {Component, OnInit} from "@angular/core";
import { UserService } from '../users/user.service';
import { User } from '../users/user';
import { FormBuilder, Validators, NgForm, FormGroup, FormControl} from "@angular/forms";
import { ToastrService } from 'ngx-toastr';
import {Injectable} from '@angular/core';
import { Observable } from 'rxjs';


@Component({
    selector: 'user',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.css']
})

export class UserComponent implements OnInit{
    checkBoxValue: any = false;
    dataSaved = false;
    userForm: any;
    allUsers: Observable<User[]>;
    userIdUpdate=null;
    message=null;
    
    constructor(private formbulider: FormBuilder, private userService:UserService) { }

    ngOnInit(){
        this.userForm = this.formbulider.group({
       //   UserId: ['', [Validators.required]],
          Name: ['', [Validators.required]],
          LastName: ['', [Validators.required]],
          Email: ['', [Validators.required]],
          Phone: ['', [Validators.required]],
          Password: ['', [Validators.required]],
          City: ['', [Validators.required]],
          ConfirmPassword: ['', [Validators.required]],

        });
        this.loadAllUsers();
    }
    checkCheckBoxValue(email:string)
    {
      this.userService.addCarAdmin(email).subscribe(() => {  
        this.dataSaved = true;  
        this.message = 'Add admin Successfully';  
       // this.loadAllUsers();  
        this.userIdUpdate = null;  
        this.userForm.reset();  
      
      });
      
      console.log(this.checkBoxValue);
        
    }

    checkAirlineValue(email:string)
    {
      this.userService.addAirlineAdmin(email).subscribe(() => {
        this.dataSaved = true;
        this.message = 'Add airline admin SUCCESS';
        this.userIdUpdate = null;

      });
    }
    loadAllUsers(){
        this.allUsers = this.userService.getAllUser();
    }
    onFormSubmit() {  
        this.dataSaved = false;  
        const user = this.userForm.value;  
        this.CreateUser(user);  
        this.userForm.reset();  
      }  
      loadUserToEdit(userId: string /*Int16Array*/) {  
        this.userService.getUserById(userId).subscribe(user=> {  
          this.message = null;  
          this.dataSaved = false;  
          this.userIdUpdate = user.UserId;  
          this.userForm.get('UserId').setValue(user.UserId);  
         this.userForm.get('Name').setValue(user.Name);  
          this.userForm.get('LastName').setValue(user.LastName);  
          this.userForm.get('Phone').setValue(user.Phone);  
          //this.employeeForm.controls['Address'].setValue(employee.Address);  
          //this.employeeForm.controls['PinCode'].setValue(employee.PinCode);  
        });  
      
      }  
      CreateUser(user: User) {  
        if (this.userIdUpdate == null) {  
          this.userService.createUser(user).subscribe(  
            () => {  
              this.dataSaved = true;  
              this.message = 'Record saved Successfully';  
              this.loadAllUsers();  
              this.userIdUpdate = null;  
              this.userForm.reset();  
            }  
          );  
        } else {  
          user.UserId = this.userIdUpdate;  
          this.userService.updateUser(user).subscribe(() => {  
            this.dataSaved = true;  
            this.message = 'Record Updated Successfully';  
            this.loadAllUsers();  
            this.userIdUpdate = null;  
            this.userForm.reset();  
          });  
        }  
      }   
      deleteUser(userId: Int16Array) {  
        if (confirm("Are you sure you want to delete this ?")) {   
        this.userService.deleteUserById(userId).subscribe(() => {  
          this.dataSaved = true;  
          this.message = 'Record Deleted Succefully';  
          this.loadAllUsers();  
          this.userIdUpdate = null;  
          this.userForm.reset();  
      
        });  
      }  
    }  
      resetForm() {  
        this.userForm.reset();  
        this.message = null;  
        this.dataSaved = false;  
      }  
    }  

    
