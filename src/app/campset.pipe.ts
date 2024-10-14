import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'campset'
})
export class CampsetPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
