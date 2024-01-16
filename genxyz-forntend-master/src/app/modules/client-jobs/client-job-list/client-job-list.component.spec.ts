import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientJobListComponent } from './client-job-list.component';

describe('ClientJobListComponent', () => {
  let component: ClientJobListComponent;
  let fixture: ComponentFixture<ClientJobListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientJobListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientJobListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
