import { Component, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LocalMember, UserListDto } from '@operation-management/common';


@Component({
  selector: 'operation-management-members',
  template: `
    <label class="form-label">Team members</label>
    <div class="row row-cards">
      <div *ngFor="let member of localMembers" class="col-md-6 col-lg-3">
        <div class="card">
          <div class="card-body p-4 text-center">
            <h3 class="m-0 mb-1">
              <a class="cursor-pointer">{{ member.member.name }}</a>
            </h3>
            <!-- <div class="text-muted"></div> -->
            <div class="mt-3">
              <span class="badge bg-purple-lt">{{ member.member.email }}</span>
            </div>
          </div>
          <div class="d-flex">
            <a
              (click)="removeMember(member.member)"
              class="card-btn cursor-pointer"
            >
              Remove from team
            </a>
          </div>
        </div>
      </div>
      <div class="col-md-6 col-lg-3">
        <div class="card">
          <div class="card-body p-4 text-center">
            <operation-management-find-user
              (client)="addLocalMember($event)"
            ></operation-management-find-user>
          </div>
          <form [formGroup]="memberDates">
            <div class="container">
              <label for="">Start Date</label>
              <input
                formControlName="startDate"
                class="form-control"
                type="date"
                required
              />
            </div>
            <hr />
            <div class="container">
              <label for="">Finish Date</label>
              <input
                formControlName="finishDate"
                class="form-control"
                type="date"
                required
              />
            </div>
            <br />
          </form>

          <div class="d-flex">
            <a (click)="addMember()" class="card-btn cursor-pointer">
              Add member
            </a>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class MembersComponent {
  @Output() members = new EventEmitter<LocalMember[]>();

  protected currentMember: UserListDto | null;
  protected localMembers: LocalMember[] = [];
  protected memberDates = new FormGroup({
    startDate: new FormControl('', Validators.required),
    finishDate: new FormControl('', Validators.required),
  });

  removeMember(user: UserListDto) {
    const idx = this.localMembers.findIndex(
      (member) => member.member.id === user.id
    );
    this.localMembers.splice(idx - 1, 1);
    this.members.emit(this.localMembers);
  }

  addLocalMember(user: UserListDto | null) {
    this.currentMember = user;
  }

  addMember() {
    const { finishDate, startDate } = this.memberDates.value;
    this.localMembers.push({
      member: <UserListDto>this.currentMember,
      dates: {
        finishDate: <string>finishDate,
        startDate: <string>startDate,
      },
    });
    this.members.emit(this.localMembers);
    this.currentMember = null;
    this.memberDates.reset();
  }
}
