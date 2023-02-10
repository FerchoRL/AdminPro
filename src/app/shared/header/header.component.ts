import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { User } from "src/app/models/user.model";
import { UserService } from "src/app/services/user.service";

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {
    public user: User;
    constructor(private userService: UserService,
        private router: Router) {
        this.user = userService.user;
    }
    ngOnInit(): void {

    }
    logout() {
        this.userService.logout();
    }

    searchValue(searchValue: string) {
        if (searchValue.length === 0) {
            return
        }
        this.router.navigateByUrl(`/dashboard/search/${searchValue}`);
    }
}