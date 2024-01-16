import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import{MatSnackBar} from'@angular/material/snack-bar';
import { ServiceService } from './service/service.service';
import { Router } from '@angular/router';
import { AuthServiceService } from '../../service/auth-service.service';
import { Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-client-login',
  templateUrl: './client-login.component.html',
  styleUrls: ['./client-login.component.scss']
})
export class ClientLoginComponent implements OnInit {

  customerForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    psw: ['', [Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{7,30}$')]],
  });
  constructor(
    private fb: FormBuilder,
    public dataService: ServiceService,
    private ngxUiLoader: NgxUiLoaderService,
    private _snackBar: MatSnackBar,
    private router: Router,
    private auth: AuthServiceService,
    private meta: Meta
  ) { }

  ngOnInit(): void {
    this.meta.updateTag({ name: 'description', content: 'Post remote jobs and hire qualified candidates for remote work.' });
  }

  custoemrFormSubmit() {
    this.ngxUiLoader.startLoader("loader-03");
    this.dataService.loginPartner(this.customerForm.value).subscribe(data => {
      this.ngxUiLoader.stopLoader("loader-03");
      localStorage.setItem("token", JSON.stringify(data));
      this._snackBar.open("Signed Up Sccessfully", "Success!!");
      let user = this.auth.jwtDecoder();
        this.router.navigate(['/client']);
    }, error => {
      this.ngxUiLoader.stopLoader("loader-03");
      if (error.statusCode && error.statusCode == 401) {
        this._snackBar.open("Unautherized, please enter valid email and password", "OK");
      } else {
        this._snackBar.open(
          error.message || "Something went wrong!!",
          "Error!");
      }
    })
  }
}
