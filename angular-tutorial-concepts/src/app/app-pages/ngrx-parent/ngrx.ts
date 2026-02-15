import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { NgrxChild } from './ngrx-child/ngrx-child';

@Component({
  selector: 'app-ngrx',
  imports: [NgrxChild],
  templateUrl: './ngrx.html',
  styleUrl: './ngrx.scss'
})
export class Ngrx {
  usersData: any;

  constructor(private storeData: Store<any>) {
    storeData.select('user').subscribe( //to call only user data
      (data)=>{
        this.usersData=data;
        console.log(this.usersData);
        
      }
    )

    // storeData.subscribe( // to call entire data reducer
    //   (data)=>{
    //     this.usersData=data;
    //     console.log(this.usersData);
    //   }
    // )
  }


}
