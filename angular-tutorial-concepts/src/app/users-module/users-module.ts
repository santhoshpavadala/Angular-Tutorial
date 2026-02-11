import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing-module';
import { UsersList } from './users-list/users-list';
import { UsersEdit } from './users-edit/users-edit';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    UsersRoutingModule,
    UsersList,
    UsersEdit
  ]
})
export class UsersModule { }
