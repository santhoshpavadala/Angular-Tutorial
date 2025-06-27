import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Product {

  constructor() { }

  products= [
    {
      "id": 1,
      "name": 'Apple',
      "imgLink": 'https://cdn.pixabay.com/photo/2018/03/30/02/01/cell-phone-camera-3274220_1280.jpg',
      "price": '1.5L',
      "category": 'Mobiles'
    },
    {
      "id": 2,
      "name": 'Samsung',
      "imgLink": 'https://cdn.pixabay.com/photo/2022/03/12/09/24/smartphone-7063771_1280.jpg',
      "price": '1L',
      "category": 'Mobiles'
    },
    {
      "id": 3,
      "name": 'Dell',
      "imgLink": 'https://cdn.pixabay.com/photo/2016/11/21/15/46/computer-1846056_1280.jpg',
      "price": '1L',
      "category": 'Laptops'
    },
    {
      "id": 4,
      "name": 'One Plus',
      "imgLink": 'https://cdn.pixabay.com/photo/2015/06/24/15/45/hands-820272_1280.jpg',
      "price": '1L',
      "category": 'Tabs'
    },
    {
      "id": 5,
      "name": 'Whirl Pool',
      "imgLink": 'https://cdn.pixabay.com/photo/2021/02/11/06/25/fridge-top-cover-6004377_1280.jpg',
      "price": '1L',
      "category": 'Electronics'
    }
  ]
}
