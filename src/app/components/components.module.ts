//Modules
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgChartsModule } from 'ng2-charts';

//Components
import { IncreaseComponent } from './increase/increase.component';
import { GraphComponent } from './graph/graph.component';



@NgModule({
  declarations: [
    IncreaseComponent,
    GraphComponent
  ],
  exports:[
    IncreaseComponent,
    GraphComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgChartsModule
  ]
})
export class ComponentsModule { }
