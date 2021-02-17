import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ViewComponent } from './view/view.component';
import { RentACarComponent } from './companies/rent-a-car.component';
import { AirlineComponent } from './companies/airline.component';
import { UserComponent } from './users/user.component';
import {LoginComponent} from './login/login.component';
import {AdminDashboardComponent} from './admin-dashboard/admin-dashboard.component';
import {UserDashboardComponent} from './user-dashboard/user-dashboard.component';
import {BaseComponent} from './base/base.component';
import { RegisterComponent } from './register/register.component';
import { AdminComponent } from './admin/admin.component';
import { AddAirlineComponent } from './add-airline/add-airline.component';
import { AddRentacarComponent } from './add-rentacar/add-rentacar.component';
import {AirlineadmindashboardComponent} from './airlineadmindashboard.component';
import {FlightComponent} from './companies/flight.component';
import { ReserveRentaCarComponent } from './reserve-car/reserve-car.component';
import { UserProfileComponent } from './profile/user-profile.component';
import { CarAdminDashboardComponent } from './caradmindashboard.component';
import { AdminProfileComponent } from './profile/admin-profile.component';
import { ManageRentacarComponent } from './manage-rentacar/manage-rentacar.component';
import {SearchFlightComponent} from './search-flight/search-flight.component';
import {ShowReservationsComponent} from './show-reservations/show-reservations.component';
import {ReserveFlightComponent} from './reserve-flight/reserve-flight.component';
import {VerificationComponent} from './verification/verification.component';
const routes: Routes = [
{
  path: '',
  redirectTo: 'view',
  pathMatch: 'full',
  
},

//  path: '',
//  component: BaseComponent,
//  children: [
    {
      path: 'admindashboard',
      component: AdminDashboardComponent,
      children: [
        {
            path: 'airline',
            component: AirlineComponent
        },
        {
          path: 'rent-a-car',
          component: RentACarComponent
        },
        {
          path: 'user',
          component: UserComponent
        },
        {
          path: 'companies',
          component: AdminComponent,
          children: [
            {
              path: 'addAirline',
              component: AddAirlineComponent
            },
            {
              path: 'addRentacar',
              component: AddRentacarComponent
            }
          ]
        }

      ]
    },
    
    {
      path: 'airlineadmindashboard',
      component: AirlineadmindashboardComponent,
      /*children: [
        {
          path: 'flight',
          component: FlightComponent
        },

      ]*/
    },

    {
      path: 'caradmindashboard',
      component: CarAdminDashboardComponent,
    },

    {
      path: 'userdashboard/:id',
      component: UserDashboardComponent,
  /*    children: [
        {
          path: 'reserveRentaCar',   <- ovde???
          component: ReserveRentaCarComponent
        }
        {
          path: 'airline',
          component: AirlineComponent
        },
        {
          path: 'rentacar',
          component: RentACarComponent
        } */
    //  ]
    },
//  ]
    {
      path:'userdashboard',
      component: UserDashboardComponent
    },
{
    path: 'companies',
    component: AdminComponent /*,
    children: [
      {
        path: 'addAirline',
        component: AddAirlineComponent
      },
      {
        path: 'addRentacar',
        component: AddRentacarComponent
      }
    ] */
},


/*{
  path: 'rentacar',
  component: RentACarComponent
},

{ 
  path: 'airline',
  component: AirlineComponent
},
*/
{
  path: 'flight',
  component: FlightComponent
},
{
  path: 'user',
  component: UserComponent
},

{
  path: 'login',
  component: LoginComponent
},

{
  path: 'rentacar',
  component: RentACarComponent
},

{
  path: 'airline',
  component: AirlineComponent
},

{
  path:'register',
  component: RegisterComponent
},

{
  path:'addAirline',
  component: AddAirlineComponent
},

{
  path: 'addRentacar',
  component: AddRentacarComponent
},

{
  path: 'reserveRentaCar',
  component: ReserveRentaCarComponent
},

{
  path: 'userProfile',
  component: UserProfileComponent
},

{
  path: 'adminProfile',
  component: AdminProfileComponent
},

{
  path: 'manageRentacar',
  component: ManageRentacarComponent
},

{
  path:'searchFlight',
  component: SearchFlightComponent
},

{
  path:'showallreservations',
  component: ShowReservationsComponent
},

{
  path:'flightreservation',
  component: ReserveFlightComponent
},
{
  path:'verification/:id',
  component: VerificationComponent
},

/*{
  path: 'admindashboard',
  component: AdminDashboardComponent
},

{
  path: 'userdashboard',
  component: UserDashboardComponent
}*/

{
  path: 'view',
  component: ViewComponent
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' }) ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

