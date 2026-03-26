import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {

  getUrl = "https://api.freeprojectapi.com/api/EmployeeApp/GetEmployees";
  postUrl = "https://api.freeprojectapi.com/api/EmployeeApp/CreateEmployees"

  http = inject(HttpClient)

  getEmployee() {
    return this.http.get(this.getUrl);
  }

  postEmployee(emp:any) {
    return this.http.post(this.postUrl, emp )
  }
  
}
