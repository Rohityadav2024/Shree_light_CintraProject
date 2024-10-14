

import { Component, OnInit } from '@angular/core';
import { Location, WeekDay } from '@angular/common';
import { NgForm } from '@angular/forms';
import { BridgeService } from '../modules/service/bridge.service';
import { CampaignNameCreate, CampaignName, editCampaignNameCreate } from '../campaign';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Router } from '@angular/router';
declare var $: any;
@Component({
  selector: 'app-edit-campaign-name',
  templateUrl: './edit-campaign-name.component.html',
  styleUrls: ['./edit-campaign-name.component.css']
})
export class EditCampaignNameComponent implements OnInit {

  public Editor = ClassicEditor;

  CampaignName1: CampaignName[] = [];
  dummysubject: string = '';

  dateObj = new Date();
  time = this.dateObj.toLocaleTimeString();
  month2 = this.dateObj.getMonth() + 1;
  month = (this.month2 < 10 ? '0' : '') + this.month2;
  day = (this.dateObj.getDate() < 10 ? '0' : '') + this.dateObj.getDate();
  year = this.dateObj.getUTCFullYear();
  months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  newdate = this.day + "-" + this.month + "-" + this.year;
  idd: any;

  UserName: any = '';
  CampaignNameCreate1: editCampaignNameCreate = {
    CampaignName: "",
    CampaignOwner: this.UserName,
    CampaignSetId: "",
    StartDate: "",
    EndDate: "",
    Type: "",
    Frequency: "",
    Subject: "",
    WeekDay: "",
    MonthlyDate: 0,
    Message: "",
    Status: 0,
    CreateDate: this.newdate,
    CreateTime: "",
    RunTime: "",
    Attachments:"",
    id: ""


  };
  isLoading: boolean = false;
  isdataLoading:boolean=false;
  empall: any;
  success: any;
  error: any;
  input_fld: any = 'input-fld3';
  dropdownList2: any = [];
  dropdownList3: any = [];
  dropdownSettings4 = {};


  selectedItems: any = [];
  selectedItems1: any = [];
  TestMonthlyDate: any = [];
  TestWeekDay: any = [];

  baseUrl2:any;

  UserStatus:any;
  CampaignFrequency:any;
  ModeOfCommunication:any;
  CampaignDay:any;
  CamapignDays=new Array;
  CampaignDate:any;
  CampaignDateData=new Array;
  constructor(private _location: Location, private router: Router, private route: ActivatedRoute, private bridgeService: BridgeService, private modalService: NgbModal,) {
    this.baseUrl2 = this.bridgeService.baseUrl2;
  }

  ngOnInit(): void {



    this.bridgeService.autoCall();
    this.UserStatus=this.bridgeService.userStatus;
    this.CampaignFrequency=this.bridgeService.CampaignFrequency;
    this.ModeOfCommunication=this.bridgeService.ModeOfCommunication;
    this.CampaignDay=this.bridgeService.CampaignDay;
    this.CampaignDate=this.bridgeService.CampaignDate;
    this.getempall();
    this.editCompaignSet();
    // this.idd = this.route.snapshot.params.id;

    // this.CampaignNameCreate1.CreateDate =  String(sessionStorage.getItem('SalesEmployeeCode'));

    this.CampaignNameCreate1.CampaignOwner = String(sessionStorage.getItem('SalesEmployeeCode'));
    this.UserName = sessionStorage.getItem('UserName');
    if (this.UserName == undefined) {
      this.router.navigate(['/login']);
    }
  for(let i=0; i<this.CampaignDay.length; i++){
      this.CamapignDays.push({ item_id: i, item_text: this.CampaignDay[i] })
  }

  this.dropdownList2 = this.CamapignDays;

    // this.dropdownList2 = [
    //   { item_text: 'Sunday' },
    //   { item_text: 'Monday' },
    //   { item_text: 'Tuesday' },
    //   { item_text: 'Wednesday' },
    //   { item_text: 'Thursday' },
    //   { item_text: 'Friday' },
    //   { item_text: 'Satturday' },

    // ];

    for(let i=0; i<this.CampaignDate.length; i++){
      this.CampaignDateData.push({ item_id: i, item_text: this.CampaignDate[i] })
  }

  this.dropdownList3 = this.CampaignDateData;

    // this.dropdownList3 = [
    //   { item_text: '1' },
    //   { item_text: '2' },
    //   { item_text: '3' },
    //   { item_text: '4' },
    //   { item_text: '5' },
    //   { item_text: '6' },
    //   { item_text: '7' },
    //   { item_text: '8' },
    //   { item_text: '9' },
    //   { item_text: '10' },
    //   { item_text: '11' },
    //   { item_text: '12' },
    //   { item_text: '13' },
    //   { item_text: '14' },
    //   { item_text: '15' },
    //   { item_text: '16' },
    //   { item_text: '17' },
    //   { item_text: '18' },
    //   { item_text: '19' },
    //   { item_text: '20' },
    //   { item_text: '22' },
    //   { item_text: '23' },
    //   { item_text: '24' },
    //   { item_text: '25' },
    //   { item_text: '26' },
    //   { item_text: '27' },
    //   { item_text: '28' },
    //   { item_text: '29' },
    //   { item_text: '30' },
    //   { item_text: '31' },


    // ];



    this.dropdownSettings4 = {
      singleSelection: false,
      idField: 'item_text',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 5,
      allowSearchFilter: true
    };

  }

