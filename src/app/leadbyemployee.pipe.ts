import { Pipe, PipeTransform } from '@angular/core';
import { Bridge2 } from './bridge2';

declare var $ :any;
@Pipe({
  name: 'leadbyemployee'
})
export class LeadbyemployeePipe implements PipeTransform {

  data: any;

  transform(list: Bridge2[], value: String) {
    if(!value || value == ''){
      this.data =  list;
    }
    this.data =  value ? list.filter(item => String(Object.values(item.assignedTo)[0]) == value) : list;
    if(this.data.length == 0){        
      $('#noDataFound').show();          
      $('#DataFound').hide();
    }
    else{           
      $('#noDataFound').hide();       
      $('#DataFound').show();    
    }
  return  this.data;
  }



}
