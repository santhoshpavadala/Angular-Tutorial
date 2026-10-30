import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, GuardResult, MaybeAsync, Router, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RoutegaurdAuth implements CanActivate {

  // This is the older version with in servie we have the acanactivate
  constructor(private r: Router) { }

  canActivate(_route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const isloggedIn = localStorage.getItem('loggedUserId') !== null;
    if (isloggedIn) {
      return true;
    }

    this.r.navigate(['/login'], { queryParams: { returnUrl: state.url } });
    return false;
  }
}
