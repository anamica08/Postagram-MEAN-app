import { Component, OnInit } from '@angular/core';
import { Form, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  isLoading:boolean = false;
  constructor(
    private _router:Router,
    private _authService:AuthService
  ) { }

  ngOnInit(): void {
  }

  onLogin(form:NgForm){
    if(form.invalid){
      return false;
    }
    this.isLoading = true;
    this._authService.authenticateUser(form);
    this._router.navigateByUrl('/');
    
  }

}
