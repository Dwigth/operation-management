import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'operation-management-signup-form',
  template: `
    <form class="card card-md" [formGroup]="signupForm" (submit)="onSubmit()">
      <div class="card-body">
        <h2 class="card-title text-center mb-4">Create new account</h2>
        <div class="mb-3">
          <label class="form-label">Name</label>
          <input
            type="text"
            class="form-control"
            placeholder="Enter name"
            spellcheck="false"
            data-ms-editor="true"
            formControlName="name"
            [ngClass]="{
              'is-valid': this.signupForm.get('name')?.valid,
              'is-invalid':
                !this.signupForm.get('name')?.valid &&
                this.signupForm.get('name')?.dirty
            }"
            minlength="2"
          />
          <div
            *ngIf="!this.signupForm.get('name')?.valid"
            class="invalid-feedback"
          >
            Please enter a valid name
          </div>
        </div>
        <div class="mb-3">
          <label class="form-label">Email address</label>
          <input
            formControlName="email"
            type="email"
            class="form-control"
            placeholder="Enter email"
            [ngClass]="{
              'is-valid': this.signupForm.get('email')?.valid,
              'is-invalid':
                !this.signupForm.get('email')?.valid &&
                this.signupForm.get('email')?.dirty
            }"
          />
          <div
            *ngIf="!this.signupForm.get('email')?.valid"
            class="invalid-feedback"
          >
            Invalid format
          </div>
        </div>
        <operation-management-password
          (PASSWORD_VALUE)="this.password = $event"
        ></operation-management-password>

        <div class="form-footer">
          <button type="submit" class="btn btn-primary w-100">
            Create new account
          </button>
        </div>
      </div>
    </form>
  `,
})
export class SignupFormComponent {
  protected signupForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.min(2)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.min(7)]),
  });

  @Output() SIGNUP_FORM_VALUE = new EventEmitter<any>();

  protected onSubmit() {
    if(this.signupForm.valid){ 
        const {name, email, password } = this.signupForm.value;
        const signup = {} as any;
        signup.email = <string>email;
        signup.name = <string>name;
        signup.password = <string>password;
        this.SIGNUP_FORM_VALUE.emit(signup)
    }
  }

  protected set password(pass: string) {
    this.signupForm.get('password')?.setValue(pass);
  }
}
