import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { map, startWith } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent {
  @ViewChild('titleInput') titleInput?: ElementRef;

  control = new FormControl<string>('');
  posts: any[] = [];
  filteredPosts$: Observable<any[]>;

  private readonly url = 'https://jsonplaceholder.typicode.com/posts';
  constructor(private readonly http: HttpClient) {
    this.http.get<any>(this.url).subscribe((response) => {
      this.posts = response;
      this.setupFilter();
    });
  }

  setupFilter(): void {
    this.filteredPosts$ = this.control.valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value || ''))
    );
  }

  private _filter(value: string): any[] {
    const filterValue = value.toLowerCase();

    return this.posts.filter((post) => post.title.toLowerCase().includes(filterValue));
  }
}
