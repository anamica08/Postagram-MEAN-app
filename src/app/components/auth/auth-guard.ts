import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthGuard implements CanActivate{
    constructor(private _authService:AuthService,private _router:Router){

    }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | import("@angular/router").UrlTree | import("rxjs").Observable<boolean | import("@angular/router").UrlTree> | Promise<boolean | import("@angular/router").UrlTree> {
        const isAuthenticated:boolean =  this._authService.checkIfUserAuthenticated();
        if(! isAuthenticated){
            this._router.navigateByUrl('/login');
        }
        return isAuthenticated;
    }
    
} 

//after this register this authguard in provider array of routing module.