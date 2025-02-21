import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Components/login/login.component';
import { DashboardComponent } from './Components/dashboard/dashboard.component';
import { AboutComponent } from './Components/about/about.component';
import { LayoutComponent } from './layout/layout.component';
import { AuthGuard } from './auth/auth.guard';
import { ContactComponent } from './Components/contact/contact.component';

const routes: Routes = [
  {path: "login", component: LoginComponent},
  {path: "", redirectTo: "/login", pathMatch: "full"},
  {
    path: "", component: LayoutComponent,
    children: [
      {path: "", redirectTo: "/dashboard", pathMatch: "full"},
      {path: "dashboard", component: DashboardComponent, canActivate: [AuthGuard]}, // Ruta protegida que puede llamar al api
      {path: "about", component: AboutComponent},
      {path: "contact", component: ContactComponent}
    ]
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
