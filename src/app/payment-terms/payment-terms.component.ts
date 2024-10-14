import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import * as XLSX from 'xlsx';
import { HttpClient } from '@angular/common/http';
import { AddFollow2, Bridge2, EditBridge2, EditPayment, Payment } from '../bridge2';
import { BridgeService } from '../modules/service/bridge.service';
import { NgbModal, ModalDismissReasons, } from '@ng-bootstrap/ng-bootstrap';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Bridge } from '../bridge';
import { DatePipe } from '@angular/common';
import { Customer } from '../modules/model/customer';
declare var $: any;

@Component({
  selector: 'app-payment-terms',
  templateUrl: './payment-terms.component.html',
  styleUrls: ['./payment-terms.component.css']
})
export class PaymentTermsComponent implements OnInit {
  baseUrl2: any;
  bridgess: Bridge[] = [];
  customers: Customer[] = [];
  nodata: boolean = false;
  p: number = 1;
  Com_name: any;
  searchValue!: string;
  stringifiedData: any;
  dateObj = new Date();
  time = this.dateObj.toLocaleTimeString();
  month2 = this.dateObj.getMonth() + 1;
  month = (this.month2 < 10 ? '0' : '') + this.month2;
  day = (this.dateObj.getDate() < 10 ? '0' : '') + this.dateObj.getDate();
  year = this.dateObj.getUTCFullYear();
  //  months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  newdate = this.day + "-" + this.month + "-" + this.year;

  inputElementTime = ("0" + this.dateObj.getHours()).slice(-2) + ":" + ("0" + this.dateObj.getMinutes()).slice(-2);

  // getValues(obj: {}) {
  //   return Object.values(obj)
  // }
  newdatetime = this.newdate + " " + this.time;
  isdataLoading:boolean=false;
  UserId = sessionStorage.getItem('UserId');

  editfilesList: any;
  bridges2: Payment[] = [];
  payment: Payment = {
    InvoiceNo: '', TransactId: '', TotalAmt: 0, TransactMod: '',
    DueAmount: 0, PaymentDate: '', ReceivedAmount: 0, Remarks: '', CardCode: '', createTime: this.time, createdBy: Number(this.UserId), createDate: this.newdate, Attach: ''
  };
  editpays: EditPayment[] = [];
  editpayment: EditPayment = {
    InvoiceNo: '', TransactId: '', TotalAmt: 0, TransactMod: '',
    DueAmount: 0, PaymentDate: '', ReceivedAmount: 0, Remarks: '', CardCode: '', updateTime: this.time, updatedBy: Number(this.UserId), updateDate: this.newdate, Attach: ''
  };



  error = '';
  success = '';
  closeResult = '';
  UserName: any;
  role: any;
  reportingTo: any;
  isLoading: boolean = false;

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
  AddFollow2: AddFollow2 = { "Subject": "", "Mode": "", "Comment": "", "CreateDate": this.newdate, "CreateTime": this.time, "Emp": '', "Emp_Name": "", "From": this.newdate, "SourceID": "82", "SourceType": "", "Time": this.inputElementTime, "Type": "Followup", "leadType": '' };


  data: [][] | undefined;
  bridgessmanger: any;
  pagelimit: any = 10;
  startind = ((this.p - 1) * this.pagelimit) + 1;
  endind = ((this.p - 1) * this.pagelimit) + this.pagelimit;


  leadtype = 'All';

  cate = 'All';
  leadtype2 = 'All';
  status = 'All';
  status2: any = {};
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

  defaultleadtype: any;
  defaultleadstatus: any;
  defaultleadcat: any;
  dropdownSettings1 = {};
  transaction_Mode:any[]=[];
  // dropdownList1: any = [];
  dropdownLead: any[] = [];
  dropdowncategory: any[] = [];
  //AssigneddropdownList: any[] = [];
  //sourcedropdownList: any[] = [];//for status


  public tereer: any[] = [];
  public selectedValue: any;
  public searchAssignValue: any;
  selectedName: any;
  findassaignName: any;
  lead_id: any;


  Weekdate: any;
  monthlydate: any;
  yearlydate: any;

  payid: any;
  selectedData: any[] = [];

  paginationOption:any;
  TransactionMode:any;
  constructor(private router: Router, public datepipe: DatePipe, private http: HttpClient, private bridgeService2: BridgeService, private modalService: NgbModal) {
    this.baseUrl2 = this.bridgeService2.baseUrl2;



  }

