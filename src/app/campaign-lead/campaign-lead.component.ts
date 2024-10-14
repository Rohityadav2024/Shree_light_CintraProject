import { Component, OnInit } from '@angular/core';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Campaign_Ad } from '../bridge';
import { BridgeService } from '../modules/service/bridge.service';
declare var $: any;

@Component({
  selector: 'app-campaign-lead',
  templateUrl: './campaign-lead.component.html',
  styleUrls: ['./campaign-lead.component.css'],
  // add NgbModalConfig and NgbModal to the component providers
  providers: [NgbModalConfig, NgbModal]
})
export class CampaignLeadComponent implements OnInit {
  UserName: any;
  role:any;
  // campaignAd: Campaign_Ad[] = [];
  campaignAd: Campaign_Ad = {
    campaignName: '',campaignSource:'', adName:'', formId:'',
  };
  camSource:any;
  isLoading:boolean=false;
  baseUrl2:any;
  registerForm!: UntypedFormGroup;
  error = '';
  success = '';

  constructor(private formBuilder: UntypedFormBuilder, private bridgeService: BridgeService, private router: Router, config: NgbModalConfig, private modalService: NgbModal) {
    // customize default values of modals used by this component tree
    config.backdrop = 'static';
    config.keyboard = false;

    this.baseUrl2 = this.bridgeService.baseUrl2;

  }

  campaignList: any[] = [
    { campaignName: 'campaign name', campaignSource: 'campaign source', addName: 'Rahul Kumar', formID: '123456', lead: 'Lead' },
    { campaignName: 'campaign name', campaignSource: 'campaign source', addName: 'Rahul Kumar', formID: '123456', lead: 'Lead' },
    { campaignName: 'campaign name', campaignSource: 'campaign source', addName: 'Rahul Kumar', formID: '123456', lead: 'Lead' },
    { campaignName: 'campaign name', campaignSource: 'campaign source', addName: 'Rahul Kumar', formID: '123456', lead: 'Lead' }
  ]

  ngOnInit() {

    this.camSource=this.bridgeService.CampaignSource
    console.log('this.campaignSource',this.camSource);

    this.bridgeService.autoCall();
    // console.log(this.newdatetime)
    this.UserName = sessionStorage.getItem('UserName');
    this.role = sessionStorage.getItem('role');
    if (this.UserName == undefined) {
      this.router.navigate(['/login']);
    }
    // if (this.role != 'admin') {
    //   this.router.navigate(['/dashboard']);
    // }

    const date = new Date();
    // console.log(date);



    // add lead form
    this.registerForm = this.formBuilder.group({
      CampName: ['', Validators.required],
      CampSource: ['', Validators.required],
      AddName: ['', [Validators.required,]],
      FormID: ['', [Validators.required, Validators.minLength(6)]],

    });

  }

  open(content: any) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', modalDialogClass: 'modal-dialog-centered order-cards-modal' });
  }




  //add lead form

  // convenience getter for easy access to form fields

  resetAlerts() {
    this.error = '';
    this.success = '';
  }
  onSubmit(f: NgForm) {

    f = this.bridgeService.GlobaleTrimFunc(f);
    // stop here if form is invalid
    this.resetAlerts();

    if (f.valid) {
      this.isLoading = true;
      this.modalService.dismissAll();
      // this.bridgeService.storeuser(this.bridge).subscribe(
      //   (res: Bridge) => {
      //     if (Object(res)['status'] == "200") {
      //       this.bridges.push(res);
      //      // console.log(res)
      //       this.isLoading = false;
      //       $('.success-box').show();
      //       this.modalService.dismissAll();
      //       $('.success-box').fadeOut(1000);
      //       setTimeout(() => {
      //         let currentUrl = this.route.url;
      //         this.route.routeReuseStrategy.shouldReuseRoute = () => false;
      //         this.route.onSameUrlNavigation = 'reload';
      //         this.route.navigate([currentUrl]);
      //       }, 2000);
      //     }
      //     else {
      //       alert(Object(res)['message']);
      //       this.isLoading = false;
      //     }
      //   },
      //   (err) => {
      //     this.isLoading = false;
      //     const delim = ':';
      //     const name = err.message;
      //     const result = name.split(delim).slice(3).join(delim);
      //     this.modalService.dismissAll();
      //     this.ngOnInit();
      //   }
      // );
    } else {
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
          else if ($("password[name=" + keyys + "]").hasClass('required-fld')) {
            $("password[name=" + keyys + "]").addClass("red-line-border");
            $("password[name=" + keyys + "]").focus();
          }
          else if ($("textarea[name=" + keyys + "]").hasClass('required-fld')) {
            $("textarea[name=" + keyys + "]").addClass("red-line-border");
            $("textarea[name=" + keyys + "]").focus();
          }
        }
        else {
          $("input[name=" + keyys + "]").removeClass("red-line-border");
          $("ng-select[name=" + keyys + "]").removeClass("red-line-border");
          $("select[name=" + keyys + "]").removeClass("red-line-border");
          $("password[name=" + keyys + "]").removeClass("red-line-border");
          $("textarea[name=" + keyys + "]").removeClass("red-line-border");
        }
      }
    }



  }


}
