import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'operation-management-dashboard-main',
    template: `
        <div class="page">
            <operation-management-aside-menu></operation-management-aside-menu>
            <div class="page-wrapper">
                <div class="page-body">
                    <div class="container-xl">
                        <router-outlet></router-outlet>
                    </div>
                </div>
            </div>
        </div>
    `
})

export class DashboardMainComponent implements OnInit {
    constructor() {
        //
     }

    ngOnInit() {
        // 
        console.log('Init dashboard');
     }
}