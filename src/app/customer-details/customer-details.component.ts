import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { BridgeService } from '../modules/service/bridge.service';
import { Location } from '@angular/common';
import { Activity } from '../modules/model/chatter';
import { Customer, Branch, EditBranch, Country, States, ContactPerson, updateContactPerson, } from '../customer';
import Chart from 'chart.js/auto';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { cutomerAttach, getcutomerAttach, updatecutomerAttach } from '../campaign';
import { HeadingServicesService } from '../modules/service/heading-services.service';
import { NotiferService } from '../modules/service/helpers/notifer.service';
declare var $: any;

@Component({
  selector: 'app-customer-details',
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.css'],
})
export class CustomerDetailsComponent implements OnInit {
  baseUrl2: any;
  getcutomerAttach1: getcutomerAttach[] = [];
  cutomerAttach1: cutomerAttach = {
    Attach: '',
    cust_id: '',
    CreateDate: this.HeadingServices.getDate(),
    CreateTime: this.HeadingServices.getTime(),

  }
  updatecutomerAttach1: updatecutomerAttach = {
    Attach: '',
    cust_id: '',
    UpdateDate: this.HeadingServices.getDate(),
    UpdateTime: this.HeadingServices.getTime(),
    id: '',

  }
  customers: Customer[] = [];
  branchs: Branch[] = [];
  branch: Branch = {
    BPID: '',
    RowNum: '',
    BPCode: '',
    BranchName: '',
    AddressName: '',
    AddressName2: '',
    AddressName3: '',
    BuildingFloorRoom: '',
    Street: '',
    Block: '',
    Country: 'IN',
    City: '',
    ZipCode: '',
    State: null,
    County: 'IN',
    AddressType: '',
    Phone: '',
    Fax: '',
    Email: '',
    TaxOffice: '',
    GSTIN: '',
    GstType: '',
    ShippingType: '',
    PaymentTerm: '',
    CurrentBalance: '',
    CreditLimit: '',
    Lat: '',
    Long: '',
    Status: '',
    Default: '',
    U_SHPTYP: '',
    U_COUNTRY: 'India',
    U_STATE: '',
    CreateDate: this.HeadingServices.getDate(),
    CreateTime: this.HeadingServices.getTime(),
    UpdateDate: this.HeadingServices.getDate(),
    UpdateTime: this.HeadingServices.getTime(),
  };

  editbranchs: EditBranch[] = [];
  editbranch: EditBranch = {
    id: '',
    BPID: '',
    RowNum: '',
    BPCode: '',
    BranchName: '',
    AddressName: '',
    AddressName2: '',
    AddressName3: '',
    BuildingFloorRoom: '',
    Street: '',
    Block: '',
    Country: '',
    City: '',
    ZipCode: '',
    State: '',
    County: '',
    AddressType: '',
    Phone: '',
    Fax: '',
    Email: '',
    TaxOffice: '',
    GSTIN: '',
    GstType: '',
    ShippingType: '',
    PaymentTerm: '',
    CurrentBalance: '',
    CreditLimit: '',
    Lat: '',
    Long: '',
    Status: '',
    Default: '',
    U_SHPTYP: '',
    U_COUNTRY: '',
    U_STATE: '',
    CreateDate: this.HeadingServices.getDate(),
    CreateTime: this.HeadingServices.getTime(),
    UpdateDate: this.HeadingServices.getDate(),
    UpdateTime: this.HeadingServices.getTime(),
  };

