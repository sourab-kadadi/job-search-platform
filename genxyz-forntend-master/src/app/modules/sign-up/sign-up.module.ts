import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignUpComponent } from './sign-up.component';
import { SignUpRoutingModule } from './sign-up-routing.module';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { SharedModule } from '../../shared/shared.module';
import { SignUpService } from './service/sign-up.service';
import { CandidateRegistrationComponent } from './candidate-registration/candidate-registration.component';
import { CompanyRegistrationComponent } from './company-registration/company-registration.component';
import { ProductCategoryComponent } from 'src/app/components/product-category/product-category.component';
// import { ProcessStepsComponent } from 'src/app/components/process-steps/process-steps.component';
import { ProccessStepsCandidateComponent } from 'src/app/components/proccess-steps-candidate/proccess-steps-candidate.component';
import { Meta } from '@angular/platform-browser';
import { MainModule } from 'src/app/page/main/main.module';


@NgModule({
  declarations: [ SignUpComponent, CandidateRegistrationComponent, CompanyRegistrationComponent, ProductCategoryComponent, ProccessStepsCandidateComponent],
  imports: [
    CommonModule,
    SignUpRoutingModule,
    SharedModule,
    MainModule
  ],
  providers: [SignUpService, NgxUiLoaderService, Meta]
})
export class SignUpModule { }
