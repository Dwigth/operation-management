import { Component } from '@angular/core';

@Component({
  selector: 'operation-management-my-account-page',
  template: `
    <div class="card">
      <div class="row g-0">
        <div class="col-3 d-none d-md-block border-end">
          <div class="card-body">
            <h4 class="subheader">Account settings</h4>
            <div class="list-group list-group-transparent">
              <a
                href="./settings.html"
                class="list-group-item list-group-item-action d-flex align-items-center active"
                >My Information</a
              >
            </div>
          </div>
        </div>
        <div class="col d-flex flex-column">
          <operation-management-profile-form></operation-management-profile-form>
        </div>
      </div>
    </div>
  `,
})
export class MyAccountPageComponent {}
