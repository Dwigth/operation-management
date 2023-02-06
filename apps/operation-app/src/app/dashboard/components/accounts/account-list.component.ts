import { Component, OnInit } from '@angular/core';
import { AccountRetrieveDto } from '@operation-management/common';
import { AccountsService } from './accounts.service';

@Component({
  selector: 'operation-management-accounts-list',
  template: `
    <operation-management-accounts-collection
      [accounts]="accounts"
    ></operation-management-accounts-collection>
  `,
})
export class AccountsListComponent implements OnInit {
  protected accounts: AccountRetrieveDto[];

  constructor(private accountService: AccountsService) {}
  ngOnInit(): void {
    this.accountService.getAccounts().subscribe((data) => {
      this.accounts = data;
    });
  }
}
