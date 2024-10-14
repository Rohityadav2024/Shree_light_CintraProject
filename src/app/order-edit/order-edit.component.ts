import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Bridge } from '../bridge';
import { BridgeService } from '../modules/service/bridge.service';
import { BusinessPartners } from '../businesspartners';
import { opportunity } from '../opportunity';
import { Customer, Industory, Country, States } from '../customer';
import { Quotation, EditQuotation, QuotationItem } from '../quotation';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { EditOrders, Orders } from '../orders';
import { Location } from '@angular/common';
declare var $: any;

@Component({
  selector: 'app-order-edit',
  templateUrl: './order-edit.component.html',
  styleUrls: ['./order-edit.component.css'],
})
export class OrderEditComponent implements OnInit {
  baseUrl2: any;
  searchValue!: string;
  searchValue1: any;
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
  isdataLoading:boolean=false;
  orders2: Orders[] = [];
  orders: EditOrders[] = [];
  closeResult = '';
  order: EditOrders = {
    id: '',
    TaxDate: '',
    DocDueDate: '',
   PRID:'',
    ContactPersonCode: '',
    DiscountPercent: '0',
    DocDate: '',
    CardCode: '',
    CardName: '',
    U_QUOTNM: "",
    U_QUOTID: '0',
    U_OPPID: "",
    U_OPPRNM: "",
    Comments: '',
    SalesPersonCode: '',
    AddressExtension: {
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
    UpdateDate: this.newdate,
    UpdateTime: this.time,
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
  resetAlerts() {
    this.error = '';
    this.success = '';
  }
  ShippingType:any;
  constructor(
    private modalService: NgbModal,
    private bridgeService2: BridgeService,
    private router: Router,
    private http: HttpClient,
    private router2: ActivatedRoute,
    private _location: Location
  ) {
    this.baseUrl2 = this.bridgeService2.baseUrl2;
  }

  ngOnInit(): void {



    this.bridgeService2.autoCall();
    this.ShippingType=this.bridgeService2.ShippingType;

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
    this.getQuotation();
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
  selectedDay: any;
  code: any[]=[];
  filterVal :any="";
  selectChangeHandler(event: any) {
    // this.selectedDay = event.target.value;
    // this.code = this.selectedDay.split(',');
    this.filterVal = this.countrys.filter(($option: any) => $option.Code == event)[0];
    // console.log(this.filterVal);
    this.code[0] = this.filterVal.Code;
    this.code[1] = this.filterVal.Name;
    this.order.AddressExtension.U_BCOUNTRY=this.code[1]
    this.getState();
  }
  selectedDayState: any;
  codeState: any[]=[];

  selectChangeHandlerState(event: any) {
    this.filterVal = this.statess.filter(($option: any) => $option.Code == event)[0];
    // console.log("qer",this.filterVal);
    this.codeState[0] = this.filterVal.Code;
    this.codeState[1] = this.filterVal.Name;
    this.order.AddressExtension.U_BSTATE=this.codeState[1]
    // console.log("qer1",this.order.AddressExtension.U_BSTATE);
    // this.selectedDayState = event.target.value;
    // this.codeState = this.selectedDayState.split(',');
   // this.order.AddressExtension.BillToState='';
  }
  getState(): void {
    this.bridgeService2.getStatedata(this.code[0]).subscribe(
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
  code2: any[]=[];
  selectChangeHandler2(event: any) {
    this.filterVal = this.countrys.filter(($option: any) => $option.Code == event)[0];
    // console.log(this.filterVal);
    this.code2[0] = this.filterVal.Code;
    this.code2[1] = this.filterVal.Name;
    this.order.AddressExtension.U_SCOUNTRY=this.code2[1]
    this.getState2();
  }
  selectedDayState2: any;
  codeState2: any[]=[];
  selectChangeHandlerState2(event: any) {
    this.filterVal = this.statess2.filter(($option: any) => $option.Code == event)[0];
    // console.log("qer6",this.filterVal);
    this.codeState2[1] = this.filterVal.Name;
    this.order.AddressExtension.U_SSTATE=this.codeState2[1]
    // console.log("qer1",this.order.AddressExtension.U_SSTATE);
  }
  getState2(): void {
    this.bridgeService2.getStatedata(this.code2[0]).subscribe(
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
    this.bridgeService2.getOpportunitydata().subscribe(
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

  CountItem: Number = 0;
  idd: any;
  contactpersoneid:any;
  getQuotation(): void {
    this.isdataLoading=true;
    this.idd = this.router2.snapshot.params.id;
    this.bridgeService2.getOneOrderdata(this.idd).subscribe(
      (data: Orders[]) => {
        this.isdataLoading=false;
        var totalamount=new Array;
        this.orders2 = data;
       // console.log('order-edit123',this.orders2);

        this.order.U_OPPRNM = this.orders2[0].U_OPPRNM;
        this.order.U_QUOTNM = this.orders2[0].U_QUOTNM;

        this.order.TaxDate = this.orders2[0].TaxDate;
        this.order.DocDueDate = this.orders2[0].DocDueDate;

        // if (this.orders2[0].ContactPersonCode.length) {
        //   this.order.ContactPersonCode = this.orders2[0].ContactPersonCode[0].id;
        //   this.contactpersoneid = this.orders2[0].ContactPersonCode[0].id;
        // }

        this.order.AddressExtension.BillToState=this.orders2[0].AddressExtension.BillToState;
        this.order.AddressExtension.ShipToState=this.orders2[0].AddressExtension.ShipToState;
        this.order.DiscountPercent = this.orders2[0].DiscountPercent;
        this.order.DocDate = this.orders2[0].DocDate;
        this.order.CardCode = this.orders2[0].CardCode;
        this.order.CardName = this.orders2[0].CardName;
        this.bridgeService2.getContactPersone(this.order.CardCode).subscribe(
          (data: any) => {
            this.contactPersoneList = data;

            this.order.ContactPersonCode = String(this.orders2[0].ContactPersonCode[0].id);
            this.contactpersoneid = this.orders2[0].ContactPersonCode[0].id;
          });

        this.order.Comments = this.orders2[0].Comments;
        if (this.orders2[0].SalesPersonCode.length) {
          this.order.SalesPersonCode = this.orders2[0].SalesPersonCode[0].SalesEmployeeCode;
        }

        this.order.DocumentLines = this.orders2[0].DocumentLines;

        console.log('this.order.DocumentLines',this.order.DocumentLines)

        for (let i = 0; i < this.orders2[0].DocumentLines.length; i++) {

         // var total=(this.orders2[0].DocumentLines[i].Quantity * this.orders2[0].DocumentLines[i].UnitPrice - (this.orders2[0].DocumentLines[i].Quantity * this.orders2[0].DocumentLines[i].UnitPrice * (this.orders2[0].DocumentLines[i].DiscountPercent/100))).toFixed(2);
         var total=((this.orders2[0].DocumentLines[i].Quantity * this.orders2[0].DocumentLines[i].UnitPrice - (this.orders2[0].DocumentLines[i].Quantity * this.orders2[0].DocumentLines[i].UnitPrice * (this.orders2[0].DocumentLines[i].DiscountPercent/100))) + ((this.orders2[0].DocumentLines[i].Quantity * this.orders2[0].DocumentLines[i].UnitPrice - (this.orders2[0].DocumentLines[i].Quantity * this.orders2[0].DocumentLines[i].UnitPrice * (this.orders2[0].DocumentLines[i].DiscountPercent/100)))*((this.orders2[0].DocumentLines[i].TaxRate||0)/100))).toFixed(2);
          totalamount.push(total);

        }
        this.total_Amount=totalamount.reduce((a:any, b:any) => a + Number(b), 0);

        console.log('this.total_Amount',this.total_Amount);

        this.order.CreateDate = this.orders2[0].CreateDate;
        this.order.CreateTime = this.orders2[0].CreateTime;
        // if (this.orders2[0].AddressExtension.length) {
          this.order.AddressExtension = this.orders2[0].AddressExtension;
        // }

        this.dummyarray = this.order.AddressExtension;

        this.bridgeService2.getStatedata(this.orders2[0].AddressExtension.BillToCountry).subscribe(
          (data: States[]) => {
            this.statess = data;

          },
          (err) => {
            console.log(err);
            this.error = err;
          }
        );

        this.bridgeService2.getStatedata(this.orders2[0].AddressExtension.ShipToCountry).subscribe(
          (data: States[]) => {
            this.statess2 = data;

          },
          (err) => {
            console.log(err);
            this.error = err;
          }
        );

        // this.order.DocumentLines = this.orders2[0].DocumentLines;

        for (let i = 0; i < this.order.DocumentLines.length; i++) {
          this.QuatItems.push({
            id: this.QuatItems.length + 1,
            Quantity: this.order.DocumentLines[i].Quantity,
            UnitPrice: this.order.DocumentLines[i].UnitPrice,
            DiscountPercent: this.order.DocumentLines[i].DiscountPercent,
            ItemCode: this.order.DocumentLines[i].ItemCode,
            ItemDescription: this.order.DocumentLines[i].ItemDescription,
            TaxCode: this.order.DocumentLines[i].TaxCode,
            TaxRate: this.order.DocumentLines[i].TaxRate || 0,
          });
        }

        this.CountItem = this.orders2[0].DocumentLines.length;
        this.order.id = String(this.orders2[0].id);



        // this.http
        //   .post(this.baseUrl2 + '/businesspartner/employee/' + 'all', {
        //     CardCode: this.order.CardCode,
        //   })
        //   .toPromise()
        //   .then((data: any) => {
        //     this.contactPersoneList = data['data'];
        //   });
      },
      (err) => {
        console.log(err);
        this.isLoading=true;
        this.error = err;
      }
    );
  }

  public QuatItems: any[] = [];
  itemPageNo:number=1;

  getQuotationItem2(event:any){
    $('#CateCate').hide();
    $('#cateITem').show();
    $('.toggle-show').hide();
    $('.toggle-show1').show();
    this.bridgeService2.getQuotationItemdata(this.itemPageNo,event).subscribe(
      (data: QuotationItem[]) => {
        this.isLoading = false;
        this.quotationsitem = data;
      },
      (err) => {
        this.isLoading = false;
        console.log(err);
        this.error = err;
      }
    );
    }
    categorys:any
  getQuotationItem(): void {
    this.isLoading = true;
    this.bridgeService2.getInventoryCategorydata().subscribe(
      (data: any[]) => {
        this.categorys = data;
        this.isLoading = false;
      },
      (err) => {
        console.log(err);
        this.isLoading = false;
        this.error = err;
      }
    );
  }



  ItemNAme: any;
  ItemQty: any;
  ItemDis: any;
  ItemId: any;
  ItemCode: any;
  ItemPrice: any;
  TaxCode: any;
  TaxRate: any;
  open(content: any, item: QuotationItem) {
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
    this.ItemNAme = item.ItemName;
    this.ItemQty = 1;
    this.ItemDis = 0;
    this.ItemCode = item.ItemCode;
    this.ItemPrice = item.UnitPrice;
    this.TaxCode = item.TaxCode;
    this.TaxRate = 0;
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
    this.ItemCode = item.ItemCode;
    this.ItemPrice = item.UnitPrice;
    this.TaxCode = item.TaxCode;
    this.TaxRate = item.TaxRate;
  }

  UpdateQuotationItem(f: NgForm) {
    f = this.bridgeService2.GlobaleTrimFunc(f);
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
        ItemCode: this.ItemCode,
        ItemDescription: this.ItemNAme,
        TaxCode: this.TaxCode,
        TaxRate: this.TaxRate || 0,
      });
    } else {
      var check: boolean = false;
      for (let i = 0; i < this.QuatItems.length; i++) {
        if (this.ItemCode == this.QuatItems[i]['ItemCode']) {
          check = false;
          this.QuatItems[i]['Quantity'] = this.ItemQty;
          this.QuatItems[i]['DiscountPercent'] = this.ItemDis;
          this.QuatItems[i]['TaxRate'] = this.TaxRate;
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

  add_qty(item: number) {
    for (let i = 0; i < this.QuatItems.length; i++) {
      if (item == this.QuatItems[i]['ItemCode']) {
        this.QuatItems[i]['Quantity'] += 1;
        break;
      }
    }
  }

  remove_array(item: number) {
    this.QuatItems.splice(item, 1);
  }
  minus_qty(item: number) {
    for (let i = 0; i < this.QuatItems.length; i++) {
      if (this.QuatItems[i]['Quantity'] > 1) {
        if (item == this.QuatItems[i]['ItemCode']) {
          this.QuatItems[i]['Quantity'] -= 1;
          break;
        }
      }
      else {
        alert('You can not enter negative number');
      }
    }
  }
  total_Amount:any;
  sendarray() {
    var totalamount=new Array;
    $('#add_quat').show();
    $('#select_item').hide();
    $('#selected_item').hide();
    for (let i = 0; i < this.QuatItems.length; i++) {
      delete this.QuatItems[i]['id'];
     // var total=(this.QuatItems[i].Quantity * this.QuatItems[i].UnitPrice - (this.QuatItems[i].Quantity * this.QuatItems[i].UnitPrice * (this.QuatItems[i].DiscountPercent/100))).toFixed(2);
     var total=((this.QuatItems[i].Quantity * this.QuatItems[i].UnitPrice - (this.QuatItems[i].Quantity * this.QuatItems[i].UnitPrice * (this.QuatItems[i].DiscountPercent/100))) + ((this.QuatItems[i].Quantity * this.QuatItems[i].UnitPrice - (this.QuatItems[i].Quantity * this.QuatItems[i].UnitPrice * (this.QuatItems[i].DiscountPercent/100)))*(this.QuatItems[i].TaxRate/100))).toFixed(2);
      totalamount.push(total);
    }
    this.total_Amount=totalamount.reduce((a:any, b:any) => a + Number(b), 0);

    // console.log(this.QuatItems)
    // console.log(this.quotation.DocumentLines);

    for (var x = 0; x < this.QuatItems.length; x++) {
      for (var y = 0; y < this.order.DocumentLines.length; y++) {
        if (
          this.QuatItems[x]['ItemCode'] ==
          this.order.DocumentLines[y]['ItemCode']
        ) {
          Object.assign(
            this.QuatItems[x],
            { id: this.order.DocumentLines[x].id },
            { LineNum: this.order.DocumentLines[x].LineNum },
            { orderID: this.order.DocumentLines[x].QuotationID }
          );
        } else {
          // console.log(this.QuatItems[x]['ItemCode']);
          // console.log(this.quotation.DocumentLines[y]['ItemCode']);
        }
      }
    }

    this.CountItem = this.QuatItems.length;
    this.order.DocumentLines = this.QuatItems;
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

  contactPersoneList: any;
  selectedDayItem: string = '';
  selectChangeHandlerItem(event: any) {
    this.bridgeService2.getOneCustomerdata(event).subscribe(
      (data: any) => {
        this.order.CardCode = data[0]['CardCode'];
        this.order.CardName = data[0]['CardName'];
        this.selectedDayItem = data[0]['CardCode'];
        this.bridgeService2.getContactPersone(this.selectedDayItem,).subscribe(
          (data: any) => {
            this.contactPersoneList = data;

          });
        // this.http
        //   .post(this.baseUrl2 + '/businesspartner/employee/' + 'all', {
        //     CardCode: this.selectedDayItem,
        //   })
        //   .toPromise()
        //   .then((data: any) => {
        //     this.contactPersoneList = data['data'];
        //     console.log(data['data']);
        //   });
      });
    //this.http
      // .post(this.baseUrl2 + '/businesspartner/one', { id: event.target.value })
      // .toPromise()
      // .then((data: any) => {
        // this.order.CardCode = data['data'][0]['CardCode'];
        // this.order.CardName = data['data'][0]['CardName'];
        // this.selectedDayItem = data['data'][0]['CardCode'];
        // this.http
        //   .post(this.baseUrl2 + '/businesspartner/employee/' + 'all', {
        //     CardCode: this.selectedDayItem,
        //   })
        //   .toPromise()
        //   .then((data: any) => {
        //     this.contactPersoneList = data['data'];
        //     console.log(data['data']);
        //   });
      // });
  }

  // selectChangeHandlerItem2 (event: any) {
  //   var id = event.target.value;
  //   this.http.post(this.basceurl+'one', {"id":id}).toPromise().then((data:any) => {
  //   });

  // }

  updateQuotation(f: NgForm) {
    f = this.bridgeService2.GlobaleTrimFunc(f);
    for (let [keys, value] of Object.entries(f.value)) {
      if (!!!f.value[keys]) {
        f.value[keys] = "";
        this.order.U_OPPID = '0';
        this.order.U_QUOTID = '0';
      }
    }
    if (f.valid) {
      this.resetAlerts();
      if (this.CountItem == 0) {
        alert('please Select Atleast One Item');
        $('.item-list-area').css('border', '2px solid red');
        $('.item-list-area').css(
          'box-shadow',
          '0 10px 15px 0 rgb(255 226 225), 0 15px 30px 0 rgb(251 159 161)'
        );
      } else {
        $('.item-list-area').css('border', 'none');
        $('.item-list-area').css('box-shadow', 'none');
        this.isLoading = true;
        //console.log(this.order);
        let params=this.order;
        params.ContactPersonCode=this.contactpersoneid;
        //console.log(this.order);
        this.bridgeService2.editOrder(this.order).subscribe(
          (res: EditOrders) => {
            // Update the list of cars
            if (Object(res)['status'] == "200") {
              this.orders.push(res);
              this.isLoading = false;
              $('.success-box').show();
              this.modalService.dismissAll();
              setTimeout(() => {
                $('.success-box').fadeOut(1000);
                this.router.navigate(['/order']);
              }, 2000);
              // this.isLoading = false;
              //  alert('Update Order successfully');
              //  this.router.navigate(['/order']);
              // // this.success = 'Created successfully';
              // f.reset();
            }
            else{
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
            // window.location.reload();
          }
        );
      }
    }
    else{
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
          $("ng-select[name=" + keyys + "]").removeClass("red-line-border");
        }
      }
    }

  }

  showshipaddress() {
    let num = <HTMLInputElement>document.getElementById('showshipaddress');
    if (num.checked) {
      $('.showshipaddress').show();
    } else {
      $('.showshipaddress').hide();
    }
  }

  /* added by millan on 25-05-2022 */
  backClicked() {
    this._location.back();
  }
  /* added by millan on 25-05-2022 */
}
