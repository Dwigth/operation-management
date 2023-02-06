import { Component, Input } from "@angular/core";
import { TeamListDto } from "@operation-management/common";

@Component({
    selector: 'operation-management-teams-collection',
    template: `
    <div class="row row-cards">
      <div *ngFor="let team of teams" class="col-md-6 col-lg-3">
        <div class="card">
          <div class="card-body p-4 text-center">
            <h3 class="m-0 mb-1"><a>{{team.teamName}}</a></h3>
            <!-- <div class="text-muted">{{team.clientName}}</div> -->
            <div class="mt-3">
              <!-- <span class="badge bg-purple-lt">{{team.operationManagerName}}</span> -->
            </div>
          </div>
          <div class="d-flex">
            <a [routerLink]="['/dashboard/teams/details/'+team.id]"  class="card-btn"> Details </a>
          </div>
        </div>
      </div>
    </div>
    `
})
export class TeamsCollectionComponent {
    @Input() teams: TeamListDto[];
    constructor() {
      console.log(this.teams);
      
    }
}