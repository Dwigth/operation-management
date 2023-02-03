import { AfterViewInit, Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import {
  UpdateUserProfileInfo,
  UserRetrieveDto,
} from '@operation-management/common';
import { DashboardService } from '../dashboard.service';

@Component({
  selector: 'operation-management-profile-form',
  template: `
    <form (submit)="onSubmit()" [formGroup]="profileForm">
      <div class="card-body">
        <h2 class="mb-4">Personal Data</h2>

        <h3 class="card-title mt-4">Profile</h3>
        <div class="row g-3">
          <div class="col-md">
            <div class="form-label">User Name</div>
            <input
              formControlName="name"
              type="text"
              class="form-control"
              value=""
              spellcheck="false"
              data-ms-editor="true"
            />
          </div>
          <div class="col-md">
            <div class="form-label">English Level</div>
            <select
              formControlName="englishLevel"
              class="form-control"
              name=""
              id=""
            >
              <option value="A1">A1</option>
              <option value="A2">A2</option>
              <option value="B1">B1</option>
              <option value="B2">B2</option>
              <option value="C1">C1</option>
              <option value="C2">C2</option>
            </select>
          </div>
          <div class="col-md">
            <div class="form-label">CV Link</div>
            <input
              type="text"
              class="form-control"
              formControlName="cvLink"
              spellcheck="false"
              data-ms-editor="true"
            />
          </div>
        </div>
        <h3 class="card-title mt-4">Technical Knowledge</h3>
        <div class="row">
          <div class="col-lg">
            <textarea
              formControlName="technicalKnowledge"
              class="form-control"
              rows="6"
            >
            </textarea>
          </div>
        </div>
        <h3 class="card-title mt-4">Email</h3>
        <p class="card-subtitle">
          This contact will be shown to others publicly, so choose it carefully.
        </p>
        <div>
          <div class="row g-2">
            <div class="col-auto">
              <input
                type="text"
                class="form-control w-auto"
                formControlName="email"
                spellcheck="false"
                data-ms-editor="true"
              />
            </div>
            <div class="col-auto"><a class="btn"> Change </a></div>
          </div>
        </div>
        <h3 class="card-title mt-4">Security</h3>
        <p class="card-subtitle">
          You can set a permanent password if you don't want to use temporary
          login codes.
        </p>
        <div>
          <a
            *ngIf="changePassword === false"
            (click)="changePassword = !changePassword"
            class="btn"
          >
            Set new password
          </a>
        </div>
        <operation-management-password
          *ngIf="changePassword"
          (PASSWORD_VALUE)="setPassword($event)"
        ></operation-management-password>
      </div>
      <div class="card-footer bg-transparent mt-auto">
        <div *ngIf="profileForm.dirty" class="btn-list justify-content-end">
          <a (click)="cancel()" class="btn"> Cancel </a>
          <button type="submit" class="btn btn-primary">Submit</button>
        </div>
      </div>
    </form>
  `,
})
export class MyProfileFormComponent implements AfterViewInit {
  protected changePassword = false;
  private userProfileData: UserRetrieveDto;

  protected profileForm = new FormGroup({
    name: new FormControl(''),
    englishLevel: new FormControl(''),
    cvLink: new FormControl(''),
    technicalKnowledge: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
  });
  constructor(private dashboardService: DashboardService) {}

  setPassword(newPass: string) {
    this.profileForm.controls.password.setValue(newPass);
    this.profileForm.markAsDirty();
  }

  populateForm(data: UserRetrieveDto) {
    this.profileForm = new FormGroup({
      name: new FormControl(data.name),
      englishLevel: new FormControl(data.englishLevel),
      cvLink: new FormControl(data.cvLink),
      technicalKnowledge: new FormControl(data.technicalKnowledge),
      email: new FormControl(data.email),
      password: new FormControl(data.password),
    });
  }

  ngAfterViewInit(): void {
    this.dashboardService.getProfile().subscribe((data) => {
      this.userProfileData = data;
      this.populateForm(data);
    });
  }

  onSubmit() {
    console.log('submit');
    this.dashboardService
      .updateProfile(this.profileForm.value as UpdateUserProfileInfo)
      .subscribe((data) => this.populateForm(data));
  }

  cancel() {
    this.profileForm.reset(this.userProfileData);
    this.changePassword = false;
  }
}
