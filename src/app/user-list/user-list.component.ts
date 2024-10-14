import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { Bridge, EditBridge } from '../bridge';
import * as XLSX from 'xlsx'
import { BridgeService } from '../modules/service/bridge.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { HeadingServicesService } from '../modules/service/heading-services.service';
import { NotiferService } from '../modules/service/helpers/notifer.service';
declare var $: any;
@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
})
export class UserListComponent implements OnInit {
  @Output() dataEvent = new EventEmitter<string>();
  @ViewChild('contentEdit')contentEdit!:ElementRef;
  baseUrl2: any;
  p: number = 1;
  nodata: boolean = false;
  sortedColumn: string = '';
  sortsend: boolean = false;
  bridges: Bridge[] = [];


  bridge: Bridge = {
    companyID: '1',
    userName: '',
    password: '',
    firstName: '',
    middleName: '',
    lastName: '',
    Email: '',
    Mobile: '',
    role: '',
    app_id: "2",
    departement:'2',
    zone:'',
    SalesEmployeeCode: '',
    SalesEmployeeName: '',
    EmployeeID: '',
    position: '',
    branch: '1',
    Active: 'tYES',
    passwordUpdatedOn: '',
    lastLoginOn: '',
    reportingTo: '',
    timestamp: this.HeadingServices.getDateTime(),
  };

  bridge2: EditBridge = {
    companyID: '',
    userName: '',
    password: '',
    firstName: '',
    middleName: '',
    lastName: '',
    Email: '',
    Mobile: '',
    role: '',
    departement:'2',
    zone:'',
    SalesEmployeeCode: '',
    SalesEmployeeName: '',
    EmployeeID: '',
    position: '',
    branch: '',
    Active: '',
    passwordUpdatedOn: '',
    lastLoginOn: '',
    reportingTo: '',
    timestamp: '',
    id: 0,
  };

  resetPass:any = {
    id:'',
    password:''
  }

  searchValue: string = '';
  fieldTextType: boolean | undefined;
  error = '';
  success = '';
  closeResult = '';
  UserName: any;
  role: any;
  isLoading: boolean = false;
  isLoading2: boolean = false;
  isLoading3: boolean = false;
  pagelimit: any = 10;
  commonObj : any={exportLoading:false}
  CurrentPage:any = 1;
  pagination: any = {
    PageNo: 1,
    maxItem: '10',
    PageShow:10
  }

  order_by_field:any = 'id';
  order_by_value:any = 'desc';
  filterusersrole:any= '';
  filteruserposition:any= '';
  filteruserreporting:any= '';
  startind = 1;
  endind = 1;
  Role: any;
  defaultrole: any;
  searchname: any;
  paginationnum: any;
  getFilterData: any;
  totalCount:any;
  filterlist: any[] = [];
  Headingss: any[] = [];
  urlcheck: any;
  UserRole:any;
  UserZone:any;
  UserStatus:any;
  paginationOption:any;
  isView:boolean = false;
  rolefilter:any;
  exportStatus: boolean = false;
  constructor(
    private bridgeService: BridgeService,
    private HeadingServices: HeadingServicesService,
    private _NotifierService: NotiferService,
    private modalService: NgbModal,
    private route: Router,
    private http: HttpClient,
  ) {
    this.baseUrl2 = this.bridgeService.baseUrl2;
  }

