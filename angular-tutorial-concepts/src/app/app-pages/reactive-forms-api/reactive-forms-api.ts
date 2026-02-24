import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserApiService, User } from './user-api.service';

@Component({
  selector: 'app-reactive-forms-api',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './reactive-forms-api.html',
  styleUrl: './reactive-forms-api.scss',
  changeDetection: ChangeDetectionStrategy.Default
})
export class ReactiveFormsApiComponent implements OnInit {
  userForm: FormGroup;
  users: User[] = [];
  selectedUser: User | null = null;
  
  // State management
  loading = false;
  submitting = false;
  error: string | null = null;
  success: string | null = null;
  mode: 'list' | 'create' | 'edit' = 'list';

  constructor(private fb: FormBuilder, private userApiService: UserApiService) {
    console.log('✓ ReactiveFormsApiComponent constructor called');
    this.userForm = this.fb.group({});
  }

  ngOnInit() {
    console.log('Component initialized');
    this.initializeForm();
    console.log('Form initialized');
    
    // Add test data immediately to see if UI works
    this.users = [
      {
        id: 1,
        name: 'John Doe',
        username: 'johndoe',
        email: 'john@example.com',
        city: 'New York',
        state: 'NY'
      },
      {
        id: 2,
        name: 'Jane Smith',
        username: 'janesmith',
        email: 'jane@example.com',
        city: 'Los Angeles',
        state: 'CA'
      }
    ];
    console.log('Test data loaded, loading from API...');
    this.loadUsers();
    console.log('Load users called');
  }

  initializeForm() {
    this.userForm = this.fb.group({
      id: [0],
      name: ['', [Validators.required, Validators.minLength(3)]],
      username: ['', [Validators.required, Validators.minLength(5)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.minLength(6)]],
      city: [''],
      state: ['']
    });
  }

  // Load all users from API
  loadUsers() {
    this.loading = true;
    this.error = null;
    console.log('Starting to load users from API...');
    
    this.userApiService.getUsers().subscribe({
      next: (data: User[]) => {
        console.log('✓ Data received from API:', data);
        this.users = data;
        this.loading = false;
      },
      error: (err: any) => {
        console.error('✗ Error loading users:', err);
        this.error = err?.message || 'Failed to load users. Showing test data instead.';
        this.loading = false;
      },
      complete: () => {
        console.log('✓ Observable completed');
      }
    });
  }

  // Edit user
  editUser(user: User) {
    this.selectedUser = user;
    this.mode = 'edit';
    this.userForm.patchValue(user);
    this.error = null;
    this.success = null;
  }

  // Create new user
  createNewUser() {
    this.mode = 'create';
    this.selectedUser = null;
    this.userForm.reset();
    this.error = null;
    this.success = null;
  }

  // Submit form (Create or Update)
  onSubmit() {
    if (this.userForm.invalid) {
      this.error = 'Please fill all required fields correctly';
      return;
    }

    this.submitting = true;
    this.error = null;
    this.success = null;

    const formData = this.userForm.value;

    if (this.mode === 'create') {
      this.userApiService.createUser(formData).subscribe({
        next: (newUser: User) => {
          this.users.push(newUser);
          this.success = `User '${newUser.name}' created successfully!`;
          this.submitting = false;
          this.mode = 'list';
          setTimeout(() => this.success = null, 3000);
        },
        error: (err) => {
          this.error = err.message || 'Failed to create user';
          this.submitting = false;
          console.error('Error creating user:', err);
        }
      });
    } else if (this.mode === 'edit' && this.selectedUser) {
      this.userApiService.updateUser(this.selectedUser.id, formData).subscribe({
        next: (updatedUser: User) => {
          const index = this.users.findIndex(u => u.id === updatedUser.id);
          if (index !== -1) {
            this.users[index] = updatedUser;
          }
          this.success = `User '${updatedUser.name}' updated successfully!`;
          this.submitting = false;
          this.mode = 'list';
          setTimeout(() => this.success = null, 3000);
        },
        error: (err) => {
          this.error = err.message || 'Failed to update user';
          this.submitting = false;
          console.error('Error updating user:', err);
        }
      });
    }
  }

  // Delete user
  deleteUser(user: User) {
    if (confirm(`Are you sure you want to delete ${user.name}?`)) {
      this.loading = true;
      this.userApiService.deleteUser(user.id).subscribe({
        next: () => {
          this.users = this.users.filter(u => u.id !== user.id);
          this.success = `User '${user.name}' deleted successfully!`;
          this.loading = false;
          setTimeout(() => this.success = null, 3000);
        },
        error: (err) => {
          this.error = err.message || 'Failed to delete user';
          this.loading = false;
          console.error('Error deleting user:', err);
        }
      });
    }
  }

  // Cancel and go back to list
  cancel() {
    this.mode = 'list';
    this.selectedUser = null;
    this.userForm.reset();
    this.error = null;
  }

  // Check if field has error
  hasError(fieldName: string, errorType: string): boolean {
    const field = this.userForm.get(fieldName);
    return !!(field && field.hasError(errorType) && (field.touched || field.dirty));
  }

  // Get field
  getField(fieldName: string) {
    return this.userForm.get(fieldName);
  }
}
