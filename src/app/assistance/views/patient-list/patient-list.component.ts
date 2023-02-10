import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { LazyLoadEvent, MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Pageable } from 'src/app/core/models/Pageable';
import { Patient } from 'src/app/assistance/models/Patient';
import { PatientService } from 'src/app/assistance/services/patient/patient.service';
import { TranslateService } from '@ngx-translate/core';

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
  
  translateService: TranslateService;
  
  constructor(private userservice: PatientService,
    private dialogService: DialogService,
    private ref: DynamicDialogRef,
    private cdr: ChangeDetectorRef,
    // public translateService: TranslateService
  ) { 
    // translateService.setDefaultLang("es");
    // translateService.addLangs(["en"]);
    // translateService.use("es");
  }

  ngOnInit(): void {

  }

  ngAfterContentChecked() : void {
    this.cdr.detectChanges();
  }
  

  loadPage(event?:LazyLoadEvent){
    this.loading = true;
    let age = 0;
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
      // age = event.filters?.dateBirth?.value.getFullYear();
      
      this.userservice.findPage(pageable, event.filters?.nif?.value, event.filters?.name?.value, event.filters?.surnames?.value, event.filters?.gender?.value, event.filters?.sip?.value, event.filters?.medicalHistory?.value).subscribe(data => {
        this.patients = data.content;
        this.pageNumber = data.pageable.pageNumber;
        this.pageSize = data.pageable.pageSize;
        this.totalRecords = data.totalElements;
        this.loading = false;
      });
    }
  }

  getAge(currentYear:number,yearBirth:number ){
    this.currentYear = new Date().getFullYear();
    let age = currentYear - yearBirth;
    return age;
  } 

  getGender(gender:string){
    let genderFormated;
    // this.translateService.get(gender).subscribe((text:string) =>{
    //   genderFormated == 'Hombre';
    // })
    // genderFormated = this.translateService.get(gender).subscribe(genderFormated );
    // this.translate.get("captionCode").subscribe(translated => this.myLocalizedString = translated);
    // if(gender == 'H'){
    //   genderFormated = 'Hombre';
    // }else if(gender == 'M'){
    //   genderFormated = 'Mujer';
    // }else if(gender == 'O'){
    //   genderFormated = 'Otro';
    // }else{
    //   genderFormated = 'Error';
    // }
    
    // this.translateService.get("e").subscribe((translations) => {
    //     console.log(translations.patients.gender);
    // });
    //genderFormated = this.translateService.get(gender);
    //genderFormated = this.translateService.get(gender);
  //   this.translateService.get('table.gender', {value: gender}).subscribe((res: string) => {
  //     console.log(res);
  //     //=> 'hello world'
  // });
  //console.log(this.translateService.translations);

  //PETA LA APP CON ESTA INSTRUCCION:
   //this.translateService.getTranslation("es").subscribe((gender) => { console.log(gender); });

   return genderFormated;
  } 



}