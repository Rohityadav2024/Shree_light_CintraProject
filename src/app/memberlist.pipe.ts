
import { Pipe, PipeTransform } from '@angular/core';
import { CampaignName, CampaignSet } from './campaign';
declare var $ :any;


@Pipe({
  name: 'memberlist'
})
export class MemberlistPipe implements PipeTransform {
  data:any
  transform(filterData: any[], searchValue:string): any[] {
    if(!filterData || !searchValue){
      if(filterData.length == 0){
        $('#noDataFoundMember').show();
        $('#DataFoundMember').hide();
      }
      else{
        $('#noDataFoundMember').hide();
        $('#DataFoundMember').show();
      }
      return filterData
    }
    this.data = filterData.filter(filterData=>
      filterData.Email.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase())||
      filterData.Phone.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase())||
      filterData.Name.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase())

    );
    if(this.data.length == 0){
      $('#noDataFoundMember').show();
      $('#DataFoundMember').hide();
    }
    else{
      $('#noDataFoundMember').hide();
      $('#DataFoundMember').show();
    }

    return this.data;
  }

}

