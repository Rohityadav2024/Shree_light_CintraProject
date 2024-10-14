import { Component, OnInit } from '@angular/core';
import { BridgeService } from '../modules/service/bridge.service';
import { Location } from '@angular/common';
import { NotiferService } from '../modules/service/helpers/notifer.service';
import { Router } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-field-management',
  templateUrl: './field-management.component.html',
  styleUrls: ['./field-management.component.scss']
})
export class FieldManagementComponent implements OnInit {

  Module: any[] = [];
  UserRole: any[] = [];
  isanythingEdit:boolean = false;
  isLoading:boolean = false;
  openId: number | null = null; // Stores the index of the currently open module

  constructor(private bridgeService: BridgeService,private _location: Location,
    private _NotifierService: NotiferService,private route: Router,private modalService: NgbModal,) {}

  ngOnInit(): void {
    this.getModuleData();
    this.getRoles();
  }

  backClicked() {
    this._location.back();
  }

  // Fetch modules and subfields from the API
  getModuleData(): void {
    this.isLoading = true;
    this.bridgeService.getFiledManagment().subscribe(
      (res: any) => {
        this.Module = res.data;
        this.isLoading = false;
      },
      (error: any) => {
        this.isLoading = false;
        console.error('Error fetching module data', error);
      }
    );
  }

  // Toggle visibility of subfields for the selected module
  toggleSubfields(index: number): void {
    this.openId = this.openId === index ? null : index;
    this.SaveAction(this.oldsubfld,this.isEditIndex);
  }

  // Handle actions like edit, delete, etc.
  isEditIndex:any = -1;
  oldsubnamevalu:any = '';
  oldsubfld:any = {label:'0'};
  handleAction(subfield: any,index:any): void {
    this.oldsubnamevalu = subfield.label;
    this.oldsubfld = subfield;
    // alert(this.oldsubnamevalu);
    this.isEditIndex = index;
    this.isanythingEdit = true;
    // Implement your action logic here (e.g., edit, delete)
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

  SaveAction(subfield: any,index:any): void {
    if(subfield.label.trim() == ''){
      this._NotifierService.showError('do not set the blank value it replaced with old value');
    subfield.label = this.oldsubnamevalu;
    }
    // alert(this.isEditIndex);
    // this.subfield.label= this.subfield.label.trim();
    this.isEditIndex = -1;
    // Implement your action logic here (e.g., edit, delete)
  }

  ngOnDestroy(): void {
    if(this.isanythingEdit){
    if (confirm('Are you want to Save Changes ?')) {
      this.SaveChange();
    }
  }
  }


  getRoles() {
      this.bridgeService.GetWorkflow().subscribe(
        (data: any) => {
          this.UserRole = data.data;
        },
        (error: any) => {
          // console.error('Error fetching components', error);
        }
      );
}

  SaveChange(){
    this.isLoading = true;
    this.bridgeService.SaveFiledManagment(this.Module).subscribe(
      (res: any) => {
        this.modalService.dismissAll();
        if (Object(res)['status'] == "200") {
          this.isLoading = false;
          this._NotifierService.showSuccess('Save Changes Successfully !');
          this.route.navigate(['/login']);
          this.getModuleData();
          this.SaveAction(this.oldsubfld,this.isEditIndex);
          this.isanythingEdit = false;
        }
        else {
          this._NotifierService.showError(Object(res)['message']);
          this.isLoading = false;
        }
      },
      (err: { message: any; }) => {
        this.isLoading = false;
        const delim = ':';
        const name = err.message;
        const result = name.split(delim).slice(3).join(delim);
        this._NotifierService.showError(result);
      }
    );

  }
}