  ngOnInit() {





    this.bridgeService2.autoCall();
    this.TransactionMode=this.bridgeService2.TransactionMode;
    this.paginationOption=this.bridgeService2.paginationOption;
    // this.getAllSource();

    this.transaction_Mode = [
      { item_text: 'Online' },
      { item_text: 'Bank Transfer' },
      { item_text: 'Card' },
      { item_text: 'Cash' }

    ];

    this.dropdownSettings1 = {
      singleSelection: false,
      idField: 'item_text',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 1,
      allowSearchFilter: true,
      enableCheckAll: true,
      limitSelection: -1,
      clearSearchFilter: true,
      maxHeight: 197,
      closeDropDownOnSelection: false,
      showSelectedItemsAtTop: false,
      defaultOpen: false,
    }


    this.leadtype2 = 'All';

    this.cate2 = 'All';
    this.assignto2 = 'All'
    this.status2 = 'All';




    this.source2 = 'All';

    this.leadpriority2 = 'All';


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

    this.Weekdate = this.datepipe.transform(new Date(this.dateObj.getTime() - 7 * 24 * 60 * 60 * 1000), 'yyyy-MM-dd')

    var lastDay = new Date(this.dateObj.getFullYear(), this.dateObj.getMonth() - 1, 0);

    this.monthlydate = this.datepipe.transform(lastDay, 'yyyy-MM-dd');


    var lastYear = new Date(this.dateObj.getFullYear() - 1, 0);

    this.yearlydate = this.datepipe.transform(lastYear, 'yyyy-MM-dd');


    this.role = sessionStorage.getItem('role');
    this.reportingTo = sessionStorage.getItem('reportingTo');
    if (this.UserName == undefined) {
      this.router.navigate(['/login']);
    }


    // $(".unassign").click(function () {
    //   if ($('#assign').hasClass("active-assign")) {
    //     $("#assign").removeClass("active-assign");
    //     $("#assigntable").addClass("assggtable");
    //     $("#unassigntable").removeClass("assggtable");
    //     $("#unassign").addClass("active-assign");
    //   }
    // });

    // $(".assign").click(function () {
    //   if ($('#unassign').hasClass("active-assign")) {
    //     $("#unassign").removeClass("active-assign");
    //     $("#assign").addClass("active-assign");
    //     $("#unassigntable").addClass("assggtable");
    //     $("#assigntable").removeClass("assggtable");
    //   }
    // });

    this.getBridge2();
    // this.getBridge();

    // $("#sunil").click(function () {
    //   // If the clicked element has the active class, remove the active class from EVERY .nav-link>.state element
    //   if ($('.sidebar').hasClass("active")) {
    //     $(".sidebar").removeClass("active");
    //     $('.new-tabl th').removeClass("active");
    //     $('.sidebar .nav-links li').removeClass("activee");
    //     $('.home-section').removeClass("activee");


    //   }
    //   // Else, the element doesn't have the active class, so we remove it from every element before applying it to the element that was clicked
    //   else {
    //     $(".sidebar").removeClass("active");
    //     $('.sidebar').addClass("active");
    //     $('.new-tabl th').addClass("active");
    //     $('.sidebar .nav-links li').addClass("activee");
    //     $('.home-section').addClass("activee");
    //   }
    // });

    $(document).mouseup(function (e: { target: any; }) {
      var popup = $(".sidepanel");
      if (!$('.openbtn').is(e.target) && !popup.is(e.target) && popup.has(e.target).length == 0) {
        popup.hide();
      }
    });

    $(document).ready(function () {
      $('.sidepanel').hide();
    });




    $('.multipledropdown').hide();

    var priviousUrl = this.bridgeService2.getPreviousUrl();
    var newcheck = priviousUrl.split('/');

    if (newcheck[2] === 'customer-details') {

      this.payid = this.bridgeService2.getBpCardcode();

    }

    this.getCustomer();


    // ((this.payment.ReceivedAmount) as any) = ((this.payment.TotalAmt) as any) - ((this.payment.DueAmount) as any)



  }

  payTotalAmount(event: any) {
    // console.log(event.target.value);
    //
    if(event.target.value < 0){
    this.payment.TotalAmt = 0;
    event.target.value = 0;
    }else{
      this.payment.TotalAmt = Number(event.target.value);
    }
  }
  payDueAmount(dueAmount: any) {

    if (this.payment.TotalAmt >= dueAmount.target.value) {
      this.payment.DueAmount = this.payment.TotalAmt - Number(dueAmount.target.value);
     // console.log('this.payment.DueAmount', this.payment.DueAmount);

    }
    else {


    }

  }

  editpayTotalAmount(event: any) {
   // console.log(event.target.value);
    // this.editpayment.TotalAmt = Number(event.target.value);
    if(event.target.value < 0){
      this.editpayment.TotalAmt = 0;
      event.target.value = 0;
      }else{
        this.editpayment.TotalAmt = Number(event.target.value);
      }
  }
  editpayDueAmount(dueAmount: any) {

    if (this.editpayment.TotalAmt >= dueAmount.target.value) {
      this.editpayment.DueAmount = this.editpayment.TotalAmt - Number(dueAmount.target.value);
     // console.log('this.payment.DueAmount', this.payment.DueAmount);

    }
    else {


    }

  }


  getCustomer(): void {
    let sourcetmp: any[] = [];
    this.isLoading = true;
    this.bridgeService2.getCustomerdata().subscribe(
      (data: Customer[]) => {
        this.isLoading = false;
        this.customers = data;


        if (this.customers.length <= 0) {
          this.nodata = true;
        } else {
          this.nodata = false;
        }
        // console.log(data)

      },
      (err) => {
        this.isLoading = false;
        this.error = err;
      }
    );
  }

  reload() {
    this.count.length=0;
    this.isLoading = true;
    $('#selectAll1').prop('checked', false);
    $('#selectAll12').prop('checked', false);
    setTimeout(() => {
      $(".extra-area2").hide();
      $(".extra-area").hide();
      this.isLoading = false;
      this.ngOnInit();
    }, 100);
  }

  onItemSelect1(item: any) {
  }
  onSelectAll1(items: any) {
  }
  public onDeSelectAll1(items: any) {
  }

  onDeSelect1(items: any) {

  }





