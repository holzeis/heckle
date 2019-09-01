import { Injectable } from '@angular/core';
import { HttpRequest, HttpInterceptor, HttpHandler } from '@angular/common/http';
import { AuthenticationService } from '../services/authentication.service';

@Injectable()
export class HttpHeadersInterceptor implements HttpInterceptor {

    constructor(private authenticationService: AuthenticationService) { }

    // set auth header only if an employee is signed in
    intercept(req: HttpRequest<any>, next: HttpHandler) {
        if (sessionStorage.getItem('token')) {
            return next.handle(req.clone({
                headers: this.authenticationService.createAuthorizationHttpHeaders()
            }));
        }

        return next.handle(req);
    }
}
