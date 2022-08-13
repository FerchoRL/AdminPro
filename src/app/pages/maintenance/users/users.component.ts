import { Component, OnInit } from "@angular/core";
import { Validators } from "@angular/forms";
import { User } from "src/app/models/user.model";
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
    public fromPage: number = 0;

    constructor(private userService: UserService) { }

    ngOnInit(): void {
        this.refreshUsers();
    }

    //Funcion que me ayuda a actualizar la pagina cuando cambie de paginacion
    refreshUsers() {
        //Envio 5 como limite para mostrar de 5 en 5
        this.userService.loadUsers(this.fromPage, 5)
            .subscribe(({ countUsers, allUsers }) => {
                this.totalUsers = countUsers;
                this.users = allUsers;
            });
    }

    //Implement pagination function
    changePage(value: number) {
        this.fromPage += value;
        this.fromPage = this.fromPage < 0 ? 0 : this.fromPage >= this.totalUsers ? this.fromPage -= value : this.fromPage;
        this.refreshUsers();
    }
}