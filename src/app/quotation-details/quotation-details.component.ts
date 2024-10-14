import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { BridgeService } from '../modules/service/bridge.service';
import { Customer, Branch,EditBranch } from '../customer';
import { HeadingServicesService } from '../modules/service/heading-services.service';
import { NotiferService } from '../modules/service/helpers/notifer.service';
import { OneQuotation, QuoAttach,  } from '../quotation';
import {Location} from '@angular/common';
declare var $: any;


@Component({
  selector: 'app-quotation-details',
  templateUrl: './quotation-details.component.html',
  styleUrls: ['./quotation-details.component.css']
})
export class QuotationDetailsComponent implements OnInit {

  quotations: OneQuotation[] = [];

    closeResult = '';
    UserName: any;
    error = '';
    success = '';
    idd:any;
    CardCode: any;

  accesstoken:any;
    isLoading: boolean = false;
    isLoading2: boolean = false;
    baseUrl2:any;

    quotationAttach: QuoAttach = {
      Attach: '',
      quotId: '',
      CreateDate: this.HeadingServices.getDate(),
      CreateTime: this.HeadingServices.getTime(),

    }

    urlcheck:any;
    bpid:any;

    Items:any[] = [];
    Headingss: any[] = [];
    savedModules: any[] = [];
  commonObj: any = { isContact: true, bpAddreassMerge: null,detailTab:'Items',activityTab: 'note' };
      constructor(private bridgeService: BridgeService,
        public HeadingServices: HeadingServicesService,
        private _NotifierService: NotiferService,private route:Router,private router: ActivatedRoute,private modalService: NgbModal,
        private _location: Location) {
          this.baseUrl2 = this.bridgeService.baseUrl2;
      }

      ngOnInit(): void {
        if (!this.HeadingServices.isModuleView(5)) {
          this.route.navigate(['/dashboard']);
        }
        this.bridgeService.autoCall();
        this.getQuotation();

        this.UserName = sessionStorage.getItem('UserName');

    this.accesstoken='&token='+sessionStorage.getItem('accesstoken');
    this.Headingss = this.HeadingServices.getModule5();
        if(this.UserName == undefined){
          this.route.navigate(['/login']);
        }

        var priviousUrl = this.bridgeService.getPreviousUrl();
        this.urlcheck= priviousUrl.split('/');

        // console.log('Test quotation Details-------------',this.urlcheck);
        if (this.urlcheck[1] == 'quotation') {
          this.bpid = this.bridgeService.getBpCardcode();
          // console.log('this quotation-------------',this.bpid);
        }

    const savedModulesString = sessionStorage.getItem('savedModules');
    if (savedModulesString) {
      this.savedModules = JSON.parse(savedModulesString);
    }


      }

 total_before: any = 0;
 total_after:any = 0;
 total_after_tax:any = 0;
 tax_Value:any = 0;
 total_Amount:any;
 quotationAttachment:any[]=[];
      getQuotation(): void {
        this.isLoading=true;

        this.idd = this.router.snapshot.params.id;
        this.bridgeService.getOneQuotationdata(this.idd).subscribe(
          (data: OneQuotation[]) => {
            this.isLoading=false;
            this.quotations = data;
            this.total_after = 0;
            this.total_after_tax = 0;
            this.tax_Value = 0;
            this.total_Amount = 0;
            var totalamount=new Array;
           // console.log('check discount-----------',this.quotations)
            this.quotationAttachment=data[0].AttachDetails;
           // console.log('this.quotations',this.quotations);
            if(this.quotations[0]['DocumentLines'].length != 0){
            this.Items = this.quotations[0]['DocumentLines'];
            for (let i = 0; i < this.quotations[0]['DocumentLines'].length; i++) {
              // var total=(this.quotations[0]['DocumentLines'][i].Quantity
              var basic = Number(this.quotations[0]['DocumentLines'][i].Quantity) * Number(this.quotations[0]['DocumentLines'][i].UnitPrice);
              var afterfdis = basic - (basic * (Number(this.quotations[0]['DocumentLines'][i].DiscountPercent) / 100))
              var aftersdis = afterfdis - (afterfdis * (Number(this.quotations[0].DiscountPercent) / 100))
              var total = aftersdis + (aftersdis * (Number(this.quotations[0]['DocumentLines'][i].TaxRate) / 100))
              totalamount.push(total);
              this.total_after += afterfdis;
              this.total_after_tax += aftersdis;
              this.tax_Value +=  (aftersdis * (Number(this.quotations[0]['DocumentLines'][i].TaxRate) / 100));
            }

            this.total_Amount=totalamount.reduce((a:any, b:any) => a + Number(b), 0);
            if(this.quotations[0].FreightCharge != ''){
              this.total_Amount = Number(this.total_Amount) + Number(this.quotations[0].FreightCharge);
              }
              this.total_Amount =  this.total_Amount.toFixed(2);
            }

          },
          (err) => {
            console.log(err);
            this.error = err;
          }
        );
      }

