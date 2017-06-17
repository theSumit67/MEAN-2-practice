import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from '../auth.service';

@Injectable()
export class AuthGuard implements CanActivate{
    
    constructor( private authServie: AuthService, private router: Router ) {
        
    }

    canActivate(){
        if( this.authServie.loggedIn() ){
            return true;
        }
        else{
            this.router.navigate(['/login'])
            return false;
        }
    }

}

