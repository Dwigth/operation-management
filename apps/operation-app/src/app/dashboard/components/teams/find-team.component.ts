import { Component, EventEmitter, OnDestroy, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { TeamListDto } from '@operation-management/common';
import { Subscription } from 'rxjs';
import { TeamsService } from './teams.service';
/**
 * @see https://attacomsian.com/blog/javascript-detect-team-stops-typing
 */
@Component({
  selector: 'operation-management-find-team',
  styles: ['.list-group-item { cursor: pointer }'],
  template: `
    <div class="mb-3">
      <div class="input-icon mb-3">
        <input
          [formControl]="teamSearch"
          (keyup)="searchMechanism()"
          type="text"
          class="form-control"
        />
        <span *ngIf="isLoading" class="input-icon-addon">
          <div
            class="spinner-border spinner-border-sm text-muted"
            role="status"
          ></div>
        </span>
        <ul *ngIf="searchedTeams.length > 0" class="list-group ">
          <li
            (click)="selectTeam(team)"
            *ngFor="let team of searchedTeams"
            class="list-group-item"
          >
            {{ team.teamName }}
          </li>
        </ul>
      </div>
    </div>
  `,
})
export class FindTeamComponent implements OnDestroy {
  private timer: any;
  private waitTime = 500;
  protected isLoading = false;
  protected teamSearch = new FormControl('');
  protected searchedTeams: TeamListDto[] = [];
  protected isWriting = false;
  protected stopWritingTimeout: any;
  protected selectedTeam: TeamListDto;
  protected teamSearchSubscription: Subscription;

  @Output() team = new EventEmitter<TeamListDto | null>();

  constructor(private teamService: TeamsService) {}

  ngOnDestroy(): void {
    if (this.teamSearchSubscription)
      this.teamSearchSubscription.unsubscribe();
  }

  selectTeam(team: TeamListDto): void {
    this.selectedTeam = team;
    this.teamSearch.setValue(this.selectedTeam.teamName);
    this.searchedTeams = [];
    this.team.emit(team);
  }

  searchMechanism(): void {
    clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      this.search();
    }, this.waitTime);
  }

  search(): void {
    this.searchedTeams = [];
    if (this.teamSearch.value === '') return;
    this.isLoading = true;
    this.teamSearchSubscription = this.teamService
      .search(<string>this.teamSearch.value)
      .subscribe((teams) => {
        this.isLoading = false;
        this.searchedTeams = teams;
      });
  }
}
