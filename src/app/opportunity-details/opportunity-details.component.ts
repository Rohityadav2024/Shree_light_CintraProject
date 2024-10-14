import { HttpClient } from '@angular/common/http';
import { Component, HostListener, OnInit, AfterViewChecked, ElementRef, ViewChild} from '@angular/core';
import { NgForm, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { BridgeService } from '../modules/service/bridge.service';
import { oneopportunity, opportunity } from '../opportunity';
import { Stages, CreateStages, ChangeStages, CompleteStages } from '../stage';
import { Chatter, Activity, EditActivity, OppoAttach,  } from '../chatter';
import { Location } from '@angular/common';
import { Bridge2 } from '../bridge2';
import { Quotation } from '../quotation';
import { Orders } from '../orders';
import { NotiferService } from '../modules/service/helpers/notifer.service';
import { HeadingServicesService } from '../modules/service/heading-services.service';
declare var $: any;

@Component({
  selector: 'app-opportunity-details',
  templateUrl: './opportunity-details.component.html',
  styleUrls: ['./opportunity-details.component.scss']
})
export class OpportunityDetailsComponent implements OnInit, AfterViewChecked {
  @ViewChild('scrollMe') private myScrollContainer!: ElementRef;
  baseUrl2: any;
  isLoading:boolean=false;
  activity: Activity[] = [];
  Activitys: Activity = {
    SourceID: '',
    SourceType: 'Opportunity',
    Subject: '',
    Comment: '',
    ParticipantsType:'',
    Name: '',
    RelatedTo: 'hi',
    Emp: '',
    Title: '',
    Description: '',
    From: this.HeadingServices.getDate(),
    To: this.HeadingServices.getDate(),
    Time: this.HeadingServices.getTime(),
    Allday: 'false',
    Location: '',
    Host: '',
    Participants: [],
    Document: '',
    Repeated: '',
    Priority: 'low',
    ProgressStatus: 'WIP',
    Status: 1,
    ToTime:this.HeadingServices.getTime(),
    Type: '',
    CreateDate: this.HeadingServices.getDate(),
    CreateTime: this.HeadingServices.getTime()
  };
  Editactivity: EditActivity[] = [];

  EdiitActivitys: EditActivity = {
    Opp_Id: '',
    Subject: '',
    Comment: '',
    Name: '',
    RelatedTo: '',
    Emp: '',
    Title: '',
    Description: '',
    From: '',
    To: '',
    Time: '',
    Allday: 'false',
    Location: '',
    Host: '',
    Participants: [],
    Document: '',
    Repeated: '',
    Priority: '',
    ProgressStatus: '',
    Type: '',
    Status: 1,
    ToTime:this.HeadingServices.getTime(),
    CreateDate: '',
    CreateTime: '',
    id: ''
  };
  chatters: Chatter[] = [];
  chatterr: Chatter = {
    Message: '',
    SourceID: '', Mode: "",
    SourceType: 'Opportunity',
    Emp: '',
    Emp_Name: '',
    UpdateDate: this.HeadingServices.getDate(),
    UpdateTime: this.HeadingServices.getTime()
  };
  stages: any[] = [];
  quotationsList: Quotation[] = [];
  ordersList:Orders[] = [];
  opportunitys: oneopportunity[] = [];
  closeResult = '';
  UserName: any;
  error = '';
  success = '';
  idd: any;
  stage_lenght: any;
  bridges2: Bridge2[] = [];
  stage: Stages = {
    SequenceNo: '',
    Name: '',
    Stageno: '',
    ClosingPercentage: '0.0',
    Cancelled: 'tNO',
    IsSales: 'tYES',
    IsPurchasing: 'tYES',
    Comment: '',
    File: '',
    CreateDate: this.HeadingServices.getDate(),
    UpdateDate: this.HeadingServices.getDate(),
    Status: '',
    Opp_Id: '',
    Class: '',
    Color: '',
    popup1: '', popup2: '', popup3: ''
  };

  Createstages: CreateStages[] = [];

  Createstage: CreateStages = {
    SequenceNo: '',
    Name: '',
    Stageno: '',
    ClosingPercentage: '0.0',
    Cancelled: 'tNO',
    IsSales: 'tYES',
    IsPurchasing: 'tYES',
    CreateDate: this.HeadingServices.getDate(),
    UpdateDate: this.HeadingServices.getDate(),
    Opp_Id: ''
  };
  Changestages: ChangeStages[] = [];
  Changestage: ChangeStages = {
    Stageno: '',
    Comment: '',
    File: 'abc.png',
    UpdateDate: this.HeadingServices.getDate(),
    UpdateTime: this.HeadingServices.getTime(),
    Opp_Id: '',
    DocId: '',
    StartDate: '',
    EndDate: '',
    Status: '',
  };

  Completestages: CompleteStages[] = [];
  Completetage: CompleteStages = {
    Remarks: '',
    Status: 'sos_Sold',
    UpdateDate: this.HeadingServices.getDate(),
    UpdateTime: this.HeadingServices.getTime(),
    Opp_Id: ''
  };

  contactPersoneList: any;
  selectedDay: any;
  UserId: any;
  role: any;
  reportingTo: any;
  curntDate: any;

  opportunityAttach: OppoAttach = {
    Attach: '',
    oppId: '',
    CreateDate: this.HeadingServices.getDate(),
    CreateTime: this.HeadingServices.getTime(),

  }

  urlcheck:any;
  opporid:any;
  @ViewChild('f') form!: NgForm;

  CampaignFrequency:any;
  TaskProgressStatus:any;
  OrderStage:any;
  Headingss: any[] = [];
  commonObj: any = { isContact: true, bpAddreassMerge: null,detailTab:'Items',activityTab: 'event' };
  ticketsAll:any[] = [];
  savedModules: any[] = [];
  constructor(private modalService: NgbModal, private _NotifierService: NotiferService,private HeadingServices: HeadingServicesService, private route: Router, private bridgeService2: BridgeService, private router: ActivatedRoute, private http: HttpClient,
  private routers: Router,private _location: Location) {
    this.baseUrl2 = this.bridgeService2.baseUrl2;
  }

  ngOnInit(): void {
    this.scrollToBottom();

    this.bridgeService2.autoCall();
    this.CampaignFrequency=this.bridgeService2.CampaignFrequency;
    this.TaskProgressStatus=this.bridgeService2.TaskProgressStatus;
    this.OrderStage=this.bridgeService2.OrderStage;
    this.curntDate = this.HeadingServices.getDate();

    this.UserName = sessionStorage.getItem('UserName');
    this.UserId = sessionStorage.getItem('UserId');
    this.role = sessionStorage.getItem('role');
    this.reportingTo = sessionStorage.getItem('reportingTo');
    this.Headingss = this.HeadingServices.getModule4();
    if (this.UserName == undefined) {
      this.route.navigate(['/login']);
    }
    this.router.params.subscribe(params => {
      this.idd = params['id'];
      if (this.idd != undefined) {
        this.loadData();
      }
    });

    this.idd = this.router.snapshot.params.id;
    this.getOpportunity(this.idd);
    this.getStages();
    this.getActivity();
    this.getLead();
    this.getQuotationList();
    this.getOrderList();

    $(document).mouseup(function (e: { target: any; }) {
      var popup = $(".hover-show");
      if (!$('.edit-delete').is(e.target) && !popup.is(e.target) && popup.has(e.target).length == 0) {
        popup.hide();
      }
    });

    $(document).mouseup(function (e: { target: any; }) {
      var popup = $(".hover-show12");
      if (!$('.edit-delete').is(e.target) && !popup.is(e.target) && popup.has(e.target).length == 0) {
        popup.hide();
      }
    });

    this.Activitys.Repeated = '';
    this.Activitys.Participants = '';
    var priviousUrl = this.bridgeService2.getPreviousUrl();
    this.urlcheck = priviousUrl.split('/');
    if (this.urlcheck[1]==='opportunity') {
      this.opporid = this.bridgeService2.getBpCardcode();
    }


    const savedModulesString = sessionStorage.getItem('savedModules');
    if (savedModulesString) {
      this.savedModules = JSON.parse(savedModulesString);
    }

  }
  loadData(): void {
    this.getOpportunity(this.idd)
  }
  getQuotationList(): void {
    this.bridgeService2.getQuotationShortdata().subscribe(
      (data: Quotation[]) => {
        this.quotationsList = data;
      },
      (err) => {
        console.log(err);
        this.error = err;
      }
    );
  }

  getOrderList(): void {
    this.bridgeService2.getOrderShortdata().subscribe(
      (data: Orders[]) => {
        this.ordersList = data;
      },
      (err) => {
        console.log(err);
        this.error = err;
      }
    );
  }
  getLead(): void {
    this.isLoading = true;
        this.bridgeService2.getLeadShortdata().subscribe(
          (data: Bridge2[]) => {
            this.bridges2 = data;
            this.isLoading = false;
          },
          (err) => {
            console.log(err);
            this.error = err;
          }
        );
  }
  ngAfterViewChecked() {
    this.scrollToBottom();
}

scrollToBottom(): void {
    try {
        this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    } catch(err) { }
}

  resetAlerts() {
    this.error = '';
    this.success = '';
  }

  Opportunity_name: any;
  opportunitytype: any[] = [];
  total_after:any;
  total_Amount:any;
  getoppoAttach:any[]=[];
  customers:any[] = [];
  Items:any[] = [];
  Allopportunitys:any[] = [];
  AllQuotations:any[] = [];
  AllOrders:any[] = [];
  Sname: any;
  sid: any;
  lastStage: any;

  total_before: any = 0;
  total_after_tax:any = 0;
  tax_Value:any = 0;
  getOpportunity(idd: any): void {
    this.isLoading = true;
    this.idd = idd;
    this.bridgeService2.getOneOpportunitydata(this.idd).subscribe(
      (data: oneopportunity[]) => {
        this.isLoading = false;
        var totalamount=new Array;
        this.opportunitys = data;

        this.getoppoAttach=data[0].Attach;
        this.selectedDay = this.opportunitys[0]['CardCode'];
        this.Opportunity_name = this.opportunitys[0]['OpportunityName'];
        this.Items = this.opportunitys[0]['OppItem']
        this.getCustomer(this.selectedDay);

        this.total_after = 0;
        this.total_after_tax = 0;
        this.tax_Value = 0;
        this.total_Amount = 0;
        for (let i = 0; i < this.opportunitys[0]['OppItem'].length; i++) {
          // var total=(this.opportunitys[0]['OppItem'][i].Quantity
          var basic = Number(this.opportunitys[0]['OppItem'][i].Quantity) * Number(this.opportunitys[0]['OppItem'][i].UnitPrice);
          var afterfdis = basic - (basic * (Number(this.opportunitys[0]['OppItem'][i].DiscountPercent) / 100))
          var aftersdis = afterfdis - (afterfdis * (Number(0) / 100))
          var total = aftersdis + (aftersdis * (Number(this.opportunitys[0]['OppItem'][i].Tax) / 100))
          totalamount.push(total);
          this.total_after += afterfdis;
          this.total_after_tax += aftersdis;
          this.tax_Value +=  (aftersdis * (Number(this.opportunitys[0]['OppItem'][i].Tax) / 100));
        }
        this.total_Amount=totalamount.reduce((a:any, b:any) => a + Number(b), 0);

        // Contact Person
        this.bridgeService2.getContactPersone(this.selectedDay).subscribe(
        (data: any) => {
          this.contactPersoneList = data;
        });

      // Opportunity
      this.getAllOpportunity(this.selectedDay);


      // Quotation
      this.getAllQuotation(this.idd);

      // Quotation
      this.getAllOrder(this.idd);

      },
      (err) => {
        console.log(err);
        this.error = err;
      }


    );
  }
  getAllOpportunity(CardCode:any): void {
    this.bridgeService2.getOpportunityByPagination({PageNo: 1,maxItem: 'All',},'',{CardCode:CardCode},'id','desc').subscribe(
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

  getAllQuotation(OppID:any): void {
    this.bridgeService2.getQuotationByPagination({PageNo: 1,maxItem: 'All',},'',{OppID:OppID},'id','desc').subscribe(
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

  getAllOrder(OppID:any): void {
    this.bridgeService2.getOrderByPagination({PageNo: 1,maxItem: 'All',},'',{OppID:OppID},'id','desc').subscribe(
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
  getCustomer(Cidd:any): void {
    this.bridgeService2.getOneCustomerdata(Cidd).subscribe((data: any) => {
        this.customers = data;
      },
      (err) => {
        console.log(err);
        this.error = err;
      }
    );
  }

  createQuptation(id:any,type:any){
    if(type == 'Order'){
      this.bridgeService2.setOpportunityID(id);
      this.bridgeService2.setAllFilter('',undefined);
      this.route.navigate(['/order/add-order']);
    }
    else{
    // this.bridgeService2._quotation(item);
    this.bridgeService2.setOpportunityID(id);
    this.bridgeService2.setAllFilter('',undefined);
    this.route.navigate(['/quotation/add-quotation']);
    }
  }
  current_stage_number: any;
  current_stage_name: any;
  current_stage_Status: any;
  current_stage_comment: any;
  current_stage_StartDate: any;
  current_stage_EndDate: any;
  current_stage_DocId: any = '';
  stagenumber: any;
  goToPage(name:any,idd:any){
    this.bridgeService2.setAllFilter('',undefined);
    if(name == 'Lead'){
      this.routers.navigate(['/leads/table/lead-details/'+idd]);
    }
    else if(name == 'Order'){
      this.routers.navigate(['/order/order-details/'+idd]);
    }
    else{
      this.routers.navigate(['/quotation/quotation-details/'+idd]);
    }
  }
  current_active_stage :any;
  getStages(): void {
    this.idd = this.router.snapshot.params.id;
    this.bridgeService2.getStagedata(this.idd).subscribe(
      (data: any[]) => {
        this.stages = data;
        for (let i = 0; i < this.stages.length; i++) {
          this.lastStage = this.stages[i]['Status'];
          if (this.stages[i]['Status'] == '2') {
            this.stages[i]['Class'] = 'first-stage';
            this.stages[i]['Color'] = 'complete-stage';
            this.Sname =  this.stages[i]['Name'];
            this.current_stage_comment =  this.stages[i]['Comment'];
            this.current_stage_StartDate =  this.stages[i]['StartDate'];
            this.current_stage_EndDate =  this.stages[i]['EndDate'];
            this.current_stage_Status = this.stages[i]['Status'];
          }
          else if (this.stages[i]['Status'] == '1') {
            this.stages[i]['Class'] = 'first-stage';
            this.stages[i]['Color'] = 'current-stage';
            this.current_stage_number = this.stages[i]['Stageno'];
            this.current_stage_name = this.stages[i]['Name'];
            this.current_active_stage =  this.stages[i]['Name'];
          }
          else {
            this.stages[i]['Class'] = 'second-stage';
            this.stages[i]['Color'] = 'pending-stage';
          }
        }
        // console.log(this.stagenumber);
        // console.log(this.lastStage);

      },
      (err) => {
        console.log(err);
        this.error = err;
      }
    );
  }



  addStage(f: NgForm) {
    f = this.bridgeService2.GlobaleTrimFunc(f);
    this.resetAlerts();
    if (f.valid) {
      this.Createstage.Opp_Id = this.router.snapshot.params.id;
      this.bridgeService2.storeStage(this.Createstage).subscribe(
        (res: CreateStages) => {
          if (Object(res)['status'] == '200') {
            // Update the list of cars
            this.Createstages.push(res)
            this._NotifierService.showSuccess('Stage'+" "+this.Headingss[0].heading103+" "+this.Headingss[0].heading106);
            this.modalService.dismissAll();
            this.ngOnInit();
            f.reset();
          } else {
            this._NotifierService.showError(Object(res)['message']);
          }
        },
        (err) => {
          const delim = ":"
          const name = err.message
          const result = name.split(delim).slice(3).join(delim)
          this._NotifierService.showError(result);
          // window.location.reload();
        }
      );
    }

    else {
      // console.log(this.order);
     // console.log(f.value);
      for (let i = 0; i < Object.keys(f.value).length; i++) {
        var keyys = Object.keys(f.value)[i];
        if (f.value[keyys].length == 0) {
          if ($('input[name=' + keyys + ']').hasClass('required-fld')) {
            $('input[name=' + keyys + ']').addClass('red-line-border');
            $('input[name=' + keyys + ']').focus();
          }
          if ($('select[name=' + keyys + ']').hasClass('required-fld')) {
            $('select[name=' + keyys + ']').addClass('red-line-border');
            $('select[name=' + keyys + ']').focus();
          }
          if ($('textarea[name=' + keyys + ']').hasClass('required-fld')) {
            $('textarea[name=' + keyys + ']').addClass('red-line-border');
            $('textarea[name=' + keyys + ']').focus();
          }
        } else {
          $('input[name=' + keyys + ']').removeClass('red-line-border');
          $('select[name=' + keyys + ']').removeClass('red-line-border');
          $('textarea[name=' + keyys + ']').removeClass('red-line-border');
        }
      }
    }
  }

  validate(input:any){
    //console.log('input',input.target.value)

    if(/^\s/.test(input.target.value))
    {
      input.target.value = '';
    }
  }

  ActivitysParticipants:any[] = [];
  backClicked() {
    this._location.back();
  }
  addActivityEvents(f: NgForm) {

    f = this.bridgeService2.GlobaleTrimFunc(f);
    this.resetAlerts();
    this.Activitys.SourceID = this.idd;
    this.Activitys.Emp = this.UserId;
    if(this.ActivitysParticipants.length == 0 && this.Activitys.Type == 'Task'){
      this._NotifierService.showError('Select Participants');
    }
    else{
      if(this.Activitys.Type == 'Task'){
    this.Activitys.Participants = this.ActivitysParticipants.toString();
      }
      else{
        this.Activitys.Participants = '';
      }

    if (f.valid) {

      this.bridgeService2.storeactivity(this.Activitys).subscribe(
        (res: Activity) => {
          if (Object(res)['status'] == "200") {
          this._NotifierService.showSuccess(this.Activitys.Type+' '+this.Headingss[0].heading103+" "+this.Headingss[0].heading106);
          this.modalService.dismissAll();
          this.getActivity();
          f.reset();
        }
        else{
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
    else {
      for (let i = 0; i < Object.keys(f.value).length; i++) {
        var keyys = Object.keys(f.value)[i];
        if (f.value[keyys].length == 0) {

          if ($("input[name=" + keyys + "]").hasClass('required-fld')) {
            $("input[name=" + keyys + "]").addClass("red-line-border");
            $("input[name=" + keyys + "]").focus();
            $('.help-block').show();
          }
          if ($("select[name=" + keyys + "]").hasClass('required-fld')) {
            $("select[name=" + keyys + "]").addClass("red-line-border");
            $("select[name=" + keyys + "]").focus();
            $('.help-block').show();
          }
          if ($("password[name=" + keyys + "]").hasClass('required-fld')) {
            $("password[name=" + keyys + "]").addClass("red-line-border");
            $("password[name=" + keyys + "]").focus();
            $('.help-block').show();
          }

          if ($("textarea[name=" + keyys + "]").hasClass('required-fld')) {
            $("textarea[name=" + keyys + "]").addClass("red-line-border");
            $("textarea[name=" + keyys + "]").focus();
            $('.help-block').show();
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
  }



  deleteActivity(id: number) {
    if (confirm("Are you want to Delete this Activity ?")) {
      this.resetAlerts();
      this.bridgeService2.deleteActivity(id).subscribe(
        (res) => {
          this.activity = this.activity.filter(function (item) {
            return item['id'] && +item['id'] !== +id;
          });
          // window.location.href = 'users';
          // this.success = 'Deleted successfully';
        },
        (err) => { this.error = err; }
      );
    }
    else {
      // window.location.href = 'users';
    }
  }


  editdeletepop(item: Activity) {
    $('.hover-show' + item.id).toggle();
  }


  editdeletepop1(item: Activity) {
    $('.hover-show' + item.id).toggle();
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
  openEdit(contentEdit: any) {
    this.modalService.open(contentEdit, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
    // console.log(item);

  }
  openEdit2(contentEdit2: any, Stage: any) {
    this.Sname = Stage.Name;
    this.sid = Stage.Stageno;
    this.current_stage_name = Stage.Name;
    this.current_stage_comment = Stage.Comment;
    this.current_stage_StartDate = Stage.StartDate;
    this.current_stage_EndDate = Stage.EndDate;
    this.current_stage_DocId = Stage.DocId;
    this.current_stage_Status = Stage.Status;
    this.Changestage = Stage;
    if(Stage.Status != 2){
    this.modalService.open(contentEdit2, { ariaLabelledBy: 'modal-basic-title', modalDialogClass: 'modal-dialog-centered order-cards-modal' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  }

  openEdit22(contentEdit22: any, Stagename: any, Stage: any) {
    this.Sname = Stagename;
    this.sid = Stage;
    this.modalService.open(contentEdit22, { ariaLabelledBy: 'modal-basic-title', modalDialogClass: 'modal-dialog-centered order-cards-modal' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  ChangeStage(f: NgForm) {
    f = this.bridgeService2.GlobaleTrimFunc(f);
    this.resetAlerts();
    if (f.valid) {
      this.Changestage.Opp_Id = this.router.snapshot.params.id;
      this.Changestage.Stageno = this.sid;
      this.bridgeService2.ChangeStage(this.Changestage).subscribe(
        (res: ChangeStages) => {
          // Update the list of cars
          if (Object(res)['status'] == '200') {
            this.Changestages.push(res)
            this._NotifierService.showSuccess('Stage Complete'+this.Headingss[0].heading106);
            this.modalService.dismissAll();
            this.ngOnInit();
            f.reset();
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
          // window.location.reload();
        }
      );

    } else {
      for (let i = 0; i < Object.keys(f.value).length; i++) {
        var keyys = Object.keys(f.value)[i];
        if (f.value[keyys].length == 0) {
          if ($('input[name=' + keyys + ']').hasClass('required-fld')) {
            $('input[name=' + keyys + ']').addClass('red-line-border');
            $('input[name=' + keyys + ']').focus();
          }
          if ($('select[name=' + keyys + ']').hasClass('required-fld')) {
            $('select[name=' + keyys + ']').addClass('red-line-border');
            $('select[name=' + keyys + ']').focus();
          }
          if ($('textarea[name=' + keyys + ']').hasClass('required-fld')) {
            $('textarea[name=' + keyys + ']').addClass('red-line-border');
            $('textarea[name=' + keyys + ']').focus();
          }
        } else {
          $('input[name=' + keyys + ']').removeClass('red-line-border');
          $('select[name=' + keyys + ']').removeClass('red-line-border');
          $('textarea[name=' + keyys + ']').removeClass('red-line-border');
        }
      }
    }
  }



  CompleteStage(f: NgForm) {
    f = this.bridgeService2.GlobaleTrimFunc(f);
    this.resetAlerts();
    this.Completetage.Opp_Id = this.router.snapshot.params.id;
    this.bridgeService2.CompleteStage(this.Completetage).subscribe(
      (res: CompleteStages) => {
        // Update the list of cars
        this.Completestages.push(res)
        this._NotifierService.showSuccess('Stages Completed'+this.Headingss[0].heading106);
        window.location.reload();
        //  this.router.navigate(['/opportunity']);
        // this.success = 'Created successfully';
        f.reset();
      },
      (err) => {
        const delim = ":"
        const name = err.message
        const result = name.split(delim).slice(3).join(delim)
        this._NotifierService.showError(result);
        // window.location.reload();
      }
    );
  }

  getparticipants: any;
  getActivity(): void {
    this.bridgeService2.getActivityByPagination({PageNo: 1,maxItem: 'All',},'',{SourceID:this.idd,SourceType:'Opportunity'},'id','desc',this.UserId).subscribe(
      // this.bridgeService2.getActivitydata(this.UserId).subscribe(
      (data: any) => {
        if (data.status == "200") {
          this.activity = data.data;
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



  EditActivity(fe: NgForm) {
    fe = this.bridgeService2.GlobaleTrimFunc(fe);
    this.resetAlerts();
    var time = this.EdiitActivitys.Time;
    time = time.toString().match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];

    if (time.length > 1) {
      time = time.slice(1);
      time[5] = +time[0] < 12 ? ' AM' : ' PM';
      time[0] = +time[0] % 12 || 12;
    }
    this.EdiitActivitys.Time = time.join('');
    // this.EdiitActivitys.Participants = this.pills1;
    this.EdiitActivitys.To = this.EdiitActivitys.From;
    if (fe.valid) {
      this.bridgeService2.storeEditactivity(this.EdiitActivitys).subscribe(
        (res: EditActivity) => {
          // Update the list of cars
          this.Editactivity.push(res);

          this._NotifierService.showSuccess('Events'+this.Headingss[0].heading104+" "+this.Headingss[0].heading106);
          this.getActivity();
          fe.reset();
        },
        (err) => {
          const delim = ":"
          const name = err.message
          const result = name.split(delim).slice(3).join(delim)
          this._NotifierService.showError(result);
          // window.location.reload();
        }
      );
    }

    else {
      for (let i = 0; i < Object.keys(fe.value).length; i++) {
        var keyys = Object.keys(fe.value)[i];
        if (fe.value[keyys].length == 0) {
          if ($('input[name=' + keyys + ']').hasClass('required-fld')) {
            $('input[name=' + keyys + ']').addClass('red-line-border');
            $('input[name=' + keyys + ']').focus();
          }
          if ($('select[name=' + keyys + ']').hasClass('required-fld')) {
            $('select[name=' + keyys + ']').addClass('red-line-border');
            $('select[name=' + keyys + ']').focus();
          }
          if ($('textarea[name=' + keyys + ']').hasClass('required-fld')) {
            $('textarea[name=' + keyys + ']').addClass('red-line-border');
            $('textarea[name=' + keyys + ']').focus();
          }
        } else {
          $('input[name=' + keyys + ']').removeClass('red-line-border');
          $('select[name=' + keyys + ']').removeClass('red-line-border');
          $('textarea[name=' + keyys + ']').removeClass('red-line-border');
        }
      }
    }
  }



  editfiles: any = [];



  oneditFileDropped($event: any) {
    this.prepareeditFilesList($event);
  }


  fileeditBrowseHandler(editfiles: any) {
    this.prepareeditFilesList(editfiles.target.files);
  }
  deletebranch1: any;
  deleteAttach(confirmModal:any,id: number) {
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
   this.deletebranch1 = id;
 }





  prepareeditFilesList(editfiles: Array<any>) {
    for (const item of editfiles) {
      // item.progress = 0;
      // this.editfiles.push(item);
      // console.log(this.files);

    }
    this.editfiles = editfiles;

    // this.fl=files
    // if (editfiles[0].size > 1055736 * 5) {
    //   this._NotifierService.showError("please select less than 5MB of size")

    // }
   // else{
      this.idd = this.router.snapshot.params.id;
      this.opportunityAttach.Attach = this.editfiles
      this.opportunityAttach.oppId = this.idd
     // console.log("frm", this.opportunityAttach)
        this.bridgeService2.opportunitydetailsAttach(this.opportunityAttach).subscribe(
          (res: OppoAttach) => {
            if (Object(res)['status'] == "200") {

              // this._NotifierService.showSuccess('Added Attachment Successfully !');

              this.getOpportunity(this.idd);
          }
          else {
            this._NotifierService.showError(Object(res)['message']);

          }



      })
   // }


  }

  bridgess: any[] = [];
  getBridge(): void {
    this.bridgeService2.getAll().subscribe(
      (data: any[]) => {
        this.bridgess = data;
      },
      (err) => {
        console.log(err);
        this.error = err;
      }
    );
  }

  open(template: any,type:any) {

    this.Activitys.Type = type;
    if(type == 'Event'){
      this.Activitys.From =  this.HeadingServices.getDate();
      this.Activitys.To = this.HeadingServices.getDate();
      this.Activitys.Time = this.HeadingServices.getTime();
      this.Activitys.ToTime = this.HeadingServices.getTime();
    }
    else if(type == 'Task'){
      this.Activitys.From =  this.HeadingServices.getDate();
      this.Activitys.To = this.HeadingServices.getDate();
      this.Activitys.Time = this.HeadingServices.getTime();
      this.Activitys.ToTime = this.HeadingServices.getTime();
    }
    this.modalService.open(template, { ariaLabelledBy: 'modal-basic-title', modalDialogClass: `modal-dialog-centered figma-cards-modal figma-cards-activity-modal` })
  }
  selectYpe(){
    this.ActivitysParticipants = [];
    if(this.Activitys.ParticipantsType == 'Employee'){
      this.getBridge();
    }
    else  if(this.Activitys.ParticipantsType == 'ContactPerson'){
      this.bridgeService2.getContactPersone(this.selectedDay).subscribe(
        (data: any) => {
          this.contactPersoneList = data;
        });
    }
  }
  openLinkHitter(CardCode: string) {
      this.route.navigate(['/opportunity']);
    this.bridgeService2.setBpCardcode(CardCode);
  }

  isModuleViewadd(module_id: number): boolean {  
    const selectedModule = this.savedModules?.filter((module: any) => module.module_id === module_id);
    if (selectedModule && selectedModule.length > 0 && selectedModule[0].is_add) {
      return true;
    }
    return false;
  }

  isModuleViewedit(module_id: number): boolean {  
    const selectedModule = this.savedModules?.filter((module: any) => module.module_id === module_id);
    if (selectedModule && selectedModule.length > 0 && selectedModule[0].is_edit) {
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

