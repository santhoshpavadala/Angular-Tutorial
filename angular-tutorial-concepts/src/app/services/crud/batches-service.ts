import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BatchesService {
  // constructor(private http: HttpClient) { }
  private apiUrl = 'https://api.freeprojectapi.com/api/FeesTracking/batches';

  http = inject(HttpClient);

  getBatches() {
    return this.http.get(this.apiUrl);
  }

  saveBatch(obj: any) {
    return this.http.post('https://api.freeprojectapi.com/api/FeesTracking/batches', obj)
  }


}
