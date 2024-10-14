import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as XLSX from 'xlsx';
import { BridgeService } from '../modules/service/bridge.service';
import { CampaignSet, UpdateCampaignSetStatus } from '../campaign';
import { HeadingServicesService } from '../modules/service/heading-services.service';

declare var $: any;

@Component({
  selector: 'app-campaign',
  templateUrl: './campaign.component.html',
  styleUrls: ['./campaign.component.css']
})
export class CampaignComponent implements OnInit {
  compaign: CampaignSet[] = [];
  Headingss: any[] = [];
  isLoading2: boolean = false;
  nodata: boolean = false;
  success: any;
  isLoading: boolean = false;
  error: any;
  UserName: any;
  backp: any;
  CurrentPage:any = 1;
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
  savedModules: any[]=[]
  Updateaction: UpdateCampaignSetStatus = {
    CampaignSetId: "",
    Status: ""
  }
  exportStatus: boolean = false;

  constructor(private route: Router, public bridgeService2: BridgeService,
    private HeadingServices: HeadingServicesService) { }

  ngOnInit(): void {
    if (this.HeadingServices.isModuleView(2) == false) {
      this.route.navigate(['/dashboard']);
    }
    this.bridgeService2.autoCall();
    this.getCustomer();
    this.Headingss = this.HeadingServices.getModule21();
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

    const savedModulesString = sessionStorage.getItem('savedModules');
    if (savedModulesString) {
      this.savedModules = JSON.parse(savedModulesString);
    }
  }


  suplier(item: any) {

    this.route.navigate(['/campaign/details/' + item]);
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
      for (let i = 0; i < this.compaign.length; i++) {
        this.count.push(this.compaign[i].id);
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
      this.setNew();
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
  setPrevious(){
    var filterdata:any[] = this.bridgeService2.getAllFilter('campain');
    if(filterdata != undefined){
    this.pagination = filterdata[0];
    this.searchValue = filterdata[1];
    this.order_by_field = filterdata[2];
    this.order_by_value = filterdata[3];
    }
  }
  setNew(){
    this.bridgeService2.setAllFilter('campain',[this.pagination,this.searchValue,this.order_by_field,this.order_by_value]);
  }
  getCustomer(): void {
    this.isLoading2 = true;
    this.setPrevious();
    this.bridgeService2.getCampsetByPagination(this.pagination,this.searchValue,this.order_by_field,this.order_by_value).subscribe(
      (data: any) => {
        if (data.status == "200") {
        this.compaign = data.data;
        this.totalCount = data.meta.count;
        this.CurrentPage = this.pagination.PageNo;
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


  fileName ="campaign_export.xlsx";

  Exportexcel(){
    // passing table-id
    let data = document.getElementById("table-data");
    const ws:XLSX.WorkSheet = XLSX.utils.table_to_sheet(data)

    // Generete workbook and add the worksheet
    const wb:XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb,ws, 'Sheet1')

    // Save to file
    XLSX.writeFile(wb, this.fileName)
  }

  isModuleViewadd(module_id: number): boolean {
    const selectedModule = this.savedModules?.filter((module: any) => module.module_id === module_id);
    if (selectedModule && selectedModule.length > 0 && selectedModule[0].is_add) {
      return true;
    }
    return false;
  }

  isModuleViewedit(module_id: number): boolean {
    const selectedModule = this.savedModules?.filter((module: any) => module.module_id === module_id);
    if (selectedModule && selectedModule.length > 0 && selectedModule[0].is_edit) {
      return true;
    }
    return false;
  }


}
