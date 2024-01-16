import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidateJobListComponent } from './candidate-job-list.component';

describe('CandidateJobListComponent', () => {
  let component: CandidateJobListComponent;
  let fixture: ComponentFixture<CandidateJobListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CandidateJobListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CandidateJobListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
