import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CandidateRegistrationComponent } from './candidate-registration/candidate-registration.component';
import { CompanyRegistrationComponent } from './company-registration/company-registration.component';
import { SignUpComponent } from './sign-up.component';



const routes: Routes = [
  {path: '', component: CandidateRegistrationComponent},
  {path: 'candidate', component: CandidateRegistrationComponent},
  {path: 'client', component: CompanyRegistrationComponent},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SignUpRoutingModule { }
