//Modules
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgChartsModule } from 'ng2-charts';

//Components
import { IncreaseComponent } from './increase/increase.component';
import { DoughnutGraphComponent } from './doughnut/doughnut-graph.component';



@NgModule({
  declarations: [
    IncreaseComponent,
    DoughnutGraphComponent
  ],
  exports:[
    IncreaseComponent,
    DoughnutGraphComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgChartsModule
  ]
})
export class ComponentsModule { }
