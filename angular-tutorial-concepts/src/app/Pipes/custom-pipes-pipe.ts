import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'customPipes'
})
export class CustomPipesPipe implements PipeTransform {

  transform(person: any, wish: string): string {
    console.log(person);
    console.log(wish);

    if(person.gender=="m") {
      return `Hello Mr. ${person.name}. ${wish}!`
    } else {
      return `Hello Miss. ${person.name}. ${wish}!`;
    }
  }

  

}
