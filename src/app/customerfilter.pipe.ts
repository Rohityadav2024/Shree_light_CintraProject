import { Pipe, PipeTransform } from '@angular/core';
import { Customer } from './customer';

declare var $: any;

@Pipe({
  name: 'customerfilter'
})
export class CustomerfilterPipe implements PipeTransform {

  data:any;

  transform(inventory:Customer[], searchValue: string): Customer[] {
    if(!inventory || !searchValue){
      if(inventory.length == 0){
        $('#noDataFound').show();
        $('#DataFound').hide();
        $('.hidebox').hide();
        }
        else{
        $('#noDataFound').hide();
        $('#DataFound').show();
        $('.hidebox').show();
        }
     // console.log(searchValue)
      return inventory;
    }
    this.data = inventory.filter(inventory =>
    // return inventory.filter(inventory =>
    String(inventory.id).toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()) ||
      inventory.CardName.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()) ||
      inventory.Industry.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()) ||
      inventory.U_CONTOWNR.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()) ||
      inventory.U_ANLRVN.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()) ||
      // inventory.U_TYPE.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()) ||
      // inventory.ContactEmployees[0].Name.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()) ||
      inventory.EmailAddress.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase())||
      inventory.Phone1.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase())
    );
    if(this.data.length == 0){
      $('#noDataFound').show();
      $('#DataFound').hide();
      $('.hidebox').hide();
      }
      else{
      $('#noDataFound').hide();
      $('#DataFound').show();
      $('.hidebox').show();
      }
      return this.data;
  }

}
