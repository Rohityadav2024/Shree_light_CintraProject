import { Pipe, PipeTransform } from '@angular/core';
import { Orders } from './orders';
declare var $: any;

@Pipe({
  name: 'orderybybp'
})
export class OrderybybpPipe implements PipeTransform {
  data: any;
  transform(inventory:Orders[], searchValue: string): Orders[] {
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
