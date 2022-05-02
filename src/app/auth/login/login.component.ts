import { Component } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import Swal from "sweetalert2";
import { UserService } from "src/app/services/user.service";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LogginComponent {

    constructor(private router: Router,
        private fb: FormBuilder,
        private userService: UserService) { }

    //TODO: Implement validations for email and pass


    //TODO: FormBuilder group is deprecated
    public loginForm = this.fb.group({//If local storage has email return email if not empty string
        email: [ localStorage.getItem('email') || '', [Validators.required, Validators.email]],
        password: ['', [Validators.required]],
        remember: [false]
    });

    login() {
        //TODO: subscribe is deprecated I have to check
        // this.router.navigateByUrl('/');
        this.userService.login(this.loginForm.value)
            .subscribe(resp => {
                console.log(resp);
                //Save email in local storage when remember me check button is true
                if (this.loginForm.get('remember')?.value) {
                    localStorage.setItem('email', this.loginForm.get('email')?.value);
                }else{
                    localStorage.removeItem('email');
                }
            }, (err) => {
                //Estas con las rutas en donde podria encontrar mis errores provenientes del backend
                //TODO: implement validations when didn't send email or password
                let errorMsg = err.error.msg;
                console.log(errorMsg);
                Swal.fire('Error', errorMsg, 'error');
            });

    }

}