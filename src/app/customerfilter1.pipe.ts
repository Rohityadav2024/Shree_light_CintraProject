import { Pipe, PipeTransform } from '@angular/core';
declare var $: any;

@Pipe({
  name: 'customerfilter1'
})
export class Customerfilter1Pipe implements PipeTransform {
  data: any;
  defaultStates:any;
  transform(inventory:any[], searchValue: any = []): any[] {
    if(sessionStorage.getItem('customerstates')){
      this.defaultStates = JSON.parse( sessionStorage.getItem('customerstates') || '{}' );
      //   for (let i = 0; i < this.defaultStates.length; i++) {
      //     searchValue=this.defaultStates[i];
      // }
      searchValue[0]=this.defaultStates;
      //console.log('states'+searchValue[0]);
    }
   // console.log(searchValue[0]);
    if(searchValue[0] == ''){
      searchValue[0] = 'NAN';
    }

    if(!inventory || searchValue.length == 0 ){
      return inventory;
    }
     this.data = inventory.filter(inventory =>
      inventory.BPAddresses[0].U_STATE.toLocaleLowerCase().includes(searchValue[0].toLocaleLowerCase())
      // inventory.Active.toLocaleLowerCase().includes(searchValue[1].toLocaleLowerCase())
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
