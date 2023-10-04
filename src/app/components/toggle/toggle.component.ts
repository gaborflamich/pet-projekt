import { Component } from '@angular/core';
import { ModeToggleService } from './toggle.service';
import { CommonModule } from '@angular/common';
import { ModeToggleModule } from './toggle.module';

@Component({
  selector: 'app-toggle',
  templateUrl: './toggle.component.html',
  styleUrls: ['./toggle.component.scss'],
  standalone: true,
  imports: [CommonModule, ModeToggleModule],
})
export class ToggleComponent {
  isDark = false;

  constructor(private readonly modeToggleService: ModeToggleService) {}

  toggle(): void {
    this.modeToggleService.toggleMode();
    this.isDark = !this.isDark;
    console.log(this.isDark);
  }
}
