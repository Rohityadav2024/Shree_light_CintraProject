import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal,ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { BridgeService } from '../modules/service/bridge.service';
// import { Chart } from 'node_modules/chart.js';
import Chart from 'chart.js/auto';
import { HttpClient } from '@angular/common/http';
import { Activity } from '../chatter';
import { Type } from '../bridge2';
import { CalendarOptions } from '@fullcalendar/angular';
import { NgForm } from '@angular/forms';
declare var $: any;

@Component({
  selector: 'app-lead-followup',
  templateUrl: './lead-followup.component.html',
  styleUrls: ['./lead-followup.component.css']
})
export class LeadFollowupComponent implements OnInit {

  Events: any[] = [];
  closeResult = '';
  calendarOptions: CalendarOptions = {
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
    },
    initialView: 'dayGridMonth',
    weekends: true,
    editable: true,
    selectable: true,
    selectMirror: true,
    dayMaxEvents: true
  };



  dateObj = new Date();
  time = this.dateObj.toLocaleTimeString();
  month2 = this.dateObj.getMonth()+1;
  month = (this.month2 < 10 ? '0' : '') + this.month2;
  day = (this.dateObj.getDate() < 10 ? '0' : '') + this.dateObj.getDate();
  year = this.dateObj.getUTCFullYear();
  months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  newdate = this.day + "-" + this.month + "-" + this.year;

 Activitys: Activity =  {
  SourceID: '',
  SourceType: 'Opportunity',
  Subject: '',
  Comment: '',
  Name: '',
  RelatedTo: 'hi',
  Emp: '',
  Title: '',
  Description: '',
  From: '',
  To: '',
  Time: '',
  Allday: '',
  leadType: '',
  Location: '',
  Host: '',
  Participants: '',
  Document: '',
  Repeated: '',
  Priority: 'low',
  ProgressStatus: 'WIP',
  Type: 'Event',
  CreateDate: this.newdate,
  CreateTime: this.time
};
  leadtype ='All';
  followupdate = this.newdate;

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
  changeDate:any;
  UserId: any;
    constructor(private modalService: NgbModal, private bridgeService: BridgeService, private route: Router,private http: HttpClient) {

    }
    onDateClick(res: any) {
      this.followupdate = res.dateStr;
      this.getEventTask();
      this.changeDate = new Date(this.followupdate);
      console.log(this.followupdate)
      this.changeDate = this.changeDate.toDateString();

    }

    ngOnInit(): void {

      this.UserId = sessionStorage.getItem('UserId');
        this.calendarOptions = {
          dateClick: this.onDateClick.bind(this),
        };

      this.UserName = sessionStorage.getItem('UserName');
      this.SalesEmployeeCode = sessionStorage.getItem('SalesEmployeeCode');
      if (this.UserName == undefined) {
        this.route.navigate(['/login']);
      }

      this.changeDate = new Date(this.followupdate);
      this.changeDate = this.changeDate.toDateString();

      this.getEventTask();
      this.getLeadType();
    }


    getEventTask(): void {
      this.bridgeService.getAllEventTaskdata2(this.followupdate).subscribe(
        (data: Activity[]) => {
          this.activity = data;
          if(this.activity.length <= 0){
            this.nodata = true;
           }
           else{
            this.nodata = false;
           }
          this.success = 'successful retrieval of the list';
        },
        (err) => {
          console.log(err);
          this.error = err;
        }
      );
    }


getLeadType(): void {
  this.bridgeService.getLeadTypedata().subscribe(
    (data: Type[]) => {
      this.Types = data;
      // console.log(data)
      this.success = 'successful retrieval of the list';
    },
    (err) => {
      console.log(err);
      this.error = err;
    }
  );
}



open(content: any) {
  this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
    this.closeResult = `Closed with: ${result}`;
  }, (reason) => {
    this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
  });
}

private getDismissReason(reason: any): string {
  if (reason === ModalDismissReasons.ESC) {
    return 'by pressing ESC';
  } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
    return 'by clicking on a backdrop';
  } else {
    return  `with: ${reason}`;
  }
}



addActivityEvents(f: NgForm) {
  if(f.valid){
 var time = this.Activitys.Time;
 time = time.toString ().match (/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];

if (time.length > 1) {
  time = time.slice (1);
  time[5] = +time[0] < 12 ? ' AM' : ' PM';
  time[0] = +time[0] % 12 || 12;
}
this.Activitys.Time = time.join ('');
let str = this.Activitys.Time.split(":")[0];
if(str < 10){
  this.Activitys.Time = '0'+this.Activitys.Time;
}
  this.Activitys.SourceID =  '0';
  this.Activitys.Emp = this.UserId;

  this.bridgeService.storeactivity(this.Activitys).subscribe(
    (res: Activity) => {
      this.activity.push(res);
      alert('Add Activity Succesfully');
      this.modalService.dismissAll();
      this.ngOnInit();
      f.reset();
    },
    (err) => {
      const delim = ":"
      const name = err.message
      const result = name.split(delim).slice(3).join(delim)
      alert(result);
      // window.location.reload();
    }
  );

}
else{
  for (let i = 0; i < Object.keys(f.value).length; i++) {
  var keyys = Object.keys(f.value)[i];
  if(f.value[keyys].length == 0){

    if ($("input[name="+keyys+"]").hasClass('required-fld')) {
    $("input[name="+keyys+"]").addClass("red-line-border");
    $("input[name="+keyys+"]").focus();
    }
    if ($("select[name="+keyys+"]").hasClass('required-fld')) {
    $("select[name="+keyys+"]").addClass("red-line-border");
    $("select[name="+keyys+"]").focus();
    }
    if ($("password[name="+keyys+"]").hasClass('required-fld')) {
    $("password[name="+keyys+"]").addClass("red-line-border");
    $("password[name="+keyys+"]").focus();
    }
    if ($("textarea[name="+keyys+"]").hasClass('required-fld')) {
      $("textarea[name="+keyys+"]").addClass("red-line-border");
      $("textarea[name="+keyys+"]").focus();
      }

  }

  else{
    $("input[name="+keyys+"]").removeClass("red-line-border");
    $("select[name="+keyys+"]").removeClass("red-line-border");
    $("password[name="+keyys+"]").removeClass("red-line-border");
    $("textarea[name="+keyys+"]").removeClass("red-line-border");
  }
}
}
}




  }
