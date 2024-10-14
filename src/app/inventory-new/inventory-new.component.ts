import { Target } from '../login';
import { Component, HostListener, Renderer2, OnInit, ElementRef, ViewChild } from '@angular/core';
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
  selector: 'app-inventory-new',
  templateUrl: './inventory-new.component.html',
  styleUrls: ['./inventory-new.component.scss']
})
export class InventoryNewComponent implements OnInit {

    closeResult = '';
    p: number = 1;
    sortedColumn: string = '';
    sortsend: boolean | undefined;
    UserName: any;
    idd: any;
    CAteId: any;
    AddCAteId:any = '';
    role: any;
    SalesEmployeeCode: any;
    error = '';
    success = '';
    isLoading2: boolean = false;
    searchValue: string = '';
    isLoading: boolean = false;
    items: Item[] = [];
    ReportModule:any[] = [
      {id:1,title:'Active Items'},
      {id:2,title:'Items Group'},
      // {id:3,title:'Inventory'},
      // {id:4,title:'Non-Inventory'},
      // {id:5,title:'Service'},
    ]

  category: any = {
    CategoryName: '',
    CategoryImageURL:'',
    Status: '1',
    CreatedDate: this.HeadingServices.getDate(),
    CreatedTime: this.HeadingServices.getTime(),
    UpdatedDate: this.HeadingServices.getDate(),
    UpdatedTime: this.HeadingServices.getTime(),
  };
    ModuleItem:any = '';
    CateName:any = '';
    isItem: any = '';
    isItemIndex: any = 0;
    isItemedit: boolean = false;
    isUpdateObje: any = {};
    OldItemName: any = '';
    isValidValue:boolean = true;
  isNavVisible = false;
  categorys: any[] = [];

  frequency: any[] = [
    { name: "Yearly", id: 1 },
    { name: "Half Yearly", id: 2 },
    { name: "Quarterly", id: 4 },
    { name: "Monthly", id: 12 },
  ]
    itemPageNo: number = 1;
    item: any = {
      ItemImageURL:'',
      CodeType: 'Manual',
      ItemName: '',
      ItemCode: '',
      Inventory: 0,
      CatID: '',
      UoS: '',
      Tax: 0,
      Packing: '',
      Description: '',
      UnitPrice: '',
      Currency: 'INR',
      HSN: '',
      ItemType:'',
      TaxCode: 0,
      Discount: 0,
      Status: '1',
      CreatedDate: this.HeadingServices.getDate(),
      CreatedTime: this.HeadingServices.getTime(),
      UpdatedDate: this.HeadingServices.getDate(),
      UpdatedTime: this.HeadingServices.getTime(),
      SKU: "",
      ROP: "",
      as_Recurring: "",
      Billing_Frequency: "",
      has_Specs: "",
      Unit: "",
      Weight: "",
      Dimension: "",
      Location: "",
      Duration: "",
      has_add_info: "",
      AdditionalInfo:""
    };

    ItemType:any;
    isChecked = false;
    isChecked2 = false;
    isChecked3 = false;
    multiitme:any[] = [{
      "Attribute": "",
      "Option": ""
    }];
    checkbox2:boolean = false;
    checkbox3:boolean = false;
    urlcheck: any;
    inventoryDetails: any;

    isEdit:boolean=false;
    startind = 1;
    endind = 1;
    pagination: any = {
      PageNo: 1,
      maxItem: '10',
      PageShow: 10
    }
    totalCount: any;
    order_by_field: any = 'id';
    order_by_value: any = 'desc';


    commonObj: any = { exportLoading: false }
  Headingss: any[] = [];
  exportStatus: boolean = false;
    constructor(
      private modalService: NgbModal,
      private route: Router,
      private bridgeService2: BridgeService,private HeadingServices: HeadingServicesService,
      private router: ActivatedRoute,
      private renderer: Renderer2, private el: ElementRef,
      private _location: Location, private _NotifierService: NotiferService
    ) { }

    ngOnInit(): void {

      this.bridgeService2.autoCall();
      this.Headingss = this.HeadingServices.getModule13();
      this.UserName = sessionStorage.getItem('UserName');
      this.role = sessionStorage.getItem('role');
      this.SalesEmployeeCode = sessionStorage.getItem('SalesEmployeeCode');
      this.checkExportStatus();
      if (this.UserName == undefined) {
        this.route.navigate(['/login']);
      }
      this.router.params.subscribe(params => {
        this.idd = params['id'];
        if (this.idd != undefined) {
          this.loadData();
        }
      });

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

    loadData(): void {
      var filterVal = this.ReportModule.filter((option: any) => {
        return option.id == this.idd
      });
      this.ModuleItem = filterVal[0].title;
      if(this.idd == 2){
        this.getBridge();
        this.CAteId = this.router.snapshot.params.catId;
        if(this.CAteId != 0){
          this.bridgeService2.getoneInventoryCategory(this.CAteId).subscribe(
            (data: any) => {
              this.inventoryDetails = data;
              this.CateName = data[0].CategoryName;
              this.getItems();
            },
            (err) => {
              console.log(err);
              this.error = err;
            }
          );
        }
      }
      else{
      this.CAteId = '';
      this.getItems();
      }

    }

    toggleNav(event: Event) {
      this.isNavVisible = !this.isNavVisible;
    }

    SetID(item:any){
      this.searchValue = '';
      this.route.navigate(['/newinventory/'+this.idd+'/'+item.id]);
    }
  setModule(item:any){
    this.isNavVisible = false;
    this.CateName = '';
    this.searchValue = '';
    if(item.id == 3){
      this.ItemType = 'Inventory'
    }
    else if(item.id == 4){
      this.ItemType = 'Non-Inventory'
    }
    else if(item.id == 5){
      this.ItemType = 'Services'
    }
    else{
      this.ItemType = ''
    }
    this.route.navigate(['/newinventory/'+item.id+'/0']);

  }
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
      this.loadData();
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
      this.bridgeService2.getItemByPagination(this.pagination, this.searchValue, this.CAteId, this.order_by_field, this.order_by_value,1,this.ItemType).subscribe(
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
      this.getBridge();
      this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', modalDialogClass: 'modal-dialog-centered order-cards-modal',backdrop:'static' }).result.then(
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

    closnePop(){
      this.AddCAteId = '';
      this.modalService.dismissAll();
    }
    ClickConticu(){
      if(this.AddCAteId != ''){
      this.openmaximize(this.mymodal2,false,'');
      }
      else{
        this._NotifierService.showError('Please Select Category First');
      }
    }

// Category Section
    openCate(content: any,isEdit:boolean,item:any) {
    this.isEdit = isEdit;
    if(this.isEdit){
    this.category = JSON.parse(JSON.stringify(item));
    }
    else{
      this.category = {
        CategoryName: '',
        CategoryImageURL:'',
        Status: '1',
        CreatedDate: this.HeadingServices.getDate(),
        CreatedTime: this.HeadingServices.getTime(),
        UpdatedDate: this.HeadingServices.getDate(),
        UpdatedTime: this.HeadingServices.getTime(),
      }
    }
    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title', modalDialogClass: 'modal-dialog-centered order-cards-modal',backdrop:'static' })
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }

  fl: any = [];
  onFileChanged(event: any) {
    this.fl = [];
    for (var i = 0; i < event.target.files.length; i++) {
      this.fl.push(event.target.files[i]);
    }
  }


  fl2: any = [];
  onFileChanged2(event: any) {
    this.fl2 = [];
    for (var i = 0; i < event.target.files.length; i++) {
      this.fl2.push(event.target.files[i]);
    }
    // console.log(this.fl2)
  }

  addCategory(f: NgForm) {
    f = this.bridgeService2.GlobaleTrimFunc(f);
    if (this.fl) {
      this.category.CategoryImageURL = this.fl;
    }
    else {
      this.category.CategoryImageURL = '';
    }
    this.resetAlerts();
    if (f.valid) {
      this.bridgeService2.storeInventoryCategory(this.category,this.isEdit).subscribe(
        (res: any) => {
          if (Object(res)['status'] == "200") {
            this._NotifierService.showSuccess(this.isEdit?'Added Group Successfully':'Updated Group Successfully');
          this.modalService.dismissAll();
          setTimeout(() => {
            let currentUrl = this.route.url;
            this.route.routeReuseStrategy.shouldReuseRoute = () => false;
            this.route.onSameUrlNavigation = 'reload';
            this.route.navigate([currentUrl]);
          }, 2000);
        }
        else {
          this._NotifierService.showError(Object(res)['message']);
          // this.isLoading = false;
        }
        },
        (err) => {
          const delim = ':';
          const name = err.message;
          const result = name.split(delim).slice(3).join(delim);
          this._NotifierService.showError(result);
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



  editdeletepop(item: any) {
    $('.hover-show').hide();
    $('.hover-show' + item.id).show();
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

  JunkId2:any;

  confirmModal2(confirmModal2:any,JunkId:any) {
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


  multipleDelete12(id:any) {
    this.bridgeService2.deleteInventoryCategory(id).subscribe(
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

  // End CAtegory

    @ViewChild('mymodal2')mymodal2!:ElementRef;
    isEdit2:boolean = false;
    openmaximize(content: any,isEdit:boolean,item:any) {
      this.isEdit2 = isEdit;
      if(this.isEdit2){
      this.item = JSON.parse(JSON.stringify(item));
      this.AddCAteId = this.item.CatID.id;
      if(this.item.ItemType == 'Non-Inventory'){
        this.ShowTabval = 3;
      }
      else if(this.item.ItemType == 'Services'){
        this.ShowTabval = 2;
      }
      else{
        this.ShowTabval = 1;
      }
      }
      else{
        this.ShowTabval = 1;
        this.item = {
          ItemImageURL:'',
          CodeType: 'Manual',
          ItemName: '',
          ItemCode: '',
          Inventory: 0,
          CatID: '',
          UoS: '',
          Tax: 0,
          Packing: '',
          Description: '',
          UnitPrice: '',
          Currency: 'INR',
          HSN: '',
          ItemType:'',
          TaxCode: 0,
          Discount: 0,
          Status: '1',
          CreatedDate: this.HeadingServices.getDate(),
          CreatedTime: this.HeadingServices.getTime(),
          UpdatedDate: this.HeadingServices.getDate(),
          UpdatedTime: this.HeadingServices.getTime(),
          SKU: "",
          ROP: "",
          as_Recurring: "",
          Billing_Frequency: "",
          has_Specs: "",
          Unit: "",
          Weight: "",
          Dimension: "",
          Location: "",
          Duration: "",
          has_add_info: "",
          AdditionalInfo:""
        }
      }
      this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', modalDialogClass: `modal-dialog-centered figma-cards-modal figma-cards-modal-lg`,backdrop:'static' }).result.then((result) => {
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

    backClicked() {
      this._location.back();
    }
    getval(){
      this.isChecked = !this.isChecked;
    }
    getval2(){
      this.isChecked2 = !this.isChecked2;
    }
    getval3(){
      this.isChecked3 = !this.isChecked3;
    }
    addinMulti(){
      this.multiitme.push({
        "Attribute": "",
        "Option": ""
      })
    }
    removeFromArra(i:any){
      this.multiitme.splice(i,1)
    }
    ShowTabval:any = 1;
    ShowTab(val:any){
      this.ShowTabval = val;
    }

    addItem(f: NgForm) {
      f = this.bridgeService2.GlobaleTrimFunc(f);
      if (this.fl2) {
        this.item.ItemImageURL = this.fl2;
      }
      else {
        this.item.ItemImageURL = '';
      }
      if (f.valid) {
        this.isLoading = true;
        this.item.CatID = this.AddCAteId;
        if(this.ShowTabval == 3){
          this.item.ItemType = 'Non-Inventory'
        }
        else if(this.ShowTabval == 2){
          this.item.ItemType = 'Services'
        }
        else{
          this.item.ItemType = 'Inventory'
        }

        if(this.isChecked){
          this.item.as_Recurring = 1
        }
        else{
          this.item.as_Recurring = 0
        }

        if(this.isChecked2){
          this.item.has_Specs = 1
        }
        else{
          this.item.has_Specs = 0
        }

        if(this.isChecked3){
          this.item.has_add_info = 1
          this.item.AdditionalInfo = this.multiitme
        }
        else{
          this.item.has_add_info = 0
        }
        this.item.CatID = this.AddCAteId;
        this.item.Tax = Number(this.item.Tax);
        this.item.Discount = Number(this.item.Discount);
        // var Payload = JSON.parse(JSON.stringify(this.item));
        this.bridgeService2.storeInventory2(this.item,this.isEdit2).subscribe(
          (res: any) => {
            if (Object(res)['status'] == "200") {
              // this.items.push(res);
            this._NotifierService.showSuccess(this.isEdit2?'Updated Item Successfully':'Added Item Successfully');
              this.isLoading = false;
              this.modalService.dismissAll();
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

    checkExportStatus() {
      const status = sessionStorage.getItem('exportStatus');
      this.exportStatus = status === 'true'; // sessionStorage stores everything as strings
    }

    // Default excel file name when download
    fileName ="inventory-new_export.xlsx";

    Exportexcel(){
      // passing table-id
      let data = document.getElementById("yourTableId");
      const ws:XLSX.WorkSheet = XLSX.utils.table_to_sheet(data)

      // Generete workbook and add the worksheet
      const wb:XLSX.WorkBook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb,ws, 'Sheet1')

      // Save to file
      XLSX.writeFile(wb, this.fileName)

    }
  }
