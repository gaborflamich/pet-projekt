import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { INav, INavCat } from '../core/components/sidebar/sidebar.definitions';
import { MockSidebar } from '../core/components/sidebar/sidebar.mock';
import { MockHeader } from '../core/components/header/header.mock';

@Injectable({
  providedIn: 'root',
})
export class MockService {
  getSidebarData$(): Observable<INav> {
    return of(MockSidebar);
  }
  getHeaderData$(): Observable<readonly INavCat[]> {
    return of(MockHeader);
  }
}
