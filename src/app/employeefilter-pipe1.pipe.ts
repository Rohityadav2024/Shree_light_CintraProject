import { Pipe, PipeTransform } from '@angular/core';
import { Bridge } from './bridge';
declare var $: any;

@Pipe({
  name: 'employeefilterPipe1'
})
export class EmployeefilterPipe1Pipe implements PipeTransform {
  data: any;
  filter: any;
  transform(inventory: any, searchValue: any = []): any[] {
    //console.log("searchValue1",searchValue);
    if (searchValue[0] == '') {
      searchValue[0] = '';
    }
    if (searchValue[1] == '') {
      searchValue[1] = '';
    }

    if (!inventory || searchValue.length == 0) {
      return inventory;
    }

    // this.filter = sessionStorage.getItem('rolename');
    // console.log(this.filter);

    searchValue = JSON.parse(sessionStorage.getItem('rolename') || '{}');
    for (let i = 0; i < searchValue.length; i++) {
      // console.log(searchValue[i]);
      // console.log(searchValue[0]);
      // console.log(searchValue[1]);
    }
    //console.log("searchValue",searchValue);

    //  this.data = inventory.filter(inventory =>

    //   (inventory.role.toLocaleLowerCase().includes(searchValue[0].toLocaleLowerCase()) ||
    //   inventory.Active.toLocaleLowerCase().includes(searchValue[1].toLocaleLowerCase()))||
    //   (inventory.role.toLocaleLowerCase().includes(searchValue[0].toLocaleLowerCase()) &&
    //    inventory.Active.toLocaleLowerCase().includes(searchValue[1].toLocaleLowerCase()))
    //   );
    this.data = inventory.filter((inventory: any) =>

    //   (inventory.role.toLocaleLowerCase().includes(searchValue[0].toLocaleLowerCase()) ||
    // inventory.Active.toLocaleLowerCase().includes(searchValue[1].toLocaleLowerCase()))
    // ||
    (inventory.role.toLocaleLowerCase().includes(searchValue[0].toLocaleLowerCase()) &&
      inventory.Active.toLocaleLowerCase().includes(searchValue[1].toLocaleLowerCase()))
    );

    //console.log(this.data);

    if (this.data.length == 0) {
      $('#noDataFound').show();
      $('#DataFound').hide();
    }
    else {
      $('#noDataFound').hide();
      $('#DataFound').show();
    }
    return this.data;
  }

}
