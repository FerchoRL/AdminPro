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
import { FormsModule } from "@angular/forms";
import { ComponentsModule } from "../components/components.module";



@NgModule({//Aqui manejamos modulos de la ruta autenticada
    declarations: [
        DashboardComponent,
        Graph1Component,
        ProgressComponent,
        PagesComponent
    ],
    exports: [
        DashboardComponent,
        Graph1Component,
        ProgressComponent,
        PagesComponent
    ],
    imports: [
        CommonModule,
        RouterModule,
        SharedModule,
        FormsModule,
        ComponentsModule
    ]
})
export class PagesModule {}