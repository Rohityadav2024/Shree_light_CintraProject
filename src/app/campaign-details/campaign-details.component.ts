import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import {ActivatedRoute,Router } from '@angular/router';
import { CampaignName, UpdateAction, CampaignSet, Compaign } from '../campaign';
import { BridgeService } from '../modules/service/bridge.service';
declare var $: any;
import * as XLSX from 'xlsx';
import { HttpClient } from '@angular/common/http';
import { HeadingServicesService } from '../modules/service/heading-services.service';

@Component({
  selector: 'app-campaign-details',
  templateUrl: './campaign-details.component.html',
  styleUrls: ['./campaign-details.component.css']
})
export class CampaignDetailsComponent implements OnInit {
  active = 1;
  isLoading2: boolean = false;
  isLoading:boolean=false;
  idd: any;
  compaign :CampaignSet[] = [];
  UserName:any;

  pagination: any = {
    PageNo: 1,
    maxItem: 'All',
    PageShow:10
  }
  pagination2: any = {
    PageNo: 1,
    maxItem: 'All',
    PageShow:10
  }
  order_by_field:any = 'id';
  order_by_value:any = 'desc';

  getValues(obj: {}){
    return Object.values(obj)
  }

  p: number = 1;
  baseUrl2: any;
  sortedColumn: string = '';
  sortsend: boolean | undefined;

  compaign1: any = [];

  closeResult = '';
  error = '';
  success = '';
  searchValue: string = '';
  searchValue2: string = '';

  nodata: boolean = false;

  pagelimit: any = 10;

  startind = 1;
  endind = 1;
  totalCount:any = 0;

  startind2 = 1;
  endind2 = 1;
  totalCount2:any = 0;
  commonObj: any = { exportLoading: false,detailTab:'detail' };

  compaignname: CampaignName[] = [];
  Updateaction: UpdateAction = {
    CampaignId: "",
    Status: ""

  }
  paginationOption:any;
  Headingss: any[] = [];
  savedModules: any[] = [];

  constructor(private _location: Location, private http: HttpClient,private HeadingServices: HeadingServicesService, private route: Router,private router: ActivatedRoute ,private bridgeService2: BridgeService,) {
    this.baseUrl2 = this.bridgeService2.baseUrl2;
   }

  ngOnInit(): void {

    this.paginationOption=this.bridgeService2.paginationOption;
    this.idd = this.router.snapshot.params.id;
    this.Headingss = this.HeadingServices.getModule21();
    // campaign-name
    var priviousUrl = this.bridgeService2.getPreviousUrl();
    if(priviousUrl.includes('campaign-name')){
      this.commonObj.detailTab = 'Campaign';
    }
    this.bridgeService2.autoCall();
    this.getCampaignDetils()

    this.UserName = sessionStorage.getItem('UserName');
    if (this.UserName == undefined) {
      this.route.navigate(['/login']);
    }
    this.getCampaignNameList();
    this.memberlistgetAll();
    $(document).mouseup(function (e: { target: any }) {
      var popup = $('.hover-show');
      if (
        !$('.edit-delete').is(e.target) &&
        !popup.is(e.target) &&
        popup.has(e.target).length == 0
      ) {
        popup.hide();
      }
    });

    $(document).ready(function () {
      $('.hover-show').hide();
    });

    const savedModulesString = sessionStorage.getItem('savedModules');
    if (savedModulesString) {
      this.savedModules = JSON.parse(savedModulesString);
    }
  }
  backClicked() {
    this._location.back();
  }


  getCampaignDetils(): void {
    this.isLoading=true;
    this.idd = this.router.snapshot.params.id;
    this.bridgeService2.getOneCampaignSetdata(this.idd).subscribe(
      (data: CampaignSet[]) => {
        this.isLoading=false;
        this.compaign = data;
        // console.log(this.compaign);
        this.bridgeService2.PostOnemember(data[0].MemberList);
        // console.log("dt",this.compaign)
        // console.log(data[0].AllLead)



        });

  }


  replaceall(data:any){
    return data.replaceAll(",",",  ");
  }
  replaceall1(data:any){

    // console.log("d",data.length)
    return data.replaceAll(",",",4  ");
  }


  isReadMore = true
  isReadMore1 = true
  isReadMore2 = true
  isReadMore3 = true
  isReadMore4 = true
  isReadMore5 = true
  isReadMore6 = true
  showText() {
    this.isReadMore = !this.isReadMore

 }
  showText1() {
    this.isReadMore1 = !this.isReadMore1

 }
  showText2() {
    this.isReadMore2 = !this.isReadMore2

 }



