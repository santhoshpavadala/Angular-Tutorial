import { Component } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-observables',
  imports: [],
  templateUrl: './observables.html',
  styleUrl: './observables.scss'
})
export class Observables {
  myObs=new Observable((listener)=>{
    listener.next(1);
    listener.next(2);
    setTimeout(()=> listener.next(3), 1000);
    setTimeout(()=> listener.next(4), 2000);
    setTimeout(()=> listener.error("some error"), 2000);
    setTimeout(()=> listener.next(6), 3000);
    setTimeout(()=> listener.complete(), 4000);
  })
  getObservable() {
    this.myObs.subscribe(
      data=> {console.log(data)},
      err=> {console.log('Error:', err)},
      () => {console.log('completed')}  
    )
  }

   myObs2 = new Observable((listener2)=>{
    listener2.next(1);
    listener2.next(2);
    setTimeout(()=> listener2.next(3), 1000);
    setTimeout(()=> {listener2.next(4)},1000);
    // listener2.complete(); if gives like this its directly hitting with out time set
    setTimeout(()=> listener2.error('some error occured'), 2000)
    setTimeout(()=> listener2.complete(), 1000);
  })
  getObservable2() {
    this.myObs2.subscribe(
      data2=> {console.log(data2,'data')},
      err2=> {console.log('Error: ',err2)},
      () => {console.log('completed2');
      }
    )
  }


  data3:any;
  error3:any;
  myobs3 = new Observable((intimate)=> {
    intimate.next("first");
    setTimeout(()=>{
      intimate.next("second")
    setTimeout(()=>{
      intimate.next("third")
    setTimeout(()=>{
      intimate.next("four")
    setTimeout(()=>{
      intimate.error("this is error")
    },1000);
    },1000);
    },1000);
    },1000);
  })
  subscriberef:any;
  getObservable3() {
    this.subscriberef = this.myobs3.subscribe(  //call back function
      d3 => {this.data3=d3}, // it call first data of in next
      e3 => {this.error3=e3}, // if ant error then it calls
      ()=> {console.log('done3');
      }
    )
  }

  unsub() {
    this.subscriberef.unsubscribe();
  }

}
