import { inject } from '@angular/core';
import { CanMatchFn, Router } from '@angular/router';

export const adminMatchGuard: CanMatchFn = (route, segments) => {
   const router = inject(Router);

    const role = localStorage.getItem('loggedRole');

    if (role === 'admin') {
      return true;
    }

    // IMPORTANT:
    // Don't return false if you want to explicitly redirect
    return router.createUrlTree([
      '/dashboard/userdashboard'
    ]);
};
