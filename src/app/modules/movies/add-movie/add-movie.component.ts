import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter, ViewChild, ElementRef, AfterViewInit, SimpleChanges, OnChanges } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AddMovieService } from './add-movie.service';
import { IMovie } from '../movies.definitions';
import { MoviesComponent } from '../movies.component';

@Component({
  selector: 'app-add-movie',
  templateUrl: './add-movie.component.html',
  styleUrls: ['./add-movie.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MoviesComponent],
})
export class AddMovieComponent implements AfterViewInit, OnChanges {
  constructor(private readonly addMovieService: AddMovieService) {}

  feedbackMessage: string | null = null; // Az üzenet tárolására
  feedbackType: 'success' | 'error' | null = null; // Az üzenet típusának tárolására (opcionális)

  @Input() isEditing = false;
  @Input() movieToEdit: IMovie | null = null;
  @Output() finished = new EventEmitter<void>();

  @ViewChild('formTitle') formTitleInput: ElementRef;

  movieId = '';

  form = new FormGroup({
    formTitle: new FormControl(),
    formImdb: new FormControl(),
    formGenre: new FormControl(),
    formYear: new FormControl(),
    formImage: new FormControl(),
  });

  onSubmit(): void {
    if (this.form.valid) {
      const movie: IMovie = {
        id: this.movieId,
        title: this.form.get('formTitle')?.value,
        imdb: +this.form.get('formImdb')?.value,
        genre: this.form.get('formGenre')?.value,
        year: +this.form.get('formYear')?.value,
        image: this.form.get('formImage')?.value,
      };

      if (this.isEditing) {
        // A film szerkesztése
        this.addMovieService
          .editMovie(movie)
          .then(() => {
            this.feedbackMessage = 'Movie updated successfully in Firestore';
            this.feedbackType = 'success';
            this.finished.emit();

            // Set timeout to hide the feedback message
            setTimeout(() => {
              this.feedbackMessage = null;
            }, 2000);
          })
          .catch((error) => {
            this.feedbackMessage = 'Error updating movie in Firestore: ' + error.message;
            this.feedbackType = 'error';
          });
      } else {
        // Új film hozzáadása
        this.addMovieService
          .addMovie(movie)
          .then(() => {
            console.log('Movie saved successfully to Firestore');
            this.feedbackMessage = 'Movie added successfully in Firestore';
            this.feedbackType = 'success';
            this.form.reset(); // Az űrlap törlése az adatok mentése után.
            this.finished.emit();

            // Set timeout to hide the feedback message
            setTimeout(() => {
              this.feedbackMessage = null;
            }, 3000); // 3 seconds
          })
          .catch((error) => {
            console.error('Error saving movie to Firestore: ', error);
            this.feedbackMessage = 'Error saving movie in Firestore: ' + error.message;
            this.feedbackType = 'error';
          });
      }
    } else {
      console.error('Form is not valid.');
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['movieToEdit'] && this.movieToEdit) {
      this.form.setValue({
        formTitle: this.movieToEdit.title,
        formImdb: this.movieToEdit.imdb,
        formGenre: this.movieToEdit.genre,
        formYear: this.movieToEdit.year,
        formImage: this.movieToEdit.image,
      });

      if (this.movieToEdit.id) {
        this.movieId = this.movieToEdit.id;
      } else {
        console.error('The movie ID is missing.');
      }
    }
  }

  ngAfterViewInit(): void {
    console.log(this.formTitleInput);
  }
}
