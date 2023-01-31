import { EventEmitter, Injectable } from "@angular/core";
import { environment } from "src/environments/environment";

const base_url = `${environment.base_url}`;

@Injectable({
    providedIn: 'root'
})

export class ModalImageService{
    private _hiddeModal: boolean = true;
    public collection: 'users' | 'doctors' | 'hospitals' = "users";
    public id: string = '';
    public img?: string;

    public newImg: EventEmitter<string> = new EventEmitter<string>();


    get hideModal(){
        return this._hiddeModal;
    }

    oppenModal(collection: 'users' | 'doctors' | 'hospitals', id: string, img: string){
        this._hiddeModal = false;
        this.collection = collection;
        this.id = id;
        this.img = img;


        
        //Si la img viene nula la ruta quedaria: localhost:3006/api/upload/users/notImage
        if(img?.includes('https')){//is google img?
            this.img = img;
        } else{
            this.img = `${base_url}/upload/${collection}/${img}`;
        }
    }

    closeModal(){
        this._hiddeModal = true;
    }

    constructor() {}
}