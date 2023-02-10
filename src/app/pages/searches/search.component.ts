import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Doctor } from "src/app/models/doctor.model";
import { Hospital } from "src/app/models/hospital.model";
import { User } from "src/app/models/user.model";
import { SearchsService } from "src/app/services/searchs.service";

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html'
})

export class SearchComponent implements OnInit{

    public users: User[] = [];
    public doctors: Doctor[] = [];
    public hospitals: Hospital[] = [];

    constructor( private activatedRoute: ActivatedRoute,
        private searchService: SearchsService,
        private router: Router){}

    ngOnInit(): void{
        this.activatedRoute.params
        .subscribe(({searchValue}) => {
            this.globalSearch(searchValue);
        })
    }

    globalSearch(searchValue: string){
        this.searchService.searchEverything(searchValue)
        .subscribe ((resp: any) => {
            this.users = resp.users;
            this.doctors = resp.doctors;
            this.hospitals = resp.hospitals;
        })
    }

    openDoctor(doctor: Doctor){
        this.router.navigateByUrl(`/dashboard/updateDoctor/${doctor._id}`);
    }
}