import { Pipe, PipeTransform } from '@angular/core';
import { Expense } from './bridge2';
declare var $: any;
@Pipe({
  name: 'expenseSearch'
})
export class ExpenseSearchPipe implements PipeTransform {

  // transform(value: unknown, ...args: unknown[]): unknown {
  //   return null;
  // }
  data :any;

  transform(inventory:Expense[], searchValue: string): Expense[] {
    //console.log(searchValue)
    if(!inventory || !searchValue){
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
    // return inventory.filter(inventory =>
      this.data = inventory.filter(inventory =>
      String(inventory.id)?.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()) ||
      inventory?.trip_name.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()) ||
      inventory?.employeeId[0]?.firstName.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()) ||
      inventory?.type_of_expense.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()) ||
      inventory?.expense_from.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()) ||
      inventory?.expense_to.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()) ||
      String(inventory.totalAmount)?.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase())
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
