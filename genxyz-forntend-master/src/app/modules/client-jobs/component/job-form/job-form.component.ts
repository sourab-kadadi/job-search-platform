import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatChipInputEvent } from '@angular/material/chips';
import{MatSnackBar} from'@angular/material/snack-bar';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ServiceService } from '../../../client-jobs/service/service.service';
import { config, CURRENCY, industry } from '../../../../constants/system.const';

@Component({
  selector: 'app-job-form',
  templateUrl: './job-form.component.html',
  styleUrls: ['./job-form.component.scss']
})
export class JobFormComponent implements OnInit {

  jobDetails: any;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;

  @Input()
  set jobPostDetails (value: any) {
    if(value) {
      this.jobDetails = {
        jobTitle: value.jobTitle || "" ,
        jobDescription: value.jobDescription || "",
        industry: value.industry || "",
        vacancies:value.vacancies || "",
        workExp: {
          min: value.workExp.min || "",
          max: value.workExp.max || ""
        },
        ctc: {
          min: value.ctc.min || "",
          max: value.ctc.max || "",
          currency: value.ctc.currency.name || ""
        },
        keyWord: value.keyWord && value.keyWord.length ? value.keyWord : [],
      location: {
        country: value?.location?.country || "",
        state: value?.location?.state || "",
        city: value?.location?.city || ""
      }
      };
      if (value?.location?.country) {
        this.getAllState(value?.location?.country)
      }

      // if (value?.location?.country &&  value?.location?.states) {
      //   this.getAllCity(value.location.states);
      // }
    }
  }
  industrys: any [] = [];
  countrys: any[] = [];
  states: any[] = [];
  citys: any[] = [];

  editorConfig = config;

  @Output() onSave = new EventEmitter();
  @Output() onCancel = new EventEmitter();
  currencys = CURRENCY;

  constructor(
    public service: ServiceService,
    private ngxUiLoader: NgxUiLoaderService,
    private _snackBar: MatSnackBar,
  ) {
    this.jobDetails =  {
      jobTitle: "",
      jobDescription: "",
      industry: "",
      vacancies: "",
      workExp: {
        min: "",
        max: ""
      },
      ctc: {
        min: 0,
        max: 0,
        currency: ""
      },
      keyWord: [],

    location: {
      country: "",
      status: "",
      city: ""
    }
    }
    this.industrys = industry;
    this.getAllCountry();
   }

  ngOnInit(): void {
  }

  save() {
    let jobResponce = this.jobDetails.ctc.currency;
    this.jobDetails.ctc.currency = this.currencys.find(element => element.name == this.jobDetails.ctc.currency);
    this.onSave.emit({data: this.jobDetails});
    this.jobDetails.ctc.currency = jobResponce;
  }

  cancelButton() {
    this.onCancel.emit({data: ""});
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || "").trim();

    // Add our fruit
    if (value) {
      this.jobDetails["keyWord"].push({ name: value });
    }

    // Clear the input value
    event.chipInput!.clear();
  }

  remove(skill: any): void {
    const index = this.jobDetails["keyWord"].indexOf(skill);

    if (index >= 0) {
      this.jobDetails["keyWord"].splice(index, 1);
    }
  }

  getAllCountry() {
    try {
      this.ngxUiLoader.startLoader("loader-03");
      this.service.getContries().subscribe(res => {
        this.countrys = res.data;
        this.ngxUiLoader.stopLoader("loader-03");
      }, error => {
        this.ngxUiLoader.stopLoader("loader-03");
        this._snackBar.open(error.message || "Something went wrong!!", "Error!!");
      })
    } catch(error) {
      this.ngxUiLoader.stopLoader("loader-03");
      this._snackBar.open("Internal Server Error!!", "Error!!");
    }
  }

  getAllState(countryName: string) {
    try {
      this.ngxUiLoader.startLoader("loader-03");
      this.service.getState({country: countryName}).subscribe(res => {
        this.states = res.data.states;
        this.ngxUiLoader.stopLoader("loader-03");
      }, error => {
        this.ngxUiLoader.stopLoader("loader-03");
        this._snackBar.open(error.message || "Something went wrong!!", "Error!!");
      })
    } catch(error) {
      this.ngxUiLoader.stopLoader("loader-03");
      this._snackBar.open("Internal Server Error!!", "Error!!");
    }
  }


  getAllCity(state: string) {
    try {
      this.ngxUiLoader.startLoader("loader-03");
      this.service.getCity({country: this.jobDetails.location.country, state: state}).subscribe(res => {
        if (res.data){
        this.citys = res.data;
        } else {
          this.jobDetails.location.city = state;
        }
        this.ngxUiLoader.stopLoader("loader-03");
      }, error => {
        this.ngxUiLoader.stopLoader("loader-03");
        this._snackBar.open(error.message || "Something went wrong!!", "Error!!");
      })
    } catch(error) {
      this.ngxUiLoader.stopLoader("loader-03");
      this._snackBar.open("Internal Server Error!!", "Error!!");
    }
  }

}
