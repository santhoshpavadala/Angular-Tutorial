import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SearchService } from '../../services/search-service';
import { debounceTime, distinctUntilChanged, filter, switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-search',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './search.html',
  styleUrl: './search.scss',
})
export class Search implements OnInit {
  // searchControl  = new FormControl<string | null>('');
  searchControl = new FormControl('', { nonNullable: true });
  result: any[] = [];

  searchService = inject(SearchService);

  ngOnInit(): void {
    this.searchControl.valueChanges.pipe(
      debounceTime(300), //Waits for 300ms after user stops typing
      tap(value => {     //tap is used for side effects (does NOT change data)  
        if (!value || value.trim().length === 0) { //// 🔹 If input is empty or only spaces
          this.result = []; // ✅ clear results immediately
        }
      }),
      filter(value => value.trim().length >= 2),
       // 🔹 Allows only values with length >= 2
      // 🔹 Prevents API call for:
      //    "" (empty)
      //    " " (spaces)
      //    "a" (single character)
      // 🔹 Improves performance

      distinctUntilChanged(),
      // 🔹 Prevents duplicate API calls
      // 🔹 Example:
      //    typing "abc" → backspace → "abc"
      // 🔹 Same value will NOT trigger API again
      switchMap(value => this.searchService.searchUsers(value))
       // 🔹 Cancels previous API request
      // 🔹 Sends only latest request
      // 🔹 Example:
      //    a → ab → abc
      // 🔹 "a" and "ab" calls are cancelled
      // 🔹 Only "abc" result is used
    ).subscribe(data => {
      this.result = data;
    });
  }
}
