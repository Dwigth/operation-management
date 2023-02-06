import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { SignupDTO, UserListDto, UserRetrieveDto } from '@operation-management/common';
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

  getUsers() {
    return this.http.get<UserListDto[]>(
      formatUrl({ version: 1, path: 'users/list' }),
      {
        ...setTravelHeaders(),
      }
    );
  }

  getUser(userId: number) {
    return this.http.get<UserRetrieveDto>(
      formatUrl({ version: 1, path: 'users' }),
      {
        ...setTravelHeaders(),
        params: {
          userId
        }
      }
    );
  }

  delete(userId: number) {
    return this.http.delete<{deleted: string; message: string;}>(
      formatUrl({ version: 1, path: 'users' }),
      {
        ...setTravelHeaders(),
        params: {
          userId
        }
      }
    )
  }

  create(data: SignupDTO) {
    return this.http.post<{created: string; email: string;}>(
      formatUrl({ version: 1, path: 'users' }),
      {
        ...data
      },
      {
        ...setTravelHeaders(),
      }
    );
  }
}