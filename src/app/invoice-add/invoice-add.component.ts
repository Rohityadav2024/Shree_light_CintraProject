import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Bridge } from '../bridge';
import { BridgeService } from '../modules/service/bridge.service';
import { BusinessPartners } from '../businesspartners';
import { oneopportunity, opportunity } from '../opportunity';
import { Customer, Industory, Country, States, PaymentTerm } from '../customer';
import { Quotation, QuotationItem } from '../quotation';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Orders } from '../orders';
import { Location } from '@angular/common';
import { HeadingServicesService } from '../modules/service/heading-services.service';
import { NotiferService } from '../modules/service/helpers/notifer.service';
import { Item } from '../warehouse';
declare var $: any;

@Component({
  selector: 'app-invoice-add',
  templateUrl: './invoice-add.component.html',
  styleUrls: ['./invoice-add.component.scss']
})
export class InvoiceAddComponent implements OnInit {

    customers: Customer[] = [];
    industorys: Industory[] = [];
    countrys: Country[] = [];
    statess: States[] = [];
    statess2: States[] = [];
    Headingss: any[] = [];
    opportunityone: oneopportunity[] = [];
    businesspartners: BusinessPartners[] = [];
    opportunitys: opportunity[] = [];
    bridgess: Bridge[] = [];
    quotationsitem: QuotationItem[] = [];
    isLoading2: boolean = false;
    savedModules: any[] = [];
    isdataLoading: boolean = false;
    orders: Orders[] = [];
    closeResult = '';
    order: Orders = {
      id:'',
      DocTotal:'',
      TaxDate: this.HeadingServices.getDate(),
      DocDueDate: '',
      U_QUOTNM: '',
      U_QUOTID: null,
      U_OPPID: null,
      U_OPPRNM: '',
      BaseEntry: null,
      BaseType: '',
      departement:'2',
      PRID:'',
      BPLID:'',
      Attach:'',
      QuotationID:'',
      FreightCharge:'',
      PaymentGroupCode:'',
      PODate:'',
      PONumber:'',
      ContactPersonCode: '',
      DiscountPercent: '0',
      DocDate: this.HeadingServices.getDate(),
      CardCode: '',
      CardName: '',
      Comments: '',
      SalesPersonCode: '',
      AddressExtension: {
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
      DocumentLines: '',
      CreateDate: this.HeadingServices.getDate(),
      CreateTime: this.HeadingServices.getTime(),
      UpdateDate: this.HeadingServices.getDate(),
      UpdateTime: this.HeadingServices.getTime(),
    };
    error = '';
    success = '';
    role: any;
    UserId: any;
    reportingTo: any;
    UserName: any;
    isLoading: boolean = false;

    p: number = 1;
    searchValue: string = '';
    searchValue1: any;
    baseUrl2: any;
    quotations: Quotation[] = [];
    quotationsList: Quotation[] = [];
    DeliveryList: any[] = [];
    showshipaddressBool: boolean = true;
    _quotationItem: any;


    urlcheck: any;
    orderid: any;
    BP_Detailsdata: any[] = [];
    order_id: any;
    branchs: any[] = [];
    customertype: any[] = [];
    paymentterms: PaymentTerm[] = [];
    resetAlerts() {
      this.error = '';
      this.success = '';
    }
    code: any[] = ['IN', 'India'];
    ShippingType: any;
    idd:any;
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
    order_by_field2:any = 'id';
    order_by_value2:any = 'desc';
    pagination2: any = {
      PageNo: 1,
      maxItem: '10',
      PageShow:10
    }
    items: Item[]=[];
    searchValue2: string = '';
    paginDisplay:boolean=true;
    constructor(
      private modalService: NgbModal,
      public HeadingServices: HeadingServicesService,
      private _NotifierService: NotiferService,
      private bridgeService2: BridgeService,
      private router: Router,
      private router2: ActivatedRoute,
      private http: HttpClient,
      private _location: Location
    ) {
      this.baseUrl2 = this.bridgeService2.baseUrl2;
    }
  isEdit:boolean=false;
  Type:any = '';
    ngOnInit(): void {
      if (!this.HeadingServices.isModuleView(8) || !this.HeadingServices.isModuleViewadd(8)) {
        this.router.navigate(['/dashboard']);
      }
      this.idd = this.router2.snapshot.params.id;
      // console.log(this.idd)
      if(this.idd == undefined){
        this.isEdit = false;
      }
      else{
        this.isEdit = true;
        this.getOrder(this.idd);
      }
      this.bridgeService2.autoCall();
      this.ShippingType = this.bridgeService2.ShippingType;

      this.Headingss = this.HeadingServices.getModule8();
    this.order.DocDueDate = this.HeadingServices.getPlusDayDate(30);
      this.UserName = sessionStorage.getItem('UserName');
      this.UserId = sessionStorage.getItem('UserId');
      this.role = sessionStorage.getItem('role');
      this.reportingTo = sessionStorage.getItem('reportingTo');
      if (this.UserName == undefined) {
        this.router.navigate(['/login']);
      }
      this.getBridge();
      this.getIndustory();
      this.getCountry();
      this.getBusinessPartmers();
      this.getOpportunity();
      this.getQuotationItem();
      this.getCustomerTypeList();
      this.getPaymentTerms();
      var today = new Date().toISOString().split('T')[0];
      document.getElementsByName('TaxDate')[0].setAttribute('min', today);
      document.getElementsByName('DocDueDate')[0].setAttribute('min', today);
      document.getElementsByName('DocDate')[0].setAttribute('min', today);



      this.bridgeService2.getStatedata('IN').subscribe(
        (data: States[]) => {
          this.statess = data;
          this.statess2 = data;
        },
        (err) => {
          console.log(err);
          this.error = err;
        }
      );

      this.getQuotationList();
      this.getDelivery();

      if(this.bridgeService2.getBpCardcode() != undefined){
        var CardCode = this.bridgeService2.getBpCardcode();
        this.selectChangeHandlerItem(CardCode);
        }

      if(this.bridgeService2.getOpportunityID() != undefined){
        var OppID = this.bridgeService2.getOpportunityID();
        this.selectChangeOpportunity(OppID);
      }

      if(this.bridgeService2.getOrderId() != undefined){
        var QuotID = this.bridgeService2.getOrderId();
        this.Type = this.bridgeService2.getOrderType();
        if(this.Type == 'Order'){
          this.selectQuotationChangeHandlerItem(QuotID);
        }
        else if(this.Type == 'Delivery'){
          this.selectDelivery(QuotID);
        }
      }

      const savedModulesString = sessionStorage.getItem('savedModules');
    if (savedModulesString) {
      this.savedModules = JSON.parse(savedModulesString);
    }

    }

    getOrder(idd:any): void {
      this.isdataLoading=true;
      this.bridgeService2.getOneInvoicedata(idd).subscribe(
        (data: Orders[]) => {
          this.isdataLoading=false;
          var totalamount:any = 0;
          this.quotations = data;
          this.order.id = idd;
          this.order.BaseEntry = Number(data[0].BaseEntry);
          this.order.BaseType = data[0].BaseType;
          this.Type = data[0].BaseType;
          this.order.FreightCharge = Number(this.quotations[0].FreightCharge);
          this.order.PONumber = this.quotations[0].PONumber;
          this.order.PODate = this.quotations[0].PODate;
          this.order.BPLID = this.quotations[0].BPLID;
          // console.log(this.order.U_OPPID )
          this.order.DiscountPercent = Number(this.quotations[0].DiscountPercent);
          this.order.CardCode = this.quotations[0].CardCode;
          this.order.DocumentLines = this.quotations[0].DocumentLines;
          this.order.AddressExtension = this.quotations[0].AddressExtension;
          this.order.FreightCharge = this.quotations[0].FreightCharge;
          this.order.PaymentGroupCode = this.quotations[0].PaymentGroupCode
          this.order.SalesPersonCode = this.quotations[0].SalesPersonCode
          // const newArray = this.bridgeService2.replaceKeyInArray(this.quotations[0].DocumentLines, 'TaxRate', 'Tax');
          // this.quotations[0].DocumentLines = newArray;
          for (let i = 0; i < this.quotations[0].DocumentLines.length; i++) {
            this.QuatItems.push({
              id: this.QuatItems.length + 1,
              Oid: this.quotations[0].DocumentLines[i].id,
              Quantity: this.quotations[0].DocumentLines[i].Quantity,
              UnitPrice: this.quotations[0].DocumentLines[i].UnitPrice,
              DueDate: this.quotations[0].DocumentLines[i].DueDate,
              DiscountPercent: this.quotations[0].DocumentLines[i].DiscountPercent,
              ItemCode: this.quotations[0].DocumentLines[i].ItemCode,
              ItemDescription: this.quotations[0].DocumentLines[i].ItemDescription,
              TaxCode: this.quotations[0].DocumentLines[i].TaxCode,
              TaxRate: this.quotations[0].DocumentLines[i].TaxRate||0,
            });
          }

          for (let i = 0; i < this.QuatItems.length; i++) {
            delete this.QuatItems[i]['id'];
            var basic = Number(this.QuatItems[i].Quantity) * Number(this.QuatItems[i].UnitPrice);
        var afterfdis = basic - (basic * (Number(this.QuatItems[i].DiscountPercent) / 100))
        var aftersdis = afterfdis - (afterfdis * (Number(this.quotations[0].DiscountPercent) / 100))
        var total = aftersdis + (aftersdis * (Number(this.QuatItems[i].TaxRate) / 100))
        totalamount += total;
      }
      this.total_Amount = totalamount.toFixed(2);
      if(this.quotations[0].FreightCharge != ''){
        this.total_Amount = Number(this.total_Amount) + Number(this.order.FreightCharge);
        }
        this.total_Amount =  Number(this.total_Amount).toFixed(2);

        console.log(this.order.DocumentLines)


          this.CountItem = this.quotations[0].DocumentLines.length;
          this.selectChangeHandlerItem(this.order.CardCode,'Quot');
          setTimeout(() => this.isdataLoading = false, 2000)
        },
        (err) => {
          console.log(err);
          this.isLoading=true;
          this.error = err;
        }
      );
    }
    ITemDataUpdate(event: any) {
    }
    getCustomerTypeList(): void {
      this.isLoading2 = true;
      this.bridgeService2.getBranchMasterPagination({
        PageNo: 1,
        maxItem: 'all'
      },'','id','desc').subscribe(
        (data: any) => {
          this.customertype = data.data;


        },
        (err) => {
          this.isLoading2 = false;
          console.log(err);
          this.error = err;
        }
      );
    }
    getPaymentTerms(): void {
      this.isLoading = true;
      this.bridgeService2.getPaymentTermsdata().subscribe(
        (data: PaymentTerm[]) => {
          this.paymentterms = data;
          this.isLoading = false;
        },
        (err) => {
          console.log(err);
          this.error = err;
        }
      );
    }

    getBranch(CardCode:any){
      this.bridgeService2.getCustomerBranchdata(CardCode).subscribe((data: any[]) => {
        this.branchs = data;

      },(err: string) => {
        this.error = err;
      }
    );

  }
    getQuotationList(): void {
      this.isLoading2 = true;
      var filterobj = {};
      if(this.isEdit == false){
        filterobj = {DocumentStatus:'bost_Open',CancelStatus:'csNo'}
      }
      else{
        filterobj = {DocumentStatus:undefined,CancelStatus:undefined}
      }
      this.bridgeService2.getOrderByPagination({PageNo: 1,maxItem: 'All',},'',filterobj,'id','desc').subscribe(
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

    getDelivery(): void {
      this.isLoading2 = true;
      this.bridgeService2.getDeliveryByPagination({PageNo: 1,maxItem: 'All'},'',{DocumentStatus:'bost_Open',CancelStatus:'csNo'},'id','desc').subscribe(
        (data: any) => {
          this.isLoading2 = false;
          this.DeliveryList = data.data;
        },
        (err) => {
          this.isLoading2 = false;
          console.log(err);
          this.error = err;
        }
      );
    }

    selectChangeOpportunity(event: any) {
      var idd = event.id ?? event;
      this.isdataLoading = true;
      this.bridgeService2.getOneOpportunitydata(idd).subscribe(
        (data: oneopportunity[]) => {
          this.opportunityone = data;
          this.order.U_OPPID = this.opportunityone[0].id;
          this.order.U_OPPRNM = this.opportunityone[0].OpportunityName;
          this.calculatitonFuntion(this.opportunityone[0]['OppItem'])
          this.selectChangeHandlerItem(this.opportunityone[0].CardCode);
          setTimeout(() => this.isdataLoading = false, 2000)

        },
        (err) => {
          console.log(err);
          this.error = err;
        }
      );

    }

    selectDelivery(event: any) {

      this.isdataLoading = true;
      this.bridgeService2.getOneDeliverydata(event?.id ?? event).subscribe(
        (data: Orders[]) => {
          // this.isdataLoading=false;
          this.quotations = data;
          this.order.BaseEntry = Number(this.quotations[0].id);
          this.order.BaseType = 'Delivery';
          this.order.DiscountPercent = Number(this.quotations[0].DiscountPercent);
          this.order.CardCode = this.quotations[0].CardCode;

          this.order.PONumber = this.quotations[0].PONumber;
          this.order.PODate = this.quotations[0].PODate;
          this.order.AddressExtension = this.quotations[0].AddressExtension;
          this.order.FreightCharge = Number(this.quotations[0].FreightCharge);
          this.order.PaymentGroupCode = this.quotations[0].PaymentGroupCode
          this.order.SalesPersonCode = this.quotations[0].SalesPersonCode
          // const newArray = this.bridgeService2.replaceKeyInArray(this.quotations[0].DocumentLines, 'TaxRate', 'Tax');
          // this.quotations[0].DocumentLines = newArray;
          this.calculatitonFuntion(this.quotations[0].DocumentLines,'Quot');
          this.selectChangeHandlerItem(this.order.CardCode,'Quot');
          setTimeout(() => this.isdataLoading = false, 2000)
        })
    }


    selectQuotationChangeHandlerItem(event: any) {

      this.isdataLoading = true;
      this.bridgeService2.getOneOrderdata(event?.id ?? event).subscribe(
        (data: Orders[]) => {
          // this.isdataLoading=false;
          this.quotations = data;
          this.order.BaseEntry = Number(this.quotations[0].id);
          this.order.BaseType = 'Order';
          this.order.DiscountPercent = Number(this.quotations[0].DiscountPercent);
          this.order.CardCode = this.quotations[0].CardCode;
          this.order.BPLID = this.quotations[0].BPLID;

          this.order.PONumber = this.quotations[0].PONumber;
          this.order.PODate = this.quotations[0].PODate;
          this.order.AddressExtension = this.quotations[0].AddressExtension;
          this.order.FreightCharge = Number(this.quotations[0].FreightCharge);
          this.order.PaymentGroupCode = this.quotations[0].PaymentGroupCode
          this.order.SalesPersonCode = this.quotations[0].SalesPersonCode
          // const newArray = this.bridgeService2.replaceKeyInArray(this.quotations[0].DocumentLines, 'TaxRate', 'Tax');
          // this.quotations[0].DocumentLines = newArray;
          this.calculatitonFuntion(this.quotations[0].DocumentLines,'Quot');
          this.selectChangeHandlerItem(this.order.CardCode,'Quot');
          setTimeout(() => this.isdataLoading = false, 2000)
        })
    }



    changeCal(){
      this.calculatitonFuntion(this.QuatItems,'cal');
    }

    calculatitonFuntion(NewArr:any,Type?:any){
      console.log(NewArr)
      var totalamount:any = 0;
      if(Type == 'Quot'){
        this.QuatItems = [];
        for (let i = 0; i < NewArr.length; i++) {
          if(Number(NewArr[i].OpenQuantity) != 0){
          this.QuatItems.push({
            id: NewArr[i].id,
            Quantity: Number(NewArr[i].OpenQuantity),
            UnitPrice: NewArr[i].UnitPrice,
            DueDate:NewArr[i].DueDate,
            LineNum:NewArr[i].LineNum,
            DiscountPercent: NewArr[i].DiscountPercent,
            ItemCode: NewArr[i].ItemCode,
            ItemDescription: NewArr[i].ItemDescription,
            TaxCode: NewArr[i].TaxCode,
            TaxRate: NewArr[i].TaxRate || 0,
          });
        }
        }
      }
      else if(Type != 'cal'){
      this.QuatItems = [];
      for (let i = 0; i < NewArr.length; i++) {
        this.QuatItems.push({
          id: NewArr[i].id,
          Quantity: NewArr[i].Quantity,
          UnitPrice: NewArr[i].UnitPrice,
          DueDate:NewArr[i].DueDate,
          LineNum:NewArr[i].LineNum,
          DiscountPercent: NewArr[i].DiscountPercent,
          ItemCode: NewArr[i].ItemCode,
          ItemDescription: NewArr[i].ItemDescription,
          TaxCode: NewArr[i].TaxCode,
          TaxRate: NewArr[i].TaxRate || 0,
        });
      }
    }


      this.order.DocumentLines = this.QuatItems;
      this.CountItem = this.QuatItems.length
      for (let i = 0; i < this.QuatItems.length; i++) {
        delete this.QuatItems[i]['id'];
        this.QuatItems[i].id = this.QuatItems[i].Oid;
        var basic = Number(this.QuatItems[i].Quantity) * Number(this.QuatItems[i].UnitPrice);
        var afterfdis = basic - (basic * (Number(this.QuatItems[i].DiscountPercent) / 100))
        var aftersdis = afterfdis - (afterfdis * (Number(this.order.DiscountPercent) / 100))
        var total = aftersdis + (aftersdis * (Number(this.QuatItems[i].TaxRate) / 100))
        totalamount += total;
      }
      this.total_Amount = totalamount.toFixed(2);
      if(this.order.FreightCharge != ''){
      this.total_Amount = Number(this.total_Amount) + Number(this.order.FreightCharge);
      }
      this.total_Amount =  Number(this.total_Amount).toFixed(2);
    }





    getBridge(): void {
      this.bridgeService2.getAll().subscribe(
        (data: Bridge[]) => {
          this.bridgess = data;
          for (let i = 0; i < this.bridgess.length; i++) {
            if (this.bridgess[i]['SalesEmployeeCode'] == '-1') {
              this.bridgess.splice(i, 1);
            }
            if (this.bridgess[i]['SalesEmployeeCode'] == '') {
              this.bridgess.splice(i, 1);
            }
          }

        },
        (err) => {
          console.log(err);
          this.error = err;
        }
      );
    }
    getIndustory(): void {
      this.bridgeService2.getIndustorydata().subscribe(
        (data: Industory[]) => {
          this.industorys = data;

        },
        (err) => {
          console.log(err);
          this.error = err;
        }
      );
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
    selectedDay: any;

    filterVal: any = "";
    selectChangeHandler(event: any) {
      // this.selectedDay = event.target.value;
      // this.code = this.selectedDay.split(',');
      this.filterVal = this.countrys.filter((option: any) => {

        return option.Code == event
      });


      // console.log(this.filterVal);
      this.code[0] = this.filterVal[0].Code;
      this.code[1] = this.filterVal[0].Name;
      this.order.AddressExtension.U_BCOUNTRY = this.code[1]
      this.getState(this.code[0]);
    }
    selectedDayState: any;
    codeState: any[] = [];
    selectChangeHandlerState(event: any) {

      this.filterVal = this.statess.filter(($option: any) => {
        // console.log($option.Code)
        // console.log((event.target as HTMLInputElement).value ?? event);
        return $option.Code === event
      });
      // console.log("qer", this.filterVal);
      this.codeState[0] = this.filterVal[0].Code;
      this.codeState[1] = this.filterVal[0].Name;
      this.order.AddressExtension.U_BSTATE = this.codeState[1]
      // console.log("qer1", this.order.AddressExtension.U_BSTATE);
      // this.selectedDayState = event.target.value;
      // this.codeState = this.selectedDayState.split(',');
    }

    getState(evt: any) {
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
    selectedDay2: any;
    code2: any[] = ['IN', 'India'];
    selectChangeHandler2(event: any) {
      // this.selectedDay2 = event.target.value;
      // this.code2 = this.selectedDay2.split(',');
      this.filterVal = this.countrys.filter(($option: any) => $option.Code == event)[0];
      // console.log(this.filterVal);
      // console.log(this.filterVal.Name);

      this.code2[0] = this.filterVal.Code;
      this.code2[1] = this.filterVal.Name;
      // console.log('this.code2[0]',this.code2[0]);
      this.order.AddressExtension.U_SCOUNTRY = this.code2[1]
      this.getState2(this.code2[0]);
    }
    selectedDayState2: any;
    codeState2: any[] = [];
    selectChangeHandlerState2(event: any) {
      // this.selectedDayState2 = event.target.value;
      // this.codeState2 = this.selectedDayState2.split(',');

      this.filterVal = this.statess2.filter(($option: any) => $option.Code == event)[0];
      // console.log("qer6", this.filterVal);
      // this.selectedDayState2 = event.target.value;
      // this.codeState2 = this.selectedDayState2.split(',');
      this.codeState2[0] = this.filterVal.Code;
      this.codeState2[1] = this.filterVal.Name;
      this.order.AddressExtension.ShipToState = this.codeState2[0]
      this.order.AddressExtension.U_SSTATE = this.codeState2[1]
      // console.log("qer1", this.order.AddressExtension.U_SSTATE);
    }
    getState2(evt: any) {
      this.bridgeService2.getStatedata(evt).subscribe(
        (data: States[]) => {
          this.statess2 = data;

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
    getOpportunity(): void {
      this.isLoading = true;
      this.bridgeService2.getOpportunityShortdata().subscribe(
        (data: opportunity[]) => {
          this.isLoading = false;
          this.opportunitys = data;
          // console.log(data);

        },
        (err) => {
          this.isLoading = false;
          console.log(err);
          this.error = err;
        }
      );
    }

    public QuatItems: any[] = [];
    itemPageNo: number = 1;

    CategroyIDD:any = 0;
  getQuotationItem2(id:any): void {
    this.CategroyIDD = id;
    this.paginDisplay=false;
    $('#CateCate').hide();
    $('#cateITem').show();
    $('.toggle-show').hide();
    $('.toggle-show1').show();
    this.isLoading2 = true;
    this.bridgeService2.getItemByPagination(this.pagination2, this.searchValue2, this.CategroyIDD, this.order_by_field2, this.order_by_value2).subscribe(
      (data: any) => {
        this.items = data.data;
        this.totalCount = data.meta.count;
        this.isLoading2 = false;
        if (this.pagination2.maxItem != 'All') {
          this.startind = ((this.pagination2.PageNo - 1) * Number(this.pagination2.maxItem)) + 1;
          this.endind = ((this.pagination2.PageNo - 1) * Number(this.pagination2.maxItem)) + Number(this.pagination2.maxItem);
          if (this.endind > this.totalCount) {
            this.endind = this.totalCount;
          }
          this.pagination2.PageShow = Number(this.pagination2.maxItem);
        }
        else {
          this.isLoading2 = false;
          this.startind = 1;
          this.endind = this.totalCount;
          this.pagination2.PageShow = Number(this.totalCount);
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
    RowPerPage2() {
      this.pagination2.PageNo = 1;
      this.getQuotationItem2(this.CategroyIDD);
    }
  
    pageChanged2(event:any){
      this.pagination2.PageNo = event;
      this.getQuotationItem2(this.CategroyIDD);
    }
    emptySeach2(){
      this.searchValue = '';
      this.RowPerPage2();
    }

      categorys:any[]=[]
      getQuotationItem(): void {
        this.isLoading = true;
        this.bridgeService2.getItemCateByPagination(this.pagination,this.searchValue,this.order_by_field,this.order_by_value).subscribe(
          (data: any) => {
            this.categorys = data.data;
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
              this.startind = this.totalCount;
            }
          },
          (err) => {
            console.log(err);
            this.isLoading = false;
            this.error = err;
          }
        );
      }
    
      RowPerPage() {
        this.pagination.PageNo = 1;
        this.getQuotationItem();
      }
    
      pageChanged(event:any){
        this.pagination.PageNo = event;
        this.getQuotationItem();
      }
      emptySeach(){
        this.searchValue = '';
        this.RowPerPage();
      }

    ItemNAme: any;
    ItemQty: any;
    ItemDis: any;
    ItemId: any;
    ItemCode: any;
    ItemPrice: any;
    ItemDueDate:any;
    TaxCode: any;
    TaxRate: any;
    open(content: any, item: any) {
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
      // console.log('----item---',item);
      this.ItemId = item.id;
      this.ItemNAme = item.ItemName;
      this.ItemQty = 1;
      this.ItemDis =  item.Discount;
      this.ItemCode = item.ItemCode;
      this.ItemPrice = item.UnitPrice;
      this.ItemDueDate = '';
      this.TaxCode = item.TaxCode;
      this.TaxRate = item.TaxRate;
    }
    // addItemType: string = 'paid';
    add_items() {
      $('#add_quat').hide();
      $('#select_item').show();
      $('#CateCate').show();
    $('#cateITem').hide();
      $('#selected_item').hide();

      $('.toggle-show').show();
      $('.toggle-show1').hide();
    }

    getValues(obj: {}) {
      return Object.values(obj);
    }
    back() {
      $('#add_quat').show();
      $('#select_item').hide();
      $('#selected_item').hide();
    }
    back2() {
      this.paginDisplay = true;
      this.getQuotationItem();
      $('#add_quat').hide();
      $('#select_item').show();
      $('#CateCate').show();
    $('#cateITem').hide();
      $('#selected_item').hide();

      $('.toggle-show').show();
      $('.toggle-show1').hide();
    }

    showitem() {
      if (this.CountItem == 0) {
        $('#add_quat').hide();
        $('#select_item').show();
        $('#selected_item').hide();


        $('#CateCate').show();
        $('#cateITem').hide();
        $('.toggle-show').show();
        $('.toggle-show1').hide();
      } else {
        $('#add_quat').hide();
        $('#select_item').hide();
        $('#selected_item').show();
      }
    }


    editItemArray(content: any, item: any) {
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
      console.log('item edit',item);
      this.ItemId = item.id;
      this.ItemNAme = item.ItemDescription;
      this.ItemQty = item.Quantity;
      this.ItemDis = item.DiscountPercent;
      this.ItemCode = item.ItemCode;
      this.ItemPrice = item.UnitPrice;
      this.ItemDueDate = item.DueDate;
      this.TaxCode = item.TaxCode;
      this.TaxRate = item.TaxRate;
    }

    UpdateQuotationItem(f: NgForm) {
      f = this.bridgeService2.GlobaleTrimFunc(f);
      if (!/^[0-9]*$/.test(this.ItemDis) || !/^[0-9]*$/.test(this.ItemQty) || !/^[0-9]*$/.test(this.TaxRate)) {
        this._NotifierService.showError('Invalid input');
      }
      else{
      $('#add_quat').hide();
      $('#select_item').hide();
      $('#selected_item').show();

      this.CountItem = this.QuatItems.length;
      // console.log('this.CountItem',this.CountItem);
      //;

      if (this.CountItem == 0) {
        // ;
        this.QuatItems.push({
          id: this.QuatItems.length + 1,
          Quantity: this.ItemQty,
          UnitPrice: this.ItemPrice,
          DueDate:this.ItemDueDate,
          DiscountPercent: this.ItemDis,
          ItemCode: this.ItemCode,
          ItemDescription: this.ItemNAme,
          TaxCode: this.TaxCode,
          TaxRate: this.TaxRate || 0,
        });
        // console.log('this.QuatItems when count is zero',this.QuatItems);
      } else {
        //;
        var check: boolean = false;
        for (let i = 0; i < this.QuatItems.length; i++) {
          if (this.ItemCode == this.QuatItems[i]['ItemCode']) {
            check = false;
            this.QuatItems[i]['Quantity'] = this.ItemQty;
            this.QuatItems[i]['DiscountPercent'] = this.ItemDis;
            this.QuatItems[i]['TaxRate'] = this.TaxRate;
            //;
            break;
          } else {
            check = true;
          }
        }
        if (check) {
          this.QuatItems.push({
            id: this.QuatItems.length + 1,
            Quantity: this.ItemQty,
            UnitPrice: this.ItemPrice,
            DueDate:this.ItemDueDate,
            DiscountPercent: this.ItemDis,
            ItemCode: this.ItemCode,
            ItemDescription: this.ItemNAme,
            TaxCode: this.TaxCode,
            TaxRate: this.TaxRate || 0,
          });
        }
      }

      this.modalService.dismissAll();
    }
    }

    add_qty(item: number) {
      for (let i = 0; i < this.QuatItems.length; i++) {
        if (item == this.QuatItems[i]['ItemCode']) {
          if (this.QuatItems[i]['Quantity'] < 10000000) {
          this.QuatItems[i]['Quantity'] += 1;
          break;
        }
        else {
          this._NotifierService.showError('You can not take value grater then 10000000');
        }
        }
      }
    }

    remove_array(item: number) {
      this.QuatItems.splice(item, 1);
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

    CountItem: Number = 0;
    total_Amount: any;
    sendarray() {
      var totalamount:any = 0;
      $('#add_quat').show();
      $('#select_item').hide();
      $('#selected_item').hide();
      for (let i = 0; i < this.QuatItems.length; i++) {
        delete this.QuatItems[i]['id'];
        var basic = Number(this.QuatItems[i].Quantity) * Number(this.QuatItems[i].UnitPrice);
        var afterfdis = basic - (basic * (Number(this.QuatItems[i].DiscountPercent) / 100))
        var aftersdis = afterfdis - (afterfdis * (Number(this.order.DiscountPercent) / 100))
        var total = aftersdis + (aftersdis * (Number(this.QuatItems[i].TaxRate) / 100))
        totalamount += total;
      }
      if(this.isEdit){
        for (let i = 0; i < this.QuatItems.length; i++) {
          this.QuatItems[i]['id'] = this.QuatItems[i]['Oid'];
         // console.log('this.QuatItems test',this.QuatItems[i]['Oid']);
          if(this.QuatItems[i]['id'] == undefined){
            this.QuatItems[i]['id'] = '';
          }
        }
      }
      this.total_Amount = totalamount.toFixed(2);
      if(this.order.FreightCharge != ''){
        this.total_Amount = Number(this.total_Amount) + Number(this.order.FreightCharge);
        }
        this.total_Amount =  Number(this.total_Amount).toFixed(2);
      this.order.DocumentLines = this.QuatItems;
      this.CountItem = this.order.DocumentLines.length;
      // console.log(this.total_Amount);
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


    contactPersoneList: any;
    selectedDayItem: string = '';
    CurrentBranch: any;


    selectChangeHandlerItem(event: any,Type?:any) {

      this.isdataLoading = true;
      this.bridgeService2.getOneCustomerdata(event).subscribe(
        (data: any) => {

          this.order.CardCode = data[0]['CardCode'];
          this.order.CardName = data[0]['CardName'];
          this.selectedDayItem = data[0]['CardCode'];

          this.getBranch(data[0]['CardCode']);
          this.bridgeService2.getContactPersone(data[0]['CardCode']).subscribe(
            (data: any) => {
              this.contactPersoneList = data;
              this.order.ContactPersonCode =
                this.contactPersoneList[0]['InternalCode'];
            });
           this.CurrentBranch = data[0]['BPLID'];

           if(Type != 'Quot'){
          this.BP_Detailsdata = data
          this.order.AddressExtension.BillToId = String(this.BP_Detailsdata[0].BPAddresses[1].id)
          this.order.AddressExtension.ShipToId = String(this.BP_Detailsdata[0].BPAddresses[1].id)
          this.order.PaymentGroupCode =  String(this.BP_Detailsdata[0].PayTermsGrpCode[0].GroupNumber)
          this.order.SalesPersonCode = this.BP_Detailsdata[0].SalesPersonCode[0].SalesEmployeeCode;

          this.order.AddressExtension.BillToBuilding = this.BP_Detailsdata[0].BPAddresses[1].AddressName;
          this.order.AddressExtension.BillToZipCode = this.BP_Detailsdata[0].BPAddresses[1].ZipCode;
          this.order.AddressExtension.BillToCountry = this.BP_Detailsdata[0].BPAddresses[1].Country;
          this.order.AddressExtension.U_BCOUNTRY = this.BP_Detailsdata[0].BPAddresses[1].U_COUNTRY;
          this.order.AddressExtension.BillToState = this.BP_Detailsdata[0].BPAddresses[1].State;
          this.order.AddressExtension.U_BSTATE = this.BP_Detailsdata[0].BPAddresses[1].U_STATE;
          this.order.AddressExtension.BillToCity = this.BP_Detailsdata[0].BPAddresses[1].City;
          this.order.AddressExtension.U_SHPTYPB = this.BP_Detailsdata[0].BPAddresses[1].U_SHPTYP;
          this.order.AddressExtension.BillToStreet = this.BP_Detailsdata[0].BPAddresses[1].Street;

          this.order.AddressExtension.ShipToBuilding = this.BP_Detailsdata[0].BPAddresses[1].AddressName;
          this.order.AddressExtension.ShipToZipCode = this.BP_Detailsdata[0].BPAddresses[1].ZipCode;
          this.order.AddressExtension.ShipToCountry = this.BP_Detailsdata[0].BPAddresses[1].Country;
          this.order.AddressExtension.U_SCOUNTRY = this.BP_Detailsdata[0].BPAddresses[1].U_COUNTRY;
          this.order.AddressExtension.ShipToState = this.BP_Detailsdata[0].BPAddresses[1].State;
          this.order.AddressExtension.U_SSTATE = this.BP_Detailsdata[0].BPAddresses[1].U_STATE;
          this.order.AddressExtension.ShipToCity = this.BP_Detailsdata[0].BPAddresses[1].City;
          this.order.AddressExtension.U_SHPTYPS = this.BP_Detailsdata[0].BPAddresses[1].U_SHPTYP;
          this.order.AddressExtension.ShipToStreet = this.BP_Detailsdata[0].BPAddresses[1].Street;
           }

          setTimeout(() => this.isdataLoading = false, 2000)
        });

    }


    setAddress(id:any,type:any){
      var data:any;
      this.bridgeService2.getOneBpBranch1(id).subscribe((res: any[]) => {
        if (Object(res)['status'] == "200") {
          data = Object(res)['data'][0];
      if(type == 'billing'){
        this.order.AddressExtension.BillToBuilding = data.AddressName;
        this.order.AddressExtension.BillToZipCode = data.ZipCode;
        this.order.AddressExtension.BillToCountry = data.Country;
        this.order.AddressExtension.U_BCOUNTRY = data.U_COUNTRY;
        this.order.AddressExtension.BillToState = data.State;
        this.order.AddressExtension.U_BSTATE = data.U_STATE;
        this.order.AddressExtension.BillToCity = data.City;
        this.order.AddressExtension.U_SHPTYPB = data.U_SHPTYP;
        this.order.AddressExtension.BillToStreet = data.Street;
      }
      else{
        this.order.AddressExtension.ShipToBuilding = data.AddressName;
        this.order.AddressExtension.ShipToZipCode = data.ZipCode;
        this.order.AddressExtension.ShipToCountry = data.Country;
        this.order.AddressExtension.U_SCOUNTRY = data.U_COUNTRY;
        this.order.AddressExtension.ShipToState = data.State;
        this.order.AddressExtension.U_SSTATE = data.U_STATE;
        this.order.AddressExtension.ShipToCity = data.City;
        this.order.AddressExtension.U_SHPTYPS = data.U_SHPTYP;
        this.order.AddressExtension.ShipToStreet = data.Street;
      }
    }

    else {
      this._NotifierService.showError(Object(res)['message']);
      this.isLoading = false;
    }
    },(err: string) => {
      this.error = err;
    }
  );
    }

    total_beforepreview: any = 0;
    total_afterpreview:any = 0;
    total_after_taxpreview:any = 0;
    tax_Valuepreview:any = 0;
    total_Amountpreview:any = 0;
    openPrviewLg(content: any, f: NgForm) {
      f = this.bridgeService2.GlobaleTrimFunc(f);

      this.modalService.open(content, { modalDialogClass: 'preview-dialog', size: 'xl' });
      this.previewData = this.order;
      var totalamount:any = 0;
      this.total_beforepreview = 0;
      this.total_afterpreview = 0;
      this.total_after_taxpreview = 0;
      this.tax_Valuepreview = 0;
      this.total_Amountpreview = 0;
      for (let i = 0; i < this.previewData.DocumentLines.length; i++) {
        var basic = Number(this.previewData['DocumentLines'][i].Quantity) * Number(this.previewData['DocumentLines'][i].UnitPrice);
        var afterfdis = basic - (basic * (Number(this.previewData['DocumentLines'][i].DiscountPercent) / 100))
        var aftersdis = afterfdis - (afterfdis * (Number(this.previewData.DiscountPercent) / 100))
        var total = aftersdis + (aftersdis * (Number(this.previewData['DocumentLines'][i].TaxRate) / 100))
        totalamount += total;
        this.total_afterpreview += afterfdis;
        this.total_after_taxpreview += aftersdis;
        this.tax_Valuepreview +=  (aftersdis * (Number(this.previewData['DocumentLines'][i].TaxRate) / 100));
      }
      this.total_Amountpreview = totalamount.toFixed(2);
    }

    OrderCancel() {
      this.isLoading = false;
      this.modalService.dismissAll();
    }
    previewData: any;
    totalbeforediscount: any;






    addorder(f: NgForm) {

      f = this.bridgeService2.GlobaleTrimFunc(f);
      this.resetAlerts();
      for (let [keys, value] of Object.entries(f.value)) {
        // let numKey = ["U_LEADID"];
        // if(numKey.includes(keys)){
        //   f.value[keys] = 0;
        // }
        if (!!!f.value[keys]) {
          f.value[keys] = "";

        }
      }
      if (f.valid) {
        if(this.order.FreightCharge == ''){
          this.order.FreightCharge = 0
        }

        this.order.QuotationID = this.order.U_QUOTID;
        this.order.DocTotal = this.total_Amount;
        if (this.CountItem == 0) {
          this._NotifierService.showError('please Select Atleast One Item');
          $('.item-list-area').css('border', '2px solid red');
          $('.item-list-area').css(
            'box-shadow',
            '0 10px 15px 0 rgb(255 226 225), 0 15px 30px 0 rgb(251 159 161)'
          );
        } else {
          this.isLoading = true;
          // const newArray = this.bridgeService2.replaceKeyInArray(this.order.DocumentLines, 'Tax', 'TaxRate');
          // this.order.DocumentLines = newArray;
          $('.item-list-area').css('border', 'none');
          $('.item-list-area').css('box-shadow', 'none');
          this.order = this.bridgeService2.replaceNullWithSpace(this.order);
          this.bridgeService2.addEditInvoice(this.order,this.isEdit).subscribe(
            (res: Orders) => {
              if (Object(res)['status'] == '200') {
                this._NotifierService.showSuccess(this.isEdit?this.Headingss[0].leftheading+" "+this.Headingss[0].heading104+" "+this.Headingss[0].heading106:this.Headingss[0].leftheading+" "+this.Headingss[0].heading103+" "+this.Headingss[0].heading106);
                this.modalService.dismissAll();
                  this.router.navigate(['/invoice']);
                  this.isLoading = false;
              } else {
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
        }
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

    showshipaddress() {
      let num = (document.getElementById('showshipaddress') as HTMLInputElement);
      if (num.checked) {
        $('.showshipaddress').show();
        this.showshipaddressBool = true;
      } else {
        $('.showshipaddress').hide();
        this.showshipaddressBool = false;
      }
    }

    backClicked() {
      this._location.back();
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
