import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Bridge } from '../bridge';
import { BridgeService } from '../modules/service/bridge.service';
import { BusinessPartners } from '../businesspartners';
import { opportunity } from '../opportunity';
import { HeadingServicesService } from '../modules/service/heading-services.service';
import { NotiferService } from '../modules/service/helpers/notifer.service';
import { Customer, Industory, Country, States, PaymentTerm } from '../customer';
import { Quotation, EditQuotation, QuotationItem } from '../quotation';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Location } from '@angular/common';
import { Item } from '../warehouse';
declare var $: any;


@Component({
  selector: 'app-quotation-edit',
  templateUrl: './quotation-edit.component.html',
  styleUrls: ['./quotation-edit.component.css']
})
export class QuotationEditComponent implements OnInit {
  baseUrl2: any;
  searchValue: string = '';
  searchValue1:any;
  customers: Customer[] = [];
  industorys: Industory[] = [];
  countrys: Country[] = [];
  statess: States[] = [];
  statess2: States[] = [];
  businesspartners: BusinessPartners[] = [];
  opportunitys: opportunity[] = [];
  bridgess: Bridge[] = [];
  quotationsitem: QuotationItem[] = [];
  isLoading2: boolean = false;
  quotations2: Quotation[] = [];
  quotations: EditQuotation[] = [];
  savedModules: any[] = [];

  closeResult = '';
  quotation: EditQuotation = {
    CreatedByPerson:sessionStorage.getItem('SalesEmployeeCode'),
    is_draft:'',
    DocTotal:'',
    id: '', U_QUOTNM: '', TaxDate: '',
    DocDueDate: '',
    ContactPersonCode: '',
    DiscountPercent: '0',
    DocDate: '',
    CardCode: '',
    CardName: '',
    Comments: '',
    SalesPersonCode: '',
    PRID:'',
    BPLID:'',
    Attach:'',
    OpportunityID:'',
    FreightCharge:'',
    PaymentGroupCode:'',
    U_OPPID: '',
    U_OPPRNM: '',
    AddressExtension: {
      BillToId:'',
      ShipToId:'',
      BillToBuilding: '',
      ShipToState: '',
      BillToCity: '',
      ShipToCountry: '',
      BillToZipCode: '',
      ShipToStreet: '',
      BillToState: '',
      ShipToZipCode: '',
      BillToStreet: '',
      ShipToBuilding: '',
      ShipToCity: '',
      BillToCountry: '',
      U_SCOUNTRY: '',
      U_SSTATE: '',
      U_SHPTYPB: '',
      U_BSTATE: '',
      U_BCOUNTRY: '',
      U_SHPTYPS: '',
    },
    DocumentLines: '',
    CreateDate: '',
    CreateTime: '',
    UpdateDate: this.HeadingServices.getDate(),
    UpdateTime: this.HeadingServices.getTime()
  };
  error = '';
  success = '';
  role: any;
  UserId: any;
  reportingTo: any;
  UserName: any;
  isLoading: boolean = false;
  dummyarray: any;
  // basceurl = "http://103.234.187.199:8050/businesspartner/employee/";

  CardCode: any
  CountItem: Number = 0;
  idd: any;
  code_State1: any;
  code_BState1: any;
  code_State2: any;
  code_BState2: any;

  selectedDay2: any;
  code2: any[]=[];
  codeType2: any;
  code12: any;
  selectedDayState2: any;
  codeState2: any[] =[];
  codeState2_: any;

  selectedDay: any;
  code: any[] = [];
  codeType1: any;
  code1: any;
  // selectedDayState: any;
  // codeState: any;
  codeState_: any;
  codeState1: any;

  resetAlerts() {
    this.error = '';
    this.success = '';
  }
  ShippingType:any;
  branchs: any[] = [];
  paymentterms: PaymentTerm[] = [];
  customertype: any[] = [];
  Headingss: any[] = [];
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
  constructor(private modalService: NgbModal, private bridgeService2: BridgeService,
    public HeadingServices: HeadingServicesService,
    private _NotifierService: NotiferService, private router: Router, private http: HttpClient, private router2: ActivatedRoute,
    private _location: Location) {
    this.baseUrl2 = this.bridgeService2.baseUrl2;

  }

