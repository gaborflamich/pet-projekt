import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'orderBy',
  standalone: true,
})
export class OrderByPipe implements PipeTransform {
  transform(array: any[], direction = 'asc', field?: string): any[] {
    if (!Array.isArray(array)) {
      return array;
    }

    let sortedArray: any[] = [];

    if (field) {
      // Ha van mező (field) megadva
      sortedArray = array.sort((a, b) => (a[field] > b[field] ? 1 : -1));
    } else {
      sortedArray = array.sort(); // Ha nincs mező megadva, egyszerűen rendezzük az elemeket
    }

    if (direction === 'desc') {
      return sortedArray.reverse();
    }
    return sortedArray;
  }
}
