import { Component } from '@angular/core';
import { DashboardService } from '../../dashboard.service';

@Component({
  selector: 'operation-management-aside-menu',
  template: `
    <aside class="navbar navbar-vertical navbar-expand-lg navbar-dark">
      <div class="container-fluid">
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#sidebar-menu"
          aria-controls="sidebar-menu"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <h1 class="navbar-brand navbar-brand-autodark">
          <a routerLink="dashboard"> </a>
        </h1>
        <div class="collapse navbar-collapse" id="sidebar-menu">
          <ul class="navbar-nav pt-lg-3">
            <!-- Menu Items -->
            <li class="nav-item">
              <operation-management-menu-item
                [item]="{
                  label: 'My Account',
                  icon: 'ti-user',
                  page: 'my-account'
                }"
              ></operation-management-menu-item>
            </li>
            <li *ngIf="shouldRenderAdminOptions" class="nav-item">
              <operation-management-menu-item
                [item]="{
                  label: 'Users',
                  icon: 'ti-users',
                  page: 'users'
                }"
              ></operation-management-menu-item>
            </li>
            <li *ngIf="shouldRenderAdminOptions" class="nav-item">
              <operation-management-menu-item
                [item]="{
                  label: 'Accounts',
                  icon: 'ti-building',
                  page: 'accounts'
                }"
              ></operation-management-menu-item>
            </li>
            <li *ngIf="shouldRenderAdminOptions" class="nav-item">
              <operation-management-menu-item
                [item]="{
                  label: 'Teams',
                  icon: 'ti-friends',
                  page: 'teams'
                }"
              ></operation-management-menu-item>
            </li>
            <li *ngIf="shouldRenderAdminOptions" class="nav-item">
              <operation-management-menu-item
                [item]="{
                  label: 'Movement Logs',
                  icon: 'ti-book',
                  page: 'movement-logs'
                }"
              ></operation-management-menu-item>
            </li>
            <li class="nav-item">
              <operation-management-menu-item
                [item]="{
                  label: 'Log out',
                  icon: 'ti-logout',
                  page: ''
                }"
                (click)="logout()"
              ></operation-management-menu-item>
            </li>
          </ul>
        </div>
      </div>
    </aside>
  `,
})
export class AsideMenuComponent {
  protected shouldRenderAdminOptions: boolean;

  constructor(protected dashboardService: DashboardService) {
    this.shouldRenderAdminOptions = <boolean>(JSON.parse(<string>localStorage.getItem('shouldRender')));    
  }

  protected logout() {
    if (confirm('Are you sure you want to logout?')) {
      localStorage.clear();
      location.reload();
    }
  }
}
