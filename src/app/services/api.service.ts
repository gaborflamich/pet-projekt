import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private readonly url = 'https://jsonplaceholder.typicode.com/albums';
  private readonly albumUrl = 'https://jsonplaceholder.typicode.com/photos?albumId=';

  constructor(private readonly http: HttpClient) {}

  getAlbums$(): Observable<any[]> {
    return this.http.get<any[]>(this.url);
  }

  getAlbum$(albumId: number): Observable<any> {
    return this.http.get<any>(`${this.url}/${albumId}`);
  }

  getAlbumById$(albumId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.albumUrl}${albumId}`);
  }
}
