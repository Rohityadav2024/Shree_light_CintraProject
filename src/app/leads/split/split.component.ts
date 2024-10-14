import { Component, OnInit, Input } from '@angular/core';
import * as XLSX from 'xlsx';
import { Router } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { HeadingServicesService } from '../../modules/service/heading-services.service';
import { NgForm } from '@angular/forms';
import { Bridge2, EditBridge2, Follow, AddFollow2, } from 'src/app/bridge2';
import { BridgeService } from 'src/app/modules/service/bridge.service';
import { Bridge } from 'src/app/bridge';
import { HttpClient } from '@angular/common/http';
import { NgbNavConfig } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
declare var $: any;

@Component({
  selector: 'app-split',
  templateUrl: './split.component.html',
  styleUrls: ['./split.component.css'],
  providers: [NgbNavConfig]
})
export class SplitComponent implements OnInit {


  data: [][] | undefined;

  savedModules: any[] = [];
  UserId = sessionStorage.getItem('UserId');
  UserName: any;
  role: any;
  reportingTo: any;
  searchText!: string;
  searchValue: string = '';
  closeResult = '';

  nodata: boolean = false;
  isLoading: boolean = false;
  error = '';
  success = '';


  dateObj = new Date();
  time = this.dateObj.toLocaleTimeString();
  month2 = this.dateObj.getMonth() + 1;
  month = (this.month2 < 10 ? '0' : '') + this.month2;
  day = (this.dateObj.getDate() < 10 ? '0' : '') + this.dateObj.getDate();
  year = this.dateObj.getUTCFullYear();
  //  months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  newdate = this.day + "-" + this.month + "-" + this.year;

  inputElementTime = ("0" + this.dateObj.getHours()).slice(-2) + ":" + ("0" + this.dateObj.getMinutes()).slice(-2);

  getValues(obj: {}) {
    return Object.values(obj)
  }
  newdatetime = this.newdate + " " + this.time;
  bridgess: Bridge[] = [];
  bridges2: Bridge2[] | any[] = [];
  bridgesdetails: Bridge2[] = [];
  //bridgesdetails: any;

  public tereer: any[] = [];

  bridges: Bridge2 = {
    date: this.newdate, location: '', companyName: '', source: '', contactPerson: '',
    phoneNumber: '', message: '', email: '', productInterest: '',
    assignedTo: this.UserId, timestamp: this.newdatetime, employeeId: this.UserId, numOfEmployee: '0', turnover: '', designation: '', status: 'New', leadType: '', Attach: '', Caption: '',
  };
  bridges22: EditBridge2[] = [];
  editbridges: EditBridge2 = {
    date: '', location: '', companyName: '', source: '', contactPerson: '',
    phoneNumber: '', message: '', email: '', productInterest: '',
    assignedTo: '', timestamp: '', employeeId: '', id: '', numOfEmployee: '0', turnover: '', designation: '', status: '', leadType: '', Attach: '', Caption: '',
  };
  Follow: Follow[] = [];

  AddFollow2s: AddFollow2[] = [];
  AddFollow2: AddFollow2 = { "Subject": "", "Mode": "", "Comment": "", "CreateDate": this.newdate, "CreateTime": this.time, "Emp": '', "Emp_Name": "", "From": this.newdate, "SourceID": "82", "SourceType": "", "Time": this.inputElementTime, "Type": "Followup", "leadType": '' };

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
  dropdownLead: any[] = [];
  dropdowncategory: any[] = [];
  AssigneddropdownList: any[] = [];
  sourcedropdownList: any[] = [];//for status
  baseUrl2: any;

  source1: any;

  public selectedValue: any;
  public searchAssignValue: any;
  selectedName: any;
  findassaignName: any;
  lead_id: any;
  selectedDate: any[] = [];
  startind = 1;
  endind = 1;
  totalCount:any;
  order_by_field:any = 'id';
  order_by_value:any = 'desc';

