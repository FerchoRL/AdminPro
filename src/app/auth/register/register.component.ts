import { Component } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})

export class RegisterComponent{

    public formSubmitted = false;
    public registerForm = this.fb.group({
        userName: ['ferchi', [Validators.required, Validators.minLength(3)]],
        email: ['ferchower@gmail.com', [Validators.required, Validators.email]],
        password: ['12345', [Validators.required]],
        password2: ['12345', [Validators.required]],
        terms: [true, Validators.requiredTrue]
    });

    constructor( private fb: FormBuilder){}

    createUser(){
        this.formSubmitted = true;
        console.log(this.registerForm.value);
        if (this.registerForm.valid) {
            console.log('Posteando formulario');
        }else{
            console.log('Error en el form')
        }
    }
    invalidField( field: string): boolean {
        if(this.registerForm.get(field)?.invalid && this.formSubmitted){
            return true;
        }
        return false;
    }
}