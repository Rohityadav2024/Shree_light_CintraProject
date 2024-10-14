import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { BridgeService } from '../modules/service/bridge.service';
// import { Chart } from 'node_modules/chart.js';
import Chart from 'chart.js/auto';
import { HttpClient } from '@angular/common/http';
import { Activity } from '../chatter';
import { Type } from '../bridge2';
import { CalendarOptions } from '@fullcalendar/angular';
import {
  NgbCalendar,
  NgbDateAdapter,
  NgbDateParserFormatter,
  NgbDatepickerModule,
  NgbDateStruct,
} from '@ng-bootstrap/ng-bootstrap';
import { NgForm } from '@angular/forms';



import { EventInput } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
//import timeGrigPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { HeadingServicesService } from '../modules/service/heading-services.service';
import { NotiferService } from '../modules/service/helpers/notifer.service';
declare var $: any;
@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],

})
export class CalendarComponent implements OnInit {

  Events: any[] = [];
  closeResult = '';

  leadtype = 'All';
  followupdate = this.HeadingServices.getDate();

  UserName: any;
  SalesEmployeeCode: any;
  barChartdata: any;
  barChartdata2: any;
  revanue: any;
  sales: any;
  sales_diff: any;
  notification: any;

  error = '';
  success = '';
  nodata: boolean = false;
  activity: Activity[] = [];
  Types: Type[] = [];
  httpClient: any;
  changeDate: any;
  UserId: any;
  ActivityType:any;
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
  opportunitys: any[] = [];
  constructor(private modalService: NgbModal, private ngbCalendar: NgbCalendar,
    private HeadingServices: HeadingServicesService,
    private _NotifierService: NotiferService,
    private dateAdapter: NgbDateAdapter<string>, private bridgeService: BridgeService, private route: Router, private http: HttpClient) {
  }
  onDateClick(res: any) {
    this.followupdate = res.dateStr;
   // this.getAllEventTask();
    this.getEventTask();
    this.changeDate = new Date(this.followupdate);
    // console.log(this.followupdate)
    this.changeDate = this.changeDate.toDateString();

  }



  ngOnInit(): void {
    // var TODAY_STR = new Date().toISOString().replace(/T.*$/, '');
    // console.log(TODAY_STR);
    this.bridgeService.autoCall();
    this.ActivityType=this.bridgeService.ActivityType;
    this.UserId = sessionStorage.getItem('UserId');
    this.UserName = sessionStorage.getItem('UserName');
    this.SalesEmployeeCode = sessionStorage.getItem('SalesEmployeeCode');
    if (this.UserName == undefined) {
      this.route.navigate(['/login']);
    }

    this.changeDate = new Date(this.followupdate);
    this.changeDate = this.changeDate.toDateString();

    this.getEventTask();
    this.getLeadType();
    this.getAllEventTask();
    this.getOpportunity();

  }
  getOpportunity(): void {
    this.bridgeService.getOpportunityShortdata().subscribe(
      (data: any[]) => {
        this.opportunitys = data;
        // console.log(data);

      },
      (err) => {
        console.log(err);
        this.error = err;
      }
    );
  }
  calenderArray:any[]=[];
  CalendarOptions:any;
allEventsActivity:any[]=[];
  getAllEventTask() {
    this.calenderArray=[];
    this.CalendarOptions;
    this.allEventsActivity=[];
    this.bridgeService.getActivityByPagination({
      PageNo: 1,
      maxItem: '10',
      PageShow:10
    },'',{},'id','desc',this.UserId).subscribe((data: any) => {

        this.allEventsActivity = data.data;
        if(this.allEventsActivity.length){
          for (let i = 0; i < this.allEventsActivity.length; i++) {
          this.calenderArray.push({start:this.allEventsActivity[i].From})
          }
        }
        this.CalendarOptions = {
          headerToolbar: {
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
          },
          dateClick: this.onDateClick.bind(this),
          events: this.calenderArray,
          initialView: 'dayGridMonth',
           dayMaxEvents: true
        };

        if (this.allEventsActivity.length <= 0) {
          this.nodata = true;
        }
        else {
          this.nodata = false;
        }

      },
      (err) => {
        console.log(err);
        this.error = err;
      }
    );

  }

  model2: any;
  getEventTask() {
    this.bridgeService.getAllEventTaskdata2(this.followupdate).subscribe((data: Activity[]) => {

        this.activity = data;

        this.getAllEventTask();

        if (this.activity.length <= 0) {
          this.nodata = true;
        }
        else {
          this.nodata = false;
        }

      },
      (err) => {
        console.log(err);
        this.error = err;
      }
    );

  }

  public fetchEvents(dateInfo: any) {
    // return this.activity.get(dateInfo.To).toPromise();
    return this.getLeadType()
  }


  getLeadType(): void {
    this.bridgeService.getLeadTypedata().subscribe(
      (data: Type[]) => {
        this.Types = data;
        console.log('get lead type data',data)

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
  ActivitysParticipants:any[] = [];
  addActivityEvents(f: NgForm) {

    f = this.bridgeService.GlobaleTrimFunc(f);
    // this.Activitys.SourceID = this.idd;
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

      this.bridgeService.storeactivity(this.Activitys).subscribe(
        (res: Activity) => {
          if (Object(res)['status'] == "200") {
          this._NotifierService.showSuccess(this.Activitys.Type+' Added Successfully');
          this.modalService.dismissAll();
          this.ngOnInit();
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
  goToDetial(item:any){
    if(item.Type == 'Followup'){
    this.route.navigate(['/leads/table/lead-details/'+item.SourceID]);
    }
    else{
    this.route.navigate(['/opportunity/opportunity-details/'+item.SourceID]);
    }
  }
}
