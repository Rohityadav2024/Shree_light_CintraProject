import { Pipe, PipeTransform } from '@angular/core';
import { CampaignSet } from './campaign';
declare var $: any;

@Pipe({
  name: 'campsetFilter'
})
export class CampsetFilterPipe implements PipeTransform {
  data: any
  transform(filterData: CampaignSet[], searchValue: string): CampaignSet[] {

    if (!filterData || !searchValue) {
      if (filterData.length == 0) {
        $('#noDataFound').show();
        $('#DataFound').hide();
      }
      else {
        $('#noDataFound').hide();
        $('#DataFound').show();
      }
      return filterData
    }
    this.data = filterData.filter(filterData =>
      String(filterData.id).toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()) ||
    filterData.CampaignSetName.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()) ||
    filterData.CreateDate.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase())


    );
    if (this.data.length == 0) {
      $('#noDataFound').show();
      $('#DataFound').hide();
    }
    else {
      $('#noDataFound').hide();
      $('#DataFound').show();
    }

    return this.data;
  }

}
