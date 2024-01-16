import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { SignUpService } from '../service/sign-up.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import{MatSnackBar} from'@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-company-registration',
  templateUrl: './company-registration.component.html',
  styleUrls: ['./company-registration.component.scss']
})
export class CompanyRegistrationComponent implements OnInit {
  customerForm = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    psw: ['', [Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{7,30}$')]],
    phoneNo:['', [Validators.required, Validators.min(10)]],
    gender: ['',  Validators.required,],
    companyDetails: this.fb.group({
      companyName: ['',  Validators.required],
    })
  });

  public videoAttribute = {
    title: "See more About us",
    subFirstSection: "Our",
    subSecondSection: "video",
    backgroundImage1920X850: "http://via.placeholder.com/1920x850",
    videoLink: "#"
  };

  constructor(
    private fb: FormBuilder,
    public dataService: SignUpService,
    private ngxUiLoader: NgxUiLoaderService,
    private _snackBar: MatSnackBar,
    private router: Router,
    private meta: Meta
    ) { }

  ngOnInit() {
    this.meta.updateTag({ name: 'description', content: 'Post remote jobs and hire qualified candidates for remote work.' });
  }


  custoemrFormSubmit() {
    this.ngxUiLoader.startLoader("loader-03");
    this.dataService.signUpCompany(this.customerForm.value).subscribe(data => {
      this.ngxUiLoader.stopLoader("loader-03");
      this._snackBar.open("Signed Up Sccessfully", "Success!!");
      this.router.navigate(['/client-login']);
    }, error => {
      console.log(error);
      this.ngxUiLoader.stopLoader("loader-03");
      this._snackBar.open(error.message || "Something went wrong!!", "Error!!");
    })
  }
}
