import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy{
  private authListenerSubs:Subscription;
  public userAuthenticated:boolean = false;
  constructor(private _authService:AuthService) { }
  

  ngOnInit(): void {
    this._authService.getAuthStatusListener().subscribe(isAuthenticated=>{
      this.userAuthenticated = isAuthenticated;
    })
  }
  onLogout(){
    this._authService.logout();
  }
  ngOnDestroy(): void {
    
  }

}
