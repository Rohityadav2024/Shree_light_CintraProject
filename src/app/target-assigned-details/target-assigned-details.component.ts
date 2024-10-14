import { Component, OnInit,HostListener } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { BridgeService } from '../modules/service/bridge.service';
import { Location } from '@angular/common';
import { NgForm } from '@angular/forms';
import { Bridge } from '../bridge';
import { TargeYear, TargeEmployeGet, TargeQuoter } from '../login';
import { HeadingServicesService } from '../modules/service/heading-services.service';

declare var $: any;

@Component({
  selector: 'app-target-assigned-details',
  templateUrl: './target-assigned-details.component.html',
  styleUrls: ['./target-assigned-details.component.css']
})
export class TargetAssignedDetailsComponent implements OnInit {

  dateObj = new Date();
  time = this.dateObj.toLocaleTimeString();
  month2 = this.dateObj.getMonth() + 1;
  month = (this.month2 < 10 ? '0' : '') + this.month2;
  day = (this.dateObj.getDate() < 10 ? '0' : '') + this.dateObj.getDate();
  year = this.dateObj.getUTCFullYear();
  months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  newdate = this.day + "-" + this.month + "-" + this.year;
  isLoading: boolean = false;
  closeResult = '';
  UserName: any;
  error = '';
  success = '';
  isLoading2: boolean = false;
  searchValue!: string;
  TargeYear: TargeYear[] | any[] = [];
  addTarget: TargeYear = {
    Department: '',
    StartYear: '',
    EndYear: '',
    SalesPersonCode: '',
    reportingTo: '',
    YearTarget: '',
    CreatedDate: this.newdate,
    UpdatedDate: this.newdate,

  };

  TargeEmployeGets: TargeYear[] = [];
  TargeEmployeGet: TargeEmployeGet = {
    StartYear: '',
    EndYear: '',
    Department: '',
    reportingTo: '',
  }
  targetGet: TargeQuoter[] = [];

  bridges: Bridge[] = [];
  idd: any;
  addTar: TargeQuoter = {
    id: '',
    SalesPersonCode: '',
    reportingTo: '',
    YearTarget: 0,
    q1: 0,
    q2: 0,
    q3: 0,
    q4: 0,
    CreatedDate: this.newdate,
    UpdatedDate: this.newdate,
    monthly: [
      {
        "amount": 0,
        "monthYear": "2022-04",
        "qtr": 1,
        "CreatedDate": this.newdate,
        "YearTarget": '',
        "id": '',
      },
      {
        "amount": 0,
        "monthYear": "2022-05",
        "qtr": 1,
        "CreatedDate": this.newdate,
        "YearTarget": '',
        "id": '',
      },
      {
        "amount": 0,
        "monthYear": "2022-06",
        "qtr": 1,
        "CreatedDate": this.newdate,
        "YearTarget": '',
        "id": '',
      },
      {
        "amount": 0,
        "monthYear": "2022-07",
        "qtr": 2,
        "CreatedDate": this.newdate,
        "YearTarget": '',
        "id": '',
      },
      {
        "amount": 0,
        "monthYear": "2022-08",
        "qtr": 2,
        "CreatedDate": this.newdate,
        "YearTarget": '',
        "id": '',
      },
      {
        "amount": 0,
        "monthYear": "2022-09",
        "qtr": 2,
        "CreatedDate": this.newdate,
        "YearTarget": '',
        "id": '',
      },
      {
        "amount": 0,
        "monthYear": "2022-10",
        "qtr": 3,
        "CreatedDate": this.newdate,
        "YearTarget": '',
        "id": '',
      },
      {
        "amount": 0,
        "monthYear": "2022-11",
        "qtr": 3,
        "CreatedDate": this.newdate,
        "YearTarget": '',
        "id": '',
      },
      {
        "amount": 0,
        "monthYear": "2022-12",
        "qtr": 3,
        "CreatedDate": this.newdate,
        "YearTarget": '',
        "id": '',
      },
      {
        "amount": 0,
        "monthYear": "2023-01",
        "qtr": 4,
        "CreatedDate": this.newdate,
        "YearTarget": '',
        "id": '',
      },
      {
        "amount": 0,
        "monthYear": "2023-02",
        "qtr": 4,
        "CreatedDate": this.newdate,
        "YearTarget": '',
        "id": '',
      },
      {
        "amount": 0,
        "monthYear": "2023-03",
        "qtr": 4,
        "CreatedDate": this.newdate,
        "YearTarget": '',
        "id": '',
      }
    ]
  };
  baseUrl2: any;

