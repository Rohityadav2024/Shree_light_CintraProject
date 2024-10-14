import { Pipe, PipeTransform } from '@angular/core';

import { Bridge2 } from './bridge2';
declare var $ :any;

@Pipe({
  name: 'leadpriority'
})
export class LeadpriorityPipe implements PipeTransform {

  data: any[]=[];
  defaultleadtype:any;
  transform(inventory:Bridge2[], searchValue5: any): Bridge2[] {

    // if(sessionStorage.getItem('leadtype')){
    //   this.defaultleadtype=sessionStorage.getItem('leadtype');
    //   searchValue5=this.defaultleadtype;
    // }
    if(!inventory || searchValue5 == 'All' ){
      return inventory;
    }
    // this.data =  inventory.filter(inventory =>
    //   inventory.leadType.toLocaleLowerCase().includes(searchValue5.toLocaleLowerCase()));

    // this.data =  inventory.filter(func)
    // function func(inventory:any) {
    //   console.log(inventory);
    //   let arif :any = [];
    //   //let arif1 :any = [];
    //    for(let i = 0; i < searchValue5.length; i++){
    //     // console.log(inventory.status.toLocaleLowerCase().includes(searchValue5[i].toLocaleLowerCase());
    //     // item_text
    //    //arif1 = inventory.status.toLocaleLowerCase().includes(searchValue5[1].toLocaleLowerCase());

    //    if(i==0)
    //    arif = inventory.leadType.toLocaleLowerCase().includes(searchValue5[i].item_text.toLocaleLowerCase())
    //     else
    //     arif = arif || inventory.leadType.toLocaleLowerCase().includes(searchValue5[i].item_text.toLocaleLowerCase());
    //    }




    //  // console.log(arif1);
    //   console.log(arif);

    //   return arif;

    // }

    searchValue5=searchValue5.split(",");
   // console.log(searchValue5)
        this.data = inventory.filter(func)
        function func(inventory: any) {
          let arif: any = [];
          let arif1: any = [];


          for (let i = 0; i < searchValue5.length; i++) {

            if (i == 0)
              arif = inventory.leadType.toLocaleLowerCase().includes(searchValue5[i].toLocaleLowerCase() );

            else
              arif = arif || inventory.leadType.toLocaleLowerCase().includes(searchValue5[i].toLocaleLowerCase());
          }

         // console.log(arif);
          return arif;

        }

      if(this.data.length == 0){
        $('#noDataFound').show();
        $('#DataFound').hide();
      }
      else{
        $('#noDataFound').hide();
        $('#DataFound').show();
      }
     // console.log(this.data);
      return this.data;
  }

}