    resetAlerts() {
      this.error = '';
      this.success = '';
    }



  /* added by millan on 25-05-2022 */
  backClicked() {
    this._location.back();
  }
  /* added by millan on 25-05-2022 */

// details Attachment

  editfiles: any = [];



  oneditFileDropped($event: any) {
    this.prepareeditFilesList($event);
  }


  fileeditBrowseHandler(editfiles: any) {
   // console.log(editfiles);
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

 private getDismissReason(reason: any): string {
  if (reason === ModalDismissReasons.ESC) {
    return 'by pressing ESC';
  } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
    return 'by clicking on a backdrop';
  } else {
    return `with: ${reason}`;
  }
}
  deletefileapi(imageid: any) {
    let ordId = this.router.snapshot.params.id;
    this.bridgeService.deletequotationAttachment(ordId, imageid).subscribe(
      (res) => {
        this.modalService.dismissAll();
        this.getQuotation();

      },
      (err) => (this.error = err)
    );
  }
  deleteeditFile(index: any) {

    Array.from(this.editfiles).splice(index, 1);
   // console.log(this.editfiles)

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
      this.quotationAttach.Attach = this.editfiles
      this.quotationAttach.quotId = this.idd
     // console.log("frm", this.quotationAttach)
        this.bridgeService.quotationdetailsAttach(this.quotationAttach).subscribe(
          (res: QuoAttach) => {
            if (Object(res)['status'] == "200") {
              this._NotifierService.showSuccess('Attachment Added Successfully !');
            // $(".edit-success-box-attch").show();
            this.getQuotation();

            // setTimeout(() => {
            //   $(".edit-success-box-attch").fadeOut(1000);
              // this.getOppoAttachment();
            //  this.getOpportunity();
            // }, 2000);
          }
          else {
            this._NotifierService.showError(Object(res)['message']);

          }



      })
   // }


  }

  formatBytes(bytes: any, decimals: any) {
    if (bytes === 0) {
      return '0 Bytes';
    }
    const k = 1024;
    const dm = decimals <= 0 ? 0 : decimals || 2;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  }

  GoToPdf(id: any) {
     const encodedURL = btoa(id);
    // const url = this.baseUrl2+"/static/html/quotation.html?id="+id;
    const url = "../../assets/html/quotation.html?id=" + id+this.accesstoken;

    // const url = 'http://103.234.187.197:8005/static/html/quotation.html?id=' + id;
    window.open(url, '_blank');
  }


  createOrder(id: any) {
    this.bridgeService.SetQuotationId(id);
    this.bridgeService.setAllFilter('',undefined);
    this.route.navigate(['/order/add-order']);
  }

  isModuleViewedit(module_id: number): boolean {  
    const selectedModule = this.savedModules?.filter((module: any) => module.module_id === module_id);
    if (selectedModule && selectedModule.length > 0 && selectedModule[0].is_edit) {
      return true;
    }
    return false;
  }

  isModuleViewadd(module_id: number): boolean {  
    const selectedModule = this.savedModules?.filter((module: any) => module.module_id === module_id);
    if (selectedModule && selectedModule.length > 0 && selectedModule[0].is_add) {
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
