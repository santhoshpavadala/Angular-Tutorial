
import { HttpClient } from '@angular/common/http';
import {
  AfterViewInit,
  Component,
  ElementRef,
  inject,
  OnDestroy,
  OnInit,
  ViewChild
} from '@angular/core';
import {
  concatMap,
  debounceTime,
  distinctUntilChanged,
  exhaustMap,
  filter,
  forkJoin,
  from,
  fromEvent,
  interval,
  map,
  merge,
  mergeMap,
  of,
  pluck,
  range,
  skip,
  Subject,
  switchMap,
  take,
  takeUntil
} from 'rxjs';
import { ObserableData } from '../../../services/obserable-data';
import { FormControl, FormsModule, ReactiveFormsModule } from "@angular/forms";

@Component({
  selector: 'app-rxjs-operators',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './rxjs-operators.html',
  styleUrl: './rxjs-operators.scss'
})
export class RxjsOperators implements OnInit, AfterViewInit, OnDestroy {
  /* ---------------- Creation Operators ---------------- */
  ofOperatorData: any[] = [];
  fromOperatorData: any[] = [];
  rangeOperatorData: number[] = [];

  intervalValue = 0;
  intervalData: number[] = [];

  /* ---------------- Transform / Filter ---------------- */
  mapData: number[] = [];
  filterData: number[] = [];

  // LP Examples
  numberList1$= of([11,12,13,14,15,16,17,18,19])
  numberList2$= from([11,12,13,14,15,16,17,18,19])
  

  /* ---------------- fromEvent ---------------- */
  @ViewChild('viewChildBtn') btn!: ElementRef<HTMLButtonElement>;
  clickCount = 0;
  @ViewChild('eventInput') input!: ElementRef<HTMLInputElement>;
  typedValue = '';

  /* ---------------- debounceOperator ---------------- */
  @ViewChild('debounceInput') dbInput!: ElementRef<HTMLInputElement>;
  searchTerm  = '';

  /* ---------------- Merge Operator ---------------- */
  mergeOb1=of(1,2,3);
  mergeOb2=from(["s", "p"])
  mergeObs3=merge(this.mergeOb1, this.mergeOb2);
  mergedData: any[] = [];

  /* ---------------- Take Operator ---------------- */
  takeObs=interval(1000).pipe(take(5));
  takeData: any[]=[];