  newMonth = [
    {
      "amount": 0,
      "monthYear": "2022-04",
      "qtr": 1,
      "CreatedDate": this.newdate,
      "YearTarget": '',
      "id": '',
    },
    {
      "amount": 0,
      "monthYear": "2022-05",
      "qtr": 1,
      "CreatedDate": this.newdate,
      "YearTarget": '',
      "id": '',
    },
    {
      "amount": 0,
      "monthYear": "2022-06",
      "qtr": 1,
      "CreatedDate": this.newdate,
      "YearTarget": '',
      "id": '',
    },
    {
      "amount": 0,
      "monthYear": "2022-07",
      "qtr": 2,
      "CreatedDate": this.newdate,
      "YearTarget": '',
      "id": '',
    },
    {
      "amount": 0,
      "monthYear": "2022-08",
      "qtr": 2,
      "CreatedDate": this.newdate,
      "YearTarget": '',
      "id": '',
    },
    {
      "amount": 0,
      "monthYear": "2022-09",
      "qtr": 2,
      "CreatedDate": this.newdate,
      "YearTarget": '',
      "id": '',
    },
    {
      "amount": 0,
      "monthYear": "2022-10",
      "qtr": 3,
      "CreatedDate": this.newdate,
      "YearTarget": '',
      "id": '',
    },
    {
      "amount": 0,
      "monthYear": "2022-11",
      "qtr": 3,
      "CreatedDate": this.newdate,
      "YearTarget": '',
      "id": '',
    },
    {
      "amount": 0,
      "monthYear": "2022-12",
      "qtr": 3,
      "CreatedDate": this.newdate,
      "YearTarget": '',
      "id": '',
    },
    {
      "amount": 0,
      "monthYear": "2023-01",
      "qtr": 4,
      "CreatedDate": this.newdate,
      "YearTarget": '',
      "id": '',
    },
    {
      "amount": 0,
      "monthYear": "2023-02",
      "qtr": 4,
      "CreatedDate": this.newdate,
      "YearTarget": '',
      "id": '',
    },
    {
      "amount": 0,
      "monthYear": "2023-03",
      "qtr": 4,
      "CreatedDate": this.newdate,
      "YearTarget": '',
      "id": '',
    }
  ]
  reportingTo: any;

  NewSalesEmpCode: any;
  NewreportingTo: any;
  Nid: any = 0;
  targetGes: boolean = false;
  commonObj: any = { isvalid: false, leftAmount: 0, Qua1: 0, Qua2: 0, Qua3: 0, Qua4: 0 };
  Headingss: any[]=[];
  constructor(private modalService: NgbModal, private route: Router, private bridgeService2: BridgeService, private router: ActivatedRoute, private _location: Location,private HeadingServices: HeadingServicesService) { }

  @HostListener("window:beforeunload", ["$event"]) unloadHandler(event: Event) {
    let result = confirm("Please don't reload the page the data will be lost");
    if (result) {
     // console.log('dont refresh page');
    }
    event.returnValue = false;

  }

