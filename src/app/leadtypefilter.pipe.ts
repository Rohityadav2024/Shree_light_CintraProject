import { Pipe, PipeTransform } from '@angular/core';

import { Bridge2 } from './bridge2';
declare var $ :any;

@Pipe({
  name: 'leadtypefilter'
})
export class LeadtypefilterPipe implements PipeTransform {
  data: any;
  defaultleadtype:any;
  transform(inventory:Bridge2[], searchValue5: string): Bridge2[] {
    // if(sessionStorage.getItem('leadtype')){
    //   this.defaultleadtype=sessionStorage.getItem('leadtype');
    //   searchValue5=this.defaultleadtype;
    // }
    if(!inventory || searchValue5 == 'All' ){
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
    this.data =  inventory.filter(inventory =>
      inventory.leadType.toLocaleLowerCase().includes(searchValue5.toLocaleLowerCase()));
      if(this.data.length == 0){
        $('#noDataFound').show();
        $('#DataFound').hide();
      }
      else{
        $('#noDataFound').hide();
        $('#DataFound').show();
      }
      //console.log(this.data)
      return this.data;
  }


}
