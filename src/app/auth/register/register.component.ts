import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import Swal from 'sweetalert2';
import { UserService } from "src/app/services/user.service";
import { Router } from "@angular/router";

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})

export class RegisterComponent {

    public formSubmitted = false;
    //TODO: FormBuilder group is deprecated
    public registerForm = this.fb.group({
        userName: ['', [Validators.required, Validators.minLength(3)]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required]],
        password2: ['', [Validators.required]],
        terms: [true, Validators.requiredTrue]
    }, {
        validators: this.samePasswords('password', 'password2')
    });

    constructor(private fb: FormBuilder,
        private userService: UserService,
        private router: Router) { }

    createUser() {
        this.formSubmitted = true;
        //console.log(this.registerForm);
        if (this.registerForm.invalid) {
            return;
        }
        //Si es valido continua
        //TODO: subscribe is deprecated I have to check
        this.userService.createUser(this.registerForm.value)
            .subscribe(resp => {
                //Navigate dashboard when register ok
                this.router.navigateByUrl('/');
            }, (error) => {
                //Swety alert to show the error
                Swal.fire('Error', error.error.msg,'error');
            });//El error es el que me regresa mi api en el backend
    }
    invalidField(field: string): boolean {
        if (this.registerForm.get(field)?.invalid && this.formSubmitted) {
            return true;
        }
        return false;
    }
    invalidPasswords() {
        const pass1 = this.registerForm.get('password')?.value;
        const pass2 = this.registerForm.get('password2')?.value;

        //Contassenas diferetents and formSubmitted posteado
        if ((pass1 !== pass2) && this.formSubmitted) {
            return true;
        } else {
            return false;
        }
    }

    samePasswords(pass1Name: string, pass2Name: string) {
        //Si esto lo imprimo en consola (this.registerForm) clickeo en controls -> Password2 voy a poder ver la propiedad que le envie (setErrors null or not equal). Aunque de momento no se donde me podria servir
        return (formGroup: FormGroup) => {
            const pass1Control = formGroup.get(pass1Name);
            const pass2Control = formGroup.get(pass2Name);
            if (pass1Control?.value === pass2Control?.value) {
                pass2Control?.setErrors(null)
            } else {
                pass2Control?.setErrors({ notEqual: true });
            }
        }
    }
}