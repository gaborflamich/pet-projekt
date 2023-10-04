import { Component, OnInit } from '@angular/core';
import { MockService } from 'src/app/services/mock.service';
import { INavCat } from '../sidebar/sidebar.definitions';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  mockData$!: Observable<readonly INavCat[]>;
  constructor(private readonly mockService: MockService) {}

  ngOnInit(): void {
    this.mockData$ = this.mockService.getHeaderData$();
  }
}
