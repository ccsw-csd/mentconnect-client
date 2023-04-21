import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientDiaryComponent } from './patient-diary.component';

describe('PatientDiaryComponent', () => {
  let component: PatientDiaryComponent;
  let fixture: ComponentFixture<PatientDiaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatientDiaryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientDiaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
