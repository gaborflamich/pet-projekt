import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
  pure: false,
  standalone: true,
})
export class MovieFilterPipe implements PipeTransform {
  transform(items: any[] | null, searchText: string, genre: string, year: string, imdb: number): any[] {
    if (!items) {
      return [];
    }

    if (searchText) {
      searchText = searchText.toLowerCase();
      items = items.filter((it) => it.title.toLowerCase().includes(searchText));
    }

    if (genre && genre !== 'Select ...') {
      items = items.filter((it) => it.genre === genre);
    }

    if (year && year !== 'Select ...') {
      items = items.filter((it) => it.year.toString() === year);
    }

    if (imdb) {
      // Ha az imdb control (a checkbox) igaz
      items = items.filter((it) => it.imdb >= 8.8);
    }

    return items;
  }
}
