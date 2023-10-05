import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { INav } from 'src/app/core/components/sidebar/sidebar.definitions';
import { MockService } from 'src/app/services/mock.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  mockData$!: Observable<INav>;

  constructor(private readonly mockService: MockService) {}

  ngOnInit(): void {
    this.mockData$ = this.mockService.getSidebarData$();
  }
}
