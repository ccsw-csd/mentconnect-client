import { Component, OnInit } from '@angular/core';
import { PatientFull } from '../../models/PatientFull';
import { UserFull } from 'src/app/management/models/UserFull';
import { PatientService } from '../../services/patient/patient.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Diary } from '../../models/Diary';
import { PatientDiaryService } from '../../services/patient/patient-diary.service';
import { Patient } from '../../models/Patient';
import { DiaryFull } from '../../models/DiaryFull';

@Component({
  selector: 'app-patient-diary',
  templateUrl: './patient-diary.component.html',
  styleUrls: ['./patient-diary.component.scss']
})
export class PatientDiaryComponent implements OnInit {
  patientObj: PatientFull;
  diaryObj: Diary;
  diarys: Diary[] = [];

  constructor(
    private patientService: PatientService,
    private route: ActivatedRoute,
    private router: Router,
    private diaryService: PatientDiaryService
  ) { }

  ngOnInit(): void {
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
    this.route.params.subscribe(params => {
      this.getPatientFull(params['id']);
      this.diaryService.findDiaryPatientById(params['id']).subscribe(diaryPatientArray =>{
        this.diarys = diaryPatientArray; 
      }
      );
    });
  }

}
