import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";



@Injectable()
export class SessionInterceptor implements HttpInterceptor {
  
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const userToken = localStorage.getItem('B1SESSION');;
        const modifiedReq = req.clone({ 
          // headers: req.headers.set('cookie', `B1SESSION: ${userToken};`),
        });
        return next.handle(modifiedReq);
      }
}
