import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sortYears',
  standalone: true,
})
export class SortYearsPipe implements PipeTransform {
  transform(array: any[] | null, field: string): any[] {
    if (!array) {
      return [];
    }

    // Először rendezzük az évszámokat.
    array.sort((a: any, b: any) => {
      if (a[field] < b[field]) {
        return -1;
      } else if (a[field] > b[field]) {
        return 1;
      } else {
        return 0;
      }
    });

    // Most eltávolítjuk az ismétlődéseket.
    return array.filter((value, index, self) => index === self.findIndex((t) => t[field] === value[field]));
  }
}