  multiselct: any[] = [];
  onItemSelect(item: any) {
    this.multiselct.push(item.item_text)
    var text = this.multiselct.toString();
    this.CampaignNameCreate1.WeekDay = text;
    // console.log(this.CampaignNameCreate1.WeekDay)
  }
  onSelectAll(items: any) {
    // console.log(items)
    for (let i = 0; i < items.length; i++) {
      this.multiselct.push(items[i].item_text)
      let text = this.multiselct.toString();
      this.CampaignNameCreate1.WeekDay = text;

    }
    // console.log(this.CampaignNameCreate1.WeekDay)
    // this.multiselct.push(items.item_text)
    // var text =this.multiselct.toString();
    // this.CampaignNameCreate1.WeekDay = text;
    // console.log(this.CampaignNameCreate1.WeekDay)

  }

  public onDeSelectAll(items: any) {
    // this.CampaignNameCreate1.WeekDay = '';
    // this.multiselct = []
  }

  onDeSelect(items: any) {
    // console.log("ff",items)

    // console.log(items);
    // this.multiselct.push(items.item_text)
    // var text =this.multiselct.toString();
    // this.CampaignNameCreate1.WeekDay = text;
    // console.log(this.CampaignNameCreate1.WeekDay)
  }



  // for month

  multiselct1: any[] = [];
  onItemSelect1(item: any) {
    // this.multiselct1.push(item.item_text)
    // var text1 = this.multiselct1.toString();
    // this.CampaignNameCreate1.MonthlyDate = text1;
    // console.log(this.CampaignNameCreate1.MonthlyDate)

  }
  onSelectAll1(items: any) {
    // for (let i = 0; i < items.length; i++) {

    //   this.multiselct1.push(items[i].item_text)
    //   let text1 = this.multiselct1.toString();
    //   this.CampaignNameCreate1.MonthlyDate = text1;

    // }
    // console.log("mn", this.CampaignNameCreate1.MonthlyDate)
    // this.multiselct.push(items.item_text)
    // var text =this.multiselct.toString();
    // this.CampaignNameCreate1.WeekDay = text;
    // console.log(this.CampaignNameCreate1.WeekDay)

  }

  public onDeSelectAll1(items: any) {
    // console.log(items);
    this.multiselct1 = []
    this.CampaignNameCreate1.MonthlyDate = '';
  }

  onDeSelect1(items: any) {
    // console.log("ff", items)

    // console.log(items);
    // this.multiselct.push(items.item_text)
    // var text =this.multiselct.toString();
    // this.CampaignNameCreate1.WeekDay = text;
    // console.log(this.CampaignNameCreate1.WeekDay)
  }







