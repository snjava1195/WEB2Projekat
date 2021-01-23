import {Component, OnInit} from "@angular/core";
import { AddAirlineService } from './add-airline.service';
import { Airline } from '../companies/airline';
import { FormBuilder, Validators, NgForm, FormGroup, FormControl} from "@angular/forms";
import { ToastrService } from 'ngx-toastr';
import {Injectable} from '@angular/core';
import { Observable } from 'rxjs';
import { Button } from 'protractor';


@Component({
    selector: 'add-airline',
    templateUrl: './add-airline.component.html',
    styleUrls: ['./add-airline.component.css']
})

export class AddAirlineComponent implements OnInit{
    //checkBoxValue: any = false;
    dataSaved = false;
    airlineForm: any;
    allAirlines: Observable<Airline[]>;
    airlineIdUpdate=null;
    message=null;
    
    constructor(private formbulider: FormBuilder, private addAirlineService:AddAirlineService) { }

    ngOnInit(){
        this.airlineForm = this.formbulider.group({
       //   UserId: ['', [Validators.required]],
          Name: ['', [Validators.required]],
          Address: ['', [Validators.required]],
          Description: ['', [Validators.required]],
         

        });
        this.loadAllUsers();
    }
  /*  checkCheckBoxValue(email:string)
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
    }*/
    loadAllUsers(){
        this.allAirlines = this.addAirlineService.getAllAirlines();
    }
    onFormSubmit() {  
        this.dataSaved = false;  
        const airline = this.airlineForm.value;  
        this.CreateUser(airline);  
        this.airlineForm.reset();  
      }  
      loadUserToEdit(userId: Int16Array) {  
        this.addAirlineService.getAirlineById(userId).subscribe(airline=> {  
          this.message = null;  
          this.dataSaved = false;  
          this.airlineIdUpdate = airline.id;  
          this.airlineForm.get('UserId').setValue(airline.id);  
         this.airlineForm.get('Name').setValue(airline.name);  
          this.airlineForm.get('Address').setValue(airline.address);  
          this.airlineForm.get('Description').setValue(airline.description);  
          //this.employeeForm.controls['Address'].setValue(employee.Address);  
          //this.employeeForm.controls['PinCode'].setValue(employee.PinCode);  
        });  
      
      }  
      CreateUser(airline: Airline) {  
        if (this.airlineIdUpdate == null) {  
          this.addAirlineService.createAirline(airline).subscribe(  
            () => {  
              this.dataSaved = true;  
              this.message = 'Record saved Successfully';  
              this.loadAllUsers();  
              this.airlineIdUpdate = null;  
              this.airlineForm.reset();  
            }  
          );  
        } else {  
          airline.id = this.airlineIdUpdate;  
          this.addAirlineService.updateAirline(airline).subscribe(() => {  
            this.dataSaved = true;  
            this.message = 'Record Updated Successfully';  
            this.loadAllUsers();  
            this.airlineIdUpdate = null;  
            this.airlineForm.reset();  
          });  
        }  
      }   
      deleteUser(airlineId: Int16Array) {  
        if (confirm("Are you sure you want to delete this ?")) {   
        this.addAirlineService.deleteAirlineById(airlineId).subscribe(() => {  
          this.dataSaved = true;  
          this.message = 'Record Deleted Succefully';  
          this.loadAllUsers();  
          this.airlineIdUpdate = null;  
          this.airlineForm.reset();  
      
        });  
      }  
    }  
      resetForm() {  
        this.airlineForm.reset();  
        this.message = null;  
        this.dataSaved = false;  
      }  
    }  

