import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

import { NgForm } from '@angular/forms';
import { Bridge2, EditBridge2,Follow,AddFollow2, } from 'src/app/bridge2';
import { BridgeService } from 'src/app/modules/service/bridge.service';
import { Bridge } from 'src/app/bridge';
import { HttpClient } from '@angular/common/http';
import {NgbNavConfig} from '@ng-bootstrap/ng-bootstrap';
declare var $: any;

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  UserId = sessionStorage.getItem('UserId');
  UserName: any;
  role: any;
  reportingTo: any;
  searchText!:string;
  searchValue!: string;
  closeResult = '';

  nodata: boolean = false;
  isLoading: boolean = false;
  error = '';
  success = '';


  dateObj = new Date();
  time = this.dateObj.toLocaleTimeString();
  month2 = this.dateObj.getMonth() + 1;
  month = (this.month2 < 10 ? '0' : '') + this.month2;
  day = (this.dateObj.getDate() < 10 ? '0' : '') + this.dateObj.getDate();
  year = this.dateObj.getUTCFullYear();
  //  months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  newdate = this.day + "-" + this.month + "-" + this.year;

  inputElementTime = ("0" + this.dateObj.getHours()).slice(-2) + ":" + ("0" + this.dateObj.getMinutes()).slice(-2);

  getValues(obj: {}) {
    return Object.values(obj)
  }
  newdatetime = this.newdate + " " + this.time;
  bridgess: Bridge[] = [];
  bridges2: Bridge2[] | any[] = [];
  bridgesdetails: Bridge2[] = [];
  //bridgesdetails: any;

  public tereer: any[] = [];

  bridges: Bridge2 = {
    date: this.newdate, location: '', companyName: '', source: '', contactPerson: '',Attach: '',Caption:'',
    phoneNumber: '', message: '', email: '', productInterest: '',
    assignedTo: this.UserId, timestamp: this.newdatetime, employeeId: this.UserId, numOfEmployee: '0', turnover: '', designation: '', status: 'Follow Up', leadType: 'Hot',
  };
  bridges22: EditBridge2[] = [];
  editbridges: EditBridge2 = {
    date: '', location: '', companyName: '', source: '', contactPerson: '',Attach: '',Caption:'',
    phoneNumber: '', message: '', email: '', productInterest: '',
    assignedTo: '', timestamp: '', employeeId: '', id: '', numOfEmployee: '0', turnover: '', designation: '', status: '', leadType: ''
  };
  Follow: Follow[] = [];

  AddFollow2s: AddFollow2[] = [];
  AddFollow2: AddFollow2 = { "Subject": "", "Mode": "", "Comment": "", "CreateDate": this.newdate, "CreateTime": this.time, "Emp": '', "Emp_Name": "", "From": this.newdate, "SourceID": "82", "SourceType": "", "Time": this.inputElementTime, "Type": "Followup", "leadType": '' };


  leadtype = 'All';
  status = 'All';
  cate = 'All';
  leadtype2 = 'All';
  status2 = 'All';
  cate2 = 'All';

  defaultleadtype:any;
  defaultleadstatus:any;
  defaultleadcat:any;
  dropdownSettings1 = {};
  dropdownList1: any = [];//for status
  baseUrl2:any;

  source1: any;

  public selectedValue: any;
  public searchAssignValue: any;
  selectedName:any;
  findassaignName:any;