  // idd: any;
  dummyAttachments: any = '';
  Extension1:any;
  extensionresult:any;
  editCompaignSet() {
    this.idd = this.route.snapshot.params.id;
this.isdataLoading=true;
    this.bridgeService.getEditCampaigndata(this.idd).subscribe(
      (data: CampaignName[]) => {
        this.isdataLoading=false;
        this.CampaignName1 = data;
        // console.log("dd", this.CampaignName1)
        // this.bridgeService.PostOnemember(data[0].MemberList);
        // this.Statess = data[0]['BPStateCode'] + "," + data[0]['BPState'];
        this.CampaignName1 = Object(this.CampaignName1[0]);

        this.CampaignNameCreate1.CampaignName = data[0]['CampaignName'];
        this.CampaignNameCreate1.CampaignOwner = data[0]['CampaignOwner'][0].SalesEmployeeCode;
        this.CampaignNameCreate1.CampaignSetId = data[0]['CampaignSetId'];
        this.CampaignNameCreate1.StartDate = data[0]['StartDate'];
        this.CampaignNameCreate1.EndDate = data[0]['EndDate'];
        this.CampaignNameCreate1.Type = data[0]['Type'];
        this.CampaignNameCreate1.Frequency = data[0]['Frequency'];
        this.CampaignNameCreate1.WeekDay = data[0]['WeekDay'];
        this.CampaignNameCreate1.MonthlyDate = data[0]['MonthlyDate'];
        this.CampaignNameCreate1.Message = data[0]['Message'];
        this.CampaignNameCreate1.Subject = data[0]['Subject'];
        this.dummysubject = data[0]['Subject'];
        this.CampaignNameCreate1.Status = data[0]['Status'];
        this.CampaignNameCreate1.CreateDate = data[0]['CreateDate'];
        this.CampaignNameCreate1.CreateTime = data[0]['CreateTime'];
        this.dummyAttachments = data[0]['Attachments'];
        this.CampaignNameCreate1.Attachments = data[0]['Attachments'];


        this.Extension1=data[0].Attachments.split(".")
        this.extensionresult=this.Extension1[1]
        // console.log("as33",this.Extension1)
        // console.log("as333",this.extensionresult)
        // console.log("amr",this.CampaignNameCreate1.Attachments)


        var time = data[0]['RunTime'];
        var hours = Number(time.match(/^(\d+)/)[1]);
        var minutes = Number(time.match(/:(\d+)/)[1]);
        var AMPM = time.match(/\s(.*)$/)[1];
        if (AMPM == "PM" && hours < 12) hours = hours + 12;
        if (AMPM == "AM" && hours == 12) hours = hours - 12;
        var sHours = hours.toString();
        var sMinutes = minutes.toString();
        if (hours < 10) sHours = "0" + sHours;
        if (minutes < 10) sMinutes = "0" + sMinutes;
        this.CampaignNameCreate1.RunTime = sHours + ":" + sMinutes;

        // console.log(this.CampaignNameCreate1.RunTime)
        this.CampaignNameCreate1.id = this.idd;
        // console.log(this.CampaignNameCreate1.id)
        // console.log(this.CampaignNameCreate1.WeekDay)


        var tempDay = this.CampaignNameCreate1.WeekDay.split(",")
        if (this.CampaignNameCreate1.WeekDay != '') {
          // console.log(tempDay)
          var objectDays = []
          for (var i = 0; i < tempDay.length; i++) {
            var temp = {
              item_text: tempDay[i]
            }
            objectDays.push(temp)
          }
          this.selectedItems = objectDays;
        } else {
          this.CampaignNameCreate1.WeekDay = "";
        }


// console.log("ed",this.CampaignNameCreate1.MonthlyDate)
        var tempMonth = this.CampaignNameCreate1.MonthlyDate.split(",")
        if (this.CampaignNameCreate1.MonthlyDate != '') {
          // console.log(tempDay)
          var objectMonth = []
          for (var i = 0; i < tempMonth.length; i++) {
            var temp = {
              item_text: tempMonth[i]
            }
            objectMonth.push(temp)
          }
          this.selectedItems1 = objectMonth;
        } else {
          this.CampaignNameCreate1.MonthlyDate = "";

        }



        if (this.CampaignNameCreate1.Frequency == "Weekly") {
          // $('#selectDay').show();
          $("#selectDay").css('display','grid');
        }
        else {
          // $('#selectDay').hide();
          $("#selectDay").css('display','none');

        }

        if (this.CampaignNameCreate1.Frequency == "Monthly") {
          $('#selectMonth').show();

        }
        else {
          $('#selectMonth').hide();

        }


        if (this.CampaignNameCreate1.Type == "Email") {
          // $('#showsubject').show();
          $("#showsubject").css('display','grid');
        }
        else {
          // $('#showsubject').hide();
          $("#showsubject").css('display','none');

        }

      });
  }


