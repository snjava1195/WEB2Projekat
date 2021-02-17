import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { RentACarService } from "src/app/companies/rent-a-car.service";
import { FormBuilder, Validators, NgForm, FormGroup, FormControl, ReactiveFormsModule} from "@angular/forms";
import { ToastrService } from 'ngx-toastr';
import { RentACar } from '../companies/rent-a-car';
import { Car } from 'src/app/companies/car';
import { runInThisContext } from 'vm';
import { CarService } from '../companies/car.service';
import { BranchOfficeService } from '../companies/branch.office.service';
import { BranchOffice } from '../companies/branch.office';
import { ThisReceiver } from '@angular/compiler';


@Component({
  selector: 'app-add-rentacar',
  templateUrl: './add-rentacar.component.html',
  styleUrls: ['./add-rentacar.component.css']
})

export class AddRentacarComponent implements OnInit {
  rentaCars: Observable<RentACar[]>;
  branchOffices: Observable<BranchOffice[]>;
  cars: Observable<Car[]>

  rentaCarForm: any;
  carForm: any;
  officeForm: any;

  selectedRentACar: RentACar;
  selectedCar: Car;
  selectedBranchOffice: BranchOffice;


  help: boolean;
  message = null;
  saved = false;

  constructor(private fb: FormBuilder, private rentaCarService: RentACarService,
             private carFb: FormBuilder, private carService: CarService,
            private officeFb : FormBuilder, private branchOfficeService: BranchOfficeService) {}

  ngOnInit(): void {
    this.loadRentaCars();
    this.loadCars();
    this.loadBranchOffices();

    this.help = false;

    this.rentaCarForm = this.fb.group({
      Name: ['', [Validators.required]],
      Address: ['', [Validators.required]],
      Description: ['', [Validators.required]], 
      City: ['', [Validators.required]]
    });

    this.carForm = this.carFb.group({
      CarName: ['', [Validators.required]],
      Price: ['', [Validators.required]],
      Brand: ['', [Validators.required]],
      Type: ['', [Validators.required]],
      Seats: ['', [Validators.required]],
      Year: ['', [Validators.required]]
    });

    this.officeForm = this.officeFb.group({
      BranchOfficeName:['', [Validators.required]],
      BranchOfficeAddress:['' ,[Validators.required]]
    });

  }

  clickHelp(){
    if(this.help)
      this.help = false;
    else
      this.help = true;
  }



 loadRentaCars(){
    this.rentaCars = this.rentaCarService.getRentaCars();
 }

 loadCars(){
    this.cars = this.carService.getCars();
 }

 loadBranchOffices(){
   this.branchOffices = this.branchOfficeService.getBranchOffices();
 }


  createRentaCar(rentaCar: RentACar)
  {
    this.rentaCarService.createRentaCar(rentaCar).subscribe(
      () => {
          this.message = 'New rent-a-car is created.'
          this.saved = true;
          this.loadRentaCars();
      }
    );
  }

  onSubmit(rentaCar: RentACar){
    this.createRentaCar(rentaCar);
    this.rentaCarForm.reset();
    this.loadRentaCars();
    this.saved = false;
  }

  onSelectRentaCar(rentaCar: RentACar): void{
    this.selectedRentACar = rentaCar;  
   }




  updateRentaCar(rentaCar: RentACar)
  {
    rentaCar.Id = this.selectedRentACar.Id;

    if(this.rentaCarForm.get('Name').value)
      rentaCar.Name = this.rentaCarForm.get('Name').value;

      if(this.rentaCarForm.get('Address').value)
      rentaCar.Address = this.rentaCarForm.get('Address').value;

      if(this.rentaCarForm.get('City').value)
      rentaCar.City = this.rentaCarForm.get('City').value;

      if(this.rentaCarForm.get('Description').value)
      rentaCar.Description = this.rentaCarForm.get('Description').value;

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
            this.selectedRentACar = null;
      }); 
    }  
  }


  
onReset(){
  this.rentaCarForm.reset();
  this.carForm.reset();
  this.officeForm.reset();

  this.message = '';

  this.loadRentaCars(); 
  this.loadCars();
  this.loadBranchOffices();

  this.selectedRentACar = null;
  this.selectedCar = null;
  this.selectedBranchOffice = null;
}








}
