import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { INav } from './sidebar.definitions';
import { MockService } from 'src/app/services/mock.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  standalone: true,
  imports: [CommonModule, RouterModule],
})
export class SidebarComponent implements OnInit {
  mockData$!: Observable<INav>;

  constructor(private readonly mockService: MockService) {}

  ngOnInit(): void {
    this.mockData$ = this.mockService.getSidebarData$();
  }
}
