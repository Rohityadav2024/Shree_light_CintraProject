import { Pipe, PipeTransform } from '@angular/core';
import { Bridge, Industry } from './bridge';

declare var $ :any;

@Pipe({
  name: 'indussearchfilter'
})
export class IndussearchfilterPipe implements PipeTransform {

  data :any;

  transform(indus:Industry[], searchValue: string): Industry[] {
    if(!indus || !searchValue){
      if(indus.length == 0){
        $('#noDataFound').show();
        $('#DataFound').hide();
      }
      else{
        $('#noDataFound').hide();
        $('#DataFound').show();
      }
      return indus;
    }
    this.data = indus.filter(indus=>
      String(indus.id).toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()) ||
      indus.IndustryDescription.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()) ||
      indus.IndustryName.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()) ||
      indus.IndustryCode.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase())
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
