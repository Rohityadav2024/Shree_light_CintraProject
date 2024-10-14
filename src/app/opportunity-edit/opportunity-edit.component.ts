import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal,ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Bridge } from '../bridge';
import { BridgeService } from '../modules/service/bridge.service';
import { BusinessPartners } from '../businesspartners';
import { opportunity, Editopportunity } from '../opportunity';
import {Location} from '@angular/common';
import { QuotationItem } from '../modules/model/quotation';
import { NotiferService } from '../modules/service/helpers/notifer.service';
import { HeadingServicesService } from '../modules/service/heading-services.service';
import { Item } from '../warehouse';
declare var $: any;

@Component({
  selector: 'app-opportunity-edit',
  templateUrl: './opportunity-edit.component.html',
  styleUrls: ['./opportunity-edit.component.css'],
})
export class OpportunityEditComponent implements OnInit {
  baseUrl2: any;
  newdate:any = this.HeadingServices.getDate();
  bridgess: Bridge[] = [];
  businesspartners: BusinessPartners[] = [];
  quotationsitem: QuotationItem[] = [];
  closeResult = '';
  opportunitys: opportunity[] = [];
  editopportunitys: Editopportunity[] = [];
  savedModules: any[] = [];
  opportunity: Editopportunity = {
    SequentialNo: '',
    DocTotal:'',
    CardCode: '',
    SalesPerson: '',
    SalesPersonName: '',
    ContactPerson: '',
    ContactPersonName: '',
    U_LEADID:0,
    U_LEADNM:'',
    Source: '',
    StartDate: this.HeadingServices.getDate(),
    PredictedClosingDate: '',
    MaxLocalTotal: '',
    MaxSystemTotal: '0.7576',
    Remarks: '',
    Status: 'sos_Open',
    ReasonForClosing: 'None',
    TotalAmountLocal: '0.7',
    TotalAmounSystem: '0.0',
    CurrentStageNo: '',
    CurrentStageNumber: '',
    CurrentStageName: '',
    OpportunityName: '',
    Industry: 'None',
    LinkedDocumentType: 'None',
    DataOwnershipfield: 0,
    DataOwnershipName: '',
    StatusRemarks: '',
    ProjectCode: 'None',
    CustomerName: '',
    ClosingDate: '',
    ClosingType: 'sos_Days',
    OpportunityType: 'boOpSales',
    UpdateDate: this.HeadingServices.getDate(),
    UpdateTime: this.HeadingServices.getTime(),
    U_TYPE: '',
    U_LSOURCE: '',
    U_FAV: 'N',
    U_PROBLTY: '',
    SalesOpportunitiesLines: '',
    OppItem:'',
    id: '',
  };
  isLoading: boolean = false;
  searchValue: any = '';
  searchValue1: any;
  error = '';
  success = '';
  role: any;
  UserId: any;
  reportingTo: any;
  UserName: any;
  idd: any;
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
    isLoading2: boolean = false;
  items: Item[]=[];
  searchValue2: string = '';
  paginDisplay:boolean=true;
  // basceurl = "http://103.234.187.199:8050/businesspartner/employee/";
  resetAlerts() {
    this.error = '';
    this.success = '';
  }
  OpportunityProbability:any;
  constructor(
    private bridgeService2: BridgeService,
    private router: Router,
    private http: HttpClient, private _NotifierService: NotiferService,private HeadingServices: HeadingServicesService,
    private routers: ActivatedRoute,
    private modalService: NgbModal,
    private _location: Location
  ) {
    this.baseUrl2 = this.bridgeService2.baseUrl2;
  }

