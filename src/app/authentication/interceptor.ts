import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class Interceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const accessToken: string | null = localStorage.getItem('user');
    if (req.headers.get('skip')) return next.handle(req);

    if (accessToken) {
      const cloned = req.clone({
        headers: req.headers.set('Authorization', "Bearer " + accessToken),
      });

      return next.handle(cloned);
    } else {
      return next.handle(req);
    }
  }
}
