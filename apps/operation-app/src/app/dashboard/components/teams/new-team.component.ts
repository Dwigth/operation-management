import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {
  AccountRetrieve,
  LocalMember,
  TeamMember,
} from '@operation-management/common';
import { TeamsService } from './teams.service';

@Component({
  selector: 'operation-management-create-user',
  template: `
    <div class="card">
      <div class="card-body">
        <div class="card-title">Create Team</div>
        <form [formGroup]="createTeamFormGroup">
          <div class="mb-3">
            <label class="form-label">Team Name</label>
            <input
              type="text"
              class="form-control"
              formControlName="teamName"
            />
          </div>
          <div class="mb-3">
            <label class="form-label">Account</label>
            <operation-management-find-account
              (account)="addLocalAccount($event)"
            ></operation-management-find-account>
            <br />
          </div>
          <div class="mb-3">
            <label class="form-label">Members</label>
            <operation-management-members
              (members)="manageMembers($event)"
            ></operation-management-members>
          </div>
          <button
            *ngIf="createTeamFormGroup.dirty"
            (click)="createTeam()"
            class="btn btn-md btn-primary"
          >
            Create team
          </button>
        </form>
      </div>
    </div>
  `,
})
export class CreateTeamComponent {
  constructor(private router: Router,private teamService: TeamsService) {}
  private members: TeamMember[];

  createTeamFormGroup = new FormGroup({
    teamName: new FormControl('', [Validators.minLength(1)]),
    accountId: new FormControl(0, [Validators.minLength(1)]),
  });

  protected addLocalAccount(account: AccountRetrieve | null) {
    if (account) {
      this.createTeamFormGroup
        .get('accountId')
        ?.setValue(account.id);
    }
  }

  manageMembers(members: LocalMember[]) {
    this.members = members.map((member) => {
      const {
        member: { id },
        dates: { finishDate, startDate },
      } = member;
      const teamMember: TeamMember = {
        id: id,
        finishDate: finishDate,
        startDate: startDate,
      };
      return teamMember;
    });
  }

  protected createTeam() {
    if (confirm('Are you sure you want to create this account?')) {
      const { value, valid } = this.createTeamFormGroup;
      const { teamName, accountId } = value;
      if (!valid) {
        alert('Form is not valid')
        return;
      }
        this.teamService
          .createTeam({
            teamName: <string>teamName,
            members: this.members,
            accountId: <number>accountId,
          })
          .subscribe((result) => {
            console.log(result);            
            alert('Account created!');
            this.createTeamFormGroup.reset();
            location.reload();
          });
    }
  }
}
