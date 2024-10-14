
import { Component, ElementRef, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { BridgeService } from 'src/app/modules/service/bridge.service';
import { ActivatedRoute } from '@angular/router';
import { NgFor } from '@angular/common';
import { Location } from '@angular/common';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
//import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NotiferService } from 'src/app/modules/service/helpers/notifer.service';

@Component({
  selector: 'app-access-modules-list',
  templateUrl: './access-modules-list.component.html',
  styleUrls: ['./access-modules-list.component.scss']
})
export class AccessModulesListComponent implements OnInit {
  isLoading: boolean = false;
  Module: any[] = [];
  UserRole: any = [];
  role_id: number | null = null;
  payloadModule: any[] = [];
  role_name: any[] = [];
  localStorageData: any[] = [];
  dropdownStates: boolean[] = [];

  constructor(
    private bridgeService: BridgeService,
    private _ActivatedRoute: ActivatedRoute,
    private _location: Location,
    private modalService: NgbModal,
    private route: Router,
    private _NotifierService: NotiferService,
   // private dialog: MatDialog
  ) { }

  isShow = false;
  openId = -1;

  ngOnInit(): void {
    this._ActivatedRoute.params.subscribe(params => {
      const id = params['id'];
      this.getRoles(id);
    });
    this.GetAllModule();
  }

  showhid(index: number): void {
    if (this.openId === index) {
      this.isShow = false;
      this.openId = -1;
    } else {
      this.isShow = true;
      this.openId = index;
    }
  }

  backClicked() {
    this._location.back();
  }

  getRoles(routeId: any) {
    this.bridgeService.GetRoles().subscribe(
      (data: any) => {
        this.UserRole = data.data;
        const matchedRole = this.UserRole.find((role: any) => role.id == routeId);
        if (matchedRole) {
          this.role_name = matchedRole.Name;
        } else {
          console.log('No matching role found.');
        }
      },
      (error: any) => {
        console.error('Error fetching roles', error);
      }
    );
  }

  GetAllModule(): void {
    this.isLoading = true;
    this.bridgeService.getAccessManagementRole(this._ActivatedRoute.snapshot.params.id).subscribe(
      (accessRes: any) => {
        this.isLoading = false;
        this.Module = accessRes.data.map((module: { is_add: boolean; is_view: boolean; is_edit: boolean; data: any[] }) => {
          const allViewTrue = module.data.every((item: { view: boolean }) => item.view === true);
          const allEditTrue = module.data.every((item: { edit: boolean }) => item.edit === true);

          return {
            ...module,
            is_add: module.is_add === true,
            is_view: module.is_view === true,
            is_edit: module.is_edit === true,
            data: module.data.map((item: { edit: boolean; view: boolean; add: boolean }) => ({
              ...item,
              edit: item.edit === true,
              view: item.view === true,
              add: item.add === true,
              isDisabled: false
            })),
            selectAllView: allViewTrue,
            selectAllEdit: allEditTrue
          };
        });

        this.isLoading = false;
        // console.log('Module data from getAccessManagementRole API', this.Module);
      },
      (error: any) => {

        this.isLoading = false;
        console.error('Error fetching access management role data', error);
      }
    );
  }


  toggleAll(module: any, checked: boolean, type: string) {
    const updatedData = module.data.map((item: any) => {
      const newItem = {
        ...item,
        [type]: checked,
        isDisabled: type === 'view' && !checked  // Disable all if "view" is unchecked
      };

      // If 'view' is unchecked, uncheck and disable 'edit'
      if (type === 'view' && !checked) {
        newItem.edit = false; // Uncheck 'edit'
        newItem.isEditDisabled = true; // Disable 'edit'
      } else if (type === 'view' && checked) {
        newItem.isEditDisabled = false; // Enable 'edit' when 'view' is checked
      }

      return newItem;
    });

    const moduleIndex = this.Module.findIndex(m => m.module_id === module.module_id);
    if (moduleIndex >= 0) {
      this.Module[moduleIndex] = {
        ...this.Module[moduleIndex],
        data: updatedData,
        selectAllView: type === 'view' ? checked : module.selectAllView,
        selectAllEdit: type === 'edit' ? checked : !checked ? false : module.selectAllEdit, // Uncheck 'selectAllEdit' if 'view' is unchecked
        isSelectAllEditDisabled: type === 'view' && !checked  // Disable 'selectAllEdit' if 'view' is unchecked
      };
    }
    console.log(this.Module);
  }

  updateChildItem(
    module: any,
    checked: boolean,
    type: string,
    childItem: any,
    parentIndex: number,
    childIndex: number
  ) {
    const updatedData = module.data.map((item: { view?: boolean, edit?: boolean, add?: boolean, isDisabled?: boolean }, itemIndex: number) => ({
      ...item,
      // Only update the specific 'edit' checkbox for the corresponding child item
      edit: type === 'edit' && childIndex === itemIndex ? checked
           : (type === 'view' && !checked && childIndex === itemIndex) ? false : item.edit || false,

      // Uncheck 'add' and disable only for that specific child if 'view' is unchecked
      add: type === 'view' && !checked && childIndex === itemIndex ? false : item.add || false,

      // Update 'view' checkbox for the specific child
      view: type === 'view' && childIndex === itemIndex ? checked : item.view || false,

      // Disable only the affected item when 'view' is unchecked
      isDisabled: type === 'view' && childIndex === itemIndex && !checked ? true : item.isDisabled || false
    }));

    // Check if all items in the module's data have 'view' and 'edit' as true
    const allViewChecked = updatedData.every((item: { view?: boolean }) => item.view === true);
    const allEditChecked = updatedData.every((item: { edit?: boolean }) => item.edit === true);

    // Find the index of the module in the main Module array and update it
    const moduleIndex = this.Module.findIndex(m => m.module_id === module.module_id);
    if (moduleIndex >= 0) {
      this.Module[moduleIndex] = {
        ...this.Module[moduleIndex],
        data: updatedData,
        selectAllView: allViewChecked,
        selectAllEdit: allEditChecked
      };
    }

    console.log(this.Module);
  }



  moduleUpdator(module: any, checked: boolean, type: string,childIndex:any,itemIndex:any,) {
    const moduleIndex = this.Module.findIndex(m => m.module_id === module.module_id);
    const updatedModule = {
      module_id: module.module_id,
      is_view: type === 'view' ? checked : module.is_view,
      is_edit: type === 'edit' ? checked : (type === 'view' && !checked) ? false : module.is_edit,
      is_add: type === 'add' ? checked : (type === 'view' && !checked) ? false : module.is_add,

      // data: module.data.map((item: { edit: boolean, view: boolean, add: boolean, isDisabled?: boolean }) => ({
      //   ...item,
      //   edit: type === 'edit' && childIndex === itemIndex ? checked : (type === 'view' && !checked) ? false : item.edit || false,
      //   add: type === 'view' && !checked ? false : item.add || false,
      //   view: type === 'view' && childIndex === itemIndex ? checked : item.view || false,
      //   isDisabled: type === 'view' && !checked  // Disable the sub-module if "view" is unchecked
      // }))

    };

    if (moduleIndex >= 0) {
      this.Module[moduleIndex] = {
        ...this.Module[moduleIndex],
        is_view: updatedModule.is_view,
        is_edit: updatedModule.is_edit,
        is_add: updatedModule.is_add,
        // data: updatedModule.data
      };
    } else {
      this.Module.push(updatedModule);
    }
    console.log(this.Module);
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



  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  saveSettings() {
    this._ActivatedRoute.params.subscribe(params => {
      const id = params['id'];
      if (!id) {
        alert('Role ID is not available');
        return;
      }

      this.isLoading = true;

      const payload = {
        role_id: id,
        modules_name: this.Module
      };
//my code 2:23


      this.bridgeService.ViewAddEdit(payload).subscribe(
        (res: any) => {
          this.modalService.dismissAll();
          this.isLoading = false;
          if (res.status === 200) {
            if (id === "1") {
              this.route.navigate(['/login']);
            } else {
              this.route.navigate(['/access-modules']);
              this._NotifierService.showSuccess("Modules Saved");
            }
          } else {
            alert(res.message);
          }
        },
        (error: any) => {
          this.isLoading = false;
          console.error('Error saving settings', error);
        }
      );
    });
  }
}
