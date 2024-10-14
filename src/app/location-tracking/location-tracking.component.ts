import { Component, OnInit,ViewChild  } from '@angular/core';
import { Location } from '@angular/common';
import { BridgeService } from '../modules/service/bridge.service';
import { Bridge, } from '../bridge';
import { ActivatedRoute, Router } from '@angular/router';
declare var $: any;
@Component({
  selector: 'app-location-tracking',
  templateUrl: './location-tracking.component.html',
  styleUrls: ['./location-tracking.component.scss']
})
export class LocationTrackingComponent implements OnInit {
  isLoading2: boolean = false;
  searchValue:any = '';
  pagination: any = {
    PageNo: 1,
    maxItem: '10',
    PageShow:10
  }
  startind = 1;
  endind = 1;
  totalCount:any = 120;
  location: any = {
    isList: false,
    locationTracking: [],
    showTypekey: 'isList'
  }
  markers: any[] = [];
  zoom: number = 15;
  lat1: number = 20.5937;
  lng1: number = 78.9629;
  constructor(public _BridgeService: BridgeService, private _Router: Router, private _ActivatedRoute: ActivatedRoute) {
    this._ActivatedRoute.queryParams.subscribe(($params: any) => {
      let key = this._BridgeService.decoderData(Object.keys($params));
      this.location.showTypekey = key;
      let val = this._BridgeService.decoderData(Object.values($params));
      switch (key) {
        case 'isList': this.location.isList = val == 'true' ? true : false; break;
        // case 'location': this.location.isList = val; break;
        // case 'view': this.location.isList = val; break;
      }
    })
  }
  ngOnInit(): void {
    this.getEmployeeList();
    // this.allLocation();
  }
  getEmployeeList(): void {
    this._BridgeService.getAll().subscribe(($employees: any) => {
      this.location.locationTracking = $employees;
    })
  }
  allLocation() {
    this._BridgeService.getAllLocation().subscribe((res: any) => {
      for (var i = 0; i < res.length; i++) {

        var empArray = {
          lat1: res[i].Lat,
          lng1: res[i].Long,
          label: "",
          Address: res[i].Address,
          Emp_Name: res[i].Emp_Name,
          draggable: false,
          iconUrl: 'assets/img/location-icon.png',
        }
        this.markers.push(empArray);
      }
    })
  }
  querysParam(key: any, value: any) {
    this._Router.navigate([], {
      queryParams: { [this._BridgeService.encoderData(key)]: this._BridgeService.encoderData(value) }
    })
  }


}
