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
export class CategoryPageComponent implements OnInit, OnDestroy {
  protected id: number;
  private sub: any;
  private travelSub: any;
  protected travels: any[];

  constructor(
    private route: ActivatedRoute,
    private dashboardService: DashboardService
  ) {}

  ngOnInit() {
    this.sub = this.route.params.subscribe((params) => {
      this.id = +params['id'];
      this.travelSub = this.dashboardService
        .getTravels(this.id)
        .subscribe((data) => {
          this.travels = data;
          setTimeout(() => {
            this.travels.forEach(({latitude,id,longitude}: any) => {
                
              const map = L.map('map' + id).setView(
                [latitude, longitude],
                5
              );
              L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
                maxZoom: 19,
                attribution:
                  '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
              }).addTo(map);

              L.marker([latitude, longitude]).addTo(map);

            }, 1000);
          });
        });
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
    this.travelSub.unsubscribe();
  }
}
