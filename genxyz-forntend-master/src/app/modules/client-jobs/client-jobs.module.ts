import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientJobsRoutingModule } from './client-jobs-routing.module';
import { ManageJobComponent } from './manage-job/manage-job.component';
import { SharedModule } from '../../shared/shared.module';
// import { ImageUploadComponent } from '../../components/image-upload/image-upload.component';
import { JobFormComponent } from './component/job-form/job-form.component';
import { ImageUploadModule } from '../../components/image-upload/image-upload.module';
import{MatSnackBar} from'@angular/material/snack-bar';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthGuardCompanyService } from '../../authGard/auth-guard-company.service';
import { ClientProfileComponent } from './component/client-profile/client-profile.component';


@NgModule({
  declarations: [
    ManageJobComponent,
    // ImageUploadComponent,
    JobFormComponent,
    ClientProfileComponent
  ],
  imports: [
    ReactiveFormsModule,
    CommonModule,
    ClientJobsRoutingModule,
    SharedModule,
    ImageUploadModule,
    AngularEditorModule,
  ],
  providers:[NgxUiLoaderService, AuthGuardCompanyService]
})
export class ClientJobsModule { }
