import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { BridgeService } from '../modules/service/bridge.service';
import { Orders } from '../orders';
import { Bridge2, Follow, Expense, EditExpense } from '../bridge2';
import { Location } from '@angular/common';
import Chart from 'chart.js/auto';
import { Bridge } from '../bridge';
import { HttpClient } from '@angular/common/http';
import { HeadingServicesService } from '../modules/service/heading-services.service';
import { NotiferService } from '../modules/service/helpers/notifer.service';
declare var $: any;
@Component({
  selector: 'app-userlistdetails',
  templateUrl: './userlistdetails.component.html',
  styleUrls: ['./userlistdetails.component.scss']
})
export class UserlistdetailsComponent implements OnInit {
  @ViewChild('UserListComponent', { static: false }) UserListComponent!: ElementRef | any;
  role: any;
  dateObj = new Date();
  time = this.dateObj.toLocaleTimeString();
  month = this.dateObj.getUTCMonth() + 1; //months from 1-12
  day = this.dateObj.getUTCDate();
  year = this.dateObj.getUTCFullYear();
  months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  commonObj: any = { isContact: true, bpAddreassMerge: null,detailTab:'detail',activityTab: 'note' };
  newdate = this.year + '-' + this.month + '-' + this.day;
  expenseUser: Bridge[] = [];
  expenseEmployee: Expense[] = [];
  expenseEmployeeDetails: Expense[] = [];

  chatdate = this.months[this.month - 1] + ' ' + this.day + ', ' + this.year;
  chattime = this.time.slice(0, -6);
  chattime2 = this.time.slice(-2);


  Bridge2: Bridge[] = [];
  UserName: any;

  error = '';
  success = '';
  closeResult = '';
  idd: any;
  UserId = sessionStorage.getItem('UserId');
  SalesEmployeeCode:any;
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

  baseUrl2: any;
  typeOfExpense:any;

  isLoading2: boolean = false;
  Headingss: any[] = [];
  constructor(
    private bridgeService: BridgeService,
    private HeadingServices: HeadingServicesService,
    private _NotifierService: NotiferService,
    private route: Router,
    private router: ActivatedRoute,
    private modalService: NgbModal,
    private _location: Location,
    private http: HttpClient,
  ) {
    this.baseUrl2 = this.bridgeService.baseUrl2;
  }

  ngOnInit() {
    this.bridgeService.autoCall();
    this.typeOfExpense=this.bridgeService.TypeofExpense;
    this.getlead();
    this.Headingss = this.HeadingServices.getFirstModule();
    this.UserName = sessionStorage.getItem('UserName');
    this.UserId = sessionStorage.getItem('UserId');
    this.role = sessionStorage.getItem('role');
    this.SalesEmployeeCode = sessionStorage.getItem('SalesEmployeeCode');
    if (this.UserName == undefined) {
      this.route.navigate(['/login']);
    }



this.bridges.employeeId=this.UserId;
    // this.CharFunction();
    this.employeeExpense(this.UserId);
    this.getExpenseUser();
    this.userAnalytics();
    this.productsoldemp();
    this.employeeAnalytics();
    this.totaloutstanding();
  }

  reportingNAme:any = '';
  receiveData(data: string) {
    if(data == 'true'){
      this.ngOnInit();
    }
  }

  getId(id:any){
    this.UserListComponent.openEmployee22(id);
  }

  employeeExpense(idd:any) {
    // let empidd = this.router.snapshot.params.id;
    // console.log(empidd);
    this.bridgeService.getemployeeexpensedata(idd).subscribe(
      (data: Expense[]) => {
        this.isLoading2 = false;
        this.expenseEmployee = data;
      //  console.log('this.expenseEmployee', this.expenseEmployee);


      },
      (err) => {
        this.isLoading2 = false;
        console.log(err);
        this.error = err;
      }
    );

  }

