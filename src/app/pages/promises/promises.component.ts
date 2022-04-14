import { Component, OnInit } from "@angular/core";

@Component({
    selector: 'app-promises',
    templateUrl: 'promises.component.html'
})

export class PromisesComponent implements OnInit{
    constructor() {}

    ngOnInit(): void {
        const mypromise = new Promise( (resolve, reject) => {
            if (false){
                resolve('Hola Mundo')//Si sale bien
            }else{
                reject('Algo Salio mal')//Si la promesa no se resuelve
            }
        });
        //Cuando la promesa se hace correctamente
        mypromise.then( (msg) => {
            console.log('Termine')
            console.log(msg)
        }).catch(error => console.log('Error en mi promesa',error));//Si sale mal cacho el error

        console.log('Fin del Init')
    }
}