import { Component, Input } from '@angular/core';

interface MenuItem {
    label: string;
    icon: string;
    page: string;
    id: number;
}

@Component({
    selector: 'operation-management-menu-item',
    template: `
    <a class="nav-link" [routerLink]="item.page + item.id">
      <span class="nav-link-icon d-md-none d-lg-inline-block">
             <i [class]="'ti ' + item.icon"></i>
      </span>
      <span class="nav-link-title">
            {{item.label}}
        </span>
    </a>
    `,
})

export class MenuItemComponent {
    @Input() item: MenuItem;

    constructor() {
        //
     }
}