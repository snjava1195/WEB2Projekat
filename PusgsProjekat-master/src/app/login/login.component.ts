import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { FormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { LoginService } from '../login.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from '../users/user.service';
import { CookieService } from 'ngx-cookie-service';

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

  loggedUserId: string;

  constructor(
    private LoginService: LoginService,
    private fb: FormBuilder,
    private router: Router,
    private userService: UserService, 
    private cookieService: CookieService) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      Email: ['', [Validators.required]],
      Password: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
    });

    this.logout();
  }

  togglePassword() {
    this.password = !this.password;
  }

  loggedUser() {
    this.userService.getUserByEmail(this.loginForm.get('Email').value).subscribe(
      (val) => {
         this.loggedUserId =  val.UserId.toString();
          this.cookieService.set('loggedId', this.loggedUserId.toString())
      });
  }


  login() {
    this.loggedUser();

    this.LoginService.Login(this.loginForm.value).subscribe(
      user => {
          if(user==0)
            this.router.navigate(['/admindashboard']);
          else if(user==1)
            this.router.navigate(['/userdashboard']);
          else if(user==2)
            this.router.navigate(['/caradmindashboard']);
          else if(user==3)
            this.router.navigate(['/airlineadmindashboard'])
        
      });
  };


  logout(){
      this.cookieService.delete('loggedId');
  }


}
