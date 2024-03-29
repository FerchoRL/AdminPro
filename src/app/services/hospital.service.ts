import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map } from "rxjs";
import { environment } from "src/environments/environment";

const base_url = environment.base_url

@Injectable({
    providedIn: 'root'
})

export class HospitalService {

    constructor ( private http: HttpClient ) {}

    get token(): string {
        return localStorage.getItem('token') || '';
    }

    get headers(){
        return {
            headers: {
                'x-token': this.token
            }
        }
    }

    loadHospitals(){
        const url = `${base_url}/hospitals`;
        return this.http.get( url, this.headers)
        .pipe(
            map((resp: any) => resp.hospitals)
        )
    }

    createHospital( name: string ){
        const url = `${base_url}/hospitals`;
        return this.http.post( url, { name }, this.headers);
    }

    updateHospital( _idHospital: string = "", name: string ){
        // console.log(`ID: ${_idHospital} - Name${hospitalName}`);
        const url = `${base_url}/hospitals/${_idHospital}`;
        return this.http.put( url, { name }, this.headers);
    }

    deleteHospital( _idHospital: string = "" ){
        const url = `${base_url}/hospitals/${_idHospital}`;
        return this.http.delete( url, this.headers);
    }
}