  ngOnInit(): void {
    this.Headingss = this.HeadingServices.getModule11();
    this.UserName = sessionStorage.getItem('UserName');
    // this.addTar.SalesPersonCode = String(sessionStorage.getItem('SalesEmployeeCode'));
    if (this.NewreportingTo == undefined) {
      this.NewreportingTo = sessionStorage.getItem('reportingTo');
    }
    else {
      this.NewreportingTo = this.NewreportingTo;
    }
    $('#TeamDone').show();

    this.idd = this.router.snapshot.params.id;
    if (this.idd == this.Nid || this.Nid == 0) {
      this.idd = this.idd;
    }
    else {
      this.idd = this.Nid;
    }
    sessionStorage.setItem('ChangesVales', '50');
    if (this.UserName == undefined) {
      this.route.navigate(['/login']);
    }
    $(document).mouseup(function (e: { target: any; }) {
      var popup = $(".hover-show");
      if (!$('.edit-delete').is(e.target) && !popup.is(e.target) && popup.has(e.target).length == 0) {
        popup.hide();
      }
    });

    $(document).ready(function () {
      $('.hover-show').hide()
    });


    this.getTargetData();


  }

  nodata: boolean = false;
  TeamDone: boolean = false;
  getTargetData(): void {
    this.isLoading2 = true;

    this.bridgeService2.getTargetAssignedOne(this.idd).subscribe(
      (data: TargeYear[]) => {
        this.isLoading2 = false;
        this.TargeYear = data;
        this.TargeEmployeGet.Department = this.TargeYear[0].Department;
        this.TargeEmployeGet.StartYear = this.TargeYear[0].StartYear;
        this.TargeEmployeGet.EndYear = this.TargeYear[0].EndYear;
        this.TargeEmployeGet.reportingTo = this.TargeYear[0].SalesPersonCode.SalesEmployeeCode;
        this.NewSalesEmpCode = this.TargeYear[0].SalesPersonCode.SalesEmployeeCode;

        this.getBridge(this.NewSalesEmpCode);
        this.getTargetQuoterData();
        this.bridgeService2.getTargetEmployeeFill(this.TargeEmployeGet).subscribe(
          (data: TargeYear[]) => {

            this.TargeEmployeGets = data;
            if (this.TargeEmployeGets.length == 0) {
              this.TeamDone = true;
              $('#TeamDone').show();
            }
            else {
              this.TeamDone = false;
              $('#TeamDone').hide();
            }

          },
          (err:any) => {
            console.log(err);
            this.error = err;
          }
        );

        if (this.targetGet.length <= 0) {
          this.nodata = true;
        }
        else {
          this.nodata = false;
        }
        // console.log(data);

      },
      (err) => {
        this.isLoading2 = false;
        this.error = err;
      }
    );
  }

  getTargetQuoterData(): void {
    this.isLoading2 = true;
    this.bridgeService2.getTargetQuoterData(this.idd).subscribe((data: TargeQuoter[]) => {
      this.isLoading2 = false;
      this.targetGet = data;
      if(this.targetGet.length != 0){
      this.commonObj.leftAmount = Number(this.TargeYear[0]?.YearTarget) - (this.targetGet[0].q1 + this.targetGet[0].q2 + this.targetGet[0].q3 + this.targetGet[0].q4);
      }
      else{
        this.commonObj.leftAmount = Number(this.TargeYear[0]?.YearTarget)
      }
      if (!!data.length) {

        this.commonObj.Qua1 = this.targetGet[0].q1;
        this.commonObj.Qua2 = this.targetGet[0].q2;
        this.commonObj.Qua3 = this.targetGet[0].q3;
        this.commonObj.Qua4 = this.targetGet[0].q4;
        // this.commonObj.leftAmount = this.targetGet[0].YearTarget.YearTarget-this.commonObj.Qua1-this.commonObj.Qua2-this.commonObj.Qua3-this.commonObj.Qua4
        this.addTar = this.targetGet[0];
        this.addTar.SalesPersonCode = this.targetGet[0]?.SalesPersonCode?.SalesEmployeeCode;
        if (this.targetGet[0].monthly.length == 0) {
          this.targetGet[0].monthly = this.newMonth;
        }
        if (this.targetGet.length <= 0) {
          this.nodata = true;
          this.targetGes = false;
        }
        else {
          this.nodata = false;
          this.targetGes = true;
        }

      }
    },
      (err) => {
        this.isLoading2 = false;
        this.error = err;
      }
    );
  }

