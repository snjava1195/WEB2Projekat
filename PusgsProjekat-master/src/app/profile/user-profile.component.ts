import { OnInit } from "@angular/core";
import { Component } from "@angular/core";
import { User } from "../users/user";
import { UserService } from "../users/user.service";;
import { CookieService } from "ngx-cookie-service";


@Component({
    selector: 'user-profile',
    templateUrl: './user-profile.component.html',
    styleUrls: ['../../../src/app/user-dashboard/user-dashboard.component.css']
})


export class UserProfileComponent implements OnInit{

loggedUser: User;
username: string;

constructor(private userService: UserService, private cookieService: CookieService){}


ngOnInit(){
    this.getLoggedUser();
}


getLoggedUser(){
    this.userService.getUserById(this.cookieService.get('loggedId')).subscribe(
        (val) => {
            this.loggedUser = val;
            this.username = val.Name;
        });
}



}