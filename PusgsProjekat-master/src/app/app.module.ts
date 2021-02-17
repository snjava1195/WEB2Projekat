import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { UserService} from '../app/users/user.service';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DatePipe } from '@angular/common';
import { ViewComponent } from './view/view.component';
import { AirlineComponent } from './companies/airline.component';
import { MatNativeDateModule } from '@angular/material/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { RentACarComponent } from './companies/rent-a-car.component';

//import { UserService } from './users/user';
//import { UserService } from './users/user.service';
import { UserComponent } from './users/user.component';
import { HttpClientModule, HttpClient} from '@angular/common/http';
import {  
  MatButtonModule  
} from '@angular/material/button';  
import{ MatMenuModule} from '@angular/material/menu';
import{ MatDatepickerModule} from '@angular/material/datepicker';

import{ MatIconModule} from '@angular/material/icon';
import{ MatCardModule} from '@angular/material/card';
import{ MatSidenavModule} from '@angular/material/sidenav';
import{MatFormFieldModule} from '@angular/material/form-field';
import{MatInputModule} from '@angular/material/input'; 
import{MatTooltipModule} from '@angular/material/tooltip';
import{MatToolbarModule} from '@angular/material/toolbar';
import { MatRadioModule } from '@angular/material/radio';  
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 

import { ToastrModule } from 'ngx-toastr';
import { LoginComponent } from './login/login.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { BaseComponent } from './base/base.component';
import { LoginService } from './login.service';
import { RegisterComponent } from './register/register.component';
import { AdminComponent } from './admin/admin.component';
import { AddAirlineComponent } from './add-airline/add-airline.component';
//import { AddRentacarComponent } from './add-rentacar/add-rentacar.component';
import { FlightComponent } from './companies/flight.component';
import {CommonModule} from '@angular/common';
import { AirlineadmindashboardComponent } from './airlineadmindashboard.component';
import { ShowReservationsComponent } from './show-reservations/show-reservations.component';
import { SearchFlightComponent } from './search-flight/search-flight.component';
import { ReserveFlightComponent } from './reserve-flight/reserve-flight.component';
import { VerificationComponent } from './verification/verification.component';

@NgModule({
  declarations: [
    AppComponent, 
    ViewComponent,
    AirlineComponent, 
    RentACarComponent,
    UserComponent,
    LoginComponent,
    AdminDashboardComponent,
    UserDashboardComponent,
    BaseComponent,
    RegisterComponent,
    AdminComponent,
    AddAirlineComponent,
   // AddRentacarComponent,
    FlightComponent,
    AirlineadmindashboardComponent,
    ShowReservationsComponent,
    SearchFlightComponent,
    ReserveFlightComponent,
    VerificationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatButtonModule,  
    MatMenuModule,  
    MatDatepickerModule,
    MatDatepickerModule,
        MatButtonModule,
        MatFormFieldModule,
        MatNativeDateModule,  
    //MatNativeDateModule,  
    MatIconModule,  
    MatRadioModule,  
    MatCardModule,  
    MatSidenavModule,  
    MatFormFieldModule,  
    MatInputModule,  
    MatTooltipModule,  
    MatToolbarModule,  
    CommonModule,
   
    ToastrModule.forRoot()
  ],
  providers: [UserService, HttpClientModule, AppRoutingModule, LoginService, DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
