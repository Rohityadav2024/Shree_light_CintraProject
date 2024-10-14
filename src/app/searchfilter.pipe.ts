import { Pipe, PipeTransform } from '@angular/core';

import { Bridge } from './bridge';

declare var $: any;

@Pipe({
  name: 'searchfilter'
})
export class SearchfilterPipe implements PipeTransform {

  data:any;

  transform(inventory:Bridge[], searchValue: string): Bridge[] {
    if(!inventory || !searchValue){
      if(inventory.length == 0){
        $('#noDataFound').show();
        $('#DataFound').hide();
      }
      else{
        $('#noDataFound').hide();
        $('#DataFound').show();
      }
      return inventory;
    }
    this.data = inventory.filter(inventory =>
    // return inventory.filter(inventory =>
      String(inventory.id).toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()) ||
      inventory.middleName.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()) ||
      inventory.lastName.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()) ||
      inventory.Email.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()) ||
      inventory.firstName.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()) ||
      inventory.position.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()) ||
      inventory.Mobile.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()) ||
      inventory.role.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()) ||
      inventory.userName.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase())

    );
    if(this.data.length == 0){
      $('#noDataFound').show();
      $('#DataFound').hide();
    }
    else{
      $('#noDataFound').hide();
      $('#DataFound').show();
    }
    return this.data;
  }

}
