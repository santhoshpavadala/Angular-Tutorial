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

export const routes: Routes = [
    { path:'', component: Home },
    { path:'basics/:id/:test', component:AngularBasics },
    { path:'decerators', component:Decerators },
    { path:'data_binding', component:DataBinding },
    { path:'directives', component:Directives },
    { path:'pipes', component:Pipes },
    { path:'templates', component:Templates },

    { path:'about', component:About },
    { path:'contact', component: Contacts },
    { path:'users', component: Users },
    { path:'usercard/:id', component: Usercard },
    { path:'products', component: Products },
    { path:'**', component: Pagenotfound }
];
