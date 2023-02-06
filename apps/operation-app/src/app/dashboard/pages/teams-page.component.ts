import { Component } from '@angular/core';

@Component({
  selector: 'operation-management',
  template: `
    <div class="page-body">
      <div class="container-xl">
        <router-outlet></router-outlet>
      </div>
    </div>
  `,
})
export class TeamPageComponent {}
