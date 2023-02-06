import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AccountsService } from './accounts.service';

@Component({
  selector: 'operation-management-create-user',
  template: `
    <div class="card">
      <div class="card-body">
        <div class="card-title">User details</div>
        <form [formGroup]="createAccountFormGroup">
          <div class="mb-3">
            <label class="form-label">Account Name</label>
            <input
              type="text"
              class="form-control"
              formControlName="accountName"
            />
          </div>
          <div class="mb-3">
            <label class="form-label">Client Name</label>
            <input
              type="text"
              class="form-control"
              formControlName="clientName"
            />
            <br />
          </div>
          <div class="mb-3">
            <label class="form-label">Operation Manager Name</label>
            <input
              type="text"
              class="form-control"
              formControlName="operationalManagerName"
            />
          </div>
          <button
            *ngIf="createAccountFormGroup.dirty"
            (click)="createAccount()"
            class="btn btn-md btn-primary"
          >
            Create account
          </button>
        </form>
      </div>
    </div>
  `,
})
export class CreateAccountComponent {
  constructor(private accountService: AccountsService) {}

  createAccountFormGroup = new FormGroup({
    accountName: new FormControl('', [Validators.minLength(1)]),
    clientName: new FormControl('', [Validators.minLength(1)]),
    operationManagerName: new FormControl('', [Validators.minLength(1)]),
  });

  protected createAccount() {
    if (confirm('Are you sure you want to create this account?')) {
      const { accountName, clientName, operationManagerName } =
        this.createAccountFormGroup.value;
      this.accountService
        .create({
          accountName: <string>accountName,
          clientName: <string>clientName,
          operationManagerName: <string>operationManagerName,
        })
        .subscribe((result) => {
          alert('Account created!');
          this.createAccountFormGroup.reset();
        });
    }
  }
}
