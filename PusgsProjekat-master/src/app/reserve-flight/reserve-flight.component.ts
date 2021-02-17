import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reserve-flight',
  templateUrl: './reserve-flight.component.html',
  styleUrls: ['./reserve-flight.component.css']
})
export class ReserveFlightComponent implements OnInit {

  seatsLayout= {
  	totalRows:10,
	seatsPerRow:6,
	seatNaming:'rowType',
	booked:['1A','5D']   
}
  constructor() { }

  ngOnInit(): void {
  }
  
  getSelected(event){
    //Do stuff
      console.log(event)
    }
}