  // selectedData:any[]=[
  //   {id:1,'invoiceNO':11000123,'transactionID':'OD90123001','transactionMode':'Bank Transfer','ReceivedAmt':'Rs 1500','DueAmt':'Rs 00','TotalAmt':'Rs 1500','PayDate':'2/07/2022'},
  //   {id:2,'invoiceNO':11000234,'transactionID':'OD90123018','transactionMode':'Cash','ReceivedAmt':'Rs 2500','DueAmt':'Rs 500','TotalAmt':'Rs 2500','PayDate':'3/05/2022'},
  //   {id:3,'invoiceNO':11000345,'transactionID':'OD90123024','transactionMode':'Online','ReceivedAmt':'Rs 3500','DueAmt':'Rs 600','TotalAmt':'Rs 3000','PayDate':'4/06/2022'},
  //   {id:4,'invoiceNO':11000456,'transactionID':'OD90123076','transactionMode':'Card','ReceivedAmt':'Rs 4500','DueAmt':'Rs 1000','TotalAmt':'Rs 2500','PayDate':'5/09/2022'},
  // ];
  // filter start

  allLeads() {
    // this.getBridge2();

  }
  thisToday() {
    this.selectedData = this.bridges2.filter(($statud: any) => $statud.date == this.newdate);
  }

  thisWeek() {
    //  this.selectedData = this.bridges2.filter(
    //   m => m.date <= this.newdate && m.date >= this.Weekdate
    //   );
  }


  thisMonth() {
    // this.selectedData = this.bridges2.filter(
    //   m => m.date <= this.newdate && m.date >= this.monthlydate
    //   );
  }
  thisYear() {
    // this.selectedData =this.selectedData.concat(this.bridges2.filter(
    //   m => m.date <= this.newdate && m.date >= this.yearlydate
    //   ));
  }

  // filter close

  openNav() {
    $("#mySidepanel").addClass("filterSidePanel")
    //(document.getElementById("mySidepanel") as HTMLInputElement).style.width = "400px";
    $('#mySidepanel').addClass('sidepanel2');
    $('#mySidepanel').removeClass('mySidepanelGo');
    $('.sidepanel').show();

  }


  closeNav() {
    $("#mySidepanel").removeClass("filterSidePanel")
    //(document.getElementById("mySidepanel") as HTMLInputElement).style.width = "400px";
    $('#mySidepanel').removeClass('sidepanel2');
    $('#mySidepanel').addClass('mySidepanelGo');

  }




  public getDaysArray = [];

  leadgeneratedarr: any = [];
  filterLead: any = {};

  apply() {

    let transaction_Mode: any = [];

        if(!!this.filterLead.TransactMod && !!this.filterLead.PaymentDate){
          for (let x of this.filterLead.TransactMod ) {
            transaction_Mode = transaction_Mode.concat(this.bridges2.filter(($data) =>
            $data.TransactMod === x.item_text &&
            $data.PaymentDate === this.filterLead.PaymentDate
            ))
          };
            this.selectedData=transaction_Mode;
          }

          else if(!!this.filterLead.TransactMod){
            for (let x of this.filterLead.TransactMod ) {
            transaction_Mode = transaction_Mode.concat(this.bridges2.filter(($data) =>
              $data.TransactMod === x.item_text

            ))
            };
            this.selectedData=transaction_Mode;
          }

          else if(!!this.filterLead.PaymentDate){
            transaction_Mode = this.bridges2.filter(($data) =>
            $data.PaymentDate === this.filterLead.PaymentDate
            )
            this.selectedData=transaction_Mode;
          }





    //     let transaction_Mode: any = [];
    // if(this.filterLead.TransactMod !=null && this.filterLead.TransactMod.length>0){
    //   for (let x of this.filterLead.TransactMod) {
    //     transaction_Mode = transaction_Mode.concat(this.bridges2.filter(($statud) => $statud.TransactMod === x.item_text));
    //   }
    //   this.selectedData=transaction_Mode;

    // }

    // if(!!this.filterLead.PaymentDate){
    //     let DatePayment: any = [];
    //     DatePayment = DatePayment.concat(this.bridges2.filter(
    //     m => m.PaymentDate=== this.filterLead.PaymentDate
    //     ));

    //    this.selectedData=DatePayment;
    // }

  }

  resetfilter() {
    this.filterLead.TransactMod=[];
    this.filterLead.PaymentDate = '';
    this.getBridge2();



  }



  count = new Array();
  selectAll1() {
    let num = (<HTMLInputElement>document.getElementById("selectAll1"));
    let localdata: any[] = [];
    var requiredResult: any[] = this.bridges2;




    localdata = requiredResult;


    let startind = (this.p - 1) * this.pagelimit;
    let endind = (this.p - 1) * this.pagelimit + this.pagelimit;

    if (endind < localdata.length) {
      endind = endind;
    }
    else {
      endind = localdata.length;
    }

    if (num.checked) {
      this.count = [];
      for (let i = startind; i < endind; i++) {
        this.count.push(localdata[i].id);
      }
      $("input[class=checkbox]").prop("checked", $("#selectAll1").prop("checked"));
      $(".extra-area").show();
    }
    else {
      this.count = [];
      $("input[class=checkbox]").prop("checked", $("#selectAll1").prop("checked"), false);
      $(".extra-area").hide();
    }



  }

  selectAll12() {
    $("input[class=checkbox2]").prop("checked", $("#selectAll12").prop("checked"));
    let num = (document.getElementById("selectAll12") as HTMLInputElement);
    if (num.checked) {
      $(".extra-area2").show();
    }
    else {
      $(".extra-area2").hide();
    }
  }



