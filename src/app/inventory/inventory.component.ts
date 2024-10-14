import { Target } from '../login';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { BridgeService } from '../modules/service/bridge.service';
import { NgForm } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Category } from '../warehouse';
import { Location } from '@angular/common';
import { HeadingServicesService } from '../modules/service/heading-services.service';
declare var $: any;

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css'],
})
export class InventoryComponent implements OnInit {
  categorys: Category[] = [];
  dateObj = new Date();
  time = this.dateObj.toLocaleTimeString();
  month2 = this.dateObj.getMonth() + 1;
  month = (this.month2 < 10 ? '0' : '') + this.month2;
  day = (this.dateObj.getDate() < 10 ? '0' : '') + this.dateObj.getDate();
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
  newdate = this.year + '-' + this.month + '-' + this.day;

  newdatetime = this.newdate + ' ' + this.time;

  category: Category = {
    CategoryName: '',
    CategoryImageURL:'',
    Status: '1',
    CreatedDate: this.newdate,
    CreatedTime: this.time,
    UpdatedDate: this.newdate,
    UpdatedTime: this.time,
  };
  closeResult = '';
  UserName: any;
  SalesEmployeeCode: any;
  role:any;
  error = '';
  success = '';
  searchValue: string = '';
  order_by_field:any = 'id';
  order_by_value:any = 'desc';
  isLoading2: boolean = false;
  pagination: any = {
    PageNo: 1,
    maxItem: '10',
    PageShow:10
  }
  startind = 1;
  endind = 1;
  totalCount:any;
  isEdit:boolean=false;
  Headingss: any[] = [];
  constructor(
    private modalService: NgbModal,
    private route: Router,
    public bridgeService2: BridgeService,
    private http: HttpClient,
    private _location: Location,
    private HeadingServices: HeadingServicesService
  ) { }

  ngOnInit(): void {

    this.bridgeService2.autoCall();
    this.Headingss = this.HeadingServices.getModule12();
    this.UserName = sessionStorage.getItem('UserName');
    this.SalesEmployeeCode = sessionStorage.getItem('SalesEmployeeCode');
    this.role=sessionStorage.getItem('role');
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

    this.getBridge();
  }

  inventoryRoute(item:any){
    this.bridgeService2.inventorydata(item);
    this.route.navigate(['/inventory/item/'+item.id]);
  }
  RowPerPage() {
    this.pagination.PageNo = 1;
    this.getBridge();
  }

  pageChanged(event:any){
    this.pagination.PageNo = event;
    this.getBridge();
  }
  emptySeach(){
    this.searchValue = '';
    this.RowPerPage();
  }
  open(content: any,isEdit:boolean,item:any) {
    this.isEdit = isEdit;
    if(this.isEdit){
    this.category = JSON.parse(JSON.stringify(item));
    }
    else{
      this.category = {
        CategoryName: '',
        CategoryImageURL:'',
        Status: '1',
        CreatedDate: this.newdate,
        CreatedTime: this.time,
        UpdatedDate: this.newdate,
        UpdatedTime: this.time,
      }
    }
    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title', modalDialogClass: 'modal-dialog-centered order-cards-modal' })
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

  resetAlerts() {
    this.error = '';
    this.success = '';
  }

  fl: any = [];
  onFileChanged(event: any) {
    this.fl = [];
    for (var i = 0; i < event.target.files.length; i++) {
      this.fl.push(event.target.files[i]);
    }
  }

  getBridge(): void {
    this.isLoading2 = true;
    this.bridgeService2.getItemCateByPagination(this.pagination,this.searchValue,this.order_by_field,this.order_by_value).subscribe(
      (data: any) => {
        this.categorys = data.data;
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

  backClicked() {
    this._location.back();
  }

  JunkId:any;

  confirmModal(confirmModal2:any,JunkId:any) {
    this.JunkId = JunkId;
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


  multipleDelete1(id:any) {
    this.bridgeService2.deleteInventoryCategory(id).subscribe(
      (res: any) => {
        if (Object(res)['status'] == "200") {
          this.modalService.dismissAll();
          this.RowPerPage();
        }
        else {
          alert(Object(res)['message']);
        }
      },
      (err) => {
        // this.isLoading3 = false;
        const delim = ":"
        const name = err.message
        const result = name.split(delim).slice(3).join(delim)
        alert(result);
      }
    );
}


  addCategory(f: NgForm) {
    // console.log(this.category)
    f = this.bridgeService2.GlobaleTrimFunc(f);
    if (this.fl) {
      this.category.CategoryImageURL = this.fl;
    }
    else {
      this.category.CategoryImageURL = '';
    }
    // console.log(this.category)
    this.resetAlerts();
    if (f.valid) {
      this.bridgeService2.storeInventoryCategory(this.category,this.isEdit).subscribe(
        (res: any) => {
          if (Object(res)['status'] == "200") {
          // Update the list of cars
          // this.categorys.push(res);
          $('.success-box').show();
          this.modalService.dismissAll();
          setTimeout(() => {
            $('.success-box').fadeOut(1000);
            let currentUrl = this.route.url;
            this.route.routeReuseStrategy.shouldReuseRoute = () => false;
            this.route.onSameUrlNavigation = 'reload';
            this.route.navigate([currentUrl]);
          }, 2000);
        }
        else {
          alert(Object(res)['message']);
          // this.isLoading = false;
        }
        },
        (err) => {
          const delim = ':';
          const name = err.message;
          const result = name.split(delim).slice(3).join(delim);
          alert(result);
          this.modalService.dismissAll();
          this.ngOnInit();
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
        } else {
          $("input[name=" + keyys + "]").removeClass("red-line-border");
        }
      }
    }
  }
}
