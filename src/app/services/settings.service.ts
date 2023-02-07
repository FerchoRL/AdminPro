import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  //Get element from index with theme as ID
  private linkTheme = document.querySelector('#theme');

  constructor() {
    //setup a theme according local storage
    //Verify local storage theme and build the URL
    let url = localStorage.getItem('theme') || './assets/css/colors/default-dark.css';
    //Add URL to href theme
    this.linkTheme?.setAttribute('href', url);
    //Set url theme to localstorage
    localStorage.setItem('theme', url);
  }

  changeTheme(theme: string) {
    //Create URL with new theme and apply to theme id
    const url = `./assets/css/colors/${theme}.css`
    this.linkTheme?.setAttribute('href', url);
    //save in local storage
    localStorage.setItem('theme', url);
    this.checkCurrentTheme();
  }

  checkCurrentTheme(){
    //Get elements with selector class
    const links = document.querySelectorAll('.selector');
        
    links.forEach( element =>{
        //to deselect all the items
        element.classList.remove('working');
        //get theme name
        const btnTheme = element.getAttribute('data-theme');
        //build url
        const themeUrl = `./assets/css/colors/${ btnTheme }.css`;
        //get current theme
        const currentTheme = this.linkTheme?.getAttribute('href');
        // If both are same then add working class
        if(themeUrl === currentTheme){
            element.classList.add('working');
        }
    })
}
}
