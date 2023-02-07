import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription, delay } from "rxjs";
import { Doctor } from "src/app/models/doctor.model";
import { DoctorService } from "src/app/services/doctor.service";
import { ModalImageService } from "src/app/services/modal-image.service";
import { SearchsService } from "src/app/services/searchs.service";
import Swal from "sweetalert2";

@Component({
    selector: 'app-doctors',
    templateUrl: './doctors.component.html',
    styleUrls: [
        './doctors.component.css'
    ]
})

export class DoctorsComponent implements OnInit, OnDestroy {

    public doctors: Doctor[] = [];
    public doctorsTemp: Doctor[] = [];
    public loading: boolean = true;
    public imgDoctors: Subscription = new Subscription;

    constructor(private doctorsService: DoctorService,
        private modalImageService: ModalImageService,
        private searchService: SearchsService) { }

    ngOnDestroy(): void {
        this.imgDoctors.unsubscribe();
    }

    ngOnInit(): void {
        this.loadDoctors();
        this.imgDoctors = this.modalImageService.newImg
        .pipe(
            delay(100)
        ).subscribe(img => this.loadDoctors());
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

    deleteDoctor(doctor: Doctor) {
        //Validation to avoid deleted me by myself
        Swal.fire({
            title: 'Borrar Doctor?',
            text: `Estas a punto de eliminar el usuario ${doctor.name}`,
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, eliminalo!'
        }).then((result) => {
            if (result.isConfirmed) {
                this.doctorsService.deleteDoctor(doctor._id)
                    .subscribe(resp => {
                        Swal.fire(
                            'Borrado!',
                            `El usuario ${doctor.name} fue eliminado`,
                            'success'
                        );
                        this.loadDoctors();
                    });
            }
        });
    }

    saveChanges(doctor: Doctor) {

    }

    async sweetAlertCreateDoctor() { }

    //Function to open the modal. This happened due modal is in all the project
    openModal(doctor: Doctor) {
        this.modalImageService.oppenModal('doctors', doctor._id || '', doctor.img || 'notImage');
    }
}