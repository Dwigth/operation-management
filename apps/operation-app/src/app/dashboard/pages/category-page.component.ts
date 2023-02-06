import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DashboardService } from '../dashboard.service';
declare const L: any;

@Component({
  selector: 'operation-management-map-card',
  styles: ['.map { width: 100%;  height: 500px; }'],
  template: `
    <div *ngFor="let travel of travels">
      <div class="card">
        <div class="card-header">
          <div class="map" [id]="'map' + travel.id"></div>
        </div>
        <div class="card-body">
          <p class="text-muted">
            {{ travel.description }}
          </p>
        </div>
      </div>
      <br />
    </div>
  `,
})
export class CategoryPageComponent  {
  protected id: number;
  private sub: any;
  private travelSub: any;
  protected travels: any[];

  constructor(
    private route: ActivatedRoute,
    private dashboardService: DashboardService
  ) {}

}
