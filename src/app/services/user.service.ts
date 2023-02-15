import { HttpClient } from "@angular/common/http";
import { Injectable, NgZone } from "@angular/core";
import { Router } from "@angular/router";
import { catchError, map, tap } from "rxjs/operators";
import { Observable, of } from "rxjs";

import { environment } from "src/environments/environment";
import { LoginForm } from "../interfaces/login-form.interfaces";
import { RegisterForm } from "../interfaces/register-form.interfaces";
import { User } from "../models/user.model";
import { LoadUser } from "../interfaces/load-users.interface";

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

    get headers() {
        return {
            headers: {
                'x-token': this.token
            }
        }
    }

    get role(): 'ADMIN_ROLE' | 'USER_ROLE' | undefined{
        return this.user.role;
    }

    saveInLocalStorage(token: string, menu: any) {
        localStorage.setItem('token', token);
        localStorage.setItem('menu', JSON.stringify(menu));

    }

    //Hago mi interfaz RegisterForm para poder acceder a sus propiedades y el tipado
    //Register
    createUser(formData: RegisterForm) {
        //Call create user api from my backend
        //Return an observable so I have to subscribe
        return this.http.post(`${base_url}/users`, formData)
            .pipe(
                tap((resp: any) => {
                    this.saveInLocalStorage(resp.token, resp.menu);
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
                    this.saveInLocalStorage(resp.token, resp.menu);
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
                    this.saveInLocalStorage(resp.token, resp.menu);
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
                this.saveInLocalStorage(resp.newToken, resp.menu);
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
        //TODO: Delete menu
        localStorage.removeItem('token');//Remove token
        localStorage.removeItem('menu');//Remove token
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

    updateProfileUser(data: { email: string, userName: string, role: string }) {
        data = {
            ...data,
            role: this.user.role || ""
        };
        return this.http.put(`${base_url}/users/${this.uid}`, data, this.headers);
    }

    loadUsers(offset: number = 0, limit: number = 0) {
        const url = `${base_url}/users?limit=${limit}&offset=${offset}`;
        return this.http.get<LoadUser>(url, this.headers)
            //Response return ok msg, countUsers and allUsers
            .pipe(
                //Por lo que entiendo, mapeo a los usuarios para poder acceder a sus propiedades
                map(resp => {
                    const users = resp.allUsers.map(
                        newUser => new User(newUser.userName, newUser.email, '', newUser.img, newUser.google, newUser.role, newUser.uid)
                    );

                    return {
                        countUsers: resp.countUsers,
                        allUsers: users
                    }
                })
            );
    }

    removeUser(user: User) {
        const url = `${base_url}/users/${user.uid}`;
        return this.http.delete(url, this.headers);
    }

    saveUser(user: User) {
        return this.http.put(`${base_url}/users/${user.uid}`, user, this.headers);
    }
}