  suplier(item: any) {
    this.route.navigate(['/target-assigned/target-assigned-details/' + item]);
  }

  value: any;
  changesvalues(event: any) {
    //update the ui
    this.value = event.target.value;
    sessionStorage.setItem('ChangesVales', this.value);
  }

  addConsumables(f: NgForm) {

    f = this.bridgeService2.GlobaleTrimFunc(f);
    if (f.valid) {
      this.addTar.YearTarget = this.router.snapshot.params.id;
      this.addTar.SalesPersonCode = this.NewSalesEmpCode;
      this.addTar.reportingTo = this.NewreportingTo;
      this.addTar.CreatedDate = this.newdate;
      this.addTar.UpdatedDate = this.newdate;
      for (let i = 0; i < this.addTar.monthly.length; i++) {
        this.addTar.monthly[i].YearTarget = this.router.snapshot.params.id;
        this.addTar.monthly[i].amount = Number(this.addTar.monthly[i].amount);
      }
      // if(this.TargeYear[0].YearTarget ==  String( Number(this.addTar.q1)+Number(this.addTar.q2)+Number(this.addTar.q3)+Number(this.addTar.q4))){
      this.addTar.q1 = Number(this.addTar.q1);
      this.addTar.q2 = Number(this.addTar.q2);
      this.addTar.q3 = Number(this.addTar.q3);
      this.addTar.q4 = Number(this.addTar.q4);
      if (this.addTar.reportingTo == null) {
        this.addTar.reportingTo = '';
      }
      this.bridgeService2.tenderStoreQuoter(this.addTar).subscribe((res: TargeQuoter) => {
        if (Object(res)['status'] == "200") {
          this.commonObj.isValid = false;
          alert('Target Assign Succesfully');
          //console.log(res);
          setTimeout(() => {
            this.ngOnInit();
          }, 2000);
        }
        else {
          alert(Object(res)['message']);
         // console.log(res);
          // this.ngOnInit();
        }
      },
        (err) => {
          this.isLoading = false;
          const delim = ":"
          const name = err.message
          const result = name.split(delim).slice(3).join(delim)
          alert(result);
        }
      );
    } else {
      this.commonObj.isValid = true;
    }
  }
  noteamfound: boolean = false;
  getBridge(NewSalesEmpCode:any): void {
    this.isLoading2 = true;
    this.bridgeService2.getTargetEmployee(NewSalesEmpCode).subscribe(
      (data: Bridge[]) => {
        this.bridges = data;
        this.isLoading2 = false;
        // console.log(this.bridges);
        // this.TeamDone = true;
        if (this.bridges.length == 0) {
          this.noteamfound = true;
        }
        else {
          this.noteamfound = false;
        }

      },
      (err) => {
        this.isLoading2 = false;
        console.log(err);
        this.error = err;
      }
    );
  }
  storeMultipleTarget = new Array();
  addTeam(f: NgForm) {
    f = this.bridgeService2.GlobaleTrimFunc(f);
    for (let i = 0; i < this.bridges.length; i++) {
      var newdata2 = {
        Department: '',
        StartYear: '',
        EndYear: '',
        SalesPersonCode: '',
        reportingTo: '',
        YearTarget: '',
        CreatedDate: this.newdate,
        UpdatedDate: this.newdate,

      }

      newdata2.YearTarget = (document.getElementById("YearTarget" + this.bridges[i].id) as HTMLInputElement).value
      newdata2.Department = this.TargeYear[0].Department;
      newdata2.StartYear = String(this.TargeYear[0].StartYear);
      newdata2.EndYear = String(this.TargeYear[0].EndYear);
      newdata2.SalesPersonCode = this.bridges[i].SalesEmployeeCode;
      newdata2.reportingTo = this.bridges[i].reportingTo;
      this.storeMultipleTarget.push(newdata2);
    }


    this.bridgeService2.storeTargetAssignmentMulti(this.storeMultipleTarget).subscribe(
      (res: TargeYear) => {
        if (Object(res)['status'] == "200") {
          alert('Target Assign Succesfully');
          // this.route.navigate(['/target-assigned']);
          this.ngOnInit();
        }
        else {
          alert(Object(res)['message']);
          this.ngOnInit();
          this.storeMultipleTarget = [];
        }
      },
      (err) => {
        this.isLoading = false;
        const delim = ":"
        const name = err.message
        const result = name.split(delim).slice(3).join(delim)
        alert(result);
      }
    );

  }

