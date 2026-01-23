import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { from, interval, of, range, take } from 'rxjs';


@Component({
  selector: 'app-rxjs-operators',
  imports: [CommonModule],
  templateUrl: './rxjs-operators.html',
  styleUrl: './rxjs-operators.scss'
})
export class RxjsOperators implements OnInit {
// Of Variables
  ofData = [1, 2, 3]; //[1, 2, 3], "abcdef"
  ofOperatorData: any[]=[];

  // From Variables
  fromData="abcdef"; // [1, 2, 3], "abcdef"
  fromOperatorData: any[]=[];

  // Range Variables
  currentPage = 5; // start
  totalPages = 7; // count
  rangeOperatorData: any[]=[];

  // Interval Variables
  intervalValue = 0;
  intervalData: number[] = [];

  constructor() {}

  ngOnInit(): void {
    of(this.ofData, "abcdef").subscribe( //of operator take multiple data inputs
      (data)=>{
      console.log(data, 'of data');
      this.ofOperatorData.push(data);
    })

    from(this.fromData).subscribe( //from is only takes one iterable like strings and arrays, not takes number
      (data)=>{
        console.log(data, 'from data');
        this.fromOperatorData.push(data);
      }
    )

    range(this.currentPage, this.totalPages).subscribe(
      (data)=>{
        console.log(data, 'range data');
        this.rangeOperatorData.push(data);
      }
    )

    interval(5000).pipe(take(5)).subscribe(
      (value)=>{
        console.log(value, 'interval data');
        this.intervalValue=value;
        this.intervalData.push(value)
      }
    )
  }
}
