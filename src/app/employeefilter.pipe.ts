import { Pipe, PipeTransform } from '@angular/core';
declare var $: any;
import { Bridge } from './bridge';

@Pipe({
  name: 'employeefilter'
})
export class EmployeefilterPipe implements PipeTransform {

  data: any;
  //filter1:any;

  transform(inventory:any, searchValue: any = []): any[] {
    if(searchValue[0] == ''){
      searchValue[0] = '';
    }
    if(searchValue[1] == ''){
      searchValue[1] = '';
    }

    if(!inventory || searchValue.length == 0 ){
      return inventory;
    }

    searchValue = JSON.parse( sessionStorage.getItem('srolename') || '{}' );
    for (let i = 0; i < searchValue.length; i++) {
     // console.log(searchValue[i]);
    //   console.log(searchValue[0]);
    // console.log(searchValue[1]);
  }
    // console.log(searchValue);


    //  this.data = inventory.filter(inventory =>

    //   (inventory.role.toLocaleLowerCase().includes(searchValue[0].toLocaleLowerCase()) ||
    //   inventory.Active.toLocaleLowerCase().includes(searchValue[1].toLocaleLowerCase()))||
    //   (inventory.role.toLocaleLowerCase().includes(searchValue[0].toLocaleLowerCase()) &&
    //    inventory.Active.toLocaleLowerCase().includes(searchValue[1].toLocaleLowerCase()))
    //   );
    this.data = inventory.filter((inventory:any) =>

        inventory.role.toLocaleLowerCase().includes(searchValue[0].toLocaleLowerCase()) ||
      inventory.Active.toLocaleLowerCase().includes(searchValue[1].toLocaleLowerCase())
      // ||
      // (inventory.role.toLocaleLowerCase().includes(searchValue[0].toLocaleLowerCase()) &&
      //  inventory.Active.toLocaleLowerCase().includes(searchValue[1].toLocaleLowerCase()))
      );

      //console.log(this.data);

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
