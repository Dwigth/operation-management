import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TeamListDto } from '@operation-management/common';
import { TeamsService } from './teams.service';

@Component({
  selector: 'operation-management-team-list',
  template: `
    <operation-management-teams-collection
      [teams]="teams"
    ></operation-management-teams-collection>
  `,
})
export class TeamListComponent implements OnInit {
  protected teams: TeamListDto[];
  constructor(
    private teamService: TeamsService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const accountId = params['id'];
      if (accountId) {
        this.teamService.getTeamsByAccount(accountId).subscribe((data) => {
          this.teams = data;
        });
        return;
      }
      this.teamService.getTeams().subscribe((data) => {
        this.teams = data;
      });
    });
  }
}
