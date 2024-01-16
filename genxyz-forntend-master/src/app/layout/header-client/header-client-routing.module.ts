import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeaderClientComponent } from './header-client.component';

const routes: Routes = [
  {
    path: "",
    component: HeaderClientComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HeaderClientRoutingModule { }
