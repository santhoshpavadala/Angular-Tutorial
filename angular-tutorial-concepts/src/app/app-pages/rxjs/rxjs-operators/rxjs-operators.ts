
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
}

