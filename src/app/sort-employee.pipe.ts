import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sortEmployee',
  pure: false,
})

export class SortEmployeePipe implements PipeTransform {

  transform(inventory: any[], sortValue: string): any[] {

    if (sortValue == 'idtrue' || sortValue == 'idfalse') {
      if (sortValue.includes('true') == true) {
        if (sortValue == 'idtrue') {
          inventory.sort((a: any, b: any) => {
            if (a.id < b.id) {
              return 1;
            } else {
              return -1;
            }
          });
        }
      } else {
        if (sortValue == 'idfalse') {
          inventory.sort((a: any, b: any) => {
            if (a.id > b.id) {
              return 1;
            } else {
              return -1;
            }
          });
        }
      }
    } else {
      if (sortValue.includes('true') == true) {
        var newkey = sortValue.split('true')[0];
        if (sortValue == newkey + 'true') {
          inventory.sort((a: any, b: any) => {
            if (a[newkey].toLowerCase() < b[newkey].toLowerCase()) {
              return 1;
            } else {
              return -1;
            }
          });
        }
      } else {
        var newkey = sortValue.split('false')[0];
        if (sortValue == newkey + 'false') {
          inventory.sort((a: any, b: any) => {
            if (a[newkey].toLowerCase() > b[newkey].toLowerCase()) {
              return 1;
            } else {
              return -1;
            }
          });
        }
      }
    }
    return inventory;
  }
}
