import { inject } from '@angular/core';
import { CanActivateChildFn, Router } from '@angular/router';

export const adminAuthGuard: CanActivateChildFn = (childRoute, state) => {
  const router = inject(Router)
  const loggedUserRole =
      localStorage.getItem('loggedRole');

    if (!loggedUserRole) {
      return router.createUrlTree(['/login']);
    }
    return true;
    
};
