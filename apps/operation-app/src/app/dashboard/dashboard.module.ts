import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { AsideMenuComponent } from './components/aside-menu.component';
import { MenuItemComponent } from './components/menu-item.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardMainComponent } from './dashboard.component';
import { DashboardService } from './dashboard.service';
import { AccountsPageComponent } from './pages/accounts-page.component';
import { CategoryPageComponent } from './pages/category-page.component';
import { MovementLogsPageComponent } from './pages/movement-logs-page.component';
import { MyAccountPageComponent } from './pages/my-account-page.component';
import { UsersPageComponent } from './pages/users-page.component';

@NgModule({
  imports: [CommonModule, DashboardRoutingModule, HttpClientModule],
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
  ],
  providers: [DashboardService],
})
export class DashboardModule {}
