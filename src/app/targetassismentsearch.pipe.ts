import { Pipe, PipeTransform } from '@angular/core';
import { TargeYear } from './login';
// import { TargeYear } from './modules/model/target';
declare var $: any;

@Pipe({
  name: 'targetassismentsearch'
})
export class TargetassismentsearchPipe implements PipeTransform {

  data :any;

  transform(inventory:TargeYear[], searchValue: string): TargeYear[] {
    //console.log(searchValue)
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
      // String(inventory.id)?.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()) ||
      inventory?.Department.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()) ||
      String(inventory.YearTarget)?.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase())

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
