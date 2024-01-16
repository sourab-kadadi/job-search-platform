import { Component, OnInit } from '@angular/core';
import { ProgressBarMode } from '@angular/material/progress-bar';
import{MatSnackBar} from'@angular/material/snack-bar';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { AuthServiceService } from '../../../../service/auth-service.service';
import { ServiceService } from '../../service/service.service';

@Component({
  selector: 'app-client-profile',
  templateUrl: './client-profile.component.html',
  styleUrls: ['./client-profile.component.scss']
})
export class ClientProfileComponent implements OnInit {
  user: any;
  constructor(
    public service: ServiceService,
    private auth: AuthServiceService,
    private ngxUiLoader: NgxUiLoaderService,
    private _snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.getUserInfo()
  }

  getUserInfo() {
    try {
      this.ngxUiLoader.startLoader("loader-03");
      this.service.getUserInfo().subscribe(res => {
        this.user = res.data;
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

  Save() {

  }

  Cancel() {

  }

  saveProfilePic(event: any) {}

}
