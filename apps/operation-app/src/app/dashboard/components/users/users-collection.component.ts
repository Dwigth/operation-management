import { Component, Input } from '@angular/core';
import { UserListDto } from '@operation-management/common';

@Component({
  selector: 'operation-management-users-collection',
  template: `
    <div class="row row-cards">
      <div *ngFor="let user of users" class="col-md-6 col-lg-3">
        <div class="card">
          <div class="card-body p-4 text-center">
            <h3 class="m-0 mb-1">
              <a class="cursor-pointer">{{ user.name }}</a>
            </h3>
            <!-- <div class="text-muted"></div> -->
            <div class="mt-3">
              <span class="badge bg-purple-lt">{{ user.email }}</span>
            </div>
          </div>
          <div class="d-flex">
            <a
              [routerLink]="['update/' + user.id]"
              routerLinkActive="router-link-active"
              class="card-btn cursor-pointer"
            >
              Update</a
            >
            <a (click)="deleteUser(user.id)" class="card-btn cursor-pointer">
              Delete</a
            >
          </div>
        </div>
      </div>
    </div>
  `,
})
export class UserCollectionComponent {
  @Input() users: UserListDto[];

  deleteUser(userId: number) {
    //
  }
}
