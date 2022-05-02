import { Component } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})

export class RegisterComponent{
    public registerForm = this.fb.group({
        userName: ['Ferchower', [Validators.required, Validators.minLength(3)]],
        email: ['ferchower@gmail.com', [Validators.required, Validators.email]],
        password: ['12345', [Validators.required]],
        password2: ['12345', [Validators.required]],
        terms: [true, Validators.required]
    });

    constructor( private fb: FormBuilder){}

    createUser(){
        console.log(this.registerForm.value);
    }
}