import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { BridgeService } from '../modules/service/bridge.service';
import { BusinessPartners } from '../businesspartners';
import { Customer } from '../customer';
import { HeadingServicesService } from '../modules/service/heading-services.service';
import { NotiferService } from '../modules/service/helpers/notifer.service';
import { Quotation } from '../quotation';
import * as XLSX from 'xlsx'
declare var $: any;

@Component({
  selector: 'app-quotation',
  templateUrl: './quotation.component.html',
  styleUrls: ['./quotation.component.css'],
})
export class QuotationComponent implements OnInit {
  p: number = 1;
  sortedColumn: string = '';
  sortsend: boolean | undefined;
  quotations: Quotation[] = [];
  quotationsfilter: any[] = [];
  businesspartners: BusinessPartners[] = [];
  closeResult = '';
  UserName: any;
  error = '';
  success = '';

  isLoading2: boolean = false;
  isdataLoading:boolean=false;
  searchValue: string = '';
  bpid: any;
  oppid: any;
  pagelimit: any = 10;

  startind = 1;
  endind = 1;
  quotationFilter: any[] = [];
  defaultquotationstartdate: any;
  defaultquotationcustomer: any;
  baseUrl: any;

  searchname: any;
  getFilterData: any;
  CurrentPage:any = 1;
  pagination: any = {
    PageNo: 1,
    maxItem: '10',
    PageShow:10
  }
  count = new Array();
  commonObj : any={exportLoading:false}
  order_by_field:any = 'id';
  order_by_value:any = 'desc';
  totalCount:any;
  filter_customer: any = {CreateDate:'',CardCode:'',OppID:'',is_draft:''};
  urlcheck: any;
  accesstoken:any;
  Headingss: any[] = [];
  exportStatus: boolean = false;
  savedModules: any[] = [];
  constructor(
    private modalService: NgbModal,
    private route: Router,private HeadingServices: HeadingServicesService,
    private _NotifierService: NotiferService,
    private bridgeService2: BridgeService
  ) {

  }

  ngOnInit(): void {
    if (!this.HeadingServices.isModuleView(5)) {
      this.route.navigate(['/dashboard']);
    }
    this.baseUrl = this.bridgeService2.baseUrl2;
    // console.log(this.baseUrl);
    this.bridgeService2.autoCall();
    this.filter_customer.CardCode = this.bridgeService2.getBpCardcode();
    this.filter_customer.OppID = this.bridgeService2.getOpportunityID();
    this.getQuotation();
    this.getBusinessPartmers();
    this.checkExportStatus();
    this.Headingss = this.HeadingServices.getModule5();

    this.UserName = sessionStorage.getItem('UserName');
    this.accesstoken='&token='+sessionStorage.getItem('accesstoken');
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

    const savedModulesString = sessionStorage.getItem('savedModules');
    if (savedModulesString) {
      this.savedModules = JSON.parse(savedModulesString);
    }

  }

  searchEvent(name: any) {
     this.bridgeService2.pushSearch(name.target.value);
   }

  resetAlerts() {
    this.error = '';
    this.success = '';
  }

  openNav() {
    (document.getElementById("mySidepanel") as HTMLInputElement).style.width = "340px";
    (document.getElementById("mySidepanel") as HTMLInputElement).style.zIndex = "9";
    $('#mySidepanel').addClass('sidepanel2');
    $('#mySidepanel').removeClass('mySidepanelGo');
    $('.sidepanel').show();

  }

  /* Set the width of the sidebar to 0 (hide it) */
  closeNav() {
    (document.getElementById("mySidepanel") as HTMLInputElement).style.width = "340";
    $('#mySidepanel').removeClass('sidepanel2');
    $('#mySidepanel').addClass('mySidepanelGo');
  }

  emptySeach(){
    this.searchValue = '';
    this.RowPerPage();
  }
  resetfilter() {
    this.filter_customer =  {CreateDate:'',CardCode:'',OppID:'',is_draft:''};
    this.RowPerPage();

  }
  RowPerPage() {
    this.pagination.PageNo = 1;
    this.reload();
  }
  reload() {
    this.count = [];
      $('#selectAll1').prop('checked', false);
      this.commonObj.tbCheckM_1 = false;
      this.commonObj.tbCheckM_2 = false;
      this.setNew();
      this.getQuotation();
  }