  checkboxclick(id: any) {
    var checkvalue = this.count.includes(id);

    let localdata: any[] = [];
    var requiredResult: any[] = this.bridges2;


    localdata = requiredResult;


    let startind = (this.p - 1) * this.pagelimit;
    let endind = (this.p - 1) * this.pagelimit + this.pagelimit;

    if (endind < localdata.length) {
      endind = endind;
    }
    else {
      endind = localdata.length;
    }

    let total = endind - startind;
    if (checkvalue == false) {
      this.count.push(id);
    }
    else {
      this.count.splice(this.count.indexOf(id), 1);
    }

    if (this.count.length >= 1) {
      $(".extra-area").show();
    }
    if (this.count.length == 0) {
      $(".extra-area").hide();
      $('#selectAll1').prop('checked', false);
    }

    if (total == this.count.length) {
      $('#selectAll1').prop('checked', true);
    }
    else {
      $('#selectAll1').prop('checked', false);
    }


  }

  // checkboxclick2() {
  //   let leng = this.bridges2.length;
  //   var count = new Array();
  //   for (let i = 0; i < leng; i++) {
  //     let num = (document.getElementById("checkbox" + this.bridges2[i]['id']) as HTMLInputElement);
  //     if (num.checked) {
  //       count.push(num.value);
  //     }
  //   }
  //   if (count.length >= 1) {
  //     $(".extra-area2").show();
  //   }
  //   else {
  //     $(".extra-area2").hide();
  //     $('#selectAll12').prop('checked', false);
  //   }
  // }

  // getBridge(): void {
  //   let tmp : any[]=[];
  //   this.bridgeService2.getAll().subscribe(
  //     (data: Bridge[]) => {
  //       this.bridgess = data;
  //       this.tereer = this.bridgess;
  //       for (let i = 0; i < this.bridgess.length; i++) {
  //         tmp.push({ item_id: i, item_text: data[i].firstName });
  //         if (this.bridgess[i]['SalesEmployeeCode'] == '-1') {
  //           this.bridgess.splice(i, 1);
  //         }
  //         if (this.bridgess[i]['SalesEmployeeCode'] == '') {
  //           this.bridgess.splice(i, 1);
  //         }
  //       }
  //       this.AssigneddropdownList = tmp;
  //       if (this.bridgess.length <= 0) {
  //         this.nodata = true;
  //       }
  //       else {
  //         this.nodata = false;
  //       }

  //
  //     },
  //     (err) => {
  //       console.log(err);
  //       this.error = err;
  //     }
  //   );
  // }

  getBridge2(): void {
    this.isLoading = true;
    this.bridgeService2.getpaymentdata().subscribe(
      (data: Payment[]) => {
        this.isLoading = false;
        this.bridges2 = data;
        this.selectedData = data;

        this.endind = this.bridges2.length;
       // console.log('PAyment Details',this.bridges2);

        if (this.bridges2.length < 10) {
          this.endind = this.bridges2.length;
        }
        if(!!this.payid){
this.isdataLoading=true;
          this.selectedData=this.bridges2.filter((payfilter:any)=>{
this.isdataLoading=false;
           return payfilter?.CardCode?.CardCode===this.payid;
          });
         // console.log(this.selectedData);
        }



      },
      (err) => {
        this.isLoading = false;
        console.log(err);
        this.error = err;
      }
    );
  }




  onFileChange(evt: any) {

    const target: DataTransfer = <DataTransfer>(evt.target);


    if (target.files.length !== 1) throw new Error('Cannot use multiple files');

    const reader: FileReader = new FileReader();

    reader.onload = (e: any) => {
      const bstr: string = e.target.result;

      const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });

      const wsname: string = wb.SheetNames[0];

      const ws: XLSX.WorkSheet = wb.Sheets[wsname];



      this.data = (XLSX.utils.sheet_to_json(ws, { header: 1 }));


