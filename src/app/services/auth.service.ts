import { Injectable } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AuthData } from '../components/auth/auth-data';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private token;
  constructor(private _httpClient: HttpClient) {}

  getToken() {
    return this.token;
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
      });
  }
}
