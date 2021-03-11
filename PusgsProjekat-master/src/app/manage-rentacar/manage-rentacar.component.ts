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
import { CookieService } from 'ngx-cookie-service';


@Component({
  selector: 'manage-rentacar',
  templateUrl: './manage-rentacar.component.html',
 // styleUrls: ['../add-rentacar.component.css']

})

export class ManageRentacarComponent implements OnInit {
  rentaCars: Observable<RentACar[]>;
  branchOffices: Observable<BranchOffice[]>;
  cars: Observable<Car[]>


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
            private officeFb : FormBuilder, private branchOfficeService: BranchOfficeService, 
            private cookieService: CookieService) {}

  ngOnInit(): void {
    this.loadRentaCars();
    this.loadCars();
    this.loadBranchOffices();

    this.help = false;
    this.selectedCar = null;
    

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
    this.rentaCars = this.rentaCarService.getAdminsRentaCars( this.cookieService.get('loggedId') );
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
    this.loadRentaCars();
    this.saved = false;
  }

  onSelectRentaCar(rentaCar: RentACar): void{
    this.selectedRentACar = rentaCar;  
}



  
onReset(){

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


onSelectCar(car : Car){
  this.selectedCar = car;
}


createCar(car: Car){
  car.Name = this.carForm.get('CarName').value;
  car.RentaCarId = this.selectedRentACar.Id;
  car.Price = this.carForm.get('Price').value;
  car.Brand = this.carForm.get('Brand').value;
  car.Type = this.carForm.get('Type').value;
  car.Seats = this.carForm.get('Seats').value;
  car.Year = this.carForm.get('Year').value;

   this.carService.createCar(car).subscribe(
    ()=>{
      this.message = 'Car is created.'
      this.loadCars();
      this.saved = true;
      this.carForm.reset();
      this.selectedRentACar = null;
    }
  );
}

updateCar(car: Car){
  car.Id = this.selectedCar.Id;

  if(this.carForm.get('CarName').value)
  car.Name = this.carForm.get('CarName').value;

  if(this.carForm.get('Price').value)
  car.Price = this.carForm.get('Price').value;

  if(this.carForm.get('Brand').value)
  car.Price = this.carForm.get('Brand').value;

  if(this.carForm.get('Seats').value)
  car.Price = this.carForm.get('Seats').value;

  if(this.carForm.get('Year').value)
  car.Price = this.carForm.get('Year').value;

  this.carService.updateCar(car).subscribe(
    () =>{
      this.message = 'Car is updated.';
      this.loadCars();
      this.saved = true;
      this.carForm.reset();
      this.selectedCar = null;
    }
  );
}



deleteCar(car: Car){
  if (confirm("Are you sure you want to delete this ?")) {   
    this.carService.deleteCar(car.Id).subscribe(
        () => {
          this.message = 'Car is deleted.';
          this.loadCars();
          this.carForm.reset();
          this.selectedCar = null;
    }); 
  }  
}

onSelectBranchOffice(branchOffice: BranchOffice){
  this.selectedBranchOffice = branchOffice;
}

createBranchOffice(office: BranchOffice){
  office.Name = this.officeForm.get('BranchOfficeName').value;
  office.Address = this.officeForm.get('BranchOfficeAddress').value;
 office.RentaCarId = this.selectedRentACar.Id;

  this.branchOfficeService.createBranchOffice(office).subscribe(
    () => {
        this.message = 'Branch office is created.'
        this.saved = true;
        this.loadBranchOffices();
        this.officeForm.reset();
        this.selectedRentACar = null;
    }
  );
}

updateBranchOffice(office: BranchOffice){
  office.Id = this.selectedBranchOffice.Id;

  if(this.officeForm.get('BranchOfficeName').value)
      office.Name = this.officeForm.get('BranchOfficeName').value;

  if(this.officeForm.get('BranchOfficeAddress').value)    
   office.Address = this.officeForm.get('BranchOfficeAddress').value;


  this.branchOfficeService.updateBranchOffice(office).subscribe(
    () =>{
      this.message = 'Branch office is updated.';
      this.loadBranchOffices();
      this.saved = true;
      this.officeForm.reset();
      this.selectedBranchOffice = null;
    }
  );
}


deleteBranchOffice(office: BranchOffice){
  if (confirm("Are you sure you want to delete this ?")) {   
    this.branchOfficeService.deleteBranchOffice(office.Id).subscribe(
        () => {
          this.message = 'Branch office is deleted.';
          this.loadBranchOffices();
          this.officeForm.reset();
          this.selectedBranchOffice = null;
    }); 
  }  
}








}
