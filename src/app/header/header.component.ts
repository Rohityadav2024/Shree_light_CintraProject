import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BridgeService } from 'src/app/modules/service/bridge.service';
import { Bridge } from '../bridge';
import { NotiferService } from '../modules/service/helpers/notifer.service';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgForm } from '@angular/forms';
declare var $: any;
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  hiddingLeftNav: any = { match: ["#/", "", "#/login"] };
  leftNavbar: any;
  constructor(private route: Router,public bridgeService2: BridgeService,private _NotifierService: NotiferService, private modalService: NgbModal) { }
  toogleList:boolean = false;
  toogleListfun(dat:boolean){
    this.toogleList= dat;
  }

  show10Only(str:any){
    if (str.length <= 10) {
      return str;
    }
    return str.slice(0, 10) + "...";
  }
  appList:any[] = [];
  CustomerappList:any[] = [];
  currentURL: string = "";
  isButn:boolean = false;
  Application: any = {
    "application": "3",
    "license_cost": "0",
    "active_users": 2,
    "url": "",
    "backend_url": "",
    "start_date": "",
    "end_date": "",
    "payment_frequency": "Once",
    "subscription": "1",
    "customer": ''
}
Bridge2: any;
  @HostListener('document:click', ['$event'])
  onClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (!target.closest('.figma-user-detail') && !target.closest('.sidepanel')) {
      // this.toogleList = false;
      this.closeNav();
    }
  }
  ngOnInit(): void {
    this.currentURL = window.location.href;
    if(this.currentURL.includes('dashboard')){
      this.isButn = true;
    }
    else{
      this.isButn = false;
    }
    this.getAppListAll();
    this.getEmpOne();
  }

  getEmpOne(): void {
    // this.isLoading2 = true;
    // this.idd = this.router.snapshot.params.id;
    //console.log(this.idd);
    this.bridgeService2.getoneemployeechecklogout(sessionStorage.getItem('UserId')).subscribe(
      (data: any) => {
        if (data.status == "200") {
        // this.isLoading2 = false;
        this.Bridge2 = data.data;
        // console.log('user details data',this.Bridge2);
      }
      else {
        this._NotifierService.showError(data.message);
        // this.route.navigate(['/login']);
      }
      },
      (err) => {
        // this.isLoading2 = false;
        console.log(err);
        if(err.status == 401){
        this.bridgeService2.logout();
        }
      }
    );
  }

  ngAfterViewInit() {
    this.leftNavbar = document.querySelector('.figma-sidebar');
    this.leftMenuCaller();
  }
  burgerToggle(leftNavbar: any) {
    if ($('.figma-sidebar').hasClass("active")) {
      $(".figma-sidebar").removeClass("active");
      $('.new-tabl th').removeClass("active");
      $('.figma-sidebar .nav-links li').removeClass("activee");
      $('.fa-down4').show();
      this.leftnavbarPass(false);
    }
    // Else, the element doesn't have the active class, so we remove it from every element before applying it to the element that was clicked
    else {
      $(".figma-sidebar").removeClass("active");
      $('.figma-sidebar').addClass("active");
      $('.new-tabl th').addClass("active");
      $('.figma-sidebar .nav-links li').addClass("activee");
      $('.fa-down4').hide();
      this.leftnavbarPass(true);
    }
  }
  leftnavbarPass(leftNavbar: any) {
    this.bridgeService2.leftNavBar.next(leftNavbar)
  }
  leftMenuCaller() {
    if (this.hiddingLeftNav.match.includes(window.location.hash)) {
      // this.leftNavbar.nativeElement.classList.add('d-none');
      this.leftNavbar.classList.add('d-none');
    }
  }

  getAppListByCustomer(){
    var client_id:any = sessionStorage.getItem('client_id');
        this.bridgeService2.ApplistByCLient(client_id).subscribe(
          (res: any) => {
            if (Object(res)['status'] == '200') {
             this.CustomerappList =  Object(res)['data'];
            //  console.log(this.CustomerappList)

            // Loop through applications array
for (let i = 0; i < this.appList.length; i++) {
  // Find matching subscription object
  const subscription = this.CustomerappList.find(sub => sub.application == this.appList[i].id);
  // If matching subscription found, add its keys to the application object
  if (subscription) {
      for (const key in subscription) {
          if (key !== 'id' && !this.appList[i].hasOwnProperty(key)) {
            this.appList[i]['isExist'] = true;
          }
      }
  }
  else{
    this.appList[i]['isExist'] = false;
  }
}
             } else {
            alert(Object(res)['message']);
          }
          },
          (err:any) => {
            console.log(err);
          }
        );
  }


  getAppListAll(){
        this.bridgeService2.ApplistAll().subscribe(
          (res: any) => {
            if (Object(res)['status'] == '200') {
             this.appList =  Object(res)['data'];
            //  console.log(this.appList)
            // for (let i = 0; i < this.appList.length; i++) {
            //   if (this.appList[i]['id'] == '2') {
            //     this.appList.splice(i, 1);
            //   }
            // }
            this.getAppListByCustomer();
             } else {
            alert(Object(res)['message']);
          }
          },
          (err:any) => {
            console.log(err);
          }
        );
  }


  redirect(type:any,isExist:boolean){
    var client_id:any = sessionStorage.getItem('client_id');
    if(type == '3'){
                if (isExist == true){
                  window.open('http://servesaas.bridgexd.com/#/login', '_blank');
                }
                else{
                  window.open('/#/confirmapp', '_blank');
    // this.route.navigate(['/confirmapp']);
                  };
                }

                else if(type == '2'){
                  window.open('/#/dashboard', '_blank');
                }
                else if(type == '1'){
                  window.open('http://superadmin.bridgexd.com/assets/html/omini.html', '_blank');
                }
                else if(type == '4'){
                  window.open('http://superadmin.bridgexd.com/assets/html/nexus.html', '_blank');
                }
                else if(type == '5'){
                  window.open('http://superadmin.bridgexd.com/assets/html/pulse.html', '_blank');
                }
                else if(type == '6'){
                  window.open('http://superadmin.bridgexd.com/assets/html/intel.html', '_blank');
                }
      else{
        alert('This app is under maintenance')
      }

  }
  openNav() {
    (document.getElementById("myProfilepanel") as HTMLInputElement).style.width = "340px";
    (document.getElementById("myProfilepanel") as HTMLInputElement).style.zIndex = "9";
    $('#myProfilepanel').addClass('sidepanel2');
    $('#myProfilepanel').removeClass('mySidepanelGo');
    $('.sidepanel').show();

  }

  closeNav() {
    (document.getElementById("myProfilepanel") as HTMLInputElement).style.width = "340";
    $('#myProfilepanel').removeClass('sidepanel2');
    $('#myProfilepanel').addClass('mySidepanelGo');
  }



  resetPass:any = {
    id:'',
    password:'',
    app_id:''
  }
  isLoading: boolean = false;
  fieldTextType: boolean | undefined;

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
  closeResult = '';
  openPass(contentchangepassword: any, id: any) {
    this.modalService
      .open(contentchangepassword, { ariaLabelledBy: 'modal-basic-title', modalDialogClass: 'modal-dialog-centered order-cards-modal' })
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
    // item.edit_id =
    console.log(id)
    this.resetPass.id = id;
    this.resetPass.app_id = '2'
  }


  gen() {
    let num = (document.getElementById('checkfld') as HTMLInputElement);
    if (num.checked) {
      let rand = Math.random().toString(36).substr(2, 8);
      this.resetPass.password = rand;
    }
  }
  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }


  changepass(fb: NgForm) {
    fb = this.bridgeService2.GlobaleTrimFunc(fb);
    this.isLoading = true;
    this.bridgeService2.resetEmplyeeUserPassword(this.resetPass).subscribe(
      (res: any) => {
        if (Object(res)['status'] == '200') {
          this.isLoading = false;
          this._NotifierService.showSuccess('Reset Password Succesfully');
          this.modalService.dismissAll();
          // this.RowPerPage();
     this.bridgeService2.logout();
        } else {
          alert(Object(res)['message']);
        }
      },
      (err) => {
        this.isLoading = false;
        const delim = ':';
        const name = err.message;
        const result = name.split(delim).slice(3).join(delim);
        alert(result);
      }
    );
  }
}
