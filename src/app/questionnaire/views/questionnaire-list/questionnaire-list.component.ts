import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LazyLoadEvent } from 'primeng/api';
import { Pageable } from 'src/app/core/models/Pageable';
import { User } from 'src/app/management/models/User';
import { Questionnaire } from '../../model/Questionnaire';
import { QuestionnaireService } from '../../services/questionnaire.service';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-questionnaire-list',
  templateUrl: './questionnaire-list.component.html',
  styleUrls: ['./questionnaire-list.component.scss']
})
export class QuestionnaireListComponent implements OnInit {

  pageNumber: number = 0;
  pageSize: number = 10;

  property: string = 'id';
  direction: string = 'ASC';

  questionnaires: Questionnaire[];
  users: User[];
  
  loading: boolean = true;
  totalRecords: number;z

  checkAlert: Boolean = false;

  constructor(
    private questionnaireService: QuestionnaireService,
    private userService: UserService,
    private translateService: TranslateService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.userService.getUsers().subscribe(
      users => this.users = users
    );

    this.loading = true;
  }

  loadPage(event?: LazyLoadEvent) {

    this.loading = true;

    let pageable: Pageable = {
      pageNumber: this.pageNumber,
      pageSize: this.pageSize,
      sort: [{
        property: this.property,
        direction: this.direction
      }]
    }

    if (event != null) {
      pageable.pageSize = event.rows;
      pageable.pageNumber = event.first / event.rows;
      if (event.sortField != null)
        pageable.sort = [{ property: event.sortField, direction: event.sortOrder == 1 ? "asc" : "desc" }];
    }

    this.questionnaireService.getQuestionnaires(pageable, event.filters?.description?.value, event.filters?.questionsNumber?.value, 
      event.filters?.patientsNumber?.value, event.filters?.user?.value).subscribe(data => {
      this.questionnaires = data.content;
      this.pageNumber = data.pageable.pageNumber;
      this.pageSize = data.pageable.pageSize;
      this.totalRecords = data.totalElements;
      this.loading = false;
    });
  }

  showQuestions(questionnaire: Questionnaire, questionsNumber:number){
    let questions: string = ""
    questionnaire.questions.map(question => 
      this.translateService.get(question.question.question).subscribe((text:string) =>{
        questions+=text+"\n"
      })
    )
    return questions 
  }

  showPatients(questionnaire:Questionnaire){
    let patients: string[] = 
    questionnaire.patients.map(patient =>
      patient.user.name + " " + patient.user.surnames
    );
    if(questionnaire.patients.length>0){
      this.checkAlert = true;
    }
    return patients.join("\n");
  }

  newQuestionnaire(){
    this.router.navigate(["questionnaire-new"]);
  }

}
