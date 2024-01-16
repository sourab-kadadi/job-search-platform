import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-basic-info',
  templateUrl: './basic-info.component.html',
  styleUrls: ['./basic-info.component.scss']
})
export class BasicInfoComponent implements OnInit {

  @Input() user: any;
  @Output() onSave = new EventEmitter();
  @Output() onCancel = new EventEmitter();
  view: boolean = true;

  constructor() { }

  ngOnInit(): void {
  }

  addPersonalDetails(type: any) {
  this.view = false;
  }
  Save() {
    this.view = true;
    let userData = {
      firstName: this.user.firstName,
      lastName: this.user.lastName,
      email: this.user.email,
      phoneNo: this.user.phoneNo,
      expType: this.user.expType
    }
    this.onSave.emit({ data: userData});
  }
  
  Cancel() {
    this.view = true;
    this.onCancel.emit();
  }
}
