import { Component, OnInit } from '@angular/core';
import { ProgressBarMode } from '@angular/material/progress-bar';
import{MatSnackBar} from'@angular/material/snack-bar';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { AuthServiceService } from '../../../service/auth-service.service';
import { ServiceService } from '../service/service.service';

export enum Event {
  ADD="ADD",
  EDIT="EDIT",
  VIEW="VIEW"
}

@Component({
  selector: 'app-profile-details',
  templateUrl: './profile-details.component.html',
  styleUrls: ['./profile-details.component.scss']
})
export class ProfileDetailsComponent implements OnInit {

  user: any;
  skills: any[] = [];
  profile: any;
  mode: ProgressBarMode = 'determinate';
  value = 0;
  bufferValue = 100;
  progressBarVisible = false

  keySkillsBooleans: any = {
    view: Event.VIEW,
    button: Event.ADD,
  }

  professionalDetailsBooleans: any = {
    view: Event.VIEW,
    button: Event.ADD,
  }

  constructor(
    public service: ServiceService,
    private auth: AuthServiceService,
    private ngxUiLoader: NgxUiLoaderService,
    private _snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    //  this.tokenUserIdentifier = this.auth.jwtDecoder();
    //  this.findCandidateProfile(this.tokenUserIdentifier.userId);
    this.getUserInfo();
  }

  //-----------KeyKills---------------------/////
  addKeySkills(view: Event) {
   this.keySkillsBooleans.button = Event.VIEW;
   this.keySkillsBooleans.view = view;
  }

  saveKeySkills(event: any) {
      if (this.profile?._id) {
        this.updateCandidateProfile({keySkills: event.data});
      } else {
        this.createCandidateProfile({keySkills: event.data});
      }
  }


  saveProfessionalDetails(event: any) {
    if (this.profile?._id) {
      this.updateCandidateProfile({professionalDetails: event.data});
    } else {
      this.createCandidateProfile({professionalDetails: event.data});
    }
  }

  saveProfilePic(event: any) {
    if (this.profile?._id) {
      this.updateCandidateProfile({profileImg: event.data});
    } else {
      this.createCandidateProfile({profileImg: event.data});
    }
  }


  savePersonalDetails(event: any) {
    if (this.profile?._id) {
      this.updateCandidateProfile({personalDetails: event.data});
    } else {
      this.createCandidateProfile({personalDetails: event.data});
    }
  }

  saveCv(event: any) {
    if (this.profile?._id) {
      this.updateCandidateProfile({cv: event.data});
    } else {
      this.createCandidateProfile({cv: event.data});
    }
  }

  onCancel() {
    this.findCandidateProfile(this.user?.userId);
  }

  findCandidateProfile(userId: any) {
    try {
      this.ngxUiLoader.startLoader("loader-03");
      this.service.findCandidate(userId).subscribe(res => {
        this.profile = res.data;
        this.calculateProfile();
        this.ngxUiLoader.stopLoader("loader-03");
        // this._snackBar.open("Updated Successfully", "Success!!");
      }, error => {
        console.log(error);
        if(error.statusCode == 404) {

        } else {
        this.ngxUiLoader.stopLoader("loader-03");
        // this._snackBar.open(error.message || "Something went wrong!!", "Error!!");
        }
      })
    } catch(error) {
      this.ngxUiLoader.stopLoader("loader-03");
      this._snackBar.open("Internal Server Error!!", "Error!!");
    }
  }

  calculateProfile() {
    let value = 5;
    if(this.profile) {
      if (this.profile.keySkills && this.profile.keySkills.length) {
        value += 20;
      }
      if (this.profile.professionalDetails) {
        value += 30;
      }
      if (this.profile.personalDetails) {
        value += 20;
      }
      if (this.profile.cv) {
        value += 20;
      }
      if(this.profile.profileImg){
        value += 5;
      }
      if (value == 70 && this.user.expType && this.user.expType == 'FRESHER') {
        value += 30;
      }
      this.value = value;
    }
  }

  getUserInfo() {
    try {
      this.ngxUiLoader.startLoader("loader-03");
      this.service.getUserInfo().subscribe(res => {
        this.user = res.data;
        this.findCandidateProfile(res.data._id);
        this.ngxUiLoader.stopLoader("loader-03");
        this._snackBar.open("Created Successfully", "Success!!");
      }, error => {
        this.ngxUiLoader.stopLoader("loader-03");
        this._snackBar.open(error.message || "Something went wrong!!", "Error!!");
      })
    } catch(error) {
      this.ngxUiLoader.stopLoader("loader-03");
      this._snackBar.open("Internal Server Error!!", "Error!!");
    }
  }


  createCandidateProfile(data: any) {
    try {
      this.ngxUiLoader.startLoader("loader-03");
      this.service.createCandidate(data).subscribe(res => {
        this.findCandidateProfile(this.user?.userId);
        this.ngxUiLoader.stopLoader("loader-03");
        this._snackBar.open("Created Successfully", "Success!!");
      }, error => {
        this.ngxUiLoader.stopLoader("loader-03");
        this._snackBar.open(error.message || "Something went wrong!!", "Error!!");
      })
    } catch(error) {
      this.ngxUiLoader.stopLoader("loader-03");
      this._snackBar.open("Internal Server Error!!", "Error!!");
    }
  }

  updateCandidateProfile(data: any) {
    try {
      this.ngxUiLoader.startLoader("loader-03");
      this.service.updateCandidate(data).subscribe(data => {
        this.findCandidateProfile(this.user?._id);
        this.ngxUiLoader.stopLoader("loader-03");
        this._snackBar.open("Updated Successfully", "Success!!");
      }, error => {
        this.ngxUiLoader.stopLoader("loader-03");
        this._snackBar.open(error.message || "Something went wrong!!", "Error!!");
      })
    } catch(error) {
      this.ngxUiLoader.stopLoader("loader-03");
      this._snackBar.open("Internal Server Error!!", "Error!!");
    }
  }


  updateUserInfo(data: any) {
    try {
      this.ngxUiLoader.startLoader("loader-03");
      this.service.updateUserInfo(data.data).subscribe(data => {
        this.getUserInfo();
        this.ngxUiLoader.stopLoader("loader-03");
        this._snackBar.open("Updated Successfully", "Success!!");
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