  pageChanged(event:any){
    this.pagination.PageNo = event;
    this.reload();
  }
  selectAll1() {
    let num = (document.getElementById("selectAll1") as HTMLInputElement);
    if (num.checked) {
      this.count = [];
      for (let i = 0; i < this.quotations.length; i++) {
        this.count.push(this.quotations[i].id);
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
    var filterdata:any[] = this.bridgeService2.getAllFilter('quotation');
    if(filterdata != undefined){
    this.pagination = filterdata[0];
    this.searchValue = filterdata[1];
    this.filter_customer = filterdata[2];
    this.order_by_field = filterdata[3];
    this.order_by_value = filterdata[4];
    }
  }
  setNew(){
    this.bridgeService2.setAllFilter('quotation',[this.pagination,this.searchValue,this.filter_customer,this.order_by_field,this.order_by_value]);
  }
  getQuotation(): void {
    this.isLoading2 = true;
    this.setPrevious();
    this.bridgeService2.getQuotationByPagination(this.pagination,this.searchValue,this.filter_customer,this.order_by_field,this.order_by_value).subscribe(
      (data: any) => {
        if (data.status == "200") {
        this.quotations = data.data;
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
  total_after:any;
  total_Amount:any;
  getTotal(item: any) {
    var totalamount=new Array;
    for (var i = 0; i < item.DocumentLines.length; i++) {
     var basic = Number(item.DocumentLines[i].Quantity) * Number(item.DocumentLines[i].UnitPrice);
     var afterfdis = basic - (basic * (Number(item.DocumentLines[i].DiscountPercent) / 100))
     var aftersdis = afterfdis - (afterfdis * (Number(item.DiscountPercent) / 100))
     var total = aftersdis + (aftersdis * (Number(item.DocumentLines[i].Tax) / 100))
     console.log(item)
      totalamount.push(total);
    }
    var total_Amount=totalamount.reduce((a:any, b:any) => a + Number(b), 0);
    return total_Amount;
  }
  open(content: any,id:any) {
    this.GetAppHistory(id);
    this.Payload.status = 0;
    this.Payload.remark = '';
    this.modalService
    .open(content, { ariaLabelledBy: 'modal-basic-title', modalDialogClass: 'modal-dialog-centered userList-cards-modal' })
    .result.then(
      (result) => {
        this.closeResult = `Closed with: ${result}`;
      },
      (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      }
    );
  }

  Idd:any;
  Payload:any = {
    "status":0,
    "remark":"",
    "user":sessionStorage.getItem('SalesEmployeeCode')
}

  isShow:boolean = false;
  showhid(){
    this.isShow = !this.isShow;
  }
  AppHistoryData:any[] = [];
  is_visible:any;
  GetAppHistory(id:any){
    this.bridgeService2.AppruvedHistory(id,5).subscribe(
      (res: any) => {
        if (Object(res)['status'] == "200") {
          this.AppHistoryData = res.data;
          this.AppHistoryData[0].json_fields = JSON.parse(res.data[0].json_fields);
          this.is_visible = res.is_visible;
          this.Idd = res.approval_id;
        }
        else {
          this._NotifierService.showError(Object(res)['message']);
        }
      },
      (err) => {
        const delim = ":"
        const name = err.message
        const result = name.split(delim).slice(3).join(delim)
        console.log(result);
      }
    );
  }
  jsonpart(val:any){
    return JSON.parse(val);
  }
  SendRequest(){
    this.bridgeService2.AppruvedRequest(this.Payload,this.Idd).subscribe(
      (res: any) => {
        if (Object(res)['status'] == "200") {
          // this.AppHistoryData = res.data;

          this._NotifierService.showSuccess('Status Updated Successfully !');
          this.modalService.dismissAll();
          this.reload();

        }
        else {
          this._NotifierService.showError(Object(res)['message']);
        }
      },
      (err) => {
        const delim = ":"
        const name = err.message
        const result = name.split(delim).slice(3).join(delim)
        console.log(result);
      }
    );
  }

  openLock(lockcontent: any) {
    this.modalService
      .open(lockcontent, { ariaLabelledBy: 'modal-basic-title' })
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
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
    this.route.navigate(['/quotation/quotation-details/' + item]);
  }

  editdeletepop(item: Quotation) {
    $('.hover-show').hide();
    $('.hover-show' + item.id).show();
  }

  CanelID: any;
  CanelOrderPopup(confirmModal:any,id: number) {
   this.modalService
   .open(confirmModal, { ariaLabelledBy: 'modal-basic-title',backdrop: 'static', modalDialogClass: 'confirm-modal modal-dialog-centered' })
   .result.then(
     (result) => {
       this.closeResult = `Closed with: ${result}`;
     },
     (reason) => {
       this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
     }
   );
   this.CanelID = id;
 }
  cancelOrder(id:any){
      this.bridgeService2.CancelQuotation(id).subscribe(
        (res: any) => {
          if (Object(res)['status'] == "200") {
            this.modalService.dismissAll();
            this.RowPerPage();
          }
          else {
            this._NotifierService.showError(Object(res)['message']);
          }
        },
        (err) => {
          const delim = ":"
          const name = err.message
          const result = name.split(delim).slice(3).join(delim)
          this._NotifierService.showError(result);
        }
      );

  }

  createOrder(item: Quotation) {
    this.bridgeService2.SetQuotationId(item.id);
    this.bridgeService2.setAllFilter('',undefined);
    this.route.navigate(['/order/add-order']);
  }

  GoToPdf(id: any) {
    const encodedURL = btoa(id);
    // const url = this.baseUrl2+"/static/html/quotation.html?id="+id;
    const url = "../../assets/html/quotation.html?id=" + id+this.accesstoken;

    // const url = 'http://103.234.187.197:8005/static/html/quotation.html?id=' + id;
    window.open(url, '_blank');
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

  checkExportStatus() {
    const status = sessionStorage.getItem('exportStatus');
    this.exportStatus = status === 'true'; // sessionStorage stores everything as strings
  }

  // Default excel file name when download
  fileName ="quotation_export.xlsx";

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

