import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { formatUrl } from './http';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(data: any) {
    return this.http.post<{ accessToken: string; renderOptions: boolean; }>(
      formatUrl({ version: 1, path: 'auth/login' }),
      data
    );
  }
}
