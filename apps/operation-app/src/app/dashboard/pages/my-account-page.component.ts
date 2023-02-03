import { Component } from '@angular/core';

@Component({
  selector: 'operation-management-my-account-page',
  template: `
    <div class="card">
      <div class="row g-0">
        <div class="col-3 d-none d-md-block border-end">
          <div class="card-body">
            <h4 class="subheader">Account settings</h4>
            <div class="list-group list-group-transparent">
              <a
                href="./settings.html"
                class="list-group-item list-group-item-action d-flex align-items-center active"
                >My Information</a
              >
            </div>
          </div>
        </div>
        <div class="col d-flex flex-column">
          <div class="card-body">
            <h2 class="mb-4">Personal Data</h2>

            <h3 class="card-title mt-4">Profile</h3>
            <div class="row g-3">
              <div class="col-md">
                <div class="form-label">User Name</div>
                <input
                  type="text"
                  class="form-control"
                  value="Tabler"
                  spellcheck="false"
                  data-ms-editor="true"
                />
              </div>
              <div class="col-md">
                <div class="form-label">English Level</div>
                <select class="form-control" name="" id="">
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
                  value="560afc32"
                  spellcheck="false"
                  data-ms-editor="true"
                />
              </div>
            </div>
            <h3 class="card-title mt-4">Email</h3>
            <p class="card-subtitle">
              This contact will be shown to others publicly, so choose it
              carefully.
            </p>
            <div>
              <div class="row g-2">
                <div class="col-auto">
                  <input
                    type="text"
                    class="form-control w-auto"
                    value="paweluna@howstuffworks.com"
                    spellcheck="false"
                    data-ms-editor="true"
                  />
                </div>
                <div class="col-auto"><a href="#" class="btn"> Change </a></div>
              </div>
            </div>
            <h3 class="card-title mt-4">Password</h3>
            <p class="card-subtitle">
              You can set a permanent password if you don't want to use
              temporary login codes.
            </p>
            <div>
              <a href="#" class="btn"> Set new password </a>
            </div>
          </div>
          <div class="card-footer bg-transparent mt-auto">
            <div class="btn-list justify-content-end">
              <a href="#" class="btn"> Cancel </a>
              <a href="#" class="btn btn-primary"> Submit </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class MyAccountPageComponent {}
