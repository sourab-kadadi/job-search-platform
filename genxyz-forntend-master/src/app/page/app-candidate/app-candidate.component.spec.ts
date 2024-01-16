import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppCandidateComponent } from './app-candidate.component';

describe('AppCandidateComponent', () => {
  let component: AppCandidateComponent;
  let fixture: ComponentFixture<AppCandidateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppCandidateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppCandidateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