  countrys: Country[] = [];
  statess: States[] = [];
  statess1: States[] = [];
  activity: Activity[] = [];
  closeResult = '';
  UserName: any;
  error = '';
  success = '';
  idd: any;
  Cidd: any;
  CardCode: any;
  isLoading: boolean = false;
  isLoading2: boolean = false;
  isdataLoading:boolean=false;
  nodatafound:boolean=false;
  contactPersoneList: ContactPerson[] = [];
  contactPersoneAdd: ContactPerson = {
    Title: '',
    FirstName: '',
    MiddleName: '',
    LastName: '',
    Position: '',
    Address: '',
    MobilePhone: '',
    Fax: '',
    E_Mail: '',
    Remarks1: '',
    InternalCode: '',
    DateOfBirth: '',
    Gender: '',
    Profession: '',
    CardCode: '',
    U_BPID: '',
    U_BRANCHID: '',
    U_NATIONALTY: '',
    CreateDate: this.HeadingServices.getDate(),
    CreateTime: this.HeadingServices.getTime(),
    UpdateDate: this.HeadingServices.getDate(),
    UpdateTime: this.HeadingServices.getTime(),
  };
  contactPersoneUpdate: updateContactPerson = {
    id: '',
    Title: '',
    FirstName: '',
    MiddleName: '',
    LastName: '',
    Position: '',
    Address: '',
    MobilePhone: '',
    Fax: '',
    E_Mail: '',
    Remarks1: '',
    InternalCode: '',
    DateOfBirth: '',
    Gender: '',
    Profession: '',
    CardCode: '',
    U_BPID: '',
    U_BRANCHID: '',
    U_NATIONALTY: '',
    CreateDate: this.HeadingServices.getDate(),
    CreateTime: this.HeadingServices.getTime(),
    UpdateDate: this.HeadingServices.getDate(),
    UpdateTime: this.HeadingServices.getTime(),
  };
  Allopportunitys:any[] = [];
  AllQuotations:any[] = [];
  AllOrders:any[] = [];
  AllInvoice:any[] = [];
  nopaymentdata:boolean=false;
  commonObj: any = {
    isNotes: true,detailTab:'detail',activityTab: 'note',contactTab:'Sales'
  }
  Headingss: any[] = [];
  ShippingType:any;
  savedModules: any[] = [];
  constructor(
    private bridgeService: BridgeService,
    private route: Router,
    private HeadingServices: HeadingServicesService,
    private _NotifierService: NotiferService,
    private router: ActivatedRoute,
    private modalService: NgbModal,
    private http: HttpClient,
    private _location: Location
  ) {
    this.baseUrl2 = this.bridgeService.baseUrl2;
  }

  ngOnInit(): void {
    if (this.HeadingServices.isModuleView(3) == false) {
      this.route.navigate(['/dashboard']);
    }
    this.bridgeService.autoCall();
    var C = 'C';
    // this.idd = this.router.snapshot.params.id;
    this.Cidd = this.router.snapshot.params.id;
    // this.Cidd = C + this.router.snapshot.params.id;
    this.ShippingType=this.bridgeService.ShippingType;
    // console.log(this.Cidd);
    this.getCustomer();
    this.getEventTask();

    this.UserName = sessionStorage.getItem('UserName');
    this.Headingss = this.HeadingServices.getModule3();
    if (this.UserName == undefined) {
      this.route.navigate(['/login']);
    }
    this.getCountry();
    $(document).mouseup(function (e: { target: any }) {
      var popup = $('.hover-show');
      if (!$('.edit-delete').is(e.target) && !popup.is(e.target) && popup.has(e.target).length == 0) {
        popup.hide();
      }
    });

    $(document).ready(function () {
      $('.hover-show').hide();
    });

    $(document).mouseup(function (e: { target: any }) {
      var popup = $('.hover-show2');
      if (!$('.edit-delete2').is(e.target) && !popup.is(e.target) && popup.has(e.target).length == 0) {
        popup.hide();
      }
    });

    $(document).ready(function () {
      $('.hover-show2').hide();
    });

    this.bridgeService.getOneCustomerdata(this.Cidd).subscribe(
      (data: any) => {
        // debugger
        this.idd = data[0]['id'];
        // console.log('card-code',data);
      this.bridgeService.getContactPersone(data[0]['CardCode']).subscribe((data: ContactPerson[]) => {
        this.contactPersoneList = data;
        // console.log(this.activity);
        // console.log(this.HeadingServices.getDate());

      },
        (err) => {
          console.log(err);
          this.error = err;
        }
      );
      });
    // this.http.post(this.baseUrl2 + '/businesspartner/one', { CardCode: this.Cidd }).toPromise().then((data: any) => {

    // });

    const savedModulesString = sessionStorage.getItem('savedModules');
    if (savedModulesString) {
      this.savedModules = JSON.parse(savedModulesString);
    }
  }


