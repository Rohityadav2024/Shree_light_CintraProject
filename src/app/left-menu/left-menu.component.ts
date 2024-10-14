import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BridgeService } from '../modules/service/bridge.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { NgForm } from '@angular/forms';
import { HeadingServicesService } from '../modules/service/heading-services.service';
import { NotiferService } from '../modules/service/helpers/notifer.service';
import { KeyboardService } from '../keyboard.service';

declare var $: any;

@Component({
  selector: 'app-left-menu',
  templateUrl: './left-menu.component.html',
  styleUrls: ['./left-menu.component.css']
})
export class LeftMenuComponent implements OnInit {
  @ViewChild('leftNavbar') leftNavbar: any;
  UserName = sessionStorage.getItem('UserName');
  UserId = sessionStorage.getItem('UserId');
  role = sessionStorage.getItem('role');
  notify: any;
  currentURL: string = "";
  SessionId: any;
  hiddingLeftNav: any = { match: ["#/", "", "#/login"] };
  urlcheck: any;
  isLead: boolean = false;
  isLocation: boolean = false;
  loginData: any;
  Headingss: any[] = [];
  savedModules: any[] = [];
  constructor(private route: Router, private router: ActivatedRoute,
    private _NotifierService: NotiferService,
    private modalService: NgbModal, private bridgeService2: BridgeService,
    private HeadingServices: HeadingServicesService,
    private _KeyboardService: KeyboardService) {
  }
  ngAfterViewInit() {
    this.leftMenuCaller();
  }
  ngOnInit() {
    // debugger
    this.bridgeService2.getLoginData().subscribe(($loginHit: any) => {
      // debugger
      this.UserName = this.UserName = $loginHit?.userName;
      this.UserId = this.UserId = $loginHit?.id;
      this.role = this.role = $loginHit['RoleDetails']?.Name?.toLowerCase();
      this.savedModules = $loginHit?.AccessManagement;
    })

    this.HeadingServices.getLoginData().subscribe(($loginHit2: any) => {
      // console.log($loginHit2);
      sessionStorage.setItem('Allfields', JSON.stringify($loginHit2));
      this.HeadingServices.getAllFields();
      this.HeadingServices.changeFieldName();
      this.HeadingServices.changeFieldName2();
      this.HeadingServices.changeFieldName3();
      this.HeadingServices.changeFieldName4();
      this.HeadingServices.changeFieldName5();
      this.HeadingServices.changeFieldName6();
      this.HeadingServices.changeFieldName7();
      this.HeadingServices.changeFieldName8();
      this.HeadingServices.changeFieldName21();
    })
    this.currentURL = window.location.href;
    if (this.currentURL.includes('leads')) {
      this.isLead = true;
    }
    else {
      this.isLead = false;
    }
    if (this.currentURL.includes('locationTracking')) {
      this.isLocation = true;
    }
    else {
      this.isLocation = false;
    }
    $(document).ready(function () {
      if ($(".dropdown-container li a").hasClass('active')) {
        $(".Inventory").addClass('active');
        $(".dropdown-container").addClass('active');
        $('.fa-down').addClass("rotate");
      }
    });

    $(document).ready(function () {
      if ($(".dropdown-container3 li a").hasClass('active')) {
        $(".Inventory3").addClass('active');
        $(".dropdown-container3").addClass('active');
        $('.fa-down').addClass("rotate");
      }
    });

    this.Headingss = this.HeadingServices.getReturnLeftMenu();
    // console.log(this.Headingss)
    const savedModulesString = sessionStorage.getItem('savedModules');
    if (savedModulesString) {
      this.savedModules = JSON.parse(savedModulesString);
    }

  }

  reloadMenu() {
    // Logic to reload the left menu component
    console.log('Left menu component reloaded');
    // Add the logic to refresh or reload your menu data
  }


