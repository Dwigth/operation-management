import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HttpClientModule} from '@angular/common/http';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './pages/login.component';
import { SignupComponent } from './pages/signup.component';
import { LoginFormComponent } from './components/login-form.component';
import { SignupFormComponent } from './components/signup-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { AuthService } from './auth.service';


@NgModule({
  declarations: [
    LoginComponent,
    SignupComponent,
    LoginFormComponent,
    SignupFormComponent,
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    HttpClientModule,
  ],
  providers: [AuthService]
})
export class AuthModule { }
