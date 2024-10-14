import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { CampaignName, UpdateAction } from '../campaign';
import { BridgeService } from '../modules/service/bridge.service';
declare var $: any;
@Component({
  selector: 'app-campaign-name',
  templateUrl: './campaign-name.component.html',
  styleUrls: ['./campaign-name.component.css']
})
export class CampaignNameComponent implements OnInit {
  compaignname: CampaignName[] = [];
  isLoading2: boolean = false;
  isLoading:boolean=false;
  nodata: boolean = false;
  success: any;
  error: any;
  UserName: any;
  idd: any;
  Updateaction: UpdateAction = {
    CampaignId: "",
    Status: ""
  }
  
  pagination: any = {
    PageNo: 1,
    maxItem: '10',
    PageShow:10
  }
  sortsend: boolean | undefined;
  searchValue: string = '';
  startind = 1;
  endind = 1;
  commonObj : any={exportLoading:false}
  totalCount:any;
  order_by_field:any = 'id';
  order_by_value:any = 'desc';
  constructor(private _location: Location, private router: ActivatedRoute, private route: Router, private bridgeService2: BridgeService) { }

  ngOnInit(): void {
    this.bridgeService2.autoCall();
    this.idd = this.router.snapshot.params.id;
    this.getCustomer();

    this.UserName = sessionStorage.getItem('UserName');
    if (this.UserName == undefined) {
      this.route.navigate(['/login']);
    }
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
  }


  backClicked() {
    this._location.back();
  }
  get() {
    this.idd = this.router.snapshot.params.id;
    this.route.navigate(['/campaign/details/campaign-name/add-campaign-name/' + this.idd]);

  }
  suplier(item: any) {
    this.route.navigate(['/campaign/details/campaign-name/campaign-name-details/' + item]);
  }

  editdeletepop(item: any) {
    $('.hover-show').hide();
    $('.hover-show' + item.id).show();
  }
  
  count = new Array();
  selectAll1() {
    let num = (document.getElementById("selectAll1") as HTMLInputElement);
    if (num.checked) {
      this.count = [];
      for (let i = 0; i < this.compaignname.length; i++) {
        this.count.push(this.compaignname[i].id);
      }
      $("input[class=checkbox]").prop("checked", $("#selectAll1").prop("checked"));
      $(".extra-area").show();
    }
    else {
      this.count = [];
      $("input[class=checkbox]").prop("checked", $("#selectAll1").prop("checked"), false);
      $(".extra-area").hide();
    }
    if (this.count.length == 1) {
      this.commonObj.tbCheckM_1 = true;
      this.commonObj.tbCheckM_2 = true;
    } else if (this.count.length > 1) {
      this.commonObj.tbCheckM_1 = true;
      this.commonObj.tbCheckM_2 = false;
    } else {
      this.commonObj.tbCheckM_1 = false;
      this.commonObj.tbCheckM_2 = false;
    }

  }

  checkboxclick(id: any) {
    if(this.count.includes(id)){
      const index = this.count.indexOf(id);
      if (index > -1) { // only splice array when item is found
        this.count.splice(index, 1); // 2nd parameter means remove one item only
      }
    }
    else{
    this.count.push(id);
    }
    if (this.count.length == 1) {
      this.commonObj.tbCheckM_1 = true;
      this.commonObj.tbCheckM_2 = true;
    } else if (this.count.length > 1) {
      this.commonObj.tbCheckM_1 = true;
      this.commonObj.tbCheckM_2 = false;
    } else {
      this.commonObj.tbCheckM_1 = false;
      this.commonObj.tbCheckM_2 = false;
    }
    if (this.count.length == 0) {
      $('#selectAll1').prop('checked', false);
    }

    if (this.endind == this.count.length) {
      $('#selectAll1').prop('checked', true);
    }
    else {
      $('#selectAll1').prop('checked', false);
    }

  }
  reload() {
    this.count = [];
      $('#selectAll1').prop('checked', false);
      this.commonObj.tbCheckM_1 = false;
      this.commonObj.tbCheckM_2 = false;
      this.getCustomer();
  }

  resetAlerts() {
    this.error = '';
    this.success = '';
  }

  emptySeach(){
    this.searchValue = '';
    this.RowPerPage();
  }
  RowPerPage() {
    this.pagination.PageNo = 1;
    this.reload();
  }
  
  pageChanged(event:any){
    this.pagination.PageNo = event;
    this.reload();
  }
  togglesortType(key: any) {
    this.sortsend = !this.sortsend;
    this.order_by_field = key;
    if(this.sortsend == true){
      this.order_by_value = 'asc';
    }
    else{
      this.order_by_value = 'desc';
    }
    this.RowPerPage();
  }

  getCustomer(): void {
    this.isLoading2 = true;
    this.bridgeService2.getCampsetlistByPagination(this.pagination,this.searchValue,this.order_by_field,this.order_by_value,this.idd).subscribe(
      (data: any) => {
        if (data.status == "200") {
        this.compaignname = data.data;
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

}
