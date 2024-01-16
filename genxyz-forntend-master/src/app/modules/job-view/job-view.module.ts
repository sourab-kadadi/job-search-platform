import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JobViewRoutingModule } from './job-view-routing.module';
import { JobViewComponent } from './job-view.component';
import { SharedModule } from '../../shared/shared.module';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { FooterModule } from '../../layout/footer/footer.module';


@NgModule({
  declarations: [
    JobViewComponent
  ],
  imports: [
    CommonModule,
    JobViewRoutingModule,
    SharedModule,
    FooterModule
  ],
  providers: [NgxUiLoaderService]
})
export class JobViewModule { }
