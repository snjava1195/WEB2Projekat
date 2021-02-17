import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Flight } from '../companies/flight';
import {SearchFlightService} from '../search-flight/search-flight.service';
@Component({
  selector: 'app-show-reservations',
  templateUrl: './show-reservations.component.html',
  styleUrls: ['./show-reservations.component.css']
})
export class ShowReservationsComponent implements OnInit {
  allFlights: Observable<Flight[]>;
  Id: string;
  constructor(private searchFlightService:SearchFlightService, private activatedroute: ActivatedRoute) { 
    this.activatedroute.paramMap.subscribe(data => {
      this.Id = data.get('id');
  })
}

  ngOnInit(){
    this.allFlights = this.getReservations(this.Id);
  }

  getReservations(userId: string)
    {
      debugger;
      return this.searchFlightService.getReservations(this.Id);
      
    }

  cancelReservation(flightId:Int16Array)
  {
      debugger;
      return this.searchFlightService.cancelReservation(this.Id, flightId).subscribe(()=>{
        this.allFlights = this.getReservations(this.Id);
      });
  }  
}
