import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImgPipe } from './img.pipe';

//Con el pipe recibo informacion visual y la transformo a lo que necesite


@NgModule({
  declarations: [
    ImgPipe
  ],
  exports: [
    ImgPipe
  ]
})
export class PipesModule { }
