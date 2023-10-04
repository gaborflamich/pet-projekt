import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AddMovieComponent } from './add-movie/add-movie.component';
import { MovieService } from './movies.service';
import { IMovie } from './movies.definitions';
import { MovieFilterPipe } from './pipes/movies.pipe';
import { SortYearsPipe } from './pipes/sort.pipe';
import { FilterMoviesComponent } from './filter-movies/filter-movies.component';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, AddMovieComponent, MovieFilterPipe, SortYearsPipe, FilterMoviesComponent],
})
export class MoviesComponent {
  constructor(private readonly movieService: MovieService) {}
  items$ = this.movieService.getAllMovies$();
  nameInputRef: any;
  placeholder = 'https://flames.hu/images/ph.jpg';

  newMovie = true;
  movieToEdit: IMovie | null = null;

  isEditing = false;
  movieId = '';

  control = new FormControl();
  form = new FormGroup({
    formTitle: new FormControl(),
    formImdb: new FormControl(),
    formGenre: new FormControl(),
    formYear: new FormControl(),
    formImage: new FormControl(),
  });

  onEdit(movie: IMovie): void {
    this.movieToEdit = movie; // Új sor

    this.form.setValue({
      formTitle: movie.title,
      formImdb: movie.imdb,
      formGenre: movie.genre,
      formYear: movie.year.toString(),
      formImage: movie.image,
    });

    if (movie.id) {
      this.movieId = movie.id;
      this.isEditing = true;
    } else {
      console.error('The movie ID is missing.');
    }
  }

  onFinishEditing(): void {
    this.isEditing = false;
    this.movieToEdit = null;
  }

  onToggleMovie(): void {
    this.newMovie = !this.newMovie;
  }

  onDelete(id: string): void {
    this.movieService.deleteMovie(id).then(() => {
      console.log('Deleted student with ID: ' + id);
    });
  }
}
