import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { formatUrl, setTravelHeaders } from '../auth/http';

@Injectable({providedIn: 'root'})
export class DashboardService {
    constructor(private http: HttpClient) { }

    getCategories() {
        return this.http.get<any[]>(
            formatUrl({
                path: 'categories',
                version: 1,
            }),
            {
                ...setTravelHeaders()
            }
        )
    }

    getTravels(categoryId: number) {
        return this.http.get<any[]>(
            formatUrl({
                path: 'travels',
                version: 1,
            }),
            {
                ...setTravelHeaders(),
                params: {
                    categoryId
                }
            }
        )
    }
    
}