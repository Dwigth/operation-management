import { Component, EventEmitter, OnDestroy, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { UserListDto } from '@operation-management/common';
import { Subscription } from 'rxjs';
import { UserService } from './user.service';
/**
 * @see https://attacomsian.com/blog/javascript-detect-user-stops-typing
 */
@Component({
  selector: 'operation-management-find-user',
  styles: ['.list-group-item { cursor: pointer }'],
  template: `
    <div class="mb-3">
      <label class="form-label">Buscar usuario</label>
      <div class="input-icon mb-3">
        <input
          [formControl]="userSearch"
          (keyup)="searchMechanism()"
          type="text"
          class="form-control"
        />
        <span *ngIf="isLoading" class="input-icon-addon">
          <div
            class="spinner-border spinner-border-sm text-muted"
            role="status"
          ></div>
        </span>
        <ul *ngIf="searchedUsers.length > 0" class="list-group ">
          <li
            (click)="selectClient(client)"
            *ngFor="let client of searchedUsers"
            class="list-group-item"
          >
            {{ client.name }}
          </li>
        </ul>
      </div>
    </div>
  `,
})
export class FindUsersComponent implements OnDestroy {
  private timer: any;
  private waitTime = 500;
  protected isLoading = false;
  protected userSearch = new FormControl('');
  protected searchedUsers: UserListDto[] = [];
  protected isWriting = false;
  protected stopWritingTimeout: any;
  protected selectedUser: UserListDto;
  protected clientSearchSubscription: Subscription;

  @Output() client = new EventEmitter<UserListDto | null>();

  constructor(private userService: UserService) {}

  ngOnDestroy(): void {
    if (this.clientSearchSubscription)
      this.clientSearchSubscription.unsubscribe();
  }

  createClient() {
    this.client.emit(null);
    this.searchedUsers = [];
    this.userSearch.setValue('');
  }

  selectClient(client: UserListDto): void {
    this.selectedUser = client;
    this.userSearch.setValue(this.selectedUser.name);
    this.searchedUsers = [];
    this.client.emit(client);
  }

  searchMechanism(): void {
    clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      this.search();
    }, this.waitTime);
  }

  search(): void {
    this.searchedUsers = [];
    if (this.userSearch.value === '') return;
    this.isLoading = true;
    this.clientSearchSubscription = this.userService
      .search(<string>this.userSearch.value)
      .subscribe((clients) => {
        this.isLoading = false;
        this.searchedUsers = clients;
      });
  }
}
