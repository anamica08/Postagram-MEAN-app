import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  isLoading:boolean = false;
  constructor(
    private _router:Router
  ) { }

  ngOnInit(): void {
  }

  onSubmit(form:NgForm){
    
    console.log(form.value)
    alert("You are Succesfully Registered. Please Login with the credentials.");
    this._router.navigateByUrl('/login');
  }

}
