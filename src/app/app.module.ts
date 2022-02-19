import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

//Modulos
import { AppRoutingModule } from './app-routing.module';
import { PagesModule } from './pages/pages.module';

//Componentes
import { AppComponent } from './app.component';
import { LogginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { NopagefoundComponent } from './pages/nopagefound/nopagefound.component';

@NgModule({
  declarations: [//Aqui declaro los componentes que usara mi proyecto
    AppComponent,
    LogginComponent,
    RegisterComponent,
    NopagefoundComponent
  ],
  imports: [//Aqui van los modulos
    BrowserModule,
    AppRoutingModule,
    PagesModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
