import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientLoginRoutingModule } from './client-login-routing.module';
import { ClientLoginComponent } from './client-login.component';
import { ServiceService } from './service/service.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [
    ClientLoginComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ClientLoginRoutingModule
  ],
  providers: [ServiceService, NgxUiLoaderService]
})
export class ClientLoginModule { }
