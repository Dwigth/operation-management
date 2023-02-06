import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TeamWithMembers, UserListDto } from '@operation-management/common';
import { TeamsService } from './teams.service';

@Component({
  selector: 'operation-management-team-details',
  template: `
    <div class="card">
      <div class="card-body">
        <form (ngSubmit)="onSubmit()" [formGroup]="teamForm" *ngIf="team">
          <h3 class="card-title">Team details</h3>
          <div class="row row-cards">
            <div class="col-md-6">
              <label class="form-label">Team name</label>
              <input
                formControlName="teamName"
                class="form-control"
                type="text"
              />
            </div>
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
                      <a class="card-btn cursor-pointer"> Remove from team </a>
                    </div>
                  </div>
                </div>
                <div class="col-md-6 col-lg-3">
                  <div class="card">
                    <div class="card-body p-4 text-center">
                      <operation-management-find-user
                        (client)="addMember($event)"
                      ></operation-management-find-user>
                    </div>
                    <div class="d-flex">
                      <a class="card-btn cursor-pointer"> Add member </a>
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
  protected id: number;
  protected team: TeamWithMembers;
  protected teamForm = new FormGroup({
    teamName: new FormControl(''),
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

  addMember(member: UserListDto | null) {
    if (member != null) {
      this.team.members.push(member);
    }
  }

  onSubmit() {
    this.teamService
      .updateTeam({
        id: this.id,
        teamName: <string>this.teamForm.value.teamName,
      })
      .subscribe((result) => {
        alert(result.message);
      });
  }

  deleteTeam() {
    if (confirm('Are you sure you want to delete this team?')) {
      this.teamService.deleteTeam(this.id).subscribe((result) => {
        alert(result.message);
        this.router.navigate(['/dashboard/teams']);
      });
    }
  }
}
