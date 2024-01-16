  import { Component, OnInit } from '@angular/core';
  import { FormBuilder } from '@angular/forms';
  import { Validators } from '@angular/forms';
  import { SignUpService } from './service/sign-up.service';
  import { NgxUiLoaderService } from 'ngx-ui-loader';
  import{MatSnackBar} from'@angular/material/snack-bar';
import { Router } from '@angular/router';
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  customerForm = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    psw: ['', [Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{7,30}$')]],
    phoneNo:['', [Validators.required, Validators.min(10)]],
    gender: ['',  Validators.required,]
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
    private router: Router
    ) { }

  ngOnInit() {
  }


  custoemrFormSubmit() {
    this.ngxUiLoader.startLoader("loader-03");
    this.dataService.signUpCandidate(this.customerForm.value).subscribe(data => {
      this.ngxUiLoader.stopLoader("loader-03");
      this._snackBar.open("Signed Up Sccessfully", "Success!!");
      this.router.navigate(['/login']);
    }, error => {
      this.ngxUiLoader.stopLoader("loader-03");
      this._snackBar.open(error.message || "Something went wrong!!", "Error!!");
    })
  }

}
