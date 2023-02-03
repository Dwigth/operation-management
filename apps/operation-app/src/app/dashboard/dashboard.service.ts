import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UpdateUserProfileInfo, UserRetrieveDto } from '@operation-management/common';
import { formatUrl, setTravelHeaders } from '../auth/http';

@Injectable({ providedIn: 'root' })
export class DashboardService {
  constructor(private http: HttpClient) {}

  getProfile() {
    return this.http.get<UserRetrieveDto>(formatUrl({ version: 1, path: 'profile/my-data' }), {
      ...setTravelHeaders(),
    });
  }

  updateProfile(updateUser: UpdateUserProfileInfo) {
    return this.http.put<UserRetrieveDto>(formatUrl({ version: 1, path: 'profile/my-data' }), {...updateUser},{
        ...setTravelHeaders(),
      });
  }
}
