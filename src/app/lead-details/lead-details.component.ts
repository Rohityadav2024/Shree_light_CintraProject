import { Component,AfterViewChecked, ElementRef, ViewChild, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BridgeService } from '../modules/service/bridge.service';
import { Orders } from '../orders';
import { Bridge2, EditBridge2, Follow,AddFollow2 } from '../bridge2';
import { Location } from '@angular/common';
import { Bridge } from '../bridge';
import { HeadingServicesService } from '../modules/service/heading-services.service';
import { NotiferService } from '../modules/service/helpers/notifer.service';
import { PhoneComponent } from '../phone/phone.component';
declare var $: any;

@Component({
  selector: 'app-lead-details',
  templateUrl: './lead-details.component.html',
  styleUrls: ['./lead-details.component.scss'],
})
export class LeadDetailsComponent implements OnInit {
  @ViewChild(PhoneComponent) childComponent!: PhoneComponent;
  @ViewChild('ExcelsheetComponent', { static: false }) ExcelsheetComponent!: ElementRef | any;
  dateObj = new Date();
  commonObj: any = { isContact: true, bpAddreassMerge: null,detailTab:'detail',activityTab: 'note' };
  orders: Orders[] = [];
  bridgess: Bridge[] = [];

  Bridge2: Bridge2[] = [];
  Follow: Follow[] = [];
  AddFollow2s: AddFollow2[] = [];
  bridgesdetails: Bridge2[] = [];

  closeResult = '';
  UserName: any;
  UserId: any;
  error = '';
  success = '';
  idd: any;
  CardCode: any;
  isLoading: boolean = false;
  isLoading2: boolean = false;
  isdataLoading:boolean=false;
  ordertype: string = 'over';
  fileattachList: any[] = [];

  bridges22: EditBridge2[] = [];

  showhide:boolean = false;
  baseUrl2:any;
  ModeOfCommunication:any;
  leadStatus:any;
  Headingss: any[] = [];
  @ViewChild('scrollMe') private myScrollContainer!: ElementRef;
  savedModules: any[] = [];
  constructor(
    private bridgeService: BridgeService,
    private route: Router,private HeadingServices: HeadingServicesService,
    private _NotifierService: NotiferService,
    private router: ActivatedRoute,
    private modalService: NgbModal,
    private _location: Location
  ) { }

  ngOnInit(): void {


this.baseUrl2=this.bridgeService.baseUrl2;
this.ModeOfCommunication=this.bridgeService.ModeOfCommunication;
this.leadStatus=this.bridgeService.leadStatus;
    this.bridgeService.autoCall();
    this.getlead();
    this.getleadFollow();
    this.getAllSource();
    this.getBridge();

    this.UserName = sessionStorage.getItem('UserName');
    this.UserId = sessionStorage.getItem('UserId');

    this.Headingss = this.HeadingServices.getModule2();
    if (this.UserName == undefined) {
      this.route.navigate(['/login']);
    }

this.getLeadAll();
this.scrollToBottom();
// this.idd = this.router.snapshot.params.id;

const savedModulesString = sessionStorage.getItem('savedModules');
if (savedModulesString) {
  this.savedModules = JSON.parse(savedModulesString);
}
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
}

scrollToBottom(): void {
    try {
        this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    } catch(err) { }
}

CallFiled(val:any,history:any){
  this.childComponent.visible(val,history);
}

  resetAlerts() {
    this.error = '';
    this.success = '';
  }

  getlead(): void {
    this.isdataLoading = true;
    this.idd = this.router.snapshot.params.id;

    // console.log(this.idd);
    this.bridgeService.getOneLeaddata(this.idd).subscribe(
      (data: Bridge2[]) => {
        this.isdataLoading = false;
        this.Bridge2 = data;
        this.bridgesdetails = data;
        // console.log(this.bridgesdetails);

      },
      (err) => {
        this.isdataLoading = false;
        console.log(err);
        this.error = err;
      }
    );

    this.bridgeService.leadgetlist(Number(this.idd)).subscribe((data: any) => {
      this.isdataLoading = false;
      this.fileattachList = data;
      // console.log(data)
    },
    (err) => {
      this.isdataLoading = false;
      console.log(err);
      this.error = err;
    });


  }
  nodata: boolean = false;

