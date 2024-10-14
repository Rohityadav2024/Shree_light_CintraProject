import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';

@Pipe({
  name: 'customDate'
})
export class CustomDatePipe implements PipeTransform {

  transform(value: any, format?: string): any {
    var newformat = value.split('-');
    if(newformat[0].length == 4){
    return new DatePipe('en-US').transform(value, 'dd-MM-yyyy');
    }
    else{
      return value;
    }
  }

}
