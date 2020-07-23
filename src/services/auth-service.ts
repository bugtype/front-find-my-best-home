// TODO: 파일 분리해야함.

import { from, Observable, of } from 'rxjs';
import { httpClient } from '@libs';
import { map, catchError } from 'rxjs/operators';
import { User } from '@models';
import { decodeJwt } from '@libs';
import { apiResponseToData } from '@utils';

export const authService = {
  login(params: { username: string; password: string }): Observable<string> {
    return from(httpClient.post('/auth/login', params)).pipe(
      map(apiResponseToData),
      map((data) => data.access_token)
    );
  },
  getUserSelf(): Observable<User | undefined> {
    return of(sessionStorage.getItem('token') || '{}').pipe(
      map((data) => decodeJwt<User>(data)),
      catchError((_) => of(undefined))
    );
  },
  logout() {
    return of(sessionStorage.removeItem('token'));
  },
};
