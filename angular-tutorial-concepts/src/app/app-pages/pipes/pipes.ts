import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CustomPipesPipe } from '../../Pipes/custom-pipes-pipe';

@Component({
  selector: 'app-pipes',
  imports: [CommonModule, CustomPipesPipe],
  templateUrl: './pipes.html',
  styleUrl: './pipes.scss'
})
export class Pipes {
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
}
