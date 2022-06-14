import { HttpClient } from "@angular/common/http";
import { Injectable, NgZone } from "@angular/core";
import { Router } from "@angular/router";
import { catchError, map, tap } from "rxjs/operators";
import { Observable, of } from "rxjs";

import { environment } from "src/environments/environment";
import { LoginForm } from "../interfaces/login-form.interfaces";
import { RegisterForm } from "../interfaces/register-form.interfaces";
import { User } from "../models/user.model";

const base_url = environment.base_url;
declare const gapi: any;

@Injectable({
    providedIn: 'root'
})
export class UserService {

    public auth2: any;
    public user!: User;

    constructor(private http: HttpClient,
        private router: Router,
        private ngZone: NgZone) {
        //Cada vez que se entra por primera vez a la aplicacion
        this.googleInit();
    }

    get token(): string {
        return localStorage.getItem('token') || '';
    }

    get uid(): string {
        return this.user.uid || '';
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
        return this.http.get(`${base_url}/login/loginRenew`, {
            headers: {
                'x-token': this.token
            }
        }).pipe(//renuevo el token
            map((resp: any) => {
                const { userName, email, role, google, img = '', uid } = resp.userDB
                //Create a instance of my user model
                this.user = new User(userName, email, '', img, google, role, uid);
                localStorage.setItem('token', resp.newToken);//Debe ser igual a la respuesta que trae mi api
                return true;
            }),
            catchError(error => {
                //console.log(error)
                return of(false)
            })//Cacho el error y uso el off que crea un nuevo observable
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
            gapi.load('auth2', () => {
                // Retrieve the singleton for the GoogleAuth library and set up the client.
                this.auth2 = gapi.auth2.init({
                    client_id: '233723854836-f5mr8u91gia89t1t49uskai2kuf6b0eb.apps.googleusercontent.com',
                    cookiepolicy: 'single_host_origin',
                });
                resolve(this.auth2);
            });
        });
    }

    updateProfileUser(data: { email: string, userName: string, role: string}) {
        data = {
            ...data,
            role: this.user.role || ""
        };
        return this.http.put(`${base_url}/users/${this.uid}`, data, {
            headers: {
                'x-token': this.token
            }
        });
    }
}