import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { FormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from '../users/user.service';
import { User } from '../users/user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
registerForm: any;
password : boolean = false;
errorMessage: string;

Name: any;
LastName: any;     
Email: any; 
Phone: any;
City: any; 
Password: any;
ConfirmPassword: any;


  constructor(
    private fb: FormBuilder,     
    private router: Router,
    private RegisterService: UserService) { }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      Name: ['', [Validators.required]],
      LastName: ['', [Validators.required]],     
      Email: ['', [Validators.required]],
      Phone: ['', [Validators.required]],
      City: ['', [Validators.required]],
      Password: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
      ConfirmPassword: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
  } );
  

  }

  togglePassword() {
    this.password = !this.password;
  }

  register(){
    this.RegisterService.createUser(this.registerForm.value).subscribe(
      () => {
        this.registerForm.reset();  
        this.router.navigate(['/login']); 
      }
  );

}



}