  SendEmp(id: any, code: any) {
    this.NewSalesEmpCode = code.SalesEmployeeCode;
    this.NewreportingTo = code.reportingTo;
    this.Nid = id;
    this.targetGes = false;
    this.TeamDone = true;
    this.targetGet = [];
    this.addTar.monthly = this.newMonth;
    this.addTar.q1 = 0;
    this.addTar.q2 = 0;
    this.addTar.q3 = 0;
    this.addTar.q4 = 0;
    this.addTar.SalesPersonCode = '';
    this.addTar.reportingTo = '';
    this.addTar.YearTarget = '';
    this.addTar.CreatedDate = '';
    this.addTar.UpdatedDate = '';
    this.route.navigate(['/target-assigned/target-assigned-details/' + id]);
    this.ngOnInit();
    $('#headingTwo').hide();
    $('#collapseTwo').hide();
    $('#collapseOne').addClass('show');

  }

  /* added by millan on 25-05-2022 */
  backClicked() {
    this._location.back();
  }
  leftAmounntCalc(quator: string, event: any) {
    let value = !!parseInt(event.target.value.trim()) ? parseInt(event.target.value.trim()) : this.commonObj.Qua1 + this.commonObj.Qua2 + this.commonObj.Qua3 + this.commonObj.Qua4;
    if (!!value) {
      if (quator == 'qt1') {
        this.commonObj.Qua1 = !!parseInt(event.target.value.trim()) ? parseInt(event.target.value.trim()) : 0;
      } else if (quator == 'qt2') {
        this.commonObj.Qua2 = !!parseInt(event.target.value.trim()) ? parseInt(event.target.value.trim()) : 0;
      } else if (quator == 'qt3') {
        this.commonObj.Qua3 = !!parseInt(event.target.value.trim()) ? parseInt(event.target.value.trim()) : 0;
      } else if (quator == 'qt4') {
        this.commonObj.Qua4 = !!parseInt(event.target.value.trim()) ? parseInt(event.target.value.trim()) : 0;
      }
      if (parseInt(this.TargeYear[0].YearTarget) < (this.commonObj.Qua1 + this.commonObj.Qua2 + this.commonObj.Qua3 + this.commonObj.Qua4)) {
        event.target.value = event.target.value.replace(event.data, '');
        if (quator == 'qt1') {
          this.commonObj.Qua1 = parseInt(String(this.commonObj.Qua1).replace(event.data, ''));
        } else if (quator == 'qt2') {
          this.commonObj.Qua2 = parseInt(String(this.commonObj.Qua2).replace(event.data, ''));
        } else if (quator == 'qt3') {
          this.commonObj.Qua3 = parseInt(String(this.commonObj.Qua3).replace(event.data, ''));
        } else if (quator == 'qt4') {
          this.commonObj.Qua4 = parseInt(String(this.commonObj.Qua4).replace(event.data, ''));
        }
      } else {
        this.commonObj.leftAmount = (parseInt(this.TargeYear[0].YearTarget) - (this.commonObj.Qua1 + this.commonObj.Qua2 + this.commonObj.Qua3 + this.commonObj.Qua4));
      }
    } else {
      this.commonObj.leftAmount = this.TargeYear[0].YearTarget;
    }
  }

  }