  /* ---------------- Pluck Operator ---------------- */
  pluckObs=from(
    [
      {
        "id": 1,
        "name": "Leanne Graham",
        "username": "Bret",
        "email": "Sincere@april.biz",
        "address": {
          "street": "Kulas Light",
          "suite": "Apt. 556",
          "city": "Gwenborough",
          "zipcode": "92998-3874",
          "geo": {
            "lat": "-37.3159",
            "lng": "81.1496"
          }
        },
        "phone": "1-770-736-8031 x56442",
        "website": "hildegard.org",
        "company": {
          "name": "Romaguera-Crona",
          "catchPhrase": "Multi-layered client-server neural-net",
          "bs": "harness real-time e-markets"
        }
      },
      {
        "id": 2,
        "name": "Ervin Howell",
        "username": "Antonette",
        "email": "Shanna@melissa.tv",
        "address": {
          "street": "Victor Plains",
          "suite": "Suite 879",
          "city": "Wisokyburgh",
          "zipcode": "90566-7771",
          "geo": {
            "lat": "-43.9509",
            "lng": "-34.4618"
          }
        },
        "phone": "010-692-6593 x09125",
        "website": "anastasia.net",
        "company": {
          "name": "Deckow-Crist",
          "catchPhrase": "Proactive didactic contingency",
          "bs": "synergize scalable supply-chains"
        }
      },
      {
        "id": 3,
        "name": "Clementine Bauch",
        "username": "Samantha",
        "email": "Nathan@yesenia.net",
        "address": {
          "street": "Douglas Extension",
          "suite": "Suite 847",
          "city": "McKenziehaven",
          "zipcode": "59590-4157",
          "geo": {
            "lat": "-68.6102",
            "lng": "-47.0653"
          }
        },
        "phone": "1-463-123-4447",
        "website": "ramiro.info",
        "company": {
          "name": "Romaguera-Jacobson",
          "catchPhrase": "Face to face bifurcated interface",
          "bs": "e-enable strategic applications"
        }
      },
      {
        "id": 4,
        "name": "Patricia Lebsack",
        "username": "Karianne",
        "email": "Julianne.OConner@kory.org",
        "address": {
          "street": "Hoeger Mall",
          "suite": "Apt. 692",
          "city": "South Elvis",
          "zipcode": "53919-4257",
          "geo": {
            "lat": "29.4572",
            "lng": "-164.2990"
          }
        },
        "phone": "493-170-9623 x156",
        "website": "kale.biz",
        "company": {
          "name": "Robel-Corkery",
          "catchPhrase": "Multi-tiered zero tolerance productivity",
          "bs": "transition cutting-edge web services"
        }
      },
      {
        "id": 5,
        "name": "Chelsey Dietrich",
        "username": "Kamren",
        "email": "Lucio_Hettinger@annie.ca",
        "address": {
          "street": "Skiles Walks",
          "suite": "Suite 351",
          "city": "Roscoeview",
          "zipcode": "33263",
          "geo": {
            "lat": "-31.8129",
            "lng": "62.5342"
          }
        },
        "phone": "(254)954-1289",
        "website": "demarco.info",
        "company": {
          "name": "Keebler LLC",
          "catchPhrase": "User-centric fault-tolerant solution",
          "bs": "revolutionize end-to-end systems"
        }
      }
    ]
  ).pipe(
    // pluck('name'); // pluck is deprecated in angular latest after 13 or some versions
    pluck('address', 'geo', 'lat') //nested path, data picking
    // skip(2) // skips first 2 objects
    // map((user:any)=>user.name)
    // map((user:any)=>user.address.geo.lat) //nested path, data picking
  );
  pluckData: any[]=[];

  distinctObs=of(9,9,7,7,6,5,4,9,7).pipe(distinctUntilChanged())
  distinctData: any[]=[]


  private destroy$ = new Subject<void>();


  // LP-Examples: From service realyime examples:
  jsonUserdata=inject(ObserableData);
  searchControl:any = new FormControl();

  // ForkJoin Examples
  $stateData = of(["TS", "AP", "KA"]);
  $cityData = of(["Hyd", "Vizag", "Bengalur"]);
  http = inject(HttpClient);
  dashboardData: any[] = [];

  // Switch Map examples
  searchControlSwitch: FormControl = new FormControl('');
  searchControlMerge: FormControl = new FormControl('');
  searchControlConcat: FormControl = new FormControl('');

  $loginClicks = new Subject<void>()




  constructor(private dashboardService: ObserableData) {
    this.jsonUserdata.getJsonData().subscribe({
      next: (res)=>{
        console.log(res, 'id & name mapping method');
      },
      error: ()=>{}
    })

    this.jsonUserdata.getSingleUser().subscribe({
      next: (res)=>{
        console.log(res, 'Signle User with only Address data');
      },
      error: (err)=>{
      }
    });

    // this.searchControl.valueChanges.subscribe((res:any)=>{
    //   console.log(res);
    // })

    this.searchControl.valueChanges.pipe(
      filter((searchText:any) => searchText.length >= 3)
    ).subscribe((res:any)=>{
      console.log(res, 'search text subscribe after length 3 letters');
    });


    // ForkJoin Examples
    forkJoin([this.$stateData, this.$cityData]).subscribe((res)=>{
      // debugger;
    });

    this.$stateData.subscribe({
      next: (res:any)=> {
        // debugger;
      },
      error: (err: any)=>{}
    })

    this.$cityData.subscribe({
      next: (res:any)=> {
        // debugger;
      },
      error: (err: any)=>{}
    })

    // ForkJoin RealApi Example:
    const userFork = this.http.get('https://jsonplaceholder.typicode.com/users')
    const postsFork = this.http.get('https://jsonplaceholder.typicode.com/posts');

    forkJoin([userFork, postsFork]).subscribe((fork)=>{
      console.log(fork, 'forkjoin  multiple api joins');
      // debugger;
    })

    this.dashboardService.getDashboardData().subscribe({
      next: (res)=>{
        this.dashboardData = res;
      },
      error: (error)=>{
        console.error(error);
      }
    })

  // Switch Map examples - 
    this.searchControlSwitch.valueChanges.pipe(
        switchMap((search:string) => this.http.get('https://dummyjson.com/products/search?q='+search))
      ).subscribe((res:any)=>{
        console.log(res, 'search inputs');
      })

    // Merge Map examples - 
    this.searchControlMerge.valueChanges.pipe(
        mergeMap((search:string) => this.http.get('https://dummyjson.com/products/search?q='+search))
      ).subscribe((res:any)=>{
        console.log(res, 'search inputs');
      })

      // concatMap  examples - 
    this.searchControlConcat.valueChanges.pipe(
        concatMap((search:string) => this.http.get('https://dummyjson.com/products/search?q='+search))
      ).subscribe((res:any)=>{
        console.log(res, 'search inputs');
      })

      // exhasustmap  examples - 

      this.$loginClicks.pipe(
        exhaustMap(()=>{
          return this.http.get('https://jsonplaceholder.typicode.com/users')
        })
      ).subscribe((res:any)=>{
        console.log(res, 'exhaust login');
      })
  }



