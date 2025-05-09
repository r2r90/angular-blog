import {HttpHandlerFn, HttpInterceptorFn, HttpRequest} from '@angular/common/http';
import {inject} from '@angular/core';
import {AuthService} from './auth.service';
import {BehaviorSubject, catchError, filter, switchMap, tap, throwError} from 'rxjs';

let isRefreshing$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

export const authTokenInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService)
  const accessToken = authService.access_token
  if (!accessToken) return next(req);

  if (isRefreshing$.value) {
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
  if (!isRefreshing$.value) {
    isRefreshing$.next(true);
    return authService.refreshAuthToken()
      .pipe(
        switchMap((res) => {
          isRefreshing$.next(false);
          return next(addToken(req, res.access_token))
            .pipe(
              tap(() => isRefreshing$.next(false))
            )
        })
      )
  }

  if (req.url.includes('refresh')) return next(addToken(req, authService.access_token!))


  return isRefreshing$.pipe(
    filter(isRefreshing => !isRefreshing),
    switchMap(res => {
      return next(addToken(req, authService.access_token!));
    })
  )


  // return next(addToken(req, authService.access_token!));


}


const addToken = (req: HttpRequest<any>, token: string) => {
  return req.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`
    }
  })
}
