import { HTTP_INTERCEPTORS, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { LoginService } from "./login.service";


//  const TOKEN_HEADER ='Auhtorization';

 @Injectable()
export class AuthInterceptor implements HttpInterceptor
{

    constructor(private loginService: LoginService)
    { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> 
    {
        //Add the Jwt token in any request after login from local host
        //after login when we hit any request then we have to pass jwt token with help of AuthInterceptor
     const token=this.loginService.getToken();
     let authReq=req;
     //Now we have token and then we will add token in any request after login
     console.log("Inside Interceptor..............");
     
     if(token != null)
    {
        console.log("Inside Interceptor.........If.....");
        //Add token in request
        authReq=authReq.clone({setHeaders:{ Auhtorization:`Bearer ${token}`},
    });
    }

        //throw new Error("Method not implemented.");
        return next.handle(authReq);
    }
    


    
}

export const AuthInterceptorProviders=[{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
}]