import { NgModule } from '@angular/core';
import { ModeLocalStorageService, MODE_STORAGE_SERVICE } from './storage.service';
import { ModeToggleService } from './toggle.service';

/**
 * Angular module for mode toggling feature
 * Contains
 *  * ModeToggleComponent
 *  * ModeToggleService
 */
@NgModule({
  declarations: [],
  providers: [
    ModeToggleService,
    {
      provide: MODE_STORAGE_SERVICE,
      useClass: ModeLocalStorageService,
    },
  ],
  exports: [],
})
export class ModeToggleModule {}
