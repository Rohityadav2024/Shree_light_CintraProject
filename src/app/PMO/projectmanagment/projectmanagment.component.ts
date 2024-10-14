import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as XLSX from 'xlsx';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { BridgeService } from '../../modules/service/bridge.service';
import { Customer, Industory, PaymentTerm, States } from '../../modules/model/customer';
import { Bridge } from '../../modules/model/bridge';
import { ProductItem } from 'src/app/modules/code/common-static.model';
declare var $: any;

@Component({
  selector: 'app-projectmanagment',
  templateUrl: './projectmanagment.component.html',
  styleUrls: ['./projectmanagment.component.scss']
})
export class ProjectmanagmentComponent implements OnInit {

    p: number = 1;
    nodata: boolean = false;
    sortedColumn: string = '';
    sortsend: boolean | undefined;
    customers: Customer[] = [];
    filterCustomer:any[]=[];
    statess2: States[] = [];
    closeResult = '';
    UserName: any;
    error = '';
    success = '';
    isLoading2: boolean = false;
    searchValue: string = '';
    code2: any;
    pagelimit: any = 10;
    commonObj : any={exportLoading:false}
    startind = ((this.p - 1) * this.pagelimit) + 1;
    endind = ((this.p - 1) * this.pagelimit) + this.pagelimit;
    defaultStates: any;
    industorys: Industory[] = [];
    bridgess: Bridge[] = [];
    paymentterms: PaymentTerm[] = [];
    isLoading:boolean=false;
    pagination: any = {
      PageNo: 1,
      maxItem: '10',
      PageShow:10
    }
  
    order_by_field:any = 'id';
    order_by_value:any = 'desc';
    searchname: any;
    getFilterData: any;
    paginationnum: any;
    urlcheck: any;
    totalCount:any;
    paginationOption:any;
    filter_customer: any = {Name:'',ctype:'',industry:'',saleemp:'',pterms:''};
    ProductItem: ProductItem = new ProductItem();
    constructor(
      private modalService: NgbModal,
      private route: Router,
      private bridgeService2: BridgeService
    ) { }
  
    ngOnInit(): void {
      this.bridgeService2.autoCall();
      this.paginationOption=this.bridgeService2.paginationOption;
      this.getState2();
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
  
      // filter functionality starts
  
      $(document).mouseup(function (e: { target: any; }) {
        var popup = $(".sidepanel");
        if (!$('.openbtn').is(e.target) && !popup.is(e.target) && popup.has(e.target).length == 0) {
  
        if((document.getElementById("mySidepanel") as HTMLInputElement) != null){
          (document.getElementById("mySidepanel") as HTMLInputElement).style.width = "340";
          $('#mySidepanel').removeClass('sidepanel2');
          $('#mySidepanel').addClass('mySidepanelGo');
        }
      }
      });
  
      if (sessionStorage.getItem('customerstates')) {
        this.defaultStates = JSON.parse(sessionStorage.getItem('customerstates') || '{}');
       this.Name = this.defaultStates[0];
      }
  
      this.getCustomerTypeList();
      this.getIndustory();
      this.getBridge();
      this.getPaymentTerms();
  
    }
  
