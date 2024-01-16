import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { language, nationality } from "../../../../constants/system.const";
@Component({
  selector: 'app-personal-details',
  templateUrl: './personal-details.component.html',
  styleUrls: ['./personal-details.component.scss']
})
export class PersonalDetailsComponent implements OnInit {
  @Input() personalDetails: any;
  view: boolean = true;
  @Output() onSave = new EventEmitter();
  @Output() onCancel = new EventEmitter();
  nationalitys: any[] = [];
  languages: any[] = [];
  constructor() { }

  ngOnInit(): void {
    this.nationalitys = nationality;
    this.languages = language;
  }

  addPersonalDetails(type: any) {
    if(type == "add") {
      this.personalDetails = {
        nationality: "",
        gender: "",
        maritalStatus: "",
        drivingLicense: "",
        language: "",
        dob: "",
        currentLocation: ""
      }
  }
  this.view = false;
}

Save() {
  this.view = true;
  this.onSave.emit({ data: this.personalDetails});
}

Cancel() {
  this.view = true;
  this.onCancel.emit();
}
}
