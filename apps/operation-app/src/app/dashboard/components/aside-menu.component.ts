import { Component } from '@angular/core';
import { DashboardService } from '../dashboard.service';

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
          <a routerLink="dashboard">
            <img
              src="./static/logo-white.svg"
              width="110"
              height="32"
              alt="Tabler"
              class="navbar-brand-image"
            />
          </a>
        </h1>
        <div class="collapse navbar-collapse" id="sidebar-menu">
          <ul class="navbar-nav pt-lg-3">
            <li class="nav-item">
              <button class="btn">Add category</button>
            </li>
            <!-- Menu Items -->
            <li class="nav-item">
              <operation-management-menu-item
                *ngFor="let category of categories"
                [item]="{
                  label: category.categoryName,
                  icon: 'ti-building-lighthouse',
                  page: 'category/',
                  id: category.id
                }"
              ></operation-management-menu-item>
            </li>
          </ul>
        </div>
      </div>
    </aside>
  `,
})
export class AsideMenuComponent {
  categories: any[];

  constructor(protected dashboardService: DashboardService) {
    this.dashboardService.getCategories().subscribe((data) => {
      this.categories = data;
    });
  }
}
