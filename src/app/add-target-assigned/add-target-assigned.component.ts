import { TargeYear } from '../login';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { BridgeService } from '../modules/service/bridge.service';
import { Location } from '@angular/common';
import { NgForm } from '@angular/forms';
import { HeadingServicesService } from '../modules/service/heading-services.service';
declare var $: any;

@Component({
  selector: 'app-add-target-assigned',
  templateUrl: './add-target-assigned.component.html',
  styleUrls: ['./add-target-assigned.component.scss']
})
export class AddTargetAssignedComponent implements OnInit {

  closeResult = '';
  UserName: any;
  UserId:any;
  SalesEmployeeCode: any;
  error = '';
  success = '';
  isLoading: boolean = false;
  searchValue!: string;
  dateObj = new Date();
  time = this.dateObj.toLocaleTimeString();
  month2 = this.dateObj.getMonth()+1;
  month = (this.month2 < 10 ? '0' : '') + this.month2;
  day = (this.dateObj.getDate() < 10 ? '0' : '') + this.dateObj.getDate();
  year = this.dateObj.getUTCFullYear();
  role:any;
  newdate = this.day + "-" + this.month + "-" + this.year;
  reportingTo: any;
  addTar: TargeYear =  {
    Department:'',
StartYear:'',
EndYear:'',
SalesPersonCode:'',
reportingTo:'',
YearTarget:'',
    CreatedDate : this.newdate,
    UpdatedDate :this.newdate,

  };
  TargetYear:any;
  Headingss: any[]=[];

//   targets: Target[] = [];
//  target: Target =  {amount:'',monthYear:'',SalesPersonCode:'',CreatedDate:this.newdate};
// targets: Target[] = [];
// target: Target =  {Department:'',YearTarget:'',StartYear:'', EndYear:'',SalesPersonCode:0, reportingTo: 0,CreatedDate:this.newdate};
  constructor(private modalService: NgbModal,private route:Router, private bridgeService2: BridgeService,private _location: Location,private HeadingServices: HeadingServicesService) { }


ngOnInit(): void {




this.bridgeService2.autoCall();
this.TargetYear=this.bridgeService2.TargetYear;
this.Headingss = this.HeadingServices.getModule11();
this.UserName = sessionStorage.getItem('UserName');
this.UserId = sessionStorage.getItem('UserId');
this.role = sessionStorage.getItem('role');
this.SalesEmployeeCode = sessionStorage.getItem('SalesEmployeeCode');
this.addTar.SalesPersonCode = String(sessionStorage.getItem('SalesEmployeeCode'));
    this.reportingTo = sessionStorage.getItem('reportingTo');
if(this.UserName == undefined){
this.route.navigate(['/login']);
}
$(document).mouseup(function (e: { target: any; }) {
var popup = $(".hover-show");
if (!$('.edit-delete').is(e.target) && !popup.is(e.target) && popup.has(e.target).length == 0) {
    popup.hide();
}
});

$(document).ready(function () {
$('.hover-show').hide()
});



}

new: any = 0;
setEndyear(event: any){
  this.new = Number(event)+1;
  this.addTar.EndYear = this.new;
}

changetargetfor(event: any){
  if(event.target.value == 'Department'){
    $(".depart").show();
  }
  else{
    $(".depart").hide();
  }
}

open(content: any) {
this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title', modalDialogClass: 'modal-dialog-centered order-cards-modal'}).result.then((result) => {
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


suplier(item: any){
this.route.navigate(['/target-assigned/target-assigned-details/'+item]);
}
resetAlerts() {
this.error = '';
this.success = '';
}


addTarget(f:NgForm){
  f = this.bridgeService2.GlobaleTrimFunc(f);
  // this.isLoading = true;
  if(this.reportingTo == 0){
    this.addTar.reportingTo = '';
  }
  else{
  this.addTar.reportingTo = this.reportingTo;
  }
  for(let [keys,value] of Object.entries(f.value)){
   if(!!!f.value[keys]){
      f.value[keys] = "";
    }
  }
  if(f.valid){
    this.bridgeService2.storeTargetAssignment(this.addTar).subscribe(
      (res: TargeYear) => {
        if (Object(res)['status'] == "200") {
          this.isLoading = false;
        alert('Target Assign Succesfully');
        this.route.navigate(['/target-assisment']);
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
      }
    );
  }
  else{
    alert('Please Fill Valid Data');
    for (let i = 0; i < Object.keys(f.value).length; i++) {
      var keyys = Object.keys(f.value)[i];
      if (f.value[keyys].length == 0) {

        this.isLoading = false;


        if ($("input[name=" + keyys + "]").hasClass('required-fld')) {
          $("input[name=" + keyys + "]").addClass("red-line-border");
          $("input[name=" + keyys + "]").focus();
        }
        else if ($("select[name=" + keyys + "]").hasClass('required-fld')) {
          $("select[name=" + keyys + "]").addClass("red-line-border");
          $("select[name=" + keyys + "]").focus();
        }
        else if ($("ng-select[name=" + keyys + "]").hasClass('required-fld')) {
          $("ng-select[name=" + keyys + "]").addClass("red-line-border");
          $("ng-select[name=" + keyys + "]").focus();
        }
        else if ($("textarea[name=" + keyys + "]").hasClass('required-fld')) {
          $("textarea[name=" + keyys + "]").addClass("red-line-border");
          $("textarea[name=" + keyys + "]").focus();
        }
      }
      else {

        this.isLoading = false;
        $("input[name=" + keyys + "]").removeClass("red-line-border");
        $("select[name=" + keyys + "]").removeClass("red-line-border");
        $("textarea[name=" + keyys + "]").removeClass("red-line-border");
        $("ng-select[name=" + keyys + "]").removeClass("red-line-border");
      }
    }
  }

}

backClicked() {
  this._location.back();
}
}
