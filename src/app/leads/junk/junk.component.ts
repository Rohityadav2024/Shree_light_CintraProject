import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import * as XLSX from 'xlsx';
import { HttpClient } from '@angular/common/http';
import { AddFollow2, Bridge2, EditBridge2 } from '../../bridge2';
import { BridgeService } from '../../modules/service/bridge.service';
import { NgbModal, ModalDismissReasons, } from '@ng-bootstrap/ng-bootstrap';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Bridge } from '../../bridge';
import { DatePipe } from '@angular/common';
import { HeadingServicesService } from 'src/app/modules/service/heading-services.service';
import { NotiferService } from 'src/app/modules/service/helpers/notifer.service';
declare var $: any;

@Component({
  selector: 'app-junk',
  templateUrl: './junk.component.html',
  styleUrls: ['./junk.component.scss']
})
export class JunkComponent implements OnInit {

    baseUrl2: any;
    bridgess: Bridge[] = [];
    commonObj : any={exportLoading:false}
    nodata: boolean = false;
    p: number = 1;
    Com_name: any;
    searchValue: string = '';
    stringifiedData: any;
    getValues(obj: {}) {
      return Object.values(obj)
    }
    bridges2: Bridge2[] = [];
    UserId = sessionStorage.getItem('UserId');




    error = '';
    success = '';
    closeResult = '';
    UserName: any;
    role: any;
    reportingTo: any;
    isLoading: boolean = false;
    isView:boolean = false;
    exedate: any;
    execname: any;
    exeEemail: any;
    exelocation: any;
    exesource: any;
    exeremarks: any;
    exeproductinterest: any;
    exedesignation: any;
    exenoofemp: any;
    exeturnover: any;
    ischeckbox: boolean = false;
    AddFollow2s: AddFollow2[] = [];

    //  baseUrl = 'http://103.234.187.199:8050/lead/create';
    //  baseUrlNew2 = 'http://103.234.187.199:8050/lead/delete';

    //  baseUrlAssign = 'http://103.234.187.199:8050/lead/assign';
    data: [][] | undefined;
    bridgessmanger: any;
    pagelimit: any = 10;

  startind = 1;
  endind = 1;
    totalCount:any;
    order_by_field:any = 'id';
    order_by_value:any = 'desc';
    leadtype = 'All';

    cate = 'All';
    leadtype2 = 'All';
    status = 'All';
    status2: any = [];

    cate2 = 'All';
    assignedTo = 'All';
    assignto2: any = {};
    source = 'All';
    source2: any = {};
    leadpriority = 'All';
    leadpriority2: any = {};
    leadgenerated = 'All';
    leadgeneratedfrom: any = '';
    leadgeneratedto: any = '';
    filterLead: any = {};
    defaultleadtype: any;
    defaultleadstatus: any;
    defaultleadcat: any;
    dropdownSettings1 = {};
    dropdownList1: any = [];
    dropdownLead: any[] = [];
    dropdowncategory: any[] = [];
    AssigneddropdownList: any[] = [];

    selectedName: any;
    findassaignName: any;
    lead_id: any;
    selectedValue: any;
    searchAssignValue: any = null;
    pagination: any = {
      PageNo: 1,
      maxItem: '10',
      PageShow:10
    }
    Headingss: any[] = [];
    constructor(private router: Router,
      private HeadingServices: HeadingServicesService, private _NotifierService: NotiferService, public datepipe: DatePipe, private http: HttpClient, private bridgeService2: BridgeService, private modalService: NgbModal) {
      this.baseUrl2 = this.bridgeService2.baseUrl2;
    }

    ngOnInit() {
      this.bridgeService2.autoCall();
      this.Headingss = this.HeadingServices.getModule2();
      this.getAllSource();
      this.getBridge2();
      this.getBridge();
      $(document).mouseup(function (e: { target: any; }) {
        var popup = $(".hover-show");
        if (!$('.edit-delete').is(e.target) && !popup.is(e.target) && popup.has(e.target).length == 0) {
          popup.hide();
        }
      });

      $(document).ready(function () {
        $('.hover-show').hide()
      });



      this.ischeckbox = false;
      this.UserName = sessionStorage.getItem('UserName');
      this.UserId = sessionStorage.getItem('UserId');
      if (this.UserName == undefined) {
        this.router.navigate(['/login']);
      }
      this.role = sessionStorage.getItem('role');
      this.reportingTo = sessionStorage.getItem('reportingTo');
      if (this.UserName == undefined) {
        this.router.navigate(['/login']);
      }

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
    }

