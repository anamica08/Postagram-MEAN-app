import { Component, OnInit } from '@angular/core';
import { Form, NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  isLoading:boolean = false;
  constructor(
    private _router:Router
  ) { }

  ngOnInit(): void {
  }

  onLogin(form:NgForm){
   
    console.log(form.value)
    alert("Login Succesful")
    this._router.navigateByUrl('/create');
    
  }

}
