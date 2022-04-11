import { Component, OnInit } from "@angular/core";

@Component({
    selector: 'app-account-settings',
    templateUrl: './account-settings.component.html'
})

export class AccountSettingsComponent implements OnInit{

    //Get element from index with theme as ID
    public linkTheme = document.querySelector('#theme');

    ngOnInit(): void{

    }

    changeTheme( theme: string ){
        //Create URL with new theme and apply to theme id
        const url = `./assets/css/colors/${ theme }.css`
        this.linkTheme?.setAttribute('href', url);
        //save in local storage
        localStorage.setItem('theme', url);
    }
}