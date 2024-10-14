import { Pipe, PipeTransform } from '@angular/core';
import { Item } from './warehouse';

declare var $ : any;

@Pipe({
  name: 'invendata'
})
export class InvendataPipe implements PipeTransform {

  data : any;

  transform(invedta: any[], searchValue: string): any[] {
    if(!invedta || !searchValue){
      if(invedta.length == 0){
        $('#itemnoDataFound').show();
        $('#DataFound').hide();
      }
      else{
        $('#itemnoDataFound').hide();
        $('#DataFound').show();
      }
      return invedta;
    }

    this.data = invedta.filter(invedta =>
      String(invedta.id).toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()) ||
      invedta.ItemName.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()) ||
      invedta.Inventory.toString().toLowerCase().includes(searchValue.toString().toLowerCase()) ||
      invedta.UoS.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()) ||
      invedta.Packing.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()) ||
      invedta.UnitPrice.toString().toLocaleLowerCase().includes(searchValue.toString().toLocaleLowerCase())
    );
    if(this.data.length == 0){
      $('#itemnoDataFound').show();
      $('#DataFound').hide();
    }
    else{
      $('#itemnoDataFound').hide();
      $('#DataFound').show();
    }
    return this.data;
  }
}
