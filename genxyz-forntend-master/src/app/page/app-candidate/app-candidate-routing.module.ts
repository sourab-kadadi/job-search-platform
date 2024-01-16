import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardCandidateService } from '../../authGard/auth-guard-candidate.service';
import { AppCandidateComponent } from './app-candidate.component';

const routes: Routes = [{
  path: "",
  component: AppCandidateComponent,
  children: [
    {
      path: '',
      loadChildren: () => import("../../modules/candidate/candidate.module").then(m => m.CandidateModule),
      canActivate: [AuthGuardCandidateService]
    },
  ]
},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppCandidateRoutingModule { }
