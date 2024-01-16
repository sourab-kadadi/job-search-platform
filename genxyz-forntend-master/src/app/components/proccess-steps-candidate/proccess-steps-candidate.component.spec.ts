import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProccessStepsCandidateComponent } from './proccess-steps-candidate.component';

describe('ProccessStepsCandidateComponent', () => {
  let component: ProccessStepsCandidateComponent;
  let fixture: ComponentFixture<ProccessStepsCandidateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProccessStepsCandidateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProccessStepsCandidateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
