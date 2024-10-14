import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NgbDatapickerValueFormatterService {
  returnNgbValueObject(date: string) {
    return { year: parseInt(date.slice(0, 4)), month: parseInt(date.slice(5, 7)), day: parseInt(date.slice(8, 10)) };
  }
  returnObjectNgbValue(value: any) {
    return String(value ? value.year + "-" + ('0' + value.month).slice(-2) + "-" + ('0' + value.day).slice(-2) : '');
  }
}
