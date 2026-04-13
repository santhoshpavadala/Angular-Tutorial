import { Component, OnDestroy, OnInit } from '@angular/core';
import { from, interval, Observable, of, Subscription, timer } from 'rxjs';
import { ObserableData } from '../../../services/obserable-data';

@Component({
  selector: 'app-observables',
  imports: [],
  templateUrl: './observables.html',
  styleUrl: './observables.scss',
})
export class Observables implements OnInit, OnDestroy {
  myObs = new Observable((listener) => {
    listener.next(1);
    listener.next(2);
    setTimeout(() => listener.next(3), 1000);
    setTimeout(() => listener.next(4), 1000);
    setTimeout(() => listener.error('some error'), 1000);
    setTimeout(() => listener.next(5), 1000);
    setTimeout(() => listener.complete(), 1000);
  });
  getObservable() {
    this.myObs.subscribe(
      (data) => {
        console.log(data);
      }, //first callback
      (err) => {
        console.log('Error:', err);
      }, //second callback
      () => {
        console.log('completed');
      }, //Third callback
    );
  }
  myobs2 = new Observable((intimate) => {
    intimate.next('first');
    setTimeout(() => {
      intimate.next('second');
      setTimeout(() => {
        intimate.next('third');
        setTimeout(() => {
          intimate.next('four');
          setTimeout(() => {
            intimate.error('this is error');
          }, 1000);
        }, 1000);
      }, 1000);
    }, 1000);
  });
  subscriberef: any;
  data2: any;
  error2: any;
  getObservable2() {
    this.subscriberef = this.myobs2.subscribe(
      //call back function
      (d2) => {
        this.data2 = d2;
      }, // it call first data of in next
      (e2) => {
        this.error2 = e2;
      }, // if ant error then it calls
      () => {
        console.log('done2');
      },
    );
  }
  unsub() {
    this.subscriberef.unsubscribe();
  }

  //Other example- With Subject services
  constructor(private dataService: ObserableData) {}

  myObserver = {
    next: (data: any) => {
      console.log('This is observable data: ', data);
    },
    error: (err: any) => {
      console.log('This is Obs Error:', err);
    },
    complete: () => {
      console.log('Your Subscription is Completed');
    },
  };

  // Normal array declaration
  cityList: string[] = ['Pune', 'Mumbai', 'Nagpur'];
  // Observable declartion : of observable
  cityList$ = of(['Pune', 'Mumbai', 'Nagpur']);
  // from observable: it excutes like a for loop executes one by one
  cityLis2$ = from(['Pune', 'Mumbai', 'Nagpur']);
  // iNTERVAL Observar
  myInterval$ = interval(2000);
  // Timer Observar
  myTimer$ = timer(5000);

  intervalDestroy!: Subscription;

  // creation of observale
  skillList$ = of(['Ang', 'React,', '.net', 'Javascript', 'HTML']);
  ngOnInit(): void {
    this.dataService.obsData.subscribe(this.myObserver);
    this.dataService.getData();

    // other way
    this.dataService.obsData2.subscribe({
      next: (data: any) => {
        console.log(data, 'This is ngoninit Data');
      },
      error: (err: any) => {
        console.log(err, 'This is error');
      },
      complete: () => {
        console.log('Subscription Completed');
      },
    });
    this.dataService.getData2();



    // Learning Partner Examples: observables
    const myObs$ = new Observable((value) => {
      value.next('This is Demo Text');
    });
    myObs$.subscribe((message) => {
      debugger;
      console.log(message, 'Obs emited data');
    });


    const ObsData = new Observable(data => {
      data.next("this is obs data")
    })

    ObsData.subscribe({
      next: (data)=>{
        console.log(data, 'test obs');
      },
      error: (ERR)=>{
        console.log(ERR, 'test obs error');
      },
      complete: ()=>{
        console.log('complte');
        
      }
    })

    this.cityList$.subscribe((cityData: string[]) => {
      console.log(cityData, 'city data 1 of obseervar');
    });

    this.cityLis2$.subscribe((cityData2: string) => {
      console.log(cityData2, 'city data 2 from observor');
    });

    this.intervalDestroy = this.myInterval$.subscribe((res: number) => {
      console.log(res, 'Interval Observar');
    });

    this.myTimer$.subscribe((time) => {
      console.log(time, 'timer Observar');
    });

    this.skillList$.subscribe((result: any) => {
      console.log(result, 'skills observor');
    });
  }

  ngOnDestroy(): void {
    this.intervalDestroy.unsubscribe();
  }
}
