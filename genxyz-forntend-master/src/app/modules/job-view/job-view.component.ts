import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import{MatSnackBar} from'@angular/material/snack-bar';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ServiceService } from '../candidate/service/service.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-job-view',
  templateUrl: './job-view.component.html',
  styleUrls: ['./job-view.component.scss']
})
export class JobViewComponent implements OnInit {
  jobUID: any;
  jobPostDetails: any;
  s3path: any = environment.s3Url;
  constructor(
    public service: ServiceService,
    private ngxUiLoader: NgxUiLoaderService,
    private _snackBar: MatSnackBar,
    private routeAction: ActivatedRoute,
    private router: Router,
  ) {
    this.jobUID = this.routeAction.snapshot.paramMap.get('jobPostId');
    this.findJobPost();
   }

  ngOnInit(): void {
  }

  findJobPost() {
    try {
      this.ngxUiLoader.startLoader("loader-03");
      this.service.findJobDetailsTotalApplication(this.jobUID).subscribe(res => {
        this.jobPostDetails = res.data;
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


  applyJobs() {
    try {
      this.ngxUiLoader.startLoader("loader-03");
      let job = {
        companyId: this.jobPostDetails.giverId,
        companyName: this.jobPostDetails.companyName,
        jobPostId: this.jobPostDetails._id
      }
      this.service.applyJob(job).subscribe(res => {
        // this.jobPostDetails = res.data;
        this.router.navigate(['/candidate/candidate-job']);
        this.ngxUiLoader.stopLoader("loader-03");
        this._snackBar.open("Applyed Successfully", "Success!!");
      }, error => {
        console.log("errordaaaad", error);
        this.ngxUiLoader.stopLoader("loader-03");
        this._snackBar.open(error.message || "Something went wrong!", "Warning!");
      })
    } catch(error) {
      this.ngxUiLoader.stopLoader("loader-03");
      this._snackBar.open("Internal Server Error!", "Error!");
    }
  }

}
