import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent{
  id: any;
  constructor(
    
    private activatedroute: ActivatedRoute
  ) {
    this.activatedroute.params.subscribe(data => {
      this.id = data;
      console.log(data);
    })
  }
 
}
