import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppCandidateRoutingModule } from './app-candidate-routing.module';
import { AppCandidateComponent } from './app-candidate.component';
import { HeaderCandidateModule } from 'src/app/layout/header-candidate/header-candidate.module';
import { AuthGuardCandidateService } from '../../authGard/auth-guard-candidate.service';


@NgModule({
  declarations: [
    AppCandidateComponent
  ],
  imports: [
    CommonModule,
    AppCandidateRoutingModule,
    HeaderCandidateModule
  ],
  providers: [AuthGuardCandidateService]
})
export class AppCandidateModule { }
