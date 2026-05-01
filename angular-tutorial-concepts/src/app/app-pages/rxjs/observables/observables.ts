import { Component, OnDestroy, OnInit } from '@angular/core';
import { filter, from, interval, map, Observable, of, Subject, Subscription, take, takeUntil, timer } from 'rxjs';
import { ObserableData } from '../../../services/obserable-data';

@Component({
  selector: 'app-observables',
  imports: [],
  templateUrl: './observables.html',
  styleUrl: './observables.scss',
})
export class Observables implements OnInit, OnDestroy {
  destroy$ = new Subject<void>()
 


  obseravableData: number = 0;
  errMsg:string =''
  myObs = new Observable((listener) => {
    // listener.next(1);
    // listener.next(2);
    setTimeout(() => listener.next(1), 1000);
    setTimeout(() => listener.next(2), 2000);
    setTimeout(() => listener.next(3), 3000);
    setTimeout(() => listener.next(4), 4000);
    setTimeout(() => listener.next(5), 5000);
    setTimeout(() => listener.error('Error Occured'), 5000);
    setTimeout(() => listener.complete(), 9000);

  });
  getObservable() {
    this.myObs.subscribe({
      next: (data:any)=>{
        this.obseravableData = data;
      },
      error: (err)=>{
        this.errMsg = err;
      },
      complete: ()=>{
        console.log("Task completed");
      }
    } 
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

  // Normal array declaration
  cityList: string[] = ['Pune', 'Mumbai', 'Nagpur'];
  // Observable declartion : of observable
  cityList$ = of(['Pune', 'Mumbai', 'Nagpur']);
  // from observable: it excutes like a for loop executes one by one
  cityLis2$ = from(['Pune', 'Mumbai', 'Nagpur']);
  // iNTERVAL Observar
  myInterval$ = interval(1000);
  // Timer Observar
  myTimer$ = timer(5000);
  intervalDestroy!: Subscription;
  // creation of observale
  skillList$ = of(['Ang', 'React,', '.net', 'Javascript', 'HTML']);

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

  // Types of Observables creation
  // 1. Basic Obs creation
  stringObsData:string = '';
  messages: string[] = [];

  myStringObs$:Observable<string> = new Observable((observer)=>{
    observer.next("Hello Santhosh");
    observer.next("Good Moring !");
    // observer.error("Error Ocured");
    observer.complete();
  })
  myStringObs2$:Observable<string> = new Observable((observer)=>{
    observer.next("Hello Santhosh");
    observer.next("Good Moring !");
    // observer.error("Error Ocured");
    observer.complete();
  })
  

//Example 2: Transform Data (map)
  ofNumbers$ = of(1,2,3,4,5);
  ofValue: number[]=[];

// Example 3: Transform Data (filter)
  evenFilter$ = of(1,2,3,4,5,6,7,8,9);
  evenNumberList: number[] =[];

  arrayFilter = from([1,2,3,4,5,6,7,8,9])
  arrayEvenNumberList: number[] = [];

  ofArray = [1,2,3,4,5];
  ofDataList: number[]=[]
  fromArray = [1,2,3,4,5];
  fromDataList: number[]=[]



// Example 4: Interval (Real-time stream)
  myIntervalNew$ = interval(1000);
  intervalData: number = 0;

   

  ngOnInit(): void {
  // 1. Basic Obs creation
    this.myStringObs$.subscribe({
      next: (val:string)=>{
        console.log(val, 'You can see whole values of observables emited data');
        this.stringObsData = val;
      },
      error: (err) => {
        console.log(err);
        this.stringObsData = "Something went wrong";
      },
      complete: ()=>{
        console.log("Completed");
      }
    })

    this.myStringObs2$.subscribe({
      next: (val) => {
        this.messages.push(val);
      }
    });

  //Example 2: Transform Data (map)
  this.ofNumbers$.pipe(map(value=> value * 40)).subscribe({
    next: (val)=> {
      this.ofValue.push(val)
    }
  })

// Example 3: Transform Data (filter)
  this.evenFilter$.pipe(filter(value=> value %2 === 0)).subscribe({
    next: (res)=>{
      this.evenNumberList.push(res);
    }
  })

  this.arrayFilter.pipe(filter(val=>val %2 === 0)).subscribe({
    next: (res) =>{
      this.arrayEvenNumberList.push(res)
    }
  })

  of(this.ofArray).subscribe({
    next: (data)=> {
      this.ofDataList = data;
    }
  })
  from(this.fromArray).subscribe({
    next: (data)=>{
      this.fromDataList.push(data);
    }
  })

// Example 4: Interval (Real-time stream)
  this.myIntervalNew$.pipe(takeUntil(this.destroy$), take(10)).subscribe({
    next: (res)=>{
      this.intervalData = res;
    }
  })






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

    this.intervalDestroy = this.myInterval$.pipe(takeUntil(this.destroy$)).subscribe((res: number) => {
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
    this.destroy$.next(); //for entire component way by using takeuntill destroy
    this.destroy$.complete();
    this.intervalDestroy.unsubscribe(); // Manual way
  }
}
