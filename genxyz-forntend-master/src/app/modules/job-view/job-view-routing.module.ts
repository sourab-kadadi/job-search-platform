import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JobViewComponent } from './job-view.component';

const routes: Routes = [{
  component: JobViewComponent,
  path: ""
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JobViewRoutingModule { }
