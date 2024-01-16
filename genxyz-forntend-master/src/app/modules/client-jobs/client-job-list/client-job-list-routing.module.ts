import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientJobListComponent } from './client-job-list.component';

const routes: Routes = [{
  component: ClientJobListComponent,
  path: ""
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientJobListRoutingModule { }
