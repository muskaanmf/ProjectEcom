import {
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest,
    HTTP_INTERCEPTORS, HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginService } from './login.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private loginService: LoginService) { }

    intercept(
        req: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        let authReq = req;
        const token = this.loginService.getToken();

        if (token != null) {
            authReq = authReq.clone({
                headers: new HttpHeaders({
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*"
                })
            });
            console.log(authReq);
        }
        return next.handle(authReq);
    }
}
export const authInterceptorProvider = [
    {
        provide: HTTP_INTERCEPTORS,
        useClass: AuthInterceptor,
        multi: true,
    },
];
