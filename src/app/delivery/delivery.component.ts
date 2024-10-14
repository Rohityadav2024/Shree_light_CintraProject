import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { BridgeService } from '../modules/service/bridge.service';
import { BusinessPartners } from '../businesspartners';
import { Country, Customer, States } from '../customer';
import { Orders } from '../orders';
import { Quotation } from '../quotation';
import { NgForm } from '@angular/forms';
import { HeadingServicesService } from '../modules/service/heading-services.service';
import { NotiferService } from '../modules/service/helpers/notifer.service';
import * as XLSX from 'xlsx'
declare var $: any;

@Component({
  selector: 'app-delivery',
  templateUrl: './delivery.component.html',
  styleUrls: ['./delivery.component.css']
})
export class DeliveryComponent implements OnInit {

  @ViewChild('mymodal')mymodal!:ElementRef;
  p: number = 1;
  orderid:any;
  sortedColumn: string = '';
  sortsend: boolean | undefined;
  orders: Orders[] = [];
  orderfilter: any[] = [];
  quotations: Quotation[] = [];
  businesspartners: BusinessPartners[] = [];
  quotationsList: any[] = [];
  closeResult = '';
  UserName: any;
  error = '';
  success = '';
  isLoading2: boolean = false;
  isdataLoading:boolean=false;
  pagelimit: any = 10;
  startind = ((this.p - 1) * this.pagelimit) + 1;
  endind = ((this.p - 1) * this.pagelimit) + this.pagelimit;

  defaultordercustomer:any;
  defaultorderstartdate:any;
  
  order_id:any = '';
  baseUrl:any;
  commonObj : any={exportLoading:false,previousItem:'form'}
  CurrentPage:any = 1;
  pagination: any = {
    PageNo: 1,
    maxItem: '10'
  }
  totalCount:any;
  // opposearchfilter
  searchValue: string = '';

  order_by_field:any = 'id';
  order_by_value:any = 'desc';
  count = new Array();
  filter_customer: any = {CreateDate:'',CardCode:''};
  searchname: any;
  getFilterData: any;
  paginationnum: any;
  AddDelivery:any = {
    "OrderID":"",
    "TaxDate": "",
    "DocDueDate": "",
    "ContactPersonCode": "",
    "DiscountPercent": "",
    "DocDate": "",
    "CardCode": "",
    "Comments": "",
    "FreightCharge": 0,
    "PODate": "",
    "PONumber": "",
    "SalesPersonCode": "",
    "DocumentStatus": "",
    "DocCurrency": "",
    "DocTotal": "",
    "NetTotal": "",
    "CardName": "",
    "VatSum": "",
    "CreationDate": "",
    "DocEntry": "",
    CreateDate: this.HeadingServices.getDate(),
    CreateTime: this.HeadingServices.getTime(),
    UpdateDate: this.HeadingServices.getDate(),
    UpdateTime: this.HeadingServices.getTime(),
    "SelfDelivery":0,
    "TrackingId":"",
    "ShippedWith":"",
    "TrackingStatus":"",
    "DispatchedDate":"",
    "PRID": "",
    "departement": "",
    "AddressExtension": {
      BillToId: '',
      ShipToId: '',
      BillToBuilding: '',
      ShipToState: '',
      BillToCity: '',
      ShipToCountry: 'IN',
      BillToZipCode: '',
      ShipToStreet: '',
      BillToState: '',
      ShipToZipCode: '',
      BillToStreet: '',
      ShipToBuilding: '',
      ShipToCity: '',
      BillToCountry: 'IN',
      U_SCOUNTRY: 'India',
      U_SSTATE: '',
      U_SHPTYPB: '',
      U_BSTATE: '',
      U_BCOUNTRY: 'India',
      U_SHPTYPS: '',
    },
    "DocumentLines": []
  }
  urlcheck: any;
  accesstoken:any;
  paginationOption:any;

