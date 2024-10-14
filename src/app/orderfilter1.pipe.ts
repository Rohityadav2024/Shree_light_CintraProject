import { Pipe, PipeTransform } from '@angular/core';
declare var $: any;
@Pipe({
  name: 'orderfilter1'
})
export class Orderfilter1Pipe implements PipeTransform {
  data: any;
  transform(inventory:any[], searchValue: any = []): any[] {

    // filter functionality close

if(sessionStorage.getItem('orderstartdate')){
  searchValue[0] = sessionStorage.getItem('orderstartdate');
  }

  if(sessionStorage.getItem('ordercustomer')){
    searchValue[1] = sessionStorage.getItem('ordercustomer');
    }

  // filter functionality close

    if(searchValue[0] == ''){
      searchValue[0] = 'NAN@@';
    }
    if(searchValue[1] == ''){
      searchValue[1] = 'NAN@@';
    }
   // console.log(searchValue[0]);

    if(!inventory || searchValue.length == 0 ){
      return inventory;
    }
     this.data = inventory.filter(inventory =>
      inventory.CreateDate.toLocaleLowerCase().includes(searchValue[0].toLocaleLowerCase())||
      inventory.CardCode.toLocaleLowerCase().includes(searchValue[1].toLocaleLowerCase())
      // inventory.U_LSOURCE.toLocaleLowerCase().includes(searchValue[2].toLocaleLowerCase())
      );

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