  pagination: any = {
    PageNo: 1,
    maxItem: '10',
    PageShow:10
  }
  filterLead: any = {};
  fileattachList: any[] = [];
  commonObj: any = { activeUserId: null }
  Weekdate: any;
  monthlydate: any;
  yearlydate: any;
  ModeOfCommunication: any;
  leadStatus: any;
  filterleadstatus = new Array;
  Headingss: any[] = [];
  constructor(private router: Router, public datepipe: DatePipe, private bridgeService2: BridgeService, private http: HttpClient, configtab: NgbNavConfig, private modalService: NgbModal,private HeadingServices: HeadingServicesService) {
    this.baseUrl2 = this.bridgeService2.baseUrl2;

    // customize default values of navs used by this component tree
    configtab.destroyOnHide = false;
    configtab.roles = false;
  }



  ngOnInit(): void {
    if (!this.HeadingServices.isModuleView(1)) {
      this.router.navigate(['/dashboard']);
    }
    this.ModeOfCommunication = this.bridgeService2.ModeOfCommunication;
    this.leadStatus = this.bridgeService2.leadStatus;
    this.UserName = sessionStorage.getItem('UserName');
    this.UserId = sessionStorage.getItem('UserId');
    this.Headingss = this.HeadingServices.getModule2();
    this.role = sessionStorage.getItem('role');
    // this.tereer = this.bridgess;
    this.reportingTo = sessionStorage.getItem('reportingTo');
    if (this.UserName == undefined) {
      this.router.navigate(['/login']);
    }

    this.getAllSource();
    this.getBridge();
    this.getBridge2();

    $(document).mouseup(function (e: { target: any; }) {
      var popup = $(".hover-show");
      if (!$('.edit-delete').is(e.target) && !popup.is(e.target) && popup.has(e.target).length == 0) {
        popup.hide();
      }
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
    this.getLeadAll();

    const savedModulesString = sessionStorage.getItem('savedModules');
    if (savedModulesString) {
      this.savedModules = JSON.parse(savedModulesString);
    }

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

  resetfilter() {
    this.filterLead = {}
    this.RowPerPage();

  }
  RowPerPage() {
    this.pagination.PageNo = 1;
    this.reload();
  }
  reload() {
      this.getBridge2();
  }
  allLeads() {
    this.getBridge2();
  }
  // filter close


  resetAlerts() {
    this.error = '';
    this.success = '';
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
          if (Object(res)['status'] == "200") {
            // Update the list of cars
            // this.bridges2.push(res)
            // Inform the user
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
          }
          // Reset the form
        },
        (err) => {
          const delim = ":"
          const name = err.message
          const result = name.split(delim).slice(3).join(delim)
          alert(result);
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

  lead_Type: any;
  filterLeadPriority = new Array;
  getLeadAll(): void {
    this.bridgeService2.getLeadTypedata().subscribe(
      (data: any[]) => {
        this.lead_Type = data;
        for (let i = 0; i < this.lead_Type.length; i++) {
          this.filterLeadPriority.push({ item_text: this.lead_Type[i].Name })
        }
        // console.log(this.source1)
        this.dropdownLead = this.filterLeadPriority

      },
      (err) => {
        console.log(err);
        this.error = err;
      }
    );
  }

  getAllSource(): void {
    let sourcetmp: any[] = [];
    this.bridgeService2.getAllSourcedata().subscribe(
      (data: any[]) => {
        this.source1 = data;
        for (let i = 0; i < data.length; i++) {
          sourcetmp.push({ item_id: i, item_text: data[i].Name });
        }
        this.sourcedropdownList = sourcetmp;


      },
      (err) => {
        console.log(err);
        this.error = err;
      }
    );
  }
  pagenumber: number = 1;
  leadCount: any;
  nodetaildata:boolean = false;
  firstleaddata=10;
  emptySeach(){
    this.searchValue = '';
    this.RowPerPage();
  }
  getBridge2(): void {
    this.isLoading = true;
    // console.log(this.filterLead)
    this.bridgeService2.getLeadByPagination(this.pagination,this.searchValue,this.filterLead,this.order_by_field,this.order_by_value,'lead').subscribe(
      (data: any) => {
        if (data.status == "200") {
        this.bridges2 = data.data;
        if(this.commonObj.activeUserId == null){
        this.commonObj.activeUserId = data.data[0].id;
        }
        if (data.data.length == 0) {
          this.nodetaildata = true;
        } else {
          this.bridgesdetails = Array(data.data[0]);
          this.nodetaildata = false;
        }
        this.bridgeService2.leadgetlist(this.commonObj.activeUserId).subscribe((data: any) => {
          this.fileattachList = data;
          // console.log(this.fileattachList);
        });
        this.bridgeService2.getFollowLeaddata(this.commonObj.activeUserId).subscribe(
          (data: Follow[]) => {
            this.isLoading = false;
            this.Follow = data;

            if (this.Follow.length <= 0) {
              this.nodata = true;

            } else {
              this.nodata = false;
            }

          },
          (err) => {
            this.isLoading = false;
            console.log(err);
            this.error = err;
          }
        );
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
        this.nodetaildata = true;
        this.startind = this.totalCount;
      }
    }

    else {
      alert(data.message);
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
        alert(result);
      }
    );

  }


  onFileDropped($event: any) {
    this.prepareFilesList($event);
  }
  fileBrowseHandler(files: any) {
    this.prepareFilesList(files.target.files);
  }

  /**
   * Delete file from files list
   * @param index (File index)
   */
  deleteFile(index: number) {
    this.files.splice(index, 1);
  }


 prepareFilesList(files: Array<any>) {

   let attachmentUserID = Number(this.UserId);


   // for (const item of files) {
   //   item.progress = 0;
   //   this.files.push(item);
   // }

   this.bridgeService2.leadAttach(this.commonObj.activeUserId, attachmentUserID, this.newdate, this.time, files).subscribe((data: any) => {
     if (Object(data)['status'] == "200") {

       alert(Object(data)['message'])
       this.ngOnInit();
       // $(".success-box2").show();


     }
     else {
       alert(Object(data)['message']);
     }
   });

   // this.uploadFilesSimulator(0);
 }


  onScroll(): void {
    if(this.totalCount > Number(this.pagination.maxItem)){
      this.pagination.maxItem = String(Number(this.pagination.maxItem)+10);
      this.getBridge2();
    }
  }
  openEdit(contentEdit: any, item: Bridge2) {

    this.modalService.open(contentEdit, { ariaLabelledBy: 'modal-basic-title', modalDialogClass: 'modal-dialog-centered order-cards-modal' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });

    this.editbridges.id = String(item.id);
    this.editbridges.date = item.date;
    this.editbridges.companyName = item.companyName;
    this.editbridges.source = item.source;
    //console.log(this.editbridges.source);
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
    // console.log(this.editbridges.employeeId);
  }

  editLeads(fb: NgForm) {
    fb = this.bridgeService2.GlobaleTrimFunc(fb);
    this.resetAlerts();
    for (let [keys, value] of Object.entries(fb.value)) {
      if (!!!fb.value[keys]) {
        fb.value[keys] = "";
      }
    }
    if (fb.valid) {
      this.isLoading = true;
      this.bridgeService2.editleads(this.editbridges).subscribe(
        (res: EditBridge2) => {
          if (Object(res)['status'] == "200") {
            // this.bridges22.push(res)
            $(".edit-success-box").show();
            this.isLoading = false;
            this.modalService.dismissAll();
            setTimeout(() => {
              $(".edit-success-box").fadeOut(1000);
              this.getBridge2();
            }, 2000);
          }
          else {
            alert(Object(res)['message']);
            this.isLoading = false;
          }



        },
        (err) => {
          this.modalService.dismissAll();
          const delim = ":"
          const name = err.message
          const result = name.split(delim).slice(3).join(delim)
          alert(result);
          this.getBridge2();
          this.isLoading = false;
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
    $('.hover-show' + item.id).toggle()
  }

  addNotes(contentEdit: any) {

    this.modalService.open(contentEdit, { ariaLabelledBy: 'modal-basic-title', modalDialogClass: 'modal-dialog-centered order-cards-modal' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });


  }


  deleteid: number = 0;
  deleteLeads(id: number) {

    $('.delete-success-box').show();
    $('.hover-show').hide();
    this.deleteid = id;

    setTimeout(() => {
      $('.delete-success-box').fadeOut();
    }, 50000);


  }



  yesdeleteUser(status: number) {
    if (status == 1) {
      let id = [this.deleteid];
      this.resetAlerts();
      // this.isLoading2 = true;
      this.bridgeService2.junkleads(id, 1).subscribe(
        (res) => {
          this.bridges2 = this.bridges2.filter(function (item) {
            return item['id'] && +item['id'] !== +id;
          });
          this.ngOnInit();
        },
        (err) => (this.error = err)
      );
      this.ngOnInit();
      $('.delete-success-box').hide();
    } else {
      // this.modalService.dismissAll();
      this.ngOnInit();
      $('.delete-success-box').hide();
    }
  }
  // delete lead close

  leaddetailsopen(id: number | any) {
    this.isLoading = true;
    this.commonObj.activeUserId = id;
    this.bridgeService2.getOneLeaddata(id).subscribe(
      (data: Bridge2[]) => {
        this.isLoading = false;
        this.bridgesdetails = data;
      },
      (err) => {
        this.isLoading = false;
        console.log(err);
        this.error = err;
      }
    );
    // get attachment list
    this.bridgeService2.leadgetlist(id).subscribe((data: any) => {
      this.fileattachList = data;
      // console.log(this.fileattachList);
    });

    // get attachment list
    this.bridgeService2.getFollowLeaddata(id).subscribe(
      (data: Follow[]) => {
        this.isLoading = false;
        this.Follow = data;

        if (this.Follow.length <= 0) {
          this.nodata = true;

        } else {
          this.nodata = false;
        }

      },
      (err) => {
        this.isLoading = false;
        console.log(err);
        this.error = err;
      }
    );
  }





  getBridge(): void {
    let tmp: any[] = [];
    this.bridgeService2.getAll().subscribe(
      (data: Bridge[]) => {
        this.bridgess = data;
        // console.log(this.bridgess);
        this.tereer = this.bridgess;
        for (let i = 0; i < this.bridgess.length; i++) {
          tmp.push({ item_id: i, item_text: data[i].firstName });
          if (this.bridgess[i]['SalesEmployeeCode'] == '-1') {
            this.bridgess.splice(i, 1);
          }
          if (this.bridgess[i]['SalesEmployeeCode'] == '') {
            this.bridgess.splice(i, 1);
          }
        }
        this.AssigneddropdownList = tmp;
        if (this.bridgess.length == 0) {
          this.nodata = true;
        }
        else {
          this.nodata = false;
        }
        // console.log(this.bridgess);

      },
      (err) => {
        console.log(err);
        this.error = err;
      }
    );
  }



  filterDropdown(e: any) {

    let searchString = e.target.value;
    this.tereer = this.bridgess;
    this.tereer = this.bridgess.filter(
      (user: any) => {
        return user.SalesEmployeeName.toLocaleLowerCase().includes(searchString.toLocaleLowerCase())

      }
    );
  }

  selectValue(name: any) {
    this.selectedValue = name;

    this.findassaignName = this.bridgess.find((obj: any) => obj.id === name);
    this.selectedName = this.findassaignName.SalesEmployeeName

  }

  AssignTo(contentEdit: any, item: Bridge2) {

    this.modalService.open(contentEdit, { ariaLabelledBy: 'modal-basic-title', modalDialogClass: 'modal-dialog-centered order-cards-modal' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
    this.lead_id = [item.id];
    this.selectedValue = item.assignedTo.SalesEmployeeCode;
    this.selectedName = item.assignedTo.SalesEmployeeName;
    // console.log(this.lead_id);
    // var mutdelete = new Array();
    // this.lead_id.push(item.id);
    // console.log(this.lead_id);
  }

  Assign_() {
    if (confirm('Are You Sure Do You Want To Assign Lead')) {



      this.bridgeService2.leadAssign(this.lead_id, this.selectedValue).subscribe(
        (res: any) => {
          if (Object(res)['status'] == "200") {

            this.ngOnInit();
            this.modalService.dismissAll();
          }
          else {
            alert(Object(res)['message']);
          }
          // Reset the form
        },
        (err) => {
          const delim = ":"
          const name = err.message
          const result = name.split(delim).slice(3).join(delim)
          alert(result);
          //  this.ngOnInit();
        }
      );

      // this.http.post(this.baseUrl2 + '/lead/assign', { id: this.lead_id, employeeId: this.selectedValue }).toPromise().then((data: any) => { });
      // this.ngOnInit();
      // this.modalService.dismissAll();
    }
  }
  // Assign to modal close

  //  add follow  up start

  openfollowup(followup: any) {
    this.modalService.open(followup, { ariaLabelledBy: 'modal-basic-title', modalDialogClass: 'modal-dialog-centered order-cards-modal' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
    this.AddFollow2.Mode = '';
    this.AddFollow2.Comment = '';
    this.AddFollow2.Time=this.bridgeService2.getCurrentTime();
    this.AddFollow2.Subject = this.bridgesdetails[0].companyName;
    this.AddFollow2.SourceID = String(this.bridgesdetails[0].id);

    this.AddFollow2.Emp = String(this.UserId);
    this.AddFollow2.Emp_Name = this.UserName;
    this.AddFollow2.SourceType = 'Lead';
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
      this.AddFollow2.Emp = Number(this.AddFollow2.Emp);
      // console.log(this.AddFollow2.Time);
      const timeString = this.AddFollow2.Time;

      // Prepend any date. Use your birthday.
      const timeString12hr = new Date('1970-01-01T' + timeString + 'Z')
        .toLocaleTimeString('en-US',
          { timeZone: 'UTC', hour12: true, hour: 'numeric', minute: 'numeric' }
        );
      var newdt = `${timeString12hr}`
      this.AddFollow2.Time = newdt;


      this.bridgeService2.storeleadfollow2(this.AddFollow2).subscribe(
        (res: AddFollow2) => {
          if (Object(res)['status'] == "200") {
            // Update the list of cars
            this.AddFollow2s.push(res)
            // Inform the user
            // alert('Follow Up Added Successfully')
            $(".success-box2").show();
            this.modalService.dismissAll();
            setTimeout(() => {
              $(".success-box2").fadeOut(1000);
              let currentUrl = this.router.url;
              this.router.routeReuseStrategy.shouldReuseRoute = () => false;
              this.getBridge2();
              // this.router.onSameUrlNavigation = 'reload';
              this.router.navigate([currentUrl]);
            }, 2000);
          }
          else {
            alert(Object(res)['message']);
          }
          // Reset the form
        },
        (err) => {
          const delim = ":"
          const name = err.message
          const result = name.split(delim).slice(3).join(delim)
          alert(result);
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

  // add follow up close


  //  add feedback start

  openfeedback(followup: any) {
    this.modalService.open(followup, { ariaLabelledBy: 'modal-basic-title', modalDialogClass: 'modal-dialog-centered order-cards-modal' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
    // console.log(this.bridgesdetails)
    // console.log(this.bridgesdetails[0].id);
    // console.log(this.bridgesdetails[0].companyName);
    this.AddFollow2.Subject = this.bridgesdetails[0].companyName;
    this.AddFollow2.SourceID = String(this.bridgesdetails[0].id);

    this.AddFollow2.Emp = String(this.UserId);
    this.AddFollow2.Emp_Name = this.UserName;
    this.AddFollow2.SourceType = 'Lead';
  }


  addFeedback(fb: NgForm) {
    fb = this.bridgeService2.GlobaleTrimFunc(fb);
    this.resetAlerts();

    if (fb.valid) {
      this.AddFollow2.Emp = Number(this.AddFollow2.Emp);
      // console.log(this.AddFollow2.Time);
      const timeString = this.AddFollow2.Time;

      // Prepend any date. Use your birthday.
      const timeString12hr = new Date('1970-01-01T' + timeString + 'Z')
        .toLocaleTimeString('en-US',
          { timeZone: 'UTC', hour12: true, hour: 'numeric', minute: 'numeric' }
        );
      var newdt = `${timeString12hr}`
      this.AddFollow2.Time = newdt;



    }
    else {
      for (let i = 0; i < Object.keys(fb.value).length; i++) {
        var keyys = Object.keys(fb.value)[i];
        if (fb.value[keyys].length == 0) {

          if ($("input[name=" + keyys + "]").hasClass('required-fld')) {
            $("input[name=" + keyys + "]").addClass("red-line-border");
            $("input[name=" + keyys + "]").focus();
          }
          if ($("select[name=" + keyys + "]").hasClass('required-fld')) {
            $("select[name=" + keyys + "]").addClass("red-line-border");
            $("select[name=" + keyys + "]").focus();
          }
          if ($("password[name=" + keyys + "]").hasClass('required-fld')) {
            $("password[name=" + keyys + "]").addClass("red-line-border");
            $("password[name=" + keyys + "]").focus();
          }
          if ($("textarea[name=" + keyys + "]").hasClass('required-fld')) {
            $("textarea[name=" + keyys + "]").addClass("red-line-border");
            $("textarea[name=" + keyys + "]").focus();
          }

        }

        else {
          $("input[name=" + keyys + "]").removeClass("red-line-border");
          $("select[name=" + keyys + "]").removeClass("red-line-border");
          $("password[name=" + keyys + "]").removeClass("red-line-border");
          $("textarea[name=" + keyys + "]").removeClass("red-line-border");
        }
      }
    }

  }

  sortedColumn: string = '';
  sortsend: boolean | undefined;

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
              "timestamp": this.newdatetime,
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
            alert('Data Imported Successfully');
            // this.isLoading = false;
            this.ngOnInit();
          }
          else {
            //  this.isLoading = false;
            alert(Object(res)['message']);
          }
          });


      }
    };

    // this.isLoading = false;
    reader.readAsBinaryString(target.files[0]);
  }

  togglesortType(key: any) {
    this.sortsend = !this.sortsend;
    this.sortedColumn = key + String(this.sortsend);
    // alert(this.sortedColumn);
  }

  mouseEnterMessage(item: Bridge2) {
    $('.messageContainer' + item.id).toggle();
    this.LeadFoolwup = this.bridges2.filter((itemid: any) => itemid.id === item.id);
    this.LeadFoolwupdata = this.LeadFoolwup[0].message
    // this.LeadFoolwup=this.bridgess.filter((itemid:any)=>itemid.id===item.id);
    // console.log('------------1--------',this.LeadFoolwup);


    this.editbridges.id = String(item.id);
    this.editbridges.date = item.date;
    this.editbridges.companyName = item.companyName;
    this.editbridges.source = item.source;
    //console.log(this.editbridges.source);
    this.editbridges.email = item.email;
    this.editbridges.location = item.location;
    this.editbridges.contactPerson = item.contactPerson;
    this.editbridges.phoneNumber = item.phoneNumber;
    // this.editbridges.message = item.message;
    this.editbridges.message = '';
    this.editbridges.productInterest = item.productInterest;
    this.editbridges.assignedTo = Object.values(item.assignedTo)[0];
    this.editbridges.employeeId = item.employeeId.id;
    this.editbridges.timestamp = item.timestamp;
    this.editbridges.status = item.status;
    this.editbridges.leadType = item.leadType;
    this.editbridges.designation = item.designation;
    this.editbridges.turnover = item.turnover;
    this.editbridges.numOfEmployee = item.numOfEmployee;
    // console.log('------2-------',this.editbridges);


  }

  hidetextbox(event: any) {
    $('.messageContainer' + event).hide();
  }


  files: any[] = [];

  // fileattachment list

  deleteattachment(id: any) {

    var lead_id = this.commonObj.activeUserId;
    // console.log('id',id);
    // console.log('lead_id',lead_id);

    if (confirm("Are You Sure Do You Want To Delete File")) {
      this.bridgeService2.deleteattach(id, lead_id).subscribe((data: any) => {

        if (Object(data)['status'] == "200") {

          alert(Object(data)['message'])
          this.ngOnInit();
        }
        else {
          alert(Object(data)['message']);
        }
      });
    }
    else {

    }

  }
  LeadFoolwup: any[] = [];
  LeadFoolwupdata: any;
  mouseLeaveMessage1(item: any) {
    $('.messageContainer1' + item.id).hide();
  }
  mouseEnterMessage1(item: any) {
    $('.messageContainer1' + item.id).show();
    this.LeadFoolwup = this.bridges2.filter((itemid: any) => itemid.id === item.id);
    this.LeadFoolwupdata = this.LeadFoolwup[0].message
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
      //  
 // console.log(key,hasEditPermission)
      return hasEditPermission;
  }
  return false;
}

}
