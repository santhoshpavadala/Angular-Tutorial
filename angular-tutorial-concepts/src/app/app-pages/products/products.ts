
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../services/product';

@Component({
  selector: 'app-products',
  imports: [],
  templateUrl: './products.html',
  styleUrl: './products.scss'
})
export class Products implements OnInit {
  products: any[] = []; // Declare users to avoid the template error

  constructor(private ar: ActivatedRoute,
    private ps:Product
  ) {
    this.ar.queryParamMap.subscribe((qparams)=>{
      let category=qparams.get('category')
      if(category) {
        this.products=this.ps.products.filter(
          (p,i,parr)=>{
            return p.category==category
          }
        )
      } else {
        this.products=ps.products
      }
    })
  }



  ngOnInit() {


  }

}
