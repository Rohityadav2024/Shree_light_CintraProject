import { Pipe, PipeTransform } from '@angular/core';
import { Quotation } from './quotation';

declare var $: any;
@Pipe({
  name: 'oppquotationfilter'
})
export class OppquotationfilterPipe implements PipeTransform {

  data: any;
  transform(inventory:Quotation[], searchValue: string): Quotation[] {
    if(!inventory || !searchValue){
      return inventory;
    }
    this.data = inventory.filter(inventory =>       
      inventory.U_OPPID.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()));
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
