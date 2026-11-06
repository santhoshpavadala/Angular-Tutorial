import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-routings',
  imports: [RouterModule],
  templateUrl: './routings.html',
  styleUrl: './routings.scss'
})
export class Routings {

  constructor(private router: Router) {}

  navigateComp() {
    this.router.navigateByUrl("data_binding")
    
  }

  routing = `
import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'users',
    component: UsersComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: '**',
    component: NotFoundComponent
  }
];
`

routing2 = `
import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes)
  ]
};
`

routing3 = `
<nav>
  <a routerLink="/home">Home</a>
  <a routerLink="/users">Users</a>
  <a routerLink="/login">Login</a>
</nav>

<router-outlet></router-outlet>
`

routing4 = `
import { Component } from '@angular/core';
import {
  RouterLink,
  RouterOutlet
} from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterLink, RouterOutlet],
  templateUrl: './app.component.html'
})
export class AppComponent {}
`

routeParam = `
{
  path: 'users/:id',
  component: UserDetailsComponent
}

Read the route parameter
import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-details',
  standalone: true,
  template:\`<p>User ID: {{ userId }}</p>\`
})
export class UserDetailsComponent {
  private route = inject(ActivatedRoute);

  userId = this.route.snapshot.paramMap.get('id');
}
`

routeParam2 = `
this.route.paramMap.subscribe(params => {
  this.userId = params.get('id');
});
`

queryParam = `
this.route.queryParamMap.subscribe(params => {
  const page = params.get('page');
  const search = params.get('search');
});

Navigate with query parameters:
this.router.navigate(['/users'], {
  queryParams: {
    page: 2,
    search: 'santhosh'
  }
});

To preserve existing query parameters during navigation:
this.router.navigate(['/users'], {
  queryParams: { page: 3 },
  queryParamsHandling: 'merge'
});
`

nestedRoutes = `
export const routes: Routes = [
  {
    path: 'admin',
    component: AdminLayoutComponent,
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent
      },
      {
        path: 'users',
        component: UsersComponent
      },
      {
        path: 'settings',
        component: SettingsComponent
      }
    ]
  }
];
`

nestedRoutes2 = `
<header>Admin Panel</header>

<nav>
  <a routerLink="dashboard">Dashboard</a>
  <a routerLink="users">Users</a>
  <a routerLink="settings">Settings</a>
</nav>

<router-outlet></router-outlet>
`

lazyLoad = `
<p>Lazy-load a standalone component</p>
export const routes: Routes = [
  {
    path: 'reports',
    loadComponent: () =>
      import('./reports/reports.component')
        .then(m => m.ReportsComponent)
  }
];


Lazy-load child routes
{
  path: 'admin',
  loadChildren: () =>
    import('./admin/admin.routes')
      .then(m => m.ADMIN_ROUTES)
}

admin.routes.ts

import { Routes } from '@angular/router';

export const ADMIN_ROUTES: Routes = [
  {
    path: '',
    component: AdminLayoutComponent,
    children: [
      {
        path: 'users',
        component: UsersComponent
      },
      {
        path: 'settings',
        component: SettingsComponent
      }
    ]
  }
];

Eager loading vs lazy loading
Eager loading	                                            |Lazy loading
Code is included in the initial application loading path.	|Code is loaded when the route is needed.
Useful for small, frequently accessed features.           |Useful for large or less frequently accessed features.
Can increase initial bundle size.	                        |Can reduce initial bundle size, but may add loading delay when a feature is first opened.
`

preLoad = `
import {
  provideRouter,
  withPreloading,
  PreloadAllModules
} from '@angular/router';

provideRouter(
  routes,
  withPreloading(PreloadAllModules)
);
`

canActivate = `
import { inject } from '@angular/core';
import {
  CanActivateFn,
  Router
} from '@angular/router';

export const authGuard: CanActivateFn = () => {
  const router = inject(Router);

  const isLoggedIn = !!localStorage.getItem('token');

  if (isLoggedIn) {
    return true;
  }

  return router.createUrlTree(['/login']);
};

Apply the guard to a route:
{
  path: 'dashboard',
  component: DashboardComponent,
  canActivate: [authGuard]
}
`

CanActivateChild = `
{
  path: 'admin',
  component: AdminLayoutComponent,
  canActivateChild: [authGuard],
  children: [
    {
      path: 'users',
      component: UsersComponent
    },
    {
      path: 'settings',
      component: SettingsComponent
    }
  ]
}
`

CanDeactivate = `
import { CanDeactivateFn } from '@angular/router';

export interface CanLeavePage {
  canLeave: () => boolean;
}

export const unsavedChangesGuard: CanDeactivateFn<CanLeavePage> =
  component => component.canLeave();


Component implementation:
export class EditUserComponent implements CanLeavePage {
  isDirty = false;

  canLeave(): boolean {
    return !this.isDirty ||
      confirm('You have unsaved changes. Leave this page?');
  }
}

Route configuration:
{
  path: 'edit-user',
  component: EditUserComponent,
  canDeactivate: [unsavedChangesGuard]
}
`

CanMatch = `
import { CanMatchFn } from '@angular/router';

export const featureFlagGuard: CanMatchFn = () => {
  return inject(FeatureFlagService).isEnabled('reports');
};
`

routeResolver = `
import { inject } from '@angular/core';
import {
  ResolveFn
} from '@angular/router';
import { UserService } from './user.service';

export const userResolver: ResolveFn<User> = route => {
  const userService = inject(UserService);
  const id = route.paramMap.get('id')!;

  return userService.getUserById(id);
};

Configure the resolver:
{
  path: 'users/:id',
  component: UserDetailsComponent,
  resolve: {
    user: userResolver
  }
}

Read resolved data:
import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-details',
  standalone: true,
  template: \`
    <h2>{{ user.name }}</h2>
    <p>{{ user.email }}</p>
  \`
})
export class UserDetailsComponent {
  private route = inject(ActivatedRoute);

  user = this.route.snapshot.data['user'] as User;
}
`

routeData = `
{
  path: 'reports',
  component: ReportsComponent,
  data: {
    title: 'Reports',
    permission: 'REPORT_VIEW'
  }
}

Read it from the activated route:
const title = this.route.snapshot.data['title'];

For page titles, Angular also supports the title route property:
{
  path: 'reports',
  component: ReportsComponent,
  title: 'Reports'
}
Angular's router can update the document title during navigation using this route configuration.
`

routerEvents = `
import { Component, inject } from '@angular/core';
import {
  Router,
  NavigationEnd
} from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  template: \`<router-outlet />\`,
  imports: [RouterOutlet]
})
export class AppComponent {
  private router = inject(Router);

  constructor() {
    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd)
      )
      .subscribe(event => {
        console.log('Navigation completed:', event.urlAfterRedirects);
      });
  }
}
`

}
