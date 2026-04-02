import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule, MatFormField, MatLabel, MatError } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-material-reactive-forms',
  imports: [CommonModule, ReactiveFormsModule, MatFormField, MatLabel, MatError],
  templateUrl: './material-reactive-forms.html',
  styleUrl: './material-reactive-forms.scss',
})
export class MaterialReactiveForms {
  leaveForm!: FormGroup;

}
