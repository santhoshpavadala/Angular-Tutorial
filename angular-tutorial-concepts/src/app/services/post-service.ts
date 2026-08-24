import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { PostModel } from '../models/post-model';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  http=inject(HttpClient);
  apiUrl = "https://jsonplaceholder.typicode.com/posts";

  getPost() {
    return this.http.get<PostModel[]>(this.apiUrl);
  }
  
}
