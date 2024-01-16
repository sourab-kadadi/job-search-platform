import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { ServiceService } from './service/service.service';
import { LoginRoutingModule } from './login-routing.module';
import{MatSnackBar} from'@angular/material/snack-bar';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { SharedModule } from '../../shared/shared.module';
import { Meta } from '@angular/platform-browser';



@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    SharedModule,
    LoginRoutingModule
  ],
  providers: [ServiceService, NgxUiLoaderService, Meta]
})
export class LoginModule { }
