import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'usersCount',
})
export class UsersCountPipe implements PipeTransform {

  transform(users: string[], ...args: unknown[]): unknown {
    return users.length;
  }

}
