
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { BridgeService } from '../modules/service/bridge.service';

@Component({
  selector: 'app-workflowlist',
  templateUrl: './workflowlist.component.html',
  styleUrls: ['./workflowlist.component.scss']
})
export class WorkflowlistComponent implements OnInit{

  isLoading2: boolean = false;
  UserRole: any[] = [];
  error = '';

  constructor(private _location: Location,private bridgeService:BridgeService) { }

  ngOnInit(): void {
    this.getRoles();
  }


  backClicked() {
    this._location.back();
  }

  getRoles() {
    this.isLoading2 = true;
      this.bridgeService.GetWorkflow().subscribe(
        (data: any) => {
          this.isLoading2 = false;
          this.UserRole = data.data;
        },
        (error: any) => {
          this.isLoading2 = false;
          // console.error('Error fetching components', error);
        }
      );
}
}
