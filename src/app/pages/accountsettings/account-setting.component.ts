import { Component, OnInit } from "@angular/core";
import { SettingsService } from "src/app/services/settings.service";

@Component({
    selector: 'app-account-settings',
    templateUrl: './account-settings.component.html'
})

export class AccountSettingsComponent implements OnInit{
    //Move all my code to the service file and inject on constructor
    constructor(private settingsService: SettingsService){}

    ngOnInit(): void{
        //Indica en que theme esta actualmente
        this.settingsService.checkCurrentTheme();
    }

    changeTheme( theme: string ){
        //Update new theme and check
        this.settingsService.changeTheme( theme );
    }

    
}