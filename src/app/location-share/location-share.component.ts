import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { LatLang, OverLayOption, MarkerOption, Shape, Marker, Circle } from 'ngx-google-map-helper';
// import { throwError } from 'rxjs';
import { Location } from '@angular/common';
// import { map, catchError } from 'rxjs/operators';
// import { MAP } from '../modules/model/customer';
import { BridgeService } from '../modules/service/bridge.service';
import { Router } from '@angular/router';
declare var $: any;
@Component({
  selector: 'app-location-share',
  templateUrl: './location-share.component.html',
  styleUrls: ['./location-share.component.scss']
})
export class LocationShareComponent implements OnInit {
  UserName: any = sessionStorage.getItem('UserName');
  UserId: any = sessionStorage.getItem('UserId');
  role: any;
  SalesEmployeeCode: any;
  center: LatLang = {lat: 7.8731, lng: 80.7718};
  locationlatitude: any;
  locationlongitude: any;
  dateObj = new Date();
  time = this.dateObj.toLocaleTimeString();
  month2 = this.dateObj.getMonth() + 1;
  month = (this.month2 < 10 ? '0' : '') + this.month2;
  day = (this.dateObj.getDate() < 10 ? '0' : '') + this.dateObj.getDate();
  year = this.dateObj.getUTCFullYear();
  newdate = this.year + '-' + this.month + '-' + this.day;
  constructor(private http: HttpClient, public router:Router, private _bridgeService: BridgeService,private _location: Location) {

  }
 // google maps zoom level
 zoom: number = 15;

 // initial center position for the map
 lat1: number = 28.6209685;
 lng1: number = 77.3875282;

 clickedMarker(label: string, index: number) {
  // console.log(`clicked the marker: ${label || index}`)
 }

 markers:any[] = [];
  x: any;
  isLoading2: boolean = false;
  getmapAllData: any[] = [];




  ngOnInit() {
    this.allLocation();
    this.UserName = sessionStorage.getItem('UserName');
    this.UserId = sessionStorage.getItem('UserId');
    this.role = sessionStorage.getItem('role');
    this.SalesEmployeeCode = sessionStorage.getItem('SalesEmployeeCode');

    if (this.UserName == undefined) {
      this.router.navigate(['/login']);
    }



  }

  allLocation(){
    this._bridgeService.getAllLocation().subscribe(
      (res:any)=>{
       // console.log(res);

        for(var i=0;i<res.length;i++){

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

      }
    )
  }


  backClicked() {
    this._location.back();
  }



}
