import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CandidateJobListComponent } from './candidate-job-list.component';
import { SharedModule } from '../../../shared/shared.module';
import { CandidateJobListRoutingModule } from './candidate-job-list.routing.module';
import{MatSnackBar} from'@angular/material/snack-bar';
import { NgxUiLoaderService } from 'ngx-ui-loader';



@NgModule({
  declarations: [
    CandidateJobListComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    CandidateJobListRoutingModule
  ],
  providers:[NgxUiLoaderService]
})
export class CandidateJobListModule { }
