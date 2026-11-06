import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-http-interceptors',
  imports: [],
  templateUrl: './http-interceptors.html',
  styleUrl: './http-interceptors.scss'
})
export class HttpInterceptors implements OnInit {

  constructor(private http: HttpClient){

  }

  ngOnInit(): void {
    // get('https://fakestoreapi.com/products')
    // post(post('https://fakestoreapi.com/products', {name: 'santhosh'})
    this.http.post('https://fakestoreapi.com/products', {name: 'component body'}).subscribe(
      (data)=>{
        console.log(data);
      }
    )
  }

  compHttp = `
export class EmployeeComponent {

  private http = inject(HttpClient);

  loadEmployees() {
    this.http.get('/api/employees')
      .subscribe(...);
  }
}
`

serviceHttp = `
Service:
@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private http = inject(HttpClient);

  getEmployees() {
    return this.http.get<Employee[]>('/api/employees');
  }
}

Component:
export class EmployeeComponent {

  private employeeService = inject(EmployeeService);

  loadEmployees() {
    this.employeeService
      .getEmployees()
      .subscribe(employees => {
        console.log(employees);
      });
  }
}
`

configHttp = `
import { ApplicationConfig } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient()
  ]
};

Then inject HttpClient:
import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';

private http = inject(HttpClient);
`

getRequest = `
getEmployees() {
  return this.http.get<Employee[]>(
    '/api/employees'
  );
}

Component:
this.employeeService
  .getEmployees()
  .subscribe({
    next: employees => {
      console.log(employees);
    },
    error: error => {
      console.error(error);
    }
  });

  Why Employee[]?
  This is a TypeScript type describing the expected response.
  interface Employee {
  id: number;
  name: string;
  email: string;
}

Then:
this.http.get<Employee[]>('/api/employees');

provides compile-time typing for the response.

Important: TypeScript typing does not validate that the backend actually returned that shape at runtime.
`

postRequest = `
createEmployee(employee: Employee) {
  return this.http.post<Employee>(
    '/api/employees',
    employee
  );
}

Example request body:
{
  name: 'Santhosh',
  email: 'santhosh@gmail.com',
  department: 'Frontend'
}

Usage:
this.employeeService
  .createEmployee(employee)
  .subscribe({
    next: response => {
      console.log('Created:', response);
    },
    error: error => {
      console.error(error);
    }
  });
`

putRequest = `
updateEmployee(employee: Employee) {
  return this.http.put<Employee>(
  \` /api/employees/$ {employee.id}\`,
    employee 
  );
}
`
patchRequest = `
updateEmployeeEmail(
  id: number,
  email: string
) {
  return this.http.patch<Employee>(
    \`/api/employees/$ {id}\`,
    { email }
  );
}
`

deleteRequest = `
deleteEmployee(id: number) {
  return this.http.delete<void>(
    \`/api/employees/$ {id}\`
  );
}

Usage:
this.employeeService
  .deleteEmployee(101)
  .subscribe({
    next: () => {
      console.log('Employee deleted');
    }
  });

`

reqBody = `
const employee = {
  name: 'Santhosh',
  email: 'santhosh@gmail.com'
};

this.http.post(
  '/api/employees',
  employee
);
`

httpResp = `
this.http.get<Employee[]>('/api/employees');

If you need the complete HTTP response, use:
this.http.get<Employee[]>(
  '/api/employees',
  {
    observe: 'response'
  }
);

Then:
.subscribe(response => {
  console.log(response.body);
  console.log(response.status);
  console.log(response.headers);
});

For example:
HttpResponse
├── body
├── headers
├── status
├── statusText
└── url

Q: How can you access HTTP status code and headers instead of only the response body?
Answer:
Use:
{
  observe: 'response'
}
`

httpError = `
import {
  HttpErrorResponse
} from '@angular/common/http';

this.employeeService
  .getEmployees()
  .subscribe({
    next: data => {
      console.log(data);
    },

    error: (error: HttpErrorResponse) => {
      console.error(
        'Status:',
        error.status
      );

      console.error(
        'Message:',
        error.message
      );
    }
  });
`

catchError = `
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

getEmployees() {
  return this.http
    .get<Employee[]>('/api/employees')
    .pipe(
      catchError(error => {
        console.error(
          'API Error',
          error
        );

        return throwError(
          () => error
        );
      })
    );
}
`

httpInterceptor = `
this.http.get(url, {
  headers: {
    Authorization: token
  }
});
`

functInterceptors = `
import {
  HttpInterceptorFn
} from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn =
  (req, next) => {

    const token =
      localStorage.getItem('token');

    if (!token) {
      return next(req);
    }

    const clonedRequest = req.clone({
      setHeaders: {
        Authorization: \`Bearer $ {token}\`
      }
    });

    return next(clonedRequest);
  };

Then register it in App Config:
import {
  provideHttpClient,
  withInterceptors
} from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(
      withInterceptors([
        authInterceptor
      ])
    )
  ]
};
`

reqClone = `
const clonedRequest = req.clone({
  setHeaders: {
    Authorization: \`Bearer $ {token}\`
  }
});

Then pass it to:
return next(clonedRequest);
`

authInterceptor = `
{
  "token": "eyJhbGciOi..."
}

You store the token:
localStorage.setItem(
  'token',
  response.token
);

Then the user calls:
GET /api/employees

The interceptor automatically changes it conceptually to:

GET /api/employees

Authorization:
Bearer eyJhbGciOi...

Flow:

Component
    ↓
EmployeeService
    ↓
HttpClient
    ↓
Auth Interceptor
    ↓
Add Authorization header
    ↓
Backend

This is a very strong interview explanation.
`

loadingInterceptor = `
this.loadingService.show();

this.http.get(url)
  .subscribe({
    next: data => {
      // ...
    },
    error: error => {
      // ...
    },
    complete: () => {
      this.loadingService.hide();
    }
  });

  Doing this for every API call is repetitive.
  An interceptor can centralize it.
  export const loadingInterceptor: HttpInterceptorFn =
  (req, next) => {

    const loadingService =
      inject(LoadingService);

    loadingService.show();

    return next(req).pipe(
      finalize(() => {
        loadingService.hide();
      })
    );
  };
`

errorInterceptor = `
export const errorInterceptor: HttpInterceptorFn =
  (req, next) => {

    const router = inject(Router);

    return next(req).pipe(
      catchError((error: HttpErrorResponse) => {

        if (error.status === 401) {
          router.navigate(['/login']);
        }

        return throwError(
          () => error
        );
      })
    );
  };

  For example:
API returns 401
       ↓
Error interceptor
       ↓
Clear authentication state
       ↓
Navigate to login

`

serviceArchitecture = `
@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private http = inject(HttpClient);

  private readonly apiUrl =
    '/api/employees';

  getEmployees() {
    return this.http.get<Employee[]>(
      this.apiUrl
    );
  }

  getEmployee(id: number) {
    return this.http.get<Employee>(
      \`$ {this.apiUrl}/$ {id}\`
    );
  }

  createEmployee(employee: Employee) {
    return this.http.post<Employee>(
      this.apiUrl,
      employee
    );
  }

  updateEmployee(
    id: number,
    employee: Employee
  ) {
    return this.http.put<Employee>(
      \`$ {this.apiUrl}/$ {id}\`,
      employee
    );
  }

  deleteEmployee(id: number) {
    return this.http.delete<void>(
      \`$ {this.apiUrl}/$ {id}\`
    );
  }
}
`

requestCancellation = `
this.searchControl.valueChanges
  .pipe(
    debounceTime(300),
    distinctUntilChanged(),
    switchMap(term =>
      this.employeeService.search(term)
    )
  )
  .subscribe(results => {
    this.results = results;
  });

  Flow:
  User types "san"
       ↓
API request

User types "sant"
       ↓
Previous request becomes unnecessary
       ↓
switchMap switches to latest request
`

httpParams = `
import { HttpParams } from '@angular/common/http';

getEmployees(
  page: number,
  size: number,
  search: string
) {
  const params = new HttpParams()
    .set('page', page)
    .set('size', size)
    .set('search', search);

  return this.http.get<Employee[]>(
    '/api/employees',
    { params }
  );
}

Angular generates the query string from the parameters.

Important HttpParams is immutable.

So this: params.set('page', 2);
doesn't mutate the original object unless you assign the returned instance.

Correct:
params = params.set('page', 2);
`

httpHeaders = `
import { HttpHeaders } from '@angular/common/http';

const headers = new HttpHeaders({
  'Content-Type': 'application/json'
});

return this.http.post(
  '/api/employees',
  employee,
  { headers }
);
`
  

}