  getExpenseUser(): void {
    this.bridgeService.getempall().subscribe(
      (data: Bridge[]) => {
        this.expenseUser = data;
        // this.getReportingName(data[0].reportingTo);
       // console.log('employee list', this.expenseUser);
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

  resetAlerts() {
    this.error = '';
    this.success = '';
  }
  addExpense(f: NgForm) {
    f = this.bridgeService.GlobaleTrimFunc(f);
    this.resetAlerts();
    for(let [keys,value] of Object.entries(f.value)){if(!!!f.value[keys]){
        f.value[keys] = "";
      }
    }
    if (f.valid) {

      // console.log(f);
      let totalAmount = Number(f.value.totalAmount);
      this.bridges.totalAmount = totalAmount;
      this.bridges.Attach = this.files;
     // console.log(this.bridges);


      this.bridgeService.addexpense(this.bridges).subscribe(
        (res: Expense) => {
        //  console.log(res);
          if (Object(res)['message'] == "successful" && Object(res)['status'] == 200)  {

            $(".success-box").show();
            this.modalService.dismissAll();
            setTimeout(() => {
              $(".success-box").fadeOut(1000);

            }, 2000);
            this.employeeExpense(this.UserId);
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
    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title', modalDialogClass: 'modal-dialog-centered payment-cards-modal' })
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }

  expenseEdit(content: any, item: EditExpense) {
    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title',  modalDialogClass: 'modal-dialog-centered payment-cards-modal' })
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
     // console.log(content,item);


    this.editgetexpenseone(item.id);
  }

  editgetexpenseone(item: any) {
    //console.log('item side',item);
    // if (item != null) {
    this.bridgeService.getOneexpensedata(item).subscribe(
      (data: EditExpense[]) => {
        this.editExpens = data;
      //  console.log('this.editExpens', this.editExpens);
        this.editExpense.id = this.editExpens[0].id;
        this.editExpense.remarks = this.editExpens[0].remarks;
        this.editExpense.trip_name = this.editExpens[0].trip_name;
        this.editExpense.type_of_expense = this.editExpens[0].type_of_expense;
        this.editExpense.expense_from = this.editExpens[0].expense_from;
        this.editExpense.expense_to = this.editExpens[0].expense_to;
        this.editExpense.employeeId = this.editExpens[0].employeeId[0].id;
        this.editExpense.totalAmount = this.editExpens[0].totalAmount;
        this.editfiles = this.editExpens[0].Attach;
      //  console.log(this.editExpense);




      },
      (err) => {
        console.log(err);
        this.error = err;
      }
    );
    // }

  }

  editExpenseform(fb: NgForm) {
    fb = this.bridgeService.GlobaleTrimFunc(fb);
    this.resetAlerts();
    for(let [keys,value] of Object.entries(fb.value)){
      if(!!!fb.value[keys]){
        fb.value[keys] = "";
      }
    }
    this.editExpense.Attach = this.editfiles;
   // console.log(this.editExpense);
   if(fb.valid){
    this.bridgeService.editexpense(this.editExpense).subscribe(
      (res: EditExpense) => {
        // this.bridges22.push(res)
        $(".edit-success-box").show();
        this.modalService.dismissAll();
        setTimeout(() => {
          $(".edit-success-box").fadeOut(1000);

        }, 2000);

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


  opendetail(content: any, expenseid: any) {
    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title', modalDialogClass: 'modal-dialog-centered payment-cards-modal' })
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
   // console.log(expenseid);
    this.expenseEmployeeDetails = this.expenseEmployee.filter((detailsarr: any) => { return detailsarr.id === expenseid });
   // console.log('this.expenseEmployeeDetails', this.expenseEmployeeDetails);
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
  getlead(): void {
    this.isLoading2 = true;
    this.idd = this.router.snapshot.params.id;
    //console.log(this.idd);
    this.bridgeService.getoneemployee(this.idd).subscribe(
      (data: Bridge[]) => {
        this.isLoading2 = false;
        this.Bridge2 = data;
        //console.log('user details data',this.Bridge2);

      },
      (err) => {
        this.isLoading2 = false;
        console.log(err);
        this.error = err;
      }
    );
  }
  nodata: boolean = false;

  // prepareFilesList(files: Array<any>) {
  // }


  // onFileDropped($event: any) {
  //   this.prepareFilesList($event);
  // }

  // /**
  //  * handle file from browsing
  //  */
  // fileBrowseHandler(files: any) {
  //   this.prepareFilesList(files.target.files);
  // }


  /* added by millan on 25-05-2022 */
  backClicked() {
    this._location.back();
  }
  /* added by millan on 25-05-2022 */

  // CharFunction() {

  // }

  fastload: boolean = false;
  analyticsData: any;
  Lead:any;
  Need:any;
  Quotation:any;
  Negotiation:any;
  Order:any;
  analyticsmonth:any[]=[];
  analyticsmonthsales:any[]=[];

  userAnalytics(){

    this.fastload = true;
    this.nodata = true;
    this.bridgeService.EmployeeMonthlySales(this.SalesEmployeeCode).subscribe(
      (data: any) => {
        this.analyticsData = data;


        if (data['data'].length > 0) {
          this.nodata = false;
        }

        for (let i = 0; i < this.analyticsData.data.length; i++) {

           this.analyticsmonth.push(this.analyticsData.data[i].Month.substring(0, 3));
          this.analyticsmonthsales.push(this.analyticsData.data[i].MonthlySales);
        }
        // console.log('this.analyticsmonth',this.analyticsmonth);
        // console.log('this.analyticsmonthsales---------',this.analyticsmonthsales);

        if (data['status'] == 200) {
          this.fastload = false;
        }

        var barChart2 = new Chart("barChart2", {
          type: 'bar',
          data: {
            labels: this.analyticsmonth,
            datasets: [
              {
                data: this.analyticsmonthsales,
                borderRadius: 15,
                barThickness: 12,
                borderSkipped: false,
                backgroundColor: [
                  '#6e38c4',
                ],
              },

            ]
          },
          options: {
            events: [],
            plugins: {
              legend: {
                display: false
              }
            },
            scales: {
              x: {
                beginAtZero: true,
                stacked: true,
                grid: {
                  display: false
                }
              },
              y: {
                beginAtZero: true,
                stacked: true,
                grid: {
                  display: false
                }
              },
            }
          }
        });
      });
    // this.http.post(this.baseUrl2 + '/employee/monthlySalesEmp', { "SalesEmployeeCode": this.SalesEmployeeCode }).toPromise().then((data: any) => {



    //   // this.lineChart.data.datasets = [{
    //   //   label: 'Stages',
    //   //   data: [this.Lead, this.Need, this.Quotation, this.Negotiation, this.Order],
    //   //   backgroundColor: '#95B5FF',
    //   //   borderColor: '#95B5FF',
    //   //   tension: 0.4,
    //   // }];
    //   // this.lineChart.update();
    //   // console.log(this.lineChart);


    // });


  }
  totalSale:any[]=[];
  employeeAnalytics(){
    this.bridgeService.employeeTotalSale(this.SalesEmployeeCode).subscribe(
      (data: any) => {
        this.totalSale = data.data[0].TotalSale;
        // console.log('-----------this.totalSale---------',this.totalSale);
      });
  }
  totalOutstanding:any[]=[];
  totaloutstanding(){
    this.bridgeService.employeeTotalOutstanding(this.SalesEmployeeCode).subscribe(
      (data: any) => {
        this.totalOutstanding = data.data[0].TotalOutstanding;
        // console.log('-----------totaloutstanding---------',this.totalOutstanding);
      });
  }
productSaleemp:any[]=[];
  productsoldemp(){
    this.bridgeService.ProsoldEmpl(this.SalesEmployeeCode).subscribe(
      (data: any) => {
        this.productSaleemp = data.data;
        if (data['data'].length > 0) {
          this.nodata = false;
        }

        if (data['status'] == 200) {
          this.fastload = false;
        }
      });
    // this.http.post(this.baseUrl2 + '/employee/proSoldEmp', { "SalesEmployeeCode": 120 }).toPromise().then((data: any) => {

    //   this.productSaleemp = data.data;
    //   console.log('------------------------------sau--------',this.productSaleemp);


    //   if (data['data'].length > 0) {
    //     this.nodata = false;
    //   }

    //   // for (let i = 0; i < this.analyticsData.data.length; i++) {
    //   //   // this.analyticsmonth =
    //   //    this.analyticsmonth.push(this.analyticsData.data[i].Month.substring(0, 3));
    //   //   this.analyticsmonthsales.push(this.analyticsData.data[i].MonthlySales);
    //   // };

    //   if (data['status'] == 200) {
    //     this.fastload = false;
    //   }
    // });
  }

  details() {
    this.showexpense = false;
    $(".activity").addClass("border-bb");
    $(".chatter").removeClass("border-bb");
    $(".expence-h").removeClass("border-bb");
    $(".activities").show();
    $(".chatters").hide();
    $(".expensec").hide();
    window.scrollTo(0, 600);

  }
  analytics() {
    this.showexpense = false;
    $(".activity").removeClass("border-bb");
    $(".chatter").addClass("border-bb");
    $(".expence-h").removeClass("border-bb");
    $(".activities").hide();
    $(".chatters").show();
    $(".expensec").hide();
    window.scrollTo(0, 600);

  }
  showexpense: boolean = false;
  expense() {
    this.showexpense = true;
    $(".activity").removeClass("border-bb");
    $(".chatter").removeClass("border-bb");
    $(".expence-h").addClass("border-bb");
    $(".activities").hide();
    $(".chatters").hide();
    $(".expensec").show();
    window.scrollTo(0, 600);
    this.employeeExpense(this.UserId);


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

    // console.log('file id', this.editExpense.id);
    // console.log(imageid);
    this.bridgeService.deleteexpenseimg(id, imageid).subscribe(
      (res) => {


        this.editfiles.splice(index, 1);

      },
      (err) => (this.error = err)
    );
  }
  deleteeditFile(index: number) {
    this._NotifierService.showError('Are you delete this file');
    this.editfiles.splice(index, 1);
   // console.log(this.files)


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
    // Array.from(this.files).splice(index, 1);
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
