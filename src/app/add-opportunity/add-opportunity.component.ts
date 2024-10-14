import { HttpClient } from '@angular/common/http';
import { Component, OnInit,ChangeDetectorRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router,  ActivatedRoute} from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

import { Bridge } from '../bridge';
import { BridgeService } from '../modules/service/bridge.service';
import { BusinessPartners } from '../businesspartners';
import { opportunity } from '../opportunity';
import { Location } from '@angular/common';
import { Bridge2 } from '../bridge2';
import { NgbDatapickerValueFormatterService } from '../modules/service/ngb-datapicker-value-formatter.service';
import { Customer } from '../customer';
import { QuotationItem } from '../modules/model/quotation';
import { NotiferService } from '../modules/service/helpers/notifer.service';
import { HeadingServicesService } from '../modules/service/heading-services.service';
import { Item } from '../warehouse';
declare var $: any;
@Component({
  selector: 'app-add-opportunity',
  templateUrl: './add-opportunity.component.html',
  styleUrls: ['./add-opportunity.component.css']
})
export class AddOpportunityComponent implements OnInit {
  baseUrl2: any;
  searchValue: string='';
  searchValue2: string='';
  searchValue1: any;
  CountItem: Number = 0;
  newdate:any = this.HeadingServices.getDate();
  quotationsitem: QuotationItem[] = [];
  public QuatItems: any[] = [];
  closeResult = '';
  bridgess: Bridge[] = [];
  businesspartners: BusinessPartners[] = [];
  bridges2: Bridge2[] = [];
  paginDisplay:boolean=true;
  opportunitys: opportunity[] = [];
  opportunity: opportunity = {
    SequentialNo: '',
    DocTotal:'',
    U_LEADID: '',
    U_LEADNM: '',
    CardCode: '',
    SalesPerson: '',
    SalesPersonName: '',
    ContactPerson: '',
    ContactPersonName: '',
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
    DocumentLines: '',
    SalesOpportunitiesLines: '',
    // for item add
    OppItem: '',


  };
  items: Item[]=[];
  pagenumber: number = 1;
  leadCount: any;
  contactPersoneList: any;
  selectedDay: string = '';
  addcustomerName: any;
  business_partnerName: any[] = [];
  isLoading: boolean = false;
  isLoading2: boolean = false;
  isdataLoading: boolean = false;
  error = '';
  success = '';
  role: any;
  UserId: any;
  reportingTo: any;
  UserName: any;
  getlead: any;
  customers: any[] = [];
  Headingss: any[] = [];
  urlcheck: any;
  opporid: any;
  BP_Detailsdata: any[] = [];
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
  idd:any;
  startind = 1;
  endind = 1;
  totalCount:any;
  inventoryDetails: any;
  savedModules: any[] = [];
  // basceurl = "http://103.234.187.199:8050/businesspartner/employee/";?
  resetAlerts() {
    this.error = '';
    this.success = '';
  }
  OpportunityProbability: any;
  constructor(private bridgeService2: BridgeService, private _NotifierService: NotiferService,private HeadingServices: HeadingServicesService, private cdref: ChangeDetectorRef, private router: Router, private modalService: NgbModal, private http: HttpClient,private route: ActivatedRoute,
    private _location: Location, private _NgbDatapickerValueFormatterService: NgbDatapickerValueFormatterService) {
    this.baseUrl2 = this.bridgeService2.baseUrl2;

  }

