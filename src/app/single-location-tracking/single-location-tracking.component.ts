import { Component, OnInit,ElementRef, HostListener, ViewChild, NgZone   } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbAccordionConfig,ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Bridge } from '../bridge';
import { BridgeService } from '../modules/service/bridge.service';
import { Location } from '@angular/common';
import { MAP } from '../modules/model/customer';
import { MapsAPILoader } from '@agm/core';
import { NgForm } from '@angular/forms';
declare var $: any;
declare var google: any;

@Component({
  selector: 'app-single-location-tracking',
  templateUrl: './single-location-tracking.component.html',
  styleUrls: ['./single-location-tracking.component.scss'],
  providers: [NgbAccordionConfig], // add the NgbAccordionConfig to the component providers
})
export class SingleLocationTrackingComponent implements OnInit {
  p: number = 1;
  pagelimit: any = 10;
  startind = ((this.p - 1) * this.pagelimit) + 1;
  endind = ((this.p - 1) * this.pagelimit) + this.pagelimit;
  disabled = false;
  UserName: any = sessionStorage.getItem('UserName');
  UserId: any = sessionStorage.getItem('UserId');
  role: any;
  searchValue: any[] = [];
  fromdatefilter:any;
  todatefilter:any;
  SalesEmployeeCode: any;
  closeResult = '';


  locationlatitude: any;
  locationlongitude: any;
  dateObj = new Date();
  time = this.dateObj.toLocaleTimeString();
  month2 = this.dateObj.getMonth() + 1;
  month = (this.month2 < 10 ? '0' : '') + this.month2;
  day = (this.dateObj.getDate() < 10 ? '0' : '') + this.dateObj.getDate();
  year = this.dateObj.getUTCFullYear();
  newdate = this.year + '-' + this.month + '-' + this.day;
  empidd:any;
  mapall: any[] = [];
  locationTrack: any[] = [];
  mapp: MAP = {

    Lat: '',
    Long: '',
    Address: '',
    Emp_Id: this.UserId,
    Emp_Name: this.UserName,
    UpdateDate: this.newdate,
    UpdateTime: this.time,
    type: '',
    shape: 'meeting',
    remark:''

  };

  TypesManage:any='';
  TypesManageReverse:any='';

  Bridge2: Bridge[] = [];
  isLoading2:boolean=false;
   // google maps zoom level
 zoom: number = 15;

 // initial center position for the map
 lat1: number = 20.5937;
   lng1: number = 78.9629;

   clickedMarker(label: string, index: number) {
    // console.log(`clicked the marker: ${label || index}`)
   }

   markers:any[] = [];
   paginationOption:any;
  constructor( private modalService: NgbModal,  private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,config: NgbAccordionConfig, private _location: Location, private bridgeService: BridgeService, private _elementRef: ElementRef, private route: Router, private router: ActivatedRoute,) {
  	config.closeOthers = true;
    router.params.subscribe(params => {
      this.ngOnInit();
      // this.setupComponent(params['Mylocationlocation/one/']);
    })
  }

  // setupComponent(someParam:any) {
  //   // this.setupMessage = 'set up at ' + new Date();
  //   // this.someParameterValue = someParam;
  //   this.ngOnInit();
  // }

  ngOnInit(): void {
    this.UserName = sessionStorage.getItem('UserName');
    this.role = sessionStorage.getItem('role');
    this.UserId=sessionStorage.getItem('UserId');
    this.paginationOption=this.bridgeService.paginationOption
    if (this.UserName == undefined) {
      this.route.navigate(['/login']);
    }
    this.empidd = this.router.snapshot.params.id;

    this.getlead();
    this.getlocation('');
  }


  open(content: any,table:MAP) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', modalDialogClass: 'modal-dialog-centered order-cards-modal' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  // console.log(table)

