import { Pipe, PipeTransform } from '@angular/core';
import { Invoice } from './invoice';
declare var $: any;

@Pipe({
  name: 'invoicebybp'
})
export class InvoicebybpPipe implements PipeTransform {
  data: any;

  transform(inventory:Invoice[], searchValue: string): Invoice[] {
    if(!inventory || !searchValue){
      return inventory;
    }
    
    this.data =  inventory.filter(inventory =>  
      inventory.CardCode.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()));
      
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
