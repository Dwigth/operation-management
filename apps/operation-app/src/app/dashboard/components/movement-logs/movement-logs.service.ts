import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MovementLogQuery, MovementLogResult } from '@operation-management/common';
import { formatUrl, setTravelHeaders } from '../../../auth/http';

@Injectable({
  providedIn: 'root',
})
export class MovementLogsService {
  constructor(private http: HttpClient) {}

  searchLogs(query: MovementLogQuery) {
    return this.http.post<MovementLogResult[]>(
      formatUrl({ version: 1, path: 'movement-logs' }),
      {
        ...query,
      },
      {
        ...setTravelHeaders(),
      }
    );
  }
}
