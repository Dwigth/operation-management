import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CanActivateDashboard } from './dashboard.guard';
import { DashboardMainComponent } from './dashboard.component';
import { CategoryPageComponent } from './pages/category-page.component';

const routes: Routes = [
    {
        path: '',
        component: DashboardMainComponent,
        canActivate: [CanActivateDashboard],
        children:[
          {
            path: 'category/:id',
            component: CategoryPageComponent,
          }
        ]
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers:[CanActivateDashboard]
})
export class DashboardRoutingModule { }
