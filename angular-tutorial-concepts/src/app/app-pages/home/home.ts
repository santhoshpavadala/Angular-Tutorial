import { Component, OnInit } from '@angular/core';
import { Mobile } from '../../services/mobile';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home implements OnInit{
  mobileList: string[]=[]
  constructor(private mobileData: Mobile) {}
  ngOnInit(): void {
    this.mobileList= this.mobileData.mobiles;

  }

  addMobile() {
    this.mobileData.mobiles.push("ZEN")
  }
}
