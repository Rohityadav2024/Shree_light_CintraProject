import { Pipe, PipeTransform } from '@angular/core';
declare var $ :any;

@Pipe({
  name: 'customertypeFilter'
})
export class CustomertypeFilterPipe implements PipeTransform {
  data :any;

  transform(inventory:any[], searchValue: string): any[] {
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
    this.data = inventory.filter(inventory =>
    // return inventory.filter(inventory =>
    String(inventory.id).toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()) ||
      inventory.Type.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase())

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
