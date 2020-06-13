import { Injectable } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AuthData } from '../components/auth/auth-data';
import { Subject } from 'rxjs';
import { retryWhen } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private token;
  private isAuthenticated:boolean = false;
  private authStatusListener=new Subject<boolean>();
  private tokenTimer:any;
  constructor(private _httpClient: HttpClient,private _router:Router) {}

  getToken() {
    return this.token;
  }


  checkIfUserAuthenticated(){
    return this.isAuthenticated;
  }


  getAuthStatusListener(){
    return this.authStatusListener.asObservable();
  }


  createUSer(form: NgForm) {
    const authData: AuthData = {
      email: form.value.email,
      password: form.value.password,
    };
    this._httpClient
      .post('http://localhost:3000/api/users/signup', authData)
      .subscribe((response) => {
        console.log(response);
      });
  }


  authenticateUser(form: NgForm) {
    const authData: AuthData = {
      email: form.value.email,
      password: form.value.password,
    };
    this._httpClient
      .post<{ token: string,expirationTime:number}>(
        'http://localhost:3000/api/users/login',
        authData
      )
      .subscribe((response) => {
        this.token = response.token;
        if(response){
          const expiresIn = response.expirationTime;
          this.tokenTimer=setTimeout(() => {
            this.logout;
          }, expiresIn );
          this.isAuthenticated  = true;
          this.authStatusListener.next(true);
        }
       
      });
      
      //this._router.navigateByUrl('/');
  }

  logout(){
    this.token = null;
    this.isAuthenticated=false;
    this.authStatusListener.next(false);
    this._router.navigateByUrl('/');
    clearTimeout(this.tokenTimer);
  }
}
