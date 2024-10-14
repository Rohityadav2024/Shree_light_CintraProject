import { Component, OnInit, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import * as XLSX from 'xlsx';
import { HttpClient } from '@angular/common/http';
import { AddFollow2, Bridge2, EditBridge2 } from '../bridge2';
import { BridgeService } from '../modules/service/bridge.service';
import { NgbModal, ModalDismissReasons, } from '@ng-bootstrap/ng-bootstrap';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Bridge } from '../bridge';
import { DatePipe } from '@angular/common';
import { HeadingServicesService } from '../modules/service/heading-services.service';
import { NotiferService } from '../modules/service/helpers/notifer.service';
import { PhoneComponent } from '../phone/phone.component';
import { CommonModulesPayload } from '../modules/code/common-static.model';
declare var $: any;
@Component({
  selector: 'app-excelsheet',
  templateUrl: './excelsheet.component.html',
  styleUrls: ['./excelsheet.component.css'],
})
export class ExcelsheetComponent implements OnInit {
  @ViewChild(PhoneComponent) childComponent!: PhoneComponent;
  @ViewChild('contentEdit') contentEdit!: ElementRef;
  @ViewChild('followup') followup!: ElementRef;

  baseUrl2: any;
  bridgess: Bridge[] = [];
  commonObj: any = { exportLoading: false }
  nodata: boolean = false;
  p: number = 1;
  Com_name: any;
  searchValue: string = '';
  stringifiedData: any;
  dateObj = new Date();
  CampaigNameList: any;
  savedModules: any[] = [];


  getValues(obj: {}) {
    return Object.values(obj)
  }
  bridges2: Bridge2[] = [];
  UserId = sessionStorage.getItem('UserId');

  bridges: Bridge2 = {
    date: this.HeadingServices.getDate(), location: '', companyName: '', source: '', contactPerson: '',
    phoneNumber: '', message: '', email: '', productInterest: '', campaign: '',
    assignedTo: this.UserId, timestamp: this.HeadingServices.getDateTime(), employeeId: this.UserId, numOfEmployee: '0', turnover: '', designation: '', status: 'New', leadType: '', Attach: '', Caption: '',
  };
  bridges22: EditBridge2[] = [];
  editbridges: EditBridge2 = {
    date: '', location: '', companyName: '', source: '', contactPerson: '',
    phoneNumber: '', message: '', email: '', productInterest: '',
    assignedTo: '', timestamp: '', employeeId: '', id: '', numOfEmployee: '0', turnover: '', designation: '', status: '', leadType: '', Attach: '', Caption: '',
  };



  error = '';
  success = '';
  closeResult = '';
  UserName: any;
  role: any;
  reportingTo: any;
  isLoading: boolean = false;
  isView: boolean = false;
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
  AddFollow2: AddFollow2 = { "Subject": "", "Mode": "", "Comment": "", "CreateDate": this.HeadingServices.getDate(), "CreateTime": this.HeadingServices.getTime(), "Emp": '', "Emp_Name": "", "From": this.HeadingServices.getDate(), "SourceID": "82", "SourceType": "", "Time": this.HeadingServices.getTime(), "Type": "Followup", "leadType": '' };

  data: [][] | undefined;
  bridgessmanger: any;
  pagelimit: any = 10;

