import { Pipe, PipeTransform } from '@angular/core';
import { differenceInHours, differenceInMinutes, format, parseISO } from 'date-fns';
import hu from 'date-fns/locale/hu';

@Pipe({
  name: 'publish',
  standalone: true,
})
export class PublishPipe implements PipeTransform {
  transform(value: Date | string, dateFormat = 'yyyy. MM. dd.', minutesToDisplay = 60, hoursToDisplay = 24): string {
    if (!value) {
      return '';
    }

    let tempValue = new Date(value);

    if (typeof value === 'string') {
      tempValue = parseISO(value);
    }

    const now = new Date();
    const minutes = differenceInMinutes(now, tempValue);
    const hours = differenceInHours(now, tempValue);
    const isZeroMinute = minutes === 0;

    if (minutes >= 0 && minutes < minutesToDisplay) {
      return `${isZeroMinute ? 1 : minutes} perce`;
    }
    if (hours > 0 && hours < hoursToDisplay) {
      return `${hours} órája`;
    }
    return format(tempValue, dateFormat, { locale: hu });
  }
}
