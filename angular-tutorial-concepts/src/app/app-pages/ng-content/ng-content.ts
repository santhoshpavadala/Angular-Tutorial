import { Component, Input } from '@angular/core';
import { MyCard } from '../../app-shared/my-card/my-card';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ng-content',
  imports: [MyCard, CommonModule],
  templateUrl: './ng-content.html',
  styleUrl: './ng-content.scss',
})
export class NgContent {
  numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  login = false;


  // For ng-container example
  isLoader: boolean = true;
  isLoaded: boolean = true;
  constructor() {
    setTimeout(()=>{
      this.isLoader = false
    }, 5000)

  }

  studentList: any[] = [
    {
      id: 1,
      name: 'Santhosh',
      city: 'Hyderabad',
      state: 'Telangana',
    },
    {
      id: 2,
      name: 'Rahul',
      city: 'Bangalore',
      state: 'Karnataka',
    },
    {
      id: 3,
      name: 'Anjali',
      city: 'Chennai',
      state: 'Tamil Nadu',
    },
  ];
}