  startind = 1;
  endind = 1;
  totalCount: any;
  order_by_field: any = 'id';
  order_by_value: any = 'desc';
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
  ModeOfCommunication: any;
  showremid: boolean = false;
  Changeshowremid(val: boolean) {
    this.showremid = val;
  }
  CurrentPage: any = 1;
  pagination: any = {
    PageNo: 1,
    maxItem: '10',
    PageShow: 10
  }
  leadStatus: any;
  Headingss: any[] = [];
  exportStatus: boolean = false;
  fieldsArray: any[] = [
    {label:"Company Name",value:"companyName"},
    {label:"Person Name",value:"contactPerson"},
    {label:"Phone",value:"phoneNumber"},
    {label:"Status",value:"status"},
    {label:"Lead Priority",value:"leadType"},
    {label:"Created By",value:"employeeId"},
    {label:"Assigned To",value:"assignedTo"},
    "Company Name",
    "Person Name",
    "Phone",
    "Status",
    "Lead Priority",
    "Created By",
    "Assigned To"
  ];
  commonPayload = new CommonModulesPayload('Lead').payload;
  constructor(private router: Router,
    public HeadingServices: HeadingServicesService,
    private _NotifierService: NotiferService, public datepipe: DatePipe, private http: HttpClient, public bridgeService2: BridgeService, private modalService: NgbModal) {
    this.baseUrl2 = this.bridgeService2.baseUrl2;
    this.commonPayload.filter = {
      SalesPersonCode: "21",
      PageNo: 1,
      maxItem: "10",
      order_by_field: "id",
      order_by_value: "desc",
      SearchText: "",
      leadType: "",
      field: {
        assignedTo_id__in: [],
          source__in: [],
        CreateDate__gte: "",
        CreateDate__lte: ""
      }
    }
  }

