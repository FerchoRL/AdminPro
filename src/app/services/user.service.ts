import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { RegisterForm } from "../interfaces/register-form.interfaces";

const base_url = environment.base_url;

@Injectable({
    providedIn: 'root'
})
export class UserService {
    constructor( private http: HttpClient){}

    //Hago mi interfaz RegisterForm para poder acceder a sus propiedades y el tipado
    createUser( formData: RegisterForm){
        //Call create user api from my backend
        //Return an observable so I have to subscribe
        return this.http.post(`${ base_url}/users`,formData);
    }
}