  // Exhaust Map  examples - 
  onLoginExhaust() {
    this.$loginClicks.next();
  }

  /* ---------------- ngOnInit ---------------- */

  ngOnInit(): void {
    // of()
    of([1, 2, 3], 'abcdef').subscribe(value => {
      console.log('of:', value);
      this.ofOperatorData.push(value);
    });

    // from()
    from('abcdef').subscribe(value => {
      console.log('from:', value);
      this.fromOperatorData.push(value);
    });

  /* ---------------- Range Operator ---------------- */
    range(5, 7).subscribe(value => {
      console.log('range:', value);
      this.rangeOperatorData.push(value);
    });

  /* ---------------- Interval Operator ---------------- */
    interval(5000)
      .pipe(take(5))
      .subscribe(value => {
        console.log('interval:', value);
        this.intervalValue = value;
        this.intervalData.push(value);
      });

  /* ---------------- Map Operator ---------------- */
    of(1, 2, 3)
      .pipe(map(v => v * 3))
      .subscribe(value => {
        console.log('map:', value);
        this.mapData.push(value);
      });

      

  /* ---------------- Filter Operator ---------------- */
    of(7, 78, 89)
      .pipe(filter(v => v > 50))
      .subscribe(value => {
        console.log('filter:', value);
        this.filterData.push(value);
      });

      // LP Examples
      this.numberList1$.pipe(
        map((result)=> result.filter(m=>m%2==0))
      ).subscribe((res)=>{
        console.log(res, 'of observable: map operator for even numbers');
      })

      this.numberList2$.pipe(filter(num=>num %2==0)).subscribe((filterNum:number)=>{
        console.log(filterNum, 'from observable: filter operator for even numbers');
      })

  /* ---------------- Merge Operator ---------------- */
    this.mergeObs3.subscribe(
      (data)=>{
        console.log(data, 'Merge data');
        this.mergedData.push(data);
      }
    )

  /* ---------------- Take Operator ---------------- */
    this.takeObs.subscribe(
      (data)=>{
        console.log(data, 'take data');
        this.takeData.push(data);
      }
    )

    this.pluckObs.subscribe(
      (data)=>{
        console.log(data, 'pluck data');
        this.pluckData.push(data);
      }
    )

    this.distinctObs.subscribe(
      (data)=>{
        console.log(data, 'distinct data');
        this.distinctData.push(data)
      }
    )
  }

  

  /* ---------------- ngAfterViewInit ---------------- */

