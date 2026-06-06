import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fullname',
})
export class FullnamePipe implements PipeTransform {

  transform(firstName:string, lastName:string, ...args: unknown[]): unknown {
    // return value.toUpperCase();
    return `${firstName} ${lastName}`;
  }

}
