import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "../guard/auth.guard";

//Components
import { AccountSettingsComponent } from "./accountsettings/account-setting.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { Graph1Component } from "./graph1/graph1.component";
import { UsersComponent } from "./maintenance/users/users.component";
import { PagesComponent } from "./pages.component";
import { ProfileComponent } from "./profile/profile.component";
import { ProgressComponent } from "./progress/progress.component";
import { PromisesComponent } from "./promises/promises.component";
import { RxjsComponent } from "./rxjs/rxjs.component";

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
      { path: 'promises', component: PromisesComponent, data: { titlePage: 'Promises' } },
      { path: 'rxjs', component: RxjsComponent, data: { titlePage: 'Rxjs' } },
      { path: 'profile', component: ProfileComponent, data: {titlePage: 'Profile'}},
      { path: 'users', component: UsersComponent, data: {titlePage: 'Users'}}

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class PagesRoutingModule { }