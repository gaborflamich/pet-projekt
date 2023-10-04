import { Component, OnInit } from '@angular/core';
import { MovieService } from '../movies.service';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
  standalone: true,
  imports: [CommonModule],
})
export class PaginationComponent implements OnInit {
  constructor(private readonly movieService: MovieService) {}
  items$ = this.movieService.getAllMovies$();

  currentPage$ = new BehaviorSubject<number>(1);
  itemsPerPage = 4;

  displayedItems$ = combineLatest([this.items$, this.currentPage$]).pipe(
    map(([items, currentPage]) => items.slice((currentPage - 1) * this.itemsPerPage, currentPage * this.itemsPerPage))
  );

  totalItems: number;

  placeholder = 'https://flames.hu/images/ph.jpg';

  get totalPages(): number {
    return Math.ceil(this.totalItems / this.itemsPerPage);
  }

  previousPage(): void {
    this.currentPage$.next(this.currentPage$.value - 1);
  }

  nextPage(): void {
    this.currentPage$.next(this.currentPage$.value + 1);
  }

  ngOnInit(): void {
    this.items$.subscribe((items) => {
      this.totalItems = items.length;
    });
  }
}
