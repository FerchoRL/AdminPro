import { Component } from "@angular/core";
import { ModalImageService } from "src/app/services/modal-image.service";

@Component({
    selector: 'app-modal-img',
    templateUrl: './modal-img.component.html'
})

export class ModalImgComponent {

    constructor( public modalImageService: ModalImageService) {}

    closeModal() {
        this.modalImageService.closeModal();
    }
}