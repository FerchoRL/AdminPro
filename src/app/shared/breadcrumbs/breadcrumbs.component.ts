import { Component } from "@angular/core";
import { ActivationEnd, Router } from "@angular/router";
import { filter, map } from "rxjs";

@Component({
    selector: 'app-breadcrumbs',
    templateUrl: './breadcrumbs.component.html'
})
export class BreadcrumbsComponent{
    public titlePage: string = '';
    constructor( private router: Router){
        this.getDataFromRouter();
    }

    getDataFromRouter(){
        this.router.events
        .pipe(
            filter( (event: any) => event instanceof ActivationEnd),
            filter( (event: ActivationEnd) => event.snapshot.firstChild === null),
            map( (event: ActivationEnd) => event.snapshot.data)
        )
        //Desestructurar informacion
        .subscribe(({ titlePage }) =>{
            this.titlePage = titlePage;
            document.title = `AdminPro - ${titlePage}`;
        });
    }
}