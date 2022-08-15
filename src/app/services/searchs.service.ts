import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map } from "rxjs";
import { environment } from "src/environments/environment";
import { User } from "../models/user.model";


const base_url = `${environment.base_url}/everything/collection`;

@Injectable({
    providedIn: 'root'
})

export class SearchsService {

    constructor( private http: HttpClient){}

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

    searchInCollection(collection: 'users' | 'doctors' | 'hospitals', searchWord: string = ''){
        const url = `${base_url}/${collection}/${searchWord}`;
        return this.http.get( url, this.headers)
        //Response return ok msg and data
        .pipe(
            //Solo me regresa el array de resultados que hay en data
            map( (resp: any) => {
                switch(collection){
                    case 'users':
                        return this.convertToUser(resp.data);
                    default:
                        return[];
                }
            })
        );
    }

    private convertToUser( results: any[]): User[]{
        return results.map(
            user => new User(user.userName,user.email,'',user.img, user.google, user.role, user.uid)
        )
    }
}