  ngOnInit(): void {
    if (!this.HeadingServices.isModuleView(4) || !this.HeadingServices.isModuleViewedit(4)) {
      this.router.navigate(['/dashboard']);
    }
    this.bridgeService2.autoCall();
    this.OpportunityProbability=this.bridgeService2.OpportunityProbability;
    this.getBusinessPartmers();

    this.UserName = sessionStorage.getItem('UserName');
    this.UserId = sessionStorage.getItem('UserId');
    this.role = sessionStorage.getItem('role');
    this.reportingTo = sessionStorage.getItem('reportingTo');
    if (this.UserName == undefined) {
      this.router.navigate(['/login']);
    }
    this.Headingss = this.HeadingServices.getModule4();
    this.getQuotationItem();
    this.getBridge();
    this.getOpportunity();
    this.getOpportunityList();
    this.getAllSource();

    const savedModulesString = sessionStorage.getItem('savedModules');
    if (savedModulesString) {
      this.savedModules = JSON.parse(savedModulesString);
    }
  }

  getBridge(): void {
    this.bridgeService2.getAll().subscribe(
      (data: Bridge[]) => {
        this.bridgess = data;
       // console.log(this.bridgess);
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
  total_Amount:any;
  getOpportunity(): void {
    this.idd = this.routers.snapshot.params.id;
    this.bridgeService2.getOneOpportunitydata(this.idd).subscribe(
      (data: opportunity[]) => {

    var totalamount:any = 0;
        this.opportunitys = data;
        this.bridgeService2.getContactPersone(this.opportunitys[0]['CardCode']).subscribe(
          (data: any) => {
            this.contactPersoneList = data;
          });
        // console.log("this",this.opportunitys);
        this.opportunity.SequentialNo = this.opportunitys[0]['SequentialNo'];
        if(this.opportunitys[0]['CardCode'].length){
          this.opportunity.CardCode = this.opportunitys[0]['CardCode'];
          // this.selectChangeHandler2(this.opportunitys[0]['CardCode']);
        }
       // console.log(this.opportunity.CardCode);
       this.opportunity.U_LEADNM = this.opportunitys[0]['U_LEADNM'];
       //console.log('this.opportunity.U_LEADNM',this.opportunity.U_LEADNM);
        this.opportunity.SalesPerson = this.opportunitys[0]['SalesPerson'];
        // if(!!this.opportunitys[0]['SalesPerson']){
        //   this.bridgeService2.getoneemployee().subscribe(
        //     (data: any) => {
        //       this.opportunity.SalesPersonName = data[0]['userName'];
        //       this.opportunity.SalesPerson = data[0]['SalesEmployeeCode'];
        //       this.opportunity.DataOwnershipName = data[0]['userName'];
        //       this.opportunity.DataOwnershipfield =
        //         data[0]['SalesEmployeeCode'];
        //     });
        // }

        this.opportunity.SalesPersonName =
          this.opportunitys[0]['SalesPersonName'];
        this.opportunity.ContactPerson = this.opportunitys[0]['ContactPerson'];
        this.opportunity.ContactPersonName =
          this.opportunitys[0]['ContactPersonName'];
        this.opportunity.Source = this.opportunitys[0]['Source'];
        this.opportunity.StartDate = this.opportunitys[0]['StartDate'];
        this.opportunity.PredictedClosingDate =
          this.opportunitys[0]['PredictedClosingDate'];
        this.opportunity.MaxLocalTotal = this.opportunitys[0]['MaxLocalTotal'];
        this.opportunity.MaxSystemTotal =
          this.opportunitys[0]['MaxSystemTotal'];
        this.opportunity.Remarks = this.opportunitys[0]['Remarks'];
        this.opportunity.Status = this.opportunitys[0]['Status'];
        this.opportunity.ReasonForClosing =
          this.opportunitys[0]['ReasonForClosing'];
        this.opportunity.TotalAmountLocal =
          this.opportunitys[0]['TotalAmountLocal'];
        this.opportunity.TotalAmounSystem =
          this.opportunitys[0]['TotalAmounSystem'];
        this.opportunity.CurrentStageNo =
          this.opportunitys[0]['CurrentStageNo'];
        this.opportunity.CurrentStageNumber =
          this.opportunitys[0]['CurrentStageNumber'];
        this.opportunity.CurrentStageName =
          this.opportunitys[0]['CurrentStageName'];
        this.opportunity.OpportunityName =
          this.opportunitys[0]['OpportunityName'];
        this.opportunity.Industry = this.opportunitys[0]['Industry'];
        this.opportunity.OpportunityName =
          this.opportunitys[0]['OpportunityName'];
        this.opportunity.LinkedDocumentType =
          this.opportunitys[0]['LinkedDocumentType'];
        this.opportunity.DataOwnershipfield =
          this.opportunitys[0]['DataOwnershipfield'];
        this.opportunity.DataOwnershipName =
          this.opportunitys[0]['DataOwnershipName'];
        this.opportunity.StatusRemarks = this.opportunitys[0]['StatusRemarks'];
        this.opportunity.ProjectCode = this.opportunitys[0]['ProjectCode'];
        this.opportunity.CustomerName = this.opportunitys[0]['CustomerName'];
        //console.log('this.opportunity.CustomerName',this.opportunity.CustomerName);
        this.opportunity.ClosingDate = this.opportunitys[0]['ClosingDate'];
        this.opportunity.ClosingType = this.opportunitys[0]['ClosingType'];
        this.opportunity.OpportunityType =
          this.opportunitys[0]['OpportunityType'];
          this.opportunity.UpdateTime = this.HeadingServices.getTime(),
          this.opportunity.UpdateDate = this.HeadingServices.getDate();
        this.opportunity.U_TYPE = this.opportunitys[0]['U_TYPE'][0].id;
        this.opportunity.U_LSOURCE = this.opportunitys[0]['U_LSOURCE'].trim();
       // console.log(this.opportunity.U_LSOURCE);
        this.opportunity.U_FAV = this.opportunitys[0]['U_FAV'];
        this.opportunity.U_PROBLTY = this.opportunitys[0]['U_PROBLTY'];
        this.opportunity.SalesOpportunitiesLines =
          this.opportunitys[0]['SalesOpportunitiesLines'];

        this.opportunity.id = this.idd;

        this.CountItem = this.opportunitys[0]['OppItem'].length;
        for (let i = 0; i < this.opportunitys[0]['OppItem'].length; i++) {
          this.QuatItems.push({
            id: this.QuatItems.length + 1,
            Oid: this.opportunitys[0].OppItem[i].id,
            Quantity: this.opportunitys[0].OppItem[i].Quantity,
            UnitPrice: this.opportunitys[0].OppItem[i].UnitPrice,
            DiscountPercent: this.opportunitys[0].OppItem[i].DiscountPercent,
            ItemCode: this.opportunitys[0].OppItem[i].ItemCode,
            ItemDescription: this.opportunitys[0].OppItem[i].ItemDescription,
            TaxCode: this.opportunitys[0].OppItem[i].TaxCode,
            U_FGITEM: this.opportunitys[0].OppItem[i].U_FGITEM,
            CostingCode2: this.opportunitys[0].OppItem[i].CostingCode2,
            ProjectCode: this.opportunitys[0].OppItem[i].ProjectCode,
            FreeText: this.opportunitys[0].OppItem[i].FreeText,
            Tax: this.opportunitys[0].OppItem[i].Tax ||0,
            UomNo: this.opportunitys[0].OppItem[i].UomNo
          });
        }

        for (let i = 0; i < this.QuatItems.length; i++) {
          delete this.QuatItems[i]['id'];
          var basic = Number(this.QuatItems[i].Quantity) * Number(this.QuatItems[i].UnitPrice);
          var afterfdis = basic - (basic * (Number(this.QuatItems[i].DiscountPercent) / 100))
          var aftersdis = afterfdis;
          // var aftersdis = afterfdis - (afterfdis * (Number(this.quotation.DiscountPercent) / 100))
          var total = aftersdis + (aftersdis * (Number(this.QuatItems[i].Tax) / 100))
          totalamount += total;
        }
        this.total_Amount = totalamount.toFixed(2);


      },
      (err) => {
        console.log(err);
        this.error = err;
      }
    );
  }

  contactPersoneList: any;
  isdataLoading: boolean = false;
  selectedDay: string = '';
  BP_Detailsdata: any[] = [];
  selectChangeHandler(event: any) {
    this.isdataLoading = true;
    this.selectedDay = event;
      this.bridgeService2.getOneCustomerdata(event).subscribe(
        (data: any) => {
          // this.isdataLoading=false;

          // console.log('get one customer', data);

          this.opportunity.CardCode = data[0]['CardCode'];


          // this.SelectLead(data[0]['U_LEADID']);

          this.BP_Detailsdata = data
          this.opportunity.SalesPersonName = this.BP_Detailsdata[0].SalesPersonCode[0].SalesEmployeeName;
          this.opportunity.SalesPerson = this.BP_Detailsdata[0].SalesPersonCode[0].SalesEmployeeCode;
          // this.opportunity.U_TYPE = this.BP_Detailsdata[0].U_TYPE;
          // console.log(this.CurrentBranch);
          this.bridgeService2.getContactPersone(this.selectedDay).subscribe(
            (data: any) => {
              this.contactPersoneList = data;
              this.opportunitys = data;
              this.opportunity.ContactPersonName = this.contactPersoneList[0]?.FirstName;
              this.opportunity.ContactPerson = this.contactPersoneList[0]?.InternalCode;
            });
        });
      this.bridgeService2.getBusinessPartmersShortdata().subscribe(
        (data: BusinessPartners[]) => {

          // this.businesspartners = data.filter((cardName: any) => {
          //   return cardName.CardCode === this.selectedDay;
          // });
          // this.addcustomerName = this.businesspartners[0].CardName
          this.opportunity.CustomerName = this.businesspartners[0].CardName
        },
        (err) => {
          console.log(err);
          this.error = err;
        }
      );
    setTimeout(() => this.isdataLoading = false, 2000)
  }
  addcustomerName:any;
  business_partners:any[]=[];
  selectChangeHandler2(event: any) {
    var id = event?.target?.value ?? event;
   // console.log('------------id----',id);

    this.bridgeService2.getBusinessPartmersShortdata().subscribe(
      (data: BusinessPartners[]) => {

        // this.business_partners = data.filter((cardName:any)=>{
        //  return cardName.CardCode=== id;
        // });
        this.addcustomerName=this.business_partners[0].CardName
        // console.log('this.businesspartners',this.businesspartners[0].CardCode);
        // console.log('this.businesspartners',this.businesspartners[0].CardName);
        // console.log('this.businesspartners',this.businesspartners);

      },
      (err) => {
        console.log(err);
        this.error = err;
      }
    );

    this.bridgeService2.getContactPersoneone(id).subscribe(
      (data: any) => {
        this.opportunity.ContactPersonName = data[0]['FirstName'];
        this.opportunity.ContactPerson = data[0]['InternalCode'];
      });

    // this.http
    //   .post(this.baseUrl2 + '/businesspartner/employee/' + 'one', { id: id })
    //   .toPromise()
    //   .then((data: any) => {

    //   });
  }

  selectChangeHandler3(event: any) {
    var id = event;
    this.bridgeService2.getoneemployee(id).subscribe(
      (data: any) => {
        this.opportunity.SalesPersonName = data[0]['userName'];
        this.opportunity.SalesPerson = data[0]['SalesEmployeeCode'];
        this.opportunity.DataOwnershipName = data[0]['userName'];
        this.opportunity.DataOwnershipfield =
          data[0]['SalesEmployeeCode'];
      });
    // this.http
    //   .post(this.baseUrl2 + '/employee/one', { id: id })
    //   .toPromise()
    //   .then((data: any) => {

    //   });
  }





  CountItem: Number = 0;
  UnitPriceTotal: number = 0;

  public QuatItems: any[] = [];


  sendarray() {
    var totalamount:any = 0;
    $('#add_quat').show();
    $('#select_item').hide();
    $('#selected_item').hide();
    // for (let i = 0; i < this.QuatItems.length; i++) {

    //   this.QuatItems[i]['id'] = this.QuatItems[i]['Oid'];
    //   if (this.QuatItems[i]['id'] == undefined) {
    //     this.QuatItems[i]['id'] = '';
    //   }
    //   delete this.QuatItems[i]['Oid'];
    //   this.UnitPriceTotal += this.QuatItems[i]['UnitPrice'];

    // }
    for (let i = 0; i < this.QuatItems.length; i++) {
      delete this.QuatItems[i]['id'];
      var basic = Number(this.QuatItems[i].Quantity) * Number(this.QuatItems[i].UnitPrice);
      var afterfdis = basic - (basic * (Number(this.QuatItems[i].DiscountPercent) / 100))
      var aftersdis = afterfdis;
      // var aftersdis = afterfdis - (afterfdis * (Number(this.quotation.DiscountPercent) / 100))
      var total = aftersdis + (aftersdis * (Number(this.QuatItems[i].Tax) / 100))
      totalamount += total;
    }
    this.total_Amount = totalamount.toFixed(2);

    this.CountItem = this.QuatItems.length;

   // console.log(this.QuatItems);
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

  // remove_array(item: number) {
  //   if (this.QuatItems.length > 0) {
  //     let data = this.QuatItems[item];
  //     let U_FGITEM = data["U_FGITEM"];
  //     let ItemCode = data["ItemCode"];
  //     if (ItemCode == U_FGITEM) {
  //       for (var i = this.QuatItems.length - 1; i >= 0; i--) {
  //         if (ItemCode === this.QuatItems[i]['U_FGITEM']) {
  //           this.QuatItems.splice(i, 1);
  //         }
  //       }
  //     }
  //     else {
  //       this.QuatItems.splice(item, 1);
  //     }
  //   }
  // }

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

  index_idddd: any;
  showorandnewitem() {
    // this._NotifierService.showError(item.id);
    $('.ornewitem').show();
  }


  ItemNAme: any;
  ItemQty: any;
  ItemDis: any;
  ItemId: any;
  ItemCode: any;
  ItemPrice: any;
  TaxCode: any;
  U_FGITEM: any;
  CostingCode2: any;
  ProjectCode: any;
  FreeText: any;
  UomNo:any;
  Tax:any;
  valueWithoutTax:any;
  valueafterDis:any;
  Finalvalue:any;
  open(content: any, item: any) {
    if(this.QuatItems.map(($item:any) => $item.ItemCode).includes(item.ItemCode)){
      return;
    }
    else{
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', modalDialogClass: 'modal-dialog-centered order-cards-modal' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
    //console.log('item', item);
    this.ItemId = item.id;
    this.ItemNAme = item.ItemName;
    this.ItemQty = 1;
    this.ItemDis =  item.Discount;
    this.ItemCode = item.ItemCode;
    this.ItemPrice = item.UnitPrice;
    this.ProjectCode = item.U_DIV;
    this.U_FGITEM = item.ItemCode;
    this.CostingCode2 = 'DEPT001';
    this.FreeText = '';
    this.valueWithoutTax = this.ItemQty*this.ItemPrice;
    // this.UomNo = item.UomNo;
    this.UomNo = 'NOS';
    this.Tax = item.Tax;
    this.valueWithoutTax = this.ItemQty*this.ItemPrice;
    // this.valueWithoutTax = 2100;
    this.valueafterDis = this.valueWithoutTax-((this.valueWithoutTax*this.ItemDis)/100);
    this.Finalvalue = this.valueafterDis+((this.valueafterDis*this.Tax)/100);

    this.TaxCode = 'IGST12';

  }
  }

  ITemDataUpdate(event:any){
    this.valueWithoutTax = this.ItemQty*this.ItemPrice;
    // this.valueWithoutTax = 2100;
    this.valueafterDis = this.valueWithoutTax-((this.valueWithoutTax*this.ItemDis)/100);
    this.Finalvalue = this.valueafterDis+((this.valueafterDis*this.Tax)/100);
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

    this.ItemId = item.id;
    this.ItemNAme = item.ItemDescription;
    this.ItemQty = item.Quantity;
    this.ItemDis = item.DiscountPercent;
    this.ItemCode = item.ItemCode;
    this.ItemPrice = item.UnitPrice;
    this.TaxCode = 'IGST12';
   // this.UomNo=this.UomNo;
    this.Tax=item.Tax;

  }

  UpdateQuotationItem(f: NgForm) {

    f = this.bridgeService2.GlobaleTrimFunc(f);
    if (!/^[0-9]*$/.test(this.ItemDis) || !/^[0-9]*$/.test(this.ItemQty) || !/^[0-9]*$/.test(this.Tax)) {
      this._NotifierService.showError('Invalid input');
    }
    else{
    $('#add_quat').hide();
    $('#select_item').hide();
    $('#selected_item').show();


    this.CountItem = this.QuatItems.length;

    if (this.CountItem == 0) {
     // ;
      this.QuatItems.push({
       id: this.QuatItems.length + 1,
        Quantity: this.ItemQty || 0,
        UnitPrice: this.ItemPrice || 0,
        DiscountPercent: this.ItemDis || 0,
        ItemCode: this.ItemCode || '',
        ItemDescription: this.ItemNAme ||'',
        TaxCode: 'IGST12',
        ProjectCode: this.ProjectCode ||'',
        U_FGITEM: this.U_FGITEM ||'',
        CostingCode2: this.CostingCode2 || '',
        FreeText: this.FreeText || '',
        Tax: this.Tax || 0,
        UomNo: this.UomNo || 0,
      });
    //  ;

    }
    else {

      var check: boolean = false;
      for (let i = 0; i < this.QuatItems.length; i++) {
       // ;
        if (this.ItemCode == this.QuatItems[i]['ItemCode']) {
          check = false;
          this.QuatItems[i]['Quantity'] = this.ItemQty || 0;
          this.QuatItems[i]['UnitPrice'] = this.ItemPrice || 0;
          this.QuatItems[i]['DiscountPercent'] = this.ItemDis || 0;
          this.QuatItems[i]['ItemCode'] = this.ItemCode ||'';
          this.QuatItems[i]['ItemDescription'] = this.ItemNAme ||'';
          this.QuatItems[i]['TaxCode'] = 'IGST12';
          this.QuatItems[i]['ProjectCode'] = this.ProjectCode ||'';
          this.QuatItems[i]['U_FGITEM'] = this.U_FGITEM ||'';
          this.QuatItems[i]['CostingCode2'] = this.CostingCode2 ||'';
          this.QuatItems[i]['FreeText'] = this.FreeText ||'';
          this.QuatItems[i]['Tax'] = this.Tax || 0;
          this.QuatItems[i]['UomNo'] = this.UomNo || 0;

          break;
        }
        else {
          check = true;
        }

      }
      if (check) {

        this.QuatItems.push({
         id: this.QuatItems.length + 1,
          Quantity: this.ItemQty || 0,
          UnitPrice: this.ItemPrice || 0,
          DiscountPercent: this.ItemDis || 0,
          ItemCode: this.ItemCode || '',
          ItemDescription: this.ItemNAme ||'',
          TaxCode: 'IGST12',
          ProjectCode: this.ProjectCode ||'',
          U_FGITEM: this.U_FGITEM ||'',
          CostingCode2: this.CostingCode2 || '',
          FreeText: this.FreeText ||'',
          Tax: this.Tax || 0,
          UomNo: this.UomNo || 0,
        });

      }
    }

    console.log(this.QuatItems)
    this.modalService.dismissAll();
  }
  }

  EditOpportunity(f: NgForm) {
    f = this.bridgeService2.GlobaleTrimFunc(f);
    for (let [keys, value] of Object.entries(f.value)) {
      if (!!!f.value[keys]) {
        f.value[keys] = "";

      }
    }
    if(f.valid){
      this.isLoading = true;
      if (this.CountItem == 0) {
        this._NotifierService.showError('please Select Atleast One Item');
        // addoppdisable.disabled=true;

        this.isLoading = false;
        $('.item-list-area').css('border', '2px solid red');
        $('.item-list-area').css(
          'box-shadow',
          '0 10px 15px 0 rgb(255 226 225), 0 15px 30px 0 rgb(251 159 161)'
        );
      } else {
      this.resetAlerts();
      for (let i = 0; i < this.QuatItems.length; i++) {
        this.QuatItems[i]['id'] = this.QuatItems[i]['Oid'];
       // console.log('this.QuatItems test',this.QuatItems[i]['Oid']);
        if(this.QuatItems[i]['id'] == undefined){
          this.QuatItems[i]['id'] = '';
        }
      }

      $('.item-list-area').css('border', 'none');
      $('.item-list-area').css('box-shadow', 'none');
      this.opportunity.OppItem = this.QuatItems;
      this.opportunity.DocTotal = this.total_Amount;

      this.opportunity.CustomerName = this.addcustomerName ?? this.opportunity.CustomerName;

      this.opportunity.PredictedClosingDate = this.opportunity.ClosingDate;
      this.opportunity.SalesOpportunitiesLines = [
        {
          DocumentType: this.opportunity.MaxLocalTotal,
          MaxLocalTotal: '5000',
          MaxSystemTotal: '60000',
          SalesPerson: this.opportunity.SalesPerson,
          StageKey: '2',
        },
      ];
      this.bridgeService2.editopportunity(this.opportunity).subscribe(
        (res: Editopportunity) => {
          // Update the list of cars
          if (Object(res)['status'] == "200") {
            this.isLoading = false;
            this._NotifierService.showSuccess(this.Headingss[0].leftheading+" "+this.Headingss[0].heading104+" "+this.Headingss[0].heading106);
            this.modalService.dismissAll();
              this.router.navigate(['/opportunity']);
          }
          else{
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
  }
    else{
      this.isLoading = false;
      this._NotifierService.showError('Fill Required Field');
      for (let i = 0; i < Object.keys(f.value).length; i++) {
        var keyys = Object.keys(f.value)[i];
        if (f.value[keyys].length == 0) {

          this.isLoading = false;


          if ($("input[name=" + keyys + "]").hasClass('required-fld')) {
            $("input[name=" + keyys + "]").addClass("red-line-border");
            $("input[name=" + keyys + "]").focus();
          }
          else if ($("select[name=" + keyys + "]").hasClass('required-fld')) {
            $("select[name=" + keyys + "]").addClass("red-line-border");
            $("select[name=" + keyys + "]").focus();
          }
          else if ($("ng-select[name=" + keyys + "]").hasClass('required-fld')) {
            $("ng-select[name=" + keyys + "]").addClass("red-line-border");
            $("ng-select[name=" + keyys + "]").focus();
          }
          else if ($("textarea[name=" + keyys + "]").hasClass('required-fld')) {
            $("textarea[name=" + keyys + "]").addClass("red-line-border");
            $("textarea[name=" + keyys + "]").focus();
          }
        }
        else {

          this.isLoading = false;
          $("input[name=" + keyys + "]").removeClass("red-line-border");
          $("select[name=" + keyys + "]").removeClass("red-line-border");
          $("textarea[name=" + keyys + "]").removeClass("red-line-border");
          $("ng-select[name=" + keyys + "]").removeClass("red-line-border");
        }
      }
    }


  }

  /* added by millan on 25-05-2022 */
  backClicked() {
    this._location.back();
  }
  optyp:any;
  getOpportunityList(): void {
    this.bridgeService2.getOpportunityTypeData().subscribe(
      (data: any[]) => {
        this.optyp = data;
       // console.log(this.optyp)

      },

    );
  }

  source1:any;
  getAllSource(): void {
    this.bridgeService2.getAllSourcedata().subscribe(
      (data: any[]) => {
        this.source1 = data;
       // console.log("src",this.source1)

      },
      (err) => {
        console.log(err);
        this.error = err;
      }
    );
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
