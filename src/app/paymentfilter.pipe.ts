import { Pipe, PipeTransform } from '@angular/core';
import { PaymentTerms } from './bridge';

declare var $:any;

@Pipe({
  name: 'paymentfilter'
})
export class PaymentfilterPipe implements PipeTransform {

  data :any;

  transform(payment:PaymentTerms[], searchValue: string): PaymentTerms[] {
    if(!payment || !searchValue){
      if(payment.length == 0){
        $('#noDataFound').show();
        $('#DataFound').hide();
      }
      else{
        $('#noDataFound').hide();
        $('#DataFound').show();
      }
      return payment;
    }

    this.data = payment.filter( payment =>
      String(payment.id).toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()) ||
      payment.GroupNumber.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()) ||
      payment.PaymentTermsGroupName.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase())
      // payment.id.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase())
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
