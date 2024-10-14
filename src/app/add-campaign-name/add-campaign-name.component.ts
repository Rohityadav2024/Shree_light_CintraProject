import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { NgForm } from '@angular/forms';
import { BridgeService } from '../modules/service/bridge.service';
import { CampaignNameCreate, CampaignName } from '../campaign';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Router } from '@angular/router';
declare var $: any;
@Component({
  selector: 'app-add-campaign-name',
  templateUrl: './add-campaign-name.component.html',
  styleUrls: ['./add-campaign-name.component.css']
})
export class AddCampaignNameComponent implements OnInit {

  public Editor = ClassicEditor;

  CampaignName1: CampaignName[] = [];

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
  CampaignNameCreate1: CampaignNameCreate = {
    CampaignName: "",
    CampaignOwner: this.UserName,
    Subject: "",
    CampaignSetId: "",
    StartDate: "",
    EndDate: "",
    Type: "",
    Frequency: "",
    WeekDay: "",
    MonthlyDate: "",
    Message: "",
    Status: 1,
    CreateDate: this.newdate,
    CreateTime: "",
    RunTime: "",
    Attachments:""


  };
  isLoading: boolean = false;
  empall: any;
  success: any;
  error: any;
  todayDate: any;
  input_fld: any = 'input-fld3';
  dropdownList2: any = [];
  selectedItems: any = [];
  dropdownList3: any = [];
  dropdownSettings4 = {};

  TestMonthlyDate: any = [];
  TestWeekDay: any = [];
  requiredField: boolean = false;

  UserStatus:any;
  CampaignFrequency:any;
  ModeOfCommunication:any;
  CampaignDay:any;
  CamapignDays=new Array;
  CampaignDate:any;
  CampaignDateData=new Array;

  constructor(private _location: Location, private router: Router, private route: ActivatedRoute, private bridgeService: BridgeService, private modalService: NgbModal,) { }

  ngOnInit(): void {
    this.bridgeService.autoCall();
    this.UserStatus=this.bridgeService.userStatus;
    this.CampaignFrequency=this.bridgeService.CampaignFrequency;
    this.ModeOfCommunication=this.bridgeService.ModeOfCommunication;
    this.CampaignDay=this.bridgeService.CampaignDay;
    this.CampaignDate=this.bridgeService.CampaignDate;
    this.getempall();

    localStorage.removeItem('rolename');

    var today = new Date().toISOString().split('T')[0];
    document.getElementsByName("EndDate")[0].setAttribute('min', today);


    // this.idd = this.route.snapshot.params.id;

    // this.CampaignNameCreate1.CreateDate =  String(sessionStorage.getItem('SalesEmployeeCode'));
    this.CampaignNameCreate1.CampaignOwner = String(sessionStorage.getItem('SalesEmployeeCode'));
    this.UserName = sessionStorage.getItem('UserName');
    if (this.UserName == undefined) {
      this.router.navigate(['/login']);
    }
    this.selectedItems = [{ item_text: 'Sunday' }, { item_text: 'Monday' }];

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
    // this.multiselct.push(item.item_text)
    // var text = this.multiselct.toString();
    // this.CampaignNameCreate1.WeekDay = text;
    // console.log(this.CampaignNameCreate1.WeekDay)
  }
  onSelectAll(items: any) {

  }

  public onDeSelectAll(items: any) {
    // console.log(items);

  }

  onDeSelect(items: any) {

  }



  // for month

  multiselct1: any[] = [];
  onItemSelect1(item: any) {
    // this.multiselct1.push(item.item_text)
    // var text1 =this.multiselct1.toString();
    // this.CampaignNameCreate1.MonthlyDate = text1;
    // console.log(this.CampaignNameCreate1.MonthlyDate)
  }
  onSelectAll1(items: any) {
    // // console.log(items)
    // for(let i=0;i<items.length;i++){
    //   // console.log(items[i].item_text)
    //   this.multiselct1.push(items[i].item_text)
    //   let text1 =this.multiselct1.toString();
    //   this.CampaignNameCreate1.MonthlyDate = text1;

    // }
    // console.log("mn",this.CampaignNameCreate1.MonthlyDate)
    // // this.multiselct.push(items.item_text)
    // // var text =this.multiselct.toString();
    // // this.CampaignNameCreate1.WeekDay = text;
    // // console.log(this.CampaignNameCreate1.WeekDay)

  }

  public onDeSelectAll1(items: any) {

    // console.log(items);
    // this.multiselct1=[]
    // this.CampaignNameCreate1.MonthlyDate = '';
  }

  onDeSelect1(items: any) {
    // // var index = this.CampaignNameCreate1.MonthlyDate.indexOf(items.item_text);
    // console.log("ff",items)
    // // this.CampaignNameCreate1.MonthlyDate.splice(index,1)
    // // console.log(this.CampaignNameCreate1.MonthlyDate)
  }


