import { Component } from "@angular/core";
import { Observable, retry } from "rxjs";

@Component({
    selector: 'app-rxjs',
    templateUrl: './rxjs.component.html'
})

export class RxjsComponent {

    constructor() {

        //Hay que suscribirse para que se ejecute el codigo de la susbcripcion
        //El pipe transforma y puede rehacer la informacion
        this.returnObservable().pipe(
            retry()//Retry intenta nuevamente el observable
        ).subscribe({//Dentro del subscribe hay 3 opciones
            next: value => console.log('Subs: ', value),//Opcion next que es cuando se ejecuta
            error: err => console.warn('Error: ', err),//Opcion error 
            complete: () => console.info('Obs terminado')//Opcion complete
        });
    }

    returnObservable(): Observable<number> {//Le indico el tipo de observable
        //Signo de $ al hacer referencia a un nuevo observable
        let i = -1;
        const obs$ = new Observable<number>(observer => {//Se genera una subscripcion
            const interval = setInterval(() => {
                i++;
                observer.next(i);//Se ejecuta infinitamente
                if (i == 4) {//Cancelar intervalo cuando cumpla la condicion
                    clearInterval(interval);
                    observer.complete();
                }
                if (i == 2) {
                    observer.error('Generando un error')
                }
                //console.log('jelouda');
            }, 1000)
        });

        return obs$;

    }
}