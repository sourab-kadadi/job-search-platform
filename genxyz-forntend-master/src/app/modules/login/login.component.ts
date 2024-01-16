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
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
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
    this.meta.updateTag({ name: 'description', content: 'Find the best remote job, work for international companies from India, work as a developer, digital marketer, customer support, financial analyst, UI/UX designer, Database design, Analytics, Data science, AI/ML, Mobile apps, Front end, Back end, design engineers, virtual assistant, inside sales.' });  

  }

  custoemrFormSubmit() {
    this.ngxUiLoader.startLoader("loader-03");
    this.dataService.loginPartner(this.customerForm.value).subscribe(data => {
      this.ngxUiLoader.stopLoader("loader-03");
      localStorage.setItem("token", JSON.stringify(data));
      this._snackBar.open("Signed Up Sccessfully", "Success!!");
      let user = this.auth.jwtDecoder();
      if(user && user.profileId) {
      this.router.navigate(['/candidate/candidate-job']);
      } else {
      this.router.navigate(['/candidate/profile']);
      }
    }, error => {
      console.log("error", error);
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
