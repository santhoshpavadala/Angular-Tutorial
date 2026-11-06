import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ɵAcxChangeDetectionStrategy } from '@angular/core';
import { MyUlList } from '../../app-shared/my-ul-list/my-ul-list';

@Component({
  selector: 'app-change-detection',
  imports: [MyUlList],
  templateUrl: './change-detection.html',
  styleUrl: './change-detection.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChangeDetection implements OnInit{

  name:string = "Santhosh";

  apiResponse:any[] = [];

  cityList:string[]=["Hyd", "Mubai", "Pune", "Nagpur"]

  constructor(private http: HttpClient, private cd: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.http.get("https://jsonplaceholder.typicode.com/users").subscribe({
      next: (res:any)=> {
        this.apiResponse = res;
        // this.cd.detectChanges();

        setTimeout(()=>{
        this.cd.detectChanges();
        },2000)
      }
    })
  }

  nameChange() {
      this.name = "Angular Developer"
  }

  signalChnageDetection = `
import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-score',
  standalone: true,
  template: \`
    <p>Score: {{ score() }}</p>
    <button (click)="increase()">Increase</button>
  \`
})
export class ScoreComponent {
  score = signal(0);

  increase() {
    this.score.update(value => value + 1);
  }
}
`

changeDetection = `
import { Component } from '@angular/core';

@Component({
  selector: 'app-counter',
  standalone: true,
  template: \`
    <h2>Count: {{ count }}</h2>
    <button (click)="increment()">Increment</button>
  \`
})
export class CounterComponent {
  count = 0;

  increment() {
    this.count++;
  }
}
`

onPush = `
import {
  ChangeDetectionStrategy,
  Component,
  input
} from '@angular/core';

@Component({
  selector: 'app-user',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: \`
    <h2>{{ name() }}</h2>
  \`
})
export class UserComponent {
  name = input.required<string>();
}
`

markForCheck = `
import {
  ChangeDetectorRef,
  Component
} from '@angular/core';

@Component({
  selector: 'app-status',
  standalone: true,
  template: \`<p>{{ status }}</p>\`
})
export class StatusComponent {
  status = 'Waiting';

  constructor(private cdr: ChangeDetectorRef) {}

  updateStatus() {
    this.status = 'Completed';
    this.cdr.markForCheck();
  }
}`

}
