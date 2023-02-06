import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  CreateTeamDto,
  TeamListDto,
  TeamWithMembers,
  UpdateTeamDto,
} from '@operation-management/common';
import { formatUrl, setTravelHeaders } from '../../../auth/http';

@Injectable({
  providedIn: 'root',
})
export class TeamsService {
  constructor(private http: HttpClient) {}

  createTeam(data: CreateTeamDto) {
    return this.http.post<{created: Date}>(
      formatUrl({ version: 1, path: 'teams/list' }),
      {
        ...data
      },
      {
        ...setTravelHeaders(),
      }
    )
  }

  getTeams() {
    return this.http.get<TeamListDto[]>(
      formatUrl({ version: 1, path: 'teams/list' }),
      {
        ...setTravelHeaders(),
      }
    );
  }

  getTeamsByAccount(accountId: number) {
    return this.http.get<TeamListDto[]>(
      formatUrl({ version: 1, path: 'teams/account' }),
      {
        params: {
          accountId,
        },
        ...setTravelHeaders(),
      }
    );
  }

  getTeamDetails(teamId: number) {
    return this.http.get<TeamWithMembers>(
      formatUrl({ version: 1, path: 'teams' }),
      {
        params: {
          teamId,
        },
        ...setTravelHeaders(),
      }
    );
  }

  updateTeam(data: UpdateTeamDto) {
    return this.http.put<{updated: Date, message: string}>(
      formatUrl({ version: 1, path: 'teams' }),
      {
        ...data,
      },
      {
        ...setTravelHeaders(),
      }
    );
  }

  deleteTeam(teamId: number) {
    return this.http.delete<{deleted: Date, message: string}>(
      formatUrl({ version: 1, path: 'teams' }),
      {
        params: {
          teamId
        },
        ...setTravelHeaders(),
      }
    );
  }
}
