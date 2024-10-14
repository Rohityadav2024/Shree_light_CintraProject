import { Pipe, PipeTransform } from '@angular/core';
import { Quotation } from './quotation';
declare var $: any;
@Pipe({
  name: 'quotationfilter'
})
export class QuotationfilterPipe implements PipeTransform {
  data: any;
  transform(inventory:Quotation[], searchValue: any = []): Quotation[] {



if(sessionStorage.getItem('quotationstartdate')){
  searchValue[0] = sessionStorage.getItem('quotationstartdate');
  if(searchValue[0] == ''){
    searchValue[0] = 'NAN';
  }
  }


  if(sessionStorage.getItem('quotationcustomer')){
    searchValue[1] = sessionStorage.getItem('quotationcustomer');
    if(searchValue[1] == ''){
      searchValue[1] = 'NAN';
    }

    }

    if(searchValue[0] == ''){
      searchValue[0] = 'NAN';
    }

    if(searchValue[1] == ''){
      searchValue[1] = 'NAN';
    }
   // searchValue[0]='2022-09-31'
    // console.log(searchValue)



    if(!inventory || searchValue.length == 0 ){
      return inventory;
    }
    this.data = inventory.filter(inventory =>

      inventory.DocDueDate.toLocaleLowerCase().includes(searchValue[0].toLocaleLowerCase()) ||
      inventory.CardCode.toLocaleLowerCase().includes(searchValue[1].toLocaleLowerCase())

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