  backClicked() {
    this._location.back();
  }

  resetAlerts() {
    this.error = '';
    this.success = '';
  }

  selectedDay: any;
  showDay(event: any) {
    this.selectedDay = event;
    // console.log(this.selectedDay)
    if (this.selectedDay == "Weekly") {
     this.selectedItems1=[];
      this.CampaignNameCreate1.MonthlyDate=""
      // $('#selectDay').show();
      $("#selectDay").css('display','grid');
      // $(".dy").attr('required',true);
    }
    else {
      this.selectedItems=[];
      // $('#selectDay').hide();
      $("#selectDay").css('display','none');
      this.CampaignNameCreate1.WeekDay=""

    }

    if (this.selectedDay == "Monthly") {
      this.CampaignNameCreate1.WeekDay=""
      // $('#selectMonth').show();
      $("#selectMonth").css('display','grid');

    }
    else {
      // $('#selectMonth').hide();
      $("#selectMonth").css('display','none');
      this.CampaignNameCreate1.MonthlyDate=""

    }

  }
  multiselct2: any[] = [];
  multiselct21: any[] = [];
  addCampaignName(f: NgForm) {

    f = this.bridgeService.GlobaleTrimFunc(f);
    for(let [keys,value] of Object.entries(f.value)){
       if(!!!f.value[keys]){
        f.value[keys] = "";
      }
    }
    // console.log(this.selectedItems)
    // console.log(this.selectedItems1)
    this.CampaignNameCreate1.Attachments = this.fl;
    if (this.selectedDay == "Weekly") {
      this.CampaignNameCreate1.MonthlyDate="";
      // this.selectedItems1=[];
      // console.log("q",this.CampaignNameCreate1.MonthlyDate)
    }
    else{
      // alert("s")
      this.CampaignNameCreate1.WeekDay="";
      // this.selectedItems=[];
      // console.log("q",this.CampaignNameCreate1.MonthlyDate)
    }

  //for Runtime
    var time = this.CampaignNameCreate1.RunTime;
    time = time.toString().match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];
    if (time.length > 1) {
      time = time.slice(1);
      time[5] = +time[0] < 12 ? ' AM' : ' PM';
      time[0] = +time[0] % 12 || 12;
    }
    this.CampaignNameCreate1.RunTime = time.join('');
    let str = this.CampaignNameCreate1.RunTime.split(":")[0];
    if (str < 10) {
      this.CampaignNameCreate1.RunTime = '0' + this.CampaignNameCreate1.RunTime;
    }

    //for weak day
    if (this.selectedItems.length > 0) {
      this.CampaignNameCreate1.WeekDay="";
      for (let i = 0; i < this.selectedItems.length; i++) {
        this.multiselct2.push(this.selectedItems[i].item_text)

      }
      let text1 = this.multiselct2.toString();
        this.CampaignNameCreate1.WeekDay = text1;

    }
    else {
      this.CampaignNameCreate1.WeekDay = "";
    }
    // this is for MonthDate
    if (this.selectedItems1.length > 0) {
      this.CampaignNameCreate1.MonthlyDate = "";
      for (let i = 0; i < this.selectedItems1.length; i++) {
        this.multiselct21.push(this.selectedItems1[i].item_text)

      }
      var text1 = this.multiselct21.toString();
      this.CampaignNameCreate1.MonthlyDate = text1;
    } else {
      this.CampaignNameCreate1.MonthlyDate = "";
    }
    // console.log(this.TestMonthlyDate,"m")
    if(this.CampaignNameCreate1.Frequency=="Weekly" && this.selectedItems.length == 0){
      this.CampaignNameCreate1.MonthlyDate = "";
      alert("Please Select Day")
      $("#dyselect").hasClass('required-fld')
      $("#dyselect").addClass("red-line-border");
      $("#dyselect").focus();
    }


