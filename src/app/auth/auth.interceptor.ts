import {HttpHandlerFn, HttpInterceptorFn, HttpRequest} from '@angular/common/http';
import {inject} from '@angular/core';
import {AuthService} from './auth.service';
import {catchError, switchMap, throwError} from 'rxjs';

let isRefeshing: boolean = false

export const authTokenInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService)
  const accessToken = authService.access_token
  if (!accessToken) return next(req);

  if (isRefeshing) {
    return refreshAndProceed(authService, req, next)
  }

  return next(addToken(req, accessToken))
    .pipe(
      catchError((err) => {
        if (err.status === 403) {
          return refreshAndProceed(authService, req, next)
        }

        return throwError(err);
      })
    )
}

const refreshAndProceed = (authService: AuthService, req: HttpRequest<any>, next: HttpHandlerFn) => {
  if (!isRefeshing) {
    isRefeshing = true;
    return authService.refreshAuthToken()
      .pipe(
        switchMap((res) => {
          isRefeshing = false;
          return next(addToken(req, res.access_token ));
        })
      )
  }

  return next(addToken(req, authService.access_token!));

}


const addToken = (req: HttpRequest<any>, token: string) => {
  return req.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`
    }
  })
}
