import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { industry } from '../../../../constants/system.const';

@Component({
  selector: 'app-professional-details',
  templateUrl: './professional-details.component.html',
  styleUrls: ['./professional-details.component.scss']
})
export class ProfessionalDetailsComponent implements OnInit {
  @Input() professionalDetails = {
    experience: {
      year: "",
      month: ""
    },
    industry: "",
    salary: {
      amount: ""
    }
  }
  @Input() view = true;
  @Input() addOrEdit: boolean = false;
  @Output() onSave = new EventEmitter();
  @Output() onCancel = new EventEmitter();
  industrys: any [] = [];
  constructor() { 
    this.industrys = industry;
  }

  ngOnInit(): void {
  }

  addProfessionalDetails(type: any) {
    if(type == "add") {
     this.professionalDetails = {
        experience: {
          year: "",
          month: ""
        },
        industry: "",
        salary: {
          amount: ""
        }
      }
    }
    this.view = false;
  }

  Save() {
    this.view = true;
    this.onSave.emit({ data: this.professionalDetails});
  }

  Cancel() {
    this.view = true;
    this.onCancel.emit();
  }
}
