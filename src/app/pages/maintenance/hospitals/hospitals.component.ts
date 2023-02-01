import { Component, OnInit } from '@angular/core';
import { Hospital } from 'src/app/models/hospital.model';
import { HospitalService } from 'src/app/services/hospital.service';

@Component({
  selector: 'app-hospitals',
  templateUrl: './hospitals.component.html',
  styleUrls: ['./hospitals.component.scss']
})
export class HospitalsComponent implements OnInit {

  public hospitals: Hospital[] = [];
  public loading: boolean = true;
  public fromPage: number = 0;

  constructor(private hospitalService: HospitalService) { }

  ngOnInit(): void {
    this.loadHospitals();
  }

  loadHospitals() {
    this.loading = true;

    this.hospitalService.loadHospitals()
      .subscribe(hospitals => {
        this.loading = false;
        this.hospitals = hospitals;
      });
  }

  // changePage(value: number){
  //   this.fromPage += value;
  //   this.fromPage = this.fromPage < 0 ? 0 : this.fromPage >= this.hospitals.length ? this.fromPage -= value : this.fromPage
  // }

}
