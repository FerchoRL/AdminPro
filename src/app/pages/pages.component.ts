import { Component, OnInit } from "@angular/core";

@Component({
    selector: 'app-pages',
    templateUrl: './pages.component.html'
})

export class PagesComponent implements OnInit {

    //Get element from index with theme as ID
    public linkTheme = document.querySelector('#theme');
    ngOnInit(): void {

        //setup a theme according local storage

        //Verify local storage theme and build the URL
        let url = localStorage.getItem('theme') || './assets/css/colors/default-dark.css';
        //Add URL to href theme
        this.linkTheme?.setAttribute('href',url);
        //Set url theme to localstorage
        localStorage.setItem('theme',url);
    }
}