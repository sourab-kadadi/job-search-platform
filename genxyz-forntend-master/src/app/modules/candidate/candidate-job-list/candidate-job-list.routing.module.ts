import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CandidateJobListComponent } from './candidate-job-list.component';

const routes: Routes = [{
  component: CandidateJobListComponent,
  path: ""
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]})
export class CandidateJobListRoutingModule { }