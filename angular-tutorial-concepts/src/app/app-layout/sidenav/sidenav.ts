import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';

interface MenuItem {
  label: string;
  route: string;
  exact?: boolean;
}

@Component({
  selector: 'app-sidenav',
  imports: [RouterModule],
  templateUrl: './sidenav.html',
  styleUrl: './sidenav.scss'
})
export class Sidenav implements OnInit {

  // ==========================================
  // Logged-in user role
  // ==========================================

  role: string | null = null;


  // ==========================================
  // User Menu Items
  // ==========================================

  userMenuItems: MenuItem[] = [

    {
      label: 'Basics',
      route: '/basics'
    },

    {
      label: 'Angular - Interview',
      route: '/ang-interview'
    },

    {
      label: 'Javascript - Interview',
      route: '/js-interview'
    },

    {
      label: 'Data Binding',
      route: '/data_binding'
    },

    {
      label: 'Decerators Parent',
      route: '/decerators_parent'
    },

    {
      label: 'Directives',
      route: '/directives'
    },

    {
      label: 'Pipes',
      route: '/pipes'
    },

    {
      label: 'Templates',
      route: '/templates'
    },

    {
      label: 'Ng-Content',
      route: '/ngcontent'
    },

    {
      label: 'Change-Detection',
      route: '/change-detection'
    },


    // Angular Routing

    {
      label: 'Routings',
      route: '/routings'
    },

    {
      label: 'Route Params',
      route: '/users'
    },


    // Lazy Loading

    {
      label: 'UsersList - Lazy Loading',
      route: '/users-list',
      exact: true
    },

    {
      label: 'Users Edit - Lazy Loading',
      route: '/users-list/users-edit'
    },


    // Guards / Interceptors

    {
      label: 'Guards & Http-Interceptors',
      route: '/http-interceptors'
    },


    // Lifecycle

    {
      label: 'Lifecycle Hooks',
      route: '/lifecycle-parent'
    },

    {
      label: 'Unsubscribe',
      route: '/unsubscribe'
    },


    // Angular

    {
      label: 'Signals',
      route: '/signals'
    },

    {
      label: 'Services',
      route: '/services'
    },


    // RxJS

    {
      label: 'RxJS - Observables',
      route: '/observables'
    },

    {
      label: 'RxJS - Search',
      route: '/global-search'
    },

    {
      label: 'RxJS - Subject',
      route: '/subject'
    },

    {
      label: 'RxJS - Operators',
      route: '/rxjs-operators'
    },

    {
      label: 'RxJS - Map',
      route: '/rxjs-map'
    },

    {
      label: 'RxJS - Filter',
      route: '/rxjs-filter'
    },

    {
      label: 'RxJS - Todo Form',
      route: '/todo-form'
    },

    {
      label: 'RxJS - Form',
      route: '/rxjs-forms'
    },


    // Forms

    {
      label: 'Forms',
      route: '/forms'
    },

    {
      label: 'Signup Forms',
      route: '/signup'
    },

    {
      label: 'Template Forms',
      route: '/templete-form'
    },

    {
      label: 'Reactive Forms',
      route: '/reactive-forms'
    },

    {
      label: 'CRUD - Template',
      route: '/crud-operation-template'
    },

    {
      label: 'CRUD - Reactive',
      route: '/crud-operation-reactive'
    },

    {
      label: 'CRUD - API Methods',
      route: '/crud-api-methods'
    },

    {
      label: 'Material - Reactive Forms',
      route: '/material-reactive-forms'
    },

    {
      label: 'Material - Template Forms',
      route: '/material-template-forms'
    },


    // NgRx

    {
      label: 'NGRX',
      route: '/ngrx'
    },


    // Common

    {
      label: 'Home',
      route: '/home'
    },

    {
      label: 'About',
      route: '/about'
    },

    {
      label: 'Contact',
      route: '/contact'
    }

  ];


  // ==========================================
  // Admin Menu Items
  // ==========================================

  adminMenuItems: MenuItem[] = [

    {
      label: 'Dashboard',
      route: '/dashboard/admindashboard'
    },

    {
      label: 'Users',
      route: '/dashboard/admin-users'
    },

    {
      label: 'Products',
      route: '/dashboard/admin-products'
    },

    {
      label: 'Reports',
      route: '/dashboard/admin-reports'
    }

  ];


  ngOnInit(): void {

    this.role = localStorage.getItem('loggedRole');

    console.log('Logged Role:', this.role);

  }


  // ==========================================
  // Check Admin
  // ==========================================

  get isAdmin(): boolean {

    return this.role === 'admin';

  }


  // ==========================================
  // Check User
  // ==========================================

  get isUser(): boolean {

    return this.role === 'user';

  }

}