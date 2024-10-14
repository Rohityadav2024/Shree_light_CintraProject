
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { addSmtp, Bridge, smtplist } from '../bridge';
import { BridgeService } from '../modules/service/bridge.service';
import { BusinessPartners } from '../businesspartners';
import { opportunity } from '../opportunity';
import {Location} from '@angular/common';
import { Bridge2 } from '../bridge2';
declare var $: any;
@Component({
  selector: 'app-smtp-setting',
  templateUrl: './smtp-setting.component.html',
  styleUrls: ['./smtp-setting.component.css']
})
export class SmtpSettingComponent implements OnInit {
  baseUrl2: any;

  dateObj = new Date();
  time = this.dateObj.toLocaleTimeString();
  month2 = this.dateObj.getMonth()+1;
  month = (this.month2 < 10 ? '0' : '') + this.month2;
  day = (this.dateObj.getDate() < 10 ? '0' : '') + this.dateObj.getDate();
  year = this.dateObj.getUTCFullYear();
  months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  newdate = this.day + "-" + this.month + "-" + this.year;

  smtplist1: smtplist[] = [];
  addSmtp1: addSmtp =  {
    id: "",
    Host: "",
    Port: "",
    Sender: "",
    Password: ""
  };

    isLoading: boolean = false;
  error = '';
  success = '';
  role: any;
  UserId: any;
  reportingTo: any;
  UserName: any;
  getlead: any;

  resetAlerts() {
    this.error = '';
    this.success = '';
  }
  constructor(private bridgeService2: BridgeService,private router: Router, private modalService: NgbModal,private http: HttpClient,
    private _location: Location) {
    this.baseUrl2 = this.bridgeService2.baseUrl2;

  }

  ngOnInit(): void {



    this.bridgeService2.autoCall();
    this.getsmtpData();

    this.UserName = sessionStorage.getItem('UserName');
    this.UserId = sessionStorage.getItem('UserId');
    this.role = sessionStorage.getItem('role');
    this.reportingTo = sessionStorage.getItem('reportingTo');
    if(this.UserName == undefined){
      this.router.navigate(['/login']);
    }

  }

  getsmtpData(): void {
    this.bridgeService2.getSmtpSettingData().subscribe(
      (data: smtplist[]) => {
        this.smtplist1 = data;
        this.addSmtp1 = data[0];
        // this.addSmtp1.Host =data[0].Host;
        // this.addSmtp1.Port =data[0].Port;
        // this.addSmtp1.Sender =data[0].Sender;
        // this.addSmtp1.Password =data[0].Password;
        // console.log(this.smtplist1)

      },
      (err) => {
        console.log(err);
        this.error = err;
      }
    );
  }


  addOpportunity(f: NgForm) {
    f = this.bridgeService2.GlobaleTrimFunc(f);
    this.resetAlerts();
    // this.isLoading = true;
    if(f.valid){

      this.bridgeService2.insertSmtp(this.addSmtp1).subscribe(
        (res: addSmtp) => {
          this.isLoading = false;
          if (Object(res)['status'] == "200") {
          // this.smtplist1.push(res)
          $(".success-box").show();
           this.modalService.dismissAll();
          setTimeout(()=>{
            $(".success-box").fadeOut(2000);
        // this.router.navigate(['/opportunity']);
        window.location.reload();
        }, 2000);

      }
      else{
      alert(Object(res)['message']);
      this.isLoading = false;

      }
        },
        (err) => {

          this.isLoading = false;
          const delim = ":"
          const name = err.message
          const result = name.split(delim).slice(3).join(delim)
          alert(result);
          // window.location.reload();
        }
      );
    }else{
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
        if ($("textarea[name="+keyys+"]").hasClass('required-fld')) {
          $("textarea[name="+keyys+"]").addClass("red-line-border");
          $("textarea[name="+keyys+"]").focus();
          }
      }
      else{
        $("input[name="+keyys+"]").removeClass("red-line-border");
        $("select[name="+keyys+"]").removeClass("red-line-border");
        $("textarea[name="+keyys+"]").removeClass("red-line-border");
      }
      }
    }

  }

  /* added by millan on 25-05-2022 */
  backClicked() {
    this._location.back();
  }



}

