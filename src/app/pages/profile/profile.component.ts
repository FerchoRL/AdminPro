import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { User } from "src/app/models/user.model";
import { FileUploadService } from "src/app/services/file-upload.service";
import { UserService } from "src/app/services/user.service";
import Swal from "sweetalert2";

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: [
        './profile.component.css'
    ]
})

export class ProfileComponent implements OnInit {
    public profileForm!: FormGroup;
    public userDB: User;
    public imageSelected!: File;
    public imgTemp: any = '';

    constructor(private fb: FormBuilder,
        private userService: UserService,
        private fileUploadService: FileUploadService) {
        this.userDB = userService.user;
    }

    ngOnInit(): void {
        this.profileForm = this.fb.group({
            //Initialize with userDB values
            userName: [this.userDB.userName, Validators.required],
            email: [this.userDB.email, [Validators.required, Validators.email]]
        });
    }

    updateProfile() {
        this.userService.updateProfileUser(this.profileForm.value)
        //Tendria que ver por que esta deprecated
            .subscribe(resp => {
                const { userName, email } = this.profileForm.value;
                this.userDB.userName = userName;
                this.userDB.email = email;
                Swal.fire("Informacion actualizada", "", "success");
            }, (err) => {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: err.error.msg
                  });
            });
    }

    selectImage(event: any) {
        //event.target.files[0] en esta posicion del event es donde esta la imagen
        let file = event.target.files[0];
        this.imageSelected = file;
        if (!file) {
            return this.imgTemp = null;
        }

        //Mostrar la foto temporal que se selecciona
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            this.imgTemp = reader.result;
        }
        return this.imgTemp;
    }

    uploadImage() {
        this.fileUploadService.updatePicture(this.imageSelected, 'users', this.userDB.uid || '')
            .then(imgNew => {
                this.userDB.img = imgNew;
                //Tuve que implementar el siguiente reload debido a que mi imagen no se actualizaba automaticamente
                Swal.fire("Profile Picture actualizada", "", "success");//No Me funciona el sweet alert ya que despues de actualiza automaticamente la pagina
                window.location.reload();
            });//Update image automatically
    }
}