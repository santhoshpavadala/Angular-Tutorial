import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  // constructor(private http: HttpClient) { }
  http=inject(HttpClient);

  private apiUrl = 'https://jsonplaceholder.typicode.com/photos/';

  // Get Api call - Read
  getPhoto() {
    return this.http.get(this.apiUrl);
  }
  // Post Api call - Create
  postPhoto(photo: any) {
    return this.http.post(this.apiUrl, photo);
  }

  // update Api call - Update
  putPhoto(id:number, photo: any) {
    return this.http.put(this.apiUrl + id, photo);
  }

  // delete Api call - Delete
  deletePhoto(id: number) {
    return this.http.delete(this.apiUrl + id);
  }
}