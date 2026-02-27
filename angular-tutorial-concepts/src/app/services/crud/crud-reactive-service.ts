import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CrudReactiveService {

  constructor() { }

  private apiUrl = 'https://jsonplaceholder.typicode.com/users/';


  // JusT basic service function examples
  getAdditionOfTwoNo(num1:number, num2: number) {
    return num1+num2;
  }
}
