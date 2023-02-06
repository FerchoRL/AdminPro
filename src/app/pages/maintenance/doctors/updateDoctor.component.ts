import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Hospital } from "src/app/models/hospital.model";
import { HospitalService } from "src/app/services/hospital.service";

@Component({
    selector: 'app-update-doctor',
    templateUrl: './updateDoctor.component.html'
})

export class UpdateDoctorComponent implements OnInit {
    public doctorForm!: FormGroup;
    public hospitals: Hospital[] = [];

    constructor( private fb: FormBuilder,
        private hospitalService: HospitalService) {}

    ngOnInit(): void {
        this.doctorForm = this.fb.group({
            name: ['Ferchower', Validators.required],
            idHospital: ['', Validators.required]
        });

        this.loadHospitals();
    }

    loadHospitals(){
        this.hospitalService.loadHospitals()
        .subscribe((hospitals: Hospital[]) => {
            this.hospitals = hospitals;
        })
    }

    saveDoctor(){
        console.log(this.doctorForm.value);
    }

}