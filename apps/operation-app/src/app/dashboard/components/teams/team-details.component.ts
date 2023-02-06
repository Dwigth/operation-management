import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {
  AccountRetrieveDto,
  TeamWithMembers,
  UserListDto,
} from '@operation-management/common';
import { TeamsService } from './teams.service';

@Component({
  selector: 'operation-management-team-details',
  template: `
    <div class="card">
      <div class="card-body">
        <form (ngSubmit)="onSubmit()" [formGroup]="teamForm" *ngIf="team">
          <h3 class="card-title">Team details</h3>
          <hr />
          <div class="row row-cards">
            <div class="col-md-6">
              <label class="form-label">Team name</label>
              <input
                formControlName="teamName"
                class="form-control"
                type="text"
              />
            </div>
            <hr />
            <div class="col-md-8">
              <label class="form-label">Associate to account</label>
              <div *ngIf="team.team.accountTeams" class="mt-3">
                <div *ngFor="let accountTeam of team.team.accountTeams">
                  <button (click)="removeAssoc(accountTeam.account)" type="button" class="badge bg-red-lt">
                    <i class="ti ti-trash"></i>
                  </button>
                  Already associated with:
                  <a
                    routerLink="/dashboard/accounts/{{
                      accountTeam.account.id
                    }}"
                    class="badge bg-green-lt"
                  >
                    {{ accountTeam.account.accountName }}</a
                  >
                </div>
              </div>
              <hr />
              <operation-management-find-account
                (account)="addLocalAccount($event)"
              ></operation-management-find-account>
              <button (click)="assocToAccount()" type="button" *ngIf="currentAccount" class="btn">
                Associate this team with this account
              </button>
            </div>
            <hr />
            <div class="col-md-12">
              <label class="form-label">Team members</label>
              <div class="row row-cards">
                <div
                  *ngFor="let member of team.members"
                  class="col-md-6 col-lg-3"
                >
                  <div class="card">
                    <div class="card-body p-4 text-center">
                      <h3 class="m-0 mb-1">
                        <a class="cursor-pointer">{{ member.name }}</a>
                      </h3>
                      <!-- <div class="text-muted"></div> -->
                      <div class="mt-3">
                        <span class="badge bg-purple-lt">{{
                          member.email
                        }}</span>
                      </div>
                    </div>
                    <div class="d-flex">
                      <a
                        (click)="removeMember(member)"
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
                      <a
                        (click)="addMemberToTeam()"
                        class="card-btn cursor-pointer"
                      >
                        Add member
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-md-12">
              <div class="d-flex">
                <button type="submit" class="btn card-btn cursor-pointer">
                  Update
                </button>
                <a (click)="deleteTeam()" class="card-btn cursor-pointer">
                  Delete
                </a>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  `,
})
export class TeamDetailsComponent {
  protected currentMember: UserListDto | null;
  protected currentAccount: AccountRetrieveDto;
  protected id: number;
  protected team: TeamWithMembers;
  protected teamForm = new FormGroup({
    teamName: new FormControl(''),
  });

  protected memberDates = new FormGroup({
    startDate: new FormControl('', Validators.required),
    finishDate: new FormControl('', Validators.required),
  });

  constructor(
    private activatedRouter: ActivatedRoute,
    private router: Router,
    private teamService: TeamsService
  ) {
    this.activatedRouter.params.subscribe((param) => {
      this.id = param['id'];
      this.teamService.getTeamDetails(this.id).subscribe((data) => {
        this.team = data;
        const {
          team: { teamName },
        } = data;
        this.teamForm = new FormGroup({
          teamName: new FormControl(teamName),
        });
      });
    });
  }

  addLocalMember(member: UserListDto | null) {
    if (member != null) {
      this.currentMember = member;
    }
  }

  addLocalAccount(account: AccountRetrieveDto | null) {
    if (account != null) {
      this.currentAccount = account;
    }
  }

  assocToAccount() {
    if (!this.currentAccount) {
      return;
    }
    if (
      confirm(
        'Are you sure you want associate this team to the selected account?'
      )
    ) {
      const { id } = this.currentAccount;
      
      this.teamService
        .assocToAccount({
          accountId: id,
          remove: false,
          teamId: this.id,
        })
        .subscribe((result) => {
          alert(result.message);
        });
    }
  }

  removeAssoc(selectedAccount: AccountRetrieveDto) {
    if (
      confirm(
        'Are you sure you want associate this team to the selected account?'
      )
    ) {
      const { id } = selectedAccount;
      this.teamService
        .assocToAccount({
          accountId: id,
          remove: true,
          teamId: this.id,
        })
        .subscribe((result) => {
          alert(result.message);
        });
    }
  }

  addMemberToTeam() {
    if (!this.currentMember) {
      return;
    }
    if (!this.memberDates.valid) {
      alert('[Dates needs to be set]');
      return;
    }

    console.log(this.memberDates.valid, this.currentMember);

    const { finishDate, startDate } = this.memberDates.value;
    this.teamService
      .moveMember({
        member: {
          id: this.currentMember.id,
          finishDate: finishDate || '',
          startDate: startDate || '',
        },
        remove: false,
        teamId: this.id,
      })
      .subscribe(
        (data) => {
          this.memberDates.reset();
          this.team.members.push(<UserListDto>this.currentMember);
          this.currentMember = null;
          alert(data.message);
        },
        (e) => alert('Error trying to add user')
      );
  }

  onSubmit() {
    if (confirm('Are you sure you want to update this team?')) {
      this.teamService
        .updateTeam({
          id: this.id,
          teamName: <string>this.teamForm.value.teamName,
        })
        .subscribe((result) => {
          alert(result.message);
        });
    }
  }

  deleteTeam() {
    if (confirm('Are you sure you want to delete this team?')) {
      this.teamService.deleteTeam(this.id).subscribe((result) => {
        alert(result.message);
        this.router.navigate(['/dashboard/teams']);
      });
    }
  }

  removeMember(member: UserListDto) {
    if (confirm('are you sure you want to remove this user from this team?')) {
      this.teamService
        .moveMember({
          member: {
            id: member.id,
            finishDate: '',
            startDate: '',
          },
          remove: true,
          teamId: null,
        })
        .subscribe((data) => {
          alert(data.message);
        });
      const idx = this.team.members.findIndex(
        (member) => member.id === this.id
      );

      this.team.members.splice(idx - 1, 1);
    }
  }
}
