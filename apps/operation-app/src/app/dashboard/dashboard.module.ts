import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { AsideMenuComponent } from './components/menu/aside-menu.component';
import { TeamDetailsComponent } from './components/teams/team-details.component';
import { MenuItemComponent } from './components/menu/menu-item.component';
import { MyProfileFormComponent } from './components/my-profile-form.component';
import { UserCollectionComponent } from './components/users/users-collection.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardMainComponent } from './dashboard.component';
import { DashboardService } from './dashboard.service';
import { AccountsPageComponent } from './pages/accounts-page.component';
import { CategoryPageComponent } from './pages/category-page.component';
import { MovementLogsPageComponent } from './pages/movement-logs-page.component';
import { MyAccountPageComponent } from './pages/my-account-page.component';
import { TeamPageComponent } from './pages/teams-page.component';
import { UsersPageComponent } from './pages/users-page.component';
import { AccountDetailsComponent } from './components/accounts/account-details.component';
import { AccountsCollectionComponent } from './components/accounts/accounts-collection.component';
import { TeamListComponent } from './components/teams/team-list.component';
import { TeamsCollectionComponent } from './components/teams/teams-collection.component';
import { AccountsListComponent } from './components/accounts/account-list.component';
import { TeamsService } from './components/teams/teams.service';
import { AccountsService } from './components/accounts/accounts.service';
import { UserService } from './components/users/user.service';
import { FindUsersComponent } from './components/users/find-users.component';
import { FindAccountComponent } from './components/accounts/find-account.component';
import { UsersListComponent } from './components/users/user-list.component';
import { UserDetailComponent } from './components/users/user-detail.component';
import { CreateUserComponent } from './components/users/new-user.component';
import { CreateAccountComponent } from './components/accounts/new-account.component';
import { CreateTeamComponent } from './components/teams/new-team.component';
import { MembersComponent } from './components/teams/members.component';
import { MovementLogFormComponent } from './components/movement-logs/movement-form.component';
import { MovementLogsListComponent } from './components/movement-logs/movement-list.component';
import { MovementLogsService } from './components/movement-logs/movement-logs.service';
import { FindTeamComponent } from './components/teams/find-team.component';

@NgModule({
  imports: [
    CommonModule,
    DashboardRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    SharedModule,
  ],
  exports: [],
  declarations: [
    DashboardMainComponent,
    AsideMenuComponent,
    MenuItemComponent,
    CategoryPageComponent,
    MyAccountPageComponent,
    UsersPageComponent,
    AccountsPageComponent,
    MovementLogsPageComponent,
    MyProfileFormComponent,
    UserCollectionComponent,
    AccountsCollectionComponent,
    TeamDetailsComponent,
    TeamsCollectionComponent,
    TeamPageComponent,
    TeamListComponent,
    AccountDetailsComponent,
    AccountsListComponent,
    FindUsersComponent,
    FindAccountComponent,
    UsersListComponent,
    UserDetailComponent,
    CreateUserComponent,
    CreateAccountComponent,
    CreateTeamComponent,
    MembersComponent,
    MovementLogFormComponent,
    MovementLogsListComponent,
    FindTeamComponent,
  ],
  providers: [
    DashboardService,
    TeamsService,
    AccountsService,
    UserService,
    MovementLogsService,
  ],
})
export class DashboardModule {}
