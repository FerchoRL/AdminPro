import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})

export class ModalImageService{
    private _hiddeModal: boolean = true;

    get hideModal(){
        return this._hiddeModal;
    }

    oppenModal(){
        this._hiddeModal = false;
    }

    closeModal(){
        this._hiddeModal = true;
    }

    constructor() {}
}