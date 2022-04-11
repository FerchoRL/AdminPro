import { Component, OnInit } from "@angular/core";

@Component({
    selector: 'app-account-settings',
    templateUrl: './account-settings.component.html'
})

export class AccountSettingsComponent implements OnInit{

    //Get element from index with theme as ID
    public linkTheme = document.querySelector('#theme');
    //Get elements with selector class
    public links!: NodeListOf<Element>;

    ngOnInit(): void{
        this.links = document.querySelectorAll('.selector');
        this.checkCurrentTheme();
    }

    changeTheme( theme: string ){
        //Create URL with new theme and apply to theme id
        const url = `./assets/css/colors/${ theme }.css`
        this.linkTheme?.setAttribute('href', url);
        //save in local storage
        localStorage.setItem('theme', url);
        this.checkCurrentTheme();
    }

    checkCurrentTheme(){
        
        this.links.forEach( element =>{
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