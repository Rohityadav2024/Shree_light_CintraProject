import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { LatLang, OverLayOption, MarkerOption, Shape, Marker, Circle } from 'ngx-google-map-helper';
// import { throwError } from 'rxjs';
import { Location } from '@angular/common';
// import { map, catchError } from 'rxjs/operators';
// import { MAP } from '../modules/model/customer';
import { BridgeService } from '../modules/service/bridge.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Bridge } from '../bridge';
declare var $: any;
@Component({
  selector: 'app-single-location-map',
  templateUrl: './single-location-map.component.html',
  styleUrls: ['./single-location-map.component.scss']
})
export class SingleLocationMapComponent implements OnInit {
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
  constructor(private router2: ActivatedRoute,private http: HttpClient, public router:Router, private _bridgeService: BridgeService,private _location: Location) {

  }
 // google maps zoom level
 zoom: number = 15;

   // initial center position for the map
   lat1: number = 20.5937;
   lng1: number = 78.9629;

 clickedMarker(label: string, index: number) {
   //console.log(`clicked the marker: ${label || index}`)
 }

 markers:any[] = [];
  x: any;
  isLoading2: boolean = false;
  getmapAllData: any[] = [];
  empidd:any = '';



  searchValue:any = this.newdate;

  ngOnInit() {
    this.UserName = sessionStorage.getItem('UserName');
    this.UserId = sessionStorage.getItem('UserId');
    this.role = sessionStorage.getItem('role');
    this.SalesEmployeeCode = sessionStorage.getItem('SalesEmployeeCode');

    if (this.UserName == undefined) {
      this.router.navigate(['/login']);
    }
    this.empidd = this.router2.snapshot.params.id;


    this.allLocation(this.searchValue);
    this.getlead();
  }

  changeDate(){
    this.allLocation(this.searchValue);

  }
  Bridge2: Bridge[] = [];
  getlead(): void {
    this.isLoading2 = true;
    this._bridgeService.getoneemployee(this.empidd).subscribe(
      (data: Bridge[]) => {
        this.isLoading2 = false;
        this.Bridge2 = data;

      },
      (err) => {
        this.isLoading2 = false;
        console.log(err);

      }
    );
  }

  allLocation(date:any){
    this._bridgeService.getonelocationall(this.empidd,date).subscribe(
      (res:any)=>{
      //   this.markers = [
      //     {
      //         "lat1": 28.62103994007094,
      //         "lng1": 77.38756271086389,
      //         "label": "",
      //         "Address": "Sector 63, Noida, India, 201301 ",
      //         "Emp_Name": "admin",
      //         "draggable": false,
      //         "iconUrl": "assets/img/location-icon.png"
      //     },
      //     {
      //         "lat1": 28.6282231,
      //         "lng1": 77.389849,
      //         "label": "",
      //         "Address": "224, C Block Road C Block, Chhijarsi, Sector 63, Noida, Uttar Pradesh 201301, India",
      //         "Emp_Name": "admin",
      //         "draggable": false,
      //         "iconUrl": "assets/img/location-icon.png"
      //     },
      //     {
      //         "lat1": 33.6844,
      //         "lng1": 73.0479,
      //         "label": "",
      //         "Address": "224, C Block Road C Block, Chhijarsi, Sector 63, Noida, Uttar Pradesh 201301, India",
      //         "Emp_Name": "admin",
      //         "draggable": false,
      //         "iconUrl": "assets/img/location-icon.png"
      //     }

      // ]
      // this.markers = [
      //   {
      //     "lat1": 28.62103994007094,
      //      "lng1": 77.38756271086389,
      //     // 28.62103994007094,
      //     // 77.38756271086389,

      //   },
      //   {
      //     "lat1": 19.0760,
      //     "lng1": 72.8777,
      //     // 19.0760,
      //     // 72.8777
      //   },
      //   {
      //     "lat1": 25.2048,
      //     "lng1": 55.2708,
      //     // 25.2048,
      //     // 55.2708
      //   }
      // ];
      this.markers = [];
        for(var i=0;i<res.length;i++){

          var empArray = {
            lat1: Number(res[i].Lat),
            lng1: Number(res[i].Long),
            label: "",
            Address: res[i].Address,
            Emp_Name: res[i].Emp_Name,
            time: res[i].UpdateTime,
            draggable: false,
            iconUrl: 'assets/img/location-icon.png',
          }
          this.markers.push(empArray);
          this.lat1 = Number(res[i].Lat);
          this.lng1 = Number(res[i].Long);
        }

       // console.log(this.markers)
      }
    )
  }


  backClicked() {
    this._location.back();
  }



}