  getAllOpportunity(CardCode:any): void {
    this.bridgeService.getOpportunityByPagination({PageNo: 1,maxItem: 'All',},'',{CardCode:CardCode},'id','desc').subscribe(
      (data: any) => {
        if (data.status == "200") {
        this.Allopportunitys = data.data;
        }

    else {
      this._NotifierService.showError(data.message);
    }
    },
      (err) => {
        const delim = ':';
        const name = err.message;
        const result = name.split(delim).slice(3).join(delim);
        this._NotifierService.showError(result);
      }
    );
  }

  getAllQuotation(CardCode:any): void {
    this.bridgeService.getQuotationByPagination({PageNo: 1,maxItem: 'All',},'',{CardCode:CardCode},'id','desc').subscribe(
      (data: any) => {
        if (data.status == "200") {
        this.AllQuotations = data.data;
        }

    else {
      this._NotifierService.showError(data.message);
    }
    },
      (err) => {
        const delim = ':';
        const name = err.message;
        const result = name.split(delim).slice(3).join(delim);
        this._NotifierService.showError(result);
      }
    );
  }

  getAllOrder(CardCode:any): void {
    this.bridgeService.getOrderByPagination({PageNo: 1,maxItem: 'All',},'',{CardCode:CardCode},'id','desc').subscribe(
      (data: any) => {
        if (data.status == "200") {
        this.AllOrders = data.data;
        }

    else {
      this._NotifierService.showError(data.message);
    }
    },
      (err) => {
        const delim = ':';
        const name = err.message;
        const result = name.split(delim).slice(3).join(delim);
        this._NotifierService.showError(result);
      }
    );
  }

