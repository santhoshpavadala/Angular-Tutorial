import { HttpClient } from '@angular/common/http';
import { inject, Inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Goaltrackerservice {
  getUrl = "https://api.freeprojectapi.com/api/GoalTracker/getAllUsers";
  postUrl = "https://api.freeprojectapi.com/api/GoalTracker/register";
  putUrl = "https://api.freeprojectapi.com/api/GoalTracker/updateUser?id=";
  deleteUrl = "https://api.freeprojectapi.com/api/GoalTracker/deleteUserById?id=";

  http = inject(HttpClient)


  getGoal() {
    return this.http.get(this.getUrl);
  }

  // In post we need to pass an object parameter
  postGoal(post: any) {
    return this.http.post(this.postUrl, post);
  }

  // In post we need to pass an id, object as parameters
  putGoal(id:number, goal: any) {
    return this.http.put(this.putUrl+id, goal )
  }

  // In post we need to pass an id as parameters
  deleteGoal(id:number) {
    return this.http.delete(this.deleteUrl+id)
  }
  
}
