import { AfterViewChecked, AfterViewInit, ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-my-ul-list',
  imports: [],
  templateUrl: './my-ul-list.html',
  styleUrl: './my-ul-list.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MyUlList implements OnInit, AfterViewInit, AfterViewChecked {
  @Input() itemList:string[] = [];

  constructor() {
    console.log("constructor On click UI Rendered");
  }

  ngOnInit(): void {
    console.log("Oninit On click UI Rendered");
  }

  ngAfterViewInit(): void {
    console.log("ngAfterViewInit On click UI Rendered");
  }

  ngAfterViewChecked(): void {
    console.log("viewChecked On click UI Rendered");
    
  }

}
