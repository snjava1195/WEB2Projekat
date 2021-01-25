import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { RentACarService } from "src/app/companies/rent-a-car.service";
import { FormBuilder, Validators, NgForm, FormGroup, FormControl} from "@angular/forms";
import { ToastrService } from 'ngx-toastr';
import { RentACar } from '../companies/rent-a-car';

@Component({
  selector: 'app-add-rentacar',
  templateUrl: './add-rentacar.component.html',
  styleUrls: ['./add-rentacar.component.css']
})

export class AddRentacarComponent implements OnInit {
  rentaCars: Observable<RentACar[]>;
  rentaCarForm: any;
  message = null;
  saved = false;
  selectedRentACar: RentACar;

  constructor(private fb: FormBuilder, private rentaCarService: RentACarService) { }

  ngOnInit(): void {
    this.loadRentaCars();

    this.rentaCarForm = this.fb.group({
      Name: ['', [Validators.required]],
      Address: ['', [Validators.required]],
      Description: ['', [Validators.required]],
    });

  }

 loadRentaCars(){
    this.rentaCars = this.rentaCarService.getRentACars();
 }


  createRentaCar(rentaCar: RentACar)
  {
    this.rentaCarService.createRentaCar(rentaCar).subscribe(
      () => {
          this.message = 'New rent-a-car is created.'
          this.saved = true;
          this.loadRentaCars();
          this.selectedRentACar = null;
      }
    );

  }

  onSubmit(){
    this.createRentaCar(this.rentaCarForm.value);
    this.rentaCarForm.reset();
    this.saved = false;
  }

  onSelect(rentaCar: RentACar): void{
    this.selectedRentACar = rentaCar;
}


  updateRentaCar(rentaCar: RentACar)
  {
    rentaCar.Id = this.selectedRentACar.Id;
    this.rentaCarService.updateRentaCar(rentaCar).subscribe(
      () =>{
        this.message = 'Rent-a-car is updated.';
        this.loadRentaCars();
        this.saved = true;
        this.rentaCarForm.reset();
        this.selectedRentACar = null;
      }
    );
  }



  deleteRentaCar(rentaCarId: Int16Array)
  {
    if (confirm("Are you sure you want to delete this ?")) {   
      this.rentaCarService.deleteRentaCarById(rentaCarId).subscribe(
          () => {
            this.message = 'Rent-a-car is deleted.';
            this.loadRentaCars();
            this.rentaCarForm.reset();
      }); 
    }  
  }

  
onReset(){
  this.rentaCarForm.reset();
  this.message = '';
  this.loadRentaCars();
 this.selectedRentACar = null;
}


}
