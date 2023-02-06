import { Component, Input } from '@angular/core';
import { AccountRetrieveDto } from '@operation-management/common';

@Component({
  selector: 'operation-management-accounts-collection',
  template: `
    <div class="row row-cards">
      <div *ngFor="let account of accounts" class="col-md-6 col-lg-3">
        <div class="card">
          <div class="card-body p-4 text-center">
            <h3 class="m-0 mb-1"><a>{{account.accountName}}</a></h3>
            <div class="text-muted">{{account.clientName}}</div>
            <div class="mt-3">
              <span class="badge bg-purple-lt">{{account.operationManagerName}}</span>
            </div>
          </div>
          <div class="d-flex">
            <a [routerLink]="['/dashboard/teams/account/'+account.id]"  class="card-btn"> Teams </a>
            <a [routerLink]="['/dashboard/accounts/details/'+account.id]"  class="card-btn"> Details </a>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class AccountsCollectionComponent {
    @Input() accounts: AccountRetrieveDto[];
  
}
