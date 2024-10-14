import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { BridgeService } from '../modules/service/bridge.service';
import { Customer, Branch, EditBranch } from '../customer';
import { OrAttach, OrdersOne } from '../orders';
import { Quotation } from '../quotation';
import { Location } from '@angular/common';
import { HeadingServicesService } from '../modules/service/heading-services.service';
import { NotiferService } from '../modules/service/helpers/notifer.service';
declare var $: any;

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css'],
})
export class OrderDetailsComponent implements OnInit {
  orders: OrdersOne[] = [];

  accesstoken:any;
  closeResult = '';
  UserName: any;
  error = '';
  success = '';
  idd: any;
  CardCode: any;
  isLoading: boolean = false;
  isLoading2: boolean = false;

  baseUrl2:any;
  orderAttach: OrAttach = {
    Attach: '',
    orderId: '',
    CreateDate: this.HeadingServices.getDate(),
    CreateTime: this.HeadingServices.getTime(),

  }

  orderid:any;
  savedModules: any[] = [];
  Headingss: any[] = [];
  constructor(
    private bridgeService: BridgeService,
    private route: Router,
    private router: ActivatedRoute,
    public HeadingServices: HeadingServicesService,
    private _NotifierService: NotiferService,
    private modalService: NgbModal,
    private _location: Location
  ) {
    this.baseUrl2=bridgeService.baseUrl2;
  }

  ngOnInit(): void {

    if (!this.HeadingServices.isModuleView(6)) {
      this.route.navigate(['/dashboard']);
    }

    this.bridgeService.autoCall();
    this.getQuotation();

    this.UserName = sessionStorage.getItem('UserName');
    this.accesstoken='&token='+sessionStorage.getItem('accesstoken');
    if (this.UserName == undefined) {
      this.route.navigate(['/login']);
    }

    this.Headingss = this.HeadingServices.getModule6();

    var priviousUrl = this.bridgeService.getPreviousUrl();
    var newcheck = priviousUrl.split('/');
    // console.log('newcheck',newcheck);
    // this.urlcheck=priviousUrl.split('/');

    if (newcheck[1] === 'order') {
      if(!!this.bridgeService.getBpCardcode()){
        this.orderid = this.bridgeService.getBpCardcode();
      }


    }

    const savedModulesString = sessionStorage.getItem('savedModules');
    if (savedModulesString) {
      this.savedModules = JSON.parse(savedModulesString);
    }

  }

  show_details() {
    $('.sho-high').show(500);
    $('.show-details').hide(500);
    $('.hide-details').show(500);
  }

  hide_details() {
    $('.sho-high').hide(500);
    $('.show-details').show(500);
    $('.hide-details').hide(500);
  }

  total_before: any = 0;
  total_after:any = 0;
  total_after_tax:any = 0;
  tax_Value:any = 0;
  total_Amount:any;
  orderAttachment:any[]=[];
  Items:any[] = [];
  commonObj: any = { isContact: true, bpAddreassMerge: null,detailTab:'Items',activityTab: 'note' };
  getQuotation(): void {
    this.isLoading=true;
    this.idd = this.router.snapshot.params.id;
    this.bridgeService.getOneOrderdata(this.idd).subscribe(
      (data: OrdersOne[]) => {
        var totalamount=new Array;
        this.isLoading=false;
        this.orders = data;
        this.total_after = 0;
        this.total_after_tax = 0;
        this.tax_Value = 0;
        this.total_Amount = 0;
        //  console.log('------orders------',this.orders)
        this.orderAttachment=data[0].AttachDetails;
        this.Items = this.orders[0]['DocumentLines'];
        // console.log('this.orders',this.orders);
        for (let i = 0; i < this.orders[0]['DocumentLines'].length; i++) {
          // var total=(this.orders[0]['DocumentLines'][i].Quantity
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
    this.bridgeService.deleteorderAttachment(ordId, imageid).subscribe(
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
      this.orderAttach.Attach = this.editfiles
      this.orderAttach.orderId = this.idd
      // console.log("frm", this.orderAttach)
        this.bridgeService.orderdetailsAttach(this.orderAttach).subscribe(
          (res: OrAttach) => {
            if (Object(res)['status'] == "200") {

              this._NotifierService.showSuccess('Attachment Added Successfully !');
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
    const url = "../../assets/html/order.html?id="+id+this.accesstoken;
   // const url = "http://103.234.187.197:8111/static/html/order.html?id=" + id;
    window.open(url, '_blank');
  }

  isModuleViewadd(module_id: number): boolean {  
    const selectedModule = this.savedModules?.filter((module: any) => module.module_id === module_id);
    if (selectedModule && selectedModule.length > 0 && selectedModule[0].is_add) {
      return true;
    }
    return false;
  }

  isModuleViewedit(module_id: number): boolean {  
    const selectedModule = this.savedModules?.filter((module: any) => module.module_id === module_id);
    if (selectedModule && selectedModule.length > 0 && selectedModule[0].is_edit) {
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
