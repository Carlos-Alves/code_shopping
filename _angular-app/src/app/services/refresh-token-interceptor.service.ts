import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent, HttpErrorResponse, HttpResponseBase } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RefreshTokenInterceptorService implements HttpInterceptor {

  constructor(private authService: AuthService, private router: Router) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next
           .handle(req)
           .pipe(
              tap((event: HttpEvent<any>) => {
                  this.setNewTokenIfResponseValid(event);
              }, (eventError: HttpEvent<any>) => {
                this.setNewTokenIfResponseValid(eventError);
                this.redirectToLoginIfUnautenticated(eventError);
              })
          );
  }

  private redirectToLoginIfUnautenticated(eventError: HttpEvent<any>) {
    if (eventError instanceof HttpErrorResponse && eventError.status == 401 ) {
      this.authService.setToken(null);
      this.router.navigate(['login']);
    }
  }

  private setNewTokenIfResponseValid(event: HttpEvent<any>) {
    if ( event instanceof HttpResponseBase ) {
      const authorizationHeader = event.headers.get('authorization');
      if (authorizationHeader) {
        const token = authorizationHeader.split(' ')[1];
        this.authService.setToken(token);
      }
    }
  }
}
