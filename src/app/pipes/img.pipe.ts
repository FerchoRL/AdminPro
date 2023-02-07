import { Pipe, PipeTransform } from '@angular/core';
import { environment } from 'src/environments/environment';

const base_url = environment.base_url

@Pipe({
  name: 'img'
})
export class ImgPipe implements PipeTransform {

  transform(img: string = '', collection: 'users' | 'doctors' | 'hospitals'): string {
    if (img.includes('https')) {
      return img;
    }
    if (img) {
      return `${base_url}/upload/${collection}/${img}`;
    } else {
      return `${base_url}/upload/${collection}/not-img.jpg`;
    }
  }

}
