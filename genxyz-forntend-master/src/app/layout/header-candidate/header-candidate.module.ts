import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HeaderCandidateRoutingModule } from './header-candidate-routing.module';
import { HeaderCandidateComponent } from './header-candidate.component';
import { AuthServiceService } from '../../service/auth-service.service';
import {MatMenuModule} from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';


@NgModule({
  declarations: [
    HeaderCandidateComponent
  ],
  imports: [
    CommonModule,
    HeaderCandidateRoutingModule,
    MatMenuModule,
    MatIconModule
  ],
  exports: [
    HeaderCandidateComponent
  ],
  providers: [AuthServiceService]
})
export class HeaderCandidateModule { }
