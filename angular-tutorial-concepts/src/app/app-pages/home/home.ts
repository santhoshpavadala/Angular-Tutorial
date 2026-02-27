import { Component, OnInit } from '@angular/core';
import { Mobile } from '../../services/mobile';
import { CommonModule } from '@angular/common';
import { Alert } from '../../app-shared/alert/alert';
import { Tabs } from "../../app-shared/tabs/tabs";

@Component({
  selector: 'app-home',
  imports: [CommonModule, Alert, Tabs],
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


  
  altSuccess:string ="Success";
  altMsg:string ="This is Success alert Message";

  tabCount:string[] = ['Tab1', 'Tab2', 'Tab3', 'Tab4', 'Tab5']
}
