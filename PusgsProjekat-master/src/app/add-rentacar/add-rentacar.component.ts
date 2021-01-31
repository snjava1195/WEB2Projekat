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
import { validateHorizontalPosition } from '@angular/cdk/overlay';
import { off } from 'process';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

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
  rateForm: any;

  selectedRentACar: RentACar;
  selectedCar: Car;
  selectedBranchOffice: BranchOffice;


  help: boolean;
  message = null;
  saved = false;

  constructor(private fb: FormBuilder, private rentaCarService: RentACarService,
             private carFb: FormBuilder, private carService: CarService,
            private officeFb : FormBuilder, private branchOfficeService: BranchOfficeService,
            private rateFb: FormBuilder ) {}

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
      CarPrice: ['', [Validators.required]],
      CarRci: ['', [Validators.required]]
    });

    this.officeForm = this.officeFb.group({
      BranchOfficeName:['', [Validators.required]],
      BranchOfficeAddress:['' ,[Validators.required]],
      OfficeRci:['', [Validators.required]]
    });

    this.rateForm = this.rateFb.group({
      Rate: ['', [Validators.required]]
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
    this.carForm.controls.CarRci.setValue(rentaCar.Id);   
    this.officeForm.controls.OfficeRci.setValue(rentaCar.Id);
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


rateRentaCar(rentaCar: RentACar, rate: number){
  rentaCar.Id = this.selectedRentACar.Id;
  rentaCar.Rate = this.selectedRentACar.Rate;
  rentaCar.RatedBy = this.selectedRentACar.RatedBy;

  var newRate: number =
  newRate =  Number.parseInt((rentaCar.Rate * rentaCar.RatedBy).toString())
            + Number.parseInt(rate.toString());
  rentaCar.RatedBy++;
  rentaCar.Rate = Number.parseFloat(( newRate/rentaCar.RatedBy).toString());
  

  this.rentaCarService.updateRentaCar(rentaCar).subscribe(
    () =>{
      this.message = 'Rent-a-car is rated.';
      this.loadRentaCars();
      this.saved = true;
      this.rateForm.reset();
      this.selectedRentACar = null;
    }
  );
} 
  
onReset(){
  this.rentaCarForm.reset();
  this.carForm.reset();
  this.officeForm.reset();
  this.rateForm.reset();
  this.message = '';
  this.loadRentaCars();
  this.loadCars();
  this.loadBranchOffices();
  this.selectedRentACar = null;
  this.selectedCar = null;
  this.selectedBranchOffice = null;
}


onSelectCar(car : Car): void{
  this.selectedCar = car;
  this.carForm.controls.CarRci.setValue(this.selectedCar.RentaCarId);
}


createCar(car: Car){
  car.Name = this.carForm.get('CarName').value;
  car.RentaCarId = this.carForm.get('CarRci').value;
  car.Price = this.carForm.get('CarPrice').value;

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
  car.RentaCarId = this.carForm.get('CarRci').value;

  if(this.carForm.get('CarName').value)
  car.Name = this.carForm.get('CarName').value;

  if(this.carForm.get('CarPrice').value)
  car.Price = this.carForm.get('CarPrice').value;

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


rateCar(car: Car, rate: number){
  car.Id = this.selectedCar.Id;
  car.Rate = this.selectedCar.Rate;
  car.RatedBy = this.selectedCar.RatedBy;
 
  var newRate: number = 
  Number.parseInt((car.Rate * car.RatedBy).toString())
  + Number.parseInt(rate.toString());
  car.RatedBy ++;
  car.Rate = Number.parseFloat(( newRate / car.RatedBy).toString());


  this.carService.updateCar(car).subscribe(
    () =>{
      this.message = 'Car is rated.';
      this.loadCars();
      this.saved = true;
      this.selectedCar = null;
      this.rateForm.reset();
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
  this.officeForm.controls.OfficeRci.setValue(branchOffice.RentaCarId);
}

createBranchOffice(office: BranchOffice){
  office.Name = this.officeForm.get('BranchOfficeName').value;
  office.Address = this.officeForm.get('BranchOfficeAddress').value;
  office.RentaCarId = this.officeForm.get('OfficeRci').value;

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
  office.RentaCarId = this.officeForm.get('OfficeRci').value;

  if(this.officeForm.get('BranchOfficeName').value )
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