      if (confirm("Are You Sure Do You Want To Import Data ?")) {
        var x: number[][] = this.data.slice(1);
        var excelupload = new Array();

        let leng = x.length;
        for (let i = 0; i < leng; i++) {

          let y = x[i];
          let assto = '';
          if (y[0] == undefined) {

            this.exedate = ' ';
          }
          else {

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

            y[0] = this.exedate;
          }


          if (y[2] == undefined) {
            this.execname = '';
          }
          else {
            this.execname = y[2];
          }

          if (y[3] == undefined) {
            this.exesource = '';
          }
          else {
            this.exesource = y[3];
          }

          if (y[6] == undefined) {
            this.exeremarks = '';
          }
          else {
            this.exeremarks = y[6];
          }

          if (y[8] == undefined) {
            this.exeproductinterest = '';
          }
          else {
            this.exeproductinterest = y[8];
          }

          if (y[9] == undefined) {
            this.exedesignation = '';
          }
          else {
            this.exedesignation = y[9];
          }
          if (y[10] == undefined) {
            this.exenoofemp = 0;
          }
          else {
            this.exenoofemp = y[10];
          }

          if (y[11] == undefined) {
            this.exeturnover = '';
          }
          else {
            this.exeturnover = y[11];
          }
          if (y[1] == undefined) {
            this.exelocation = '';
          }
          else {
            this.exelocation = y[1];
          }

          if (y[7] == undefined) {
            this.exeEemail = '';
          }
          else {
            this.exeEemail = y[7];
          }
          if (y[5] != undefined) {
            var empArray = {
              "date": this.exedate,
              "location": this.exelocation,
              "companyName": this.execname,
              "source": this.exesource,
              "contactPerson": y[4],
              "phoneNumber": y[5],
              "message": this.exeremarks,
              "email": this.exeEemail,
              "productInterest": this.exeproductinterest,
              "assignedTo": this.UserId,
              "employeeId": this.UserId,
              "timestamp": this.newdatetime,
              "designation": this.exedesignation,
              "numOfEmployee": this.exenoofemp,
              "turnover": this.exeturnover,
              "status": 'Follow Up',
              "leadType": '',
              "Attach": '',
              "Caption": ''

            };
            excelupload.push(empArray);
          }
        }

        // this.http.post(this.baseUrl2 + '/lead/create', excelupload).toPromise().then((data: any) => {

        //   if (Object(data)['message'] == "successful") {
        //     alert('Data Imported Successfully');

        //     this.ngOnInit();
        //   }
        //   else {

        //     alert(Object(data)['message']);
        //   }
        // });

      }
    };


    reader.readAsBinaryString(target.files[0]);
  }


  exportexcel() {

    let element = document.getElementById('assigntable1');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    setTimeout(() => {
      XLSX.writeFile(wb, 'LeadExcelSheet.xlsx');


    }, 2000);


  }




  resetAlerts() {
    this.error = '';
    this.success = '';
  }
  addPay(f: NgForm) {
    f = this.bridgeService2.GlobaleTrimFunc(f);
    this.resetAlerts();
    for (let [keys, value] of Object.entries(f.value)) {
      if (!!!f.value[keys]) {
        f.value[keys] = "";
      }
    }
    if (f.valid) {
      this.isLoading = true;
      this.payment.Attach = this.files;

      this.bridgeService2.addpayment(this.payment).subscribe(
        (res: Payment) => {
          if (Object(res)['status'] == "200") {
            this.isLoading = false;
            $(".success-box").show();
            this.modalService.dismissAll();
            setTimeout(() => {
              $(".success-box").fadeOut(1000);
              let currentUrl = this.router.url;
              this.router.routeReuseStrategy.shouldReuseRoute = () => false;
              this.router.onSameUrlNavigation = 'reload';
              this.router.navigate([currentUrl]);
            }, 2000);
          }
          else {
            alert(Object(res)['message']);
            this.isLoading = false;
          }

        },
        (err) => {
          this.isLoading = false;
          const delim = ":"
          const name = err.message
          const result = name.split(delim).slice(3).join(delim)
          alert(result);

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
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', modalDialogClass: 'modal-dialog-centered payment-cards-modal' }).result.then((result) => {
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
    this.router.navigate(['/payment-terms-details/' + item]);
  }



  // deleteid: number = 0;
  // deleteLeads(id: number) {

  //   $('.delete-success-box').show();
  //   $('.hover-show').hide();
  //   this.deleteid = id;

  //   setTimeout(() => {
  //     $('.delete-success-box').fadeOut();
  //   }, 50000);


  // }



  // yesdeleteUser(status: number) {
  //   if (status == 1) {
  //     let id = this.deleteid;
  //     this.resetAlerts();

  //       this.bridgeService2.deleteleads(id).subscribe(
  //       (res) => {
  //         this.bridges2 = this.bridges2.filter(function (item) {
  //           return item['id'] && +item['id'] !== +id;
  //         });

  //       },
  //       (err) => (this.error = err)
  //     );
  //     this.ngOnInit();
  //     $('.delete-success-box').hide();
  //   } else {

  //     this.ngOnInit();
  //     $('.delete-success-box').hide();
  //   }
  // }


  openEdit(contentEdit: any, item: Bridge2) {

    this.modalService.open(contentEdit, { ariaLabelledBy: 'modal-basic-title', modalDialogClass: 'modal-dialog-centered payment-cards-modal' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });

    this.editpaygetone(item.id);



  }


  editpaygetone(item: any) {
    //console.log('item side',item);
    // if (item != null) {
    this.bridgeService2.getOnepaymentdata(item).subscribe(
      (data: EditPayment[]) => {
        this.isLoading = false;
        this.editpays = data;

       // console.log('this.editpays',this.editpays)

        this.editpayment.id = this.editpays[0].id;
        this.editpayment.CardCode = this.editpays[0].CardCode;

        this.editpayment.InvoiceNo = this.editpays[0].InvoiceNo;
        this.editpayment.TransactId = this.editpays[0].TransactId;
        this.editpayment.TotalAmt = Number(this.editpays[0].TotalAmt);
        this.editpayment.TransactMod = this.editpays[0].TransactMod;
        this.editpayment.DueAmount = Number(this.editpays[0].DueAmount);
        this.editpayment.PaymentDate = this.editpays[0].PaymentDate;
        this.editpayment.ReceivedAmount = Number(this.editpays[0].ReceivedAmount);
        this.editpayment.Remarks = this.editpays[0].Remarks;
        this.editfilesList = this.editpays[0].Attach;






      },
      (err) => {
        this.isLoading = false;
        console.log(err);
        this.error = err;
      }
    );
    // }

  }


  openView(contentEdit: any, item: Bridge2) {

    this.modalService.open(contentEdit, { ariaLabelledBy: 'modal-basic-title', modalDialogClass: 'modal-dialog-centered payment-cards-modal' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });

    this.editpaygetone(item.id);

  }


  editPay(fb: NgForm) {
    fb = this.bridgeService2.GlobaleTrimFunc(fb);
    for (let [keys, value] of Object.entries(fb.value)) {
      if (!!!fb.value[keys]) {
        fb.value[keys] = "";
      }
    }
    if (fb.valid) {
      this.resetAlerts();
      this.editpayment.Attach = this.editfiles || "";
      this.isLoading = true;
      this.bridgeService2.editpaymentform(this.editpayment).subscribe(
        (res: EditPayment) => {
          if (Object(res)['status'] == "200") {
            $(".edit-success-box").show();
            this.isLoading = false;
            this.modalService.dismissAll();
            setTimeout(() => {
              $(".edit-success-box").fadeOut(1000);
              let currentUrl = this.router.url;
              this.router.routeReuseStrategy.shouldReuseRoute = () => false;
              this.router.onSameUrlNavigation = 'reload';
              this.router.navigate([currentUrl]);
            }, 2000);
          }
          else{
            alert(Object(res)['message']);
            this.isLoading = false;
          }


        },
        (err) => {
          this.isLoading = false;
          this.modalService.dismissAll();
          const delim = ":"
          const name = err.message
          const result = name.split(delim).slice(3).join(delim)
          alert(result);
          this.ngOnInit();
        }
      );
    }
    else{
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

  // Assign to modal start







  // filterDropdown(e:any) {

  //   let searchString = e.target.value;
  //   this.tereer = this.bridgess;
  //     this.tereer = this.bridgess.filter(
  //       (user:any) => {
  //          return user.SalesEmployeeName.toLocaleLowerCase().includes(searchString.toLocaleLowerCase())

  //       }
  //     );
  //   }

  //   selectValue(name:any) {
  //     this.selectedValue = name;

  //     this.findassaignName=this.bridgess.find((obj:any)=>obj.id===name);
  //     this.selectedName=this.findassaignName.SalesEmployeeName

  //   }




  editdeletepop(item: Bridge2) {
    $('.hover-show' + item.id).show()
  }

  multipleDelete1() {
    $('.delete-success-boxall').show();

    setTimeout(() => {
      $('.delete-success-boxall').fadeOut();
    }, 50000);
  }

  deletecheck(e:any){
    if(e==1){

var mutdelete = new Array();
let leng = this.bridges2.length;
for (let i = 0; i < leng; i++) {
  //  console.log('delete all',this.bridges2[i])
  let num = (document.getElementById("checkbox" + this.bridges2[i]['id']) as HTMLInputElement);
  if (num.checked) {
    let val = (document.getElementById("checkbox" + this.bridges2[i]['id']) as HTMLInputElement).value;
    var empArray = {
      "id": val
    };
    mutdelete.push(val);
  }
}

let multipledelete = mutdelete.map(i => Number(i));

//multipledelete.join(',');


mutdelete.join(',');
this.bridgeService2.deletepayment(multipledelete).subscribe((res:any)=>{
  this.selectedData = this.bridges2.filter(function (item) {
    return item['id'] && +item['id'] !== +multipledelete;
  });
   this.ngOnInit();
   $('.delete-success-boxall').hide();
})

}
 else if(e==0){
      $('.delete-success-boxall').hide();

    }
}


  // multipleDelete2() {
  //   if (confirm("Are You Sure Do You Want To Delete This Data")) {
  //     var mutdelete = new Array();
  //     let leng = this.bridges2.length;
  //     for (let i = 0; i < leng; i++) {

  //       let num = (document.getElementById("checkbox" + this.bridges2[i]['id']) as HTMLInputElement);
  //       if (num.checked) {
  //         let val = (document.getElementById("checkbox" + this.bridges2[i]['id']) as HTMLInputElement).value;
  //         var empArray = {
  //           "id": val
  //         };
  //         mutdelete.push(val);
  //       }
  //     }
  //     mutdelete.join(',');
  //     this.http.post(this.baseUrl2 + '/lead/delete', { id: mutdelete }).toPromise().then((data: any) => {

  //       if (data['message'] == "successful") {
  //         this.ngOnInit();
  //         let currentUrl = this.router.url;
  //         this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  //         this.router.onSameUrlNavigation = 'reload';
  //         this.router.navigate([currentUrl]);
  //       }

  //     });

  //   }
  //   else {

  //   }
  // }


  // multipleAssign(contentMultipleAssignEdit: any) {
  //   this.modalService.open(contentMultipleAssignEdit, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
  //     this.closeResult = `Closed with: ${result}`;
  //   }, (reason) => {
  //     this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
  //   });


  // }


  // AssignLeads(item: number) {

  //   if (confirm("Are You Sure Do You Want To Assign Lead")) {
  //     var mutdelete = new Array();
  //     let leng = this.bridges2.length;
  //     for (let i = 0; i < leng; i++) {

  //       let num = (document.getElementById("checkbox" + this.bridges2[i]['id']) as HTMLInputElement);
  //       if (num.checked) {
  //         let val = (document.getElementById("checkbox" + this.bridges2[i]['id']) as HTMLInputElement).value;
  //         var empArray = {
  //           "id": val
  //         };
  //         mutdelete.push(val);
  //       }
  //     }
  //     mutdelete.join(',');
  //     this.http.post(this.baseUrl2 + '/lead/assign', { id: mutdelete, employeeId: item }).toPromise().then((data: any) => { });
  //     this.ngOnInit();
  //   }
  //   else {
  //   }


  // }




  // reload() {
  //   this.isLoading = true;
  //   $('#selectAll1').prop('checked', false);
  //   $('#selectAll12').prop('checked', false);
  //   setTimeout(() => {
  //     $(".extra-area2").hide();
  //     $(".extra-area").hide();
  //     this.isLoading = false;
  //     this.ngOnInit();
  //   }, 100);
  // }



  // assingEdit(contentAssignEdit: any, item: Bridge2) {

  //   this.modalService.open(contentAssignEdit, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
  //     this.closeResult = `Closed with: ${result}`;
  //   }, (reason) => {
  //     this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
  //   });


  //   this.Com_name = item.companyName;
  //   this.editbridges = Object(item);

  //   this.editbridges.id = String(item.id);

  //   this.editbridges.date = item.date;
  //   this.editbridges.companyName = item.companyName;
  //   this.editbridges.source = item.source;
  //   this.editbridges.email = item.email;
  //   this.editbridges.location = item.location;
  //   this.editbridges.contactPerson = item.contactPerson;
  //   this.editbridges.phoneNumber = item.phoneNumber;
  //   this.editbridges.message = item.message;
  //   this.editbridges.productInterest = item.productInterest;
  //   this.editbridges.assignedTo = Object.values(item.assignedTo)[0];
  //   this.editbridges.employeeId = item.employeeId.id;
  //   this.editbridges.timestamp = item.timestamp;

  //   this.editbridges.designation = item.designation;
  //   this.editbridges.turnover = item.turnover;
  //   this.editbridges.numOfEmployee = item.numOfEmployee;


  // }



  // openfollowup(followup: any, item: Bridge2) {
  //   this.modalService.open(followup, { ariaLabelledBy: 'modal-basic-title', modalDialogClass: 'modal-dialog-centered order-cards-modal' }).result.then((result) => {
  //     this.closeResult = `Closed with: ${result}`;
  //   }, (reason) => {
  //     this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
  //   });



  //   this.AddFollow2.Subject = item.companyName;
  //   this.AddFollow2.SourceID = String(item.id);

  //   this.AddFollow2.Emp = String(this.UserId);
  //   this.AddFollow2.Emp_Name = this.UserName;
  //   this.AddFollow2.SourceType = 'Lead';
  // }


  // addFollowUp(fb: NgForm) {
  //   this.resetAlerts();

  //   if (fb.valid) {
  //     this.AddFollow2.Emp = Number(this.AddFollow2.Emp);

  //     const timeString = this.AddFollow2.Time;


  //     const timeString12hr = new Date('1970-01-01T' + timeString + 'Z')
  //       .toLocaleTimeString('en-US',
  //         { timeZone: 'UTC', hour12: true, hour: 'numeric', minute: 'numeric' }
  //       );
  //     var newdt = `${timeString12hr}`
  //     this.AddFollow2.Time = newdt;


  //     this.bridgeService2.storeleadfollow2(this.AddFollow2).subscribe(
  //       (res: AddFollow2) => {
  //         if (Object(res)['status'] == "200") {

  //           this.AddFollow2s.push(res)

  //          $(".success-box2").show();
  //           this.modalService.dismissAll();
  //           setTimeout(() => {
  //             $(".success-box2").fadeOut(1000);
  //             let currentUrl = this.router.url;
  //             this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  //             this.router.onSameUrlNavigation = 'reload';
  //             this.router.navigate([currentUrl]);
  //           }, 2000);
  //         }
  //         else {
  //           alert(Object(res)['message']);
  //         }
  //         // Reset the form
  //       },
  //       (err) => {
  //         const delim = ":"
  //         const name = err.message
  //         const result = name.split(delim).slice(3).join(delim)
  //         alert(result);
  //         //  this.ngOnInit();
  //       }
  //     );


  //   }
  //   else {
  //     for (let i = 0; i < Object.keys(fb.value).length; i++) {
  //       var keyys = Object.keys(fb.value)[i];
  //       if (fb.value[keyys].length == 0) {

  //         if ($("input[name=" + keyys + "]").hasClass('required-fld')) {
  //           $("input[name=" + keyys + "]").addClass("red-line-border");
  //           $("input[name=" + keyys + "]").focus();
  //         }
  //         if ($("select[name=" + keyys + "]").hasClass('required-fld')) {
  //           $("select[name=" + keyys + "]").addClass("red-line-border");
  //           $("select[name=" + keyys + "]").focus();
  //         }
  //         if ($("password[name=" + keyys + "]").hasClass('required-fld')) {
  //           $("password[name=" + keyys + "]").addClass("red-line-border");
  //           $("password[name=" + keyys + "]").focus();
  //         }
  //         if ($("textarea[name=" + keyys + "]").hasClass('required-fld')) {
  //           $("textarea[name=" + keyys + "]").addClass("red-line-border");
  //           $("textarea[name=" + keyys + "]").focus();
  //         }

  //       }

  //       else {
  //         $("input[name=" + keyys + "]").removeClass("red-line-border");
  //         $("select[name=" + keyys + "]").removeClass("red-line-border");
  //         $("password[name=" + keyys + "]").removeClass("red-line-border");
  //         $("textarea[name=" + keyys + "]").removeClass("red-line-border");
  //       }
  //     }
  //   }

  // }








  // CreateLeadstoBp(id: number) {
  //   this.bridgeService2.leadtobp(id);
  //   this.router.navigate(['/customer/add-customer']);
  // }


  // clearFilter(event: any) {
  //   this.pagelimit = Number(event.target.value);
  //   this.p = 1;
  //   this.startind = ((this.p - 1) * this.pagelimit) + 1;
  //   this.endind = ((this.p - 1) * this.pagelimit) + this.pagelimit;
  //   if (this.endind > this.bridges2.length) {
  //     this.endind = this.bridges2.length;
  //   }
  // }

  // pageChanged(event: any) {
  //   this.p = event;
  //   this.startind = ((this.p - 1) * this.pagelimit) + 1;
  //   this.endind = ((this.p - 1) * this.pagelimit) + this.pagelimit;
  //   if (this.endind > this.bridges2.length) {
  //     this.endind = this.bridges2.length;
  //   }
  // }

  sortedColumn: string = '';
  sortsend: boolean | undefined;


  togglesortType(key: any) {
    this.sortsend = !this.sortsend;
    this.sortedColumn = key + String(this.sortsend);

  }
  // source1: any;
  // getAllSource(): void {
  //   let sourcetmp : any[]=[];
  //   this.bridgeService2.getAllSourcedata().subscribe(
  //     (data: any[]) => {
  //       this.source1 = data;
  //       for(let i=0; i < data.length; i++) {
  //         sourcetmp.push({ item_id: i, item_text: data[i].Name });
  //       }
  //       this.sourcedropdownList = sourcetmp;
  //      // console.log(this.source1)
  //
  //     },
  //     (err) => {
  //       console.log(err);
  //       this.error = err;
  //     }
  //   );
  // }


  // mouseEnter(){
  //   $('.tableview').show();
  //  }

  // mouseEntershortby(){
  //     $('.shortview').show();
  //    }
  //    mouseLeavetable(){
  // $('.shortview').hide();
  //    }
  //    mouseLeaveshort(){
  //     $('.tableview').hide();
  //    }

  multipledropdownhide() {
    $('.tableview').hide();
    $('.shortview').hide();
  }
  mouseLeave() {
    $('.tableview').hide();
    $('.shortview').hide();
  }

  mouseEnter() {
    $('.tableview').show();
    $('.shortview').hide();
  }



  mouseEntershortby() {
    $('.shortview').show();
    $('.tableview').hide();
  }





  // multiple attachment


  // edit multiple attach

  editfiles: any;



  oneditFileDropped($event: any) {
    this.prepareeditFilesList($event);
  }


  fileeditBrowseHandler(editfiles: any) {
    this.prepareeditFilesList(editfiles.target.files);
  }

  deletefileapi(imageid: any, index: any) {
    let id = this.editpayment.id;
    this.bridgeService2.deletepaymentimg(id, imageid).subscribe(
      (res) => {
        // this.editfiles = this.editfiles.filter(function (item: any) {
        //   return item['id'] && +item['id'] !== +imageid;
        // });
        // this.editpays = this.editpays.filter(function (item: any) {
        //   return item['id'] && +item['id'] !== +imageid;
        // });

        this.editfilesList.splice(index, 1);



      },
      (err) => (this.error = err)
    );
  }
  deleteeditFile(index: number) {
    alert('Are you sure want to delete ?')
    this.editfiles.splice(index, 1);

  }





  prepareeditFilesList(editfiles: Array<any>) {

    this.editfiles = editfiles;
    // for (const item of editfiles) {
    //   this.editfiles.push(item);

    // }
    //this.files=files;


  }




  // multiple attachment


  files: any[] = [];

  onFileDropped($event: any) {
    this.prepareFilesList($event);
  }


  fileBrowseHandler(files: any) {
    this.prepareFilesList(files.target.files);
  }


  deleteFile(index: number) {
    this.files.splice(index, 1);

  }


  uploadFilesSimulator(index: number) {
    setTimeout(() => {
      if (index === this.files.length) {

        return;
      } else {
        const progressInterval = setInterval(() => {
          if (this.files[index].progress === 100) {
            clearInterval(progressInterval);
            this.uploadFilesSimulator(index + 1);
          } else {
            this.files[index].progress += 5;
          }
        }, 200);
      }
    }, 1000);
  }


  prepareFilesList(files: Array<any>) {
    for (const item of files) {
      // item.progress = 0;
      this.files.push(item);
      // console.log(this.files);

    }
    //this.files=files;




    // this.uploadFilesSimulator(0);
  }


  formatBytes(bytes: any, decimals: any) {
    if (bytes === 0) {
      return '0 Bytes';
    }
    const k = 1024;
    const dm = decimals <= 0 ? 0 : decimals || 2;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  }


  // files: any[] = [];

  // onFileDropped($event: any) {
  //   this.prepareFilesList($event);
  // }


  // fileBrowseHandler(files: any) {
  //   this.prepareFilesList(files.target.files);
  // }


  // deleteFile(index: number) {
  //   this.files.splice(index, 1);
  // }


  // uploadFilesSimulator(index: number) {
  //   setTimeout(() => {
  //     if (index === this.files.length) {

  //       return;
  //     } else {
  //       const progressInterval = setInterval(() => {
  //         if (this.files[index].progress === 100) {
  //           clearInterval(progressInterval);
  //           this.uploadFilesSimulator(index + 1);
  //         } else {
  //           this.files[index].progress += 5;
  //         }
  //       }, 200);
  //     }
  //   }, 1000);
  // }


  // prepareFilesList(files: Array<any>) {
  //   for (const item of files) {
  //     item.progress = 0;
  //     this.files.push(item);
  //     console.log(this.files);
  //   }
  //   this.uploadFilesSimulator(0);
  // }


  // formatBytes(bytes: any, decimals: any) {
  //   if (bytes === 0) {
  //     return '0 Bytes';
  //   }
  //   const k = 1024;
  //   const dm = decimals <= 0 ? 0 : decimals || 2;
  //   const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  //   const i = Math.floor(Math.log(bytes) / Math.log(k));
  //   return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  // }

}
