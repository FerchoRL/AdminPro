import { HttpClient } from "@angular/common/http";
import { Injectable, NgZone } from "@angular/core";
import { Router } from "@angular/router";
import { catchError, map, tap } from "rxjs/operators";
import { Observable, of } from "rxjs";

import { environment } from "src/environments/environment";
import { LoginForm } from "../interfaces/login-form.interfaces";
import { RegisterForm } from "../interfaces/register-form.interfaces";

const base_url = environment.base_url;
declare const gapi: any;

@Injectable({
    providedIn: 'root'
})
export class UserService {

    public auth2: any;

    constructor(private http: HttpClient,
        private router: Router,
        private ngZone: NgZone) {
        //Cada vez que se entra por primera vez a la aplicacion
        this.googleInit();
    }

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
        return this.http.post(`${base_url}/login/google`, { token })
            .pipe(
                tap((resp: any) => {
                    localStorage.setItem('token', resp.token);
                })
            );
    }

    //Renew token
    validateToken(): Observable<boolean> {
        const token = localStorage.getItem('token') || '';
        return this.http.get(`${base_url}/login/loginRenew`, {
            headers: {
                'x-token': token
            }
        }).pipe(//renuevo el token
            tap((resp: any) => {
                //console.log(resp);
                localStorage.setItem('token', resp.newToken);//Debe ser igual a la respuesta que trae mi api
            }),
            //Mapeo la respuesta, si existe token es true, si no es false
            map(resp => true),
            catchError(error => of(false))//Cacho el error y uso el off que crea un nuevo observable
        );
    }

    //Logout (didn't use api)
    logout() {
        localStorage.removeItem('token');//Remove token
        //Logout from google
        //El signout es libreria externa de angular y me regresa un warning de ngZone el cual lo resuelvo asi:
        this.auth2.signOut().then(() => {
            this.ngZone.run(() => {
                //Redirect to login
                this.router.navigateByUrl('/login');
            })
        });
    }

    googleInit() {
        return new Promise((resolve) => {
            console.log('google init');
            gapi.load('auth2', () => {
                // Retrieve the singleton for the GoogleAuth library and set up the client.
                this.auth2 = gapi.auth2.init({
                    client_id: '233723854836-f5mr8u91gia89t1t49uskai2kuf6b0eb.apps.googleusercontent.com',
                    cookiepolicy: 'single_host_origin',
                });
                resolve(this.auth2);
            });
        })

    }


}