import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Data } from '@angular/router';
import { map, Observable } from 'rxjs';

@Component({
  selector: 'app-error-handling',
  templateUrl: './error-handling.component.html',
  styleUrls: ['./error-handling.component.scss'],
})
export class ErrorHandlingComponent implements OnInit {
  errorCode$: Observable<string>;

  constructor(private readonly route: ActivatedRoute) {}

  ngOnInit(): void {
    this.errorCode$ = this.route.data.pipe(map((routeData: Data) => routeData['errorCode']));
  }
}