 // member list tab
 emptySeach(){
  this.searchValue2 = '';
  this.searchValue = '';
  this.RowPerPage();
}
RowPerPage() {
  this.pagination.PageNo = 1;
  this.reload();
}
reload() {
    this.memberlistgetAll();
    this.getCampaignNameList();
}
 memberlistgetAll() {
  this.isLoading2 = true;
  this.isLoading=true;
  this.bridgeService2.getMemberlistByPagination(this.pagination,this.searchValue2,this.order_by_field,this.order_by_value,this.idd).subscribe(
    (data: any) => {
      if (data.status == "200") {
      this.compaign1 = data.data;
      this.totalCount = data.meta.count;
      this.isLoading2 = false;
      if(this.pagination.maxItem != 'All'){
      this.startind = ((this.pagination.PageNo - 1) * Number(this.pagination.maxItem)) + 1;
      this.endind = ((this.pagination.PageNo - 1) * Number(this.pagination.maxItem)) + Number(this.pagination.maxItem);
      if (this.endind > this.totalCount) {
        this.endind = this.totalCount;
      }
      this.pagination.PageShow = Number(this.pagination.maxItem);
    }
    else{
      this.startind = 1;
      this.endind = this.totalCount;
      this.pagination.PageShow = Number(this.totalCount);
    }
    if(this.totalCount == 0){
      this.startind = this.totalCount;
    }
  }

  else {
    alert(data.message);
    this.totalCount = 0;
    this.isLoading2 = false;
  }
},
    (err) => {
      this.isLoading2 = false;
      this.totalCount = 0;
      const delim = ':';
      const name = err.message;
      const result = name.split(delim).slice(3).join(delim);
      alert(result);
    }
  );

}




resetAlerts() {
  this.error = '';
  this.success = '';
}




// campaign details

get() {
  this.idd = this.router.snapshot.params.id;
  this.route.navigate(['/campaign/details/campaign-name/add-campaign-name/' + this.idd]);
}


suplier(item: any) {
  this.route.navigate(['/campaign/details/campaign-name/campaign-name-details/' + item]);
}
getCampaignNameList(): void {
  this.idd = this.router.snapshot.params.id;

  this.isLoading = true;

  this.bridgeService2.getCampsetlistByPagination(this.pagination,this.searchValue,this.order_by_field,this.order_by_value,this.idd).subscribe(
    (data: any) => {
      if (data.status == "200") {
      this.compaignname = data.data;
      this.totalCount2 = data.meta.count;
      this.isLoading2 = false;
      if(this.pagination2.maxItem != 'All'){
      this.startind2 = ((this.pagination2.PageNo - 1) * Number(this.pagination2.maxItem)) + 1;
      this.endind2 = ((this.pagination2.PageNo - 1) * Number(this.pagination2.maxItem)) + Number(this.pagination2.maxItem);
      if (this.endind2 > this.totalCount2) {
        this.endind2 = this.totalCount2;
      }
      this.pagination2.PageShow = Number(this.pagination.maxItem);
    }
    else{
      this.startind2 = 1;
      this.endind2 = this.totalCount2;
      this.pagination2.PageShow = Number(this.totalCount2);
    }
    if(this.totalCount2 == 0){
      this.startind2 = this.totalCount2;
    }
  }

  else {
    alert(data.message);
    this.totalCount2 = 0;
    this.isLoading2 = false;
  }
},
    (err) => {
      this.isLoading2 = false;
      this.totalCount2 = 0;
      const delim = ':';
      const name = err.message;
      const result = name.split(delim).slice(3).join(delim);
      alert(result);
    }
  );
}


editdeletepop(item: CampaignName) {
  $('.hover-show' + item.id).show();
}

deleteCustomer(id: number) {
  if (confirm('Are you want to Delete this Customer ?')) {
    this.resetAlerts();
    this.bridgeService2.deleteCustomer(id).subscribe(
      (res) => {
        this.compaignname = this.compaignname.filter(function (item) {
          return item['id'] && +item['id'] !== +id;
        });
      },
      (err) => {
        this.error = err;
      }
    );
    this.getCampaignNameList();
  } else {
    window.location.href = 'users';
  }
}


action(e1: any, e2: any) {
  // alert(e1);
  // console.log(e1, e2);
  this.Updateaction.CampaignId = e1;
  this.Updateaction.Status = e2;


  this.bridgeService2.campaignAction(this.Updateaction).subscribe(
    (res: any) => {
      // console.log("act", res)
      this.getCampaignNameList();


    }
  );

}

isModulefieldview(module_id: number, key: string): boolean {
  const selectedModule = this.savedModules?.find((module: any) => module.module_id === module_id);
  if (selectedModule) {
      const hasViewPermission = selectedModule.data.some((item: any) => item.key === key && item.view);
      return hasViewPermission;
  }
  return false;
}
}
