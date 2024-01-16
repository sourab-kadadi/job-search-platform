import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardCompanyService } from 'src/app/authGard/auth-guard-company.service';
import { ClientProfileComponent } from './component/client-profile/client-profile.component';
import { ManageJobComponent } from './manage-job/manage-job.component';

const routes: Routes =
[
  {
  path: "add",
  component: ManageJobComponent,
  data: {
    type: "ADD"
  },
  canActivate: [AuthGuardCompanyService]
},
{
  path: "post-job/edit/:jobPostId",
  component: ManageJobComponent,
  data: {
    type: "EDIT"
  },
  canActivate: [AuthGuardCompanyService]
},
{
  path: "profile",
  component: ClientProfileComponent,
  canActivate: [AuthGuardCompanyService]
},
{ path: '', 
loadChildren: () => import('./client-job-list/client-job-list.module').then(m => m.ClientJobListModule),
canActivate: [AuthGuardCompanyService]
},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientJobsRoutingModule { }
