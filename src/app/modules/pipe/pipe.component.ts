import { CommonModule } from '@angular/common';
import { Component, LOCALE_ID } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { FilterPipe } from 'src/app/pipes/filter.pipe';
import { OrderByPipe } from 'src/app/pipes/orderby.pipe';
import { PublishPipe } from 'src/app/pipes/publish.pipe';
import { SafeHtmlPipe } from 'src/app/pipes/safe-html.pipe';
import { SummaryPipe } from 'src/app/pipes/summary.pipe';
import { registerLocaleData } from '@angular/common';
import localeHu from '@angular/common/locales/hu';

registerLocaleData(localeHu);

@Component({
  standalone: true,
  imports: [SummaryPipe, SafeHtmlPipe, OrderByPipe, FilterPipe, PublishPipe, CommonModule, ReactiveFormsModule],
  providers: [{ provide: LOCALE_ID, useValue: 'hu' }],
  selector: 'app-pipe',
  templateUrl: './pipe.component.html',
  styleUrls: ['./pipe.component.scss'],
})
export class PipeComponent {
  control = new FormControl();
  text =
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed a ante auctor, ' +
    'dictum massa in, consectetur massa. Nam est lorem, elementum a blandit id, sagittis ' +
    'eget ante. Sed tempus mauris a massa blandit, id vehicula nibh lobortis. Fusce in ' +
    'accumsan dui. Pellentesque sit amet mi ut lectus sodales lobortis. Nulla lacinia ' +
    'rhoncus egestas. Nam fermentum metus est, at placerat dolor tempus in. ';

  htmlString = `<h2>Lorem ipsum dolor sit amet</h2>
    <p>Sed tempus mauris a massa blandit, id vehicula nibh lobortis</p>`;

  itemsArray1 = ['Banana', 'Apple', 'Orange', 'Strawberry', 'Blueberry', 'Raspberry', 'Ananas', 'Avocado'];
  itemsArray2 = ['Banana', 'Apple', 'Orange', 'Strawberry', 'Blueberry', 'Raspberry', 'Ananas', 'Avocado'];
  itemsArray3 = ['Banana', 'Apple', 'Orange', 'Strawberry', 'Blueberry', 'Raspberry', 'Ananas', 'Avocado'];

  date: Date = new Date();

  get filteredItems(): string[] {
    return this.itemsArray1.filter((item) => !this.control.value || item.toLowerCase().includes(this.control.value.toLowerCase()));
  }
}
