import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { UserListDto } from '@operation-management/common';
import { formatUrl, setTravelHeaders } from '../../../auth/http';

@Injectable({
    providedIn: 'root'
})
export class UserService {
constructor(private http: HttpClient) {}

search(searchTerms: string) {
    return this.http.post<UserListDto[]>(
      formatUrl({ version: 1, path: 'users/search' }),
      {
        searchTerms
      },
      {
        ...setTravelHeaders(),
      }
    );
  }
}