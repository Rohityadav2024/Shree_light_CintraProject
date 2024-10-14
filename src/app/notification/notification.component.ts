import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BridgeService } from '../modules/service/bridge.service';
declare var $: any;
@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {

  p: number = 1;
  pagelimit: any = 10;

  Events: any[] = [];
  closeResult = '';
  dateObj = new Date();
  time = this.dateObj.toLocaleTimeString();
  month2 = this.dateObj.getMonth() + 1;
  month = (this.month2 < 10 ? '0' : '') + this.month2;
  day = (this.dateObj.getDate() < 10 ? '0' : '') + this.dateObj.getDate();
  year = this.dateObj.getUTCFullYear();
  months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  newdate = this.day + "-" + this.month + "-" + this.year;

  leadtype = 'All';
  followupdate = this.newdate;
  UserName: any;
  SalesEmployeeCode: any;
  barChartdata: any;
  barChartdata2: any;
  revanue: any;
  sales: any;
  sales_diff: any;
  notification: any;
  isLoading: boolean = false;

  error = '';
  success = '';
  nodata: boolean = false;

  httpClient: any;
  changeDate: any;
  UserId: any;
  notify: any;
  idd: any;
  constructor(private modalService: NgbModal, private router: ActivatedRoute, private bridgeService: BridgeService, private route: Router, private http: HttpClient) {

  }

  onDateClick(res: any) {
    this.followupdate = res.dateStr;

    this.changeDate = new Date(this.followupdate);
    // console.log(this.followupdate)
    this.changeDate = this.changeDate.toDateString();

  }

  ngOnInit(): void {
    this.getNotificationData();

    // this.bridgeService.autoCall();
    this.UserId = sessionStorage.getItem('UserId');

    $(".shohiclass").hide();

    this.UserName = sessionStorage.getItem('UserName');
    this.SalesEmployeeCode = sessionStorage.getItem('SalesEmployeeCode');

  }









  getNotificationData(): void {
    this.isLoading = true;
    this.bridgeService.getNotification().subscribe(

      (data: any) => {
        this.isLoading = false;
        // console.log(data)
        this.notify = data;
        this.idd = this.router.snapshot.params.id;
        // console.log(this.idd)

        // console.log(this.notify);

      },
      (err: any) => {
        console.log(err);
        this.error = err;
      }
    );
  }
}
