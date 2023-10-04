import { Injectable } from '@angular/core';
import { IMovie } from '../movies.definitions';
import { Firestore } from '@angular/fire/firestore';
import { addDoc, collection, doc, updateDoc } from 'firebase/firestore';

@Injectable({
  providedIn: 'root',
})
export class AddMovieService {
  constructor(private readonly firestore: Firestore) {}

  addMovie(movie: IMovie): Promise<void> {
    const itemCollection = collection(this.firestore, 'movies');
    return addDoc(itemCollection, {
      title: movie.title,
      imdb: movie.imdb,
      genre: movie.genre,
      year: movie.year,
      image: movie.image,
    }).then(() => {
      console.log('Movie added successfully');
    });
  }

  editMovie(movie: IMovie): Promise<void> {
    if (movie.id) {
      const itemDoc = doc(this.firestore, 'movies', movie.id);
      return updateDoc(itemDoc, {
        title: movie.title,
        imdb: movie.imdb,
        genre: movie.genre,
        year: movie.year,
        image: movie.image,
      }).then(() => {
        console.log('Movie updated successfully');
      });
    } else {
      console.error('Movie ID is missing');
      return Promise.reject('Movie ID is missing'); // Ezt a sort adtam hozzá
    }
  }
}
