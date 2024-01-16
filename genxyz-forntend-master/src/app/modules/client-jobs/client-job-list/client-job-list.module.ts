import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientJobListRoutingModule } from './client-job-list-routing.module';
import { ClientJobListComponent } from './client-job-list.component';
import { SharedModule } from '../../../shared/shared.module';
import { NgxUiLoaderService } from 'ngx-ui-loader';


@NgModule({
  declarations: [
    ClientJobListComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ClientJobListRoutingModule,
  ],
  providers:[NgxUiLoaderService]
})
export class ClientJobListModule { }
