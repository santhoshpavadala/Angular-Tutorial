import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersList } from './users-list/users-list';
import { UsersEdit } from './users-edit/users-edit';

const routes: Routes = [
   { path: '', component: UsersList },
   { path: 'users-edit', component: UsersEdit }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
