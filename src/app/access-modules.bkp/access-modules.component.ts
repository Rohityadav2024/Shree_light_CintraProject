import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { BridgeService } from '../modules/service/bridge.service';

@Component({
  selector: 'app-access-modules',
  templateUrl: './access-modules.component.html',
  styleUrls: ['./access-modules.component.scss']
})
export class AccessModulesComponent implements OnInit {
  isLoading2: boolean = false;
  UserRole: any;
  error = '';

  constructor(private _location: Location,private bridgeService:BridgeService) { }

  ngOnInit(): void {
    this.getRoles();
  }


  backClicked() {
    this._location.back();
  }

  getRoles() {
      this.bridgeService.GetRoles().subscribe(
        (data: any) => {
          this.UserRole = data.data;
          console.log('Role',this.UserRole)
        },
        (error: any) => {
          console.error('Error fetching components', error);
        }
      );
}
}
