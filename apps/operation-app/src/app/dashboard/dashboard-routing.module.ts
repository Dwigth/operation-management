import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CanActivateDashboard } from './dashboard.guard';
import { DashboardMainComponent } from './dashboard.component';
import { CategoryPageComponent } from './pages/category-page.component';
import { MyAccountPageComponent } from './pages/my-account-page.component';
import { UsersPageComponent } from './pages/users-page.component';
import { AccountsPageComponent } from './pages/accounts-page.component';
import { MovementLogsPageComponent } from './pages/movement-logs-page.component';

const routes: Routes = [
    {
        path: '',
        component: DashboardMainComponent,
        canActivate: [CanActivateDashboard],
        children:[
          {
            path: 'my-account',
            component: MyAccountPageComponent,
          },
          {
            path: 'users',
            component: UsersPageComponent,
          },
          {
            path: 'accounts',
            component: AccountsPageComponent,
          },
          {
            path: 'movement-logs',
            component: MovementLogsPageComponent,
          },
        ]
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers:[CanActivateDashboard]
})
export class DashboardRoutingModule { }
