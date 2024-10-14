import { Pipe, PipeTransform } from '@angular/core';
declare var $: any;
@Pipe({
  name: 'opportunityfilter'
})
export class OpportunityfilterPipe implements PipeTransform {

  data: any;
  transform(inventory:any[], searchValue: any = []): any[] {
   // console.log(searchValue[0]);
    if(searchValue[0] == ''){
      searchValue[0] = 'NAN';
    }
    if(searchValue[1] == ''){
      searchValue[1] = 'NAN';
    }
    if(searchValue[2] == ''){
      searchValue[2] = 'NAN';
    }

    // filter using session start


    if(sessionStorage.getItem('opportunitystartdate')){
      searchValue[0] = sessionStorage.getItem('opportunitystartdate');
      if(searchValue[0] == ''){
        searchValue[0] = 'NAN';
      }
      }


      if(sessionStorage.getItem('opportunitycustomer')){
        searchValue[1] = sessionStorage.getItem('opportunitycustomer');
        if(searchValue[1] == '' ){
          searchValue[1] = 'NAN';
        }
        }

      // if(sessionStorage.getItem('leadstatus')){
      // this.defaultleadstatus = JSON.parse( sessionStorage.getItem('leadstatus') || '{}' );
      // for (let i = 0; i < this.defaultleadstatus.length; i++) {
      //   this.status=this.defaultleadstatus[i];
      // }


      // }

      if(sessionStorage.getItem('opportunitysource')){
        searchValue[2] = sessionStorage.getItem('opportunitysource');
        if(searchValue[2] == ''){
          searchValue[2] = 'NAN';
        }
      }

    // filter using session close
//console.log(searchValue[0],searchValue[1],searchValue[2])
    if(!inventory || searchValue.length == 0 ){
      return inventory;
    }

     this.data = inventory.filter(inventory =>
      inventory.StartDate.toLocaleLowerCase().includes(searchValue[0].toLocaleLowerCase())||
      inventory.CardCode.toLocaleLowerCase().includes(searchValue[1].toLocaleLowerCase())||
      inventory.U_LSOURCE.toLocaleLowerCase().includes(searchValue[2].toLocaleLowerCase())||
      inventory?.U_TYPE[0]?.id === Number(searchValue[3])


      );

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