    count = new Array();
    selectAll1() {
      let num = (document.getElementById("selectAll1") as HTMLInputElement);
      if (num.checked) {
        this.count = [];
        for (let i = 0; i < this.customers.length; i++) {
          this.count.push(this.customers[i].id);
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
    resetfilter() {
      this.filter_customer = {Name:'',ctype:'',industry:'',saleemp:'',pterms:''};
      this.RowPerPage();
  
    }
    RowPerPage() {
      this.pagination.PageNo = 1;
      this.reload();
    }
    getCustomer(): void {
      this.isLoading2 = true;
      this.bridgeService2.getCustomerByPagination(this.pagination,this.searchValue,this.filter_customer,this.order_by_field,this.order_by_value).subscribe(
        (data: any) => {
          this.customers = data.data;
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
        },
        (err) => {
          this.isLoading2 = false;
          console.log(err);
          this.error = err;
        }
      );
    }
  
    open(content: any) {
      this.modalService
        .open(content, { ariaLabelledBy: 'modal-basic-title' })
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
      this.route.navigate(['/customer/customer-details/' + item]);
    }
  
    editdeletepop(item: Customer) {
      $('.hover-show').hide();
      $('.hover-show' + item.id).show();
    }
  
// maximize and minimize popup here

    openmaximize(content: any) {
      this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', modalDialogClass: `modal-dialog-centered figma-cards-modal figma-cards-modal-lg` }).result.then((result) => {
        this.closeResult = `Closed with: ${result}`;
      },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
    }

    bigScreenOrMid() {
      if ((document.querySelector('.figma-cards-modal') as any).classList.contains('figma-cards-modal-lg')) {
        this.commonObj.bigScreenMode = true;
        (document.querySelector('.figma-cards-modal') as any).classList.add('figma-cards-modal-full');
        (document.querySelector('.figma-cards-modal') as any).classList.remove('figma-cards-modal-lg');
      } else {
        this.commonObj.bigScreenMode = false;
        (document.querySelector('.figma-cards-modal') as any).classList.add('figma-cards-modal-lg');
        (document.querySelector('.figma-cards-modal') as any).classList.remove('figma-cards-modal-full');
      }
    }
    deleteid: number = 0;
    deleteCustomer(id: number) {
  
      $('.delete-success-box').show();
      $('.hover-show').hide();
      this.deleteid = id;
  
      setTimeout(() => {
        $('.delete-success-box').fadeOut();
      }, 50000);  
    }
  
  // maximize and minimize popup here


    yesdeleteUser(status: number) {
      if (status == 1) {
        let id = this.deleteid;
        this.resetAlerts();
        // this.isLoading2 = true;
        this.bridgeService2.deleteCustomer(id).subscribe(
          (res) => {
            this.customers = this.customers.filter(function (item) {
              return item['id'] && +item['id'] !== +id;
            });
          },
          (err) => {
            this.error = err;
          }
        );
        this.ngOnInit();
        // this.getCustomer();
  
        $('.delete-success-box').hide();
      } else {
        // this.modalService.dismissAll();
        this.ngOnInit();
        $('.delete-success-box').hide();
      }
    }
  
    clearFilter(event: any) {
      this.pagelimit = Number(event.target.value);
      this.p = 1;
      this.startind = ((this.p - 1) * this.pagelimit) + 1;
      this.endind = ((this.p - 1) * this.pagelimit) + this.pagelimit;
  
      if (this.endind > this.customers.length) {
        this.endind = this.customers.length;
      }
      if(this.endind < 10){
        this.endind = this.customers.length;
      }
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
  
  
    customerfilter1: any = [];
    Name: any = '';
    Status: any = '';
  
    getState2(): void {
      this.bridgeService2.getStatedata("IN").subscribe(
        (data: States[]) => {
          this.statess2 = data;
          // console.log(this.statess2)
  
        },
        (err) => {
          console.log(err);
          this.error = err;
        }
      );
    }
  
    getBridge(): void {
      this.isLoading = true;
      this.bridgeService2.getAll().subscribe(
        (data: Bridge[]) => {
          this.bridgess = data;
          this.isLoading = false;
  
        },
        (err) => {
          console.log(err);
          this.error = err;
        }
      );
    }
  
  
    cstmrtype: any;
    getCustomerTypeList(): void {
      this.isLoading = true;
      this.bridgeService2.getCustomerTypeData().subscribe(
        (data: any[]) => {
          //this.isLoading = false;
          this.cstmrtype = data;
          this.isLoading = false;
  
  
        },
  
      );
    }
  
    getIndustory(): void {
      this.isLoading = true;
      this.bridgeService2.getIndustorydata().subscribe(
        (data: Industory[]) => {
          this.industorys = data;
          this.isLoading = false;
  
        },
        (err) => {
          console.log(err);
          this.error = err;
        }
      );
    }
  
    getPaymentTerms(): void {
      this.isLoading = true;
      this.bridgeService2.getPaymentTermsdata().subscribe(
        (data: PaymentTerm[]) => {
          this.paymentterms = data;
          this.isLoading = false;
  
        },
        (err) => {
          console.log(err);
          this.error = err;
        }
      );
    }
  
    searchEvent(name: any) {
      // console.log("changed", name.target.value);
      this.bridgeService2.pushSearch(name.target.value);
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
  
  
    createOpportunity(item: Customer) {
     this.bridgeService2.setBpCardcode(item.CardCode);
      this.route.navigate(['/opportunity/add-opportunity']);
  
    }
  
  }
  