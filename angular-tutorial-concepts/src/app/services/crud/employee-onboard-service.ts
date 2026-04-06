import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class EmployeeOnboardService {
  getUrl = "https://api.freeprojectapi.com/api/EmployeeOnboarding/GetCompanies";
  postUrl = "https://api.freeprojectapi.com/api/EmployeeOnboarding/PostCompany";
  putUrl = "https://api.freeprojectapi.com/api/EmployeeOnboarding/PutCompany?id=";
  deleteUrl = "https://api.freeprojectapi.com/api/EmployeeOnboarding/DeleteCompany?id="
  http = inject(HttpClient);

  getCompany() {
    return this.http.get(this.getUrl);
  }

  postCompany(obj: any) {
    return this.http.post(this.postUrl, obj)
  }

  putCompany(id:number, obj:any) {
    return this.http.put(this.putUrl+id, obj)
  }

  deleteCompany(id:number) {
    return this.http.delete(this.deleteUrl+id)
  }
  
}
