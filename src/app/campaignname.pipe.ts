

import { Pipe, PipeTransform } from '@angular/core';
import { CampaignName, CampaignSet } from './campaign';
declare var $ :any;


@Pipe({
  name: 'campaignname'
})
export class CampaignnamePipe implements PipeTransform {
  data:any
  transform(compaignname :CampaignName[], searchValue:string): CampaignName[] {
    if(!compaignname || !searchValue){
      if(compaignname.length == 0){
        $('#noDataFound').show();
        $('#DataFound').hide();
      }
      else{
        $('#noDataFound').hide();
        $('#DataFound').show();
      }
      return compaignname
    }
    this.data = compaignname.filter(compaignname=>
      String(compaignname.id).toLocaleLowerCase().includes(searchValue.toLocaleLowerCase())||
      compaignname.CampaignName.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase())||
      compaignname.Type.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase())||
      compaignname.CreateDate.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase())||
      compaignname.Frequency.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase())
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
