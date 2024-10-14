import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as XLSX from 'xlsx'
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { BridgeService } from '../modules/service/bridge.service';
import { BusinessPartners } from '../businesspartners';
import { opportunity } from '../opportunity';
import { HeadingServicesService } from '../modules/service/heading-services.service';
import { NotiferService } from '../modules/service/helpers/notifer.service';
declare var $: any;

@Component({
  selector: 'app-opportunity',
  templateUrl: './opportunity.component.html',
  styleUrls: ['./opportunity.component.css']
})
export class OpportunityComponent implements OnInit {
  p: number = 1;
  opporid: any;
  sortedColumn: string = '';
  sortsend: boolean | undefined;
  opportunityFilter: any;
  opportunitys: opportunity[] = [];
  businesspartners: BusinessPartners[] = [];
  commonObj : any={exportLoading:false}
  CurrentPage:any = 1;
  pagination: any = {
    PageNo: 1,
    maxItem: '10',
    PageShow:10
  }
  closeResult = '';
  UserName: any;
  error = '';
  success = '';
  totalCount:any;
  // opposearchfilter
  searchValue: string = '';

  order_by_field:any = 'id';
  order_by_value:any = 'desc';
  filter_customer: any = {StartDate:'',CardCode:'',U_LSOURCE:'',oppotype:''};

  isLoading: boolean = false;
  pagelimit: any = 10;

  startind = 1;
  endind = 1;
  defaultopportunitystartdate: any;
  defaultopportunitycustomer: any;
  defaultopportunitysource: any;
  Headingss: any[] = [];
  searchname: any;
  getFilterData: any;
  paginationnum: any;
  urlcheck: any;
  isLoading2: boolean = false;
  paginationOption:any;
  bridgess: any[] = [];
  exportStatus: boolean = false;
  savedModules: any[] = [];
  constructor(private modalService: NgbModal,public HeadingServices: HeadingServicesService,
    private _NotifierService: NotiferService, private route: Router, private bridgeService2: BridgeService) { }

  ngOnInit(): void {
    if (this.HeadingServices.isModuleView(4) == false) {
      this.route.navigate(['/dashboard']);
    }
    this.paginationOption = this.bridgeService2.paginationOption;

    this.getBusinessPartmers();
    this.filter_customer.CardCode = this.bridgeService2.getBpCardcode();
    this.getOpportunity();
    this.checkExportStatus();
    this.UserName = sessionStorage.getItem('UserName');
    if (this.UserName == undefined) {
      this.route.navigate(['/login']);
    }

    this.Headingss = this.HeadingServices.getModule4();
    $(document).mouseup(function (e: { target: any; }) {
      var popup = $(".hover-show");
      if (!$('.edit-delete').is(e.target) && !popup.is(e.target) && popup.has(e.target).length == 0) {
        popup.hide();
      }
    });

    $(document).ready(function () {
      $('.hover-show').hide()
    });

    $(document).mouseup(function (e: { target: any; }) {
      var popup = $(".sidepanel");
      if((document.getElementById("mySidepanel") as HTMLInputElement) != null){
      if (!$('.openbtn').is(e.target) && !popup.is(e.target) && popup.has(e.target).length == 0) {
        (document.getElementById("mySidepanel") as HTMLInputElement).style.width = "340";
        $('#mySidepanel').removeClass('sidepanel2');
        $('#mySidepanel').addClass('mySidepanelGo');
      }
    }
    });


    this.getAllSource();
    this.getOpportunityList();
    this.getBridge();

    const savedModulesString = sessionStorage.getItem('savedModules');
    if (savedModulesString) {
      this.savedModules = JSON.parse(savedModulesString);
    }
  }

  getBridge(): void {
    let tmp: any[] = [];
    this.bridgeService2.getAll().subscribe(
      (data: any[]) => {
        this.bridgess = data;
      },
      (err) => {
        console.log(err);
        this.error = err;
      }
    );
  }
  openNav() {
    (document.getElementById("mySidepanel") as HTMLInputElement).style.width = "340px";
    (document.getElementById("mySidepanel") as HTMLInputElement).style.zIndex = "9";
    $('#mySidepanel').addClass('sidepanel2');
    $('#mySidepanel').removeClass('mySidepanelGo');
    $('.sidepanel').show();

  }

