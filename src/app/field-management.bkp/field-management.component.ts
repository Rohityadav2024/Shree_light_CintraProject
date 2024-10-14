import { Component, OnInit } from '@angular/core';
import { BridgeService } from '../modules/service/bridge.service';
import { Location } from '@angular/common';
import { NotiferService } from '../modules/service/helpers/notifer.service';
import { Router } from '@angular/router';
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
    private _NotifierService: NotiferService,private route: Router) {}

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
    this.SaveAction(undefined,undefined);
  }

  // Handle actions like edit, delete, etc.
  isEditIndex:any = -1;
  handleAction(subfield: any,index:any): void {
    this.isEditIndex = index;
    this.isanythingEdit = true;
    // Implement your action logic here (e.g., edit, delete)
  }

  SaveAction(subfield: any,index:any): void {
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
        if (Object(res)['status'] == "200") {
          this.isLoading = false;
          this._NotifierService.showSuccess('Save Changes Successfully !');
          this.route.navigate(['/login']);
          this.getModuleData();
          this.SaveAction(undefined,undefined);
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