  ngAfterViewInit(): void {
    // Button clicks
    fromEvent(this.btn.nativeElement, 'click')
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.clickCount++;
        console.log('clickCount:', this.clickCount);
      });

    // Input typing
    fromEvent<KeyboardEvent>(this.input.nativeElement, 'keyup')
      .pipe(
        map(event => (event.target as HTMLInputElement).value),
        takeUntil(this.destroy$)
      )
      .subscribe(value => {
        console.log('typed:', value);
        this.typedValue = value;
      });

    fromEvent(this.dbInput.nativeElement, 'keyup')
      .pipe(
        map(event => (event.target as HTMLInputElement).value),
        debounceTime(1000),             // ⭐ key operator
        distinctUntilChanged(),        // avoid duplicates
        takeUntil(this.destroy$)
      )
      .subscribe(
        (value)=>{
          console.log(value, 'dbinput value');
          this.searchTerm = value;
        }
    )
  }

  /* ---------------- cleanup ---------------- */

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }


  observableEx = `
import { Observable } from 'rxjs';

const numbers$ = new Observable<number>(observer => {
  observer.next(10);
  observer.next(20);
  observer.next(30);
  observer.complete();
});

numbers$.subscribe({
  next: value => console.log(value),
  error: error => console.error(error),
  complete: () => console.log('Completed')
});

Output:
10
20
30
Completed
`

observerEx = `
const observer = {
  next: (value: number) => console.log(value),
  error: (err: unknown) => console.error(err),
  complete: () => console.log('Completed')
};

Subscribe using it:
numbers$.subscribe(observer);

You can also provide only the callbacks you need:
numbers$.subscribe(value => console.log(value));
`

subscribeEx = `
this.http.get<Employee[]>('/api/employees')
  .subscribe({
    next: employees => {
      console.log(employees);
    },
    error: error => {
      console.error(error);
    },
    complete: () => {
      console.log('Request completed');
    }
  });
`

subscribeEx2 = `
const subscription = numbers$.subscribe(value => {
  console.log(value);
});

subscription.unsubscribe();
`

promiseEx = `
const promise = fetch('/api/employees');

promise.then(response => {
  console.log(response);
});
`

ObservableExm = `
this.http.get<Employee[]>('/api/employees')
  .pipe(
    map(employees => employees.filter(e => e.active))
  )
  .subscribe(activeEmployees => {
    console.log(activeEmployees);
  });
`

ofObs = `
import { of } from 'rxjs';

of(10, 20, 30).subscribe(console.log);
Output: 
10
20
30
`

fromObs = `
import { from } from 'rxjs';

from([10, 20, 30]).subscribe(console.log);

Output:
10
20
30
`

intervalObs = `
import { interval } from 'rxjs';

interval(1000).subscribe(value => {
  console.log(value);
});

Output over time:
0
1
2
3
...
`

timerObs = `
import { timer } from 'rxjs';

timer(3000).subscribe(() => {
  console.log('Executed after 3 seconds');
});
`

mapOpr = `
import { of, map } from 'rxjs';

of(1, 2, 3)
  .pipe(map(value => value * 10))
  .subscribe(console.log);

  Output: 10, 20, 30
`

filterOpr = `
import { of, filter } from 'rxjs';

of(1, 2, 3, 4, 5, 6)
  .pipe(filter(value => value % 2 === 0))
  .subscribe(console.log);

  Output: 2, 4, 6
`

tapOpr = `
import { of, tap, map } from 'rxjs';

of(5)
  .pipe(
    tap(value => console.log('Before:', value)),
    map(value => value * 2),
    tap(value => console.log('After:', value))
  )
  .subscribe();

  Output:
  Before: 5
  After: 10
`

subjectEx = `
import { Subject } from 'rxjs';

const subject = new Subject<string>();

subject.subscribe(value => console.log('A:', value));

subject.next('Hello');
subject.next('Angular');

Output:
A: Hello
A: Angular
`

behaviourSubj = `
import { BehaviorSubject } from 'rxjs';

const userSubject = new BehaviorSubject<string>('Guest');

userSubject.subscribe(value => console.log('A:', value));

userSubject.next('Santhosh');

userSubject.subscribe(value => console.log('B:', value));

Output:
A: Guest
A: Santhosh
B: Santhosh
`

replaySubject = `
import { ReplaySubject } from 'rxjs';

const subject = new ReplaySubject<number>(2);

subject.next(10);
subject.next(20);
subject.next(30);

subject.subscribe(console.log);

Output:
20
30
`

