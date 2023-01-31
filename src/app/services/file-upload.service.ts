import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";

const base_url = environment.base_url;

@Injectable({
    providedIn: 'root'
})

export class FileUploadService {
    constructor() { }

    async updatePicture(imgFile: File, imgType: 'users' | 'doctors' | 'hospitals', id: string) {
        //Return img string name or false
        try {
            const url = `${base_url}/upload/${imgType}/${id}`;
            //Send file to backend ussing FormData
            const formData = new FormData();
            formData.append('file', imgFile);

            //Fetch help us to create request http
            const resp = await fetch(url, {
                method: 'PUT',
                headers: {
                    'x-token': localStorage.getItem('token') || ''
                },
                body: formData
            });

            //To access response body
            let data = await resp.json();
            // console.log(data);
            if (data.ok) {//We receive an ok value in response
                // console.log(data);
                // console.log(`my img ${data.filename}`);
                return data.filename;
            } else {
                console.log(data.msg);
                return false;
            }

        } catch (error) {
            console.log(error)
            return false;
        }
    }
}