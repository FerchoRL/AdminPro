import { Component, OnInit } from "@angular/core";
import { Doctor } from "src/app/models/doctor.model";
import { DoctorService } from "src/app/services/doctor.service";
import { ModalImageService } from "src/app/services/modal-image.service";
import { SearchsService } from "src/app/services/searchs.service";

@Component({
    selector: 'app-doctors',
    templateUrl: './doctors.component.html',
    styleUrls: [
        './doctors.component.css'
    ]
})

export class DoctorsComponent implements OnInit {

    public doctors: Doctor[] = [];
    public doctorsTemp: Doctor[] = [];
    public loading: boolean = true;

    constructor(private doctorsService: DoctorService,
        private modalImageService: ModalImageService,
        private searchService: SearchsService) { }

    ngOnInit(): void {
        this.loadDoctors();
    }

    loadDoctors() {
        this.loading = true;
        this.doctorsService.loadDoctors()
            .subscribe(doctors => {
                this.loading = false;
                this.doctors = doctors;
                this.doctorsTemp = doctors;
            });
    }

    search(searchWord: string) {
        if (searchWord.length === 0) {
            this.doctors = this.doctorsTemp;
            return;
        }
        this.searchService.searchInCollection('doctors', searchWord)
            .subscribe((resp) => {
                this.doctors = resp as Doctor[];
            })
    }

    saveChanges(doctor: Doctor) {

    }

    async sweetAlertCreateDoctor() { }

    //Function to open the modal. This happened due modal is in all the project
    openModal(doctor: Doctor) {
        this.modalImageService.oppenModal('doctors', doctor._id || '', doctor.img || 'notImage');
    }
}