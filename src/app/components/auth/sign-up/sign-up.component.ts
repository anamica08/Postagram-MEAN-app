import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  isLoading:boolean = false;
  constructor(
    private _router:Router,
    private _authService:AuthService
  ) { }

  ngOnInit(): void {
  }

  onSubmit(form:NgForm){
    if(form.invalid)
    return;
    this.isLoading = true;
    this._authService.createUSer(form)
    .subscribe(result=>{
      this.isLoading = false;
      this._router.navigateByUrl('/auth/login');
    },error=>{
      this.isLoading = false;
      this._router.navigateByUrl('/auth/login');
    })
   
  }

}
