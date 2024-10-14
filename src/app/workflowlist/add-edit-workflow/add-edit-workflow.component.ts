import { Component, ElementRef, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { BridgeService } from 'src/app/modules/service/bridge.service';
import { ActivatedRoute } from '@angular/router';
import { NgFor } from '@angular/common';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { NotiferService } from 'src/app/modules/service/helpers/notifer.service';

@Component({
  selector: 'app-add-edit-workflow',
  templateUrl: './add-edit-workflow.component.html',
  styleUrls: ['./add-edit-workflow.component.scss']
})
export class AddEditWorkflowComponent implements OnInit {


  AllDesignations: any[] = [];
  filteredArray: any[] = [];
  isEdit:boolean = false;
Payload:any = {
  "workflow_title": "",
  "created_by": sessionStorage.getItem('UserName'),
  "designations": []
}
  DesignationId:any[] = [];
  public addresses: any[] = [
    {
      role_type: '',
      discounts: '',
      doctotal: '',
  }
];
  userName = sessionStorage.getItem('UserName');
    Idd:any;
    constructor(private bridgeService: BridgeService, private _ActivatedRoute: ActivatedRoute,private _location: Location, private route: Router, private _NotifierService: NotiferService) { }


    backClicked() {
      this._location.back();
    }
    ngOnInit(): void {

      if(this._ActivatedRoute.snapshot.params['id'] != 0){
        this.isEdit = true;
        this.SetWorkflow();
      }
      else{
        this.isEdit = false;
      }
      this.getDesignations();
    }

    addAddress(index:any) {
      this.addresses.splice(index+1, 0, {
          role_type: '',
        })
        this.changevalue();
      // this.addresses.push();
    }

    SetWorkflow(){
      this.bridgeService.OneWorkFlow(this._ActivatedRoute.snapshot.params['id']).subscribe(
        (res: any) => {
          if (Object(res)['status'] == "200") {
            this.Payload = res.data;
            this.addresses = [];
            for(let i = 0 ;i<this.Payload.designations.length;i++){
              this.addresses.push({
                "role_type": this.Payload.designations[i].designation.split(','),
                "discounts": this.Payload.designations[i].discounts,
                "doctotal": this.Payload.designations[i].doctotal
            },);
              }
              this.changevalue();
            // this.filteredArray = res.data;
          }
          else {
            this._NotifierService.showError(Object(res)['message']);
          }
        },
        (err) => {
          const delim = ":"
          const name = err.message
          const result = name.split(delim).slice(3).join(delim)
          console.log(result);
        }
      );
    }

  removeAddress(i: number) {
    if(this.addresses.length >= 2){
    this.addresses.splice(i, 1);
    this.changevalue();
    }
    else{
      this._NotifierService.showError('Atleast one Role is Mandatory');
    }
  }

    changevalue(){
      // var roleTypesToRemove = this.addresses.flatMap((item: { role_type: any; }) => item.role_type);
      // this.filteredArray = this.AllDesignations.filter(item => !roleTypesToRemove.includes(item.DropDownValue));
    }
    getDesignations() {
      this.bridgeService.GetRoles().subscribe(
        (res: any) => {
          if (Object(res)['status'] == "200") {
            this.AllDesignations = res.data;
            this.filteredArray = res.data;
          }
          else {
            this._NotifierService.showError(Object(res)['message']);
          }
        },
        (err) => {
          const delim = ":"
          const name = err.message
          const result = name.split(delim).slice(3).join(delim)
          console.log(result);
        }
      );
    }

    Save(){
      if(this.Payload.workflow_title.trim() != ''){
      this.Payload.designations = [];
      var k = 1;
      for(let i = 0 ;i<this.addresses.length;i++){
        if(this.addresses[i].role_type == '' && this.addresses[i].role_type.length == 0){
          this.addresses.slice(i,1);
        }
        else{
      this.Payload.designations.push({
        "approval_level": k,
        "designation": this.addresses[i].role_type.join(','),
        "discounts":this.addresses[i].discounts,
        "doctotal":this.addresses[i].doctotal,
    });
          k++;
  }
      }
      if(this.Payload.designations.length != 0){
      this.bridgeService.AddWorkFlow(this.Payload,this.isEdit).subscribe(
        (res: any) => {
          if (Object(res)['status'] == "200") {
            this._NotifierService.showSuccess(this.isEdit?'Update Workflow Successfully':'Add Workflow Successfully');
            this.route.navigate(['/workflow']);
          }
          else {
            this._NotifierService.showError(Object(res)['message']);
          }
        },
        (err) => {
          const delim = ":"
          const name = err.message
          const result = name.split(delim).slice(3).join(delim)
          console.log(result);
        }
      );
    }
    else{
      this._NotifierService.showError('Please Select Alteast one Role');
    }
    }
    else{
      this._NotifierService.showError('Please Enter Title');
    }
    }

  }
