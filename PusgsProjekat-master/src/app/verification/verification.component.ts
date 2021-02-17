import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-verification',
  templateUrl: './verification.component.html',
  styleUrls: ['./verification.component.css']
})
export class VerificationComponent implements OnInit {

  Id:string;
  constructor(private activatedroute: ActivatedRoute, private loginService: LoginService, private router: Router) {
    this.activatedroute.paramMap.subscribe(data => {
      this.Id = data.get('id');
    })
  }

  ngOnInit(): void {
  }
  gotoLogin()
  {
    debugger;
    this.loginService.gotoLogin(this.Id).subscribe(()=>
    {
      this.router.navigate(['/login']);
    });
  }
}
