//feature provided by angulat http client

import {
    HttpInterceptor,
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpErrorResponse,
  } from '@angular/common/http';
  import { Observable, throwError } from 'rxjs';
  import { Injectable } from '@angular/core';
  import { AuthService } from 'src/app/services/auth.service';
import { catchError } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { ErrorComponent } from './components/error/error.component';
  
  @Injectable()
  export class ErrorInterceptor implements HttpInterceptor {
    constructor(public dialog:MatDialog) {}
  
    intercept(req: HttpRequest<any>, next: HttpHandler) {
      
      return next.handle(req).pipe(
          catchError((error:HttpErrorResponse)=>{
              let errorMessage = "Oops! An unknown Error Occured!!";
              if(error.error.message){
                  errorMessage = error.error.message;
              }
              this.dialog.open(ErrorComponent,{data:{message:errorMessage}});
              
              return throwError(error);
          })
      );
    }
    //after this register this interception in app.module.ts ,in provider array,
    //and set multi=true, so that it doesnot override the already present interceptors.
  }
  