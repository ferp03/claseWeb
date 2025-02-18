import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Components/login/login.component';
import { DashboardComponent } from './Components/dashboard/dashboard.component';
import { UnsecuredPageComponent } from './Components/unsecured-page/unsecured-page.component';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  {path: "login", component: LoginComponent},
  {path: "dashboard", component: DashboardComponent, canActivate: [AuthGuard]},
  {path: "", redirectTo: "/login", pathMatch: "full"},
  {path: "unsecuredRoute", component: UnsecuredPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
