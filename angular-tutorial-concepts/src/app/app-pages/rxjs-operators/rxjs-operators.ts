import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild
} from '@angular/core';
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  from,
  fromEvent,
  interval,
  map,
  merge,
  of,
  pluck,
  range,
  skip,
  Subject,
  take,
  takeUntil
} from 'rxjs';

@Component({
  selector: 'app-rxjs-operators',
  standalone: true,
  imports: [CommonModule],
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

    // range()
    range(5, 7).subscribe(value => {
      console.log('range:', value);
      this.rangeOperatorData.push(value);
    });

    // interval()
    interval(5000)
      .pipe(take(5))
      .subscribe(value => {
        console.log('interval:', value);
        this.intervalValue = value;
        this.intervalData.push(value);
      });

    // map()
    of(1, 2, 3)
      .pipe(map(v => v * 3))
      .subscribe(value => {
        console.log('map:', value);
        this.mapData.push(value);
      });

    // filter()
    of(7, 78, 89)
      .pipe(filter(v => v > 50))
      .subscribe(value => {
        console.log('filter:', value);
        this.filterData.push(value);
      });

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