   this.markers = [{
    lat1: table.Lat,
    lng1: table.Long,
    label: "",
    Address: table.Address,
    draggable: false,
    iconUrl: 'assets/img/location-icon.png',
}];


this.lat1 = Number(table.Lat);
this.lng1 = Number(table.Long);
  }

  open1(content: any) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', modalDialogClass: 'modal-dialog-centered order-cards-modal' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
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

  backClicked() {
    this._location.back();
  }

  @ViewChild('search')
  public searchElementRef!: ElementRef;
  lat: any;
  lng: any;
  getAddress: any;


  clearFilter(event: any) {
    this.pagelimit = Number(event.target.value);
    this.p = 1;
    this.startind = ((this.p - 1) * this.pagelimit) + 1;
    this.endind = ((this.p - 1) * this.pagelimit) + this.pagelimit;
    if (this.endind > this.locationTrack.length) {
      this.endind = this.locationTrack.length;
    }
  }
  pageChanged(event: any) {
    this.p = event;
    this.startind = ((this.p - 1) * this.pagelimit) + 1;
    this.endind = ((this.p - 1) * this.pagelimit) + this.pagelimit;
    this.bridgeService.paginationData(event);
    if (this.endind > this.locationTrack.length) {
      this.endind = this.locationTrack.length;
    }
  }
  getlocation(date:any): void {
    this.isLoading2 = true;
    this.bridgeService.getonelocation(this.empidd,date).subscribe(
      (data: any[]) => {
        this.isLoading2 = false;
        this.locationTrack = data;
        if(!!data[0]){
          this.TypesManage = data[0].type;
          this.ReverseType(this.TypesManage);
        }

      },
      (err) => {
        this.isLoading2 = false;
        console.log(err);

      }
    );
  }

  goDataPage(){
    this.route.navigate(['/locationMap/one/'+this.empidd]);
  }

  ReverseType(TypesManage:any){
    if( this.TypesManage == 'Start'){
      this.TypesManageReverse = 'Stop';
    }
    else{
      this.TypesManageReverse = 'Start';
    }

  }

  getlead(): void {
    this.isLoading2 = true;
    this.bridgeService.getoneemployee(this.empidd).subscribe(
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



  openDetails(id:any){
  //  console.log('id',id);
    $('.checkAlllocation'+id).toggle();
  }

  Remarks:any = '';
  addLocationRemark(f:NgForm){
    f = this.bridgeService.GlobaleTrimFunc(f);
    if(f.valid){
      this.shareLocation();
      this.modalService.dismissAll();
      this.mapp.remark = this.Remarks;
      this.Remarks = '';
    }
  }

  shareLocation(){
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {

        this.mapp.Lat = String(position.coords.latitude);
        this.mapp.Long = String(position.coords.longitude);

        this.mapsAPILoader.load().then(() => {
          let geocoder = new google.maps.Geocoder;
          let latlng = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
          };
          geocoder.geocode({
              'location': latlng
          }, (results: { formatted_address: any; }[]) => {
              if (results[0]) {
                this.mapp.Address = results[0].formatted_address;

        if( this.TypesManage == 'Start'){
          this.mapp.type = 'Stop';
        }
        else{
          this.mapp.type = 'Start';
        }

        this.dateObj = new Date();
        this.time = this.dateObj.toLocaleTimeString();
        this.mapp.UpdateTime = this.time,

              this.bridgeService.pushMap(this.mapp).subscribe(
                (res: MAP) => {
                  if (Object(res)['status'] == "200") {
                    this.mapp.UpdateTime = '',
                    $('.success-box').show();
                    setTimeout(() => {
                      $('.success-box').fadeOut(1000);
                      this.ngOnInit();
                    }, 2000);
                  }
                  else {
                    alert(Object(res)['message']);
                  }
                },
                (err) => {
                  const delim = ':';
                  const name = err.message;
                  const result = name.split(delim).slice(3).join(delim);
                  alert(result);
                }
              );

              } else {
                  console.log('Not found');
              }
          });
      });


      setTimeout(() => {
        this.ngOnInit();
      }, 2000);
      });

    } else {
      console.log("Geolocation is not supported by this browser.");
    }


  }


  filterlocation:any=['',''];
  searchfilter(event:any){
    var val1=event.target.value
    this.filterlocation[0] = val1;

  }
  datefilter(event:any){
    var val=event.target.value
    this.filterlocation[1] = val;


  }

  openNav() {
    (<HTMLInputElement>document.getElementById("mySidepanel")).style.width = "400px";
    $('#mySidepanel').addClass('sidepanel2');
    $('#mySidepanel').removeClass('mySidepanelGo');
    $('.sidepanel').show();
  }

  /* Set the width of the sidebar to 0 (hide it) */
  closeNav() {
    (<HTMLInputElement>document.getElementById("mySidepanel")).style.width = "400px";
    $('#mySidepanel').removeClass('sidepanel2');
    $('#mySidepanel').addClass('mySidepanelGo');
  }
  apply() {
    $('.sidepanel').hide();

    this.searchValue = [this.fromdatefilter, this.todatefilter];
  }

  resetfilter() {
    $('.sidepanel').hide();
    this.searchValue = [];
    this.fromdatefilter = '';
    this.todatefilter = '';
  }

}
