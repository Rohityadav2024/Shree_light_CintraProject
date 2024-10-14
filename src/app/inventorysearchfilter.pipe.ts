import { Pipe, PipeTransform } from '@angular/core';
declare var $ :any;
@Pipe({
  name: 'inventorysearchfilter'
})
export class InventorysearchfilterPipe implements PipeTransform {

  data :any;

  transform(inventory:any[], searchValue: string): any[] {
    if(!inventory || !searchValue){
      if(inventory != undefined){
      if(inventory.length == 0){
        $('#noDataFound').show();
        $('#DataFound').hide();
      }
      else{
        $('#noDataFound').hide();
        $('#DataFound').show();
      }
    }
      return inventory;
    }
    this.data = inventory.filter(inventory =>
    // return inventory.filter(inventory =>

      inventory.CategoryName.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase())

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
