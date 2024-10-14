import { Pipe, PipeTransform } from '@angular/core';
declare var $: any;

@Pipe({
  name: 'trackingLocation'
})
export class TrackingLocationPipe implements PipeTransform {

  data:any;

  transform(inventory:any[], searchValue: any): any[] {



   // console.log(searchValue);

    if(!inventory || !searchValue[0] || !searchValue[1]){
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
    else{
    this.data = inventory.filter(inventory =>
      inventory.UpdateDate >= searchValue[0] && inventory.UpdateDate <= searchValue[1]

    );
    }
    if(this.data.length == 0){
      $('#noDataFound').show();
      $('#DataFound').hide();
    }
    else{
      $('#noDataFound').hide();
      $('#DataFound').show();
    }
    // console.log(this.data);

    return this.data;
  }
}
