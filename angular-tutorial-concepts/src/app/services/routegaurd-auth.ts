import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, GuardResult, MaybeAsync, Router, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RoutegaurdAuth implements CanActivate {

  constructor(private r: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    // return true;

    let isloggedIn = false;
    if(isloggedIn) {
      return true;
    } else {
      this.r.navigate(['/login']);
      return false;
    }
  }
}
