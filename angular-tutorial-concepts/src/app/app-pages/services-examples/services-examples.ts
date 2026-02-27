import { Component } from '@angular/core';
import { Mobile } from '../../services/mobile';

import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-services-examples',
  imports: [],
  templateUrl: './services-examples.html',
  styleUrl: './services-examples.scss'
})
export class ServicesExamples {
  mobileList: string[] = []
  constructor(private mobileData: Mobile,
    private http: HttpClient
  ) { }
  ngOnInit(): void {
    this.mobileList = this.mobileData.mobiles;
  }

  addMobile() {
    this.mobileData.mobiles.push("ZEN")
  }
  httpData: any;
  tableHeaders = ['ID', 'Name', 'Price']
  getHttpData() {
    this.http.get('https://fakestoreapi.com/products?limit=5').subscribe((data)=> {
      console.log(data);

      this.httpData = data;
    })
  }
}
