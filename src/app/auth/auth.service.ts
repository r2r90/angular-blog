import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {catchError, tap, throwError} from 'rxjs';
import {ITokenResponse} from './auth.interface';
import {CookieService} from 'ngx-cookie-service';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseApiUrl = 'https://icherniakov.ru/yt-course/auth/';
  http = inject(HttpClient);
  router: Router = inject(Router);
  cookieService: CookieService = inject(CookieService);
  access_token: string | null = null
  refresh_token: string | null = null

  get IsAuth(): boolean {
    if (!this.access_token) {
      this.access_token = this.cookieService.get('access_token');
      this.refresh_token = this.cookieService.get('refresh_token');
    }
    return !!this.access_token;
  }

  login(payload: { username: string, password: string }) {
    const formData = new FormData();

    formData.append('username', payload.username);
    formData.append('password', payload.password);


    return this.http.post<ITokenResponse>(`${this.baseApiUrl}token`, formData).pipe(
      tap(res => this.saveTokens(res))
    )
  }

  refreshAuthToken() {
    return this.http.post<ITokenResponse>(
      `${this.baseApiUrl}refresh`,
      {
        refresh_token: this.refresh_token
      }
    ).pipe(
      tap(res => this.saveTokens(res)),
      catchError(err => {
        this.logout()
        return throwError(err);
      })
    )
  }

  logout() {
    this.cookieService.deleteAll()
    this.access_token = null;
    this.refresh_token = null;
    this.router.navigate(['/login']);
  }

  saveTokens(res: ITokenResponse) {
    this.access_token = res.access_token;
    this.refresh_token = res.refresh_token;

    this.cookieService.set('access_token', this.access_token);
    this.cookieService.set('refresh_token', this.refresh_token)
  }
}
