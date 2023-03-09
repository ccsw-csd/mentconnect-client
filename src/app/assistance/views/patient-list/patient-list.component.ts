import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { LazyLoadEvent, MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Pageable } from 'src/app/core/models/Pageable';
import { Patient } from 'src/app/assistance/models/Patient';
import { PatientService } from 'src/app/assistance/services/patient/patient.service';
import { TranslateService } from '@ngx-translate/core';
import { Router } from "@angular/router";

interface Gender {
  value: string,
  code: string
}

@Component({
  selector: 'app-patient-list',
  templateUrl: './patient-list.component.html',
  styleUrls: ['./patient-list.component.scss'],
  providers: [DialogService, DynamicDialogRef, MessageService]
})
export class PatientListComponent implements OnInit {
  pageNumber: number = 0;
  pageSize: number = 5;
  property: string = 'id';
  direction: string = 'ASC';
  totalRecords: number;
  patients: Patient[];
  loading: boolean = true;
  lastTableLazyLoadEvent: LazyLoadEvent;
  currentYear: number;
  filterGender: Patient[];
  genders: Gender[];

  constructor(private userservice: PatientService,
    private dialogService: DialogService,
    private ref: DynamicDialogRef,
    private cdr: ChangeDetectorRef,
    public translateService: TranslateService,
    private router: Router
  ) { 
       this.genders = [
         {value: this.translateService.instant('patients.gender.H'), code: 'H'},
         {value: this.translateService.instant('patients.gender.M'), code: 'M'},
         {value: this.translateService.instant('patients.gender.O'), code: 'O'}
       ];
  }
  
  ngOnInit(): void {
    
  }

  ngAfterContentChecked() : void {
    this.cdr.detectChanges();

  }

  loadPage(event?:LazyLoadEvent){
    this.loading = true;
    let pageable: Pageable = {
      pageNumber: this.pageNumber,
      pageSize: this.pageSize,
      sort: [{
        property: this.property,
        direction: this.direction
      }]
    }

    if(event != null){
      this.lastTableLazyLoadEvent = event;
      pageable.pageSize = event.rows;
      pageable.pageNumber = event.first / event.rows;

      if (event.sortField != null){
        pageable.sort = [{property:event.sortField, direction:event.sortOrder == 1 ? 'asc':'desc'}];
      }

      this.userservice.findPage(pageable, event.filters?.nif?.value, {
        name: event.filters?.name?.value,
        id: event.filters?.id?.value,
        username: event.filters?.username?.value,
        surnames: event.filters?.surnames?.value,
        email: event.filters?.email?.value,
      }, event.filters?.gender?.value, event.filters?.phone?.value, event.filters?.sip?.value, event.filters?.medicalHistory?.value, this.parsetoIsoDate(event.filters?.dateBirth?.value)).subscribe(data => {
        this.patients = data.content;
        this.pageNumber = data.pageable.pageNumber;
        this.pageSize = data.pageable.pageSize;
        this.totalRecords = data.totalElements;
        this.loading = false;
      });
    }
  }

  getGender(gender:String){
    let genderFormated: string = "";
    this.translateService.get("patients.gender."+gender).subscribe((text:string) =>{
      genderFormated = text + "\n";
    })
    return genderFormated;
  } 

  editPatient(patient: Patient){
    this.router.navigate(["patient-edit", patient.id]);
  }

  evaluationPatient(patient: Patient){
    this.router.navigate(["patient-evaluation", patient.id]);
  }

  statsPatient(patient: Patient){
    this.router.navigate(["patient-stats", patient.id]);
  }

  parsetoIsoDate(date) : Date {
    if(date == null) return null;
    const tDate = new Date(date);
    tDate.setMinutes(tDate.getMinutes() - tDate.getTimezoneOffset());
    return tDate;
  }


}