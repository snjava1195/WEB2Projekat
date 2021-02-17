import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { User } from '../users/user';
import { UserService } from '../users/user.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent  implements OnInit {

  loggedAdmin: User;
  username: string;

  constructor(private userService: UserService, private cookieService: CookieService){}

  ngOnInit(): void{
    this.getLoggedAdmin();
  }

  getLoggedAdmin(){
    if(this.cookieService.check('loggedId')){
      var id = this.cookieService.get('loggedId');
      this.userService.getUserById(id).subscribe(
        (val) => {
          this.loggedAdmin = val;
          this.username = val.Name;
        }); 
    }
   
 } 

 logout(){
  this.loggedAdmin = null;
  this.cookieService.delete('loggedId');
}


}
