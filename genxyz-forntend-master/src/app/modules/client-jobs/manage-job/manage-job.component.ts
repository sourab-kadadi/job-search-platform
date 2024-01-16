import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import{MatSnackBar} from'@angular/material/snack-bar';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { AuthServiceService } from '../../../service/auth-service.service';
import { ServiceService } from '../service/service.service';
// import { ServiceService } from '../service/service.service';
@Component({
  selector: 'app-manage-job',
  templateUrl: './manage-job.component.html',
  styleUrls: ['./manage-job.component.scss']
})
export class ManageJobComponent implements OnInit {

  jobUID: any;
  jobPostDetails: any;
  constructor(
    public service: ServiceService,
    private auth: AuthServiceService,
    private ngxUiLoader: NgxUiLoaderService,
    private _snackBar: MatSnackBar,
    private routeAction: ActivatedRoute,
    private router: Router,
  ) {
    this.jobUID = this.routeAction.snapshot.paramMap.get('jobPostId');
    if(this.jobUID) {
      this.findJobPost(this.jobUID);
    }
   }

  ngOnInit(): void {
  }

  save(event: any) {
    if(this.jobUID) {
      this.updateJobPost(this.jobUID, event.data);
    } else {
      this.createJobPost(event.data);
    }
  }

  cancel(event:any) {
    this.router.navigate(["/client"]);
  }

  findJobPost(userId: any) {
    try {
      this.ngxUiLoader.startLoader("loader-03");
      this.service.findJobPost(userId).subscribe(res => {
        this.jobPostDetails = res.data;
        this.ngxUiLoader.stopLoader("loader-03");
      }, error => {
        console.log("errordaaaad", error);
        this.ngxUiLoader.stopLoader("loader-03");
        this._snackBar.open(error.message || "Something went wrong!!", "Error!!");
      })
    } catch(error) {
      this.ngxUiLoader.stopLoader("loader-03");
      this._snackBar.open("Internal Server Error!!", "Error!!");
    }
  }

  createJobPost(data: any) {
    try {
      this.ngxUiLoader.startLoader("loader-03");
      this.service.createJobPost(data).subscribe(res => {
        // this.findJobPost(this.user?.userId);
        this.ngxUiLoader.stopLoader("loader-03");
        this._snackBar.open("Created Successfully", "Success!!");
        this.router.navigate(["/client"]);
      }, error => {
        this.ngxUiLoader.stopLoader("loader-03");
        this._snackBar.open(error.message || "Something went wrong!!", "Error!!");
      })
    } catch(error) {
      this.ngxUiLoader.stopLoader("loader-03");
      this._snackBar.open("Internal Server Error!!", "Error!!");
    }
  }

  updateJobPost(jobUID: string, data: any) {
    try {
      this.ngxUiLoader.startLoader("loader-03");
      this.service.updateJobPost(jobUID, data).subscribe(data => {
        // this.findJobPostProfile(this.user?.userId);
        this.router.navigate(["/client"]);
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
