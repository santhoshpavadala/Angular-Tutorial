import { HttpClient } from '@angular/common/http';
import { Inject, inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LeavetrackService {
  http=inject(HttpClient)

  getUrl = "https://api.freeprojectapi.com/api/LeaveTracker/getAllEmployee";
  postUrl = "https://api.freeprojectapi.com/api/LeaveTracker/CreateNewEmployee";
  putUrl = "https://api.freeprojectapi.com/api/LeaveTracker/UpdateEmployee/?id=";
  deleteUrl = "https://api.freeprojectapi.com/api/LeaveTracker/DeleteEmployee?id="

  getLeaves() {
    return this.http.get(this.getUrl);
  }

  postLeaves(obj: any) {
    return this.http.post(this.postUrl, obj);
  }

  updateLeaves(id: number,obj:any) {
    return this.http.put(this.putUrl+id, obj)
  }

  deleteLeaves(id: number) {
    return this.http.delete(this.deleteUrl+id)
  }
  
}