  ngOnInit(): void {
    if (!this.HeadingServices.isModuleView(4) || !this.HeadingServices.isModuleViewadd(4)) {
      this.router.navigate(['/dashboard']);
    }
    this.bridgeService2.autoCall();
    this.OpportunityProbability = this.bridgeService2.OpportunityProbability;
    this.getBusinessPartmers();
    this.getOpportunityList();
    this.getAllSource();
    this.getQuotationItem();
    localStorage.removeItem('rolename');
    this.UserName = sessionStorage.getItem('UserName');
    this.UserId = sessionStorage.getItem('UserId');
    this.role = sessionStorage.getItem('role');
    this.reportingTo = sessionStorage.getItem('reportingTo');
    this.Headingss = this.HeadingServices.getModule4();
    if (this.UserName == undefined) {
      this.router.navigate(['/login']);
    }
    this.idd = this.route.snapshot.params.id;
    this.bridgeService2.getoneInventoryCategory(this.idd).subscribe(
      (data: Item[]) => {
        this.inventoryDetails = data;
      },
      (err) => {
        console.log(err);
        this.error = err;
      }
    );
    this.getBridge();
    this.getLead();
    var today = new Date().toISOString().split('T')[0];
    document.getElementsByName("ClosingDate")[0].setAttribute('min', today);

    $('#add_quat').show();
    $('#select_item').hide();
    $('#selected_item').hide();

    if(this.bridgeService2.getBpCardcode() != undefined){
    var CardCode = this.bridgeService2.getBpCardcode();
    this.selectChangeHandler(CardCode);
    }

    const savedModulesString = sessionStorage.getItem('savedModules');
    if (savedModulesString) {
      this.savedModules = JSON.parse(savedModulesString);
    }
  }

  // ngAfterContentChecked() {
  //   this.cdref.detectChanges();
  // }

  getLead(): void {
    this.isLoading = true;
    this.bridgeService2.getLeadShortdata().subscribe(
      (data: Bridge2[]) => {
        // this.bridges2 = data;
        this.bridges2 = data.filter((status:any)=>status.status==='Qualified');
        this.isLoading = false;
      },
      (err) => {
        console.log(err);
        this.error = err;
      }
    );
  }
  SelectLead(event: any) {
    this.isdataLoading = true;
    // console.log(event)
    var idd = event.id ?? event;
    if(idd == ''){
      this.isdataLoading = false;
      this.opportunity.U_LEADNM = '';
        this.opportunity.U_LEADID = '';
    }
    else{
    this.bridgeService2.getOneLeaddata(idd).subscribe(
      (data: any) => {
        this.isdataLoading = false;
        this.opportunity.U_LEADNM = data[0].companyName;
        this.opportunity.U_LEADID = String(data[0].id);
        this.opportunity.OpportunityName = data[0].companyName;
        this.opportunity.U_LSOURCE = data[0].source;
      },
      (err) => {
        this.isdataLoading = false;
        console.log(err);
        this.error = err;
      }
    );

    setTimeout(() => this.isdataLoading = false, 2000)
  }
  }

