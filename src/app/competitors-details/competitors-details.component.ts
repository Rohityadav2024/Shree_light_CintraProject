import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { BridgeService } from '../modules/service/bridge.service';
import { Location } from '@angular/common';
import { Activity } from '../modules/model/chatter';
import { Customer, Branch, EditBranch, Country, States, ContactPerson, updateContactPerson, } from '../customer';
import Chart from 'chart.js/auto';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { cutomerAttach, getcutomerAttach, updatecutomerAttach } from '../campaign';
import { HeadingServicesService } from '../modules/service/heading-services.service';
import { NotiferService } from '../modules/service/helpers/notifer.service';
import { OneQuotation, QuoAttach,  } from '../quotation';
declare var $: any;


@Component({
  selector: 'app-competitors-details',
  templateUrl: './competitors-details.component.html',
  styleUrls: ['./competitors-details.component.scss']
})
export class CompetitorsDetailsComponent implements OnInit {

  quotations: OneQuotation[] = [];
  Engineers: any[] = [];
  Engineeraddedit: any = {
    "Competitors":"",
    "Name":"",
    "EmailID":"",
    "MobileNo":""
};
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
    order_by_field:any = 'id';
    order_by_value:any = 'desc';
    searchValue: string = '';
    pagination: any = {
      PageNo: 1,
      maxItem: 'All',
      PageShow:10
    }

    isEdit:boolean = false;
    Engineerscount:any = 0;
    Items:any[] = [];
    Headingss: any[] = [];
    savedModules: any[] = [];
  commonObj: any = { isContact: true, bpAddreassMerge: null,detailTab:'detail',activityTab: 'note' };
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

    const savedModulesString = sessionStorage.getItem('savedModules');
    if (savedModulesString) {
      this.savedModules = JSON.parse(savedModulesString);
    }


      }

 quotationAttachment:any[]=[];
      getQuotation(): void {
        this.isLoading=true;
        this.idd = this.router.snapshot.params.id;
        this.bridgeService.getOneCompetitorsdata(this.idd).subscribe(
          (data: OneQuotation[]) => {
            this.isLoading=false;
            this.quotations = data;
            this.getEngineer(this.quotations[0].id)
          },
          (err) => {
            console.log(err);
            this.error = err;
          }
        );
      }


      getEngineer(id:any): void {
        this.bridgeService.getCompetitorEngineerByPagination(this.pagination,this.searchValue,this.order_by_field,this.order_by_value,id).subscribe(
          (data: any) => {
            this.isLoading=false;
            this.Engineers = data.data;
            this.Engineerscount = data.meta.count;
          },
          (err) => {
            console.log(err);
            this.error = err;
          }
        );
      }


      open(content: any, isEdit:boolean,data:any) {
        this.isEdit = isEdit;
        if(isEdit == true){
          this.Engineeraddedit = JSON.parse(JSON.stringify(data));
          this.Engineeraddedit.Competitors = this.Engineeraddedit.Competitors.id;
        }
        else{
          this.Engineeraddedit = {
            "Competitors":"",
            "Name":"",
            "EmailID":"",
            "MobileNo":""
        }
        this.Engineeraddedit.Competitors = this.router.snapshot.params.id;
        }
        this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', modalDialogClass: 'modal-dialog-centered order-cards-modal' }).result.then((result) => {
          this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });
      }


    resetAlerts() {
      this.error = '';
      this.success = '';
    }


    addIndustry(f: NgForm) {
      f = this.bridgeService.GlobaleTrimFunc(f);
      this.resetAlerts();
      if (f.valid) {
        this.isLoading = true;
        this.bridgeService.insertEngineers(this.Engineeraddedit,this.isEdit).subscribe(
          (res: any) => {
            if (Object(res)['status'] == "200") {
              this.isLoading = false;
              $(".success-box").show();
              this.modalService.dismissAll();
              setTimeout(() => {
                $(".success-box").fadeOut(1000);
                let currentUrl = this.route.url;
                this.route.routeReuseStrategy.shouldReuseRoute = () => false;
                this.route.onSameUrlNavigation = 'reload';
                this.route.navigate([currentUrl]);
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
            this.modalService.dismissAll();
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



  /* added by millan on 25-05-2022 */
  backClicked() {
    this._location.back();
  }
  /* added by millan on 25-05-2022 */


 private getDismissReason(reason: any): string {
  if (reason === ModalDismissReasons.ESC) {
    return 'by pressing ESC';
  } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
    return 'by clicking on a backdrop';
  } else {
    return `with: ${reason}`;
  }
}
  GoToPdf(id: any) {
     const encodedURL = btoa(id);
    // const url = this.baseUrl2+"/static/html/quotation.html?id="+id;
    const url = "../../assets/html/quotation.html?id=" + id+this.accesstoken;

    // const url = 'http://103.234.187.197:8005/static/html/quotation.html?id=' + id;
    window.open(url, '_blank');
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
