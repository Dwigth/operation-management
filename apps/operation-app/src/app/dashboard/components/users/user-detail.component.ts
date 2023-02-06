import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UserService } from './user.service';

@Component({
  selector: 'operation-management-user-detail',
  template: `
    <div class="card">
      <div class="card-body">
        <div class="card-title">User details</div>
        <form [formGroup]="userDetailsFormGroup">
          <div class="mb-3">
            <label class="form-label">User</label>
            <input
              type="text"
              class="form-control"
              formControlName="name"
              readonly
            />
          </div>
          <div class="mb-3">
            <label class="form-label">Email</label>
            <input
              type="text"
              class="form-control"
              formControlName="email"
              readonly
            />
          </div>
          <div class="mb-3">
            <label class="form-label">English Level</label>
            <input
              type="text"
              class="form-control"
              formControlName="englishLevel"
              readonly
            />
          </div>
          <div class="mb-3">
            <label class="form-label">Technical Knowledge</label>
            <textarea
              class="form-control"
              formControlName="technicalKnowledge"
              readonly
            ></textarea>
          </div>
          <div class="mb-3">
            <label class="form-label">CV Link</label>
            <input
              type="text"
              class="form-control"
              formControlName="cvLink"
              readonly
            />
          </div>
        </form>
      </div>
    </div>
  `,
})
export class UserDetailComponent {
  userDetailsFormGroup = new FormGroup({
    name: new FormControl(),
    email: new FormControl(),
    englishLevel: new FormControl(),
    technicalKnowledge: new FormControl(),
    cvLink: new FormControl(),
  });
  constructor(
    private router: ActivatedRoute,
    private userService: UserService
  ) {
    this.router.params.subscribe((param) => {
      this.userService.getUser(param['id']).subscribe((data) => {
        const { name, email, englishLevel, cvLink, technicalKnowledge } = data;
        this.userDetailsFormGroup = new FormGroup({
          name: new FormControl(name),
          email: new FormControl(email),
          englishLevel: new FormControl(englishLevel),
          technicalKnowledge: new FormControl(technicalKnowledge),
          cvLink: new FormControl(cvLink),
        });
      });
    });
  }
}