  getBridge(): void {
    this.isLoading = true;
    this.bridgeService2.getAll().subscribe(
      (data: Bridge[]) => {
        this.bridgess = data;

        this.isLoading = false;
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
    this.isLoading = true;
    this.bridgeService2.getBusinessPartmersShortdata().subscribe(
      (data: BusinessPartners[]) => {
        this.isLoading = false;
        this.businesspartners = data;

      },
      (err) => {
        console.log(err);
        this.error = err;
      }
    );
  }

  selectChangeHandler(event: any) {
    this.isdataLoading = true;
    this.selectedDay = event;
      this.bridgeService2.getOneCustomerdata(event).subscribe(
        (data: any) => {
          // this.isdataLoading=false;

          // console.log('get one customer', data);

          this.opportunity.CardCode = data[0]['CardCode'];
          // console.log(data[0])
          // if(data[0]['U_LEADID'] != 0){
          this.SelectLead(data[0]['U_LEADID']);
          // }

          this.BP_Detailsdata = data
          this.opportunity.SalesPersonName = this.BP_Detailsdata[0].SalesPersonCode[0].SalesEmployeeName;
          this.opportunity.SalesPerson = this.BP_Detailsdata[0].SalesPersonCode[0].SalesEmployeeCode;
          // this.opportunity.U_TYPE = this.BP_Detailsdata[0].U_TYPE;
          // console.log(this.CurrentBranch);
          this.bridgeService2.getContactPersone(this.selectedDay).subscribe(
            (data: any) => {
              this.contactPersoneList = data;
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

  selectChangeHandler3(event: any) {

    var id = event;
    this.bridgeService2.getoneemployee(id).subscribe(
      (data: any) => {
        this.opportunity.SalesPersonName = data[0]['userName'];

        this.opportunity.SalesPerson = data[0]['SalesEmployeeCode'];
        this.opportunity.DataOwnershipName = data[0]['userName'];
        this.opportunity.DataOwnershipfield = data[0]['SalesEmployeeCode'];

        // console.log('this.opportunity.SalesPersonName',this.opportunity.SalesPersonName);
      });
    // this.http.post(this.baseUrl2+'/employee/one', {"id":id}).toPromise().then((data:any) => {

    // });

  }

  addOpportunity(f: NgForm) {
    f = this.bridgeService2.GlobaleTrimFunc(f);
    this.resetAlerts();
    for (let [keys, value] of Object.entries(f.value)) {
      if (!!!f.value[keys]) {
        f.value[keys] = "";

      }
    }
    if(this.opportunity.U_LEADID == ""){
      this.opportunity.U_LEADID = 0;
    }
    if (f.valid) {
      // addoppdisable.disabled=true;
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

        $('.item-list-area').css('border', 'none');
        $('.item-list-area').css('box-shadow', 'none');

        this.opportunity.OppItem = this.QuatItems;

        this.opportunity.DocTotal = this.total_Amount;

        if(this.opportunity.U_LEADID ==null){
          this.opportunity.U_LEADID = "0";
        }
        // this.opportunity.CustomerName = this.addcustomerName;

        this.opportunity.ContactPersonName = this.opportunity.ContactPersonName;


        this.opportunity.PredictedClosingDate = this.opportunity.ClosingDate;


        this.opportunity.SalesOpportunitiesLines = [
          {
            "DocumentType": this.opportunity.MaxLocalTotal,
            "MaxLocalTotal": "5000",
            "MaxSystemTotal": "60000",
            "SalesPerson": this.opportunity.SalesPerson,
            "StageKey": "2"
          }
        ]

        this.bridgeService2.storeopportunity(this.opportunity).subscribe(
          (res: opportunity) => {
            this.isLoading = false;
            if (Object(res)['status'] == "200") {
              this._NotifierService.showSuccess(this.Headingss[0].leftheading+" "+this.Headingss[0].heading103+" "+this.Headingss[0].heading106);
              this.modalService.dismissAll();
                this.router.navigate(['/opportunity']);

            }
            else {
              this._NotifierService.showError(Object(res)['message']);
              this.isLoading = false;
            }
          },
          (err) => {
            this.isLoading = false;
            const delim = ":"
            const name = err.message
            const result = name.split(delim).slice(3).join(delim);
            this._NotifierService.showError(result);
            // window.location.reload();
          }
        );
      }
    } else {
      // addoppdisable.disabled=false;
      this._NotifierService.showError('Please Fill Valid Data');
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


  backClicked() {
    this._location.back();
  }
  optyp: any;

  getOpportunityList(): void {
    this.isLoading = true;
    this.bridgeService2.getOpportunityTypeData().subscribe(
      (data: any[]) => {
        this.optyp = data;
        // console.log(this.optyp);
        this.isLoading = false;
        // console.log('this.optyp name',this.optyp);
      },

    );
  }
  source1: any;
  getAllSource(): void {
    this.isLoading = true;
    this.bridgeService2.getAllSourcedata().subscribe(
      (data: any[]) => {
        this.source1 = data;
        this.isLoading = false;
        // console.log("src",this.source1)

      },
      (err) => {
        console.log(err);
        this.error = err;
      }
    );
  }

  itemPageNo: number = 1;
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
  ItemId: any;
  ItemCode: any;
  ItemPrice: any;
  TaxCode: any;
  U_FGITEM: any;
  CostingCode2: any;
  ProjectCode: any;
  FreeText: any;
  UomNo: any;
  Tax: any;
  valueWithoutTax: any;
  valueafterDis: any;
  Finalvalue: any;

  open(content: any, item: any) {
    if(this.QuatItems.map(($item:any) => $item.ItemCode).includes(item.ItemCode)){
      return;
    }
    else{
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

    // console.log('this item123',item);

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
    this.valueWithoutTax = this.ItemQty * this.ItemPrice;
    this.UomNo = 'NOS';
    this.Tax = item.Tax;
    this.valueWithoutTax = this.ItemQty * this.ItemPrice;
    // this.valueWithoutTax = 2100;
    this.valueafterDis = this.valueWithoutTax - ((this.valueWithoutTax * this.ItemDis) / 100);
    this.Finalvalue = this.valueafterDis + ((this.valueafterDis * this.Tax) / 100);

    this.TaxCode = 'IGST12';

    // id: this.QuatItems.length + 1,
    //     Quantity: this.itemModel.quantity,
    //     UnitPrice: this.itemModel.price,
    //     DiscountPercent: this.itemModel.discount,
    //     ItemCode: this.ItemCode,
    //     ItemDescription: this.itemModel.FreeText,
    //     TaxCode: this.TaxCode,
  }
  }

  ITemDataUpdate(event: any) {
    this.valueWithoutTax = this.ItemQty * this.ItemPrice;
    // this.valueWithoutTax = 2100;
    this.valueafterDis = this.valueWithoutTax - ((this.valueWithoutTax * this.ItemDis) / 100);
    this.Finalvalue = this.valueafterDis + ((this.valueafterDis * this.Tax) / 100);
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
    // console.log('item -------------',item);

    this.ItemId = item.id;
    this.ItemNAme = item.ItemDescription;
    this.ItemQty = item.Quantity;
    this.ItemDis = item.DiscountPercent;
    this.ItemCode = item.ItemCode;
    this.ItemPrice = item.UnitPrice;
    this.TaxCode = 'IGST12';
    this.Tax = item.Tax;
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
    var fnd_indx = this.QuatItems.length - 1;
    if (this.QuatItems.length > 0) {
      var prev_itemcod = this.QuatItems[fnd_indx]['ItemCode'];
      var prev_fgiitme = this.QuatItems[fnd_indx]['U_FGITEM'];
    }
    // if (this.addItemType == 'paid') {
    //   this.U_FGITEM = this.U_FGITEM;
    // }
    else {
      if (prev_itemcod == prev_fgiitme) {
        this.U_FGITEM = prev_itemcod;
      }
      else {
        this.U_FGITEM = prev_fgiitme;
      }
    }

    if (this.CountItem == 0) {
      this.QuatItems.push({
        id: this.QuatItems.length + 1,
        Quantity: this.ItemQty || 0,
        UnitPrice: this.ItemPrice || 0,
        DiscountPercent: this.ItemDis || 0,
        ItemCode: this.ItemCode || '',
        ItemDescription: this.ItemNAme || '',
        TaxCode: 'IGST12',
        ProjectCode: this.ProjectCode || '',
        U_FGITEM: this.U_FGITEM || '',
        CostingCode2: this.CostingCode2 || '',
        FreeText: this.FreeText || '',
        Tax: this.Tax || 0,
        UomNo: this.UomNo || '',
      });

    }
    else {
      var check: boolean = false;
      for (let i = 0; i < this.QuatItems.length; i++) {
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
          ItemDescription: this.ItemNAme || '',
          TaxCode: 'IGST12',
          ProjectCode: this.ProjectCode || '',
          U_FGITEM: this.U_FGITEM || '',
          CostingCode2: this.CostingCode2 || '',
          FreeText: this.FreeText || '',
          Tax: this.Tax || 0,
          UomNo: this.UomNo || '',
        });
      }
    }

    // console.log(this.QuatItems);

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

  // CountItem: Number = 0;
  total_Amount: any;
  sendarray() {
    var totalamount:any = 0;
    $('#add_quat').show();
    $('#select_item').hide();
    $('#selected_item').hide();
    // $('#addoppdisable').attr('disabled', false);
    // addoppdisable.disabled=false;
    this.isLoading = false;
    for (let i = 0; i < this.QuatItems.length; i++) {
      // ;
      delete this.QuatItems[i]['id'];
    }

    this.opportunity.DocumentLines = this.QuatItems;

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
    // this.total_Amount = totalamount.reduce((a: any, b: any) => a + Number(b), 0);



    this.CountItem = this.opportunity.DocumentLines.length;

    console.log('this.total_Amount', this.total_Amount);
  }


  getleadone(idd: any): void {

    this.bridgeService2.getOneLeaddata(idd).subscribe(
      (data: Bridge2[]) => {
        // console.log("one",data);
        // console.log("one",data[0].source);
        this.opportunity.U_LSOURCE = data[0].source;


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
