import { Component } from '@angular/core';
import { Alert } from "../../app-shared/alert/alert";
import { Tabs } from '../../app-shared/tabs/tabs';

@Component({
  selector: 'app-about',
  imports: [Alert, Tabs],
  templateUrl: './about.html',
  styleUrl: './about.scss'
})
export class About {


  altWarning:string ="Warning";
  altMsg:string ="This is Warning alert Message";

  tabCount = ['Tab1', 'Tab2', 'Tab3'];
}
