import { Component, NgZone, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import Swal from "sweetalert2";
import { UserService } from "src/app/services/user.service";

declare const gapi: any;

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LogginComponent implements OnInit {

    public auth2: any;

    constructor(private router: Router,
        private fb: FormBuilder,
        private userService: UserService,
        private ngZone: NgZone) { }

    ngOnInit(): void {
        this.renderButton();//Google sign in button
    }

    //TODO: Implement validations for email and pass


    //TODO: FormBuilder group is deprecated
    public loginForm = this.fb.group({//If local storage has email return email if not empty string
        email: [localStorage.getItem('email') || '', [Validators.required, Validators.email]],
        password: ['', [Validators.required]],
        remember: [false]
    });

    login() {
        //TODO: subscribe is deprecated I have to check

        this.userService.login(this.loginForm.value)
            .subscribe(resp => {
                //console.log(resp);
                //Save email in local storage when remember me check button is true
                if (this.loginForm.get('remember')?.value) {
                    localStorage.setItem('email', this.loginForm.get('email')?.value);
                } else {
                    localStorage.removeItem('email');
                }

                //Navigate dashboard
                this.router.navigateByUrl('/');
            }, (err) => {
                //Estas con las rutas en donde podria encontrar mis errores provenientes del backend
                //TODO: implement validations when didn't send email or password
                let errorMsg = err.error.msg;
                console.log(errorMsg);
                Swal.fire('Error', errorMsg, 'error');
            });
    }


    /**
     * IMPLEMENT FUNCTIONS TO GET TOKEN FROM GOOGLE SIGN IN
     */

    renderButton() {
        gapi.signin2.render('my-signin2', {
            'scope': 'profile email',
            'width': 240,
            'height': 50,
            'longtitle': true,
            'theme': 'dark'
        });
        this.startApp();
    }

    async startApp() {

        //Implement refactor for google Init return auth2 in a promise
        await this.userService.googleInit();
        this.auth2 = this.userService.auth2;
        this.attachSignin(document.getElementById('my-signin2'));

    };

    attachSignin(element: any) {
        this.auth2.attachClickHandler(element, {},
            (googleUser: any) => {
                const id_token = googleUser.getAuthResponse().id_token;//Get token
                //LoginGoogle libreria fuera de angular que causa issue de ngZone
                this.userService.loginGoogle(id_token).subscribe(
                    resp => {
                        this.ngZone.run(() => {
                            //REDIRECT dashboard
                            this.router.navigateByUrl('/');
                        })
                    }
                );
            }, (error: any) => {
                alert(JSON.stringify(error, undefined, 2));
            });
    }
    /**
   * IMPLEMENT FUNCTIONS TO GET TOKEN FROM GOOGLE SIGN IN
   */

}