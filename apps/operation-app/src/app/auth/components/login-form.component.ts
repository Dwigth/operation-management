import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'operation-management-login-form',
  template: `
    <form [formGroup]="loginForm" (submit)="onSubmit()">
      <div class="mb-3">
        <label class="form-label">Email address</label>
        <input
          formControlName="email"
          type="email"
          class="form-control"
          placeholder="your@email.com"
          autocomplete="off"
          [ngClass]="{
            'is-valid': this.loginForm.get('email')?.valid,
            'is-invalid':
              !this.loginForm.get('email')?.valid &&
              this.loginForm.get('email')?.dirty
          }"
        />
        <div
          *ngIf="!this.loginForm.get('email')?.valid"
          class="invalid-feedback"
        >
          Invalid format
        </div>
      </div>
      <div class="mb-2">
        <label class="form-label">
          Password
          <!-- <span class="form-label-description">
                    <a >I forgot password</a>
                  </span> -->
        </label>
        <div class="input-group input-group-flat">
          <input
            formControlName="password"
            [type]="dynamicPasswordType"
            class="form-control"
            placeholder="Your password"
            autocomplete="off"
            [ngClass]="{
              'is-valid': this.loginForm.get('password')?.valid,
              'is-invalid':
                !this.loginForm.get('password')?.valid &&
                this.loginForm.get('password')?.dirty
            }"
            minlength="7"
          />
          <span
            class="input-group-text cursor-pointer"
            (click)="showPassword()"
          >
            <a
              class="link-secondary"
              data-bs-toggle="tooltip"
              aria-label="Show password"
              data-bs-original-title="Show password"
              ><!-- Download SVG icon from http://tabler-icons.io/i/eye -->
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="icon"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                stroke-width="2"
                stroke="currentColor"
                fill="none"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                <circle cx="12" cy="12" r="2"></circle>
                <path
                  d="M22 12c-2.667 4.667 -6 7 -10 7s-7.333 -2.333 -10 -7c2.667 -4.667 6 -7 10 -7s7.333 2.333 10 7"
                ></path>
              </svg>
            </a>
          </span>
          <div
            *ngIf="!this.loginForm.get('password')?.valid"
            class="invalid-feedback"
          >
            At least 7 characters are needed
          </div>
        </div>
      </div>
      <div class="form-footer">
        <button type="submit" class="btn btn-primary w-100">Sign in</button>
      </div>
    </form>
  `,
})
export class LoginFormComponent {
  protected dynamicPasswordType = 'password';
  protected revealed = false;
  protected loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.min(7)]),
  });
  @Output() LOGIN_FORM_VALUE = new EventEmitter<any>();

  protected showPassword() {
    if (this.revealed) {
      this.dynamicPasswordType = 'password';
      this.revealed = false;
      return;
    }
    this.revealed = true;
    this.dynamicPasswordType = 'text';
  }

  protected onSubmit() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      const login = {} as any;
      login.email = <string>email;
      login.password = <string>password;
      this.LOGIN_FORM_VALUE.emit(login);
    }
  }
}
