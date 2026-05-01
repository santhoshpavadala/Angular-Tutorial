import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-view-more',
  imports: [CommonModule],
  templateUrl: './view-more.html',
  styleUrl: './view-more.scss',
})
export class ViewMore {
  @Input() text: string = '';
  @Input() limit:number = 0;

  isExpanded: boolean = false;

  onToggleView() {
    this.isExpanded = !this.isExpanded;
  }

}
