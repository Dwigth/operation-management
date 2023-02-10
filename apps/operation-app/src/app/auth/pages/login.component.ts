import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'operation-management-login',
  template: `
    <div class="page page-center">
      <div class="container container-tight py-4">
        <div class="text-center mb-4">
          <a href="." class="navbar-brand navbar-brand-autodark"
            ><img src="./static/logo.svg" height="36" alt=""
          /></a>
        </div>
        <div class="card card-md">
          <div class="card-body">
            <h2 class="h2 text-center mb-4">Login to your account</h2>
            <operation-management-login-form
              (LOGIN_FORM_VALUE)="getLoginFormValues($event)"
            ></operation-management-login-form>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class LoginComponent {
  constructor(private authService: AuthService, private router: Router) {}

  protected getLoginFormValues(dto: any) {
    // call service to API
    console.log(dto);
    this.authService
      .login(dto)
      .subscribe({
        next: (data) => {
          if (data.accessToken) {
            localStorage.setItem('access', data.accessToken);
            localStorage.setItem('shouldRender', JSON.stringify(data.renderOptions));
            this.router.navigateByUrl('dashboard');
          }
        },
        error: (e) => {
          alert(e.error.message);
        }
      });
  }
}
