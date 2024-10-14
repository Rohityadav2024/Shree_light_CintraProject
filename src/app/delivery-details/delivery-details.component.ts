import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
declare var $: any;
import { Location } from '@angular/common';
import { BridgeService } from '../modules/service/bridge.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';

import { HeadingServicesService } from '../modules/service/heading-services.service';
import { NotiferService } from '../modules/service/helpers/notifer.service';
@Component({
  selector: 'app-delivery-details',
  templateUrl: './delivery-details.component.html',
  styleUrls: ['./delivery-details.component.css']
})
export class DeliveryDetailsComponent implements OnInit {
// commonDetail = new LeadDetail().commonDetailKeys;
commonObj: any = {
  activityTab: 'note',
  detailTab: 'detail',
  addonsTabsActivity: 'recent activity',
}

showStageDetials:boolean=false;
SelectStage:any;
orders: any[] = [];
logs: any[] = [];
idd: any;

closeResult:any;
StageComplete:any = {
  "DeliveryID": 0,
  "StageId": 0,
  "Remarks": "",
  "File": ""
}
isLoading: boolean = false;
total_before: any = 0;
total_after:any = 0;
total_after_tax:any = 0;
tax_Value:any = 0;
total_Amount:any;
orderAttachment:any[]=[];
CurrentStage:any = 'NA';

pagination: any = {
  PageNo: 1,
  maxItem: 'All'
}
totalCount:any;
// opposearchfilter
searchValue: string = '';
Items:any[] = [];
order_by_field:any = 'id';
order_by_value:any = 'desc';
count = new Array();
filter_customer: any = {CreateDate:'',CardCode:''};
startind = 1;
endind = 1;
Headingss: any[] = [];
savedModules: any[] = [];
addLogs:any = {
  "DeliveryID": "",
  "SalesPersonCode": "",
  "Title": "",
  "Description": ""
}
constructor(public _location: Location, private _NgbModal: NgbModal,
  private bridgeService: BridgeService,
  public HeadingServices: HeadingServicesService,
  private _NotifierService: NotiferService,
  private route: Router,
  private router: ActivatedRoute) {
}

backClicked() {
  this._location.back();
}
ngOnInit(): void {
  if (!this.HeadingServices.isModuleView(7)) {
    this.route.navigate(['/dashboard']);
  }
  this.idd = this.router.snapshot.params.id;
  this.Headingss = this.HeadingServices.getModule7();
  this.getQuotation();

  const savedModulesString = sessionStorage.getItem('savedModules');
    if (savedModulesString) {
      this.savedModules = JSON.parse(savedModulesString);
    }
}


getQuotation(): void {
  this.isLoading=true;

  this.bridgeService.getOneDeliverydata(this.idd).subscribe(
    (data: any[]) => {
      var totalamount=new Array;
      this.isLoading=false;
      this.orders = data;
      for(let i=0;i<this.orders[0].StageDetails.length;i++){
      if(this.orders[0].StageDetails[i].Status == 2){
        this.CurrentStage = this.orders[0].StageDetails[i].StageName;
      }
    }
    this.getLogs();
      this.total_after = 0;
      this.total_after_tax = 0;
      this.tax_Value = 0;
      this.total_Amount = 0;
      this.orderAttachment=data[0].Attach;
      this.Items = data[0]['DocumentLines'];
      for (let i = 0; i < this.orders[0]['DocumentLines'].length; i++) {
        var basic = Number(this.orders[0]['DocumentLines'][i].Quantity) * Number(this.orders[0]['DocumentLines'][i].UnitPrice);
        var afterfdis = basic - (basic * (Number(this.orders[0]['DocumentLines'][i].DiscountPercent) / 100))
        var aftersdis = afterfdis - (afterfdis * (Number(this.orders[0].DiscountPercent) / 100))
        var total = aftersdis + (aftersdis * (Number(this.orders[0]['DocumentLines'][i].TaxRate) / 100))
        totalamount.push(total);
        this.total_after += afterfdis;
        this.total_after_tax += aftersdis;
        this.tax_Value +=  (aftersdis * (Number(this.orders[0]['DocumentLines'][i].TaxRate) / 100));
      }
      this.total_Amount=totalamount.reduce((a:any, b:any) => a + Number(b), 0);
      if(this.orders[0].FreightCharge != ''){
        this.total_Amount = Number(this.total_Amount) + Number(this.orders[0].FreightCharge);
        }
        this.total_Amount =  this.total_Amount.toFixed(2);


    },
    (err) => {
      console.log(err);
    }
  );
}


getLogs(): void {
  this.bridgeService.getDeliveryLogsByPagination(this.pagination,this.searchValue,this.idd,this.order_by_field,this.order_by_value).subscribe(
    (data: any) => {
      if (data.status == "200") {
      this.logs = data.data;
      // this.totalCount = this.orders.length;
      this.totalCount = data.meta.count;
      if(this.pagination.maxItem != 'All'){
      this.startind = ((this.pagination.PageNo - 1) * Number(this.pagination.maxItem)) + 1;
      this.endind = ((this.pagination.PageNo - 1) * Number(this.pagination.maxItem)) + Number(this.pagination.maxItem);
      if (this.endind > this.totalCount) {
        this.endind = this.totalCount;
      }
      this.pagination.PageShow = Number(this.pagination.maxItem);
    }
    else{
      this.startind = 1;
      this.endind = this.totalCount;
      this.pagination.PageShow = Number(this.totalCount);
    }
    if(this.totalCount == 0){
      this.startind = this.totalCount;
    }
  }

  else {
    this._NotifierService.showError(data.message);
    this.totalCount = 0;
  }
},
    (err) => {
      this.totalCount = 0;
      const delim = ':';
      const name = err.message;
      const result = name.split(delim).slice(3).join(delim);
      this._NotifierService.showError(result);
    }
  );
}

open(template: any,sta:boolean,val:any) {
  this.SelectStage = val;
  this.StageComplete.DeliveryID = this.idd;
  this.StageComplete.StageId = val.id;
  this.StageComplete.Remarks = '';
  this.showStageDetials = true;
  if(val.Status == 0){

    this._NgbModal
    .open(template, { ariaLabelledBy: 'modal-basic-title', modalDialogClass: 'modal-dialog-centered userList-cards-modal' })
    .result.then(
      (result) => {
        this.closeResult = `Closed with: ${result}`;
      },
      (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      }
    );
  // this._NgbModal.open(template, { ariaLabelledBy: 'modal-basic-title', modalDialogClass: `modal-dialog-centered figma-cards-modal figma-cards-activity-modal` })
  }
}


open2(template2: any) {
  this.addLogs.DeliveryID = this.idd;
  this.addLogs.SalesPersonCode = sessionStorage.getItem('UserId');
    this._NgbModal
    .open(template2, { ariaLabelledBy: 'modal-basic-title', modalDialogClass: 'modal-dialog-centered userList-cards-modal' })
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

isSubmit:boolean=false;
addPaymentTerms(f: NgForm) {
  this.isSubmit = true;
  f = this.bridgeService.GlobaleTrimFunc(f);
  if (this.fl) {
    this.StageComplete.File = this.fl;
  }
  else {
    this.StageComplete.File = '';
  }
  if (f.valid) {
    this.bridgeService.DeliveryStageComplete(this.StageComplete).subscribe(
      (res: any) => {
        if (Object(res)['status'] == "200") {
          this.isSubmit = false;
          this.getQuotation();
          this.SelectStage.Status = 2
          this.SelectStage.Remarks = this.StageComplete.Remarks;
          this._NgbModal.dismissAll();
        }
        else{
          this._NotifierService.showError(Object(res)['message']);
          this.isSubmit = false;
        }


        // Reset the form
      },
      (err) => {
        this.isSubmit = false;
        const delim = ":"
        const name = err.message
        const result = name.split(delim).slice(3).join(delim)
        this._NotifierService.showError(result);
        this._NgbModal.dismissAll();
        this.ngOnInit();
      }
    );
  } else {
    this.isSubmit = false;
    for (let i = 0; i < Object.keys(f.value).length; i++) {
      var keyys = Object.keys(f.value)[i];
      if (f.value[keyys].length == 0) {
        if ($("input[name=" + keyys + "]").hasClass('required-fld')) {
          $("input[name=" + keyys + "]").addClass("red-line-border");
          $("input[name=" + keyys + "]").focus();
        }
      }
      else {
        $("input[name=" + keyys + "]").removeClass("red-line-border");
      }
    }
  }
}



addLogsFunc(f: NgForm) {
  f = this.bridgeService.GlobaleTrimFunc(f);
  if (f.valid) {
    this.bridgeService.addLogsFunction(this.addLogs).subscribe(
      (res: any) => {
        if (Object(res)['status'] == "200") {
          this.isLoading = false;
          this.getQuotation();
          // this.SelectStage.Status = 2
          // this.SelectStage.Remarks = this.StageComplete.Remarks;
          this._NgbModal.dismissAll();
        }
        else{
          this._NotifierService.showError(Object(res)['message']);
          this.isLoading = false;
        }


        // Reset the form
      },
      (err) => {
        const delim = ":"
        const name = err.message
        const result = name.split(delim).slice(3).join(delim)
        this._NotifierService.showError(result);
        this._NgbModal.dismissAll();
        this.ngOnInit();
      }
    );
  } else {
    for (let i = 0; i < Object.keys(f.value).length; i++) {
      var keyys = Object.keys(f.value)[i];
      if (f.value[keyys].length == 0) {
        if ($("input[name=" + keyys + "]").hasClass('required-fld')) {
          $("input[name=" + keyys + "]").addClass("red-line-border");
          $("input[name=" + keyys + "]").focus();
        }
      }
      else {
        $("input[name=" + keyys + "]").removeClass("red-line-border");
      }
    }
  }
}


fl: any = [];
onFileChanged(event: any) {
  this.fl = [];
  for (var i = 0; i < event.target.files.length; i++) {
    this.fl.push(event.target.files[i]);
  }
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



