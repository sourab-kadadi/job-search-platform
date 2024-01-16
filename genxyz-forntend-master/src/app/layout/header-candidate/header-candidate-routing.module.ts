import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeaderCandidateComponent } from './header-candidate.component';

const routes: Routes = [
  {
    path: "",
    component: HeaderCandidateComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HeaderCandidateRoutingModule { }