  countrys: Country[] = [];
  statess: States[] = [];
  ShippingType:any;
  OrderId:any;
  Headingss: any[] = [];
  exportStatus: boolean = false;
  savedModules: any[] = [];
  constructor(private modalService: NgbModal, private route: Router,private HeadingServices: HeadingServicesService,
    private _NotifierService: NotiferService, private bridgeService2: BridgeService) {

    this.baseUrl=bridgeService2.baseUrl2;
    // console.log(this.baseUrl)
   }

  ngOnInit(): void {
    if (!this.HeadingServices.isModuleView(7)) {
      this.route.navigate(['/dashboard']);
    }
    this.bridgeService2.autoCall();
    this.paginationOption=this.bridgeService2.paginationOption;
    this.ShippingType=this.bridgeService2.ShippingType;
    this.filter_customer.CardCode = this.bridgeService2.getBpCardcode();
    this.getOrders();
    this.getBusinessPartmers();
    this.getQuotationList();
    this.getCountry();
    this.checkExportStatus();
    this.Headingss = this.HeadingServices.getModule7();
    this.bridgeService2.getStatedata('IN').subscribe(
      (data: States[]) => {
        this.statess = data;
      },
      (err) => {
        console.log(err);
        this.error = err;
      }
    );
    this.UserName = sessionStorage.getItem('UserName');
    if (this.UserName == undefined) {
      this.route.navigate(['/login']);
    }
    this.accesstoken='&token='+sessionStorage.getItem('accesstoken');
    $(document).mouseup(function (e: { target: any; }) {
      var popup = $(".hover-show");
      if (!$('.edit-delete').is(e.target) && !popup.is(e.target) && popup.has(e.target).length == 0) {
        popup.hide();
      }
    });

    $(document).ready(function () {
      $('.hover-show').hide()
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

  const savedModulesString = sessionStorage.getItem('savedModules');
    if (savedModulesString) {
      this.savedModules = JSON.parse(savedModulesString);
    }


  }

  ngAfterViewInit(){
    this.OrderId = this.bridgeService2.getOrderId();
    var getOrderType = this.bridgeService2.getOrderType();

    if(!!this.OrderId && getOrderType == 'Order') {
    this.openmaximize(this.mymodal);
    this.selectQuotationChangeHandlerItem(this.OrderId);
    }
  }

  gererateinvoice(item: any) {
    this.bridgeService2.SetOrderId(item);
    this.bridgeService2.setAllFilter('',undefined);
    this.bridgeService2.SetOrderType('Delivery');
    this.route.navigate(['/invoice/add-invoice']);
  }

  reload() {
    this.count = [];
    $('#selectAll1').prop('checked', false);
    this.commonObj.tbCheckM_1 = false;
    this.commonObj.tbCheckM_2 = false;
    this.setNew();
    this.getOrders();
  }

    emptySeach(){
    this.searchValue = '';
    this.RowPerPage();
  }
  RowPerPage() {
    this.pagination.PageNo = 1;
    this.reload();
  }
  searchEvent(name: any) {
     this.bridgeService2.pushSearch(name.target.value);
   }
   total_after:any;
   total_Amount:any;

   getTotal(item: any) {
    var totalamount=new Array;
    for (var i = 0; i < item.DocumentLines.length; i++) {
     var basic = Number(item.DocumentLines[i].Quantity) * Number(item.DocumentLines[i].UnitPrice);
     var afterfdis = basic - (basic * (Number(item.DocumentLines[i].DiscountPercent) / 100))
     var aftersdis = afterfdis - (afterfdis * (Number(item.DiscountPercent) / 100))
     var total = aftersdis
    //  var total = aftersdis + (aftersdis * (Number(item.DocumentLines[i].Tax) / 100))
      totalamount.push(total);
    }
    var total_Amount=totalamount.reduce((a:any, b:any) => a + Number(b), 0);
    return total_Amount;
  }

  resetAlerts() {
    this.error = '';
    this.success = '';
  }


  resetfilter() {
    this.filter_customer =  {CreateDate:'',CardCode:''};
    this.RowPerPage();

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

  setPrevious(){
    var filterdata:any[] = this.bridgeService2.getAllFilter('delivery');
    if(filterdata != undefined){
    this.pagination = filterdata[0];
    this.searchValue = filterdata[1];
    this.filter_customer = filterdata[2];
    this.order_by_field = filterdata[3];
    this.order_by_value = filterdata[4];
    }
  }
  setNew(){
    this.bridgeService2.setAllFilter('delivery',[this.pagination,this.searchValue,this.filter_customer,this.order_by_field,this.order_by_value]);
  }
  getOrders(): void {
    this.isLoading2 = true;
    this.setPrevious();
    this.bridgeService2.getDeliveryByPagination(this.pagination,this.searchValue,this.filter_customer,this.order_by_field,this.order_by_value).subscribe(
      (data: any) => {
        if (data.status == "200") {
        this.orders = data.data;
        this.totalCount = data.meta.count;
        this.CurrentPage = this.pagination.PageNo;
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
  selectAll1() {
    let num = (document.getElementById("selectAll1") as HTMLInputElement);
    if (num.checked) {
      this.count = [];
      for (let i = 0; i < this.orders.length; i++) {
        this.count.push(this.orders[i].id);
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

  suplier(item: any) {

    this.bridgeService2.SetOrderType(undefined);
    this.route.navigate(['/delivery/delivery-details/' + item]);
  }

  editdeletepop(item: Orders) {
    $('.hover-show').hide();
    $('.hover-show' + item.id).show();
  }

  pageChanged(event: any) {
    this.pagination.PageNo = event;
    this.reload();
  }


  GoToPdf(id: any) {
    const encodedURL = btoa(id);
    const url = "../../assets/html/invoice.html?id="+id+this.accesstoken;
    window.open(url, '_blank');
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
  getCountry(): void {
    this.bridgeService2.getCountrydata().subscribe(
      (data: Country[]) => {
        this.countrys = data;

      },
      (err) => {
        console.log(err);
        this.error = err;
      }
    );
  }
  getBusinessPartmers(): void {
    this.bridgeService2.getBusinessPartmersShortdata().subscribe(
      (data: BusinessPartners[]) => {
        this.businesspartners = data;
      },
      (err) => {
        console.log(err);
        this.error = err;
      }
    );
  }


  CanelID: any;
  CanelOrderPopup(confirmModal:any,id: number) {
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
   this.CanelID = id;
 }
  cancelOrder(id:any){
      this.bridgeService2.CancelDelivery(id).subscribe(
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
          const delim = ":"
          const name = err.message
          const result = name.split(delim).slice(3).join(delim)
          this._NotifierService.showError(result);
        }
      );

  }

  getQuotationList(): void {
    this.isLoading2 = true;
    this.bridgeService2.getOrderByPagination({PageNo: 1,maxItem: 'All',},'',{DocumentStatus:'bost_Open',CancelStatus:'csNo'},'id','desc').subscribe(
      (data: any) => {
        this.isLoading2 = false;
        this.quotationsList = data.data;
      },
      (err) => {
        this.isLoading2 = false;
        console.log(err);
        this.error = err;
      }
    );
  }

  selectQuotationChangeHandlerItem(event: any) {

    this.isdataLoading = true;
    this.bridgeService2.getOneOrderdata(event?.id ?? event).subscribe(
      (data: Quotation[]) => {
        // this.isdataLoading=false;
        this.quotations = data;
        this.AddDelivery.OrderID = String(this.quotations[0].id);
        this.AddDelivery.DocDueDate = this.quotations[0].DocDueDate;
        this.AddDelivery.DocDate = this.quotations[0].DocDate;
        this.AddDelivery.DocTotal = this.quotations[0].DocTotal;
        this.AddDelivery.FreightCharge = Number(this.quotations[0].FreightCharge);
        this.AddDelivery.PONumber = this.quotations[0].PONumber;
        this.AddDelivery.PODate = this.quotations[0].PODate;
        this.AddDelivery.CardName = this.quotations[0].CardName;
        this.AddDelivery.AddressExtension = this.quotations[0].AddressExtension;
        this.AddDelivery.DiscountPercent = this.quotations[0].DiscountPercent;

        this.AddDelivery.PaymentGroupCode = this.quotations[0].PaymentGroupCode
        this.AddDelivery.SalesPersonCode = this.quotations[0].SalesPersonCode
        this.AddDelivery.DocumentStatus = this.quotations[0].DocumentStatus;
        this.AddDelivery.DocumentLines = this.quotations[0].DocumentLines;
        this.AddDelivery.ContactPersonCode = this.quotations[0].ContactPersonCode[0].InternalCode;
        this.AddDelivery.CardCode = String(this.quotations[0].CardCode);
        // const newArray = this.bridgeService2.replaceKeyInArray(this.quotations[0].DocumentLines, 'TaxRate', 'Tax');
        // this.quotations[0].DocumentLines = newArray;
        this.calculatitonFuntion(this.AddDelivery.DocumentLines);
        // this.selectChangeHandlerItem(this.AddDelivery.CardCode);
        setTimeout(() => this.isdataLoading = false, 2000)
      })
  }

  public QuatItems: any = [];
  CountItem: Number = 0;

  add_qty(item: number) {
    for (let i = 0; i < this.QuatItems.length; i++) {
      if (item == this.QuatItems[i]['ItemCode']) {
        console.log(this.QuatItems[i]['Quantity'])
        console.log(this.QuatItems[i]['OpenQuantity'])
        if(this.QuatItems[i]['Quantity'] >= this.QuatItems[i]['OpenQuantity']){
          this._NotifierService.showError('You can not take value grater then Open Quantity '+this.QuatItems[i]['OpenQuantity']);
        }
        else if (this.QuatItems[i]['Quantity'] < 10000000) {
        this.QuatItems[i]['Quantity'] += 1;
        break;
      }
      else {
        this._NotifierService.showError('You can not take value grater then 10000000');
      }
      }
    }
  }

  minus_qty(item: number) {
    for (let i = 0; i < this.QuatItems.length; i++) {
      if (item == this.QuatItems[i]['ItemCode']) {
        if (this.QuatItems[i]['Quantity'] > 1) {
          this.QuatItems[i]['Quantity'] -= 1;
          break;
        }
        else {
          this._NotifierService.showError('You cannot take Value less than 1');
        }

      }
    }
  }

  calculatitonFuntion(NewArr:any,Type?:any){
    var totalamount:any = 0;
    if(Type != 'cal'){
    this.QuatItems = [];
    for (let i = 0; i < NewArr.length; i++) {
      if(Number(NewArr[i].OpenQuantity) != 0){
        this.QuatItems.push({
          id: NewArr[i].id,
          Quantity: Number(NewArr[i].OpenQuantity),
          OpenQuantity: Number(NewArr[i].OpenQuantity),
          UnitPrice: NewArr[i].UnitPrice,
          DiscountPercent: NewArr[i].DiscountPercent,
          ItemCode: NewArr[i].ItemCode,
          ItemDescription: NewArr[i].ItemDescription,
          TaxCode: NewArr[i].TaxCode,
          TaxRate: NewArr[i].TaxRate || 0,
        });
      }
    }
  }
    this.AddDelivery.DocumentLines = JSON.parse(JSON.stringify(this.QuatItems));
    this.CountItem = this.QuatItems.length
    for (let i = 0; i < this.QuatItems.length; i++) {
      var basic = Number(this.QuatItems[i].Quantity) * Number(this.QuatItems[i].UnitPrice);
      var afterfdis = basic - (basic * (Number(this.QuatItems[i].DiscountPercent) / 100))
      var aftersdis = afterfdis - (afterfdis * (Number(this.AddDelivery.DiscountPercent) / 100))
      var total = aftersdis + (aftersdis * (Number(this.QuatItems[i].TaxRate) / 100))
      totalamount += total;
    }
    this.total_Amount = totalamount.toFixed(2);
    if(this.AddDelivery.FreightCharge != ''){
    this.total_Amount = Number(this.total_Amount) + Number(this.AddDelivery.FreightCharge);
    }
    this.total_Amount =  Number(this.total_Amount).toFixed(2);
  }
  selectChangeHandler2(event: any) {
    var code2 = [];
    var filterVal = this.countrys.filter(($option: any) => $option.Code == event)[0];
    // console.log(this.filterVal);
    // console.log(this.filterVal.Name);

    code2[0] = filterVal.Code;
    code2[1] = filterVal.Name;
    // console.log('this.code2[0]',this.code2[0]);
    this.AddDelivery.AddressExtension.U_SCOUNTRY = code2[1]
    this.getState2(code2[0]);
  }
  getState2(evt: any) {
    this.bridgeService2.getStatedata(evt).subscribe(
      (data: States[]) => {
        this.statess = data;

      },
      (err) => {
        console.log(err);
        this.error = err;
      }
    );
  }
  selectChangeHandlerState2(event: any) {
    var codeState2 = [];
    var filterVal = this.statess.filter(($option: any) => $option.Code == event)[0];
    codeState2[0] = filterVal.Code;
    codeState2[1] = filterVal.Name;
    this.AddDelivery.AddressExtension.ShipToState = codeState2[0];
    this.AddDelivery.AddressExtension.U_SSTATE = codeState2[1];
  }

  selectChangeHandlerItem(event: any) {

    this.isdataLoading = true;
    this.bridgeService2.getOneCustomerdata(event).subscribe(
      (data: any) => {

        this.AddDelivery.CardName = data[0]['CardName'];

        var BP_Detailsdata = data
        this.AddDelivery.SalesPersonCode = BP_Detailsdata[0].SalesPersonCode[0].SalesEmployeeCode;
        this.AddDelivery.AddressExtension.BillToBuilding = BP_Detailsdata[0].BPAddresses[0].AddressName;
        this.AddDelivery.AddressExtension.BillToZipCode = BP_Detailsdata[0].BPAddresses[0].ZipCode;
        this.AddDelivery.AddressExtension.BillToCountry = BP_Detailsdata[0].BPAddresses[0].Country;
        this.AddDelivery.AddressExtension.U_BCOUNTRY = BP_Detailsdata[0].BPAddresses[0].U_COUNTRY;
        this.AddDelivery.AddressExtension.BillToState = BP_Detailsdata[0].BPAddresses[0].State;
        this.AddDelivery.AddressExtension.U_BSTATE = BP_Detailsdata[0].BPAddresses[0].U_STATE;
        //  console.log('BP_Detai lsdata[0].BPAddresses[0].State',BP_Detailsdata[0].BPAddresses[0].State)
        this.AddDelivery.AddressExtension.BillToCity = BP_Detailsdata[0].BPAddresses[0].City;
        this.AddDelivery.AddressExtension.U_SHPTYPB = BP_Detailsdata[0].BPAddresses[0].U_SHPTYP;
        this.AddDelivery.AddressExtension.BillToStreet = BP_Detailsdata[0].BPAddresses[0].Street;

        this.AddDelivery.AddressExtension.ShipToBuilding = BP_Detailsdata[0].BPAddresses[1].AddressName;
        this.AddDelivery.AddressExtension.ShipToZipCode = BP_Detailsdata[0].BPAddresses[1].ZipCode;
        this.AddDelivery.AddressExtension.ShipToCountry = BP_Detailsdata[0].BPAddresses[1].Country;
        this.AddDelivery.AddressExtension.U_SCOUNTRY = BP_Detailsdata[0].BPAddresses[1].U_COUNTRY;
        this.AddDelivery.AddressExtension.ShipToState = BP_Detailsdata[0].BPAddresses[1].State;
        this.AddDelivery.AddressExtension.U_SSTATE = BP_Detailsdata[0].BPAddresses[1].U_STATE;
        this.AddDelivery.AddressExtension.ShipToCity = BP_Detailsdata[0].BPAddresses[1].City;
        this.AddDelivery.AddressExtension.U_SHPTYPS = BP_Detailsdata[0].BPAddresses[1].U_SHPTYP;
        this.AddDelivery.AddressExtension.ShipToStreet = BP_Detailsdata[0].BPAddresses[1].Street;


        setTimeout(() => this.isdataLoading = false, 2000)
      });

  }
  remove_array(item: number) {
    this.QuatItems.splice(item, 1);
  }

  cancelSaveChange(type:any){
    if(type == 'Save'){
      var totalamount:any = 0;
    this.AddDelivery.DocumentLines = JSON.parse(JSON.stringify(this.QuatItems));
    for (let i = 0; i < this.QuatItems.length; i++) {
      var basic = Number(this.QuatItems[i].Quantity) * Number(this.QuatItems[i].UnitPrice);
      var afterfdis = basic - (basic * (Number(this.QuatItems[i].DiscountPercent) / 100))
      var aftersdis = afterfdis - (afterfdis * (Number(this.AddDelivery.DiscountPercent) / 100))
      var total = aftersdis + (aftersdis * (Number(this.QuatItems[i].TaxRate) / 100))
      totalamount += total;
    }
    this.total_Amount = totalamount.toFixed(2);
    if(this.AddDelivery.FreightCharge != ''){
    this.total_Amount = Number(this.total_Amount) + Number(this.AddDelivery.FreightCharge);
    }
    this.total_Amount =  Number(this.total_Amount).toFixed(2);
    }
    else{
    this.QuatItems = JSON.parse(JSON.stringify(this.AddDelivery.DocumentLines));
    }
    this.commonObj.previousItem = 'form';
  }
  SelectItemArry(){
    if(this.QuatItems.length != 0){
      console.log(this.QuatItems)
    this.commonObj.previousItem = 'Item';
    }
    else{
      this._NotifierService.showError('Please Select Order First');
      this.commonObj.previousItem = 'form';
    }
  }

showHidedata:boolean=false;
openmaximize(content: any) {
  this.resetForm();
  this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', modalDialogClass: `modal-dialog-centered figma-cards-modal figma-cards-modal-lg`,backdrop:'static' }).result.then((result) => {
    this.closeResult = `Closed with: ${result}`;
  },
    (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    }
  );
}

resetForm(){
  this.commonObj.previousItem = 'form';
  this.QuatItems = [];
  this.AddDelivery = {
    "OrderID":"",
    "TaxDate": "",
    "DocDueDate": "",
    "ContactPersonCode": "",
    "DiscountPercent": "",
    "DocDate": "",
    "CardCode": "",
    "Comments": "",
    "FreightCharge": 0,
    "PODate": "",
    "PONumber": "",
    "SalesPersonCode": "",
    "DocumentStatus": "",
    "DocCurrency": "",
    "DocTotal": "",
    "NetTotal": "",
    "CardName": "",
    "VatSum": "",
    "CreationDate": "",
    "DocEntry": "",
    CreateDate: this.HeadingServices.getDate(),
    CreateTime: this.HeadingServices.getTime(),
    UpdateDate: this.HeadingServices.getDate(),
    UpdateTime: this.HeadingServices.getTime(),
    "SelfDelivery":0,
    "TrackingId":"",
    "ShippedWith":"",
    "TrackingStatus":"",
    "DispatchedDate":"",
    "PRID": "",
    "departement": "",
    "AddressExtension": {
      BillToId: '',
      ShipToId: '',
      BillToBuilding: '',
      ShipToState: '',
      BillToCity: '',
      ShipToCountry: 'IN',
      BillToZipCode: '',
      ShipToStreet: '',
      BillToState: '',
      ShipToZipCode: '',
      BillToStreet: '',
      ShipToBuilding: '',
      ShipToCity: '',
      BillToCountry: 'IN',
      U_SCOUNTRY: 'India',
      U_SSTATE: '',
      U_SHPTYPB: '',
      U_BSTATE: '',
      U_BCOUNTRY: 'India',
      U_SHPTYPS: '',
    },
    "DocumentLines": []
  }
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

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  SaveOrder(f: NgForm) {
    if(this.showHidedata){
      this.AddDelivery.SelfDelivery = 1
    }
    else{
      this.AddDelivery.SelfDelivery = 0
    }
    f = this.bridgeService2.GlobaleTrimFunc(f);
    if (f.valid) {
      if(this.AddDelivery.FreightCharge == ''){
        this.AddDelivery.FreightCharge = 0
      }
      this.AddDelivery.DocTotal = this.total_Amount;
    this.bridgeService2.storeDelivery(this.AddDelivery).subscribe(
      (res: Orders) => {
        if (Object(res)['status'] == '200') {
          this._NotifierService.showSuccess(this.Headingss[0].leftheading+" "+this.Headingss[0].heading103+" "+this.Headingss[0].heading106);
          this.resetForm();
          this.modalService.dismissAll();
            this.RowPerPage();
        } else {
          this._NotifierService.showError(Object(res)['message']);
        }
      },
      (err) => {
        const delim = ':';
        const name = err.message;
        const result = name.split(delim).slice(3).join(delim);
        this._NotifierService.showError(result);
      }
    );
  } else {
    // this._NotifierService.showError('Something is Worong');
    // console.log(this.order);
    // console.log(f.value);
    for (let i = 0; i < Object.keys(f.value).length; i++) {
      var keyys = Object.keys(f.value)[i];
      if (f.value[keyys].length == 0) {
        if ($('input[name=' + keyys + ']').hasClass('required-fld')) {
          $('input[name=' + keyys + ']').addClass('red-line-border');
          $('input[name=' + keyys + ']').focus();
        }
        else if ($('select[name=' + keyys + ']').hasClass('required-fld')) {
          $('select[name=' + keyys + ']').addClass('red-line-border');
          $('select[name=' + keyys + ']').focus();
        }
        else if ($('ng-select[name=' + keyys + ']').hasClass('required-fld')) {
          $('ng-select[name=' + keyys + ']').addClass('red-line-border');
          $('ng-select[name=' + keyys + ']').focus();
        }
        else if ($('textarea[name=' + keyys + ']').hasClass('required-fld')) {
          $('textarea[name=' + keyys + ']').addClass('red-line-border');
          $('textarea[name=' + keyys + ']').focus();
        }
      } else {
        $('input[name=' + keyys + ']').removeClass('red-line-border');
        $('select[name=' + keyys + ']').removeClass('red-line-border');
        $('textarea[name=' + keyys + ']').removeClass('red-line-border');
        $('ng-select[name=' + keyys + ']').removeClass('red-line-border');
      }
    }
  }
  }

  checkExportStatus() {
    const status = sessionStorage.getItem('exportStatus');
    this.exportStatus = status === 'true'; // sessionStorage stores everything as strings
  }

  // Default excel file name when download 
  fileName ="delivery_export.xlsx";

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

  isModuleViewadd(module_id: number): boolean {  
    const selectedModule = this.savedModules?.filter((module: any) => module.module_id === module_id);
    if (selectedModule && selectedModule.length > 0 && selectedModule[0].is_add) {
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
