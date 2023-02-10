import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "../guard/auth.guard";

//Components
import { AccountSettingsComponent } from "./accountsettings/account-setting.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { Graph1Component } from "./graph1/graph1.component";
import { DoctorsComponent } from "./maintenance/doctors/doctors.component";
import { HospitalsComponent } from "./maintenance/hospitals/hospitals.component";
import { UsersComponent } from "./maintenance/users/users.component";
import { PagesComponent } from "./pages.component";
import { ProfileComponent } from "./profile/profile.component";
import { ProgressComponent } from "./progress/progress.component";
import { PromisesComponent } from "./promises/promises.component";
import { RxjsComponent } from "./rxjs/rxjs.component";
import { UpdateDoctorComponent } from "./maintenance/doctors/updateDoctor.component";
import { SearchComponent } from "./searches/search.component";

const routes: Routes = [
  {
    path: 'dashboard',
    component: PagesComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', component: DashboardComponent, data: { titlePage: 'Dashboard' } },
      { path: 'progress', component: ProgressComponent, data: { titlePage: 'Progress' } },
      { path: 'graph1', component: Graph1Component, data: { titlePage: 'Graph1' } },
      { path: 'account-settings', component: AccountSettingsComponent, data: { titlePage: 'Account-Settings' } },
      { path: 'search/:searchValue', component: SearchComponent, data: { titlePage: 'Busquedas' } },
      { path: 'promises', component: PromisesComponent, data: { titlePage: 'Promises' } },
      { path: 'rxjs', component: RxjsComponent, data: { titlePage: 'Rxjs' } },
      { path: 'profile', component: ProfileComponent, data: {titlePage: 'Profile'}},

      //Maintenance
      { path: 'users', component: UsersComponent, data: {titlePage: 'Users'}},
      { path: 'doctors', component: DoctorsComponent, data: {titlePage: 'Doctors'}},
      { path: 'updateDoctor/:id', component: UpdateDoctorComponent, data: {titlePage: 'UpdateDoctors'}},
      { path: 'hospitals', component: HospitalsComponent, data: {titlePage: 'Hospitals'}}

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class PagesRoutingModule { }