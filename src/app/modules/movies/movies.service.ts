import { Injectable } from '@angular/core';
import { Firestore, collectionData } from '@angular/fire/firestore';
import { collection, deleteDoc, doc } from 'firebase/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  constructor(private readonly firestore: Firestore) {}

  getAllMovies$(): Observable<any[]> {
    const itemCollection = collection(this.firestore, 'movies');
    return collectionData(itemCollection, { idField: 'id' });
  }

  deleteMovie(id: string): Promise<void> {
    const studentDoc = doc(this.firestore, 'movies', id);
    return deleteDoc(studentDoc);
  }
}
