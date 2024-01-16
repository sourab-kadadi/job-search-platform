import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppClientComponent } from './app-client.component';

const routes: Routes = [{
  path: "",
  component: AppClientComponent,
  children: [
    {
      path: '',
      loadChildren: () => import("../../modules/client-jobs/client-jobs.module").then(m => m.ClientJobsModule)
    },
  ]
},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppClientRoutingModule { }
