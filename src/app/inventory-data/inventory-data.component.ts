import { Target } from '../login';
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { BridgeService } from '../modules/service/bridge.service';
import { NgForm } from '@angular/forms';
import { EditItem, Item } from '../warehouse';
import * as XLSX from 'xlsx';
import { Location } from '@angular/common';
import { NotiferService } from '../modules/service/helpers/notifer.service';
import { HeadingServicesService } from '../modules/service/heading-services.service';
declare var $: any;

@Component({
  selector: 'app-inventory-data',
  templateUrl: './inventory-data.component.html',
  styleUrls: ['./inventory-data.component.css'],
})
export class InventoryDataComponent implements OnInit {
  closeResult = '';
  p: number = 1;
  sortedColumn: string = '';
  sortsend: boolean | undefined;
  UserName: any;
  idd: any;
  role: any;
  SalesEmployeeCode: any;
  error = '';
  success = '';
  isLoading2: boolean = false;
  searchValue: string = '';
  dateObj = new Date();
  time = this.dateObj.toLocaleTimeString();
  month2 = this.dateObj.getMonth() + 1;
  month = (this.month2 < 10 ? '0' : '') + this.month2;
  day = (this.dateObj.getDate() < 10 ? '0' : '') + this.dateObj.getDate();
  year = this.dateObj.getUTCFullYear();
  newdate = this.day + '-' + this.month + '-' + this.year;
  isLoading: boolean = false;
  items: Item[] = [];
  itemPageNo: number = 1;
  item: Item = {
    ItemImageURL:'',
    CodeType: 'Series',
    ItemName: '',
    ItemCode: '',
    Inventory: 0,
    has_add_info: 0,
    CatID: '',
    UoS: '',
    Tax: 0,
    Packing: '',
    Description: '',
    UnitPrice: '',
    Currency: 'INR',
    HSN: '',
    TaxCode: 0,
    Discount: 0,
    Status: '1',
    CreatedDate: this.newdate,
    CreatedTime: this.time,
    UpdatedDate: this.newdate,
    UpdatedTime: this.time,
  };

  EditItem: EditItem = {
    ItemImageURL:'',
    CodeType: 'Series',
    ItemName: '',
    ItemCode: '',
    Inventory: '',
    CatID: '',
    UoS: '',
    Tax: 0,
    Packing: '',
    Description: '',
    UnitPrice: '',
    Currency: 'INR',
    HSN: '',
    TaxCode: 0,
    Discount: 0,
    Status: '1',
    CreatedDate: this.newdate,
    CreatedTime: this.time,
    UpdatedDate: this.newdate,
    UpdatedTime: this.time,
    id: 0
  };
  pagelimit: any = 10;
  startind = 1;
  endind = 1;
  urlcheck: any;
  inventoryDetails: any;

  pagination: any = {
    PageNo: 1,
    maxItem: '10',
    PageShow: 10
  }
  totalCount: any;
  commonObj: any = { exportLoading: false }
  order_by_field: any = 'id';
  order_by_value: any = 'desc';
  Headingss: any[] = [];
  constructor(
    private modalService: NgbModal,
    private route: Router,
    private bridgeService2: BridgeService,
    private router: ActivatedRoute,
    private _location: Location, private _NotifierService: NotiferService,
    private HeadingServices: HeadingServicesService
  ) { }

  ngOnInit(): void {

    this.bridgeService2.autoCall();
    this.Headingss = this.HeadingServices.getModule12();
    this.UserName = sessionStorage.getItem('UserName');
    this.role = sessionStorage.getItem('role');
    this.SalesEmployeeCode = sessionStorage.getItem('SalesEmployeeCode');
    if (this.UserName == undefined) {
      this.route.navigate(['/login']);
    }

    this.idd = this.router.snapshot.params.id;
    this.bridgeService2.getoneInventoryCategory(this.idd).subscribe(
      (data: Item[]) => {
        this.inventoryDetails = data;
      },
      (err) => {
        console.log(err);
        this.error = err;
      }
    );
    this.getItems();
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

    var priviousUrl = this.bridgeService2.getPreviousUrl();
    this.urlcheck = priviousUrl.split('/');

  }
  isItem: any = '';
  isItemIndex: any = 0;
  isItemedit: boolean = false;
  isUpdateObje: any = {};
  OldItemName: any = '';
  isValidValue:boolean = true;
  checkisVaild(event:any,type:any){
    if(type == 'UnitPrice'){
      if(event.target.value >= 0){
        this.isValidValue = true;
      }
      else{
        this.isValidValue = false;
      }
    }
    else if(type == 'ItemName'){
      if(event.target.value.length  <= 30 && !event.target.value.includes('.')){
        this.isValidValue = true;
      }
      else{
        this.isValidValue = false;
      }
    }
    else{
    if(event.target.value >= 0 && event.target.value <= 100 && !event.target.value.includes('.')){
      this.isValidValue = true;
    }
    else{
      this.isValidValue = false;
    }
  }
  }
  func3(isedit: boolean){

    alert('hi');
  }
  func2(isedit: boolean) {
    const excludeClass = 'excludeClass';

    document.addEventListener('click', (event) => {
        if (!(event.target as Element).classList.contains(excludeClass)) {

    this.isItemIndex = 0;
    if(this.isItem == 'ItemName'){
      Object(this.isUpdateObje)[this.isItem] = Object(this.isUpdateObje)[this.isItem].trim()
    if(Object(this.isUpdateObje)[this.isItem].trim() == ''){
      this.isValidValue = false;
    }
    }
    if(this.isValidValue){
    if (this.isItemIndex == 0 && this.isItemedit == true) {
      this.isItemedit = isedit;
      if (Object(this.isUpdateObje)[this.isItem] != this.OldItemName) {
        this.isUpdateObje.CatID = Object(this.isUpdateObje.CatID.id);
        this.bridgeService2.updateInventory(this.isUpdateObje).subscribe(
          (res: EditItem) => {
            if (Object(res)['status'] == "200") {
              this._NotifierService.showSuccess('Update Successfully !');
              this.getItems();
            }
            else {
              this._NotifierService.showError(Object(res)['message']);
            }
          },
          (err) => {
            this.isLoading = false;
            const delim = ':';
            const name = err.message;
            const result = name.split(delim).slice(3).join(delim);
            // alert(result);
            this._NotifierService.showError(result);
            this.ngOnInit();
          }
        );
      }

    }
    else {
      this.isItemedit = isedit;
    }
  }
  else{
    this.isItemedit = isedit;
    this.isValidValue = true;
    if(this.isItem == 'ItemName'){
      this._NotifierService.showError('Item Name shoud be less than 30 words');
    }
    else{
      this._NotifierService.showError('Invalid Value in '+this.isItem);
    }
    this.getItems();
  }
}
});

  }
  func(val: any, val2: any, item: any, isedit: boolean) {
    this.isItem = val;
    this.isItemedit = isedit;
    this.isItemIndex = val2;
    this.isUpdateObje = item;
    this.OldItemName = Object(item)[this.isItem]
  }
  getValues(obj: {}) {
    return Object.values(obj);
  }

  count = new Array();
  selectAll1() {
    let num = (document.getElementById("selectAll1") as HTMLInputElement);
    if (num.checked) {
      this.count = [];
      for (let i = 0; i < this.items.length; i++) {
        this.count.push(this.items[i].id);
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
    this.getItems();
  }

  emptySeach() {
    this.searchValue = '';
    this.RowPerPage();
  }
  RowPerPage() {
    this.pagination.PageNo = 1;
    this.reload();
  }
  getItems(): void {
    this.isLoading2 = true;
    this.bridgeService2.getItemByPagination(this.pagination, this.searchValue, this.idd, this.order_by_field, this.order_by_value).subscribe(
      (data: any) => {
        this.items = data.data;
        this.totalCount = data.meta.count;
        this.isLoading2 = false;
        if (this.pagination.maxItem != 'All') {
          this.startind = ((this.pagination.PageNo - 1) * Number(this.pagination.maxItem)) + 1;
          this.endind = ((this.pagination.PageNo - 1) * Number(this.pagination.maxItem)) + Number(this.pagination.maxItem);
          if (this.endind > this.totalCount) {
            this.endind = this.totalCount;
          }
          this.pagination.PageShow = Number(this.pagination.maxItem);
        }
        else {
          this.isLoading2 = false;
          this.startind = 1;
          this.endind = this.totalCount;
          this.pagination.PageShow = Number(this.totalCount);
        }
        if (this.totalCount == 0) {
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
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', modalDialogClass: 'modal-dialog-centered order-cards-modal' }).result.then(
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
    // this.route.navigate(['/inventory/details/' + item]);
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
  addItem(f: NgForm) {
    f = this.bridgeService2.GlobaleTrimFunc(f);
    if (this.fl) {
      this.item.ItemImageURL = this.fl;
    }
    else {
      this.item.ItemImageURL = '';
    }
    this.resetAlerts();
    if (f.valid) {
      this.isLoading = true;
      this.item.CatID = this.router.snapshot.params.id;
      this.item.Tax = Number(this.item.Tax);
      this.item.Discount = Number(this.item.Discount);
      this.bridgeService2.storeInventory(this.item).subscribe(
        (res: any) => {
          if (Object(res)['status'] == "200") {
            // this.items.push(res);
            this.isLoading = false;
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
            this.isLoading = false;
          }
        },
        (err) => {
          this.isLoading = false;
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
          if ($("textarea[name=" + keyys + "]").hasClass('required-fld')) {
            $("textarea[name=" + keyys + "]").addClass("red-line-border");
            $("textarea[name=" + keyys + "]").focus();
          }
        }
        else {
          $("input[name=" + keyys + "]").removeClass("red-line-border");
          $("textarea[name=" + keyys + "]").removeClass("red-line-border");
        }
      }
    }
  }

  pageChanged(event: any) {
    this.pagination.PageNo = event;
    this.reload();
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

  openEdit(contentEdit: any, item: EditItem) {
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
    // item.edit_id =
    this.EditItem = { ...item };
    this.EditItem.CatID = Object(item.CatID.id);


  }

  editItem(f: NgForm) {
    f = this.bridgeService2.GlobaleTrimFunc(f);
    //let params=this.EditItem;
    if (this.fl) {
      this.EditItem.ItemImageURL = this.fl;
    }
    else {
      this.EditItem.ItemImageURL = '';
    }
    this.bridgeService2.updateInventory(this.EditItem).subscribe(
      (res: EditItem) => {
        if (Object(res)['status'] == "200") {
          this.isLoading = false;
          // $('.success-box').show();
          this.modalService.dismissAll();
          alert('Update Successfully');
          this.getItems();
        }
        else {
          alert(Object(res)['message']);
        }
      },
      (err) => {
        this.isLoading = false;
        const delim = ':';
        const name = err.message;
        const result = name.split(delim).slice(3).join(delim);
        alert(result);
        this.modalService.dismissAll();
        this.ngOnInit();
      }
    );
  }
  backClicked() {
    this._location.back();
  }

}
