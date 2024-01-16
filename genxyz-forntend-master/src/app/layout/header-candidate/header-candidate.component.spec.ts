import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderCandidateComponent } from './header-candidate.component';

describe('HeaderCandidateComponent', () => {
  let component: HeaderCandidateComponent;
  let fixture: ComponentFixture<HeaderCandidateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeaderCandidateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderCandidateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
