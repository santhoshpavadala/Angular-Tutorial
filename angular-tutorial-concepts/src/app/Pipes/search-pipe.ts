import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search',
  pure: false // this is important to run impure
})
export class SearchPipe implements PipeTransform {

  transform(employees: any[], searchText:string, ...args: unknown[]): any[] {
    return employees.filter(emp=>emp.name.toLowerCase().includes(searchText.toLowerCase()));
  }

}
