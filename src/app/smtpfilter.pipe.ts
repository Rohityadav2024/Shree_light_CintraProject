
import { Pipe, PipeTransform } from '@angular/core';
import { Bridge,smtplist } from './bridge';

declare var $ :any;

@Pipe({
  name: 'smtpfilter'
})
export class SmtpfilterPipe implements PipeTransform {

  data :any;

  transform(indus:smtplist[], searchValue: string): smtplist[] {
    if(!indus || !searchValue){
      return indus;
    }
    this.data = indus.filter(indus=>
      indus.Host.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()) ||
      indus.Port.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()) ||
      indus.Sender.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase())
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

