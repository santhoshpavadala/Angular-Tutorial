import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Usersdata {
  constructor() { }

  http=inject(HttpClient)
  apiUrl:string = "https://jsonplaceholder.typicode.com/users";

  getUserData() {
    return this.http.get(this.apiUrl);
  }


  users= [
  {
    "id": 1,
    "name": "John",
    "userName": "Paul",
    "email": "abc@gmail.com",
    "img": "https://cdn.pixabay.com/photo/2022/08/08/19/36/landscape-7373484_1280.jpg",
    "address": {
      "city": "Hyderabad",
      "state": "Telangana"
    }
  },
  {
    "id": 2,
    "name": "St",
    "userName": "joseph",
    "email": "abc@gmail.com",
    "img": "https://cdn.pixabay.com/photo/2022/08/08/19/36/landscape-7373484_1280.jpg",
    "address": {
      "city": "Hyderabad",
      "state": "Telangana"
    }
  }
  ]
}
