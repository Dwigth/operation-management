import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CanActivateDashboard } from './dashboard.guard';
import { DashboardMainComponent } from './dashboard.component';
import { CategoryPageComponent } from './pages/category-page.component';
import { MyAccountPageComponent } from './pages/my-account-page.component';
import { UsersPageComponent } from './pages/users-page.component';
import { AccountsPageComponent } from './pages/accounts-page.component';
import { MovementLogsPageComponent } from './pages/movement-logs-page.component';
import { TeamPageComponent } from './pages/teams-page.component';
import { TeamDetailsComponent } from './components/teams/team-details.component';
import { AccountDetailsComponent } from './components/accounts/account-details.component';
import { TeamListComponent } from './components/teams/team-list.component';
import { AccountsListComponent } from './components/accounts/account-list.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardMainComponent,
    canActivate: [CanActivateDashboard],
    children: [
      {
        path: 'my-account',
        component: MyAccountPageComponent,
      },
      {
        path: 'users',
        component: UsersPageComponent,
        // children: [
        //   {
        //     path: ':id',
        //   }
        // ]
      },
      {
        path: 'teams',
        component: TeamPageComponent,
        children: [
          {
            path: '',
            component: TeamListComponent
          },
          {
            path: 'account/:id',
            component: TeamListComponent
          },
          {
            path:':id',
            component: TeamDetailsComponent,
          },
        ]
      },
      {
        path: 'accounts',
        component: AccountsPageComponent,
        children: [
          {
            path: '',
            component: AccountsListComponent
          },
          {
            path: ':id',
            component: AccountDetailsComponent,
          }
        ]
      },
      {
        path: 'movement-logs',
        component: MovementLogsPageComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [CanActivateDashboard],
})
export class DashboardRoutingModule {}
