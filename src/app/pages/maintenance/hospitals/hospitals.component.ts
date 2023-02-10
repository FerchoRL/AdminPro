import { IfStmt, ThisReceiver } from '@angular/compiler';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, delay } from 'rxjs';
import { Hospital } from 'src/app/models/hospital.model';
import { HospitalService } from 'src/app/services/hospital.service';
import { ModalImageService } from 'src/app/services/modal-image.service';
import { SearchsService } from 'src/app/services/searchs.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-hospitals',
  templateUrl: './hospitals.component.html',
  styleUrls: ['./hospitals.component.scss']
})
export class HospitalsComponent implements OnInit, OnDestroy {

  public hospitals: Hospital[] = [];
  public hospitalsTemp: Hospital[] = [];
  public loading: boolean = true;
  public fromPage: number = 0;
  public imgHospitals: Subscription = new Subscription;

  constructor(private hospitalService: HospitalService,
    private modalImageService: ModalImageService,
    private searchsService: SearchsService) { }

  ngOnInit(): void {
    this.loadHospitals();
    this.imgHospitals = this.modalImageService.newImg
      .pipe(
        delay(100)//Darle tiempo al servidor de recargar para mostrar la imagen
      ).subscribe(img => this.loadHospitals())//Debo cerrar esta subscripcion
  }

  ngOnDestroy(): void {
    this.imgHospitals.unsubscribe();
  }

  loadHospitals() {
    this.loading = true;

    this.hospitalService.loadHospitals()
      .subscribe(hospitals => {
        this.loading = false;
        this.hospitals = hospitals;
        this.hospitalsTemp = hospitals;//Uso estos hospitals cuando no realizo la busqueda
      });
  }

  search(searchWord: string) {
    if (searchWord.length === 0) {
      this.hospitals = this.hospitalsTemp;//Si no hago ni una busqueda mantengo la lista original y no hago la peticion a mi API
      return;
    }
    this.searchsService.searchInCollection('hospitals', searchWord)
            .subscribe((resp) => {
                // console.log(resp);
                this.hospitals = resp as Hospital[];//Necesito castear si no me marca error
            });
  }

  saveChanges(hospital: Hospital) {
    this.hospitalService.updateHospital(hospital._id, hospital.name)
      .subscribe(resp => {
        Swal.fire('Hospital actualizado', hospital.name, 'success');
      });
  }

  removeHospital(hospital: Hospital) {
    this.hospitalService.deleteHospital(hospital._id)
      .subscribe(resp => {
        this.loadHospitals();
        Swal.fire('Hospital eliminado', hospital.name, 'info');
      });
  }

  createHospital(hospitalName: string) {
    this.hospitalService.createHospital(hospitalName)
      .subscribe((resp: any) => {
        // this.loadHospitals();
        Swal.fire('Hospital creado', hospitalName, 'success');
        this.hospitals.push(resp.hospital);//Otra forma de actualizar la lista
      });
  }

  async sweetAlertCreateHospital() {
    const { value: hospitalName = '' } = await Swal.fire<string>({
      text: 'Ingrese nombre del nuevo hospital',
      input: 'text',
      inputPlaceholder: 'Crear Hospital',
      showCancelButton: true,
      inputValidator(inputValue): string {
        if (inputValue.length === 0) {
          return 'You need to write something!'
        }
        else {
          return ''
        }
      }
    });
    if (hospitalName.length > 0) {
      // if (hospitalName != undefined && hospitalName.length > 0) {

      this.createHospital(hospitalName);
    }
  }

  //Function to open the modal. This happened due modal is in all the project
  openModal(hospital: Hospital) {
    this.modalImageService.oppenModal('hospitals', hospital._id || '', hospital.img || 'notImage');
  }

  // changePage(value: number){
  //   this.fromPage += value;
  //   this.fromPage = this.fromPage < 0 ? 0 : this.fromPage >= this.hospitals.length ? this.fromPage -= value : this.fromPage
  // }

}
