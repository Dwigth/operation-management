import { Component, Input } from '@angular/core';
import { MovementLogResult } from '@operation-management/common';

@Component({
  selector: 'operation-management-movement-logs-list',
  template: `
    <div class="row row-cards">
      <div *ngFor="let resultItem of results" class="col-sm-6 col-lg-4">
        <div class="card card-sm">
          <div class="card-body">
            <div class="d-flex align-items-center">
              <div>
                <div *ngIf="resultItem.userTeamChangesLogsFrom.length > 0">
                  <span class="badge bg-red-lt">
                    {{
                      resultItem.userTeamChangesLogsFrom[0]?.fromTeam?.team
                        ?.teamName || 'NINGUNO'
                    }}
                  </span>
                  =>
                  <span class="badge bg-green-lt">
                    {{
                      resultItem.userTeamChangesLogsFrom[0]?.toTeam?.team
                        ?.teamName || 'NINGUNO'
                    }}
                  </span>
                  <br />
                  <div class="text-muted">
                    {{ resultItem.userTeamChangesLogsFrom[0].log }}
                  </div>
                </div>
                <hr />
                <div *ngIf="resultItem.userTeamChangesLogsTo.length > 0">
                  <span class="badge bg-red-lt">
                    {{
                      resultItem.userTeamChangesLogsTo[0]?.fromTeam?.team
                        ?.teamName || 'NINGUNO'
                    }}
                  </span>
                  =>
                  <span class="badge bg-green-lt">
                    {{
                      resultItem.userTeamChangesLogsTo[0]?.toTeam?.team
                        ?.teamName || 'NINGUNO'
                    }}
                  </span>
                  <br />
                  <div class="text-muted">
                    {{ resultItem.userTeamChangesLogsTo[0].log }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class MovementLogsListComponent {
  @Input() results: MovementLogResult[];
}
