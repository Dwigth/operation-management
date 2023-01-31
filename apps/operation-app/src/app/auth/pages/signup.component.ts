import { Component } from "@angular/core";

@Component({
    selector: 'operation-management-signup',
    template: `
    <div class="page page-center">
      <div class="container container-tight py-4">
        <div class="text-center mb-4">
          <a href="." class="navbar-brand navbar-brand-autodark"><img src="./static/logo.svg" height="36" alt=""></a>
        </div>
        <operation-management-signup-form (SIGNUP_FORM_VALUE)="signup = $event"></operation-management-signup-form>
        <div class="text-center text-muted mt-3">
          Already have account? <a routerLink="/auth/login" tabindex="-1">Sign in</a>
        </div>
      </div>
    </div>
    `,
})
export class SignupComponent {
  
  public set signup(dto : any) {
    console.log(dto);
  }
  
}