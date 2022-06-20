import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

interface Gender {
  value: string,
  code: string
}

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {
  genders: Gender[];

  constructor(
    private translateService: TranslateService, 
  ) {
    this.genders = [
      {value: this.translateService.instant('patientDischarge.form.input.gender.male'), code: 'H'},
      {value: this.translateService.instant('patientDischarge.form.input.gender.female'), code: 'M'},
      {value: this.translateService.instant('patientDischarge.form.input.gender.other'), code: '0'},
    ];
  }

  ngOnInit(): void {
    sessionStorage.setItem("genders", JSON.stringify(this.genders));
  }
}
