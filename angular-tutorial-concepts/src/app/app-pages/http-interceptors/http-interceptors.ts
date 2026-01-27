import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-http-interceptors',
  imports: [],
  templateUrl: './http-interceptors.html',
  styleUrl: './http-interceptors.scss'
})
export class HttpInterceptors implements OnInit {

  constructor(private http: HttpClient){

  }

  ngOnInit(): void {
    // get('https://fakestoreapi.com/products')
    // post(post('https://fakestoreapi.com/products', {name: 'santhosh'})
    this.http.post('https://fakestoreapi.com/products', {name: 'component body'}).subscribe(
      (data)=>{
        console.log(data);
      }
    )
  }
  

}
