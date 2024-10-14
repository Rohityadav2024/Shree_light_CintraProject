import { Pipe, PipeTransform } from '@angular/core';
import { Bridge2 } from './bridge2';
declare var $ :any;

@Pipe({
  name: 'leadcatefilter'
})
export class LeadcatefilterPipe implements PipeTransform {
data: any;
defaultleadcate:any;

  transform(inventory:Bridge2[], searchValue5: string): Bridge2[] {
if(sessionStorage.getItem('leadcat')){
  this.defaultleadcate=sessionStorage.getItem('leadcat');
  searchValue5=this.defaultleadcate;
}


    if(!inventory || searchValue5 == 'All' ){
      if(inventory.length == 0){
        $('#noDataFound').show();
        $('#DataFound').hide();
      }
      else{
        $('#noDataFound').hide();
        $('#DataFound').show();
      }
      return inventory;
    }
    else if(searchValue5 == 'ass'){
      this.data =  searchValue5 ? inventory.filter(item => String(Object.values(item.assignedTo)[0]) != String(Object.values(item.employeeId)[0])) : inventory;
    }
    else if(searchValue5 == 'un'){
      this.data =  searchValue5 ? inventory.filter(item => String(Object.values(item.assignedTo)[0]) == String(Object.values(item.employeeId)[0])) : inventory;
       }
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
