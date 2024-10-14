import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { BridgeService } from '../modules/service/bridge.service';
import { BusinessPartners } from '../businesspartners';
import { Customer } from '../customer';
import { Orders } from '../orders';
import { Quotation } from '../quotation';
import { HeadingServicesService } from '../modules/service/heading-services.service';
import { NotiferService } from '../modules/service/helpers/notifer.service';
import * as XLSX from 'xlsx'
declare var $: any;

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css']
})
export class InvoiceComponent implements OnInit {

    p: number = 1;
    orderid:any;
    sortedColumn: string = '';
    sortsend: boolean | undefined;
    orders: Orders[] = [];
    orderfilter: any[] = [];
    quotations: Quotation[] = [];
    businesspartners: BusinessPartners[] = [];
    closeResult = '';
    UserName: any;
    error = '';
    success = '';
    isLoading2: boolean = false;
    isdataLoading:boolean=false;
    pagelimit: any = 10;
    startind = ((this.p - 1) * this.pagelimit) + 1;
    endind = ((this.p - 1) * this.pagelimit) + this.pagelimit;

    defaultordercustomer:any;
    defaultorderstartdate:any;
    order_id:any = '';
    baseUrl:any;
    commonObj : any={exportLoading:false}
    CurrentPage:any = 1;
    pagination: any = {
      PageNo: 1,
      maxItem: '10',
      PageShow:10
    }
    totalCount:any;
    // opposearchfilter
    searchValue: string = '';

    order_by_field:any = 'id';
    order_by_value:any = 'desc';
    count = new Array();
    filter_customer: any = {CreateDate:'',CardCode:''};
    searchname: any;
    getFilterData: any;
    paginationnum: any;
    urlcheck: any;
    accesstoken:any;
    paginationOption:any;
    Headingss: any[] = [];
    exportStatus: boolean = false;
    savedModules: any[] = [];
    constructor(private modalService: NgbModal,private HeadingServices: HeadingServicesService,
      private _NotifierService: NotiferService, private route: Router, private bridgeService2: BridgeService) {

      this.baseUrl=bridgeService2.baseUrl2;
      // console.log(this.baseUrl)
     }

    ngOnInit(): void {
      if (!this.HeadingServices.isModuleView(8)) {
        this.route.navigate(['/dashboard']);
      }
      this.bridgeService2.autoCall();
      this.paginationOption=this.bridgeService2.paginationOption;
      this.filter_customer.CardCode = this.bridgeService2.getBpCardcode();
      this.getOrders();
      this.getBusinessPartmers();
      this.checkExportStatus();
      this.Headingss = this.HeadingServices.getModule8();
      this.UserName = sessionStorage.getItem('UserName');
      if (this.UserName == undefined) {
        this.route.navigate(['/login']);
      }
      this.accesstoken='&token='+sessionStorage.getItem('accesstoken');
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


    const savedModulesString = sessionStorage.getItem('savedModules');
    if (savedModulesString) {
      this.savedModules = JSON.parse(savedModulesString);
    }

    }
    reload() {
      this.count = [];
      $('#selectAll1').prop('checked', false);
      this.commonObj.tbCheckM_1 = false;
      this.commonObj.tbCheckM_2 = false;
      this.setNew();
      this.getOrders();
    }

      emptySeach(){
      this.searchValue = '';
      this.RowPerPage();
    }
    RowPerPage() {
      this.pagination.PageNo = 1;
      this.reload();
    }
    searchEvent(name: any) {
       this.bridgeService2.pushSearch(name.target.value);
     }
     total_after:any;
     total_Amount:any;

     getTotal(item: any) {
      var totalamount=new Array;
      for (var i = 0; i < item.DocumentLines.length; i++) {
       var basic = Number(item.DocumentLines[i].Quantity) * Number(item.DocumentLines[i].UnitPrice);
       var afterfdis = basic - (basic * (Number(item.DocumentLines[i].DiscountPercent) / 100))
       var aftersdis = afterfdis - (afterfdis * (Number(item.DiscountPercent) / 100))
       var total = aftersdis
      //  var total = aftersdis + (aftersdis * (Number(item.DocumentLines[i].Tax) / 100))
        totalamount.push(total);
      }
      var total_Amount=totalamount.reduce((a:any, b:any) => a + Number(b), 0);
      return total_Amount;
    }

    resetAlerts() {
      this.error = '';
      this.success = '';
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
   private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
    cancelOrder(id:any){
        this.bridgeService2.CancelInvoice(id).subscribe(
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
    resetfilter() {
      this.filter_customer =  {CreateDate:'',CardCode:''};
      this.RowPerPage();

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

    setPrevious(){
      var filterdata:any[] = this.bridgeService2.getAllFilter('invoice');
      if(filterdata != undefined){
      this.pagination = filterdata[0];
      this.searchValue = filterdata[1];
      this.filter_customer = filterdata[2];
      this.order_by_field = filterdata[3];
      this.order_by_value = filterdata[4];
      }
    }
    setNew(){
      this.bridgeService2.setAllFilter('invoice',[this.pagination,this.searchValue,this.filter_customer,this.order_by_field,this.order_by_value]);
    }
    getOrders(): void {
      this.isLoading2 = true;
      this.setPrevious();
      this.bridgeService2.getInvoiceByPagination(this.pagination,this.searchValue,this.filter_customer,this.order_by_field,this.order_by_value).subscribe(
        (data: any) => {
          if (data.status == "200") {
          this.orders = data.data;
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
    selectAll1() {
      let num = (document.getElementById("selectAll1") as HTMLInputElement);
      if (num.checked) {
        this.count = [];
        for (let i = 0; i < this.orders.length; i++) {
          this.count.push(this.orders[i].id);
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

    suplier(item: any) {
      this.route.navigate(['/invoice/invoice-details/' + item]);
    }

    editdeletepop(item: Orders) {
      $('.hover-show').hide();
      $('.hover-show' + item.id).show();
    }

    pageChanged(event: any) {
      this.pagination.PageNo = event;
      this.reload();
    }


    GoToPdf(id: any) {
      const encodedURL = btoa(id);
      const url = "../../assets/html/invoice.html?id="+id+this.accesstoken;
      window.open(url, '_blank');
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

    getBusinessPartmers(): void {
      this.bridgeService2.getBusinessPartmersShortdata().subscribe(
        (data: BusinessPartners[]) => {
          this.businesspartners = data;
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
  fileName ="invoice_export.xlsx";

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
  }
