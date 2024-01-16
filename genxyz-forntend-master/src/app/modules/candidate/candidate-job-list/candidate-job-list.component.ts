import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ServiceService } from '../service/service.service';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-candidate-job-list',
  templateUrl: './candidate-job-list.component.html',
  styleUrls: ['./candidate-job-list.component.scss']
})
export class CandidateJobListComponent implements OnInit {
  jobList: any[] = [];
  filter = {
    page: 0,
    count: 10,
    search: "",
    location: ""
  }
  isNotFound: boolean = false;
  s3path: any = environment.s3Url;
  private filterTimeOut: any = null;
  constructor(
    public service: ServiceService,
    private ngxUiLoader: NgxUiLoaderService,
    private _snackBar: MatSnackBar,
    private routeAction: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.listPost('loader-04');
  }

  listPost(loader: string) {
    try {
      this.ngxUiLoader.startLoader(loader);
      this.isNotFound = false;
      this.service.getJobListCandidate(this.filter).subscribe(res => {
        this.jobList = this.jobList.concat(res.data);
        this.ngxUiLoader.stopLoader(loader);
      }, error => {
        this.ngxUiLoader.stopLoader(loader);
        if (error.statusCode && error.statusCode == 404) {
          this.isNotFound = true;
          this.jobList = [];
        } else {
         this._snackBar.open(error?.message || "Something went wrong!!", "Opps!");
        }
      })
    } catch(error) {
      this.ngxUiLoader.stopLoader(loader);
      this._snackBar.open("Internal Server Error!!", "Error!");
    }
  }

  onChangeSearch() {
    this.filter.page = 0;
    if(this.filterTimeOut) {
    this.filterTimeOut = clearTimeout(this.filterTimeOut);
    }
    this.filterTimeOut = setTimeout(() => {
      this.jobList = [];
      this.listPost('loader-03')
    }, 500);
  }

  onScroll() {
    console.log("OnScrolled");
    
    this.filter.page = ++this.filter.page;
    this.listPost('loader-03');
  }

}
