import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { ErrorHandlingComponent } from './components/error-pages/error-handling/error-handling.component';
import { LayoutComponent } from './components/layout/layout.component';
import { RouterModule } from '@angular/router';
import { SidebarComponent } from './components/sidebar/sidebar.component';

@NgModule({
  declarations: [HeaderComponent, FooterComponent, ErrorHandlingComponent, LayoutComponent],
  imports: [CommonModule, RouterModule, SidebarComponent],
  exports: [HeaderComponent, FooterComponent, SidebarComponent, LayoutComponent],
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() coreModule: CoreModule) {
    if (coreModule) {
      throw new Error('A CoreModule-t csak az AppModule-ba importáld!');
    }
  }
}
