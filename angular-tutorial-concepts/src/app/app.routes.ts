import { Routes } from '@angular/router';
import { Home } from './app-pages/home/home';
import { About } from './app-pages/about/about';
import { Contacts } from './app-pages/contacts/contacts';
import { Pagenotfound } from './pagenotfound/pagenotfound';
import { Users } from './app-pages/users/users';
import { Usercard } from './app-pages/users/usercard/usercard';
import { Products } from './app-pages/products/products';
import { Decerators } from './decerators/decerators';
import { DataBinding } from './data-binding/data-binding';
import { Directives } from './directives/directives';
import { Pipes } from './pipes/pipes';
import { Templates } from './templates/templates';
import { AngularBasics } from './angular-basics/angular-basics';
import { ServicesExamples } from './app-pages/services-examples/services-examples';
import { Routings } from './app-pages/routings/routings';
import { Childroute1 } from './app-pages/routings/childroute1/childroute1';
import { Childroute2 } from './app-pages/routings/childroute2/childroute2';
import { RoutegaurdAuth } from './services/routegaurd-auth';
import { Login } from './app-pages/login/login';
import { Observables } from './app-pages/observables/observables';
import { NgContent } from './app-pages/ng-content/ng-content';

export const routes: Routes = [
    { path:'basics/:id/:test', component:AngularBasics },
    { path:'decerators', component:Decerators },
    { path:'data_binding', component:DataBinding },
    { path:'directives', component:Directives },
    { path:'pipes', component:Pipes },
    { path:'templates', component:Templates },
    { path:'services', component:ServicesExamples },
    { path:'routings', component:Routings, 
        children: [
            {path:'childroute1', component: Childroute1},
            {path:'childroute2', component: Childroute2}
        ]
    },
    {path:'observables', component: Observables},
    {path:'ngcontent', component: NgContent},


    { path:'', pathMatch: 'full', redirectTo: 'home' },
    { path:'login', component: Login },
    { path:'home', component: Home },
    { path:'about', component:About },
    // Route gaurd exapmle implemented only for contacts
    { path:'contact', component: Contacts, canActivate: [RoutegaurdAuth] },
    { path:'users', component: Users },
    { path:'usercard/:id', component: Usercard },
    { path:'products', component: Products },
    { path:'**', component: Pagenotfound }
];