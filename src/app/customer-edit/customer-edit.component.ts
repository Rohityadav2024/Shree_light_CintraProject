import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Bridge } from '../bridge';
import { BridgeService } from '../modules/service/bridge.service';
import { BusinessPartners } from '../businesspartners';
import { opportunity } from '../opportunity';
import {
  Customer,
  EditCustomer,
  Industory,
  Country,
  States,
  PaymentTerm,
} from '../customer';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Location } from '@angular/common';
import { Bridge2 } from '../bridge2';
import { HeadingServicesService } from '../modules/service/heading-services.service';
import { NotiferService } from '../modules/service/helpers/notifer.service';
declare var $: any;

@Component({
  selector: 'app-customer-edit',
  templateUrl: './customer-edit.component.html',
  styleUrls: ['./customer-edit.component.css'],
})
export class CustomerEditComponent implements OnInit {
  baseUrl2: any;
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
  editcustomers: EditCustomer[] = [];
  bridgeslead: Bridge2[] = [];
  paymentterms: PaymentTerm[] = [];
  industorys: Industory[] = [];
  countrys: Country[] = [];
  statess: States[] = [];
  statess2: States[] = [];
  bridgess: Bridge[] = [];
  editcustomer: EditCustomer = {

  zone:'',
    id: '',
    CardCode: '',
    CardName: '',
    Industry: '-1',

    CardType: 'cCustomer',
    Website: '',
    EmailAddress: '',
    Phone1: '',
    U_LEADID:'0',
    U_LEADNM:'',
    DiscountPercent: '',
    Currency: 'INR',
    IntrestRatePercent: '',
    CommissionPercent: '',
    Notes: '',
    PayTermsGrpCode: '',
    CreditLimit: '',
    AttachmentEntry: '',
    SalesPersonCode: '',
    ContactEmployees: [
      {
        Name: '',
        MobilePhone: '',
        E_Mail: '',
      },
    ],
    U_PARENTACC: '',
    U_BPGRP: '',
    U_CONTOWNR: '',
    U_RATING: '',
    U_TYPE: '',
    U_ANLRVN: '',
    U_CURBAL: '',
    U_ACCNT: '',
    U_INVNO: '',
    CreateDate: this.HeadingServices.getDate(),
    CreateTime: this.HeadingServices.getDateTime(),
    UpdateDate: this.HeadingServices.getDate(),
    UpdateTime: this.HeadingServices.getDateTime(),
    U_LAT: '28.7041',
    U_LONG: '77.1025',
    BPAddresses: [
      {
        AddressName: '',
        AddressType: 'bo_BillTo',
        BPCode: '',
        Block: '',
        City: '',
        Country: '',
        RowNum: '0',
        State: '',
        Street: '',
        U_COUNTRY: '',
        U_SHPTYP: '',
        U_STATE: '',
        ZipCode: '',
      },
      {
        AddressName: '',
        AddressType: 'bo_ShipTo',
        BPCode: '',
        Block: '',
        City: '',
        Country: '',
        RowNum: '1',
        State: '',
        Street: '',
        U_COUNTRY: '',
        U_SHPTYP: '',
        U_STATE: '',
        ZipCode: '',
      },
    ],
  };

  error = '';
  success = '';
  role: any;
  UserId: any;
  reportingTo: any;
  UserName: any;
  isLoading: boolean = false;
  isdataLoading:boolean=false;
  idd: any;
  Cidd: any;
  contactPersoneList: any;
  // basceurl = "http://103.234.187.199:8050/businesspartner/employee/";

  commonObj: any = {
    companyName: false,
    mobile: false,
    email: false,
  }
  UserZone:any;
  companydata: any;
  Rating:any;
  ShippingType:any;
  businesspartners: BusinessPartners[] = [];
  Headingss: any[] = [];
  savedModules: any[] = [];
  resetAlerts() {
    this.error = '';
    this.success = '';
  }
  constructor(
    private bridgeService2: BridgeService,
    private router: Router,
    private http: HttpClient,
    private HeadingServices: HeadingServicesService,
    private _NotifierService: NotiferService,
    private router2: ActivatedRoute,
    private modalService: NgbModal,
    private _location: Location
  ) {
    this.baseUrl2 = this.bridgeService2.baseUrl2;
  }

