import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from './user.service';

@Component({
  selector: 'operation-management-create-user',
  template: `
    <div class="card">
      <div class="card-body">
        <div class="card-title">User details</div>
        <form [formGroup]="createUserFormGroup">
          <div class="mb-3">
            <label class="form-label">User</label>
            <input type="text" class="form-control" formControlName="name" />
          </div>
          <div class="mb-3">
            <label class="form-label">Email</label>
            <input type="text" class="form-control" formControlName="email" />
            <br />
            <button
              *ngIf="this.createUserFormGroup.get('name')?.valid"
              (click)="createEmail()"
              class="btn btn-md"
            >
              Suggest email
            </button>
          </div>
          <div class="mb-3">
            <select formControlName="userRole" class="form-control">
              <option value="2">Admin</option>
              <option value="3">Usuario Regular</option>
            </select>
          </div>
          <div class="mb-3">
            <operation-management-password
              (PASSWORD_VALUE)="setPassword($event)"
            ></operation-management-password>
          </div>
          <button
            *ngIf="createUserFormGroup.dirty"
            (click)="createUser()"
            class="btn btn-md btn-primary"
          >
            Create user
          </button>
        </form>
      </div>
    </div>
  `,
})
export class CreateUserComponent {
  createUserFormGroup = new FormGroup({
    name: new FormControl('', [Validators.minLength(1)]),
    email: new FormControl('', [Validators.email]),
    password: new FormControl(),
    userRole: new FormControl()
  });

  constructor(private userService: UserService) {}

  setPassword(pass: string) {
    this.createUserFormGroup.get('password')?.setValue(pass);
    this.createUserFormGroup.markAsDirty();
  }

  createEmail() {
    const name = <string>this.createUserFormGroup.get('name')?.value;
    if(name.length <= 0) {
        alert('Write the name of the user first')
        return;
    }
    const prefix = name
      .split(' ')
      .reduce(
        (prev, current) => `${prev.toLowerCase()}.${current.toLowerCase()}`
      );
    const email = `${prefix}@arkusnexus.com`;
    this.createUserFormGroup.get('email')?.setValue(email);
  }

  createUser() {
    if (confirm('Are you sure you want to save this user?')) {
      const { email, name, password, userRole } = this.createUserFormGroup.value;
      this.userService
        .create({
          email: <string>email,
          name: <string>name,
          password: <string>password,
          roleId: <number>userRole,
        })
        .subscribe((result) => {
          alert(`User created with email: ${result.email}`);
          this.createUserFormGroup.reset()
        });
    }
  }
}
