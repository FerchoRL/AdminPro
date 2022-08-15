import { Component, OnInit } from "@angular/core";
import { Validators } from "@angular/forms";
import { User } from "src/app/models/user.model";
import { SearchsService } from "src/app/services/searchs.service";
import { UserService } from "src/app/services/user.service";

@Component({
    selector: 'app-users',
    templateUrl: './users.component.html',
    styleUrls: [
        './users.component.css'
    ]
})

export class UsersComponent implements OnInit {

    public totalUsers: number = 0;
    public users: User[] = [];
    public usersTemp: User[] = [];
    public fromPage: number = 0;
    public loadingElement: boolean = true;

    constructor(private userService: UserService,
        private searchsService: SearchsService) { }

    ngOnInit(): void {
        this.refreshUsers();
    }

    //Funcion que me ayuda a actualizar la pagina cuando cambie de paginacion
    refreshUsers() {
        this.loadingElement = true;
        //Envio 5 como limite para mostrar de 5 en 5
        this.userService.loadUsers(this.fromPage, 5)
            .subscribe(({ countUsers, allUsers }) => {
                this.totalUsers = countUsers;
                this.users = allUsers;
                this.usersTemp = allUsers;//Uso estos usuarios cuando no realizo la busqueda
                this.loadingElement = false;
            });
    }

    //Implement pagination function
    changePage(value: number) {
        this.fromPage += value;
        this.fromPage = this.fromPage < 0 ? 0 : this.fromPage >= this.totalUsers ? this.fromPage -= value : this.fromPage;
        this.refreshUsers();
    }

    search(searchWord: string){
        if (searchWord.length === 0) {
            this.users =  this.usersTemp;//Si no hago ni una busqueda mantengo la lista original y no hago la peticion a mi API
            return;
        }
        this.searchsService.searchInCollection('users', searchWord)
        .subscribe( resp => {
            console.log(resp);
            this.users = resp
        });
    }
}