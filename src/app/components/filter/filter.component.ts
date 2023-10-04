import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { items } from './filter.mock';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Subject, takeUntil, tap } from 'rxjs';

@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
})
export class FilterComponent implements OnInit, OnDestroy {
  items: string[] = items;
  filteredItems: string[] = [];

  control = new FormControl<string>('');

  private readonly destroy$ = new Subject<void>();

  constructor() {
    this.filteredItems = this.items; // Display all items by default
  }

  ngOnInit(): void {
    this.control.valueChanges
      .pipe(
        tap((value: string | null) => {
          this.filteredItems = this.items.filter((item) => {
            // Early return
            if (!value) {
              return;
            }
            return item.toLowerCase().includes(value.toLowerCase());
          });
        }),
        takeUntil(this.destroy$)
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
