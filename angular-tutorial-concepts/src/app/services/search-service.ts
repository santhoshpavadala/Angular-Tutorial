import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  // apiUrl = "https://jsonplaceholder.typicode.com/users";

  http = inject(HttpClient);

  searchUsers(term: string): Observable<any[]> {
    return this.http.get<any[]>(
      `https://jsonplaceholder.typicode.com/users?name_like=${term}`
    );
  }
  
}
