import { Pipe, PipeTransform } from '@angular/core';
import { Bridge2 } from './bridge2';
declare var $: any;
@Pipe({
  name: 'leadstatusfilter'
})
export class LeadstatusfilterPipe implements PipeTransform {
  transform(inventory: Bridge2[], searchValue5: any): Bridge2[] {
    if (!inventory || searchValue5 == 'All') {
      return inventory;
    }

    searchValue5 = searchValue5.split(",")
    let mergeData: any = [];
    for (let x of searchValue5) {
      mergeData = mergeData.concat(inventory.filter(($invent) => $invent.status.toLowerCase() == x.toLowerCase()));
    }
    // searchValue5=searchValue5.split(",")
    // console.log(searchValue5)



    //   this.data = inventory.filter(func)
    //   function func(inventory: any) {
    //     let arif: any = [];
    //     let arif1: any = [];

    //     for (let i = 0; i < searchValue5.length; i++) {


    //       if (i == 0)
    //         arif = inventory.status.toLocaleLowerCase().includes(searchValue5[i].toLocaleLowerCase() );

    //       else
    //         arif = arif || inventory.status.toLocaleLowerCase().includes(searchValue5[i].toLocaleLowerCase());
    //     }

    //     console.log("arif", arif);
    //     return arif;

    //   }
    return mergeData;
  }

}