    else if(this.CampaignNameCreate1.Frequency=="Monthly" && this.selectedItems1.length== 0){
      this.CampaignNameCreate1.WeekDay = "";
      alert("Please Select Monthly Date")

    }
    else{
    this.resetAlerts();

    if (f.valid) {
      // console.log("frm", f)
      // console.log(this.CampaignNameCreate1)
      this.isLoading = true;
      this.bridgeService.updateCampaign(this.CampaignNameCreate1).subscribe(
        (res: CampaignNameCreate) => {

          // console.log("res", res)
          if (Object(res)['status'] == "200") {
            // this.CampaignName1.push(res);
            // console.log("cmname", res)
            this.isLoading = false;
            $(".success-box").show();
            this.modalService.dismissAll();
            setTimeout(() => {
              $(".success-box").fadeOut(1000);
              // this.router.navigate(['/campaign/details/campaign-name']);
              // var priviousUrl = this.bridgeService.getPreviousUrl();
              // this.router.navigate([priviousUrl]);

              this.router.navigate(['/campaign/details/' + this.CampaignNameCreate1.CampaignSetId]);
            }, 2000);
          }
          else {
            alert(Object(res)['message']);
            this.isLoading = false;
          }
          // console.log(res);
        },
        (err: { message: any; }) => {
          this.isLoading = false;
          const delim = ':';
          const name = err.message;
          const result = name.split(delim).slice(3).join(delim);
          alert(result);
          // window.location.reload();
        }
      );
    } else {
      alert('Please Filed All required field');
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
          else if ($("ckeditor[name=" + keyys + "]").hasClass('required-fld')) {
            $("ckeditor[name=" + keyys + "]").addClass("red-line-border");
            $("ckeditor[name=" + keyys + "]").focus();
          }
        }
        else {
          $("input[name=" + keyys + "]").removeClass("red-line-border");
          $("ng-select[name=" + keyys + "]").removeClass("red-line-border");
          $("select[name=" + keyys + "]").removeClass("red-line-border");
          $("textarea[name=" + keyys + "]").removeClass("red-line-border");
        }

      }


    }}

  }

  getempall(): void {
    // this.isLoading = true;
    this.bridgeService.getAll().subscribe(
      (data: any) => {
        // this.isLoading = false;
        this.empall = data;

      },

    );
  }



  selectType(event: any) {
    var type = event
    if (type == "Email") {
      // console.log(type);
      $("#showsubject").css("display", "grid");
      $('#reqsubject').attr('required', 'required');
      $("#reqsubject").addClass("required-fld");
      this.CampaignNameCreate1.Message = '';
      this.CampaignNameCreate1.Subject = this.dummysubject;
      // (<HTMLInputElement>document.getElementById("showsubject")).style.color = "blue";
    }
    else {
      $("#showsubject").css("display", "none");
      $('#reqsubject').removeAttr('required');
      $("#reqsubject").removeClass("required-fld");
      this.CampaignNameCreate1.Message = '';
      this.CampaignNameCreate1.Subject = '';
    }
  }


  fl: any="";
  sele_img_name: any;
  pathvdio:any;
  onFileChanged(event: any) {
    var file_size=event.target.files[0]['size']
    if(file_size>1055736*5){
      alert("please select less than 5MB of size")
      this.CampaignNameCreate1.Attachments = "";
    }
    else{
      this.sele_img_name = event.target.files[0]['name'];
    const file = event.target.files[0];
     this.fl = file;
     this.pathvdio=this.fl.name.split(".")[1]


    //  console.log("dasdas",this.fl.name.split(".")[1])
     if(this.pathvdio=="jpg"||"jpg" ||"png" ||"gif"){
      $('.pathv').hide();

    }



    }
  }

}
