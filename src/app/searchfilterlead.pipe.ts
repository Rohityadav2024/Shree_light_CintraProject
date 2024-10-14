import { Pipe, PipeTransform } from '@angular/core';

import { Bridge2 } from './bridge2';

declare var $: any;

@Pipe({
  name: 'searchfilterlead'
})


export class SearchfilterleadPipe implements PipeTransform {

  data:any;

  transform(inventory:Bridge2[], searchValue: string): Bridge2[] {
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
    // return inventory.filter(inventory =>
    this.data = inventory.filter(inventory =>
      String(inventory.id).toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()) ||
      inventory.companyName.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()) ||
      inventory.phoneNumber.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()) ||
      inventory.status.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()) ||
      inventory.leadType.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()) ||
      // inventory.source.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()) ||
      // inventory.productInterest.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()) ||
      // // inventory.assignedTo.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()) ||
      // inventory.date.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()) ||
      inventory.contactPerson.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase())
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
