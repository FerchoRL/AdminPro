import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

//Modulos
import { SharedModule } from "../shared/shared.module";
import { RouterModule } from "@angular/router";

//Componentes
import { Graph1Component } from "./graph1/graph1.component";
import { ProgressComponent } from "./progress/progress.component";
import { PagesComponent } from "./pages.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ComponentsModule } from "../components/components.module";
import { AccountSettingsComponent } from "./accountsettings/account-setting.component";
import { PromisesComponent } from "./promises/promises.component";
import { RxjsComponent } from "./rxjs/rxjs.component";
import { ProfileComponent } from "./profile/profile.component";
import { UsersComponent } from "./maintenance/users/users.component";
import { DoctorsComponent } from "./maintenance/doctors/doctors.component";
import { HospitalsComponent } from './maintenance/hospitals/hospitals.component';
import { PipesModule } from "../pipes/pipes.module";



@NgModule({//Aqui manejamos modulos de la ruta autenticada
    declarations: [
        DashboardComponent,
        Graph1Component,
        ProgressComponent,
        PagesComponent,
        AccountSettingsComponent,
        PromisesComponent,
        RxjsComponent,
        ProfileComponent,
        UsersComponent,
        DoctorsComponent,
        HospitalsComponent
    ],
    exports: [
        DashboardComponent,
        Graph1Component,
        ProgressComponent,
        PagesComponent,
        AccountSettingsComponent,
        PromisesComponent,
        RxjsComponent,
        ProfileComponent,
        UsersComponent
    ],
    imports: [
        CommonModule,
        RouterModule,
        ReactiveFormsModule,
        SharedModule,
        FormsModule,
        ComponentsModule,
        PipesModule
    ]
})
export class PagesModule {}