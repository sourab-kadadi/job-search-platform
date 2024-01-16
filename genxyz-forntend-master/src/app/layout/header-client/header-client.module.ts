import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HeaderClientRoutingModule } from './header-client-routing.module';
import { HeaderClientComponent } from './header-client.component';
import { AuthServiceService } from '../../service/auth-service.service';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';


@NgModule({
  declarations: [
    HeaderClientComponent
  ],
  imports: [
    CommonModule,
    HeaderClientRoutingModule,
    MatMenuModule,
    MatIconModule
  ],
  exports: [
    HeaderClientComponent
  ],
  providers: [AuthServiceService]
})
export class HeaderClientModule { }
