import { Component, OnInit } from '@angular/core';
import { UserService } from './../users/user.service';
import { User } from './../users/user';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent{

  loggedUser: User;
  username: string;
  
  constructor(private userService: UserService, private cookieService: CookieService){}

  ngOnInit(): void{
    this.getLoggedUser();
  }
  
  getLoggedUser() {
    if(this.cookieService.check('loggedId')){
      this.userService.getUserById(this.cookieService.get('loggedId')).subscribe(
        (val) => {
          this.loggedUser = val;
          this.username = val.Name;
        });
    }

  }
  

}
