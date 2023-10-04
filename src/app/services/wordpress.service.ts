import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WordpressService {
  private readonly baseUrl = 'https://corsproxy.io/?' + encodeURIComponent('https://dynamickarate.hu/wp-json/wp/v2');

  constructor(private readonly http: HttpClient) {}

  getPosts$(): Observable<any> {
    return this.http.get(`${this.baseUrl}/posts`);
  }
}
