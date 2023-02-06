import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CanActivateDashboard } from './dashboard.guard';
import { DashboardMainComponent } from './dashboard.component';
import { MyAccountPageComponent } from './pages/my-account-page.component';
import { UsersPageComponent } from './pages/users-page.component';
import { AccountsPageComponent } from './pages/accounts-page.component';
import { MovementLogsPageComponent } from './pages/movement-logs-page.component';
import { TeamPageComponent } from './pages/teams-page.component';
import { TeamDetailsComponent } from './components/teams/team-details.component';
import { AccountDetailsComponent } from './components/accounts/account-details.component';
import { TeamListComponent } from './components/teams/team-list.component';
import { AccountsListComponent } from './components/accounts/account-list.component';
import { UsersListComponent } from './components/users/user-list.component';
import { UserDetailComponent } from './components/users/user-detail.component';
import { CreateUserComponent } from './components/users/new-user.component';
import { CreateAccountComponent } from './components/accounts/new-account.component';
import { CreateTeamComponent } from './components/teams/new-team.component';

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
        children: [
          {
            path: '',
            component: UsersListComponent
          },
          {
            path: 'details/:id',
            component: UserDetailComponent
          },
          {
            path: 'create',
            component: CreateUserComponent,
          }
        ]
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
            path:'details/:id',
            component: TeamDetailsComponent,
          },
          {
            path: 'create',
            component: CreateTeamComponent
          }
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
            path: 'details/:id',
            component: AccountDetailsComponent,
          },
          {
            path: 'create',
            component: CreateAccountComponent,
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