  ngOnInit() {
    this.UserStatus=this.bridgeService.userStatus
    this.paginationOption=this.bridgeService.paginationOption
    this.checkExportStatus();
    this.bridgeService.autoCall();
    this.UserName = sessionStorage.getItem('UserName');
    this.role = sessionStorage.getItem('role');
    if (this.UserName == undefined) {
      this.route.navigate(['/login']);
    }
    if (this.role != 'admin') {
      this.route.navigate(['/dashboard']);
    }
    this.Headingss = this.HeadingServices.getFirstModule();
    // console.log(this.Headingss)
    this.getBridge();

      this.bridgeService.getRoleMasterByDepartmentPagination({PageNo: 1,maxItem: 'All'},'','id','asc').subscribe(
        (data: any) => {
          this.UserRole = data.data;
          for (let i = 0; i < this.UserRole.length; i++) {
            if (this.UserRole[i]['Name'] == 'Admin') {
              this.UserRole.splice(i, 1);
            }
          }
        },
        (err) => {
          console.log(err);
          this.error = err;
        }
      );
      this.bridgeService.getZoneMasterPagination({PageNo: 1,maxItem: 'All'},'','id','asc').subscribe(
        (data: any) => {
          this.UserZone = data.data;
        },
        (err) => {
          console.log(err);
          this.error = err;
        }
      );

      this.bridgeService.getEmployeeForDropDown({PageNo: 1,maxItem: 'All'},'','id','asc').subscribe(
      (data: any) => {
        this.rolefilter = data.data;

      },
      (err) => {
        console.log(err);
        this.error = err;
      }
    );
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
  }

  openEmployee22(id:any){
    this.openEdit(this.contentEdit,[id],false);
  }
  changeRole(eve:any){
    if(eve.target.value == 2){
      this.bridge.zone = [1,2,3,4];
      this.bridge2.zone = [1,2,3,4];
    }
    else{
      this.bridge.zone = '';
      this.bridge2.zone = '';
    }
  }

