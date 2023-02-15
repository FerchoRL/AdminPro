import { environment } from "src/environments/environment";
const base_url = environment.base_url;
export class User{
    constructor(
        public userName: string,
        public email: string,
        public password?: string,
        public img?: string,
        public google?: boolean,
        public role?: 'ADMIN_ROLE' | 'USER_ROLE',
        public uid?: string
    ){}

    //Siento que esta funcion la puedo pasar a user services
    get imageURL(){
        
        if ( this.img?.includes('https') ) {
            return this.img;
        }
        if (this.img){
            return `${base_url}/upload/users/${this.img}`;
        }else{
        return `${base_url}/upload/users/not-img.jpg`;
        }
    }
}