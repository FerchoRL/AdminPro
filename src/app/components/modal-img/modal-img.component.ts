import { Component } from "@angular/core";
import { ModalImageService } from "src/app/services/modal-image.service";

@Component({
    selector: 'app-modal-img',
    templateUrl: './modal-img.component.html'
})

export class ModalImgComponent {

    public imageSelected!: File;
    public imgTemp: any = null;

    constructor( public modalImageService: ModalImageService) {}

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
}