  querysParam(key: any, value: any) {
    this.route.navigate(['/locationTracking'], {
      queryParams: { [this.bridgeService2.encoderData(key)]: this.bridgeService2.encoderData(value) }
    })
    this.isLocation = true;
  }
  MyLocation() {
    this.route.navigate(['/Mylocationlocation/one/', sessionStorage.getItem('UserId')]);
  }
  burgerToggle(leftNavbar: any) {
    if ($('.sidebar').hasClass("active")) {
      $(".sidebar").removeClass("active");
      $('.new-tabl th').removeClass("active");
      $('.sidebar .nav-links li').removeClass("activee");
      $('.fa-down4').show();
      this.leftnavbarPass(false);
    }
    // Else, the element doesn't have the active class, so we remove it from every element before applying it to the element that was clicked
    else {
      $(".sidebar").removeClass("active");
      $('.sidebar').addClass("active");
      $('.new-tabl th').addClass("active");
      $('.sidebar .nav-links li').addClass("activee");
      $('.fa-down4').hide();
      this.leftnavbarPass(true);
    }
  }
  leftnavbarPass(leftNavbar: any) {
    this.bridgeService2.leftNavBar.next(leftNavbar)
  }

  leftMenuCaller() {
    if (this.hiddingLeftNav.match.includes(window.location.hash)) {
      this.leftNavbar.nativeElement.classList.add('d-none');
    }
  }

  falseDropdown() {
    this.isLead = false;
    this.isLocation = false;
    $('.Inventory3').removeClass("active");
    $('.dropdown-container3').removeClass("active");
    $('.fa-down').removeClass("rotate");
    $('.Inventory2').removeClass("active");
    $('.dropdown-container2').removeClass("active");
    $('.fa-down2').removeClass("rotate");
    this.CardcodeRemoveFilter();
  }

  sublist() {
    this.isLead = false;
    this.isLocation = false;
    $('.Inventory').toggleClass("active");
    $('.dropdown-container').toggleClass("active");
    $('.fa-down').toggleClass("rotate");
    this.CardcodeRemoveFilter();
  }

  CardcodeRemoveFilter() {
    this.bridgeService2.setBpCardcode(undefined);
    this.bridgeService2.setLeadID(undefined);
    this.bridgeService2.setOpportunityID(undefined);
    this.bridgeService2.SetQuotationId(undefined);
    this.bridgeService2.SetOrderId(undefined);
    this.bridgeService2.SetOrderType(undefined);
    this.bridgeService2.setAllFilter('', undefined);
    this.bridgeService2.resetUserFilter();


    this.isLocation = false;
  }

  sublist2() {
    $('.Inventory2').toggleClass("active");
    $('.dropdown-container2').toggleClass("active");
    // $('.dropdown-container2').toggle(80);
    $('.fa-down2').toggleClass("rotate");

    if ($(".dropdown-container2 li a").hasClass('active')) {
      $(".Inventory2").addClass('active');
      $(".dropdown-container2").addClass('active');
      $('.fa-down').addClass("rotate");
    }
    this.CardcodeRemoveFilter();
  }
  sublist3() {
    $('.Inventory3').toggleClass("active");
    $('.dropdown-container3').toggleClass("active");
    $('.fa-down').toggleClass("rotate");
    this.CardcodeRemoveFilter();
  }
  closeResult = '';
  deleteAttach(confirmModal2: any) {
    this.modalService
      .open(confirmModal2, { ariaLabelledBy: 'modal-basic-title', backdrop: 'static', modalDialogClass: 'confirm-modal modal-dialog-centered' })
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }

  Logout() {
    this.modalService.dismissAll();
    this.bridgeService2.logout();
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

  error = '';
  success = '';

  getNotificationData(): void {
    this.bridgeService2.getNotification().subscribe(
      (data: any) => {
        this.notify = data;
      },
      (err: any) => {
        this.error = err;
      }
    );
  }

  resetAlerts() {
    this.error = '';
    this.success = '';
  }


  deleteNotification(id: any) {
    this.resetAlerts();
    this.bridgeService2.readNotification(id).subscribe(
      (res) => {
        this.ngOnInit();
        this.getNotificationData();
      },
      (err) => {
        this.error = err;
      }
    );

  }

  hidenotification() {
    $(".shohiclass").hide();


  }

  isModuleView(module_id: number): boolean {
    const selectedModule = this.savedModules?.filter((module: any) => module.module_id === module_id);
    if (selectedModule && selectedModule.length > 0 && selectedModule[0].is_view) {
      return true;
    }
    return false;
  }
}
