import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';

@Injectable({
  providedIn: 'root',
})
export class AlbumsResolver implements Resolve<any[]> {
  constructor(private readonly apiService: ApiService) {}

  resolve(): Observable<any[]> {
    return this.apiService.getAlbums$();
  }
}
