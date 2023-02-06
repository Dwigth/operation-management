import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AccountRetrieveDto } from '@operation-management/common';
import { formatUrl, setTravelHeaders } from '../../../auth/http';

@Injectable({ providedIn: 'root' })
export class AccountsService {
    constructor(private http: HttpClient) {}

    getAccounts() {
        return this.http.get<AccountRetrieveDto[]>(
          formatUrl({ version: 1, path: 'accounts/list' }),
          {
            ...setTravelHeaders(),
          }
        );
      }
    
      getAccount(accountId:number) {
        return this.http.get<AccountRetrieveDto>(
          formatUrl({ version: 1, path: 'accounts' }),
          {
            params: {
              accountId
            },
            ...setTravelHeaders(),
          }
        );
      }

      search(searchTerms: string) {
        return this.http.post<AccountRetrieveDto[]>(
          formatUrl({ version: 1, path: 'accounts/search' }),
          {
            searchTerms
          },
          {
            ...setTravelHeaders(),
          }
        );
      }
}
