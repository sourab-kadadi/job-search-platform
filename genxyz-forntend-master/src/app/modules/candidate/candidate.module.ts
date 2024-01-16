import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CandidateRoutingModule } from './candidate-routing.module';
import { ProfileDetailsComponent } from './profile-details/profile-details.component';
import { SharedModule } from '../../shared/shared.module';
import { KeySkillsComponent } from './component/key-skills/key-skills.component';
import { ProfessionalDetailsComponent } from './component/professional-details/professional-details.component';
import { PersonalDetailsComponent } from './component/personal-details/personal-details.component';
import { UploadFileComponent } from './component/upload-file/upload-file.component';
import { ServiceService } from './service/service.service';
import { AuthServiceService } from '../../service/auth-service.service';
import{MatSnackBar} from'@angular/material/snack-bar';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ImageUploadModule } from '../../components/image-upload/image-upload.module';
import { AuthGuardCandidateService } from '../../authGard/auth-guard-candidate.service';
import { BasicInfoComponent } from './component/basic-info/basic-info.component';
// import { ImageUploadComponent } from '../../components/image-upload/image-upload.component';


@NgModule({
  declarations: [
    ProfileDetailsComponent,
    KeySkillsComponent,
    ProfessionalDetailsComponent,
    PersonalDetailsComponent,
    UploadFileComponent,
    BasicInfoComponent
  ],
  imports: [
    CommonModule,
    CandidateRoutingModule,
    SharedModule,
    ImageUploadModule
  ],
  providers: [ServiceService, AuthServiceService, NgxUiLoaderService, AuthGuardCandidateService]
})
export class CandidateModule { }
