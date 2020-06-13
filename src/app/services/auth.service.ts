import { Injectable } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AuthData } from '../components/auth/auth-data';
import { Subject } from 'rxjs';
import { retryWhen } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private token;
  private isAuthenticated:boolean = false;
  private authStatusListener=new Subject<boolean>();

  constructor(private _httpClient: HttpClient) {}

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
      .post<{ token: string }>(
        'http://localhost:3000/api/users/login',
        authData
      )
      .subscribe((response) => {
        this.token = response.token;
        if(response){
          this.isAuthenticated  = true;
          this.authStatusListener.next(true);
        }
       
      });
      
      
  }

  logout(){
    this.token = null;
    this.isAuthenticated=false;
    this.authStatusListener.next(false);
  }
}