    onItemSelect1(item: any) {
      //this.getBridge2();
    }
    onSelectAll1(items: any) {
      // console.log(items)
      // this.getBridge2();
    }
    public onDeSelectAll1(items: any) {
      // console.log(items);
      // this.getBridge2();
    }

    onDeSelect1(items: any) {
    }


    selectedData: any[] = [];

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

    public getDaysArray = [];

    leadgeneratedarr: any = [];


    checkboxclick2() {
      let leng = this.bridges2.length;
      var count = new Array();
      for (let i = 0; i < leng; i++) {
        let num = (document.getElementById("checkbox" + this.bridges2[i]['id']) as HTMLInputElement);
        if (num?.checked) {
          count.push(num.value);
        }
      }
      if (count.length >= 1) {
        $(".extra-area2").show();
      }
      else {
        $(".extra-area2").hide();
        $('#selectAll12').prop('checked', false);
      }
    }

    getBridge(): void {
      let tmp: any[] = [];
      this.bridgeService2.getAll().subscribe(
        (data: Bridge[]) => {
          this.bridgess = data;
        },
        (err) => {
          console.log(err);
          this.error = err;
        }
      );
    }

    count = new Array();
    selectAll1() {
      let num = (document.getElementById("selectAll1") as HTMLInputElement);
      if (num.checked) {
        this.count = [];
        for (let i = 0; i < this.bridges2.length; i++) {
          this.count.push(this.bridges2[i].id);
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
        this.getBridge2();
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
    emptySeach(){
      this.searchValue = '';
      this.RowPerPage();
    }
    resetfilter() {
      this.filterLead = {}
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
    getBridge2(): void {
      this.isLoading = true;
      // console.log(this.filterLead)
      this.bridgeService2.getLeadByPagination(this.pagination,this.searchValue,this.filterLead,this.order_by_field,this.order_by_value,'junk').subscribe(
        (data: any) => {
          this.bridges2 = data.data;
          this.totalCount = data.meta.count;
          this.isLoading = false;
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
          this.isLoading = false;
          console.log(err);
          this.error = err;
        }
      );

    }

    resetAlerts() {
      this.error = '';
      this.success = '';
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

    editdeletepop(item: Bridge2) {
      $('.hover-show').hide();
      $('.hover-show' + item.id).show()
    }

    Isdelete:boolean = false;
    JunkId:any;
    confirmModal(confirmModal2:any,Isdelete:boolean,JunkId:any) {
      this.JunkId = JunkId;
      this.Isdelete = Isdelete;
      this.modalService
      .open(confirmModal2, { ariaLabelledBy: 'modal-basic-title',backdrop: 'static', modalDialogClass: 'confirm-modal modal-dialog-centered' })
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
    }

    multipleDelete1(count:any) {
        this.bridgeService2.junkleads(count,0).subscribe(
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
            // this.isLoading3 = false;
            const delim = ":"
            const name = err.message
            const result = name.split(delim).slice(3).join(delim)
            this._NotifierService.showError(result);
          }
        );
    }


    multipleDelete2(count:any) {
        this.bridgeService2.deleteleads(count).subscribe(
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
            // this.isLoading3 = false;
            const delim = ":"
            const name = err.message
            const result = name.split(delim).slice(3).join(delim)
            this._NotifierService.showError(result);
          }
        );
    }
    suplier(item: any) {
      this.router.navigate(['/leads/junk/lead-details/' + item]);
    }

    totalItems:any;
    sortedColumn: string = '';
    sortsend: boolean | undefined;

    isDesc: boolean = false;

    source1: any;
    getAllSource(): void {
      let sourcetmp: any[] = [];
      this.bridgeService2.getAllSourcedata().subscribe(
        (data: any[]) => {
          this.source1 = data;
          // console.log(this.source1)

        },
        (err) => {
          console.log(err);
          this.error = err;
        }
      );
    }

  }





