import { Pipe, PipeTransform } from '@angular/core';
import { opportunity } from './opportunity';

declare var $: any;

@Pipe({
  name: 'opposearchfilter'
})
export class OpposearchfilterPipe implements PipeTransform {

  data :any;

  transform(inventory:opportunity[], searchValue: string): opportunity[] {
   // console.log(searchValue)
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
      inventory.StartDate.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()) ||
      inventory.OpportunityName.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()) ||
      inventory.ContactPersonName.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()) ||
      // inventory.U_TYPE.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()) ||
      inventory.U_LSOURCE.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()) ||
      inventory.ClosingDate.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase())
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
