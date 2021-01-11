import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { FormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { LoginService } from '../login.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  password : boolean = false;
  loginForm: any;
  model: any={};
  errorMessage: string;

  constructor(
    private LoginService: LoginService,
    private fb: FormBuilder,
    private router: Router,
    ) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      Email: ['', [Validators.required]],
      Password: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
    });

    sessionStorage.removeItem('Email');
    sessionStorage.clear();
  }

  togglePassword() {
    this.password = !this.password;
  }

  login() {
    this.LoginService.Login(this.loginForm.value).subscribe(
      user => {
          if(user==0)
            this.router.navigate(['/admindashboard']);
          else
            this.router.navigate(['/userdashboard']);
        
      });
  };
}