  addCustomer(f: any) {
    // console.log(f)
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
    console.log('show day', event);
    this.selectedDay = event;
    // console.log(this.selectedDay)
    if (this.selectedDay == "Weekly") {
      this.CampaignNameCreate1.MonthlyDate = "";
      // $('#selectDay').show();
      $("#selectDay").css("display", "grid");
      // $(".dy").attr('required','required');
      this.requiredField =true

      // alert(this.TestWeekDay)


    }
    else {
      // $('#selectDay').hide();
      $("#selectDay").css("display", "none");

      this.requiredField =false

    }

    if (this.selectedDay == "Monthly") {
      // $('#selectMonth').show();
      $('#selectMonth').css("display","grid")

    }
    else {
      // $('#selectMonth').hide();
      $('#selectMonth').css("display","none")

    }

  }
  addCampaignName(f: NgForm) {
    f = this.bridgeService.GlobaleTrimFunc(f);
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
    this.CampaignNameCreate1.CampaignSetId = this.route.snapshot.params.id;
    var time = this.CampaignNameCreate1.RunTime;
    this.CampaignNameCreate1.Attachments = this.fl;
    time = time.toString ().match (/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];
  if (time.length > 1) {
    time = time.slice (1);
    time[5] = +time[0] < 12 ? ' AM' : ' PM';
    time[0] = +time[0] % 12 || 12;
  }
  this.CampaignNameCreate1.RunTime = time.join ('');
  let str = this.CampaignNameCreate1.RunTime.split(":")[0];
  if(str < 10){
    this.CampaignNameCreate1.RunTime = '0'+this.CampaignNameCreate1.RunTime;
  }


  //for Month
  if (this.TestMonthlyDate.length == 0) {
    this.CampaignNameCreate1.MonthlyDate = "";
    }
    else{

    for (let i = 0; i < this.TestMonthlyDate.length; i++) {
      // console.log(items[i].item_text)
      this.multiselct1.push(this.TestMonthlyDate[i].item_text)
      let text1 = this.multiselct1.toString();
      this.CampaignNameCreate1.MonthlyDate = text1;
      this.CampaignNameCreate1.WeekDay = ""

    }
    // console.log(this.CampaignNameCreate1.MonthlyDate)
  }
//for weak
  if(this.TestWeekDay.length ==0){
    this.CampaignNameCreate1.WeekDay = ""

  }
  else{
    for (let i = 0; i < this.TestWeekDay.length; i++) {
      // console.log(items[i].item_text)
      this.multiselct1.push(this.TestWeekDay[i].item_text)
      let text1 = this.multiselct1.toString();
      this.CampaignNameCreate1.WeekDay = text1;
      this.CampaignNameCreate1.MonthlyDate = "";

    }
  }


    // console.log(this.TestWeekDay.length)
    if(this.CampaignNameCreate1.Frequency=="Weekly" && this.TestWeekDay.length == 0){
      alert("Please Select Day")
      $("#dyselect").hasClass('required-fld')
      $("#dyselect").addClass("red-line-border");
      $("#dyselect").focus();
    }

    else if(this.CampaignNameCreate1.Frequency=="Monthly" && this.TestMonthlyDate.length== 0){
      alert("Please Select Monthly Date")

    }
    else{
    this.resetAlerts();

    if (f.valid) {
      this.isLoading = true;

      this.bridgeService.insertCampaignName(this.CampaignNameCreate1).subscribe(
        (res: CampaignNameCreate) => {
          if (Object(res)['status'] == "200") {
            $(".success-box").show();
            this.modalService.dismissAll();
            setTimeout(() => {
              $(".success-box").fadeOut(1000);
              this.router.navigate(['/campaign/details/' + this.route.snapshot.params.id]);
              this.isLoading = false;
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
          this.ngOnInit();
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
          else if ($("ng-multiselect-dropdown[name=" + keyys + "]").hasClass('required-fld')) {
            $("ng-multiselect-dropdown[name=" + keyys + "]").addClass("red-line-border");
            $("ng-multiselect-dropdown[name=" + keyys + "]").focus();
          }
        }
        else {
          $("input[name=" + keyys + "]").removeClass("red-line-border");
          $("select[name=" + keyys + "]").removeClass("red-line-border");
          $("textarea[name=" + keyys + "]").removeClass("red-line-border");
          $("ng-select[name=" + keyys + "]").removeClass("red-line-border");
          $("ckeditor[name=" + keyys + "]").removeClass("red-line-border");
          $("ng-multiselect-dropdown[name=" + keyys + "]").removeClass("red-line-border");
        }

      }

    }
    }

  }

  getempall(): void {
    this.isLoading = true;
    this.bridgeService.getAll().subscribe(
      (data: any) => {
        this.empall = data;
        this.isLoading = false;
      },

    );
  }

  // selectType(event:any){
  //   var type= event.target.value
  //   if(type=="Email"){
  //     console.log(type);
  //     $(".showsubject").css("display", "block");
  //     this.CampaignNameCreate1.Message  = '';
  //     // (<HTMLInputElement>document.getElementById("showsubject")).style.color = "blue";
  //   }
  //   else{
  //     $(".showsubject").css("display", "none");
  //     this.CampaignNameCreate1.Message  = '';
  //   }
  // }

  selectType(event: any) {
    var type = event;
    if (type == "Email") {
      // console.log(type);
      $(".showsubject").css("display", "grid");
      $('#reqsubject').attr('required', 'required');
      $("#reqsubject").addClass("required-fld");
      this.CampaignNameCreate1.Message = '';
      // (<HTMLInputElement>document.getElementById("showsubject")).style.color = "blue";
    }
    else {
      $(".showsubject").css("display", "none");
      $('#reqsubject').removeAttr('required');
      $("#reqsubject").removeClass("required-fld");
      this.CampaignNameCreate1.Message = '';
    }
  }

  fl: any="";
  sele_img_name: any;
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


    }
  }
}
