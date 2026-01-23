import { Component } from '@angular/core';

@Component({
  selector: 'app-templates',
  imports: [],
  templateUrl: './templates.html',
  styleUrl: './templates.scss'
})
export class Templates {
  email="";
  updateEmail(input:string) {
    console.log(input);
    this.email=input
  }

}
