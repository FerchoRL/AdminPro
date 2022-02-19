import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

//Modulos
import { SharedModule } from "../shared/shared.module";
import { RouterModule } from "@angular/router";

//Componentes
import { Graph1Component } from "./graph1/graph.component";
import { ProgressComponent } from "./progress/progress.component";
import { PagesComponent } from "./pages.component";
import { DashboardComponent } from "./dashboard/dashboard.component";



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
        SharedModule
    ]
})
export class PagesModule {}