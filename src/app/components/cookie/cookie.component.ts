import { Component } from '@angular/core';

@Component({
  selector: 'app-cookie',
  templateUrl: './cookie.component.html',
  styleUrls: ['./cookie.component.scss'],
  standalone: true,
})
export class CookieComponent {
  cookieAccepted = localStorage.getItem('cookieAccepted') === 'true';

  acceptCookies(): void {
    this.cookieAccepted = !this.cookieAccepted;
    if (this.cookieAccepted) {
      localStorage.setItem('cookieAccepted', 'true');
      console.log('Accepted');
    } else {
      localStorage.setItem('cookieAccepted', 'false');
      console.log('Rejected');
    }
  }
}
