import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';

@Injectable({
  providedIn: 'root',
})
export class AlbumSingleResolver implements Resolve<any[]> {
  constructor(private readonly apiService: ApiService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<any[]> {
    const albumId = route.params['id'];
    return this.apiService.getAlbumById$(albumId);
  }
}
