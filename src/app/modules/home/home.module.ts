import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { RouterModule } from '@angular/router';
import { homeRoutes } from './home.routing';
import { ShoppinglistComponent } from '../shopping-list/shopping-list.component';

@NgModule({
  declarations: [HomeComponent],
  imports: [ShoppinglistComponent, CommonModule, RouterModule.forChild(homeRoutes)],
})
export class HomeModule {}