  count = new Array();
  selectAll1() {
    let num = (document.getElementById("selectAll1") as HTMLInputElement);
    if (num.checked) {
      this.count = [];
      for (let i = 0; i < this.bridges.length; i++) {
        this.count.push(this.bridges[i].id);
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
      this.setNew();
      this.getBridge();
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
    this.filterusersrole = '';
    this.filteruserposition = '';
    this.filteruserreporting = '';
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

  setPrevious(){
    var filterdata:any[] = this.bridgeService.getAllFilter('customer');
    if(filterdata != undefined){
    this.pagination = filterdata[0];
    this.searchValue = filterdata[1];
    this.filterusersrole = filterdata[2];
    this.filteruserposition = filterdata[3];
    this.order_by_field = filterdata[4];
    this.order_by_value = filterdata[5];
    }
  }
  setNew(){
    this.bridgeService.setAllFilter('customer',[this.pagination,this.searchValue,this.filterusersrole,this.filteruserposition,this.order_by_field,this.order_by_value]);
  }
  getBridge(): void {
    this.isLoading2 = true;
    this.setPrevious();
    this.bridgeService.getEmployeeByPagination(this.pagination,this.searchValue,this.filterusersrole,this.filteruserposition,this.order_by_field,this.order_by_value,this.filteruserreporting).subscribe(
      (data: any) => {
        if (data.status == "200") {
        this.bridges = data.data;
        this.totalCount = data.meta.count;
        this.CurrentPage = this.pagination.PageNo;
        this.isLoading2 = false;
        for (let i = 0; i < this.bridges.length; i++) {
          if (this.bridges[i]['SalesEmployeeCode'] == '-1') {
            this.bridges.splice(i, 1);
          }
          if (this.bridges[i]['SalesEmployeeCode'] == '') {
            this.bridges.splice(i, 1);
          }
        }
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
  suplier(evt: any) {
    this.route.navigateByUrl('/employees/employees-details/' + evt);
  }
  addUser(f: NgForm) {
    f = this.bridgeService.GlobaleTrimFunc(f);
    for(let [keys,value] of Object.entries(f.value)){
      if(!!!f.value[keys]){
        f.value[keys] = "";
      }
    }
    if (f.valid) {
      this.bridge.SalesEmployeeName = this.bridge.firstName;
      this.bridge.userName = this.bridge.Email;
      this.isLoading = true;
      this.bridgeService.storeuser(this.bridge).subscribe(
        (res: Bridge) => {
          if (Object(res)['status'] == "200") {
            // this.bridges.push(res);
           // console.log(res)
            this.isLoading = false;
            // $('.success-box').show();
            this._NotifierService.showSuccess(this.Headingss[0].leftheading+" "+this.Headingss[0].heading103+" "+this.Headingss[0].heading106);
            this.modalService.dismissAll();
            // $('.success-box').fadeOut(1000);
            setTimeout(() => {
              let currentUrl = this.route.url;
              this.route.routeReuseStrategy.shouldReuseRoute = () => false;
              this.route.onSameUrlNavigation = 'reload';
              this.route.navigate([currentUrl]);
            }, 2000);
          }
          else {
        this._NotifierService.showError(Object(res)['message']);
            this.isLoading = false;
          }
        },
        (err) => {
          this.isLoading = false;
          const delim = ':';
          const name = err.message;
          const result = name.split(delim).slice(3).join(delim);

        this._NotifierService.showError(result);
          // this.modalService.dismissAll();
          // this.ngOnInit();
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

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  openEdit(contentEdit: any, item: any,isView:boolean) {
    // console.log(typeof(item))
    // console.log(Number(item[0]))
      this.isView = isView;
    this.bridgeService.getoneemployee(item[0]).subscribe(
      (data: any) => {
        this.bridge2 = data[0];
         for (let i = 0; i < this.rolefilter.length; i++) {
          if (this.rolefilter[i]['SalesEmployeeCode'] == this.bridge2.SalesEmployeeCode) {
            this.rolefilter.splice(i, 1);
          }
        }
        this.modalService
        .open(contentEdit, { ariaLabelledBy: 'modal-basic-title', modalDialogClass: 'modal-dialog-centered order-cards-modal' })
        .result.then(
          (result) => {
            this.closeResult = `Closed with: ${result}`;
          },
          (reason) => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
          }
        );
      },
      (err) => {
        console.log(err);
        this.error = err;
      }
    );

    // this.bridge2 = Object(item);
    // this.bridge2.id = Number(item.id);

  }

  editUser(fb: NgForm) {

    fb = this.bridgeService.GlobaleTrimFunc(fb);
    for(let [keys,value] of Object.entries(fb.value)){
      if(!!!fb.value[keys]){
        fb.value[keys] = "";
      }
    }
    // console.log(fb)
    this.bridge2.SalesEmployeeName = this.bridge2.firstName;
    this.bridge.userName = this.bridge.Email;
    if(fb.valid){
      this.isLoading3 = true;
    this.bridgeService.edituser(this.bridge2).subscribe(
      (res: EditBridge) => {
        if (Object(res)['status'] == "200") {
        this.isLoading3 = false;
        this._NotifierService.showSuccess(this.Headingss[0].leftheading+" "+this.Headingss[0].heading104+" "+this.Headingss[0].heading106);
        this.dataEvent.emit('true');
        this.modalService.dismissAll();
        setTimeout(() => {
          // $('.edit-success-box').fadeOut(1000);
          let currentUrl = this.route.url;
          this.route.routeReuseStrategy.shouldReuseRoute = () => false;
          this.route.onSameUrlNavigation = 'reload';
          this.route.navigate([currentUrl]);
        }, 2000);
      }

      else {
        this._NotifierService.showError(Object(res)['message']);
        this.isLoading3 = false;
      }
      },
      (err) => {
        this.isLoading3 = false;
        const delim = ':';
        const name = err.message;
        const result = name.split(delim).slice(3).join(delim);

        this._NotifierService.showError(result);
        // this.modalService.dismissAll();
        // this.ngOnInit();
        // let currentUrl = this.route.url;
        // this.route.routeReuseStrategy.shouldReuseRoute = () => false;
        // this.route.onSameUrlNavigation = 'reload';
        // this.route.navigate([currentUrl]);
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

  openPass(contentchangepassword: any, id: any) {
    this.modalService
      .open(contentchangepassword, { ariaLabelledBy: 'modal-basic-title', modalDialogClass: 'modal-dialog-centered order-cards-modal' })
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
    // item.edit_id =
    this.resetPass.id = id;
  }

  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }

  editdeletepop(item: any) {
    $('.hover-show').hide();
    $('.hover-show' + item.id).show();
  }


  gen() {
    let num = (document.getElementById('checkfld') as HTMLInputElement);
    if (num.checked) {
      let rand = Math.random().toString(36).substr(2, 8);
      this.resetPass.password = rand;
    }
  }

  changepass(fb: NgForm) {
    fb = this.bridgeService.GlobaleTrimFunc(fb);
    this.isLoading = true;
    this.bridgeService.resetUserPassword(this.resetPass).subscribe(
      (res: EditBridge) => {
        if (Object(res)['status'] == '200') {
          this.isLoading = false;
          this._NotifierService.showSuccess('Reset Password Succesfully');
          this.modalService.dismissAll();
          this.RowPerPage();
        } else {
          this.isLoading = false;
          this._NotifierService.showError(Object(res)['message'])
        }
      },
      (err) => {
        this.isLoading = false;
        const delim = ':';
        const name = err.message;
        const result = name.split(delim).slice(3).join(delim);
        this._NotifierService.showError(result)
      }
    );
  }


  // confirmModal2Modal: BsModalRef = new BsModalRef();
  deleteid: number = 0;
  deleteUser(confirmModal2:any,id: number) {
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
    this.deleteid = id;
  }

  yesdeleteUser(status: number) {
    if (status == 1) {
      let id = [this.deleteid];

      this.isLoading2 = true;
      this.bridgeService.deleteuser(id).subscribe(
        (res) => {

          if (Object(res)['status'] == "200") {
          this.bridges = this.bridges.filter(function (item) {
            return item['id'] && +item['id'] !== +id;
          });
          this.isLoading2 = false;
          this.modalService.dismissAll();
          this.ngOnInit();
        }
        },
        (err) => {
          this.error = err;
          this.isLoading2 = false;
        }
      );
    } else {
      // this.modalService.dismissAll();
      this.ngOnInit();
    }
  }

  suspendUser(confirmModal:any,item: Bridge,status:any) {
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
    this.bridge2.companyID = item.companyID;
    this.bridge2.id = Number(item.id);
    this.bridge2.userName = item.userName;
    this.bridge2.password = item.password;
    this.bridge2.firstName = item.firstName;
    this.bridge2.middleName = item.middleName;
    this.bridge2.lastName = item.lastName;
    this.bridge2.Email = item.Email;
    this.bridge2.Mobile = item.Mobile;
    this.bridge2.role = item.role;
    this.bridge2.position = item.position;
    this.bridge2.zone = item.zone;
    this.bridge2.branch = item.branch;
    this.bridge2.passwordUpdatedOn = item.passwordUpdatedOn;
    this.bridge2.lastLoginOn = item.lastLoginOn;
    this.bridge2.reportingTo = item.reportingTo;
    this.bridge2.timestamp = item.timestamp;
    this.bridge2.SalesEmployeeCode = item.SalesEmployeeCode;
    this.bridge2.SalesEmployeeName = item.SalesEmployeeName;
    this.bridge2.EmployeeID = item.EmployeeID;
    this.bridge2.Active = status;
  }

  yessuspendedUser() {
    this.bridgeService.edituser(this.bridge2).subscribe(
      (res: EditBridge) => {
        if (Object(res)['status'] == "200") {
          this.ngOnInit();
          this.modalService.dismissAll();

        }
        else {
          this._NotifierService.showError(Object(res)['message']);
        }
      },
      (err) => {
        this.isLoading3 = false;
        const delim = ":"
        const name = err.message
        const result = name.split(delim).slice(3).join(delim);
          this._NotifierService.showError(result);
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


  multipleDelete1() {
    if (confirm("Are You Sure Do You Want To Delete This Data")) {
      this.bridgeService.deleteuser(this.count).subscribe(
        (res: any) => {
          if (Object(res)['status'] == "200") {
            this.RowPerPage();
          }
          else {
          this._NotifierService.showError(Object(res)['message'])
          }
        },
        (err) => {
          this.isLoading3 = false;
          const delim = ":"
          const name = err.message
          const result = name.split(delim).slice(3).join(delim)
          this._NotifierService.showError(result)
        }
      );

    }
  }

  checkExportStatus() {
    const status = sessionStorage.getItem('exportStatus');
    this.exportStatus = status === 'true'; // sessionStorage stores everything as strings
  }

  fileName ="user_export.xlsx";

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

}
