import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { User } from 'src/app/users/user';
import { UserService } from 'src/app/users/user.service';

@Component({
  selector: 'car-admin-dashboard',
  templateUrl: './caradmindashboard.component.html',
  styleUrls: ['./user-dashboard/user-dashboard.component.css']

})
export class CarAdminDashboardComponent {

  loggedAdmin: User;
  username: string;

  constructor(private userService: UserService, private cookieService: CookieService){}

  ngOnInit(): void{
    this.getLoggedAdmin();
  }

  getLoggedAdmin(){
    if(this.cookieService.check('loggedId')){
      this.userService.getUserById(this.cookieService.get('loggedId')).subscribe(
        (val) => {
          this.loggedAdmin = val;
          this.username = val.Name;
        });
    }
 } 

}