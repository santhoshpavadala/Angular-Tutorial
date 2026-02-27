import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CustomPipesPipe } from '../../Pipes/custom-pipes-pipe';
import { HttpClient } from '@angular/common/http';
import { NodataPipe } from '../../Pipes/nodata-pipe';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-pipes',
  imports: [CommonModule, CustomPipesPipe, NodataPipe ],
  templateUrl: './pipes.html',
  styleUrl: './pipes.scss'
})
export class Pipes implements OnInit {
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
  rollNumberList=[1,2,3,4,5,6,7,8,99,22]



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

  constructor(private http: HttpClient) {}


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
