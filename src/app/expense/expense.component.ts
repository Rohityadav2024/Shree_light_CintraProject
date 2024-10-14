import { Component, OnInit } from '@angular/core';
import * as XLSX from 'xlsx';
import { HttpClient } from '@angular/common/http';
import { AddFollow2, Bridge2, Expense, EditExpense } from '../bridge2';
import { BridgeService } from '../modules/service/bridge.service';
import { NgbModal, ModalDismissReasons, } from '@ng-bootstrap/ng-bootstrap';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Bridge } from '../bridge';
import { DatePipe } from '@angular/common';
declare var $: any;
@Component({
  selector: 'app-expense',
  templateUrl: './expense.component.html',
  styleUrls: ['./expense.component.scss']
})
export class ExpenseComponent implements OnInit {

  baseUrl2: any;
  expenseUser: Bridge[] = [];

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

  // expenseName: Bridge[] = [];



  inputElementTime = ("0" + this.dateObj.getHours()).slice(-2) + ":" + ("0" + this.dateObj.getMinutes()).slice(-2);

  // getValues(obj: {}) {
  //   return Object.values(obj)
  // }
  newdatetime = this.newdate + " " + this.time;
  bridges2: Expense[] = [];
  UserId = sessionStorage.getItem('UserId');
  SalesEmployeeCode: any;
  bridges: Expense = {
    remarks: '',
    trip_name: '',
    type_of_expense: '',
    expense_from: '',
    expense_to: '',
    totalAmount: 0,
    createDate: this.newdate,
    createTime: this.time,
    createdBy: Number(this.UserId),
    employeeId: '',
    Attach: '',

  };
  editExpens: EditExpense[] = [];
  editExpense: EditExpense = {
    id: 0,
    remarks: '',
    trip_name: '',
    type_of_expense: '',
    expense_from: '',
    expense_to: '',
    totalAmount: 0,
    updateDate: '',
    updateTime: '',
    updatedBy: Number(this.UserId),
    employeeId: '',
    Attach: '',
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
  dropdownList1: any = [];



  public selectedValue: any;
  public searchAssignValue: any;
  selectedName: any;
  findassaignName: any;
  lead_id: any;


  Weekdate: any;
  monthlydate: any;
  yearlydate: any;

  filterString = "";
  selectedData: any[] = [];
  typeOfExpense: any;
  TransactionMode: any;
  paginationOption: any;
  constructor(private router: Router, public datepipe: DatePipe, private http: HttpClient, private bridgeService2: BridgeService, private modalService: NgbModal) {
    this.baseUrl2 = this.bridgeService2.baseUrl2;
    // console.log(this.baseUrl2);



  }

  ngOnInit() {


    $('#fromDate').attr('max', this.newdate);

    this.bridgeService2.autoCall();
    this.typeOfExpense = this.bridgeService2.TypeofExpense;
    this.TransactionMode = this.bridgeService2.TransactionMode;
    this.paginationOption = this.bridgeService2.paginationOption;
    // this.getAllSource();

    this.dropdownList1 = [
      { item_text: 'Hotel Stay' },
      // { item_text: 'New' },
      // { item_text: 'Junk' },
      // { item_text: 'Qualified' },
      // { item_text: 'Hold' },

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
    this.SalesEmployeeCode = sessionStorage.getItem('SalesEmployeeCode');
    if (this.UserName == undefined) {
      this.router.navigate(['/login']);
    }
    this.bridges.employeeId = this.SalesEmployeeCode;


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


    this.getExpense();


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
    this.getExpenseUser();

  }


  getExpenseUser(): void {
    this.bridgeService2.getAll().subscribe(
      (data: Bridge[]) => {
        this.expenseUser = data;
        // console.log('employee list',this.expenseUser);
        // for (let i = 0; i < this.bridges.length; i++) {
        //   if (this.bridges[i]['SalesEmployeeCode'] == '-1') {
        //     this.bridges.splice(i, 1);
        //   }
        //   if (this.bridges[i]['SalesEmployeeCode'] == '') {
        //     this.bridges.splice(i, 1);
        //   }
        // }


      },
      (err) => {
        console.log(err);

      }
    );
  }

  reload() {
    this.count.length = 0;
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






  // filter start

  allLeads() {
    // this.getBridge2();

  }
  thisToday() {
    // this.selectedData = this.bridges2.filter(($statud: any) => $statud.date == this.newdate);
  }

  thisWeek() {
    // this.selectedData = this.bridges2.filter(
    //   m => m.date <= this.newdate && m.date >= this.Weekdate
    // );
  }


  thisMonth() {
    // this.selectedData = this.bridges2.filter(
    //   m => m.date <= this.newdate && m.date >= this.monthlydate
    // );
  }
  thisYear() {
    // this.selectedData = this.selectedData.concat(this.bridges2.filter(
    //   m => m.date <= this.newdate && m.date >= this.yearlydate
    // ));
  }

  // filter close

  openNav() {
    $("#mySidepanel").addClass("filterSidePanel")
    // (document.getElementById("mySidepanel") as HTMLInputElement).style.width = "400px";
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
  toDate: any;

  SendDatetoFunction(event: any) {
    // console.log(event.target.value);
    this.toDate = event.target.value;

    $('#toDate').attr('min', this.toDate);
  }

  apply() {

    let expenseData: any = [];

    if (!!this.filterLead.typeofexpense && !!this.filterLead.expense_from && !!this.filterLead.expense_to) {

      for (let x of this.filterLead.typeofexpense) {
        if (this.filterLead.expense_to >= this.filterLead.expense_from) {
          expenseData = expenseData.concat(this.bridges2.filter(($data) =>
            $data.type_of_expense == x.item_text &&
            $data.expense_from <= this.filterLead.expense_to && $data.expense_from >= this.filterLead.expense_from
          ));
        }
      }
      this.selectedData = expenseData;
    }
    else if (!!this.filterLead.typeofexpense) {
      for (let x of this.filterLead.typeofexpense) {
        if (this.filterLead.expense_to >= this.filterLead.expense_from) {
          expenseData = expenseData.concat(this.bridges2.filter(($data) =>
            $data.type_of_expense == x.item_text
            // $data.expense_from <= this.filterLead.expense_to && $data.expense_from >= this.filterLead.expense_from
          ));
        }
      }
      this.selectedData = expenseData;
    }

    else if (!!this.filterLead.expense_from && !!this.filterLead.expense_to) {

      if (this.filterLead.expense_to >= this.filterLead.expense_from) {
        expenseData = expenseData.concat(this.bridges2.filter(($data) =>
          $data.expense_from <= this.filterLead.expense_to && $data.expense_from >= this.filterLead.expense_from
        ));
      }

      this.selectedData = expenseData;
    }


    // if (this.filterLead.typeofexpense != null && this.filterLead.typeofexpense.length > 0) {
    //   for (let x of this.filterLead.typeofexpense) {
    //     expenseData = expenseData.concat(this.bridges2.filter(($typeofexpense) => $typeofexpense.type_of_expense == x.item_text));
    //   }
    //   this.selectedData = expenseData;

    // }

    // if (this.filterLead.expense_from != '' || this.filterLead.expense_to != '') {
    //   if (this.filterLead.expense_to >= this.filterLead.expense_from) {
    //     let fromdateData: any = [];
    //     fromdateData = fromdateData.concat(this.bridges2.filter(
    //       (m:any) => {
    //       return  m.expense_from <= this.filterLead.expense_to && m.expense_from >= this.filterLead.expense_from
    //       }
    //     ));
    //     this.selectedData = fromdateData;
    //   }
    // }



  }

  resetfilter() {
    // this.filterLead.status2 = [];
    // this.filterLead.assignto2 = [];
    // this.filterLead.source2 = [];
    // this.filterLead.leadpriority2 = [];
    // this.filterLead.leadgeneratedto = '';
    // this.filterLead.leadgeneratedfrom = '';
    // this.leadgeneratedarr = [];
    //this.getBridge2();

    this.filterLead.typeofexpense = [];
    this.filterLead.expense_from = '';
    this.filterLead.expense_to = '';
    this.getExpense();

    // this.status = 'All';
    // this.assignedTo = 'All';
    // this.source = 'All';
    // this.leadpriority = 'All';
    // this.status2 = [];
    // this.assignto2 = [];
    // this.source2 = [];
    // this.leadpriority2 = [];
    // this.leadgeneratedfrom = '';
    // this.leadgeneratedto = '';
    // this.leadgenerated = '';

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

  checkboxclick2() {
    let leng = this.bridges2.length;
    var count = new Array();
    for (let i = 0; i < leng; i++) {
      let num = (document.getElementById("checkbox" + this.bridges2[i]['id']) as HTMLInputElement);
      if (num.checked) {
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



  getExpense(): void {
    this.isLoading = true;
    this.bridgeService2.getexpnensedata().subscribe(
      (data: Expense[]) => {
        this.isLoading = false;
        this.bridges2 = data;
        //  console.log(this.bridges2);

        this.selectedData = data;
        this.selectedData = data.filter((invoice) => this.isMatch(invoice));
        this.endind = this.bridges2.length;
        // if (this.bridges2.length < 10) {
        //   this.endind = this.bridges2.length;
        // }
        // for (let i = 0; i < this.bridges2.length; i++) {
        //   var theValue = this.bridges2[i]['location'];
        //   var isANumber = isNaN(Number(theValue)) === false;

        //   if (isANumber) {
        //     this.bridges2[i]['location'] = '';
        //   }
        //   else {
        //     this.bridges2[i]['location'] = this.bridges2[i]['location'];
        //   }

        // }


      },
      (err) => {
        this.isLoading = false;
        console.log(err);
        this.error = err;
      }
    );
  }

  isMatch(item: any): any {
    if (item instanceof Object) {
      return Object.keys(item).some((k: any) => this.isMatch(item[k]));
    } else {
      return item.toString().indexOf(this.filterString) > -1
    }
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

  payTotalAmount(event: any) {
    // console.log(event.target.value);
    //
    if(event.target.value < 0){
    this.bridges.totalAmount = 0;
    event.target.value = 0;
    }else{
      this.bridges.totalAmount = Number(event.target.value);
    }
  }

  editpayTotalAmount(event: any) {
    // console.log(event.target.value);
     // this.editpayment.TotalAmt = Number(event.target.value);
     if(event.target.value < 0){
       this.editExpense.totalAmount = 0;
       event.target.value = 0;
       }else{
         this.editExpense.totalAmount = Number(event.target.value);
       }
   }

  resetAlerts() {
    this.error = '';
    this.success = '';
  }
  addExpense(f: NgForm) {
    f = this.bridgeService2.GlobaleTrimFunc(f);
    this.resetAlerts();
    for (let [keys, value] of Object.entries(f.value)) {
      if (!!!f.value[keys]) {
        f.value[keys] = "";
      }
    }
    if (f.valid) {

      // if(f.value.totalAmount < 0){
      //   this.bridges.totalAmount = 0;
      //   f.value.totalAmount = 0;
      //   }else{
      //     this.bridges.totalAmount = Number(event.target.value);
      //   }
      // console.log(f);
      let totalAmount = Number(f.value.totalAmount);
      this.bridges.totalAmount = totalAmount;
      this.bridges.Attach = this.files;
      // console.log(this.bridges);


      this.bridgeService2.addexpense(this.bridges).subscribe(
        (res: Bridge2) => {
          // console.log(res);
          if (Object(res)['message'] == "successful") {

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
          }

        },
        (err) => {
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
    // this.router.navigate(['/payment-terms-details/' + item]);
  }



  deleteid: number = 0;

  deleteLeads(id: number) {

    $('.delete-success-box').show();
    $('.hover-show').hide();
    this.deleteid = id;
    // console.log(this.deleteid);

    setTimeout(() => {
      $('.delete-success-box').fadeOut();
    }, 50000);


  }



  yesdeleteUser(status: number) {
    if (status == 1) {
      let id = this.deleteid;
      this.resetAlerts();

      this.bridgeService2.deleteexpense(id).subscribe(
        (res) => {
          this.bridges2 = this.bridges2.filter(function (item) {
            return item['id'] && +item['id'] !== +id;


          });
          this.getExpense();

        },
        (err) => (this.error = err)
      );
      this.ngOnInit();
      $('.delete-success-box').hide();
    } else {

      this.ngOnInit();
      $('.delete-success-box').hide();
    }
  }


  openEdit(contentEdit: any, item: EditExpense) {

    this.modalService.open(contentEdit, { ariaLabelledBy: 'modal-basic-title', modalDialogClass: 'modal-dialog-centered payment-cards-modal' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });

    this.editgetone(item.id);




  }

  editgetone(item: any) {
    //console.log('item side',item);
    // if (item != null) {
    this.bridgeService2.getOneexpensedata(item).subscribe(
      (data: EditExpense[]) => {
        this.isLoading = false;
        this.editExpens = data;
        // console.log('this.editExpens',this.editExpens);
        this.editExpense.id = this.editExpens[0].id;
        this.editExpense.remarks = this.editExpens[0].remarks;
        this.editExpense.trip_name = this.editExpens[0].trip_name;
        this.editExpense.type_of_expense = this.editExpens[0].type_of_expense;
        this.editExpense.expense_from = this.editExpens[0].expense_from;
        this.editExpense.expense_to = this.editExpens[0].expense_to;
        this.editExpense.employeeId = this.editExpens[0].employeeId.id;
        this.editExpense.totalAmount = this.editExpens[0].totalAmount;
        this.editfiles = this.editExpens[0].Attach;
        this.editExpense.employeeId = this.editExpens[0].employeeId[0].id

        // console.log(this.editExpense);




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



  }


  editExpenseform(fb: NgForm) {
    fb = this.bridgeService2.GlobaleTrimFunc(fb);
    this.resetAlerts();
    for (let [keys, value] of Object.entries(fb.value)) {
      if (!!!fb.value[keys]) {
        fb.value[keys] = "";
      }
    }
    this.editExpense.Attach = this.editfiles;
    if (fb.valid) {
      // console.log(this.editExpense);
      this.bridgeService2.editexpense(this.editExpense).subscribe(
        (res: EditExpense) => {
          // this.bridges22.push(res)
          $(".edit-success-box").show();
          this.modalService.dismissAll();
          setTimeout(() => {
            $(".edit-success-box").fadeOut(1000);
            let currentUrl = this.router.url;
            this.router.routeReuseStrategy.shouldReuseRoute = () => false;
            this.router.onSameUrlNavigation = 'reload';
            this.router.navigate([currentUrl]);
          }, 2000);

        },
        (err) => {
          this.modalService.dismissAll();
          const delim = ":"
          const name = err.message
          const result = name.split(delim).slice(3).join(delim)
          alert(result);
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
    // ;
    //     if (confirm("Are You Sure Do You Want To Delete This Data")) {
    //       var mutdelete = new Array();
    //       let leng = this.bridges2.length;
    //       for (let i = 0; i < leng; i++) {

    //         let num = (document.getElementById("checkbox" + this.bridges2[i]['id']) as HTMLInputElement);
    //         if (num.checked) {
    //           let val = (document.getElementById("checkbox" + this.bridges2[i]['id']) as HTMLInputElement).value;
    //           var empArray = {
    //             "id": val
    //           };
    //           mutdelete.push(val);
    //         }
    //       }
    //       let multipledelete = mutdelete.map(i=>Number(i));


    //       console.log(multipledelete);
    //       this.http.post(this.baseUrl2 + '/expense/delete', { id: multipledelete }).toPromise().then((data: any) => {
    // console.log(data);
    //         if (data['message'] == "successful") {
    //           this.ngOnInit();
    //           let currentUrl = this.router.url;
    //           this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    //           this.router.onSameUrlNavigation = 'reload';
    //           this.router.navigate([currentUrl]);
    //         }

    //       });

    //     }
    //     else {

    //     }
  }

  deletecheck(e: any) {
    if (e == 1) {
      var mutdelete = new Array();
      let leng = this.bridges2.length;
      for (let i = 0; i < leng; i++) {

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


      //console.log(multipledelete);
      this.bridgeService2.deleteexpense(multipledelete).subscribe(
        (res) => {
          this.bridges2 = this.bridges2.filter(function (item) {
            return item['id'] && +item['id'] !== +multipledelete;
          });
          $('.delete-success-boxall').hide();
          this.getExpense();

        },
        (err) => (this.error = err)
      );
      //       this.http.post(this.baseUrl2 + '/expense/delete', { id: multipledelete }).toPromise().then((data: any) => {
      // console.log(data);
      //         if (data['message'] == "successful") {
      //           this.ngOnInit();
      //           let currentUrl = this.router.url;
      //           this.router.routeReuseStrategy.shouldReuseRoute = () => false;
      //           this.router.onSameUrlNavigation = 'reload';
      //           this.router.navigate([currentUrl]);
      //         }

      //       });
    }
    else if (e == 0) {
      $('.delete-success-boxall').hide();
      // $('#selectAll1').prop('checked', false);
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


  clearFilter(event: any) {
    this.pagelimit = Number(event.target.value);
    this.p = 1;
    this.startind = ((this.p - 1) * this.pagelimit) + 1;
    this.endind = ((this.p - 1) * this.pagelimit) + this.pagelimit;
    if (this.endind > this.bridges2.length) {
      this.endind = this.bridges2.length;
    }
  }

  pageChanged(event: any) {
    this.p = event;
    this.startind = ((this.p - 1) * this.pagelimit) + 1;
    this.endind = ((this.p - 1) * this.pagelimit) + this.pagelimit;
    if (this.endind > this.bridges2.length) {
      this.endind = this.bridges2.length;
    }
  }
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


  mouseEnter() {
    $('.tableview').show();
  }

  mouseEntershortby() {
    $('.shortview').show();
  }
  mouseLeavetable() {
    $('.shortview').hide();
  }
  mouseLeaveshort() {
    $('.tableview').hide();
  }


  // edit multiple attach

  editfiles: any;



  oneditFileDropped($event: any) {
    this.prepareeditFilesList($event);
  }


  fileeditBrowseHandler(editfiles: any) {
    // console.log(editfiles);
    this.prepareeditFilesList(editfiles.target.files);
  }

  deletefileapi(imageid: any, index: any) {
    let id = this.editExpense.id;
    // this.editExpense.id
    // console.log('file id', this.editExpense.id);
    // console.log(imageid);
    this.bridgeService2.deleteexpenseimg(id, imageid).subscribe(
      (res) => {
        // this.editfiles = this.editfiles.filter(function (item: any) {
        //   return item['id'] && +item['id'] !== +id;


        // });
        // this.editgetone(this.editExpense.id);
        // this.openEdit()

        this.editfiles.splice(index, 1);

      },
      (err) => (this.error = err)
    );
  }
  deleteeditFile(index: number) {
    alert('Are you dalete')
    this.editfiles.splice(index, 1);
    // console.log(this.files)




    // this.bridgeService2.deleteexpenseimg(id).subscribe(
    //   (res) => {
    //     this.bridges2 = this.bridges2.filter(function (item) {
    //       return item['id'] && +item['id'] !== +id;


    //     });
    //     this.getExpense();

    //   },
    //   (err) => (this.error = err)
    // );
    this.ngOnInit();

  }





  prepareeditFilesList(editfiles: Array<any>) {
    for (const item of editfiles) {
      // item.progress = 0;
      this.editfiles.push(item);
      // console.log(this.files);

    }
    //this.files=files;


    // console.log(editfiles);
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
    // console.log(this.files)
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


    // console.log(files);

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
}