  ngOnInit(): void {
    if (!this.HeadingServices.isModuleView(3) || !this.HeadingServices.isModuleViewedit(3)) {
      this.router.navigate(['/dashboard']);
    }
    this.bridgeService2.autoCall();
    this.Rating=this.bridgeService2.Rating;
    this.ShippingType=this.bridgeService2.ShippingType;
    var C = 'C';
    // console.log(this.editcustomer.id);
    // this.idd = this.router2.snapshot.params.id;
    // console.log(this.idd);
    this.Cidd = this.router2.snapshot.params.id;
    // this.Cidd = C + this.router2.snapshot.params.id;

    this.UserName = sessionStorage.getItem('UserName');
    this.UserId = sessionStorage.getItem('UserId');
    this.role = sessionStorage.getItem('role');
    this.reportingTo = sessionStorage.getItem('reportingTo');
    this.Headingss = this.HeadingServices.getModule3();
    if (this.UserName == undefined) {
      this.router.navigate(['/login']);
    }
    this.getBridge();
    this.getIndustory();
    this.getCountry();
    this.getoneCountry();
    this.getPaymentTerms();
    this.getCustomerTypeList();


    this.bridgeService2.getCustomerbpdata().subscribe((data) => {
      this.companydata = data;
      // console.log(this.companydata);
    });

    this.bridgeService2.getZoneMasterPagination({PageNo: 1,maxItem: 'All'},'','id','asc').subscribe(
      (data: any) => {
        this.UserZone = data.data;
      },
      (err) => {
        console.log(err);
        this.error = err;
      }
    );

    this.getBusinessPartmers();

    const savedModulesString = sessionStorage.getItem('savedModules');
    if (savedModulesString) {
      this.savedModules = JSON.parse(savedModulesString);
    }
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

  getPaymentTerms(): void {
    this.bridgeService2.getPaymentTermsdata().subscribe(
      (data: PaymentTerm[]) => {
        this.paymentterms = data;

      },
      (err) => {
        console.log(err);
        this.error = err;
      }
    );
  }




  formid:any;
  getoneCountry(): void {
    // this.isLoading2 = true;
    this.isdataLoading=true;
    this.bridgeService2.getOneCustomerdata(this.Cidd).subscribe(
      (data: Customer[]) => {
        // this.isLoading2 = false;
        this.isdataLoading=false;
        this.customers = data;
        // console.log('edit customer',this.customers);
        this.idd = data[0]['id'];
        // console.log(this.formid);
        this.editcustomer.CardName = data[0]['CardName'];
        this.editcustomer.CardCode = data[0]['CardCode'];
        this.bridgeService2.getContactPersone(this.editcustomer.CardCode).subscribe(
          (data: any) => {
            this.contactPersoneList = data;
          });
        // this.http
        //   .post(this.baseUrl2 + '/businesspartner/employee/all', {
        //     CardCode: this.editcustomer.CardCode,
        //   })
        //   .toPromise()
        //   .then((data: any) => {

        //   });
          // console.log("data[0]",data[0])

        this.editcustomer.Industry = data[0]['Industry'];
        this.editcustomer.zone = data[0]['zone'];

        this.editcustomer.CardType = data[0]['CardType'];
        this.editcustomer.U_LEADNM = data[0]['U_LEADNM'];
        this.editcustomer.Website = data[0]['Website'];
        this.editcustomer.EmailAddress = data[0]['EmailAddress'];
        this.editcustomer.Phone1 = data[0]['Phone1'];
        this.editcustomer.DiscountPercent = data[0]['DiscountPercent'];
        this.editcustomer.Currency = data[0]['Currency'];
        this.editcustomer.IntrestRatePercent = data[0]['IntrestRatePercent'];
        this.editcustomer.CommissionPercent = data[0]['CommissionPercent'];
        this.editcustomer.Notes = data[0]['Notes'];
        if(data[0]['PayTermsGrpCode'].length){
        this.editcustomer.PayTermsGrpCode = data[0]['PayTermsGrpCode'][0].GroupNumber;
      }
        // console.log(this.editcustomer.PayTermsGrpCode);
        this.editcustomer.CreditLimit = data[0]['CreditLimit'];
        this.editcustomer.AttachmentEntry = data[0]['AttachmentEntry'];
        this.editcustomer.SalesPersonCode = data[0]['SalesPersonCode'][0].SalesEmployeeCode;
        // console.log( this.editcustomer.SalesPersonCode[0].SalesEmployeeCode)
        this.editcustomer.ContactEmployees = data[0]['ContactEmployees'];
        this.editcustomer.U_PARENTACC = data[0]['U_PARENTACC'];
        this.editcustomer.U_BPGRP = data[0]['U_BPGRP'];
        this.editcustomer.U_CONTOWNR = data[0]['U_CONTOWNR'];
        this.editcustomer.U_RATING = data[0]['U_RATING'];
        if(data[0]['U_TYPE'].length>0){
          this.editcustomer.U_TYPE = data[0]['U_TYPE'][0].id;
        }
        else if(data[0]['U_TYPE'].length==0){
          this.editcustomer.U_TYPE=null;
        }
        else{
          this.editcustomer.U_TYPE='';
        }

        this.editcustomer.U_ANLRVN = data[0]['U_ANLRVN'];
        this.editcustomer.U_CURBAL = data[0]['U_CURBAL'];
        this.editcustomer.U_ACCNT = data[0]['U_ACCNT'];
        this.editcustomer.U_INVNO = data[0]['U_INVNO'];
        this.editcustomer.CreateDate = data[0]['CreateDate'];
        this.editcustomer.CreateTime = data[0]['CreateTime'];
        this.editcustomer.CreateTime = data[0]['CreateTime'];
        this.editcustomer.BPAddresses[0].Country = data[0].BPAddresses[0]['Country'];
        this.editcustomer.id = this.idd;

       // console.log("this.editcustomer.BPAddresses[0].Country",this.editcustomer.BPAddresses[0].Country);
        this.editcustomer.BPAddresses[0] = data[0]['BPAddresses'][0];


        this.bridgeService2.getStatedata(this.editcustomer.BPAddresses[0].Country).subscribe(
          (data: States[]) => {
            this.statess = data;
            // console.log(this.statess);

          },
          (err) => {
            console.log(err);
            this.error = err;
          }
        );

        // this.bridgeService2.getStatedata(this.editcustomer.BPAddresses[1].U_COUNTRY).subscribe(
        //   (data: States[]) => {
        //     this.statess = data;
        //     console.log(this.statess);
        //     this.statess2 = data;
        //
        //   },
        //   (err) => {
        //     console.log(err);
        //     this.error = err;
        //   }
        // );

        this.editcustomer.BPAddresses[1] = data[0]['BPAddresses'][1];
        // console.log(data[0]['BPAddresses'][0].AddressName)


        // console.log(this.editcustomer.SalesPersonCode);
      },
      (err) => {
        // this.isLoading2 = false;
        console.log(err);
        this.error = err;
      }
    );
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
  // selectedDay: any;
  // code: any;
  // filterVal: any = '';
  // selectChangeHandler(event: any) {
  //   this.filterVal = this.countrys.filter(($option: any) => $option.Code == event.target.value)[0];
  //   // this.selectedDay = event.target.value;
  //   console.log(this.filterVal);
  //   this.code[0] = this.filterVal.Code;
  //   this.code[1] = this.filterVal.Name;
  //   // this.customer.BPAddresses[0].Country=this.code[0]
  //   this.editcustomer.BPAddresses[0].U_COUNTRY=this.code[1];
  //   this.getState();
  // }
  // selectedDayState: any;
  // codeState: any;
  // selectChangeHandlerState(event: any) {
  //   //update the ui
  //   this.selectedDayState = event.target.value;
  //   this.codeState = this.selectedDayState.split(',');
  //   this.editcustomer.BPAddresses[0].State = this.codeState[0];
  //   this.editcustomer.BPAddresses[0].U_STATE = this.codeState[1];
  // }
  // getState(): void {
  //   this.bridgeService2.getStatedata(this.code[0]).subscribe(
  //     (data: States[]) => {
  //       this.statess = data;
  //
  //     },
  //     (err) => {
  //       console.log(err);
  //       this.error = err;
  //     }
  //   );
  // }
  selectedDay: any;
  code: any = [];
  filterVal: any = '';
  selectChangeHandler(event: any) {
    this.filterVal = this.countrys.filter(($option: any) => $option.Code == event)[0];
    // this.selectedDay = event.target.value;
    // console.log(this.filterVal);
    this.code[0] = this.filterVal.Code;
    this.code[1] = this.filterVal.Name;
    // this.customer.BPAddresses[0].Country=this.code[0]
    this.editcustomer.BPAddresses[0].U_COUNTRY=this.code[1];
    this.getState();
  }
  selectedDayState: any;
  codeState: any[]=[];
  selectChangeHandlerState(event: any) {

    this.filterVal = this.statess.filter(($option: any) => $option.Code == event)[0];
    // s
    this.codeState[0] = this.filterVal.Code;
    this.codeState[1] = this.filterVal.Name;
    this.editcustomer.BPAddresses[0].U_STATE=this.codeState[1]
    // this.selectedDayState = event.target.value;
    // this.codeState = this.selectedDayState.split(',');
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
  code2: any;
  selectChangeHandler2(event: any) {
    //update the ui
    this.selectedDay2 = event;
    this.code2 = this.selectedDay2.split(',');
    this.getState2();
  }
  selectedDayState2: any;
  codeState2: any;
  selectChangeHandlerState2(event: any) {
    //update the ui
    this.selectedDayState2 = event;
    this.codeState2 = this.selectedDayState2.split(',');
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

  EditCustomer(f: NgForm) {

    f = this.bridgeService2.GlobaleTrimFunc(f);
    //alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.editcustomer));

    this.resetAlerts();
    for(let [keys,value] of Object.entries(f.value)){
      let numKey = ["U_LEADID"];
      if(numKey.includes(keys)){
        f.value[keys] = 0;

      }else if(!!!f.value[keys]){
        f.value[keys] = "";

      }
    }

    //  this.editcustomer=this.formid;
    if(f.valid && this.commonObj.companyName==false  && this.commonObj.mobile==false && this.commonObj.email==false){
      let params=this.editcustomer;
    params.id=this.idd;
    // console.log(this.editcustomer);
    for(let [keys,value] of Object.entries(f.value)){
      if(!!!f.value[keys]){
        f.value[keys] = "";
        this.editcustomer.U_TYPE=f.value["U_TYPE"];
      }
    }

    this.editcustomer.ContactEmployees[0].Name = this.editcustomer.U_CONTOWNR;
    this.isLoading = true;
//console.log(this.editcustomer);

    this.bridgeService2.EditCustomer(this.editcustomer).subscribe(
      (res: any) => {
        if (Object(res)['status'] == "200") {
        // Update the list of cars
        // this.editcustomers.push(res);
        this.isLoading = false;
        this._NotifierService.showSuccess(this.Headingss[0].leftheading+" "+this.Headingss[0].heading104+" "+this.Headingss[0].heading106);
        this.modalService.dismissAll();
          this.router.navigate(['/customer']);
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
        // window.location.reload();
      }
    );
    }
    else{
      this._NotifierService.showError('Please Filed All Valid Data');
      this.isLoading = false;
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
          else if ($("textarea[name=" + keyys + "]").hasClass('required-fld')) {
            $("textarea[name=" + keyys + "]").addClass("red-line-border");
            $("textarea[name=" + keyys + "]").focus();
          }
        }
        else {
          $("input[name=" + keyys + "]").removeClass("red-line-border");
          $("select[name=" + keyys + "]").removeClass("red-line-border");
          $("textarea[name=" + keyys + "]").removeClass("red-line-border");
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


  backClicked() {
    this._location.back();
  }


cstmrtype:any;
getCustomerTypeList(): void {

  this.bridgeService2.getCustomerTypeData().subscribe(
    (data: any[]) => {
      this.isLoading = false;
      this.cstmrtype = data;


    },

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
