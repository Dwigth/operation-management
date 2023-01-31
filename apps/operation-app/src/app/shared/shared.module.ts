import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { PasswordComponent } from './components/password.component';


@NgModule({
    imports: [CommonModule, ReactiveFormsModule],
    exports: [PasswordComponent],
    declarations: [PasswordComponent],
    providers: [],
})
export class SharedModule { }
