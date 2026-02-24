# Reactive Forms with Fake API Example

This is a comprehensive example demonstrating how to use **Reactive Forms** in Angular with a fake API service.

## Features Demonstrated

### 1. **Reactive Forms**
   - FormBuilder setup with validation rules
   - Form control management
   - Real-time error validation
   - Form state management (pristine, dirty, touched, valid)

### 2. **Fake API Service**
   - GET all users
   - GET single user by ID
   - POST (Create new user)
   - PUT (Update existing user)
   - DELETE (Remove user)
   - Network delay simulation
   - Error handling

### 3. **User Interface Features**
   - **List View**: Display all users in a table with edit/delete actions
   - **Create View**: Form to add new users
   - **Edit View**: Form to update existing users
   - Loading spinner during API calls
   - Error messages display
   - Success messages display
   - Form validation feedback

### 4. **State Management**
   - Loading states
   - Submitting states
   - Error handling
   - Success notifications
   - Modal-like form transitions

### 5. **Form Validation**
   - Required field validation
   - Email format validation
   - Minimum length validation
   - Password requirements
   - Real-time error messages

## Component Structure

```
reactive-forms-api/
├── reactive-forms-api.ts           # Component logic
├── reactive-forms-api.html         # Template with Bootstrap styling
├── reactive-forms-api.scss         # Component styling
├── reactive-forms-api.spec.ts      # Component tests
├── user-api.service.ts             # Fake API service
├── user-api.service.spec.ts        # Service tests
```

## How to Use

### 1. Import the Component
```typescript
import { ReactiveFormsApiComponent } from './app-pages/reactive-forms-api/reactive-forms-api';

@Component({
  selector: 'app-root',
  imports: [ReactiveFormsApiComponent, /* ... */],
  // ...
})
```

### 2. Add to Template
```html
<app-reactive-forms-api></app-reactive-forms-api>
```

### 3. Add Routing (Optional)
```typescript
{
  path: 'reactive-forms-api',
  component: ReactiveFormsApiComponent
}
```

## Key Functionalities Explained

### List View
- Displays all users fetched from the fake API
- Shows loading state while fetching
- Edit button opens the form in edit mode
- Delete button removes user after confirmation
- Add New User button opens form in create mode

### Form Validation
```typescript
name: ['', [Validators.required, Validators.minLength(3)]],
email: ['', [Validators.required, Validators.email]],
password: ['', [Validators.minLength(6)]]
```

### API Integration
```typescript
// Create user
this.userApiService.createUser(formData).subscribe({
  next: (newUser) => { /* Handle success */ },
  error: (err) => { /* Handle error */ }
});
```

### State Management
- `loading`: Shown during initial data fetch
- `submitting`: Shown during form submission
- `error`: Displays error messages
- `success`: Shows success notifications
- `mode`: Controls which view to display (list/create/edit)

## FormGroup Example

```typescript
this.userForm = this.fb.group({
  id: [0],
  name: ['', [Validators.required, Validators.minLength(3)]],
  username: ['', [Validators.required, Validators.minLength(5)]],
  email: ['', [Validators.required, Validators.email]],
  password: ['', [Validators.minLength(6)]],
  city: [''],
  state: ['']
});
```

## Observable Subscription Pattern

```typescript
this.userApiService.getUsers().subscribe({
  next: (data) => { /* Handle data */ },
  error: (err) => { /* Handle error */ },
  complete: () => { /* Handle completion */ }
});
```

## Error Handling

The component handles:
- API errors (displayed in red alert box)
- Validation errors (displayed below each field)
- Missing required fields
- Invalid email format
- Password minimum length

## Bootstrap Classes Used

- `.container`, `.row`, `.col-*`: Grid layout
- `.card`, `.card-body`: Card UI
- `.btn`, `.btn-primary`: Buttons
- `.table`, `.table-striped`: Tables
- `.alert`, `.alert-danger`: Alerts
- `.spinner-border`: Loading spinners
- `.text-danger`: Error text styling
- `.mb-*`: Margin bottom utilities

## RxJS Patterns Used

- `of()`: Create observable from value
- `delay()`: Simulate network latency
- `throwError()`: Observable error handling
- `subscribe()`: Subscribe to observables
- Error and success callbacks

## Console Logging

The component logs all operations to the browser console:
- User queries
- API calls
- Form submissions
- Errors

## Testing Tips

1. Check browser console to see API calls
2. Notice the 1-1.5 second delay simulating network
3. Try creating, updating, and deleting users
4. Test form validation with invalid inputs
5. Observe state changes (loading, submitting, etc.)

## Next Steps

To extend this example:
- Replace fake API with real HTTP calls using `HttpClient`
- Add pagination for large data sets
- Implement search/filter functionality
- Add confirmation dialogs
- Add animations for transitions
- Implement local storage caching
- Add user roles and permissions