lead_id:any;

  constructor(private router: Router, private bridgeService2: BridgeService, private http: HttpClient,configtab: NgbNavConfig, private modalService: NgbModal) {
    this.baseUrl2 = this.bridgeService2.baseUrl2;
    // customize default values of navs used by this component tree
    configtab.destroyOnHide = false;
    configtab.roles = false;
  }

  ngOnInit(): void {
    this.UserName = sessionStorage.getItem('UserName');
    this.UserId = sessionStorage.getItem('UserId');
    this.role = sessionStorage.getItem('role');
    // this.tereer = this.bridgess;
    this.reportingTo = sessionStorage.getItem('reportingTo');
    if (this.UserName == undefined) {
      this.router.navigate(['/login']);


    }

    $('.multipledropdown').hide();
    this.getAllSource();
    this.getBridge();
    this.getBridge2();
   // this.getleadFollow();





    // verticall scroll bar
    // $(window).on('scroll', function(){
    //   function isScrollIntoView(elem:any, index:any) {
    //     var docViewTop = $(window).scrollTop();
    //     var docViewBottom = docViewTop + $(window).height();
    //     var elemTop = $(elem).offset().top;
    //     var elemBottom = elemTop + $(window).height()*.5;
    //     if(elemBottom <= docViewBottom && elemTop >= docViewTop) {
    //       $(elem).addClass('active');
    //     }
    //     if(!(elemBottom <= docViewBottom)) {
    //       $(elem).removeClass('active');
    //     }
    //   }
    //   var timeline = $('.vertical-scrollable-timeline li');
    //   Array.from(timeline).forEach(isScrollIntoView);
    // });

    this.dropdownList1 = [
      { item_text: 'Follow Up' },
      { item_text: 'Demo' },
      { item_text: 'Proposal' },
      { item_text: 'Shared' },
      { item_text: 'Negotiation' },
      { item_text: 'Hold' },
      { item_text: 'Dead' },

    ];

    this.dropdownSettings1 = {
      singleSelection: false,
      idField: 'item_text',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 2,
      allowSearchFilter: true,
      enableCheckAll: true,
      limitSelection: -1,
      clearSearchFilter: true,
      maxHeight: 197,
      closeDropDownOnSelection: false,
      showSelectedItemsAtTop: false,
      defaultOpen: false,
    }




    // filter functionality start


    this.leadtype2 = 'All';
    this.status2 = 'All';
    this.cate2 = 'All';

 if(sessionStorage.getItem('leadtype')){
  this.defaultleadtype = sessionStorage.getItem('leadtype');
  this.leadtype=this.defaultleadtype;

 }

 if(sessionStorage.getItem('leadstatus')){
  this.defaultleadstatus = JSON.parse( sessionStorage.getItem('leadstatus') || '{}' );
    for (let i = 0; i < this.defaultleadstatus.length; i++) {
      this.status=this.defaultleadstatus[i];
  }


 }

 if(sessionStorage.getItem('leadcat')){
  this.defaultleadcat = sessionStorage.getItem('leadcat');
   this.cate=this.defaultleadcat;

 }

 // filter functionality close

 $(document).mouseup(function (e: { target: any; }) {
  var popup = $(".hover-show");
  if (!$('.edit-delete').is(e.target) && !popup.is(e.target) && popup.has(e.target).length == 0) {
    popup.hide();
  }
});



  }


  // filter open start section

  onItemSelect1(item: any) {

  }
  onSelectAll1(items: any) {
    // console.log(items)
  }
  public onDeSelectAll1(items: any) {
    // console.log(items);
  }

  onDeSelect1(items: any) {
   // console.log("ff", items)

  }

  openNav() {
    (document.getElementById("mySidepanel") as HTMLInputElement).style.width = "350px";
    $('#mySidepanel').addClass('sidepanel2');
    $('#mySidepanel').removeClass('mySidepanelGo');
    $('.sidepanel').show();
  }

  /* Set the width of the sidebar to 0 (hide it) */
  closeNav() {
    // (<HTMLInputElement>document.getElementById("mySidepanel")).style.width = "0";
    (document.getElementById("mySidepanel") as HTMLInputElement).style.width = "350px";
    $('#mySidepanel').removeClass('sidepanel2');
    $('#mySidepanel').addClass('mySidepanelGo');
    // $('.sidepanel').hide();
  }


  apply() {
    this.leadtype = this.leadtype2;
    this.status = this.status2;
    this.cate = this.cate2;
    // console.log("1",this.leadtype);
    // console.log("2",this.status);
    // console.log(this.cate);

    sessionStorage.setItem('leadtype', this.leadtype);
    sessionStorage.setItem('leadstatus', JSON.stringify(this.status));
    sessionStorage.setItem('leadcat', this.cate);
   // $('.sidepanel').hide();
  }

  resetfilter() {
    $('.sidepanel').hide();
    sessionStorage.removeItem('leadtype');
    sessionStorage.removeItem('leadstatus');
    sessionStorage.removeItem('leadcat');
    this.leadtype = 'All';
    this.status = 'All';
    this.cate = 'All';
    this.leadtype2 = 'All';
    this.status2 = 'All';
    this.cate2 = 'All';
  }


  // filter open close section


  resetAlerts() {
    this.error = '';
    this.success = '';
  }
  addLeads(f: NgForm) {
    f = this.bridgeService2.GlobaleTrimFunc(f);
    this.resetAlerts();
    this.isLoading = true;
    if (f.valid) {

      this.bridgeService2.addlead(this.bridges).subscribe(
        (res: Bridge2) => {
          if (Object(res)['message'] == "successful") {
            // Update the list of cars
            // this.bridges2.push(res)
            this.isLoading = false;
            // Inform the user
            $(".success-box").show();
            this.modalService.dismissAll();
            setTimeout(() => {
              $(".success-box").fadeOut(1000);
              let currentUrl = this.router.url;
              this.router.routeReuseStrategy.shouldReuseRoute = () => false;
              this.router.onSameUrlNavigation = 'reload';
              this.router.navigate([currentUrl]);
            }, 2000);
          }
          else {
            alert(Object(res)['message']);
            this.isLoading = false;
          }
          // Reset the form
        },
        (err) => {
          const delim = ":"
          const name = err.message
          const result = name.split(delim).slice(3).join(delim)
          alert(result);
          //  this.ngOnInit();
          this.isLoading = false;
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
          if ($("select[name=" + keyys + "]").hasClass('required-fld')) {
            $("select[name=" + keyys + "]").addClass("red-line-border");
            $("select[name=" + keyys + "]").focus();
          }
          if ($("password[name=" + keyys + "]").hasClass('required-fld')) {
            $("password[name=" + keyys + "]").addClass("red-line-border");
            $("password[name=" + keyys + "]").focus();
          }
          if ($("textarea[name=" + keyys + "]").hasClass('required-fld')) {
            $("textarea[name=" + keyys + "]").addClass("red-line-border");
            $("textarea[name=" + keyys + "]").focus();
          }
        }
        else {
          $("input[name=" + keyys + "]").removeClass("red-line-border");
          $("select[name=" + keyys + "]").removeClass("red-line-border");
          $("password[name=" + keyys + "]").removeClass("red-line-border");
          $("textarea[name=" + keyys + "]").removeClass("red-line-border");
        }
      }
    }
  }


  open(content: any) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', modalDialogClass: 'modal-dialog-centered order-cards-modal' }).result.then((result) => {
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
      return `with: ${reason}`;
    }
  }



  getAllSource(): void {
    this.isLoading = true;
    this.bridgeService2.getAllSourcedata().subscribe(
      (data: any[]) => {
        this.source1 = data;
        // console.log(this.source1)
        this.isLoading = false;

      },
      (err) => {
        console.log(err);
        this.error = err;
      }
    );
  }
  pagenumber:number=1;
  leadCount:any;
  getBridge2(): void {
    this.isLoading = true;
    this.bridgeService2.getLeadCount().subscribe(
      (data: any) => {
        this.leadCount=data[0].lead_count;
      });
    this.bridgeService2.getAll2(this.pagenumber,this.leadCount).subscribe(
      (data: Bridge2[]) => {
        this.isLoading = false;
        this.bridges2 = data;
        // console.log(this.bridges2)
        // if (this.bridges2.length <= 0) {
        //   this.nodata = true;

        // } else {
        //   this.nodata = false;
        // }
        // this.bridgesdetails =d_details;
        for (let i = 0; i < this.bridges2.length; i++) {
          var theValue = this.bridges2[i]['location'];
          var isANumber = isNaN(Number(theValue)) === false;

          if (isANumber) {
            this.bridges2[i]['location'] = '';
          }
          else {
            this.bridges2[i]['location'] = this.bridges2[i]['location'];
          }

        }


        if (!!data.length) {
          this.bridgeService2.getOneLeaddata(this.bridges2[0].id).subscribe(
            (data: Bridge2[]) => {
              this.isLoading = false;
              this.bridgesdetails = data;
              // console.log(this.bridgesdetails);

            },
            (err) => {
              this.isLoading = false;
              console.log(err);
              this.error = err;
            }
          );

          this.bridgeService2.getFollowLeaddata(this.bridges2[0].id).subscribe(
            (data: Follow[]) => {
              this.isLoading = false;
              this.Follow = data;

              if (this.Follow.length <= 0) {
                this.nodata = true;
              } else {
                this.nodata = false;
              }

            },
            (err) => {
              this.isLoading = false;
              console.log(err);
              this.error = err;
            }
          );

        }
      },
      (err) => {
        this.isLoading = false;
        console.log(err);
        this.error = err;
      }
    );
    this.bridges2.find((list: any) => {
      return list;
    })

  }


  //  edit lead section open

  openEdit(contentEdit: any, item: Bridge2) {

    this.modalService.open(contentEdit, { ariaLabelledBy: 'modal-basic-title', modalDialogClass: 'modal-dialog-centered order-cards-modal' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });

    this.editbridges.id = String(item.id);
    this.editbridges.date = item.date;
    this.editbridges.companyName = item.companyName;
    this.editbridges.source = item.source;
    //console.log(this.editbridges.source);
    this.editbridges.email = item.email;
    this.editbridges.location = item.location;
    this.editbridges.contactPerson = item.contactPerson;
    this.editbridges.phoneNumber = item.phoneNumber;
    this.editbridges.message = item.message;
    this.editbridges.productInterest = item.productInterest;
    this.editbridges.assignedTo = Object.values(item.assignedTo)[0];
    this.editbridges.employeeId = item.employeeId.id;
    this.editbridges.timestamp = item.timestamp;
    this.editbridges.status = item.status;
    this.editbridges.leadType = item.leadType;
    this.editbridges.designation = item.designation;
    this.editbridges.turnover = item.turnover;
    this.editbridges.numOfEmployee = item.numOfEmployee;
    // console.log(this.editbridges.employeeId);
  }

  editLeads(fb: NgForm) {
    fb = this.bridgeService2.GlobaleTrimFunc(fb);
    this.resetAlerts();

    this.bridgeService2.editleads(this.editbridges).subscribe(
      (res: EditBridge2) => {
        this.bridges22.push(res)
        $(".edit-success-box").show();
        this.modalService.dismissAll();
        setTimeout(() => {
          $(".edit-success-box").fadeOut(1000);
          let currentUrl = this.router.url;
          this.router.routeReuseStrategy.shouldReuseRoute = () => false;
          this.router.onSameUrlNavigation = 'reload';
          this.router.navigate([currentUrl]);
        }, 2000);

      },
      (err) => {
        this.modalService.dismissAll();
        const delim = ":"
        const name = err.message
        const result = name.split(delim).slice(3).join(delim)
        alert(result);
        this.ngOnInit();
      }
    );
  }

  editdeletepop(item: Bridge2) {
    $('.hover-show' + item.id).toggle()
  }

  // edit lead section close


  // delete lead start

  deleteid: number = 0;
  deleteLeads(id: number) {

    $('.delete-success-box').show();
    $('.hover-show').hide();
    this.deleteid = id;

    setTimeout(() => {
      $('.delete-success-box').fadeOut();
    }, 50000);


  }



  yesdeleteUser(status: number) {
    if (status == 1) {
      let id = this.deleteid;
      this.resetAlerts();
     // this.isLoading2 = true;
        this.bridgeService2.deleteleads(id).subscribe(
        (res) => {
          this.bridges2 = this.bridges2.filter(function (item) {
            return item['id'] && +item['id'] !== +id;
          });
          //  this.ngOnInit();
        },
        (err) => (this.error = err)
      );
      this.ngOnInit();
      $('.delete-success-box').hide();
    } else {
     // this.modalService.dismissAll();
      this.ngOnInit();
      $('.delete-success-box').hide();
    }
  }
  // delete lead close

  leaddetailsopen(id: number|any) {
    this.bridgeService2.getOneLeaddata(id).subscribe(
      (data: Bridge2[]) => {
        this.isLoading = false;
        this.bridgesdetails = data;
        // console.log(this.bridgesdetails);

      },
      (err) => {
        this.isLoading = false;
        console.log(err);
        this.error = err;
      }
    );

    this.bridgeService2.getFollowLeaddata(id).subscribe(
      (data: Follow[]) => {
        this.isLoading = false;
        this.Follow = data;

        if (this.Follow.length <= 0) {
          this.nodata = true;

        } else {
          this.nodata = false;
        }

      },
      (err) => {
        this.isLoading = false;
        console.log(err);
        this.error = err;
      }
    );
  }





  getBridge(): void {
    this.isLoading = true;
    this.bridgeService2.getAll().subscribe(
      (data: Bridge[]) => {
        this.bridgess = data;
        this.isLoading = false;
        // console.log(this.bridgess);
        this.tereer = this.bridgess;
        for (let i = 0; i < this.bridgess.length; i++) {
          if (this.bridgess[i]['SalesEmployeeCode'] == '-1') {
            this.bridgess.splice(i, 1);
          }
          if (this.bridgess[i]['SalesEmployeeCode'] == '') {
            this.bridgess.splice(i, 1);
          }
        }
        if (this.bridgess.length == 0) {
          this.nodata = true;
        }
        else {
          this.nodata = false;
        }
        // console.log(this.bridgess);

      },
      (err) => {
        console.log(err);
        this.error = err;
        this.isLoading = false;
      }
    );
  }


  //  lead follow up close

  // Assign to modal start




  // public filteredList: any = [];


  filterDropdown(e:any) {

  let searchString = e.target.value;
  this.tereer = this.bridgess;
    this.tereer = this.bridgess.filter(
      (user:any) => {
         return user.SalesEmployeeName.toLocaleLowerCase().includes(searchString.toLocaleLowerCase())

      }
    );
  }

  selectValue(name:any) {
    this.selectedValue = name;

    this.findassaignName=this.bridgess.find((obj:any)=>obj.id===name);
    this.selectedName=this.findassaignName.SalesEmployeeName

  }

  AssignTo(contentEdit: any, item: Bridge2) {

    this.modalService.open(contentEdit, { ariaLabelledBy: 'modal-basic-title', modalDialogClass: 'modal-dialog-centered order-cards-modal' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
    this.lead_id=[item.id];
    // console.log(this.lead_id);
    // var mutdelete = new Array();
    // this.lead_id.push(item.id);
    // console.log(this.lead_id);
  }

  Assign_(){
    if (confirm('Are You Sure Do You Want To Assign Lead')) {

      this.bridgeService2.leadAssign(this.lead_id,this.selectedValue).subscribe(
        (data: any) => {
          this.ngOnInit();
          this.modalService.dismissAll();
        });
      // this.http.post(this.baseUrl2 + '/lead/assign', { id: this.lead_id, employeeId: this.selectedValue }).toPromise().then((data: any) => { });

    }
  }
  // Assign to modal close

  //  add follow  up start

  openfollowup(followup: any) {
    this.modalService.open(followup, { ariaLabelledBy: 'modal-basic-title', modalDialogClass: 'modal-dialog-centered order-cards-modal' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
// console.log(this.bridgesdetails)
// console.log(this.bridgesdetails[0].id);
// console.log(this.bridgesdetails[0].companyName);
    this.AddFollow2.Subject = this.bridgesdetails[0].companyName;
    this.AddFollow2.SourceID = String(this.bridgesdetails[0].id);

    this.AddFollow2.Emp = String(this.UserId);
    this.AddFollow2.Emp_Name = this.UserName;
    this.AddFollow2.SourceType = 'Lead';
  }


  addFollowUp(fb: NgForm) {
    fb = this.bridgeService2.GlobaleTrimFunc(fb);
    this.resetAlerts();
    this.isLoading = true;

    if (fb.valid) {
      this.AddFollow2.Emp = Number(this.AddFollow2.Emp);
      console.log(this.AddFollow2.Time);
      const timeString = this.AddFollow2.Time;

      // Prepend any date. Use your birthday.
      const timeString12hr = new Date('1970-01-01T' + timeString + 'Z')
        .toLocaleTimeString('en-US',
          { timeZone: 'UTC', hour12: true, hour: 'numeric', minute: 'numeric' }
        );
      var newdt = `${timeString12hr}`
      this.AddFollow2.Time = newdt;


      this.bridgeService2.storeleadfollow2(this.AddFollow2).subscribe(
        (res: AddFollow2) => {
          if (Object(res)['status'] == "200") {
            // Update the list of cars
            this.AddFollow2s.push(res)
            this.isLoading = false;
            // Inform the user
           // alert('Follow Up Added Successfully')
           $(".success-box2").show();
            this.modalService.dismissAll();
            setTimeout(() => {
              $(".success-box2").fadeOut(1000);
              let currentUrl = this.router.url;
              this.router.routeReuseStrategy.shouldReuseRoute = () => false;
              this.router.onSameUrlNavigation = 'reload';
              this.router.navigate([currentUrl]);
            }, 2000);
          }
          else {
            alert(Object(res)['message']);
          }
          // Reset the form
        },
        (err) => {
          const delim = ":"
          const name = err.message
          const result = name.split(delim).slice(3).join(delim)
          alert(result);
          //  this.ngOnInit();
        }
      );


    }
    else {
      for (let i = 0; i < Object.keys(fb.value).length; i++) {
        var keyys = Object.keys(fb.value)[i];
        if (fb.value[keyys].length == 0) {

          if ($("input[name=" + keyys + "]").hasClass('required-fld')) {
            $("input[name=" + keyys + "]").addClass("red-line-border");
            $("input[name=" + keyys + "]").focus();
          }
          if ($("select[name=" + keyys + "]").hasClass('required-fld')) {
            $("select[name=" + keyys + "]").addClass("red-line-border");
            $("select[name=" + keyys + "]").focus();
          }
          if ($("password[name=" + keyys + "]").hasClass('required-fld')) {
            $("password[name=" + keyys + "]").addClass("red-line-border");
            $("password[name=" + keyys + "]").focus();
          }
          if ($("textarea[name=" + keyys + "]").hasClass('required-fld')) {
            $("textarea[name=" + keyys + "]").addClass("red-line-border");
            $("textarea[name=" + keyys + "]").focus();
          }

        }

        else {
          $("input[name=" + keyys + "]").removeClass("red-line-border");
          $("select[name=" + keyys + "]").removeClass("red-line-border");
          $("password[name=" + keyys + "]").removeClass("red-line-border");
          $("textarea[name=" + keyys + "]").removeClass("red-line-border");
        }
      }
    }

  }

  // add follow up close

  // getleadFollow(): void {
  //   this.isLoading = true;
  //   this.idd = this.router.snapshot.params.id;
  //   this.bridgeService.getFollowLeaddata(this.idd).subscribe(
  //     (data: Follow[]) => {
  //       this.isLoading = false;
  //       this.Follow = data;

  //       if (this.Follow.length <= 0) {
  //         this.nodata = true;
  //       } else {
  //         this.nodata = false;
  //       }
  //
  //     },
  //     (err) => {
  //       this.isLoading = false;
  //       console.log(err);
  //       this.error = err;
  //     }
  //   );
  // }
  // lead follow up close

  sortedColumn: string = '';
  sortsend: boolean | undefined;


  togglesortType(key: any) {
    this.sortsend = !this.sortsend;
    this.sortedColumn = key + String(this.sortsend);
    // alert(this.sortedColumn);
  }


  mouseEnter() {
    $('.tableview').show();
    $('.shortview').hide();
  }
  mouseLeave() {
    $('.tableview').hide();

  }
  multipledropdownhide() {
    $('.tableview').hide();
    $('.shortview').hide();
  }
  mouseEntershortby() {
    $('.shortview').show();
    $('.tableview').hide();
  }
  mouseLeavetable() {
    $('.tableview').hide();
  }
  mouseLeaveshort() {
    $('.shortview').hide();
  }




  files: any[] = [];
  // @Input() progress = 0;

  /**
   * on file drop handler
   */
  onFileDropped($event: any) {
    this.prepareFilesList($event);
  }

  /**
   * handle file from browsing
   */
  fileBrowseHandler(files: any) {
    this.prepareFilesList(files.target.files);
  }

  /**
   * Delete file from files list
   * @param index (File index)
   */
  deleteFile(index: number) {
    this.files.splice(index, 1);
  }

  /**
   * Simulate the upload process
   */
  uploadFilesSimulator(index: number) {
    setTimeout(() => {
      if (index === this.files.length) {
        return;
      } else {
        const progressInterval = setInterval(() => {
          if (this.files[index].progress === 100) {
            clearInterval(progressInterval);
            this.uploadFilesSimulator(index + 1);
          } else {
            this.files[index].progress += 5;
          }
        }, 200);
      }
    }, 1000);
  }

  /**
   * Convert Files list to normal array list
   * @param files (Files List)
   */
  prepareFilesList(files: Array<any>) {
    for (const item of files) {
      item.progress = 0;
      this.files.push(item);
    }
    this.uploadFilesSimulator(0);
  }

  /**
   * format bytes
   * @param bytes (File size in bytes)
   * @param decimals (Decimals point)
   */
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

}
