import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MovementLogResult } from '@operation-management/common';
import { MovementLogsService } from './movement-logs.service';

@Component({
  selector: 'operation-management-movement-log-form',
  template: `
    <form (submit)="onSubmit()" [formGroup]="queryLogsForm">
      <div class="subheader mb-2">Team Name</div>
      <div class="mb-3">
        <operation-management-find-team
          (team)="this.queryLogsForm.get('teamId')?.setValue($event?.id)"
        ></operation-management-find-team>
      </div>
      <div class="subheader mb-2">User Name</div>
      <div class="mb-3">
        <input formControlName="memberName" class="form-control" type="text" />
      </div>
      <div class="subheader mb-2">Dates</div>
      <div class="mb-3">
        <div class="input-icon">
          <div class="subheader mb-1">Start Date</div>
          <span class="input-icon-addon"
            ><!-- Download SVG icon from http://tabler-icons.io/i/calendar -->
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="icon"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              stroke-width="2"
              stroke="currentColor"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
              <path
                d="M4 5m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"
              ></path>
              <path d="M16 3l0 4"></path>
              <path d="M8 3l0 4"></path>
              <path d="M4 11l16 0"></path>
              <path d="M11 15l1 0"></path>
              <path d="M12 15l0 3"></path>
            </svg>
          </span>
          <input
            class="form-control"
            placeholder="Select a date"
            formControlName="startDate"
            id="datepicker-start-date"
            value=""
            spellcheck="false"
            data-ms-editor="true"
            type="date"
          />
        </div>
      </div>
      <div class="mb-3">
        <div class="input-icon">
          <div class="subheader mb-1">Finish Date</div>
          <span class="input-icon-addon"
            ><!-- Download SVG icon from http://tabler-icons.io/i/calendar -->
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="icon"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              stroke-width="2"
              stroke="currentColor"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
              <path
                d="M4 5m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"
              ></path>
              <path d="M16 3l0 4"></path>
              <path d="M8 3l0 4"></path>
              <path d="M4 11l16 0"></path>
              <path d="M11 15l1 0"></path>
              <path d="M12 15l0 3"></path>
            </svg>
          </span>
          <input
            class="form-control"
            placeholder="Select a date"
            formControlName="finishDate"
            id="datepicker-start-date"
            value=""
            spellcheck="false"
            data-ms-editor="true"
            type="date"
          />
        </div>
      </div>

      <div class="mt-5">
        <button class="btn btn-primary w-100">Search</button>
        <a (click)="queryLogsForm.reset()" class="btn btn-link w-100"> Reset </a>
      </div>
    </form>
  `,
})
export class MovementLogFormComponent {
  @Output() movementResult = new EventEmitter<MovementLogResult[]>();

  queryLogsForm = new FormGroup({
    memberName: new FormControl(),
    startDate: new FormControl(),
    finishDate: new FormControl(),
    teamId: new FormControl(),
  });
  constructor(private movementLogsService: MovementLogsService) {}

  onSubmit() {
    const { finishDate, memberName, startDate, teamId } =
      this.queryLogsForm.value;
    const query = {
      member: {
        finishDate,
        memberName,
        startDate,
      },
      teamId,
    };
    this.movementLogsService
      .searchLogs({
        ...query,
      })
      .subscribe((result) => {
        this.movementResult.emit(result);
        this.queryLogsForm.reset();
      });
  }
}