  getAllInvoice(CardCode:any): void {
    this.bridgeService.getOrderByPagination({PageNo: 1,maxItem: 'All',},'',{CardCode:CardCode},'id','desc').subscribe(
      (data: any) => {
        if (data.status == "200") {
        this.AllInvoice = data.data;
        }

    else {
      this._NotifierService.showError(data.message);
    }
    },
      (err) => {
        const delim = ':';
        const name = err.message;
        const result = name.split(delim).slice(3).join(delim);
        this._NotifierService.showError(result);
      }
    );
  }
  addContactPersone(f: NgForm) {
    f = this.bridgeService.GlobaleTrimFunc(f);
    this.resetAlerts();
    if (f.valid) {
      this.isLoading = true;
      this.bridgeService.getOneCustomerdata(this.Cidd).subscribe(
        (data: any) => {
          this.contactPersoneAdd.U_NATIONALTY = 'Indian';
          this.contactPersoneAdd.U_BPID = this.idd;
          this.contactPersoneAdd.U_BRANCHID = '1';
          this.contactPersoneAdd.CardCode = data[0]['CardCode'];

          this.bridgeService
            .storeContractPersone(this.contactPersoneAdd)
            .subscribe(
              (res: ContactPerson) => {
                if (Object(res)['status'] == "200") {
                  this.contactPersoneList.push(res);
                  this.isLoading = false;
                  this.modalService.dismissAll();

          this._NotifierService.showSuccess(this.Headingss[1].SubHeading+" "+this.Headingss[0].heading103+" "+this.Headingss[0].heading106);
                  this.getCustomer();
                  f.reset();
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
        });
      // this.http.post(this.baseUrl2 + '/businesspartner/one', { CardCode: this.Cidd })
      //   .toPromise()
      //   .then((data: any) => {

      //   });
    } else {
      for (let i = 0; i < Object.keys(f.value).length; i++) {
        var keyys = Object.keys(f.value)[i];
        if (f.value[keyys].length == 0) {
          if ($('input[name=' + keyys + ']').hasClass('required-fld')) {
            $('input[name=' + keyys + ']').addClass('red-line-border');
            $('input[name=' + keyys + ']').focus();
          }
          else if ($('textarea[name=' + keyys + ']').hasClass('required-fld')) {
            $('textarea[name=' + keyys + ']').addClass('red-line-border');
            $('textarea[name=' + keyys + ']').focus();
          }
          else if ($("select[name=" + keyys + "]").hasClass('required-fld')) {
            $("select[name=" + keyys + "]").addClass("red-line-border");
            $("select[name=" + keyys + "]").focus();
          }
        } else {
          $('input[name=' + keyys + ']').removeClass('red-line-border');
          $('select[name=' + keyys + ']').removeClass('red-line-border');
          $('textarea[name=' + keyys + ']').removeClass('red-line-border');
        }
      }
    }
  }



  getEventTask(): void {
    this.bridgeService.getAllEventTaskdata(this.HeadingServices.getDate()).subscribe(
      (data: Activity[]) => {
        this.activity = data;

      },
      (err) => {
        console.log(err);
        this.error = err;
      }
    );
  }

  show_details() {
    $('.sho-high').show(500);
    $('.show-details').hide(500);
    $('.hide-details').show(500);
  }

  hide_details() {
    $('.sho-high').hide(500);
    $('.show-details').show(500);
    $('.hide-details').hide(500);
  }

  getCountry(): void {
    this.bridgeService.getCountrydata().subscribe(
      (data: Country[]) => {
        this.countrys = data;

      },
      (err) => {
        console.log(err);
        this.error = err;
      }
    );
  }
  orderAttachment:any = [];
  selectedDay: any;
  code: any[]=[];
  filterVal: any = '';
  // this.branch.Country = this.code[0];
  //     this.branch.U_COUNTRY = this.code[1];
  //     this.branch.State = this.codeState[0];
  //     this.branch.U_STATE = this.codeState[1];
  selectChangeHandler(event: any) {
    // console.log('------event',event);
    //update the ui

    this.filterVal = this.countrys.filter(($option: any) => $option.Code == event.Code)[0];
    // console.log(this.filterVal);
    console.log('country filter value',this.filterVal);

    this.code[0] = this.filterVal.Code;
    this.code[1] = this.filterVal.Name;
    this.selectedDay = event;
   // this.code = this.selectedDay.split(',');
    this.getState();
  }

  selectedDayState: any;
  codeState: any[]=[];
  filtersateVal:any='';
  selectChangeHandlerState(event: any) {
    //update the ui
    this.filtersateVal = this.statess.filter(($option: any) => $option.Code == event.Code)[0];
    console.log('state filter value',this.filterVal);
    this.codeState[0] = this.filtersateVal.Code;
    this.codeState[1] = this.filtersateVal.Name;
    console.log('state filter value',this.filtersateVal);
    this.selectedDayState = event;
   // this.codeState = this.selectedDayState.split(',');
  }

  getState(): void {
    this.bridgeService.getStatedata(this.code[0]).subscribe(
      (data: States[]) => {
        this.statess = data;

      },
      (err) => {
        console.log(err);
        this.error = err;
      }
    );
  }


  open(content: any) {
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


  open1(contentattach: any) {
    this.modalService.open(contentattach, { ariaLabelledBy: 'modal-basic-title', modalDialogClass: 'modal-dialog-centered order-cards-modal' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  getCustomer(): void {
    this.isdataLoading=true;
    this.bridgeService.getOneCustomerdata(this.Cidd).subscribe((data: Customer[]) => {
      // debugger
        this.customers = data;
        this.isdataLoading=false;
        this.CardCode = this.customers[0]['CardCode'];
      //  this.orderAttachment =  this.customers[0]['AttachmentEntry']
        this.chartsCaller(this.CardCode);
        this.bridgeService.getCustomerBranchdata(this.customers[0]['CardCode']).subscribe((data: Branch[]) => {
            this.branchs = data;

          },(err) => {
            this.error = err;
          }
        );

      // Opportunity
      this.getAllOpportunity(this.customers[0]['CardCode']);
      this.getAllInvoice(this.customers[0]['CardCode']);
      this.getAllOrder(this.customers[0]['CardCode']);
      this.getAllQuotation(this.customers[0]['CardCode']);

    this.getCustomerAttachment();
        this.bridgeService.getStatedata(this.customers[0].BPAddresses[0].Country).subscribe(
          (data: States[]) => {
            this.statess = data;
            // console.log(this.statess);

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



  resetAlerts() {
    this.error = '';
    this.success = '';
  }

  addBranch(f: NgForm) {

    f = this.bridgeService.GlobaleTrimFunc(f);
    this.resetAlerts();
    this.isLoading = true;
    for(let [keys,value] of Object.entries(f.value)){
      let numKey = ["U_LEADID"];
      if(numKey.includes(keys)){
        f.value[keys] = 0;
      }
      else if(!!!f.value[keys]){
        f.value[keys] = "";

      }
    }
    if (f.valid) {
      // console.log(this.branch)
      if(this.code.length != 0){
      this.branch.Country = this.code[0];
      this.branch.U_COUNTRY = this.code[1];
      }
      this.branch.State = this.codeState[0];
      this.branch.U_STATE = this.codeState[1];
      this.branch.BPID = this.idd;
      this.branch.BPCode = this.CardCode;
      this.branch.BranchName = this.branch.AddressName;
      this.branch.AddressType = 'bo_ShipTo';
      this.isLoading = true;
      this.bridgeService.storeBpBranch1(this.branch).subscribe(
        (res: Branch) => {

          if (Object(res)['status'] == "200") {
          this.isLoading = false;
          this.modalService.dismissAll();

          this._NotifierService.showSuccess(this.Headingss[2].SubHeading+" "+this.Headingss[0].heading103+" "+this.Headingss[0].heading106);
          this.bridgeService.getCustomerBranchdata(this.customers[0]['CardCode']).subscribe((data: Branch[]) => {
            this.branchs = data;

          })
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

          //  window.location.reload();
        }
      );
    } else {
      for (let i = 0; i < Object.keys(f.value).length; i++) {
        this.isLoading = false;
        var keyys = Object.keys(f.value)[i];
        if (f.value[keyys].length == 0) {
          if ($('input[name=' + keyys + ']').hasClass('required-fld')) {
            $('input[name=' + keyys + ']').addClass('red-line-border');
            $('input[name=' + keyys + ']').focus();
          }
          else if ($('textarea[name=' + keyys + ']').hasClass('required-fld')) {
            $('textarea[name=' + keyys + ']').addClass('red-line-border');
            $('textarea[name=' + keyys + ']').focus();
          }
          else if ($("ng-select[name=" + keyys + "]").hasClass('required-fld')) {
            $("ng-select[name=" + keyys + "]").addClass("red-line-border");
            $("ng-select[name=" + keyys + "]").focus();
          }
        } else {
          $('input[name=' + keyys + ']').removeClass('red-line-border');
          $('ng-select[name=' + keyys + ']').removeClass('red-line-border');
          $('textarea[name=' + keyys + ']').removeClass('red-line-border');
        }
      }
    }
  }

  editdeletepop(item: Branch) {
    $('.hover-show1' + item.id).show();
  }

  editdeletepop2(item: ContactPerson) {
    $('.hover-show' + item.id).show();
  }

  openEdit(contentEdit: any, item: Branch) {
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

    this.editbranch.id = String(item.id);
    this.editbranch.BPID = item.BPID;
    this.editbranch.BPCode = item.BPCode;
    this.editbranch.RowNum = item.RowNum;
    this.editbranch.BranchName = item.BranchName;
    this.editbranch.AddressName = item.AddressName;
    this.editbranch.AddressName2 = item.AddressName2;
    this.editbranch.AddressName3 = item.AddressName3;
    this.editbranch.BuildingFloorRoom = item.BuildingFloorRoom;
    this.editbranch.Street = item.Street;
    this.editbranch.Block = item.Block;
    this.editbranch.Country = item.Country;
    this.editbranch.City = item.City;
    this.editbranch.ZipCode = item.ZipCode;
    this.editbranch.Country = item.Country;
    this.editbranch.U_COUNTRY = item.U_COUNTRY;

    if(!!item.Country){
      this.bridgeService.getStatedata(item.Country).subscribe(
        (data: States[]) => {

          this.statess1 = data;
          this.editbranch.State = item.State;
          this.editbranch.U_STATE = item.U_STATE;

        }
      );
    }
    this.editbranch.AddressType = item.AddressType;
    this.editbranch.Phone = item.Phone;
    this.editbranch.Fax = item.Fax;
    this.editbranch.Email = item.Email;
    this.editbranch.TaxOffice = item.TaxOffice;
    this.editbranch.GSTIN = item.GSTIN;
    this.editbranch.GstType = item.GstType;
    this.editbranch.ShippingType = item.ShippingType;
    this.editbranch.PaymentTerm = item.PaymentTerm;
    this.editbranch.CurrentBalance = item.CurrentBalance;
    this.editbranch.CreditLimit = item.CreditLimit;
    this.editbranch.Lat = item.Lat;
    this.editbranch.Long = item.Long;
    this.editbranch.Status = item.Status;
    this.editbranch.Default = item.Default;
    this.editbranch.U_SHPTYP = item.U_SHPTYP;
    this.editbranch.CreateDate = item.CreateDate;
    this.editbranch.CreateTime = item.CreateTime;
    this.editbranch.ZipCode = item.ZipCode;
    console.log('test data',item);
  }


  // this is for contact update modal

  openEditcontact(contentEdit: any, item: ContactPerson) {
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
    // this.contactPersoneUpdate.FirstName =item.FirstName;
    this.bridgeService.getContactPersoneone(item.id).subscribe(
      (data: updateContactPerson[]) => {
        this.contactPersoneUpdate=data[0];

        //console.log(this.contactPersoneUpdate);
      });
   // this.contactPersoneUpdate = item;
    // console.log('contact edit');

  }

  editselectedDay: any;
  editcode: any;

  editselectChangeHandler(event: any) {
   // this.editselectedDay = event.target.value;
    this.editcode = this.countrys.filter(($option: any) => $option.Code == event.Code)[0];
    //this.editcode = this.editselectedDay.split(',');
    this.editbranch.Country = this.editcode.Code;
    this.editbranch.U_COUNTRY = this.editcode.Name;
    this.getState2();
  }
  editselectedDayState: any;
  editcodeState: any;
  editselectChangeHandlerState(event: any) {
    //this.editselectedDayState = event.target.value;
    this.editcodeState = this.statess1.filter(($option: any) => $option.Code == event.Code)[0];
   // this.editcodeState = this.editselectedDayState.split(',');
    this.editbranch.State = this.editcodeState.Code;
    this.editbranch.U_STATE = this.editcodeState.Name;
  }

  getState2(): void {
    this.bridgeService.getStatedata(this.editcode.Code).subscribe(
      (data: States[]) => {
        this.statess1 = data;

      },
      (err) => {
        console.log(err);
        this.error = err;
      }
    );
  }

  EditBranch(f: NgForm) {
    f = this.bridgeService.GlobaleTrimFunc(f);
    this.resetAlerts();
    this.isLoading2 = true;
    this.bridgeService.storeEditBpBranch1(this.editbranch).subscribe(
      (res: EditBranch) => {
        // Update the list of cars

        if (Object(res)['status'] == "200") {
          //this.branchs.push(res);
         // this.editbranchs.push(res);
          this.isLoading2 = false;

          this.modalService.dismissAll();
          this._NotifierService.showSuccess(this.Headingss[2].SubHeading+" "+this.Headingss[0].heading104+" "+this.Headingss[0].heading106);
          this.ngOnInit();
          // this.success = 'Created successfully';

          // Reset the form
          f.reset();
        }
        else {
           this._NotifierService.showError(Object(res)['message']);
          this.isLoading2 = false;

        }




      },
      (err) => {
        this.isLoading2 = false;
        const delim = ':';
        const name = err.message;
        const result = name.split(delim).slice(3).join(delim);
        this._NotifierService.showError(result);
        // window.location.reload();
      }
    );
  }

  updateContactPersone(f: NgForm) {
    f = this.bridgeService.GlobaleTrimFunc(f);
    this.resetAlerts();

    this.contactPersoneUpdate.UpdateDate= this.HeadingServices.getDate(),
    this.contactPersoneUpdate.UpdateTime= this.HeadingServices.getTime(),
    this.contactPersoneUpdate.CreateDate= this.HeadingServices.getDate(),
    this.contactPersoneUpdate.CreateTime= this.HeadingServices.getTime(),
    this.isLoading2 = true;
    if(f.valid){
      this.bridgeService.storeEditContactPerson(this.contactPersoneUpdate).subscribe(
        (res: updateContactPerson) => {
          this.isLoading2 = false;
          if (Object(res)['status'] == "200") {
            this.isLoading2 = false;
            this.modalService.dismissAll();
          this._NotifierService.showSuccess(this.Headingss[1].SubHeading+" "+this.Headingss[0].heading104+" "+this.Headingss[0].heading106);

             this.getCustomer();

          }
          else {
            this._NotifierService.showError(Object(res)['message']);
            this.isLoading2 = false;
          }

          //  this.route.navigate(['/customer']);
          // window.location.reload();
          // this.success = 'Created successfully';

          // Reset the form

        },
        (err) => {
          this.isLoading2 = false;
          const delim = ':';
          const name = err.message;
          const result = name.split(delim).slice(3).join(delim);
          this._NotifierService.showError(result);
          // window.location.reload();
        }
      );
    }
    else{
      this.isLoading2 = false;
      for (let i = 0; i < Object.keys(f.value).length; i++) {
        var keyys = Object.keys(f.value)[i];
        if (f.value[keyys].length == 0) {

          if ($("input[name=" + keyys + "]").hasClass('required-fld')) {
            $("input[name=" + keyys + "]").addClass("red-line-border");
            $("input[name=" + keyys + "]").focus();
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

          $("select[name=" + keyys + "]").removeClass("red-line-border");
          $("password[name=" + keyys + "]").removeClass("red-line-border");
          $("textarea[name=" + keyys + "]").removeClass("red-line-border");
        }
      }
    }


  }
  deletebranchContact: any;
  DeleteBrachContactType:any;
  deleteBranchContact(confirmModal2:any,id: number,type:any) {
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
    this.deletebranchContact = id;
    this.DeleteBrachContactType = type;
  }

  yesdeleteBranch(deletebranch:any) {
    let id = deletebranch;
    this.bridgeService.deleteCustomerBranch(id).subscribe(
      (res) => {
        this.branchs = this.branchs.filter(function (item) {
          return item['id'] && +item['id'] !== +id;

        });
        this.modalService.dismissAll();
        this.ngOnInit();
      },
      (err) => {
        this.error = err;
      }
    );

  }


  yesdeleteUser(deletecontactpersone: any) {
    let id = deletecontactpersone;
    this.resetAlerts();
    // this.isLoading2 = true;
    this.bridgeService.deleteCustomerContactPerson(id).subscribe(
      (res) => {
        this.contactPersoneList = this.contactPersoneList.filter(function (item) {
          return item['id'] && +item['id'] !== +id;
        });
        this.modalService.dismissAll();
        this.ngOnInit();
      },
      (err) => {
        this.error = err;
      }
    );
}

  open2(content2: any) {
    this.modalService
      .open(content2, { ariaLabelledBy: 'modal-basic-title', modalDialogClass: 'modal-dialog-centered order-cards-modal' })
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }
  openLinkHitter(type: string) {
    this.bridgeService.setAllFilter('',undefined);
    if (type === 'opportunity') {
      this.route.navigate(['/opportunity']);
    } else if (type === 'quotation') {
      this.route.navigate(['/quotation']);
    } else if (type === 'order') {
      this.route.navigate(['/order']);
    } else if (type === 'invoice') {
      this.route.navigate(['/invoice']);
    }
    else if(type === 'payment'){
      this.route.navigate(['/payment-details']);
    }
    else if(type === 'delivery'){
      this.route.navigate(['/delivery']);
    }

    this.bridgeService.setBpCardcode(this.CardCode);
  }

  backClicked() {
    this._location.back();
  }

 deletebranch1: any;
 iemid: any;
 deleteAttach(confirmModal2:any,id: number) {
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
  this.deletebranch1 = id;
}
 yesdeleteBranch1(deletebranch1:any) {
   let id = deletebranch1;
   this.csid = Number(this.customers[0]['id'])
   this.bridgeService.deletecustomerAttachment(id, this.csid).subscribe(
     (res) => {
       this.branchs = this.branchs.filter(function (item) {
         return item['id'] && +item['id'] !== +id;

       });
       this.modalService.dismissAll();
       this.getCustomerAttachment()
     },
     (err) => {
       this.error = err;
     }
   );
   this.ngOnInit();

 }



  csid: any;
  getCustomerAttachment() {
    this.isLoading2 = true;
    // this.idd = this.router.snapshot.params.id;
    this.csid = this.customers[0]['id']
    this.bridgeService.getcustmrAttach(this.csid).subscribe(
      (data: any) => {
        this.getcutomerAttach1 = data.data;
        this.isLoading2 = false;
      }

    )

  }


  fl: any = [];
  sele_img_name: any;



  onFileDropped($event: any) {
    this.prepareFilesList($event);
  }

  /**
   * handle file from browsing
   */
  fileBrowseHandler(files: any) {
    this.prepareFilesList(files.target.files);
  }

  prepareFilesList(files: Array<any>) {
    this.fl=files
    if (files[0].size > 1055736 * 5) {
      alert("please select less than 5MB of size")

    }
    else{
      // this.idd = this.router.snapshot.params.id;
      this.cutomerAttach1.Attach = this.fl
      this.cutomerAttach1.cust_id = this.customers[0]['id'];
      // console.log("frm", this.cutomerAttach1)
        this.bridgeService.insertCustmerAttach(this.cutomerAttach1).subscribe(
          (res: cutomerAttach) => {
            if (Object(res)['status'] == "200") {
            this.isLoading = false;
            // this._NotifierService.showSuccess('Added Attachment Successfully !');
              this.ngOnInit();
          }
          else {
            this._NotifierService.showError(Object(res)['message']);
            this.isLoading = false;
          }
            this.getCustomerAttachment();


      })
    }
}


  anyliticsChart:any;
  jan:any;
  dataarray:any=[0,0,0,0,0,0,0,0,0,0,0,0];
  PaymentCollection:any[]=[];
  chartsCaller(cardnumber:any) {
  this.nodatafound=false;
  this.bridgeService.BusinessPartnermonthsale(cardnumber).subscribe(
    (data: any) => {

      this.anyliticsChart = data;
      if(this.anyliticsChart.data.length==0){
        this.nodatafound=true;
      }
  const month = ["January","February","March","April","May","June","July","August","September","October","November","December"];

  for(let i=0;i<this.anyliticsChart.data.length;i++){
    var findindex=this.anyliticsChart.data[i].Month-1
    var findsales=this.anyliticsChart.data[i].MonthlySales
    this.dataarray[findindex]=findsales

  }

    })

    this.bridgeService.CustomerPaymentSummary(cardnumber).subscribe(
      (data: any) => {
        this.PaymentCollection=data.data;
        var pendingPayment=this.PaymentCollection[0].PendingPayment*100/this.PaymentCollection[0].TotalPayment || 0;
        var ReceivedPayment=this.PaymentCollection[0].ReceivedPayment*100/this.PaymentCollection[0].TotalPayment || 0;
        var TotalPayment=this.PaymentCollection[0].TotalPayment
        //console.log('TotalPayment',TotalPayment);

          if(TotalPayment<1){
            this.nopaymentdata=true;
            $('#paymentChart').hide();
            $('.payment-performance-bottom-labels').hide();
          }
          else{
            this.nopaymentdata=false;
          }


        const formatCash = (n:any) => {
          if (n < 1e3) return n;
          //if (n >= 1e2 && n < 1e3) return +(n / 1e2).toFixed(1) + "H";
          if (n >= 1e3 && n < 1e6) return +(n / 1e3).toFixed(1) + "K";
          if (n >= 1e6 && n < 1e9) return +(n / 1e6).toFixed(1) + "M";
          if (n >= 1e9 && n < 1e12) return +(n / 1e9).toFixed(1) + "B";
          if (n >= 1e12) return +(n / 1e12).toFixed(1) + "T";
        };


      });


  }

  SetCardCode(item: any,type:any) {
    if(type=='Opportunity'){
    this.bridgeService.setBpCardcode(item);
    this.bridgeService.setAllFilter('',undefined);
     this.route.navigate(['/opportunity/add-opportunity']);
    }
    else if(type=='Quotation'){
      this.bridgeService.setBpCardcode(item);
      this.bridgeService.setAllFilter('',undefined);
       this.route.navigate(['/quotation/add-quotation']);
      }
    else if(type=='Order'){
      this.bridgeService.setBpCardcode(item);
      this.bridgeService.setAllFilter('',undefined);
       this.route.navigate(['/order/add-order']);
      }

    else if(type=='Inovice'){
      this.bridgeService.setBpCardcode(item);
      this.bridgeService.setAllFilter('',undefined);
       this.route.navigate(['/invoice/add-invoice']);
      }
   }

   isModuleViewedit(module_id: number): boolean {  
    const selectedModule = this.savedModules?.filter((module: any) => module.module_id === module_id);
    if (selectedModule && selectedModule.length > 0 && selectedModule[0].is_edit) {
      return true;
    }
    return false;
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
}

