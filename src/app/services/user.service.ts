import { HttpClient } from "@angular/common/http";
import { tap } from "rxjs/operators";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { LoginForm } from "../interfaces/login-form.interfaces";
import { RegisterForm } from "../interfaces/register-form.interfaces";

const base_url = environment.base_url;

@Injectable({
    providedIn: 'root'
})
export class UserService {
    constructor(private http: HttpClient) { }

    //Hago mi interfaz RegisterForm para poder acceder a sus propiedades y el tipado
    //Register
    createUser(formData: RegisterForm) {
        //Call create user api from my backend
        //Return an observable so I have to subscribe
        return this.http.post(`${base_url}/users`, formData)
            .pipe(
                tap((resp: any) => {
                    localStorage.setItem('token', resp.token);
                })
            );
    }
    //Login
    login(formData: LoginForm) {
        //Call create user api from my backend
        //Return an observable so I have to subscribe
        return this.http.post(`${base_url}/login`, formData)
            .pipe(
                tap((resp: any) => {
                    localStorage.setItem('token', resp.token);
                })
            );
    }

    //LoginGoogle
    loginGoogle(token: string) {
        //Call create user api from my backend
        //Return an observable so I have to subscribe
        return this.http.post(`${base_url}/login/google`, {token})
            .pipe(
                tap((resp: any) => {
                    localStorage.setItem('token', resp.token);
                })
            );
    }
}