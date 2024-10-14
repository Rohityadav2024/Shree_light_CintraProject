import { Pipe, PipeTransform } from '@angular/core';
import { opportunity } from './opportunity';

declare var $: any;
@Pipe({
  name: 'opportunitybybp'
})
export class OpportunitybybpPipe implements PipeTransform {
  data: any;
  transform(inventory:opportunity[], searchValue: string): opportunity[] {
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
