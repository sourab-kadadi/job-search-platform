import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardCandidateService } from '../../authGard/auth-guard-candidate.service';
import { ProfileDetailsComponent } from './profile-details/profile-details.component';

const routes: Routes = [   {
  path: 'profile',
  component: ProfileDetailsComponent,
  canActivate: [AuthGuardCandidateService]
},
{
  path: 'candidate-job', loadChildren: () => import('./candidate-job-list/candidate-job-list.module').then(m => m.CandidateJobListModule),
  canActivate: [AuthGuardCandidateService]
},
{
  path: 'view-job/:jobPostId', loadChildren: () => import('../job-view/job-view.module').then(m => m.JobViewModule),
  canActivate: [AuthGuardCandidateService]
},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CandidateRoutingModule { }
