import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KeySkillsComponent } from './key-skills.component';

describe('KeySkillsComponent', () => {
  let component: KeySkillsComponent;
  let fixture: ComponentFixture<KeySkillsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KeySkillsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KeySkillsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