  openEmployee22(id: any) {
    this.openEdit(this.contentEdit, [id], false);
  }
  openfollowup22(id: any) {
    this.openfollowup(this.followup, id);
  }
  ngOnInit() {
    if (this.HeadingServices.isModuleView(1) == false) {
      this.router.navigate(['/dashboard']);
    }
    // console.log(this.commonPayload.payload)
    this.bridgeService2.autoCall();
    this.leadStatus = this.bridgeService2.leadStatus;
    this.ModeOfCommunication = this.bridgeService2.ModeOfCommunication;
    this.getAllSource();
    this.getBridge2();
    this.getBridge();
    this.getcampaign1List();
    this.Headingss = this.HeadingServices.getModule2();
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
      if ((document.getElementById("mySidepanel") as HTMLInputElement) != null) {
        if (!$('.openbtn').is(e.target) && !popup.is(e.target) && popup.has(e.target).length == 0) {
          (document.getElementById("mySidepanel") as HTMLInputElement).style.width = "340";
          $('#mySidepanel').removeClass('sidepanel2');
          $('#mySidepanel').addClass('mySidepanelGo');
        }
      }
    });

    this.getLeadAll();


    const savedModulesString = sessionStorage.getItem('savedModules');
    if (savedModulesString) {
      this.savedModules = JSON.parse(savedModulesString);
    }

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
  CallFiled(item: any) {
    this.childComponent.visible(item);
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
    if (this.count.includes(id)) {
      const index = this.count.indexOf(id);
      if (index > -1) { // only splice array when item is found
        this.count.splice(index, 1); // 2nd parameter means remove one item only
      }
    }
    else {
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
    this.getBridge2();
  }

  togglesortType(key: any) {
    this.sortsend = !this.sortsend;
    this.order_by_field = key;
    if (this.sortsend == true) {
      this.order_by_value = 'asc';
    }
    else {
      this.order_by_value = 'desc';
    }
    this.RowPerPage();
  }
  emptySeach() {
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
  pageChanged(event: any) {
    this.pagination.PageNo = event;
    this.reload();
  }
  setPrevious() {
    var filterdata: any[] = this.bridgeService2.getAllFilter('lead');
    if (filterdata != undefined) {
      this.pagination = filterdata[0];
      this.searchValue = filterdata[1];
      this.filterLead = filterdata[2];
      this.order_by_field = filterdata[3];
      this.order_by_value = filterdata[4];
    }
  }
  setNew() {
    this.bridgeService2.setAllFilter('lead', [this.pagination, this.searchValue, this.filterLead, this.order_by_field, this.order_by_value]);
  }
  getBridge2(): void {
    this.isLoading = true;
    // console.log(this.filterLead)
    this.setPrevious();
    this.bridgeService2.getLeadByPagination(this.pagination, this.searchValue, this.filterLead, this.order_by_field, this.order_by_value, 'lead').subscribe(
      (data: any) => {
        if (data.status == "200") {
          this.bridges2 = data.data;
          this.totalCount = data.meta.count;
          this.CurrentPage = this.pagination.PageNo;
          this.isLoading = false;
          if (this.pagination.maxItem != 'All') {
            this.startind = ((this.pagination.PageNo - 1) * Number(this.pagination.maxItem)) + 1;
            this.endind = ((this.pagination.PageNo - 1) * Number(this.pagination.maxItem)) + Number(this.pagination.maxItem);
            if (this.endind > this.totalCount) {
              this.endind = this.totalCount;
            }
            this.pagination.PageShow = Number(this.pagination.maxItem);
          }
          else {
            this.startind = 1;
            this.endind = this.totalCount;
            this.pagination.PageShow = Number(this.totalCount);
          }
          if (this.totalCount == 0) {
            this.startind = this.totalCount;
          }
        }

        else {
          this._NotifierService.showError(data.message);
          this.totalCount = 0;
          this.isLoading = false;
        }
      },
      (err) => {
        this.isLoading = false;
        this.totalCount = 0;
        const delim = ':';
        const name = err.message;
        const result = name.split(delim).slice(3).join(delim);
        this._NotifierService.showError(result);
      }
    );

  }

  onFileChange(evt: any) {

    const target: DataTransfer = <DataTransfer>(evt.target);
    // console.log("target", target)

    if (target.files.length !== 1) throw new Error('Cannot use multiple files');

    const reader: FileReader = new FileReader();

    reader.onload = (e: any) => {
      const bstr: string = e.target.result;

      const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });

      const wsname: string = wb.SheetNames[0];

      const ws: XLSX.WorkSheet = wb.Sheets[wsname];



      this.data = (XLSX.utils.sheet_to_json(ws, { header: 1 }));
      // console.log("this.data", this.data)

      if (confirm("Are You Sure Do You Want To Import Data ?")) {
        var x: number[][] = this.data.slice(1);
        var excelupload = new Array();
        // console.log("excelupload", excelupload)
        let leng = x.length;
        for (let i = 0; i < leng; i++) {

          let y = x[i];
          let assto = '';
          if (y[0] == undefined) {
            // console.log("ifpart")
            this.exedate = ' ';
          }
          else {
            // console.log("elsepart")
            this.exedate = new Date((y[0] - (25567 + 2)) * 86400 * 1000);


            let m2 = this.exedate.getMonth() + 1;
            let month = (m2 < 10 ? '0' : '') + m2;
            let day = (this.exedate.getDate() < 10 ? '0' : '') + this.exedate.getDate();

            let year2 = this.exedate.getUTCFullYear();
            let newdate2 = year2 + "-" + month + "-" + day;
            if (newdate2 == "NaN-NaN-NaN") {
              this.exedate = y[0];
            }
            else {
              this.exedate = newdate2;
            }
            // console.log("newdate2",newdate2)
            y[0] = this.exedate;
          }


          if (y[2] == undefined) {
            this.execname = '';
          }
          else {
            this.execname = y[2];
          }

          // if (y[3] == undefined) {
          //   this.exesource = '';
          // }
          // else {
          //   this.exesource = y[3];
          // }

          if (y[5] == undefined) {
            this.exeremarks = '';
          }
          else {
            this.exeremarks = y[5];
          }

          if (y[7] == undefined) {
            this.exeproductinterest = '';
          }
          else {
            this.exeproductinterest = y[7];
          }

          if (y[8] == undefined) {
            this.exedesignation = '';
          }
          else {
            this.exedesignation = y[8];
          }
          if (y[9] == undefined) {
            this.exenoofemp = 0;
          }
          else {
            this.exenoofemp = y[9];
          }

          if (y[10] == undefined) {
            this.exeturnover = '';
          }
          else {
            this.exeturnover = y[10];
          }
          if (y[1] == undefined) {
            this.exelocation = '';
          }
          else {
            this.exelocation = y[1];
          }

          if (y[6] == undefined) {
            this.exeEemail = '';
          }
          else {
            this.exeEemail = y[6];
          }
          if (y[4] != undefined) {
            var empArray = {
              "date": this.exedate,
              "location": this.exelocation,
              "companyName": this.execname,
              "source": 'Others',
              "contactPerson": y[3],
              "phoneNumber": y[4],
              "message": this.exeremarks,
              "email": this.exeEemail,
              "productInterest": this.exeproductinterest,
              "assignedTo": this.UserId,
              "employeeId": this.UserId,
              "timestamp": this.HeadingServices.getDateTime(),
              "designation": this.exedesignation,
              "numOfEmployee": this.exenoofemp,
              "turnover": this.exeturnover,
              "status": 'New',
              "leadType": '',
              "Attach": '',
              "Caption": ''

            };
            excelupload.push(empArray);
          }
        }
        // console.log("exceluploadfinal", excelupload)
        // this.isLoading = true;
        this.bridgeService2.adduploadlead(excelupload).subscribe(
          (res: any) => {
            // console.log("rslt", data);
            if (Object(res)['message'] == "successful") {
              this._NotifierService.showSuccess('Data Imported Successfully');
              // this.isLoading = false;

              setTimeout(() => {
                let currentUrl = this.router.url;
                this.router.routeReuseStrategy.shouldReuseRoute = () => false;
                this.router.onSameUrlNavigation = 'reload';
                this.router.navigate([currentUrl]);
              }, 2000);
            }
            else {
              //  this.isLoading = false;
              this._NotifierService.showError(Object(res)['message']);
            }
          });


      }
    };

    // this.isLoading = false;
    reader.readAsBinaryString(target.files[0]);
  }

  resetAlerts() {
    this.error = '';
    this.success = '';
  }

  genarateCommonPayload(f:NgForm){
    console.log(this.commonPayload)
    // debugger
    if (f.valid) {
    this.bridgeService2.GenerateReport(this.commonPayload).subscribe((res: any) => {
      if (Object(res)['status'] == "200") {
        this.isLoading = false;
        this._NotifierService.showSuccess("Report generated Successfully");
        this.modalService.dismissAll();

        // setTimeout(() => {
        //   let currentUrl = this.router.url;
        //   this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        //   this.router.onSameUrlNavigation = 'reload';
        //   this.router.navigate([currentUrl]);
        // }, 2000);
      }
    
      else {
        this._NotifierService.showError(Object(res)['message']);
      }
    },
    (err) => {
      // this.isLoading3 = false;
      const delim = ":"
      const name = err.message
      const result = name.split(delim).slice(3).join(delim);
      this._NotifierService.showError(result);
    }
  );
    }
    else {
      for (let i = 0; i < Object.keys(f.value).length; i++) {
        var keyys = Object.keys(f.value)[i];
        if (f.value[keyys].length == 0) {

          if ($("input[name=" + keyys + "]").hasClass('required-fld')) {
            $("input[name=" + keyys + "]").addClass("red-line-border");
            $("input[name=" + keyys + "]").focus();
          }
          else if ($("ng-select[name=" + keyys + "]").hasClass('required-fld')) {
            $("ng-select[name=" + keyys + "]").addClass("red-line-border");
            $("ng-select[name=" + keyys + "]").focus();
          }
          else if ($("select[name=" + keyys + "]").hasClass('required-fld')) {
            $("select[name=" + keyys + "]").addClass("red-line-border");
            $("select[name=" + keyys + "]").focus();
          }
          else if ($("password[name=" + keyys + "]").hasClass('required-fld')) {
            $("password[name=" + keyys + "]").addClass("red-line-border");
            $("password[name=" + keyys + "]").focus();
          }
          else if ($("textarea[name=" + keyys + "]").hasClass('required-fld')) {
            $("textarea[name=" + keyys + "]").addClass("red-line-border");
            $("textarea[name=" + keyys + "]").focus();
          }
        }
        else {
          $("input[name=" + keyys + "]").removeClass("red-line-border");
          $("ng-select[name=" + keyys + "]").removeClass("red-line-border");
          $("select[name=" + keyys + "]").removeClass("red-line-border");
          $("password[name=" + keyys + "]").removeClass("red-line-border");
          $("textarea[name=" + keyys + "]").removeClass("red-line-border");
        }
      }
    }
}
  addLeads(f: NgForm) {
    f = this.bridgeService2.GlobaleTrimFunc(f);
    this.resetAlerts();
    for (let [keys, value] of Object.entries(f.value)) {
      if (!!!f.value[keys]) {
        f.value[keys] = "";
      }
    }
    if (f.valid) {
      this.isLoading = true;
      this.bridgeService2.addlead(this.bridges).subscribe(
        (res: Bridge2) => {
          if (Object(res)['message'] == "successful") {
            this.isLoading = false;
            this._NotifierService.showSuccess(this.Headingss[0].leftheading + " " + this.Headingss[0].heading103 + " " + this.Headingss[0].heading106);
            this.modalService.dismissAll();

            setTimeout(() => {
              let currentUrl = this.router.url;
              this.router.routeReuseStrategy.shouldReuseRoute = () => false;
              this.router.onSameUrlNavigation = 'reload';
              this.router.navigate([currentUrl]);
            }, 2000);
          }
          else {
            this._NotifierService.showError(Object(res)['message']);
            this.isLoading = false;
          }
          // Reset the form
        },
        (err) => {
          const delim = ":"
          const name = err.message
          const result = name.split(delim).slice(3).join(delim)
          this._NotifierService.showError(result);
          this.isLoading = false;
          //  this.ngOnInit();
        }
      );
    } else {
      for (let i = 0; i < Object.keys(f.value).length; i++) {
        var keyys = Object.keys(f.value)[i];
        if (f.value[keyys].length == 0) {

          if ($("input[name=" + keyys + "]").hasClass('required-fld')) {
            $("input[name=" + keyys + "]").addClass("red-line-border");
            $("input[name=" + keyys + "]").focus();
          }
          else if ($("ng-select[name=" + keyys + "]").hasClass('required-fld')) {
            $("ng-select[name=" + keyys + "]").addClass("red-line-border");
            $("ng-select[name=" + keyys + "]").focus();
          }
          else if ($("select[name=" + keyys + "]").hasClass('required-fld')) {
            $("select[name=" + keyys + "]").addClass("red-line-border");
            $("select[name=" + keyys + "]").focus();
          }
          else if ($("password[name=" + keyys + "]").hasClass('required-fld')) {
            $("password[name=" + keyys + "]").addClass("red-line-border");
            $("password[name=" + keyys + "]").focus();
          }
          else if ($("textarea[name=" + keyys + "]").hasClass('required-fld')) {
            $("textarea[name=" + keyys + "]").addClass("red-line-border");
            $("textarea[name=" + keyys + "]").focus();
          }
        }
        else {
          $("input[name=" + keyys + "]").removeClass("red-line-border");
          $("ng-select[name=" + keyys + "]").removeClass("red-line-border");
          $("select[name=" + keyys + "]").removeClass("red-line-border");
          $("password[name=" + keyys + "]").removeClass("red-line-border");
          $("textarea[name=" + keyys + "]").removeClass("red-line-border");
        }
      }
    }
  }


    open(content: any) {
      this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', modalDialogClass: 'modal-dialog-centered order-cards-modal' }).result.then((result) => {
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

  openEdit(contentEdit: any, item2: any, isView: boolean) {

    this.modalService.open(contentEdit, { ariaLabelledBy: 'modal-basic-title', modalDialogClass: 'modal-dialog-centered order-cards-modal' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
    this.isView = isView;
    var item: any;
    this.bridgeService2.getOneLeaddata(item2[0]).subscribe(
      (data: Bridge2[]) => {
        item = data[0];
        this.editbridges.id = String(item.id);
        this.editbridges.date = item.date;
        this.editbridges.companyName = item.companyName;
        this.editbridges.source = item.source;
        this.editbridges.email = item.email;
        this.editbridges.location = item.location;
        this.editbridges.contactPerson = item.contactPerson;
        this.editbridges.phoneNumber = item.phoneNumber;
        this.editbridges.message = item.message;
        this.editbridges.productInterest = item.productInterest;
        this.editbridges.assignedTo = Object.values(item.assignedTo)[0];
        this.editbridges.employeeId = item.employeeId.id;
        this.editbridges.timestamp = item.timestamp;
        this.editbridges.status = item.status;
        this.editbridges.leadType = item.leadType;
        this.editbridges.designation = item.designation;
        this.editbridges.turnover = item.turnover;
        this.editbridges.numOfEmployee = item.numOfEmployee;
      },
      (err) => {
        console.log(err);
        this.error = err;
      }
    );

    // console.log(this.editbridges.employeeId);
  }


  editLeads(fb: NgForm) {
    fb = this.bridgeService2.GlobaleTrimFunc(fb);
    this.resetAlerts();
    if (fb.valid) {
      this.isLoading = true;
      // this.editbridges.assignedTo = this.editbridges.assignedTo ?? this.assignSalesCode;
      this.bridgeService2.editleads(this.editbridges).subscribe(
        (res: EditBridge2) => {
          if (Object(res)['status'] == "200") {
            this.isLoading = false;
            this._NotifierService.showSuccess(this.Headingss[0].leftheading + " " + this.Headingss[0].heading104 + " " + this.Headingss[0].heading106);
            this.modalService.dismissAll();

            setTimeout(() => {
              let currentUrl = this.router.url;
              this.router.routeReuseStrategy.shouldReuseRoute = () => false;
              this.router.onSameUrlNavigation = 'reload';
              this.router.navigate([currentUrl]);
            }, 2000);
          }
          else {
            this._NotifierService.showError(Object(res)['message']);
            this.isLoading = false;
          }

        },
        (err) => {
          this.modalService.dismissAll();
          const delim = ":"
          const name = err.message
          const result = name.split(delim).slice(3).join(delim)
          this._NotifierService.showError(result);
          this.ngOnInit();
        }
      );
    }
    else {
      for (let i = 0; i < Object.keys(fb.value).length; i++) {
        var keyys = Object.keys(fb.value)[i];
        if (fb.value[keyys].length == 0) {

          if ($("input[name=" + keyys + "]").hasClass('required-fld')) {
            $("input[name=" + keyys + "]").addClass("red-line-border");
            $("input[name=" + keyys + "]").focus();
          }
          else if ($("ng-select[name=" + keyys + "]").hasClass('required-fld')) {
            $("ng-select[name=" + keyys + "]").addClass("red-line-border");
            $("ng-select[name=" + keyys + "]").focus();
          }
          else if ($("select[name=" + keyys + "]").hasClass('required-fld')) {
            $("select[name=" + keyys + "]").addClass("red-line-border");
            $("select[name=" + keyys + "]").focus();
          }
          else if ($("password[name=" + keyys + "]").hasClass('required-fld')) {
            $("password[name=" + keyys + "]").addClass("red-line-border");
            $("password[name=" + keyys + "]").focus();
          }
          else if ($("textarea[name=" + keyys + "]").hasClass('required-fld')) {
            $("textarea[name=" + keyys + "]").addClass("red-line-border");
            $("textarea[name=" + keyys + "]").focus();
          }
        }
        else {
          $("input[name=" + keyys + "]").removeClass("red-line-border");
          $("ng-select[name=" + keyys + "]").removeClass("red-line-border");
          $("select[name=" + keyys + "]").removeClass("red-line-border");
          $("password[name=" + keyys + "]").removeClass("red-line-border");
          $("textarea[name=" + keyys + "]").removeClass("red-line-border");
        }
      }
    }


  }

  editdeletepop(item: Bridge2) {
    $('.hover-show').hide();
    $('.hover-show' + item.id).show()
  }

  JunkId: any;
  confirmModal(confirmModal2: any, JunkId: any) {
    this.JunkId = JunkId;
    this.modalService
      .open(confirmModal2, { ariaLabelledBy: 'modal-basic-title', backdrop: 'static', modalDialogClass: 'confirm-modal modal-dialog-centered' })
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }

  multipleDelete1(count: any) {
    this.bridgeService2.junkleads(count, 1).subscribe(
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
        const result = name.split(delim).slice(3).join(delim);
        this._NotifierService.showError(result);
      }
    );
  }


  multipleAssign(contentMultipleAssignEdit: any) {
    this.modalService.open(contentMultipleAssignEdit, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });


  }


  assingEdit(contentAssignEdit: any, item: any, multiple: boolean, ids: any) {

    this.modalService.open(contentAssignEdit, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
    if (multiple == false) {
      this.lead_id = [item.id];

      // this.selectedValue=item.assignedTo.SalesEmployeeCode;
      // this.selectedName = item.assignedTo.SalesEmployeeName;
    }
    else {
      this.lead_id = ids;
    }
  }

  Assign_() {
    if (confirm('Are You Sure Do You Want To Assign Lead')) {
      this.bridgeService2.leadAssign(this.lead_id, this.searchAssignValue).subscribe(
        (res: any) => {
          if (Object(res)['status'] == "200") {
            this.modalService.dismissAll();
            this.searchAssignValue = null;
            this.RowPerPage();

          }
          else {
            this._NotifierService.showError(Object(res)['message']);
          }
          // Reset the form
        },
        (err) => {
          const delim = ":"
          const name = err.message
          const result = name.split(delim).slice(3).join(delim)
          this._NotifierService.showError(result);
          //  this.ngOnInit();
        }
      );
    }
  }

  assignCancel() {
    this.modalService.dismissAll();
  }

  openfollowup(followup: any, item2: any) {
    this.modalService.open(followup, { ariaLabelledBy: 'modal-basic-title', modalDialogClass: 'modal-dialog-centered order-cards-modal' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });

    //console.log(item);
    this.bridgeService2.getOneLeaddata(item2).subscribe(
      (data: Bridge2[]) => {
        data[0];

        this.AddFollow2.Subject = data[0].companyName;
        this.AddFollow2.SourceID = String(data[0].id);
        this.AddFollow2.From = this.HeadingServices.getrevDate();
        this.AddFollow2.Time = this.HeadingServices.getTime();
        this.AddFollow2.Emp = String(this.UserId);
        this.AddFollow2.Emp_Name = this.UserName;
        this.AddFollow2.SourceType = 'Lead';
      },
      (err) => {
        console.log(err);
        this.error = err;
      }
    );
  }


  addFollowUp(fb: NgForm) {
    fb = this.bridgeService2.GlobaleTrimFunc(fb);
    this.resetAlerts();
    for (let [keys, value] of Object.entries(fb.value)) {
      if (!!!fb.value[keys]) {
        fb.value[keys] = "";
      }
    }
    if (fb.valid) {
      this.isLoading = true;
      this.AddFollow2.Emp = Number(this.AddFollow2.Emp);
      this.AddFollow2.To = this.AddFollow2.From;


      this.bridgeService2.storeleadfollow2(this.AddFollow2).subscribe(
        (res: AddFollow2) => {
          if (Object(res)['status'] == "200") {
            // Update the list of cars
            this.isLoading = false;
            // Inform the user
            this._NotifierService.showSuccess(this.Headingss[1].heading + " " + this.Headingss[0].heading103 + " " + this.Headingss[0].heading106);
            this.modalService.dismissAll();
            setTimeout(() => {
              let currentUrl = this.router.url;
              this.router.routeReuseStrategy.shouldReuseRoute = () => false;
              this.router.onSameUrlNavigation = 'reload';
              this.router.navigate([currentUrl]);
            }, 2000);
          }
          else {
            this._NotifierService.showError(Object(res)['message']);
            this.isLoading = false;
          }
          // Reset the form
        },
        (err) => {
          this.isLoading = false;
          const delim = ":"
          const name = err.message
          const result = name.split(delim).slice(3).join(delim);
          this._NotifierService.showError(result);
          //  this.ngOnInit();
        }
      );


    }
    else {
      for (let i = 0; i < Object.keys(fb.value).length; i++) {
        var keyys = Object.keys(fb.value)[i];
        if (fb.value[keyys].length == 0) {

          if ($("input[name=" + keyys + "]").hasClass('required-fld')) {
            $("input[name=" + keyys + "]").addClass("red-line-border");
            $("input[name=" + keyys + "]").focus();
          }
          else if ($("ng-select[name=" + keyys + "]").hasClass('required-fld')) {
            $("ng-select[name=" + keyys + "]").addClass("red-line-border");
            $("ng-select[name=" + keyys + "]").focus();
          }
          else if ($("select[name=" + keyys + "]").hasClass('required-fld')) {
            $("select[name=" + keyys + "]").addClass("red-line-border");
            $("select[name=" + keyys + "]").focus();
          }
          else if ($("password[name=" + keyys + "]").hasClass('required-fld')) {
            $("password[name=" + keyys + "]").addClass("red-line-border");
            $("password[name=" + keyys + "]").focus();
          }
          else if ($("textarea[name=" + keyys + "]").hasClass('required-fld')) {
            $("textarea[name=" + keyys + "]").addClass("red-line-border");
            $("textarea[name=" + keyys + "]").focus();
          }

        }

        else {
          $("input[name=" + keyys + "]").removeClass("red-line-border");
          $("ng-select[name=" + keyys + "]").removeClass("red-line-border");
          $("select[name=" + keyys + "]").removeClass("red-line-border");
          $("password[name=" + keyys + "]").removeClass("red-line-border");
          $("textarea[name=" + keyys + "]").removeClass("red-line-border");
        }
      }
    }

  }


  suplier(item: any) {
    this.router.navigate(['/leads/table/lead-details/' + item]);
  }

  CreateLeadstoBp(id: number) {
    this.bridgeService2.setLeadID(id);
    this.bridgeService2.setAllFilter('', undefined);
    this.router.navigate(['/customer/add-customer']);
  }

  totalItems: any;
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

  getcampaign1List() {
    this.bridgeService2.getCampaignnameList().subscribe(
      (data: any) => {
        this.CampaigNameList = data;
        // this.quotation.ContactPersonCode = this.contactPersoneList[0].InternalCode;

      });
  }

  lead_Type: any;
  filterLeadPriority: any = new Array;
  getLeadAll(): void {
    this.bridgeService2.getLeadTypedata().subscribe(
      (data: any[]) => {
        this.lead_Type = data;
        for (let i = 0; i < this.lead_Type.length; i++) {
          this.filterLeadPriority.push({ item_text: this.lead_Type[i].Name })
        }
        // console.log(this.source1)
        this.dropdownLead = this.filterLeadPriority
        // console.log(this.source1)

      },
      (err) => {
        console.log(err);
        this.error = err;
      }
    );
  }


  // Default excel file name when download 
  fileName = "lead_export.xlsx";

  Exportexcel() {
    // passing table-id
    let data = document.getElementById("table-data");
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(data)

    // Generete workbook and add the worksheet
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1')

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

  isModulefieldview(module_id: number, key: string): boolean {
    const selectedModule = this.savedModules?.find((module: any) => module.module_id === module_id);
    if (selectedModule) {
      const hasViewPermission = selectedModule.data.some((item: any) => item.key === key && item.view);
      return hasViewPermission;
    }
    return false;
  }

  isModulefieldedit(module_id: number, key: string): boolean {
    // debugger
    const selectedModule = this.savedModules?.find((module: any) => module.module_id === module_id);
    if (selectedModule) {
      // debugger
      const hasEditPermission = selectedModule.data.some((item: any) => item.key === key && item.edit);
      // console.log(key, hasEditPermission)
      return hasEditPermission;
    }
    return false;
  }

  

}





