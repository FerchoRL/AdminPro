import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

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
        password2: ['12s345', [Validators.required]],
        terms: [true, Validators.requiredTrue]
    }, {
        validators: this.samePasswords('password','password2')
    });

    constructor( private fb: FormBuilder){}

    createUser(){
        this.formSubmitted = true;
        console.log(this.registerForm);
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
    invalidPasswords(){
        const pass1 = this.registerForm.get('password')?.value;
        const pass2 = this.registerForm.get('password2')?.value;

        //Contassenas diferetents and formSubmitted posteado
        if((pass1 !== pass2) && this.formSubmitted){
            return true;
        }else{
            return false;
        }
    }

    samePasswords(pass1Name: string, pass2Name: string){
        //Si esto lo imprimo en consola (this.registerForm) clickeo en controls -> Password2 voy a poder ver la propiedad que le envie (setErrors null or not equal). Aunque de momento no se donde me podria servir
        return (formGroup: FormGroup) => {
            const pass1Control = formGroup.get(pass1Name);
            const pass2Control = formGroup.get(pass2Name);
            if( pass1Control?.value === pass2Control?.value){
                pass2Control?.setErrors(null)
            } else{
                pass2Control?.setErrors({notEqual: true});
            }
        }
    }
}