import { OnInit } from "@angular/core";
import { Component } from "@angular/core";
import { User } from "../users/user";
import { UserService } from "../users/user.service";;
import { CookieService } from "ngx-cookie-service";
import { Observable } from 'rxjs';
import { FriendService } from './friend.service';
import { FormBuilder, Validators, NgForm, FormGroup, FormControl } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { FriendRequest } from "./friend-request";
import { Friendship } from "./friendship";
import { observableToBeFn } from "rxjs/internal/testing/TestScheduler";

@Component({
    selector: 'user-profile',
    templateUrl: './user-profile.component.html',
    styleUrls: ['../../../src/app/user-dashboard/user-dashboard.component.css']
})


export class UserProfileComponent implements OnInit {

    loggedUser: User;
    username: string;
    id: any;

    saved = false;
    userForm: any;

    message = null;

    userToSearch: any;
    donesearch: boolean;

    foundUsers: Observable<User[]>;

    selectedUser: User;
    friends: Observable<User[]>;

    gotRequests: Observable<string[]>;
    gr: boolean;
    sentRequests: Observable<string[]>;
    sr: boolean;

    constructor(private userService: UserService, private friendService: FriendService,
        private cookieService: CookieService, private activatedroute: ActivatedRoute, private fb: FormBuilder) {
        this.activatedroute.params.subscribe(data => {
            this.id = data;
            console.log(data);
        })
    }


    ngOnInit() {
        this.getLoggedUser();

        this.userForm = this.fb.group({
            Name: ['', [Validators.required]],
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

        this.sr = false;
        this.gr = false;
    }


    getLoggedUser() {
        this.userService.getUserById(this.cookieService.get('loggedId')).subscribe(
            (val) => {
                this.loggedUser = val;
                this.username = val.Name;

                this.loadFriends(val.UserId.toString());
                this.setOldValues(this.loggedUser);

                this.loadSentRequests();
                this.loadGotRequests();
            });
    }



    setOldValues(user: User) {
        this.userForm.controls.Name.setValue(user.Name);
        this.userForm.controls.LastName.setValue(user.LastName);
        this.userForm.controls.Email.setValue(user.Email);
        this.userForm.controls.Phone.setValue(user.Phone);
        this.userForm.controls.Password.setValue(user.Password);
        this.userForm.controls.ConfirmPassword.setValue(user.ConfirmPassword);
        this.userForm.controls.City.setValue(user.City);
    }


    setNewValues(user: User) {

        if (this.userForm.get('Name').value)
            user.Name = this.userForm.get('Name').value;

        if (this.userForm.get('LastName').value)
            user.LastName = this.userForm.get('LastName').value;

        if (this.userForm.get('Email').value)
            user.Email = this.userForm.get('Email').value;

        if (this.userForm.get('Phone').value)
            user.Phone = this.userForm.get('Phone').value;

        if (this.userForm.get('Password').value)
            user.Password = this.userForm.get('Password').value;

        if (this.userForm.get('ConfirmPassword'))
            user.ConfirmPassword = this.userForm.get('ConfirmPassword').value;

        if (this.userForm.get('City').value)
            user.City = this.userForm.get('City').value;
    }




    loadFriends(loggedUserId: string) {
        this.friends = this.friendService.getFriends(loggedUserId);
    }


    onSubmit(user: User) {
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

        this.loadSentRequests();
        this.loadGotRequests();

        this.sr = false;
        this.gr = false;
    }


    searchUsers() {
        this.foundUsers = this.userService.getUsersByNameAndLastName(this.userToSearch);
        this.donesearch = true;
    }

    onSelectUser(user: User) {
        this.selectedUser = user;

        this.friendService.friendsOrNot(this.loggedUser.UserId.toString(),
            this.selectedUser.UserId.toString()).subscribe((val) => {
                if (val) {
                    this.saved = true;
                    this.message = 'You are friends already';
                }
            });
    }


    loadSentRequests() {
        this.sentRequests = this.friendService.sentRequests(this.loggedUser.UserId.toString());
    }

    showSentRequests() {
        this.sr = true;
    }

    loadGotRequests() {
        this.gotRequests = this.friendService.gotRequests(this.loggedUser.UserId.toString());
    }

    showGotRequests() {
        this.gr = true;
    }


    sendRequest() {
        var fr = new FriendRequest();
        fr.sender = this.loggedUser.UserId;
        fr.toNotify = this.selectedUser.UserId;

        this.friendService.sendRequest(fr).subscribe(
            () => {
                this.saved = true;
                this.message = 'Your friend request is sent!';
                this.loadSentRequests();
            });

    }


    acceptRequest(sender: string) {
        var f = new Friendship();
        f.Friend2 = this.loggedUser.UserId;

        this.userService.getUserByName(sender.split(' ')[0]).subscribe(
            (val) => {
                f.Friend1 = val.UserId;
                this.friendService.acceptRequest(f).subscribe(
                    () => {
                          //  this.removeRequest(sender);
                    });
            });

        this.removeRequest(sender);    
    }


    removeRequest(sender: string) {

        this.userService.getUserByName(sender.split(' ')[0]).subscribe(
            (val) =>{
                this.friendService.removeRequest(val.UserId, this.loggedUser.UserId).subscribe(
                    () => {
                        this.onReset();
                    });
            });        
    }

    
    removeFriend(friend: User) {

        this.friendService.removeFriendship(this.loggedUser.UserId.toString(),
        friend.UserId.toString()).subscribe(
            () => {
                this.onReset();
            });
    }





}