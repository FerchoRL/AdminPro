import { Component, OnInit } from "@angular/core";
import { SettingsService } from "../services/settings.service";

declare function customInitFunction(): void;
@Component({
    selector: 'app-pages',
    templateUrl: './pages.component.html'
})

export class PagesComponent implements OnInit {
    constructor( private settingsServices: SettingsService ){}
    ngOnInit(): void {
        //Funcion que se declara en el custom.js (se llama en el index) para que cargue la pagina completamente
        customInitFunction();
    }
}