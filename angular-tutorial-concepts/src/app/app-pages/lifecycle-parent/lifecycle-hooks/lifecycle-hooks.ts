
import { AfterContentChecked, AfterContentInit, AfterViewChecked, AfterViewInit, Component, DoCheck, Input, OnChanges, OnInit, SimpleChanges, ViewChild, viewChild } from '@angular/core';

@Component({
  selector: 'app-lifecycle-hooks',
  standalone: true,
  imports: [],
  templateUrl: './lifecycle-hooks.html',
  styleUrl: './lifecycle-hooks.scss'
})
export class LifecycleHooks implements OnChanges, OnInit, DoCheck, AfterViewInit, AfterViewChecked, AfterContentInit, AfterContentChecked {
  @Input() title:string="";
  @Input() mobiles:any[]=[];
  viewCheckedCount: number = 0;
  @ViewChild("ViewRef")viewchildData: any;

  constructor() {
    console.log(this.title, 'title check in constructor'); //CONSTRUCTON WONT GIVES INPUT DATA IN CONSOLE
  }
  // Onchanges Exampleswith input
  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes, 'ngOnChanges called input values' );
    console.log(this.title, 'title check in ngOnchanges');
  }

  ngOnInit(): void {
    console.log(this.title, 'title check in ngOnInit');
    console.log("OnInit called");
    console.log(this.viewchildData, 'viewchildData appeared'); //here viewchild data undefined comes not appears in this lifecycle.
  }

  ngDoCheck(): void {
    console.log("ngDoCheck called");
  }

  ngAfterViewInit(): void {
    console.log("AfterViewInit called");
    console.log(this.viewchildData, 'viewchildData appeared'); //here viewchild data only appears in this lifecycle only
  }

  ngAfterViewChecked(): void {
    console.log("AfterViewChecked called");
  }
  addCount() {
    this.viewCheckedCount++
  }

  ngAfterContentInit(): void {
    console.log("ngAfterContentInit called");
  }

  ngAfterContentChecked(): void {
    console.log("ngAfterContentChecked called");
  }
}
