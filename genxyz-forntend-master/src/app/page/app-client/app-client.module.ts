import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppClientRoutingModule } from './app-client-routing.module';
import { AppClientComponent } from './app-client.component';
import { HeaderClientModule } from '../../layout/header-client/header-client.module';


@NgModule({
  declarations: [
    AppClientComponent
  ],
  imports: [
    CommonModule,
    AppClientRoutingModule,
    HeaderClientModule
  ]
})
export class AppClientModule { }
