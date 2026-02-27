import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-tabs',
  imports: [],
  templateUrl: './tabs.html',
  styleUrl: './tabs.scss'
})
export class Tabs {

  @Input() tabsList: string[] = []

}
