import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { AsideMenuComponent } from './components/aside-menu.component';
import { MenuItemComponent } from './components/menu-item.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardMainComponent } from './dashboard.component';
import { DashboardService } from './dashboard.service';
import { CategoryPageComponent } from './pages/category-page.component';

@NgModule({
  imports: [CommonModule, DashboardRoutingModule, HttpClientModule],
  exports: [],
  declarations: [
    DashboardMainComponent,
    AsideMenuComponent,
    MenuItemComponent,
    CategoryPageComponent,
  ],
  providers: [DashboardService],
})
export class DashboardModule {}
