import { CommonModule, NgClass } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { MapService } from '../../services/RXJS-Opearators/map-service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-alert',
  imports: [NgClass, CommonModule, FormsModule],
  templateUrl: './alert.html',
  styleUrl: './alert.scss'
})
export class Alert implements OnInit {

  @Input() alertType: string = '';
  @Input() alertMessage: string = '';

  // This var is used to viewchild example to get child data to parent
  viewChildData = "This is View child data using component method";

  ngOnInit(): void {
    
  }

  title="This is Child Title"
  showAlert() {
    alert("Hello, iam from child");
  }

}
