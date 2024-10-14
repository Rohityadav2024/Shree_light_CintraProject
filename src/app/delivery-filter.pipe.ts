import { Pipe, PipeTransform } from '@angular/core';
import { Delivery } from './delivery';

declare var $ :any;

@Pipe({
  name: 'deliveryFilter'
})
export class DeliveryFilterPipe implements PipeTransform {

  data : any;

  transform(Delivery:Delivery[], searchValue: string): Delivery[] {
    if(!Delivery || !searchValue){
      if(Delivery.length == 0){
        $('#noDataFound').show();
        $('#DataFound').hide();
      }
      else{
        $('#noDataFound').hide();
        $('#DataFound').show();
      }
      return Delivery;
    }
    // return Delivery.filter(Delivery =>
    this.data = Delivery.filter(Delivery =>
      String(Delivery.id).toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()) ||
      Delivery.CardName.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()) ||
      Delivery.DocDate.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()) ||
      Delivery.DocDueDate.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()) ||
      Delivery.AddressExtension.ShipToStreet.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()) ||
      Delivery.DocTotal.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase())
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
