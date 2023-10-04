import { CommonModule } from '@angular/common';
import { Component, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MovieService } from '../movies.service';
import { SortYearsPipe } from '../pipes/sort.pipe';
import { MovieFilterPipe } from '../pipes/movies.pipe';
import { IMovie } from '../movies.definitions';

@Component({
  selector: 'app-filter-movies',
  templateUrl: './filter-movies.component.html',
  styleUrls: ['./filter-movies.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, SortYearsPipe, MovieFilterPipe],
})
export class FilterMoviesComponent {
  constructor(private readonly movieService: MovieService) {}
  items$ = this.movieService.getAllMovies$();

  @Output() editMovie: EventEmitter<IMovie> = new EventEmitter<IMovie>();
  @Output() deleteMovie: EventEmitter<string> = new EventEmitter<string>();

  placeholder = 'https://flames.hu/images/ph.jpg';
  isEditing = false;
  control = new FormControl();
  form = new FormGroup({
    formTitle: new FormControl(),
    formImdb: new FormControl(),
    formGenre: new FormControl(),
    formYear: new FormControl(),
    formImage: new FormControl(),
  });

  onCancel(): void {
    this.form.reset({
      formTitle: '',
      formImdb: '',
      formGenre: '',
      formYear: '',
      formImage: '',
    });
    this.isEditing = false;
  }
}
