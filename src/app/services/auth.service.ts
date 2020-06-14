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
  private saveAuthData(token:string,expirationDate:Date){
    localStorage.setItem('token',token);
    localStorage.setItem('expireDuration',expirationDate.toISOString());
  }
  private clearAuthData(){
    localStorage.removeItem('token');
    localStorage.removeItem('expireDuration');
  }

  private getAuthData(){
    const token = localStorage.getItem('token');
    const expiration = localStorage.getItem('expireDuration');
    if(!token || !expiration){
      return;
    }
    return {
      token: token,
      expirationTime: new Date(expiration)
    }
  }
private setAuthTimer(duration:number){
  console.log("setting timer",duration)
  this.tokenTimer=setTimeout(() => {
    this.logout;
  }, duration * 1000 );
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
          this.setAuthTimer(expiresIn);
          this.isAuthenticated  = true;
          this.authStatusListener.next(true);
          const now = new Date();
          const expirationDate =new Date( now.getTime() + expiresIn*1000 );
          this.saveAuthData(this.token,expirationDate);
        }
       
      });
      
      //this._router.navigateByUrl('/');
  }

  autoAuthUser(){
    const authInfo = this.getAuthData();
    if(authInfo == null){
      return;
    }
    const now = new Date();
    const expiresIn = authInfo.expirationTime.getTime() - now.getTime();
    if(expiresIn > 0){
      this.token = authInfo.token,
      this.isAuthenticated = true;
      this.setAuthTimer(expiresIn / 1000);
      this.authStatusListener.next(true);
    }
  }
//to kick off the automatic authentication , call this function in app component, because that is loaded first
  logout(){
    this.token = null;
    this.isAuthenticated=false;
    this.authStatusListener.next(false);
    this._router.navigateByUrl('/');
    this.clearAuthData();
    clearTimeout(this.tokenTimer);
  }
}