asyncSubject = `
import { AsyncSubject } from 'rxjs';

const subject = new AsyncSubject<number>();

subject.subscribe(console.log);

subject.next(10);
subject.next(20);
subject.complete();

Output:
20
`

switchMap = `
this.searchControl.valueChanges
  .pipe(
    debounceTime(300),
    distinctUntilChanged(),
    switchMap(term =>
      this.employeeService.search(term)
    )
  )
  .subscribe(results => {
    this.results = results;
  });
`

mergeMap = `
from([1, 2, 3])
  .pipe(
    mergeMap(id =>
      this.employeeService.getEmployee(id)
    )
  )
  .subscribe(console.log);
`

concatMap = `
from([1, 2, 3])
  .pipe(
    concatMap(id =>
      this.employeeService.updateEmployeeStatus(id)
    )
  )
  .subscribe(console.log);
`

exhaustMap = `
this.loginClicks$
  .pipe(
    exhaustMap(() =>
      this.authService.login()
    )
  )
  .subscribe();
`

forkJoin = `
forkJoin({
  employees: this.employeeService.getEmployees(),
  departments: this.departmentService.getDepartments(),
  roles: this.roleService.getRoles()
}).subscribe(({ employees, departments, roles }) => {
  this.employees = employees;
  this.departments = departments;
  this.roles = roles;
});
`

combineLatest = `
combineLatest([
  this.searchControl.valueChanges,
  this.categoryControl.valueChanges
]).subscribe(([search, category]) => {
  console.log({ search, category });
});
`

zip = `
zip(
  of('A', 'B', 'C'),
  of(1, 2, 3)
).subscribe(console.log);

Output:
['A', 1]
['B', 2]
['C', 3]
`

debounceTime = `
this.searchControl.valueChanges
  .pipe(
    debounceTime(300)
  )
  .subscribe(term => {
    this.searchEmployees(term);
  });
`

distinctUntilChanged = `
of('Angular', 'Angular', 'React', 'React', 'Vue')
  .pipe(distinctUntilChanged())
  .subscribe(console.log);

  Output:
Angular
React
Vue
`

catchErrors = `
this.employeeService.getEmployees()
  .pipe(
    catchError(error => {
      console.error(error);
      return of([]);
    })
  )
  .subscribe(employees => {
    this.employees = employees;
  });
`

retry = `
this.employeeService.getEmployees()
  .pipe(
    retry(2),
    catchError(error => {
      console.error('Request failed', error);
      return throwError(() => error);
    })
  )
  .subscribe();
`

finalize = `
this.loadingService.show();

this.employeeService.getEmployees()
  .pipe(
    finalize(() => this.loadingService.hide())
  )
  .subscribe({
    next: data => this.employees = data,
    error: error => console.error(error)
  });
`

takeUntilDestroyed = `
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { DestroyRef, inject } from '@angular/core';

private destroyRef = inject(DestroyRef);

ngOnInit(): void {
  this.searchControl.valueChanges
    .pipe(
      takeUntilDestroyed(this.destroyRef)
    )
    .subscribe(value => {
      console.log(value);
    });
}
`

takeUntil = `
private destroy$ = new Subject<void>();

ngOnInit(): void {
  this.searchControl.valueChanges
    .pipe(takeUntil(this.destroy$))
    .subscribe(value => console.log(value));
}

ngOnDestroy(): void {
  this.destroy$.next();
  this.destroy$.complete();
}
`

take = `
interval(1000)
  .pipe(take(3))
  .subscribe(console.log);

Output:
0
1
2
`

asyncPipe = `
employees: Employee[] = [];

ngOnInit(): void {
  this.employeeService.getEmployees()
    .subscribe(data => {
      this.employees = data;
    });
}

You can expose the Observable:
employees$ = this.employeeService.getEmployees();

Then use the template:

@if (employees$ | async; as employees) {
  @for (employee of employees; track employee.id) {
    <p>{{ employee.name }}</p>
  }
} @else {
  <p>Loading employees...</p>
}
`
}

