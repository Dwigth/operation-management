import { Component, EventEmitter, OnDestroy, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { AccountRetrieveDto } from '@operation-management/common';
import { Subscription } from 'rxjs';
import { AccountsService } from './accounts.service';
/**
 * @see https://attacomsian.com/blog/javascript-detect-account-stops-typing
 */
@Component({
  selector: 'operation-management-find-account',
  styles: ['.list-group-item { cursor: pointer }'],
  template: `
    <div class="mb-3">
      <label class="form-label">Search Account</label>
      <div class="input-icon mb-3">
        <input
          [formControl]="accountSearch"
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
        <ul *ngIf="searchedAccounts.length > 0" class="list-group ">
          <li
            (click)="selectAccount(account)"
            *ngFor="let account of searchedAccounts"
            class="list-group-item"
          >
            {{ account.accountName }}
          </li>
        </ul>
      </div>
    </div>
  `,
})
export class FindAccountComponent implements OnDestroy {
  private timer: any;
  private waitTime = 500;
  protected isLoading = false;
  protected accountSearch = new FormControl('');
  protected searchedAccounts: AccountRetrieveDto[] = [];
  protected isWriting = false;
  protected stopWritingTimeout: any;
  protected selectedAccount: AccountRetrieveDto;
  protected accountSearchSubscription: Subscription;

  @Output() account = new EventEmitter<AccountRetrieveDto | null>();

  constructor(private accountService: AccountsService) {}

  ngOnDestroy(): void {
    if (this.accountSearchSubscription)
      this.accountSearchSubscription.unsubscribe();
  }

  selectAccount(account: AccountRetrieveDto): void {
    this.selectedAccount = account;
    this.accountSearch.setValue(this.selectedAccount.accountName);
    this.searchedAccounts = [];
    this.account.emit(account);
  }

  searchMechanism(): void {
    clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      this.search();
    }, this.waitTime);
  }

  search(): void {
    this.searchedAccounts = [];
    if (this.accountSearch.value === '') return;
    this.isLoading = true;
    this.accountSearchSubscription = this.accountService
      .search(<string>this.accountSearch.value)
      .subscribe((accounts) => {
        this.isLoading = false;
        this.searchedAccounts = accounts;
      });
  }
}
