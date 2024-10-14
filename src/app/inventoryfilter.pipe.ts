import { Pipe, PipeTransform } from '@angular/core';
import { QuotationItem } from './modules/model/quotation';
//import { Quotation, QuotationItem } from './quotation';
declare var $: any;

@Pipe({
  name: 'inventoryfilter'
})
export class InventoryfilterPipe implements PipeTransform {
  data: any;

  transform(inventory: QuotationItem[] | any[], searchValue: string): QuotationItem[] {
    if (!inventory || !searchValue) {
      return inventory;
    }

    this.data = inventory.filter(inventory =>
      inventory.id.toString().toLocaleLowerCase().includes(searchValue.toString().toLocaleLowerCase()) ||
      inventory.ItemName.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()) ||
      inventory.ItemCode.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()));

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