  closeNav() {
    (document.getElementById("mySidepanel") as HTMLInputElement).style.width = "340";
    $('#mySidepanel').removeClass('sidepanel2');
    $('#mySidepanel').addClass('mySidepanelGo');
  }


  resetfilter() {
    this.filter_customer = {StartDate:'',CardCode:'',U_LSOURCE:'',oppotype:''};
    this.RowPerPage();

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
  createQuptation(id:any,type:any){
    if(type == 'Order'){
      this.bridgeService2.setOpportunityID(id);
      this.bridgeService2.setAllFilter('',undefined);
      this.route.navigate(['/order/add-order']);
    }
    else{
    // this.bridgeService2._quotation(item);
    this.bridgeService2.setOpportunityID(id);
    this.bridgeService2.setAllFilter('',undefined);
    this.route.navigate(['/quotation/add-quotation']);
    }
  }
// add here pegination here

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
    this.getOpportunity();
  }

  count = new Array();
  selectAll1() {
    let num = (document.getElementById("selectAll1") as HTMLInputElement);
    if (num.checked) {
      this.count = [];
      for (let i = 0; i < this.opportunitys.length; i++) {
        this.count.push(this.opportunitys[i].id);
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
    var filterdata:any[] = this.bridgeService2.getAllFilter('oppo');
    if(filterdata != undefined){
    this.pagination = filterdata[0];
    this.searchValue = filterdata[1];
    this.filter_customer = filterdata[2];
    this.order_by_field = filterdata[3];
    this.order_by_value = filterdata[4];
    }
  }
  setNew(){
    this.bridgeService2.setAllFilter('oppo',[this.pagination,this.searchValue,this.filter_customer,this.order_by_field,this.order_by_value]);
  }
  getOpportunity(): void {
    this.isLoading2 = true;
    this.setPrevious();
    this.bridgeService2.getOpportunityByPagination(this.pagination,this.searchValue,this.filter_customer,this.order_by_field,this.order_by_value).subscribe(
      (data: any) => {
        if (data.status == "200") {
        this.opportunitys = data.data;
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
      this._NotifierService.showError(data.message);
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
        this._NotifierService.showError(result);
      }
    );
  }

  open(content: any) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  suplier(item: any) {
    this.route.navigate(['/opportunity/opportunity-details/' + item]);
  }


  editdeletepop(item: opportunity) {
    $('.hover-show').hide();
    $('.hover-show' + item.id).toggle();

  }

  clearFilter(event: any) {
    this.pagelimit = Number(event.target.value);
    this.p = 1;
    this.startind = ((this.p - 1) * this.pagelimit) + 1;
    this.endind = ((this.p - 1) * this.pagelimit) + this.pagelimit;
    if (this.endind > this.opportunitys.length) {
      this.endind = this.opportunitys.length;
    }
  }
  pageChanged(event: any) {
    this.pagination.PageNo = event;
    this.reload();
  }
  deleteOpportunity(id: number) {
    if (confirm("Are you want to suspend this user?")) {
      this.resetAlerts();
      this.bridgeService2.deleteOppo(id).subscribe(
        (res) => {
          this.opportunitys = this.opportunitys.filter(function (item) {
            return item['id'] && +item['id'] !== +id;
          });
        },
        (err) => { this.error = err; }
      );
    }
    else {
      // window.location.href = 'users';
    }
  }

  getBusinessPartmers(): void {
    this.bridgeService2.getBusinessPartmersShortdata().subscribe(
      (data: BusinessPartners[]) => {
        this.businesspartners = data;
        // console.log(this.businesspartners)

      },
      (err) => {
        console.log(err);
        this.error = err;
      }
    );
  }

  source1: any[] = [];
  getAllSource(): void {
    this.bridgeService2.getAllSourcedata().subscribe(
      (data: any[]) => {
        this.source1 = data;
        // console.log("src", this.source1)

      },
      (err) => {
        console.log(err);
        this.error = err;
      }
    );
  }

  optyp: any;

  getOpportunityList(): void {
    this.bridgeService2.getOpportunityTypeData().subscribe(
      (data: any[]) => {
        this.optyp = data;
        // console.log('this.optyp name', this.optyp);



      },

    );
  }

  checkExportStatus() {
    const status = sessionStorage.getItem('exportStatus');
    this.exportStatus = status === 'true'; // sessionStorage stores everything as strings
  }

  // Default excel file name when download 
  fileName ="opportunity_export.xlsx";

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
