import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CustomPipesPipe } from '../../Pipes/custom-pipes-pipe';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-pipes',
  imports: [CommonModule, CustomPipesPipe ],
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

  //custom pipes
  person={
    "name": "Santhosh", "gender": "m"
  }
  wish:string="Good Morning"


  tableHeaders = ["Name", "Email", "Number"];
  usersData: any;

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
