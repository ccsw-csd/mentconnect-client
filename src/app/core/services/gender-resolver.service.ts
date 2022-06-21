import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable, of } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';

interface Gender {
    value: string,
    code: string
}

@Injectable({
  providedIn: 'root'
})
export class GenderResolverService implements Resolve<any> {
  genders : Gender[];

  constructor(
    private translateService: TranslateService
  ) {
    this.genders = [
        {value: this.translateService.instant('patientDischarge.form.input.gender.male'), code: 'H'},
        {value: this.translateService.instant('patientDischarge.form.input.gender.female'), code: 'M'},
        {value: this.translateService.instant('patientDischarge.form.input.gender.other'), code: '0'},
      ];
  }

  resolve():Observable<any> {
    return of(this.genders);
  }
}
