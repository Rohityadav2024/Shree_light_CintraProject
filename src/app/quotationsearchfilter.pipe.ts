import { Pipe, PipeTransform } from '@angular/core';
import { Quotation } from './quotation';

declare var $ :any;
@Pipe({
  name: 'quotationsearchfilter'
})
export class QuotationsearchfilterPipe implements PipeTransform {
  data :any;

  transform(inventory:Quotation[], searchValue: string): Quotation[] {
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
      inventory.U_OPPRNM.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()) ||
      inventory.CardName.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()) ||
      inventory.TaxDate.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()) ||
      inventory.DocDueDate.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()) ||
      inventory.DocDate.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase())
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
