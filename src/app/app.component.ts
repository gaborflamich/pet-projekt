import { Component, ElementRef, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `<app-layout></app-layout>`,
})
export class AppComponent implements OnInit {
  constructor(private readonly elementRef: ElementRef) {}

  ngOnInit(): void {
    this.elementRef.nativeElement.removeAttribute('ng-version');
  }
}
