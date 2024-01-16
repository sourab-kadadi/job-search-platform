import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CandidatesComponent } from './components/forms/candidates/candidates.component';
import { ClientComponent } from './components/forms/client/client.component';
import { JobPostComponent } from './components/forms/job-post/job-post.component';
import { HomeComponent } from './page/home/home.component';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import("./page/main/main.module").then(m => m.MainModule)
  },
  {
    path: 'schedule-meeting',
    component: ClientComponent,
    // loadChildren: () => import("./page/schedulr-meeting/schedulr-meeting.module").then(m => m.SchedulrMeetingModule)
  },
  {
    path: 'candidate-registration',
    loadChildren: () => import("./modules/candidate/candidate.module").then(m => m.CandidateModule)
  },
  {
    path: 'client',
    loadChildren: () => import("./page/app-client/app-client.module").then(m => m.AppClientModule)
  },
  {
    path: 'candidate',
    loadChildren: () => import("./page/app-candidate/app-candidate.module").then(m => m.AppCandidateModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
