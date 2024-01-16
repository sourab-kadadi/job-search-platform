import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main.component';
import { HeaderModule } from '../../layout/header/header.module';
import { FooterModule } from 'src/app/layout/footer/footer.module';
import { HomeComponent } from '../home/home.component';
import { CandidatesComponent } from 'src/app/components/forms/candidates/candidates.component';
import { ClientComponent } from 'src/app/components/forms/client/client.component';
import { FormsComponent } from 'src/app/components/forms/forms.component';
import { JobPostComponent } from 'src/app/components/forms/job-post/job-post.component';
import { PricingComponent } from 'src/app/components/pricing/pricing.component';
import { HeaderComponent } from 'src/app/layout/header/header.component';
import { ProcessStepsComponent } from 'src/app/components/process-steps/process-steps.component';

@NgModule({
  declarations: [
    MainComponent,
    PricingComponent,
    FormsComponent,
    ClientComponent,
    CandidatesComponent,
    JobPostComponent,
    HomeComponent,
    ProcessStepsComponent,
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    HeaderModule,
    FooterModule,
  ],
  exports: [
    ProcessStepsComponent
  ]
})
export class MainModule { }
