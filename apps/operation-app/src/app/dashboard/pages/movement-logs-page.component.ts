import { AfterViewInit, Component } from '@angular/core';
import { MovementLogResult } from '@operation-management/common';
import { createLitepicker } from '../components/movement-logs/litepicker';

@Component({
  selector: 'operation-management-movement-log',
  template: `
    <div class="page-header d-print-none">
      <div class="container-xl">
        <div class="row g-2 align-items-center">
          <div class="col">
            <h2 class="page-title">Movement logs filters</h2>
          </div>
        </div>
      </div>
    </div>
    <!--  -->
    <div class="page-body">
      <div class="container-xl">
        <div class="row g-4">
          <div class="col-3">
            <operation-management-movement-log-form (movementResult)="this.results = $event"></operation-management-movement-log-form>
          </div>
          <div class="col-9">
            
              <operation-management-movement-logs-list [results]="results"></operation-management-movement-logs-list>
            
          </div>
        </div>
      </div>
    </div>
  `,
})
export class MovementLogsPageComponent implements AfterViewInit {
  results: MovementLogResult[]
  ngAfterViewInit(): void {
    createLitepicker('datepicker-start-date');
    createLitepicker('datepicker-finish-date');
  }
}
