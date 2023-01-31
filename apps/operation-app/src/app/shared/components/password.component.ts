import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'operation-management-password',
  template: `
    <div class="mb-2">
      <label class="form-label">
        Password
        <!-- <span class="form-label-description">
                    <a >I forgot password</a>
                  </span> -->
      </label>
      <div class="input-group input-group-flat">
        <input
          [formControl]="passwordControl"
          [type]="dynamicPasswordType"
          class="form-control"
          placeholder="Your password"
          autocomplete="off"
          [ngClass]="{
            'is-valid': this.passwordControl.valid,
            'is-invalid':
              !this.passwordControl.valid && this.passwordControl.dirty
          }"
          minlength="7"
          (keyup)="emitPassword()"
        />
        <span class="input-group-text cursor-pointer" (click)="showPassword()">
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
        <div *ngIf="!this.passwordControl.valid" class="invalid-feedback">
          At least 7 characters are needed
        </div>
      </div>
    </div>
  `,
})
export class PasswordComponent {
  protected passwordControl = new FormControl('', [
    Validators.required,
    Validators.min(7),
  ]);
  protected dynamicPasswordType = 'password';
  protected revealed = false;
  private waitTime = 500;
  private timer: NodeJS.Timeout;
  @Output() PASSWORD_VALUE = new EventEmitter<string>();

  protected showPassword() {
    if (this.revealed) {
      this.dynamicPasswordType = 'password';
      this.revealed = false;
      return;
    }
    this.revealed = true;
    this.dynamicPasswordType = 'text';
  }

  protected emitPassword() {
    clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      if (this.passwordControl.valid) {
        this.PASSWORD_VALUE.emit(<string>this.passwordControl.value);
      }
    }, this.waitTime);
  }
}
