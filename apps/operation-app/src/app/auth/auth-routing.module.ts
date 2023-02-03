import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CanActivateLogin } from './auth.guard';
import { LoginComponent } from './pages/login.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
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
