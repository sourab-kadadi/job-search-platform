import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FooterClientRoutingModule } from './footer-client-routing.module';
import { FooterClientComponent } from './footer-client.component';


@NgModule({
  declarations: [
    FooterClientComponent
  ],
  imports: [
    CommonModule,
    FooterClientRoutingModule
  ]
})
export class FooterClientModule { }
