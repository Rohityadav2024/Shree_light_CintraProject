import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'priceFormat'
})
export class PriceFormatPipe implements PipeTransform {

  transform(value: any,value2?:any): any {
    var currencySymbol:any = '₹';
    if(sessionStorage.getItem('currencySymbol')){
    currencySymbol =  sessionStorage.getItem('currencySymbol');
    }
    else{
      currencySymbol = '₹';
    }
    if(value2 != undefined){
      return currencySymbol+' ';
    }
    else{
    value = Number(value).toLocaleString('en-IN', { maximumFractionDigits: 2,minimumFractionDigits:2});
    var newvalue = currencySymbol+' '+value;
    return newvalue;
    }
  }

}
