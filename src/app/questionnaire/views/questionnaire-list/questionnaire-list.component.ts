import { Component, OnChanges, OnInit } from '@angular/core';
import { LazyLoadEvent } from 'primeng/api';
import { Pageable } from 'src/app/core/models/Pageable';
import { User } from 'src/app/core/models/User';
import { Questionnaire } from '../../model/Questionnaire';
import { QuestionnaireService } from '../../services/questionnaire.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-questionnaire-list',
  templateUrl: './questionnaire-list.component.html',
  styleUrls: ['./questionnaire-list.component.scss']
})
export class QuestionnaireListComponent implements OnInit {

  userFilt;
  pageNumber: number = 0;
  pageSize: number = 10;

  property: string = 'id';
  direction: string = 'ASC';

  questionnaires: Questionnaire[];
  users: User[];
  
  loading: boolean =true;
  totalRecords: number;

  constructor(
    private questionnaireService: QuestionnaireService,
    private userService: UserService,
    
  ) { }

  ngOnInit(): void {
    this.questionnaireService.getQuestionnaires;
    
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

}
