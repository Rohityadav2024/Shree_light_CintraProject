import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Bridge } from '../bridge';
import { BridgeService } from '../modules/service/bridge.service';
import { BusinessPartners } from '../businesspartners';
import { opportunity } from '../opportunity';
import { Customer, Industory, Country, States, PaymentTerm } from '../customer';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Bridge2 } from '../bridge2';
import { Location } from '@angular/common';
import { HeadingServicesService } from '../modules/service/heading-services.service';
import { NotiferService } from '../modules/service/helpers/notifer.service';
declare var $: any;

@Component({
  selector: 'app-customer-add',
  templateUrl: './customer-add.component.html',
  styleUrls: ['./customer-add.component.scss'],
})
export class CustomerAddComponent implements OnInit {
  baseUrl2: any;
  businesspartners: BusinessPartners[] = [];
  customers: Customer[] = [];
  industorys: Industory[] = [];
  countrys: Country[] = [];
  statess: States[] = [];
  statess2: States[] = [];
  bridgess: Bridge[] = [];
  bridges2: Bridge2[] = [];
  bridgeslead: Bridge2[] = [];

  contactPersoneList: any;

  customer: Customer = {
    zone:'',
    CardCode: '',
    CardName: '',
    U_LEADID:'',
    U_LEADNM:'',
    Industry: '',
    CardType: 'cCustomer',
    Website: '',
    EmailAddress: '',
    Phone1: '',
    DiscountPercent: '',
    Currency: 'INR',
    IntrestRatePercent: '',
    CommissionPercent: '',
    Notes: '',
    PayTermsGrpCode: null,
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
    U_TYPE: null,
    U_ANLRVN: '',
    U_CURBAL: '',
    U_ACCNT: '',
    U_INVNO: '',
    CreateDate: this.HeadingServices.getDate(),
    CreateTime: this.HeadingServices.getTime(),
    UpdateDate: this.HeadingServices.getDate(),
    UpdateTime: this.HeadingServices.getTime(),
    U_LAT: '28.7041',
    U_LONG: '77.1025',
    BPAddresses: [
      {
        AddressName: '',
        AddressType: 'bo_BillTo',
        BPCode: '',
        Block: '',
        City: '',
        Country: 'IN',
        RowNum: '0',
        State: '',
        Street: '',
        U_COUNTRY: 'India',
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
        Country: 'IN',
        RowNum: '1',
        State: '',
        Street: '',
        U_COUNTRY: 'India',
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
  LeadId: any;
  savedModules: any[] = [];
  paymentterms: PaymentTerm[] = [];
  showshipaddressBool: boolean = false;
  resetAlerts() {
    this.error = '';
    this.success = '';
  }

  UserZone:any;
  companydata: any;
  Rating:any;
  ShippingType:any;
  Headingss: any[] = [];
  constructor(
    private bridgeService2: BridgeService,
    private router: Router,
    private http: HttpClient,
    private HeadingServices: HeadingServicesService,
    private _NotifierService: NotiferService,
    private modalService: NgbModal,
    private _location: Location
  ) { }

  ngOnInit(): void {
    if (!this.HeadingServices.isModuleView(3) || !this.HeadingServices.isModuleViewadd(3)) {
      this.router.navigate(['/dashboard']);
    }
    this.bridgeService2.autoCall();
    this.Rating=this.bridgeService2.Rating;
    this.ShippingType=this.bridgeService2.ShippingType;

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
    this.getPaymentTerms();
    this.getCustomerTypeList();
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

    if(this.bridgeService2.getLeadId() != undefined){
      var Leadid = this.bridgeService2.getLeadId();
      this.onLeadChange(Leadid);
      }
    this.getBridge2();
    this.getBusinessPartmers();
    this.bridgeService2.getZoneMasterPagination({PageNo: 1,maxItem: 'All'},'','id','asc').subscribe(
      (data: any) => {
        this.UserZone = data.data;
      },
      (err) => {
        console.log(err);
        this.error = err;
      }
    );

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
  onLeadChange(leadId:any){
    if(leadId == ''){
      this.customer.U_LEADNM='';
    this.customer.CardName='';
    this.customer.Phone1='';
    this.customer.U_ANLRVN='';
    this.customer.EmailAddress='';
    this.customer.ContactEmployees[0].Name='';
    this.customer.ContactEmployees[0].MobilePhone='';
    this.customer.ContactEmployees[0].E_Mail='';
    this.customer.SalesPersonCode = '';
    this.customer.U_LEADID='';
    this.customer.U_LEADNM='';
    }
    else{
    this.bridgeService2.getOneLeaddata(leadId).subscribe(
  (data: Bridge2[]) => {
    this.bridges2 = data;
    this.customer.U_LEADNM=this.bridges2[0].companyName;

    this.customer.CardName=this.bridges2[0].companyName;
    this.customer.Phone1=this.bridges2[0].phoneNumber;
    this.customer.U_ANLRVN=this.bridges2[0].turnover;
    this.customer.EmailAddress=this.bridges2[0].email;
    this.customer.ContactEmployees[0].Name=this.bridges2[0].contactPerson;
    this.customer.ContactEmployees[0].MobilePhone=this.bridges2[0].phoneNumber;
    this.customer.ContactEmployees[0].E_Mail=this.bridges2[0].email;
    this.customer.SalesPersonCode = this.bridges2[0].assignedTo.SalesEmployeeCode;
    this.customer.U_LEADID=String(this.bridges2[0].id);
    this.customer.U_LEADNM=this.bridges2[0].companyName;


  });
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


  pagenumber:number=1;
  leadCount:any;
  getBridge2(): void {
    this.isLoading = true;
    this.bridgeService2.getLeadShortdata().subscribe(
      (data: Bridge2[]) => {
        // this.bridges2 = data;
        this.bridgeslead = data.filter((status:any)=>status.status==='Qualified');
        this.isLoading = false;
      },
      (err) => {
        console.log(err);
        this.error = err;
      }
    );

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
  getIndustory(): void {
    this.isLoading = true;
    this.bridgeService2.getIndustorydata().subscribe(
      (data: Industory[]) => {
        this.industorys = data;
        this.isLoading = false;

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
        // console.log(this.countrys);

      },
      (err) => {
        console.log(err);
        this.error = err;
      }
    );
  }
  selectedDay: any;
  code: any = [];
  filterVal: any = '';
  selectChangeHandler(event: any) {
    // console.log('event',event);
    this.filterVal = this.countrys.filter(($option: any) => $option.Code == event)[0];
    // this.selectedDay = event.target.value;
    // console.log(this.filterVal);
    this.code[0] = this.filterVal.Code;
    this.code[1] = this.filterVal.Name;

    // this.customer.BPAddresses[0].Country=this.code[0]
    this.customer.BPAddresses[0].U_COUNTRY=this.code[1];
    this.getState();
  }
  selectedDayState: any;
  codeState: any[] =[];
  selectChangeHandlerState(event: any) {

    this.filterVal = this.statess.filter(($option: any) => $option.Code == event)[0];
    // console.log(this.filterVal);
    this.codeState[0] = this.filterVal.Code;
    this.codeState[1] = this.filterVal.Name;

    this.customer.BPAddresses[0].U_STATE=this.codeState[1]

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
  code2: any=[];
  selectChangeHandler2(event: any) {
    this.filterVal = this.countrys.filter(($option: any) => $option.Code == event)[0];
    // console.log(this.filterVal);
    this.code2[0] = this.filterVal.Code;
    this.code2[1] = this.filterVal.Name;
    this.customer.BPAddresses[1].U_COUNTRY = this.code2[1]


    // this.selectedDay2 = event.target.value;
    // this.code2 = this.selectedDay2.split(',');
    this.getState2();
  }
  selectedDayState2: any;
  codeState2: any[] = [];
  selectChangeHandlerState2(event: any) {

    this.filterVal = this.statess2.filter(($option: any) => $option.Code == event)[0];
    this.codeState2[0] = this.filterVal.Code;
    this.codeState2[1] = this.filterVal.Name;
    // this.customer.BPAddresses[1].U_STATE = this.codeState2[0]
    this.customer.BPAddresses[1].U_STATE = this.codeState2[1]
    // console.log("qer1", this.customer.BPAddresses[1].U_STATE);
    // this.selectedDayState2 = event.target.value;
    // this.codeState2 = this.selectedDayState2.split(',');
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

  addCustomer(f: NgForm) {
    f = this.bridgeService2.GlobaleTrimFunc(f);
    this.resetAlerts();
        if (f.valid) {
          this.customer = this.bridgeService2.replaceNullWithSpace(this.customer);
      this.customer.U_CONTOWNR = this.customer.ContactEmployees[0].Name;
      this.isLoading = true;
      let num = (document.getElementById('showshipaddress') as HTMLInputElement);
      if (num.checked) {
        this.customer.BPAddresses[1].AddressName =
          this.customer.BPAddresses[1].AddressName;
        this.customer.BPAddresses[1].BPCode =
          this.customer.BPAddresses[1].BPCode;
        this.customer.BPAddresses[1].Block = this.customer.BPAddresses[1].Block;
        this.customer.BPAddresses[1].City = this.customer.BPAddresses[1].City;
        this.customer.BPAddresses[1].Street =
          this.customer.BPAddresses[1].Street;
        this.customer.BPAddresses[1].U_SHPTYP =
          this.customer.BPAddresses[1].U_SHPTYP;
        this.customer.BPAddresses[1].ZipCode =
          this.customer.BPAddresses[1].ZipCode;
        this.customer.BPAddresses[1].State = this.codeState2[0];
        this.customer.BPAddresses[1].U_STATE = this.codeState2[1];
      } else {
        this.customer.BPAddresses[1].AddressName =
          this.customer.BPAddresses[0].AddressName;
        this.customer.BPAddresses[1].BPCode =
          this.customer.BPAddresses[0].BPCode;
        this.customer.BPAddresses[1].Block = this.customer.BPAddresses[0].Block;
        this.customer.BPAddresses[1].City = this.customer.BPAddresses[0].City;
        this.customer.BPAddresses[1].Street =
          this.customer.BPAddresses[0].Street;
        this.customer.BPAddresses[1].U_SHPTYP =
          this.customer.BPAddresses[0].U_SHPTYP;
        this.customer.BPAddresses[1].ZipCode =
          this.customer.BPAddresses[0].ZipCode;
          this.customer.BPAddresses[1].Country = this.customer.BPAddresses[0].Country;
        this.customer.BPAddresses[1].U_COUNTRY = this.customer.BPAddresses[0].U_COUNTRY;
        this.customer.BPAddresses[1].State = this.codeState[0];
        this.customer.BPAddresses[1].U_STATE = this.codeState[1];
      }
      this.bridgeService2.storeCustomer(this.customer).subscribe(
        (res: Customer) => {
          if (Object(res)['status'] == "200") {
            this.isLoading = false;

            this._NotifierService.showSuccess(this.Headingss[0].leftheading+" "+this.Headingss[0].heading103+" "+this.Headingss[0].heading106);
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
        }
      );

    } else {
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
          $("ng-select[name=" + keyys + "]").removeClass("red-line-border");
        }
      }
    }

  }

  showshipaddress() {
    let num = (document.getElementById('showshipaddress') as HTMLInputElement);
    if (num.checked) {
      // $('.showshipaddress').show();
      this.showshipaddressBool = true;
    } else {
      // $('.showshipaddress').hide();
      this.showshipaddressBool = false;
    }
  }


  backClicked() {
    this._location.back();
  }

  cstmrtype: any;
  getCustomerTypeList(): void {
    this.isLoading = true;
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
