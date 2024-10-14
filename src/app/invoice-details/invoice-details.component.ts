import { Component, OnInit,ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { BridgeService } from '../modules/service/bridge.service';
import { Customer, Branch, EditBranch } from '../customer';
import { Invoice } from '../invoice';
import { Quotation } from '../quotation';
import { Location } from '@angular/common';
import { HeadingServicesService } from '../modules/service/heading-services.service';
declare var $: any;

@Component({
  selector: 'app-invoice-details',
  templateUrl: './invoice-details.component.html',
  styleUrls: ['./invoice-details.component.css'],
})
export class InvoiceDetailsComponent implements OnInit {

  @ViewChild('attachments') attachment: any;
  idd:any;
  invoices:any[] = [];
  commonObj: any = { isContact: true, bpAddreassMerge: null,detailTab:'Items',activityTab: 'note' };
  total_before: any = 0;
  Items:any[] = [];
  total_after:any = 0;
  total_after_tax:any = 0;
  tax_Value:any = 0;
  total_Amount:any;
  accesstoken:any;
  orderAttachment:any[]=[];
  Headingss:any[]=[]
  savedModules: any[] = [];
  constructor(
    private bridgeService: BridgeService,
    private route: Router,
    private router: ActivatedRoute,
    private modalService: NgbModal,
    private _location: Location,
    public HeadingServices: HeadingServicesService,
  ) {}

  ngOnInit(): void {
    if (!this.HeadingServices.isModuleView(8)) {
      this.route.navigate(['/dashboard']);
    }
     this.bridgeService.autoCall();
     this.accesstoken='&token='+sessionStorage.getItem('accesstoken');
    this.getQuotation();
    this.Headingss = this.HeadingServices.getModule8();

    const savedModulesString = sessionStorage.getItem('savedModules');
    if (savedModulesString) {
      this.savedModules = JSON.parse(savedModulesString);
    }
  }


  GoToPdf(id: any) {
    const encodedURL = btoa(id);
    const url = "../../assets/html/invoice.html?id="+id+this.accesstoken;
    window.open(url, '_blank');
  }
  backClicked() {
    this._location.back();
  }
  getQuotation(): void {
    this.idd = this.router.snapshot.params.id;
    this.bridgeService.getOneInvoicedata(this.idd).subscribe(
      (data: Invoice[]) => {
        var totalamount=new Array;
        this.total_after = 0;
        this.total_after_tax = 0;
        this.tax_Value = 0;
        this.total_Amount = 0;
        this.invoices = data;

        this.orderAttachment=data[0].Attach;
        this.Items = this.invoices[0]['DocumentLines'];
        for (let i = 0; i < this.invoices[0]['DocumentLines'].length; i++) {
          var basic = Number(this.invoices[0]['DocumentLines'][i].Quantity) * Number(this.invoices[0]['DocumentLines'][i].UnitPrice);
          var afterfdis = basic - (basic * (Number(this.invoices[0]['DocumentLines'][i].DiscountPercent) / 100))
          var aftersdis = afterfdis - (afterfdis * (Number(this.invoices[0].DiscountPercent) / 100))
          var total = aftersdis + (aftersdis * (Number(this.invoices[0]['DocumentLines'][i].TaxRate) / 100))
          totalamount.push(total);
          this.total_after += afterfdis;
          this.total_after_tax += aftersdis;
          this.tax_Value +=  (aftersdis * (Number(this.invoices[0]['DocumentLines'][i].TaxRate) / 100));
        }

        this.total_Amount=totalamount.reduce((a:any, b:any) => a + Number(b), 0);
        if(this.invoices[0].FreightCharge != ''){
          this.total_Amount = Number(this.total_Amount) + Number(this.invoices[0].FreightCharge);
          }
          this.total_Amount =  this.total_Amount.toFixed(2);

      },
      (err) => {
        console.log(err);
      }
    );
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
