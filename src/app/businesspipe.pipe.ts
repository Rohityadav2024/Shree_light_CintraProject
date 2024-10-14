import { Pipe, PipeTransform } from '@angular/core';
declare var $: any;
@Pipe({
  name: 'businesspipe'
})
export class BusinesspipePipe implements PipeTransform {

  data :any;
  //defaultopportunitycustomer:any;
  transform(filterData: any, searchValue:string): any {
    if(!filterData || !searchValue){
      return filterData;
    }

    // if(sessionStorage.getItem('opportunitycustomer')){
    //   this.defaultopportunitycustomer = sessionStorage.getItem('opportunitycustomer');
    //   searchValue=this.defaultopportunitycustomer;
    //   console.log(searchValue);

    //   }

    this.data= filterData.filter((filterData:any) =>
      filterData.CardCode.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase())
    );

    //console.log(this.data);

    if(this.data.length == 0){
      //(<HTMLInputElement>document.getElementById('noDataFound')).style.display = "contents";
      $("#noDataFound").show();
      $("#DataFound").hide();
     // (<HTMLInputElement>document.getElementById('DataFound')).style.display = "none";
    } else{
      $("#noDataFound").hide();
      $("#DataFound").show();
     // (<HTMLInputElement>document.getElementById('noDataFound')).style.display = "none";
     // (<HTMLInputElement>document.getElementById('DataFound')).style.display = "contents";
    }

    return this.data;
  }

}


