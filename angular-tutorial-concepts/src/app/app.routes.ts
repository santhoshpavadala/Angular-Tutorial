import { Routes } from '@angular/router';
import { Home } from './app-pages/home/home';
import { About } from './app-pages/about/about';
import { Contacts } from './app-pages/contacts/contacts';
import { Pagenotfound } from './app-pages/pagenotfound/pagenotfound';
import { Users } from './app-pages/users/users';
import { Usercard } from './app-pages/users/usercard/usercard';
import { Products } from './app-pages/products/products';
import { Decerators } from './app-pages/decorator-parent/decerators/decerators';
import { DataBinding } from './app-pages/data-binding/data-binding';
import { Directives } from './app-pages/directives/directives';
import { Pipes } from './app-pages/pipes/pipes';
import { Templates } from './app-pages/templates/templates';
import { AngularBasics } from './app-pages/angular-basics/angular-basics';
import { ServicesExamples } from './app-pages/services-examples/services-examples';
import { Routings } from './app-pages/routings/routings';
import { Childroute1 } from './app-pages/routings/childroute1/childroute1';
import { Childroute2 } from './app-pages/routings/childroute2/childroute2';
import { RoutegaurdAuth } from './services/routegaurd-auth';
import { Login } from './app-pages/login/login';
import { Observables } from './app-pages/observables/observables';
import { NgContent } from './app-pages/ng-content/ng-content';
import { DecoratorParent } from './app-pages/decorator-parent/decorator-parent';
import { Todolist } from './app-pages/todolist/todolist';
import { Todoform } from './app-pages/todoform/todoform';
import { Subjects } from './app-pages/subjects/subjects';
import { RxjsOperators } from './app-pages/rxjs-operators/rxjs-operators';
import { HttpInterceptors } from './app-pages/http-interceptors/http-interceptors';
import { Forms } from './app-pages/forms/forms';
import { SignupForm } from './app-pages/signup-form/signup-form';
import { LifecycleHooks } from './app-pages/lifecycle-parent/lifecycle-hooks/lifecycle-hooks';
import { LifecycleParent } from './app-pages/lifecycle-parent/lifecycle-parent';
import { Ngrx } from './app-pages/ngrx-parent/ngrx';
import { Signals } from './app-pages/signals/signals';
import { TemplateForms } from './app-pages/template-forms/template-forms';
import { ReactiveForms } from './app-pages/reactive-forms/reactive-forms';
import { ReactiveFormsApiComponent } from './app-pages/reactive-forms-api/reactive-forms-api';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: 'login', component: Login },
  { path: 'home', component: Home },
  { path: 'about', component: About },
  
  // Route gaurd exapmle implemented only for contacts
  { path: 'contact', component: Contacts, canActivate: [RoutegaurdAuth] },
  { path: 'users', component: Users },
  { path: 'usercard/:id', component: Usercard },
  { path: 'products', component: Products },


  { path: 'basics/:id/:test', component: AngularBasics },
  { path: 'decerators_parent', component: DecoratorParent },
  { path: 'data_binding', component: DataBinding },
  { path: 'directives', component: Directives },
  { path: 'pipes', component: Pipes },
  { path: 'templates', component: Templates },
  { path: 'ngcontent', component: NgContent },
  { path: 'services', component: ServicesExamples },
  { path: 'todo-form', component: Todoform },
  { path: 'todo-list', component: Todolist },
  { path: 'observables', component: Observables },
  { path: 'subject', component: Subjects },
  { path: 'rxjs-operators', component: RxjsOperators },
  { path: 'http-interceptors', component: HttpInterceptors },
  { path: 'forms', component: Forms },
  { path: 'signup', component: SignupForm },
  {
    path: 'templete-form',
    component: TemplateForms
  },
  {
    path: 'reactive-forms',
    component: ReactiveForms
  },

  {
    path: 'reactive-forms-api',
    component: ReactiveFormsApiComponent
  },

  // Lazy Loading Module Concept
  {
    path: 'users-list',
    loadChildren: () =>
      import('./users-module/users-module').then((m) => m.UsersModule),
  },

  // {path: 'lifecycle-hooks', component: LifecycleHooks},
  { path: 'lifecycle-parent', component: LifecycleParent },
  { path: 'ngrx', component: Ngrx },
  { path: 'signals', component: Signals},

  {
    path: 'routings',
    component: Routings,
    children: [
      { path: 'childroute1', component: Childroute1 },
      { path: 'childroute2', component: Childroute2 },
    ],
  },

  

  { path: '**', component: Pagenotfound },

  
];
