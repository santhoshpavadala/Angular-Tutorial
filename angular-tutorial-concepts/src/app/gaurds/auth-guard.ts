import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
debugger;
  const router = inject(Router);

  const localData= localStorage.getItem('loggedUserId');
  if(localData == null) {
    router.navigateByUrl("/login")
    return false;
  } else {
    return true;
  }
};
