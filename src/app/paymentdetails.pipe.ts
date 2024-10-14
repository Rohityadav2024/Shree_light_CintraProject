import { Pipe, PipeTransform } from '@angular/core';
import { Payment } from './bridge2';
declare var $:any;

@Pipe({
  name: 'paymentdetails'
})
export class PaymentdetailsPipe implements PipeTransform {

  data :any;
  transform(payment:Payment[], searchValue: string): any {

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
      payment.InvoiceNo.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()) ||
      payment.TransactMod.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()) ||
      payment.PaymentDate.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()) ||
      payment.TransactId .toLocaleLowerCase().includes(searchValue.toLocaleLowerCase())
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
