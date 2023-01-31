import { Component } from "@angular/core";
import { FileUploadService } from "src/app/services/file-upload.service";
import { ModalImageService } from "src/app/services/modal-image.service";
import Swal from "sweetalert2";

@Component({
    selector: 'app-modal-img',
    templateUrl: './modal-img.component.html'
})

export class ModalImgComponent {

    public imageSelected!: File;
    public imgTemp: any = null;

    constructor( public modalImageService: ModalImageService,
        public fileUploadService: FileUploadService) {}

    closeModal() {
        this.imgTemp = null;
        this.modalImageService.closeModal();
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
        const id = this.modalImageService.id;
        const collection = this.modalImageService.collection;
        this.fileUploadService.updatePicture(this.imageSelected, collection, id)
            .then(imgNew => {
                //Tuve que implementar el siguiente reload debido a que mi imagen no se actualizaba automaticamente
                Swal.fire("Profile Picture actualizada", "", "success");//No Me funciona el sweet alert ya que despues de actualiza automaticamente la pagina
                this.modalImageService.newImg.emit(imgNew)
                this.closeModal();
                // window.location.reload();
            });//Update image automatically
    }
}