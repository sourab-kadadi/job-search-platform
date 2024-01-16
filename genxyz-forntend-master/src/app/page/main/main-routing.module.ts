import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "../home/home.component";
import { MainComponent } from "./main.component";

const routes: Routes = [
  {
    path: "",
    component: MainComponent,
    children: [
      {
        path: "",
        component: HomeComponent
      },
      { path: "sign-up", loadChildren: () => import("../../modules/sign-up/sign-up.module").then(m => m.SignUpModule) },
      {
        path: "client-login",
        loadChildren: () => import("../../modules/client-login/client-login.module").then(m => m.ClientLoginModule)
      },
      {path: 'candidate-login', loadChildren: () => import('../../modules/login/login.module').then(m => m.LoginModule)},
      {
        path: 'privacy-policy',
        loadChildren: () => import("../../modules/privacy-policy/privacy-policy.module").then(m => m.PrivacyPolicyModule)
      },
      {
        path: 'about-us',
        loadChildren: () => import("../../modules/about-us/about-us.module").then(m => m.AboutUsModule)
      },
      {
        path: 'Blogs',
        loadChildren: () => import("../../modules/blogs/blogs.module").then(m => m.BlogsModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule {}
