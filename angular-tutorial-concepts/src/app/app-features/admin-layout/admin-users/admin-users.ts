import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-users',
  imports: [ReactiveFormsModule],
  templateUrl: './admin-users.html',
  styleUrl: './admin-users.scss',
})
export class AdminUsers implements OnInit{
  userForm!: FormGroup;
  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.userForm = this.fb.group({
      name: [''],
      email: ['']
    });
  }
  
  canDeactivate(): boolean {

    if (this.userForm.dirty) {

      return confirm(
        'You have unsaved changes. Do you really want to leave?'
      );

    }

    return true;
  }
}
