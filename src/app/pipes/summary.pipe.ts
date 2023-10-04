import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'summary',
  standalone: true,
})
export class SummaryPipe implements PipeTransform {
  transform(value: string): string {
    if (!value) {
      return value; // If the input is empty, return it as is
    }

    if (value.length <= 60) {
      return value; // If the input is already 30 characters or less, return it as is
    }

    return value.substring(0, 60) + '...'; // Return the substring of the input with ellipsis
  }
}
