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
      path: 'userdashboard',
      component: UserDashboardComponent,
 /*     children: [
        {
          path: 'airline',
          component: AirlineComponent
        },
        {
          path: 'rentacar',
          component: RentACarComponent
        }
      ]*/
    },
//  ]
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
  imports: [RouterModule.forRoot(routes) ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

