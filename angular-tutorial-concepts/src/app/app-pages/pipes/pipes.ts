import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CustomPipesPipe } from '../../Pipes/custom-pipes-pipe';
import { HttpClient } from '@angular/common/http';
import { NodataPipe } from '../../Pipes/nodata-pipe';
import { Observable } from 'rxjs';
import { FullnamePipe } from '../../Pipes/fullname-pipe';
import { TaxPipe } from '../../Pipes/tax-pipe';
import { UsersCountPipe } from '../../Pipes/users-count-pipe';
import { FormsModule } from '@angular/forms';
import { SearchPipe } from "../../Pipes/search-pipe";

@Component({
  selector: 'app-pipes',
  imports: [CommonModule, FormsModule, CustomPipesPipe, NodataPipe, FullnamePipe, TaxPipe, UsersCountPipe, SearchPipe],
  templateUrl: './pipes.html',
  styleUrl: './pipes.scss'
})
export class Pipes implements OnInit {
  firName: string = "Santhosh";
  lasName: string = "Pavadala";
  

  pipeName='angular pipe';
  salary=45000;
  pipeJson={
    'name': 'Santhosh',
    'age': 30,
    'location': 50000
  }
  DOB = new Date();
  percentage: number=0.98;
  sliceText='Microsoft';

  // Array Pipe
  rollNumberList=[1,2,3,4,5,6,7,8,99,22];
  users = [ 'Santhosh', 'Rahul' ];



  //custom pipes
  person={
    "name": "Santhosh", "gender": "m"
  }
  wish:string="Good Morning"

  studentObj={
    name: 'ABC',
    city: '',
    state: 'Telangana',
    contact: {
      phone: null,
      mobile: '99494949'
    }
  }


  tableHeaders = ["Name", "Email", "Number"];
   usersData!: Observable<any[]>;

  //  Impure Pipe examples
  employees = [
     { id: 1, name: 'Santhosh' },
  { id: 2, name: 'Rahul' },
  { id: 3, name: 'Kiran' }
  ];
  searchText = '';

  constructor(private http: HttpClient) {
    this.users.push('Kiran')
  }


  ngOnInit(): void {
    // this.http.get<any[]>('https://jsonplaceholder.typicode.com/users').subscribe(
    //   (data) => {
    //     console.log('DATA:', data); // ✔ already printing
    //     this.usersData = data;
    //   }
    // );

    this.usersData = this.http.get<any[]>('https://jsonplaceholder.typicode.com/users')
    //in html | async Above expression  is example of async pipe, with hat we can directly access the api data without subscrbe
  }

}
