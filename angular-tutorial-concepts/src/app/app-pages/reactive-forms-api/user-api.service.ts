import { Injectable } from '@angular/core';
import { delay, Observable, of, throwError } from 'rxjs';

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  password?: string;
  city: string;
  state: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserApiService {
  
  // Fake database
  private users: User[] = [
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

  constructor() { }

  // GET - Fetch all users
  getUsers(): Observable<User[]> {
    console.log('Fetching users from API...');
    return of(this.users).pipe(delay(1500)); // Simulate network delay
  }

  // GET - Fetch single user by ID
  getUser(id: number): Observable<User> {
    console.log(`Fetching user with ID: ${id}`);
    const user = this.users.find(u => u.id === id);
    
    if (user) {
      return of(user).pipe(delay(1000));
    } else {
      return throwError(() => new Error(`User with ID ${id} not found`));
    }
  }

  // POST - Create new user
  createUser(user: User): Observable<User> {
    console.log('Creating user:', user);
    
    // Simulate validation
    if (!user.name || !user.email) {
      return throwError(() => new Error('Name and email are required'));
    }

    // Add if not already present
    const newUser: User = {
      ...user,
      id: Math.max(...this.users.map(u => u.id), 0) + 1
    };
    
    this.users.push(newUser);
    return of(newUser).pipe(delay(1500));
  }

  // PUT - Update existing user
  updateUser(id: number, user: Partial<User>): Observable<User> {
    console.log(`Updating user with ID: ${id}`, user);
    
    const index = this.users.findIndex(u => u.id === id);
    
    if (index === -1) {
      return throwError(() => new Error(`User with ID ${id} not found`));
    }

    this.users[index] = { ...this.users[index], ...user };
    return of(this.users[index]).pipe(delay(1500));
  }

  // DELETE - Delete user
  deleteUser(id: number): Observable<{ message: string }> {
    console.log(`Deleting user with ID: ${id}`);
    
    const index = this.users.findIndex(u => u.id === id);
    
    if (index === -1) {
      return throwError(() => new Error(`User with ID ${id} not found`));
    }

    this.users.splice(index, 1);
    return of({ message: `User ${id} deleted successfully` }).pipe(delay(1500));
  }
}
