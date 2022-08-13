import { Component, OnInit } from "@angular/core";
import { User } from "src/app/models/user.model";
import { UserService } from "src/app/services/user.service";

@Component({
    selector: 'app-users',
    templateUrl: './users.component.html',
    styleUrls: [
        './users.component.css'
    ]
})

export class UsersComponent implements OnInit{

    public totalUsers: number =0;
    public users: User[] = [];
    constructor( private userService: UserService){}

    ngOnInit(): void {
        this.userService.loadUsers()
        .subscribe( ({countUsers, allUsers}) => {
            this.totalUsers = countUsers;
            this.users = allUsers;
        })
    }
}