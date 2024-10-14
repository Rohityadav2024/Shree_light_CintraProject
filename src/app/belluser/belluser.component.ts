import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BridgeService } from '../modules/service/bridge.service';
declare var $: any;
@Component({
  selector: 'app-belluser',
  templateUrl: './belluser.component.html',
  styleUrls: ['./belluser.component.scss']
})
export class BelluserComponent implements OnInit {
  UserName: any;
  SalesEmployeeCode: any;
  barChartdata: any;
  barChartdata2: any;
  barChartdata3: any;
  revanue: any;
  sales: any;
  sales_diff: any;
  notification: any;
  baseUrl2: any;
  constructor(private bridgeService: BridgeService, private activateRoute: ActivatedRoute, private http: HttpClient) {
    this.baseUrl2 = this.bridgeService.baseUrl2;
  }

  ngOnInit(): void {
    this.UserName = sessionStorage.getItem('UserName');
    this.SalesEmployeeCode = sessionStorage.getItem('SalesEmployeeCode');
    $(document).mouseup(function (e: { target: any; }) {
      var popup = $(".showNoti");
      if (!$('.bellclass').is(e.target) && !popup.is(e.target) && popup.has(e.target).length == 0) {
        popup.hide();
      }
    });

    // this.http.post(this.baseUrl2 + '/employee/dashboard', { "SalesEmployeeCode": this.SalesEmployeeCode }).toPromise().then((data: any) => {
    //   this.revanue = data.data[0].amount;
    //   this.sales = data.data[0].sale;
    //   this.sales_diff = data.data[0].sale_diff;
    //   this.notification = data.data[0].notification;
    // });
    this.bridgeService.EmpDashboard(this.SalesEmployeeCode).subscribe(
      (data: any) => {
        this.revanue = data.data[0].amount;
        this.sales = data.data[0].sale;
           this.sales_diff = data.data[0].sale_diff;
         this.notification = data.data[0].notification;
      });
  }


  shownot() {

    // console.log(this.activateRoute)
    $(".showNoti").show();
    $(".shohiclass").show();
  }
}
