import { Injectable } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AuthData } from '../components/auth/auth-data';
import { Subject } from 'rxjs';
import { retryWhen } from 'rxjs/operators';
import { Router } from '@angular/router';

import {environment} from '../../environments/environment'

const Backend_url = environment.apiURL+'/users/';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private token;
  private loggedInUser:string;
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
  private saveAuthData(token:string,expirationDate:Date,userId:string){
    localStorage.setItem('token',token);
    localStorage.setItem('expireDuration',expirationDate.toISOString());
    localStorage.setItem('userId',userId);
  }
  private clearAuthData(){
    localStorage.removeItem('token');
    localStorage.removeItem('expireDuration');
    localStorage.removeItem('userId')
  }
   getCurrentUser(){
    return this.loggedInUser;
  }
  private getAuthData(){
    const token = localStorage.getItem('token');
    const expiration = localStorage.getItem('expireDuration');
    const userId = localStorage.getItem('userId');
    if(!token || !expiration){
      return;
    }
    return {
      token: token,
      expirationTime: new Date(expiration),
      userId: userId
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
    return this._httpClient
      .post(Backend_url+'/signup', authData);
      
  }


  authenticateUser(form: NgForm) {
    const authData: AuthData = {
      email: form.value.email,
      password: form.value.password,
    };
    this._httpClient
      .post<{ token: string,expirationTime:number,user_id:string}>(
        Backend_url+'/login',
        authData
      )
      .subscribe((response) => {
        
        this.token = response.token;
        this.loggedInUser = response.user_id;
        if(response){
          const expiresIn = response.expirationTime;
          this.setAuthTimer(expiresIn);
          this.isAuthenticated  = true;
          this.authStatusListener.next(true);
          const now = new Date();
          const expirationDate =new Date( now.getTime() + expiresIn*1000 );
          this.saveAuthData(this.token,expirationDate,this.loggedInUser);
        }
       
      },err=>{
        this.isAuthenticated= false;
        this.loggedInUser = null;
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
      this.loggedInUser = authInfo.userId;
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
    this.loggedInUser = null;
    clearTimeout(this.tokenTimer);
  }
}
