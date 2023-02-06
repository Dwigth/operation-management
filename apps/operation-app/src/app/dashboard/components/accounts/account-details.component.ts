import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AccountsService } from './accounts.service';

@Component({
  selector: 'operation-management-account-details',
  template: `
    <div class="card">
      <div class="card-body">
        <form [formGroup]="accountForm">
          <h3 class="card-title">Account details</h3>
          <div class="row row-cards">
            <div class="col-md-6">
              <label class="form-label">Account name</label>
              <input
                formControlName="accountName"
                class="form-control"
                type="text"
              />
            </div>
            <div class="col-md-6">
              <label class="form-label">Client name</label>
              <input
                formControlName="clientName"
                class="form-control"
                type="text"
              />
            </div>
            <div class="col-md-6">
              <label class="form-label">Operation manager</label>
              <input
                formControlName="operationManagerName"
                class="form-control"
                type="text"
              />
            </div>
          </div>
        </form>
      </div>
      <div class="d-flex">
        <a class="card-btn"> Update </a>
        <a class="card-btn"> Delete </a>
      </div>
    </div>
  `,
})
export class AccountDetailsComponent {
  protected accountForm = new FormGroup({
    accountName: new FormControl(''),
    clientName: new FormControl(''),
    operationManagerName: new FormControl(''),
  });
  constructor(
    private router: ActivatedRoute,
    private accountService: AccountsService
  ) {
    this.router.params.subscribe((param) => {
      this.accountService.getAccount(param['id']).subscribe((data) => {
        const { accountName, clientName, operationManagerName } = data;
        this.accountForm = new FormGroup({
          accountName: new FormControl(accountName),
          clientName: new FormControl(clientName),
          operationManagerName: new FormControl(operationManagerName),
        });
      });
    });
  }
}
