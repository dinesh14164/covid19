import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class GoBackService implements CanActivate {

  constructor(public auth: AuthService, public router: Router) { }
  canActivate(): boolean {
    console.log('Go Back this.auth.isAuthenticated()', this.auth.isAuthenticated())
    if (this.auth.isAuthenticated()) {
      this.router.navigate(['']);
      return false;
    }
    return true;
  }
}
