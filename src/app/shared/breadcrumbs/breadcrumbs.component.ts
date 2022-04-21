import { Component, OnDestroy } from "@angular/core";
import { ActivationEnd, Router } from "@angular/router";
import { filter, map, Subscription } from "rxjs";

@Component({
    selector: 'app-breadcrumbs',
    templateUrl: './breadcrumbs.component.html'
})
export class BreadcrumbsComponent implements OnDestroy {
    public titlePage: string = '';
    public titleSubs$: Subscription | undefined;
    constructor(private router: Router) {
        this.titleSubs$ = this.getDataFromRouter()
            //Desestructurar informacion
            .subscribe(({ titlePage }) => {
                this.titlePage = titlePage;
                document.title = `AdminPro - ${titlePage}`;
            });
    }
    //Implement unsubscribe when user logout
    ngOnDestroy(): void {
        this.titleSubs$?.unsubscribe();
    }

    getDataFromRouter() {
        //al llamar al router se cuenta con los siguientes eventos
        //La data que necesitamos esta dentro de ActivationEnd -> snapshot -> data. Como en el proyecto hay dos usos de router link, nos aparecen dos activation end. Por eso los filtramos por el que tenga firstChild igual a null (seria el router link padre)
        return this.router.events
            .pipe(
                filter((event: any) => event instanceof ActivationEnd),
                filter((event: ActivationEnd) => event.snapshot.firstChild === null),
                map((event: ActivationEnd) => event.snapshot.data)
            )
    }
}