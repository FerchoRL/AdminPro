import { Component, OnInit } from "@angular/core";

@Component({
    selector: 'app-promises',
    templateUrl: 'promises.component.html'
})

export class PromisesComponent implements OnInit {
    constructor() { }
    //PROMISE EXAMPLE
    // ngOnInit(): void {
    //     const mypromise = new Promise( (resolve, reject) => {
    //         if (false){
    //             resolve('Hola Mundo')//Si sale bien
    //         }else{
    //             reject('Algo Salio mal')//Si la promesa no se resuelve
    //         }
    //     });
    //     //Cuando la promesa se hace correctamente
    //     mypromise.then( (msg) => {
    //         console.log('Termine')
    //         console.log(msg)
    //     }).catch(error => console.log('Error en mi promesa',error));//Si sale mal cacho el error

    //     console.log('Fin del Init')
    // }

    ngOnInit(): void {

        this.getUser().then(users => {//Trabaja con la promesa resuelta
            console.log(users)
        });
    }

    getUser() {
        return new Promise(resolve => {//Promise that call get API and receive a response
            fetch('https://reqres.in/api/users')
                //Get json
                .then(resp => resp.json())
                // get body.data and resolve the promise
                .then(body => resolve(body.data));
        });
    }
}