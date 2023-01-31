import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CanActivateLogin } from './auth.guard';
import { LoginComponent } from './pages/login.component';
import { SignupComponent } from './pages/signup.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [CanActivateLogin],
  },
  {
    path: 'signup',
    component: SignupComponent,
    canActivate: [CanActivateLogin],
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'prefix'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers:[CanActivateLogin]
})
export class AuthRoutingModule { }
