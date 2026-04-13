import { Component, inject, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { Observables } from '../observables/observables';
import { ObserableData } from '../../../services/obserable-data';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-subjects',
  imports: [CommonModule, FormsModule],
  templateUrl: './subjects.html',
  styleUrl: './subjects.scss'
})
export class Subjects implements OnInit {
  // Subject:

  studentName$= new Subject();
  rollNo$ = new Subject<number>()
  takeTill=new Subject<void>();
  // initialSubject$ = new Subject("11"); 
  // // Here for Subjects we cant initilize the vale. But in behaviour subject we can set;
  // Real example
  courseName$: Subject<string> = new Subject<string>();


  // BehaviourSubject:
  obsServ = inject(ObserableData);

  // Share Replay
  userId: number=0;

  constructor() {
  // Subject:
    setTimeout(() => {
      this.studentName$.next("Angular 20");
      this.rollNo$.next(12);
      this.takeTill.next();
      // Behaviour subject we can initilize the value in service and here in construstor also and gives the latest value
      this.obsServ.courseDuration$.next('3 monthss')
    }, 4000);

    
  }

  ngOnInit(): void {
    // Subject:
    this.studentName$.subscribe(res=>{
      console.log(res);
    })
    this.rollNo$.subscribe(res=>{
      console.log(res);
    })


    // BehaviourSubject:
    this.obsServ.courseDuration$.subscribe((res:any)=>{
      console.log(res);
    })

    this.obsServ.$roleBehaviour.subscribe((behSub:string)=>{
      debugger;
      console.log(behSub, 'Behaviour subject emited data receives');
    })

    this.obsServ.$roleSubject.subscribe((sub:string)=>{
      debugger;
      console.log(sub, 'Behaviour subject emited data receives');
    })
    
  }

  getUser() {
    this.obsServ.getUserById(this.userId).subscribe((res:any)=>{
      debugger;
    })
  }
}