  getleadFollow(): void {
    this.isLoading2 = true;
    this.idd = this.router.snapshot.params.id;
    this.bridgeService.getFollowLeaddata(this.idd).subscribe(
      (data: Follow[]) => {
        this.isLoading2 = false;
        this.Follow = data;

        // console.log('this.Follow',this.Follow)
        this.Follow.sort(function(a:any,b:any){
          return Number(new Date(b.UpdateDate)) - Number(new Date(a.UpdateDate));
        });

        if (this.Follow.length <= 0) {
          this.nodata = true;
        } else {
          this.nodata = false;
        }

      },
      (err) => {
        this.isLoading2 = false;
        console.log(err);
        this.error = err;
      }
    );
  }

  open(content: any) {
    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title' })
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


  /* added by millan on 25-05-2022 */
  backClicked() {
    this._location.back();
  }



  source1: any;
  getAllSource(): void {
    this.bridgeService.getAllSourcedata().subscribe(
      (data: any[]) => {
        this.source1 = data;
        // console.log(this.source1)

      },
      (err) => {
        console.log(err);
        this.error = err;
      }
    );
  }


  getBridge(): void {
    this.bridgeService.getAll().subscribe(
      (data: Bridge[]) => {
        this.bridgess = data;
        for (let i = 0; i < this.bridgess.length; i++) {
          if (this.bridgess[i]['SalesEmployeeCode'] == '-1') {
            this.bridgess.splice(i, 1);
          }
          if (this.bridgess[i]['SalesEmployeeCode'] == '') {
            this.bridgess.splice(i, 1);
          }
        }
        // if (this.bridgess.length <= 0) {
        //   this.nodata = true;
        // }
        // else {
        //   this.nodata = false;
        // }
        // console.log(this.bridgess);

      },
      (err) => {
        console.log(err);
        this.error = err;
      }
    );
  }

  receiveData(data: string) {
    if(data == 'true'){
      this.ngOnInit();
    }
  }
  getId(id:any){
    this.ExcelsheetComponent.openEmployee22(id);
  }

  openfollowup(id:any){
    this.ExcelsheetComponent.openfollowup22(id);
  }

  //  Add Notes
  //item: Bridge2
  addNotes(contentEdit: any) {
    this.modalService.open(contentEdit, { ariaLabelledBy: 'modal-basic-title', modalDialogClass: 'modal-dialog-centered order-cards-modal' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

//  Add Notes close


  lead_Type:any;
  getLeadAll(): void {
    this.bridgeService.getLeadTypedata().subscribe(
      (data: any[]) => {
        this.lead_Type = data;

        // console.log(this.source1)

      },
      (err) => {
        console.log(err);
        this.error = err;
      }
    );
  }
  CreateLeadstoBp(id: number) {
    this.bridgeService.setLeadID(id);
    this.route.navigate(['/customer/add-customer']);
  }
  files: any[] = [];
  Attachid: number = 0;
  deleteAttach(confirmModal2:any,id: number) {
    this.modalService
    .open(confirmModal2, { ariaLabelledBy: 'modal-basic-title',backdrop: 'static', modalDialogClass: 'confirm-modal modal-dialog-centered' })
    .result.then(
      (result) => {
        this.closeResult = `Closed with: ${result}`;
      },
      (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      }
    );
    this.Attachid = id;
  }

   deleteattachment(id: any) {
      this.bridgeService.deleteattach(id, this.idd).subscribe((data: any) => {

        if (Object(data)['status'] == "200") {

          this.modalService.dismissAll();
          this.ngOnInit();
        }
        else {
          this._NotifierService.showError(Object(data)['message']);
        }
      });

  }

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


  prepareFilesList(files: Array<any>) {

    let attachmentUserID = Number(this.UserId);


    this.bridgeService.leadAttach(this.idd, attachmentUserID, this.HeadingServices.getrevDate(), this.HeadingServices.getTime(), files).subscribe((data: any) => {
      if (Object(data)['status'] == "200") {

        this._NotifierService.showSuccess('Added Attachment Successfully !');
        this.ngOnInit();

      }
      else {
        this._NotifierService.showError(Object(data)['message']);
      }
    });

    // this.uploadFilesSimulator(0);
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
