import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
//Modules
import { PagesRoutingModule } from './pages/pages.routing';
//Components
import { LogginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { NopagefoundComponent } from './nopagefound/nopagefound.component';


const routes: Routes = [
  
  { path: 'login', component: LogginComponent },
  { path: 'register', component: RegisterComponent },

  { path: '**', component: NopagefoundComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    PagesRoutingModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
