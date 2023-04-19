import { Component, OnInit } from '@angular/core';
import { PatientFull } from '../../models/PatientFull';
import { UserFull } from 'src/app/management/models/UserFull';
import { PatientService } from '../../services/patient/patient.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Diary } from '../../models/Diary';
import { PatientDiaryService } from '../../services/patient/patient-diary.service';
import { Patient } from '../../models/Patient';
import { DiaryFull } from '../../models/DiaryFull';
import { TranslateService } from '@ngx-translate/core';
import { MessageService } from 'primeng/api';
import { Calendar } from 'primeng/calendar';

@Component({
  selector: 'app-patient-diary',
  templateUrl: './patient-diary.component.html',
  styleUrls: ['./patient-diary.component.scss'],
  providers: [MessageService]
})
export class PatientDiaryComponent implements OnInit {
  patientObj: PatientFull;
  diaryObj: Diary;
  diarys: Diary[] = [];
  isloading: boolean = false;
  rangeDates: Date[];
  diaryFilters: Diary[] = [];
  showAll = true;
  showFilter = true;
  constructor(
    private patientService: PatientService,
    private route: ActivatedRoute,
    private router: Router,
    private diaryService: PatientDiaryService,
    private translate: TranslateService,
    private messageService: MessageService,
  ) { }

  ngOnInit(): void {
    this.isloading = true;
    this.patientObj = new PatientFull(new UserFull(), null, null, null, null, null, null);
    this.diaryObj = new DiaryFull(null,null,new Patient());
    this.chargeDiarys();
  }


  getPatientFull(id: number) {
    this.patientService.patientFull(id).subscribe({
      next: (res) => {
        this.patientObj = res
        this.patientObj.dateBirth = new Date(this.patientObj.dateBirth)
      }
    });
  }

  onCancel(event) {
    this.router.navigate(["patient-list"]);
  }

  chargeDiarys() {
    this.rangeDates = null;
    this.showAll = true;
    this.showFilter = false;
    this.route.params.subscribe(params => {
      this.getPatientFull(params['id']);
      this.diaryService.findDiaryPatientById(params['id']).subscribe(diaryPatientArray =>{
        this.diarys = diaryPatientArray; 
        this.isloading = false;
      }
      );
    });
  }

  filterDiary(rangeDates: Date[]){
    if(rangeDates != null){
      let startDate = rangeDates[0];
      let endDate = rangeDates[1];
      if(startDate == null || endDate == null){
        this.messageService.add({ key: 'datesWarning', severity: 'error', summary: this.translate.instant('Rango de fechas incorrecto'), detail: this.translate.instant('El rango de fechas debe contener una fecha inicial y otra final') });
      }else{
        this.isloading = true;
        let startDate = rangeDates[0];
        let endDate = rangeDates[1];
        this.showAll = false;
        this.showFilter = true;
        this.diaryService.filterDiary(startDate,endDate).subscribe(diaryFilterArray=>{
          this.diaryFilters = diaryFilterArray;
          this.isloading = false;
        })
        return this.diaryFilters;
      }
    }else{
      this.messageService.add({ key: 'emptyDates', severity: 'error', summary: this.translate.instant('Rango de fechas vacío'), detail: this.translate.instant('Debes insertar un rango de fechas') });
    }
  }

  closePopup(calendar: Calendar){
    if (calendar.inputfieldViewChild.nativeElement.value !== '') {
      calendar.overlayVisible = false;
    }
  }

}
