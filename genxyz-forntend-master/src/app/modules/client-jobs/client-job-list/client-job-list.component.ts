import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import{MatSnackBar} from'@angular/material/snack-bar';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { AuthServiceService } from 'src/app/service/auth-service.service';
import { ServiceService } from '../service/service.service';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-client-job-list',
  templateUrl: './client-job-list.component.html',
  styleUrls: ['./client-job-list.component.scss']
})
export class ClientJobListComponent implements OnInit {


   filter = {
    page: 0,
    count: 10,
    search: "",
    location: ""
  }
  private filterTimeOut: any = null;

  jobList: any[] = [];
  s3path: any = environment.s3Url;

  constructor(
    public service: ServiceService,
    private auth: AuthServiceService,
    private ngxUiLoader: NgxUiLoaderService,
    private _snackBar: MatSnackBar,
    private routeAction: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.listPost();
  }

  listPost() {
    try {
      this.ngxUiLoader.startLoader("loader-03");
      this.service.listJobPost(this.filter).subscribe(res => {
        console.log(res.data);
        this.jobList = this.jobList.concat(res.data);
        this.ngxUiLoader.stopLoader("loader-03");
        this._snackBar.open("Updated Successfully", "Success!!");
      }, error => {
        console.log("errordaaaad", error);
        this.ngxUiLoader.stopLoader("loader-03");
        if (error.statusCode == 404) {
        } else {
        this._snackBar.open(error.message || "Something went wrong!!", "OK");
        }
      })
    } catch(error) {
      this.ngxUiLoader.stopLoader("loader-03");
      this._snackBar.open("Internal Server Error!!", "Error!!");
    }
  }


  onChangeSearch() {
    this.filter.page = 0;
    if(this.filterTimeOut) {
    this.filterTimeOut = clearTimeout(this.filterTimeOut);
    }
    this.filterTimeOut = setTimeout(() => {
      this.jobList = [];
      this.listPost()
    }, 500);
  }

}