  ngOnInit(): void {
    if (!this.HeadingServices.isModuleView(5) || !this.HeadingServices.isModuleViewedit(5)) {
      this.router.navigate(['/dashboard']);
    }
    this.bridgeService2.autoCall();
    this.ShippingType=this.bridgeService2.ShippingType;

    this.UserName = sessionStorage.getItem('UserName');
    this.UserId = sessionStorage.getItem('UserId');
    this.role = sessionStorage.getItem('role');
    this.reportingTo = sessionStorage.getItem('reportingTo');
    this.Headingss = this.HeadingServices.getModule5();
    if (this.UserName == undefined) {
      this.router.navigate(['/login']);
    }
    this.getBridge();
    this.getIndustory();
    this.getCountry();
    this.getBusinessPartmers();
    this.getOpportunity();
    this.getQuotationItem();
    this.getPaymentTerms();
    this.getQuotation();
    this.getCustomerTypeList();

    const savedModulesString = sessionStorage.getItem('savedModules');
    if (savedModulesString) {
      this.savedModules = JSON.parse(savedModulesString);
    }


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
  getBranch(CardCode:any){
    this.bridgeService2.getCustomerBranchdata(CardCode).subscribe((data: any[]) => {
      this.branchs = data;

    },(err: string) => {
      this.error = err;
    }
  );

}
setAddress(id:any,type:any){
  var data:any;
  this.bridgeService2.getOneBpBranch1(id).subscribe((res: any[]) => {
    if (Object(res)['status'] == "200") {
      data = Object(res)['data'][0];
  if(type == 'billing'){
    this.quotation.AddressExtension.BillToBuilding = data.AddressName;
    this.quotation.AddressExtension.BillToZipCode = data.ZipCode;
    this.quotation.AddressExtension.BillToCountry = data.Country;
    this.quotation.AddressExtension.U_BCOUNTRY = data.U_COUNTRY;
    this.quotation.AddressExtension.BillToState = data.State;
    this.quotation.AddressExtension.U_BSTATE = data.U_STATE;
    this.quotation.AddressExtension.BillToCity = data.City;
    this.quotation.AddressExtension.U_SHPTYPB = data.U_SHPTYP;
    this.quotation.AddressExtension.BillToStreet = data.Street;
  }
  else{
    this.quotation.AddressExtension.ShipToBuilding = data.AddressName;
    this.quotation.AddressExtension.ShipToZipCode = data.ZipCode;
    this.quotation.AddressExtension.ShipToCountry = data.Country;
    this.quotation.AddressExtension.U_SCOUNTRY = data.U_COUNTRY;
    this.quotation.AddressExtension.ShipToState = data.State;
    this.quotation.AddressExtension.U_SSTATE = data.U_STATE;
    this.quotation.AddressExtension.ShipToCity = data.City;
    this.quotation.AddressExtension.U_SHPTYPS = data.U_SHPTYP;
    this.quotation.AddressExtension.ShipToStreet = data.Street;
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
  getBridge(): void {
    this.isLoading=true;
    this.bridgeService2.getAll().subscribe(
      (data: Bridge[]) => {
        this.isLoading=false;
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
    this.isLoading=true;
    this.bridgeService2.getIndustorydata().subscribe(
      (data: Industory[]) => {
        this.isLoading=false;
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
  filterVal: any;

  selectChangeHandler(event: any) {
    this.filterVal = this.countrys.filter(($option: any) => $option.Code == event)[0];
   // console.log(this.filterVal);
    this.code[0] = this.filterVal.Code;
    this.code[1] = this.filterVal.Name;
    this.quotation.AddressExtension.U_BCOUNTRY = this.code[1]
    this.getState();
    // this.quotation.AddressExtension.U_BSTATE="Select State"
  }
  selectedDayState: any;
  codeState: any[] = [];
  selectChangeHandlerState(event: any) {
   // console.log(this.statess)
    this.filterVal = this.statess2.filter(($option: any) => $option.Code == event)[0];
   // console.log(this.filterVal)
    this.codeState[0] = this.filterVal.Code;
    this.codeState[1] = this.filterVal.Name;
    this.quotation.AddressExtension.U_BSTATE = this.codeState[1]
   // console.log("qer333", this.quotation.AddressExtension.U_BSTATE);
  }
  getState(): void {
    this.bridgeService2.getStatedata(this.code[0]).subscribe(
      (data: States[]) => {
        this.statess2 = data;

      },
      (err) => {
        console.log(err);
        this.error = err;
      }
    );
  }

  // selectedDay2: any;
  // code2: any[]= [];
  selectChangeHandler2(event: any) {
    this.filterVal = this.countrys.filter(($option: any) => $option.Code == event)[0];
   // console.log(this.filterVal);
    this.code2[0] = this.filterVal.Code;
    this.code2[1] = this.filterVal.Name;
    this.quotation.AddressExtension.U_SCOUNTRY = this.code2[1]
    this.getState2();
    this.quotation.AddressExtension.U_SSTATE = "Select State"
  }

  selectChangeHandlerState2(event: any) {

    this.filterVal = this.statess.filter(($option: any) => $option.Code == event)[0];
    this.codeState2[0] = this.filterVal.Code;
    this.codeState2[1] = this.filterVal.Name;
    this.quotation.AddressExtension.ShipToState = this.codeState2[0]
    this.quotation.AddressExtension.U_SSTATE = this.codeState2[1]
   // console.log("qer1", this.quotation.AddressExtension.U_SSTATE);

  }
  getState2(): void {
    this.bridgeService2.getStatedata(this.code2[0]).subscribe(
      (data: States[]) => {
        this.statess = data;

      },
      (err) => {
        console.log(err);
        this.error = err;
      }
    );
  }




  getBusinessPartmers(): void {
    this.isLoading=true;
    this.bridgeService2.getBusinessPartmersShortdata().subscribe(
      (data: BusinessPartners[]) => {
        this.isLoading=false;
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
        //  console.log(this.opportunitys);

      },
      (err) => {
        this.isLoading = false;
        console.log(err);
        this.error = err;
      }
    );
  }



  getQuotation(): void {
    this.isLoading=true;
    this.idd = this.router2.snapshot.params.id;

    this.bridgeService2.getOneQuotationdata(this.idd).subscribe(
      (data: Quotation[]) => {
        this.isLoading=false;
        var totalamount:any = 0;
        this.quotations2 = data;

        this.quotation.TaxDate = this.quotations2[0].TaxDate;
        this.quotation.is_draft = this.quotations2[0].is_draft;
        this.quotation.DocDueDate = this.quotations2[0].DocDueDate;
        this.quotation.FreightCharge = Number(this.quotations2[0].FreightCharge);
        // if (this.quotations2[0].ContactPersonCode.length) {
          // this.quotation.ContactPersonCode = this.quotations2[0].ContactPersonCode[0].InternalCode;
          this.quotation.ContactPersonCode = String(this.quotations2[0].ContactPersonCode);
          // this.quotation.ContactPersonCode = String(this.quotations2[0].ContactPersonCode[0].id);


        // }

        this.quotation.DiscountPercent = Number(this.quotations2[0].DiscountPercent);
        this.quotation.DocDate = this.quotations2[0].DocDate;
        this.quotation.CardCode = this.quotations2[0].CardCode;
        this.quotation.BPLID = this.quotations2[0].BPLID;

        this.getBranch(this.quotation.CardCode);
        this.quotation.CardName = this.quotations2[0].CardName;
        this.quotation.Comments = this.quotations2[0].Comments;
        this.quotation.SalesPersonCode = this.quotations2[0].SalesPersonCode;
        // this.quotation.SalesPersonCode = this.quotations2[0].SalesPersonCode[0].SalesEmployeeCode;
        this.quotation.U_OPPID = this.quotations2[0].U_OPPID;
        this.quotation.U_OPPRNM = this.quotations2[0].U_OPPRNM;
        this.quotation.DocumentLines = this.quotations2[0].DocumentLines;
        this.quotation.CreateDate = this.quotations2[0].CreateDate;
        this.quotation.CreateTime = this.quotations2[0].CreateTime;
        this.quotation.U_QUOTNM = this.quotations2[0].U_QUOTNM;
        this.quotation.PaymentGroupCode = this.quotations2[0].PaymentGroupCode;

        this.quotation.AddressExtension = this.quotations2[0].AddressExtension;
        this.codeType1 = this.quotations2[0].AddressExtension.ShipToCountry;
       // console.log(this.quotations2[0].AddressExtension.BillToCountry)
        this.quotation.AddressExtension.BillToCountry = this.quotations2[0].AddressExtension.BillToCountry;
        // this.codeType2 = this.quotations2[0].AddressExtension[0].BillToCountry;

        this.selectedDayState = this.quotations2[0].AddressExtension.U_BSTATE;

        this.codeState_ = this.quotations2[0].AddressExtension.BillToState;

        this.selectedDayState2 = this.quotations2[0].AddressExtension.U_SSTATE;


        this.codeState2_ = this.quotations2[0].AddressExtension.ShipToState;




        this.dummyarray = this.quotation.AddressExtension;
        // $('#BusinessPartner').attr('disabled', true);
        // // $('#BPLID').attr("disabled", true);
        // $('#SalesPersonCode').attr('disabled', true);
        // $('#opportunityName').attr('disabled', true);
        // const newArray = this.bridgeService2.replaceKeyInArray(this.quotation.DocumentLines, 'TaxRate', 'Tax');
        // this.quotation.DocumentLines = newArray;
        for (let i = 0; i < this.quotation.DocumentLines.length; i++) {
          this.QuatItems.push({
            id: this.QuatItems.length + 1,
            Oid: this.quotation.DocumentLines[i].id,
            Quantity: this.quotation.DocumentLines[i].Quantity,
            UnitPrice: this.quotation.DocumentLines[i].UnitPrice,
            DueDate: this.quotation.DocumentLines[i].DueDate,
            DiscountPercent: this.quotation.DocumentLines[i].DiscountPercent,
            ItemCode: this.quotation.DocumentLines[i].ItemCode,
            ItemDescription: this.quotation.DocumentLines[i].ItemDescription,
            TaxCode: this.quotation.DocumentLines[i].TaxCode,
            TaxRate: this.quotation.DocumentLines[i].TaxRate||0,
          });
        }

        for (let i = 0; i < this.QuatItems.length; i++) {
          delete this.QuatItems[i]['id'];
          var basic = Number(this.QuatItems[i].Quantity) * Number(this.QuatItems[i].UnitPrice);
      var afterfdis = basic - (basic * (Number(this.QuatItems[i].DiscountPercent) / 100))
      var aftersdis = afterfdis - (afterfdis * (Number(this.quotation.DiscountPercent) / 100))
      var total = aftersdis + (aftersdis * (Number(this.QuatItems[i].TaxRate) / 100))
      totalamount += total;
    }
    this.total_Amount = totalamount.toFixed(2);
    if(this.quotation.FreightCharge != ''){
      this.total_Amount = Number(this.total_Amount) + Number(this.quotation.FreightCharge);
      }
      this.total_Amount =  Number(this.total_Amount).toFixed(2);

      // console.log(this.quotation)


        this.CountItem = this.quotations2[0].DocumentLines.length;
        this.quotation.id = String(this.quotations2[0].id);

        this.bridgeService2.getContactPersone(this.quotation.CardCode).subscribe(
          (data: any) => {
            this.contactPersoneList = data;
          });
        // this.http.post(this.baseUrl2 + '/businesspartner/employee/' + 'all', { "CardCode": this.quotation.CardCode }).toPromise().then((data: any) => {
        //   this.contactPersoneList = data['data'];
        // });


        this.bridgeService2.getStatedata(this.quotation.AddressExtension.BillToCountry).subscribe(
          (data: States[]) => {
            this.statess2 = data;
            // console.log(this.statess);

          },
          (err) => {
            console.log(err);
            this.error = err;
          }
        );
        // console.log(this.quotation.AddressExtension.BillToCountry);
        this.bridgeService2.getStatedata(this.quotation.AddressExtension.ShipToCountry).subscribe(
          (data: States[]) => {
            this.statess = data;
            // console.log(this.statess2);

          },
          (err) => {
            console.log(err);
            this.error = err;
          }
        );

      },
      (err) => {
        console.log(err);
        this.error = err;
      }
    );
  }


  public QuatItems: any[] = [];
  itemPageNo:number=1;

  CategroyIDD:any = 0;
  getQuotationItem2(id:any): void {
    this.CategroyIDD = id;
    this.paginDisplay = false;
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
  ItemDueDate:any;
  ItemId: any;
  ItemCode: any;
  ItemPrice: any;
  TaxCode: any;
  TaxRate:any;
  open(content: any, item: QuotationItem) {
    if(this.QuatItems.map(($item:any) => $item.ItemCode).includes(item.ItemCode)){
      return;
    }
    else{
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', modalDialogClass: 'modal-dialog-centered order-cards-modal' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });

    this.ItemId = item.id;
    this.ItemNAme = item.ItemName;
    this.ItemQty = 1;
    this.ItemDis = 0;
    this.ItemDueDate = '';
    this.ItemCode = item.ItemCode;
    this.ItemPrice = item.UnitPrice;
    this.TaxCode = item.TaxCode;
    this.TaxRate=0;

  }
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
// console.log('item',item);
    this.ItemId = item.id;
    this.ItemNAme = item.ItemDescription;
    this.ItemQty = item.Quantity;
    this.ItemDis = item.DiscountPercent;
    this.ItemDueDate = item.DueDate
    this.ItemCode = item.ItemCode;
    this.ItemPrice = item.UnitPrice;
    this.TaxCode = item.TaxCode;
    this.TaxRate = item.TaxRate;
  }
  ITemDataUpdate(event: any) {
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

    if (this.CountItem == 0) {
      this.QuatItems.push({
        id: this.QuatItems.length + 1,
        Quantity: this.ItemQty,
        UnitPrice: this.ItemPrice,
        DiscountPercent: this.ItemDis,
        DueDate:this.ItemDueDate,
        ItemCode: this.ItemCode,
        ItemDescription: this.ItemNAme,
        TaxCode: this.TaxCode,
        TaxRate: this.TaxRate||0,
      });

    }
    else {
      var check: boolean = false;
      for (let i = 0; i < this.QuatItems.length; i++) {
        if (this.ItemCode == this.QuatItems[i]['ItemCode']) {
          check = false;
          this.QuatItems[i]['Quantity'] = this.ItemQty;
          this.QuatItems[i]['DiscountPercent'] = this.ItemDis;
          this.QuatItems[i]['TaxRate'] = this.TaxRate;
          this.QuatItems[i]['DueDate'] = this.ItemDueDate;
          break;
        }
        else {
          check = true;
        }

      }
      if (check) {
        this.QuatItems.push({
          id: this.QuatItems.length + 1,
          Quantity: this.ItemQty,
          UnitPrice: this.ItemPrice,
          DiscountPercent: this.ItemDis,
          DueDate:this.ItemDueDate,
          ItemCode: this.ItemCode,
          ItemDescription: this.ItemNAme,
          TaxCode: this.TaxCode,
          TaxRate: this.TaxRate||0,
        });
      }
    }

    console.log(this.ItemDueDate)
    console.log(this.QuatItems)
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
  total_Amount:any;
  sendarray() {
    var totalamount:any = 0;
    $('#add_quat').show();
    $('#select_item').hide();
    $('#selected_item').hide();
    for (let i = 0; i < this.QuatItems.length; i++) {

      delete this.QuatItems[i]['id'];
      var basic = Number(this.QuatItems[i].Quantity) * Number(this.QuatItems[i].UnitPrice);
      var afterfdis = basic - (basic * (Number(this.QuatItems[i].DiscountPercent) / 100))
      var aftersdis = afterfdis - (afterfdis * (Number(this.quotation.DiscountPercent) / 100))
      var total = aftersdis + (aftersdis * (Number(this.QuatItems[i].TaxRate) / 100))
      totalamount += total;
    }
    this.total_Amount = totalamount.toFixed(2);
    if(this.quotation.FreightCharge != ''){
    this.total_Amount = Number(this.total_Amount) + Number(this.quotation.FreightCharge);
    }
    this.total_Amount =  Number(this.total_Amount).toFixed(2);


    // console.log(this.QuatItems)
    // console.log(this.quotation.DocumentLines);

    for (var x = 0; x < this.QuatItems.length; x++) {

      for (var y = 0; y < this.quotation.DocumentLines.length; y++) {

        if (this.QuatItems[x]['ItemCode'] == this.quotation.DocumentLines[y]['ItemCode']) {
          Object.assign(this.QuatItems[x], { id: this.quotation.DocumentLines[x].id }, { LineNum: this.quotation.DocumentLines[x].LineNum }, { QuotationID: this.quotation.DocumentLines[x].QuotationID });
        }
        else {
          // console.log(this.QuatItems[x]['ItemCode']);
          // console.log(this.quotation.DocumentLines[y]['ItemCode']);
        }
      }
    }

    this.CountItem = this.QuatItems.length;
    for (let i = 0; i < this.QuatItems.length; i++) {
      this.QuatItems[i]['id'] = this.QuatItems[i]['Oid'];
     // console.log('this.QuatItems test',this.QuatItems[i]['Oid']);
      if(this.QuatItems[i]['id'] == undefined){
        this.QuatItems[i]['id'] = '';
      }
    }
    this.quotation.DocumentLines = this.QuatItems;
    // console.log(this.QuatItems);
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
  cardco: any;
  CurrentBranch: any;


  selectChangeOpportunity(event: any) {
    this.isdataLoading = true;
    this.bridgeService2.getOneOpportunitydata(event?.id ?? event).subscribe(
      (data: any) => {
        this.quotation.U_OPPID = String(data[0]['id']);
        if(data[0].OppItem.length != 0){
          const newArray = this.bridgeService2.replaceKeyInArray(data[0].OppItem, 'Tax', 'TaxRate');
          data[0].OppItem = newArray;
          }
        this.calculatitonFuntion(data[0].OppItem);
        this.quotation.U_OPPRNM = data[0]['OpportunityName'];
        this.cardco = data[0]['CardCode'];
        this.selectChangeHandlerItem(this.cardco);


        this.quotation.SalesPersonCode = data[0]['SalesPerson'];
        $('#BusinessPartner').attr('disabled', true);
        $('#SalesPersonCode').attr('disabled', true);
      });

  }

  changeCal(){
    this.calculatitonFuntionOfDiscount(this.QuatItems);
  }

  calculatitonFuntionOfDiscount(NewArr:any){

    var totalamount:any = 0;
    this.quotation.DocumentLines = this.QuatItems;
    this.CountItem = this.QuatItems.length
    for (let i = 0; i < this.QuatItems.length; i++) {
      delete this.QuatItems[i]['id'];
      this.QuatItems[i]['id'] = this.QuatItems[i]['Oid'];
      var basic = Number(this.QuatItems[i].Quantity) * Number(this.QuatItems[i].UnitPrice);
      var afterfdis = basic - (basic * (Number(this.QuatItems[i].DiscountPercent) / 100))
      var aftersdis = afterfdis - (afterfdis * (Number(this.quotation.DiscountPercent) / 100))
      var total = aftersdis + (aftersdis * (Number(this.QuatItems[i].TaxRate) / 100))
      totalamount += total;
    }
    this.total_Amount = totalamount.toFixed(2);
    if(this.quotation.FreightCharge != ''){
    this.total_Amount = Number(this.total_Amount) + Number(this.quotation.FreightCharge);
    }
    this.total_Amount =  Number(this.total_Amount).toFixed(2);
  }

  calculatitonFuntion(NewArr:any){

    this.QuatItems = [];
    var totalamount:any = 0;
    for (let i = 0; i < NewArr.length; i++) {
      this.QuatItems.push({
        id: NewArr[i].id,
        Quantity: NewArr[i].Quantity,
        UnitPrice: NewArr[i].UnitPrice,
        DueDate:NewArr[i].DueDate,
        DiscountPercent: NewArr[i].DiscountPercent,
        ItemCode: NewArr[i].ItemCode,
        ItemDescription: NewArr[i].ItemDescription,
        TaxCode: NewArr[i].TaxCode,
        TaxRate: NewArr[i].TaxRate || 0,
      });
    }



    this.quotation.DocumentLines = this.QuatItems;
    this.CountItem = this.QuatItems.length
    for (let i = 0; i < this.QuatItems.length; i++) {
      delete this.QuatItems[i]['id'];
      var basic = Number(this.QuatItems[i].Quantity) * Number(this.QuatItems[i].UnitPrice);
      var afterfdis = basic - (basic * (Number(this.QuatItems[i].DiscountPercent) / 100))
      var aftersdis = afterfdis - (afterfdis * (Number(this.quotation.DiscountPercent) / 100))
      var total = aftersdis + (aftersdis * (Number(this.QuatItems[i].TaxRate) / 100))
      totalamount += total;
    }
    this.total_Amount = totalamount.toFixed(2);
    if(this.quotation.FreightCharge != ''){
    this.total_Amount = Number(this.total_Amount) + Number(this.quotation.FreightCharge);
    }
    this.total_Amount =  Number(this.total_Amount).toFixed(2);
  }
  contactPersoneList: any;
  selectedDayItem: string = '';
  quotationCardName: any;
  quotationCardCode: any;



  isdataLoading: boolean = false;
  BP_Detailsdata: any[] = [];

  selectChangeHandlerItem(event: any) {
    //console.log(event?.target?.value)
    this.isdataLoading = true;
    this.bridgeService2.getOneCustomerdata(event?.target?.value || event).subscribe(
      (data: any) => {
        // this.isdataLoading=false;


        this.quotation.CardCode = data[0]['CardCode'];
        this.quotation.CardName = data[0]['CardName'];
        // this.selectedDayItem = data[0]['CardCode'];
        // this.CurrentBranch = data[0]['BPLID'];
        this.getBranch(data[0]['CardCode']);
        this.bridgeService2.getContactPersone(data[0]['CardCode']).subscribe(
          (data: any) => {
            this.contactPersoneList = data;
            this.quotation.ContactPersonCode = this.contactPersoneList[0].InternalCode;

          });

        this.BP_Detailsdata = data
        console.log(data)
        // this.quotation.AddressExtension.BillToId = String(this.BP_Detailsdata[0].BPAddresses[0].id)
        this.quotation.AddressExtension.BillToId = String(this.BP_Detailsdata[0].BPAddresses[1].id)
        this.quotation.AddressExtension.ShipToId = String(this.BP_Detailsdata[0].BPAddresses[1].id)
        if(this.BP_Detailsdata[0].PayTermsGrpCode.length != 0){
        this.quotation.PaymentGroupCode =  String(this.BP_Detailsdata[0].PayTermsGrpCode[0].GroupNumber)
        }
        // this.quotation.SalesPersonCode = this.BP_Detailsdata[0].SalesPersonCode;
        if(this.BP_Detailsdata[0].BPAddresses.length != 0){
        this.quotation.AddressExtension.BillToBuilding = this.BP_Detailsdata[0].BPAddresses[1].AddressName;
        this.quotation.AddressExtension.BillToZipCode = this.BP_Detailsdata[0].BPAddresses[1].ZipCode;
        this.quotation.AddressExtension.BillToCountry = this.BP_Detailsdata[0].BPAddresses[1].Country;
        this.quotation.AddressExtension.U_BCOUNTRY = this.BP_Detailsdata[0].BPAddresses[1].U_COUNTRY;
        this.quotation.AddressExtension.BillToState = this.BP_Detailsdata[0].BPAddresses[1].State;
        this.quotation.AddressExtension.U_BSTATE = this.BP_Detailsdata[0].BPAddresses[1].U_STATE;
        this.quotation.AddressExtension.BillToCity = this.BP_Detailsdata[0].BPAddresses[1].City;
        this.quotation.AddressExtension.U_SHPTYPB = this.BP_Detailsdata[0].BPAddresses[1].U_SHPTYP;
        this.quotation.AddressExtension.BillToStreet = this.BP_Detailsdata[0].BPAddresses[1].Street;

        this.quotation.AddressExtension.ShipToBuilding = this.BP_Detailsdata[0].BPAddresses[1].AddressName;
        this.quotation.AddressExtension.ShipToZipCode = this.BP_Detailsdata[0].BPAddresses[1].ZipCode;
        this.quotation.AddressExtension.ShipToCountry = this.BP_Detailsdata[0].BPAddresses[1].Country;
        this.quotation.AddressExtension.U_SCOUNTRY = this.BP_Detailsdata[0].BPAddresses[1].U_COUNTRY;
        this.quotation.AddressExtension.ShipToState = this.BP_Detailsdata[0].BPAddresses[1].State;
        this.quotation.AddressExtension.U_SSTATE = this.BP_Detailsdata[0].BPAddresses[1].U_STATE;
        this.quotation.AddressExtension.ShipToCity = this.BP_Detailsdata[0].BPAddresses[1].City;
        this.quotation.AddressExtension.U_SHPTYPS = this.BP_Detailsdata[0].BPAddresses[1].U_SHPTYP;
        this.quotation.AddressExtension.ShipToStreet = this.BP_Detailsdata[0].BPAddresses[1].Street;
        }

        setTimeout(() => this.isdataLoading = false, 2000)

      });

  }


  updateQuotation(f: NgForm,isdraft:any) {
    f = this.bridgeService2.GlobaleTrimFunc(f);
    if(isdraft == 'draft'){
      this.quotation.is_draft = 1
    }
    else{
      this.quotation.is_draft = 0
    }
    //console.log("this.quotation",this.quotation)
    for(let [keys,value] of Object.entries(f.value)){
       if(!!!f.value[keys]){
        f.value[keys] = "";
      }
    }

    if (f.valid || this.quotation.is_draft == 1) {
      this.resetAlerts();
      this.quotationCardCode
      let params = this.quotation;
      params.CardCode = this.quotation.CardCode;
      //console.log(this.quotation);
        if (this.CountItem == 0 && this.quotation.is_draft == 0) {
        this._NotifierService.showError('please Select Atleast One Item');
        $('.item-list-area').css('border', '2px solid red');
        $('.item-list-area').css('box-shadow', '0 10px 15px 0 rgb(255 226 225), 0 15px 30px 0 rgb(251 159 161)');
      }
      else {
        $('.item-list-area').css('border', 'none');
        $('.item-list-area').css('box-shadow', 'none');
        this.isLoading = true;
        // const newArray = this.bridgeService2.replaceKeyInArray(this.quotation.DocumentLines, 'Tax', 'TaxRate');
        // this.quotation.DocumentLines = newArray;
        if(this.quotation.FreightCharge == ''){
          this.quotation.FreightCharge = 0
        }
        this.quotation.DocTotal = this.total_Amount;
        this.bridgeService2.editQuotation(this.quotation).subscribe(
          (res: EditQuotation) => {
            if (Object(res)['status'] == "200") {
              this.isLoading = false;

              this._NotifierService.showSuccess(this.Headingss[0].leftheading+" "+this.Headingss[0].heading104+" "+this.Headingss[0].heading106);
              this.modalService.dismissAll();
                this.router.navigate(['/quotation']);

            }
            else{
              this._NotifierService.showError(Object(res)['message']);
              this.isLoading = false;
            }


          },
          (err) => {
            this.isLoading = false;
            const delim = ":"
            const name = err.message
            const result = name.split(delim).slice(3).join(delim)
            this._NotifierService.showError(result);

          }
        );
      }
    }
    else {
      this._NotifierService.showError('Fill Required Field');
      this.isLoading = false;
    }


  }

  showshipaddress() {
    let num = (<HTMLInputElement>document.getElementById("showshipaddress"));
    if (num.checked) {
      $('.showshipaddress').show();
    }
    else {
      $('.showshipaddress').hide();
    }
  }

  /* added by millan on 25-05-2022 */
  backClicked() {
    this._location.back();
  }
  /* added by millan on 25-05-2022 */


  OrderCancel() {
    this.modalService.dismissAll();
  }
  openPrviewLg(content: any) {
    this.modalService.open(content, { modalDialogClass: 'preview-dialog', size: 'xl' });
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
