import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { delay } from "rxjs";
import { Doctor } from "src/app/models/doctor.model";
import { Hospital } from "src/app/models/hospital.model";
import { DoctorService } from "src/app/services/doctor.service";
import { HospitalService } from "src/app/services/hospital.service";
import Swal from "sweetalert2";

@Component({
    selector: 'app-update-doctor',
    templateUrl: './updateDoctor.component.html'
})

export class UpdateDoctorComponent implements OnInit {
    public doctorForm!: FormGroup;
    public hospitals: Hospital[] = [];
    public selectedHospital: Hospital | undefined;
    public selectedDoctor: Doctor | undefined;

    constructor(private fb: FormBuilder,
        private hospitalService: HospitalService,
        private doctorService: DoctorService,
        private router: Router,
        private activatedRoute: ActivatedRoute) { }

    ngOnInit(): void {

        //Recibir los parametros que vengan en URL
        this.activatedRoute.params.subscribe(({ id }) => this.loadDoctor(id));

        // this.doctorService.getDoctorByID()
        this.doctorForm = this.fb.group({
            name: ['', Validators.required],
            idHospital: ['', Validators.required]
        });

        this.loadHospitals();

        this.doctorForm.get('idHospital')?.valueChanges
            .subscribe(hospitalId => {
                this.selectedHospital = this.hospitals.find(h => h._id === hospitalId);
            });
    }

    loadDoctor(id: string) {
        if (id === 'newdoctor') {
            return;
        }
        this.doctorService.getDoctorByID(id)
            .pipe(//Implement delay for load the components
                delay(100)
            )
            .subscribe(doctor => {
                const { name, hospital: { _id } } = doctor;
                this.selectedDoctor = doctor;
                this.doctorForm.setValue({ name, idHospital: _id });
                return;
            },(err) => {
                return this.router.navigateByUrl('/dashboard/doctors');
            });
    }

    loadHospitals() {
        this.hospitalService.loadHospitals()
            .subscribe((hospitals: Hospital[]) => {
                this.hospitals = hospitals;
            })
    }

    saveDoctor() {

        if (this.selectedDoctor) {
            //Si hay medico seleccionado entonces actualiza
            //Necesito doctor name, idhospital y segun el idDoctor para actualizar el doctor

            const data = {
                ...this.doctorForm.value,
                _id: this.selectedDoctor._id
            }

            this.doctorService.updateDoctor(data)
                .subscribe((resp: any) => {
                    Swal.fire('Actualizado', `${resp.doctorDBUpdated.name} Actualizado correctamente`, 'success');
                })

        } else { //Si no solo crea
            const { name } = this.doctorForm.value;
            this.doctorService.createDoctor(this.doctorForm.value)
                .subscribe((resp: any) => {
                    Swal.fire('Doctor creado', `${name} creado correctamente`, 'success');
                    this.router.navigateByUrl(`/dashboard/updateDoctor/${resp.doctor._id}`)
                })
        }
    }

}