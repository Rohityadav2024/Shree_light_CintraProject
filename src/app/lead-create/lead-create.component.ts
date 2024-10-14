import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Bridge } from '../bridge';
import { BridgeService } from '../modules/service/bridge.service';
import { BusinessPartners } from '../businesspartners';
import { opportunity } from '../opportunity';
@Component({
  selector: 'app-lead-create',
  templateUrl: './lead-create.component.html',
  styleUrls: ['./lead-create.component.css']
})
export class LeadCreateComponent implements OnInit {
  baseUrl2: any;

    dateObj = new Date();
    time = this.dateObj.toLocaleTimeString();
    month2 = this.dateObj.getMonth()+1;
    month = (this.month2 < 10 ? '0' : '') + this.month2;
    day = (this.dateObj.getDate() < 10 ? '0' : '') + this.dateObj.getDate();
    year = this.dateObj.getUTCFullYear();
    months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    newdate = this.day + "-" + this.month + "-" + this.year;
    bridgess: Bridge[] = [];
    businesspartners: BusinessPartners[] = [];
    opportunitys: opportunity[] = [];
    opportunity: opportunity =  {
      SequentialNo: '',

      U_LEADID:0,
    U_LEADNM:'',
      CardCode: '',
      SalesPerson: '',
      SalesPersonName: '',
      ContactPerson: '',
      ContactPersonName: '',
      Source: '',
      StartDate: this.newdate,
      PredictedClosingDate: '',
      MaxLocalTotal: '',
      MaxSystemTotal: '0.7576',
      Remarks: '',
      Status: 'sos_Open',
      ReasonForClosing: 'None',
      TotalAmountLocal: '0.7',
      TotalAmounSystem: '0.0',
      CurrentStageNo: '',
      CurrentStageNumber: '',
      CurrentStageName: '',
      OpportunityName: '',
      Industry: 'None',
      LinkedDocumentType: 'None',
      DataOwnershipfield: '',
      DataOwnershipName: '',
      StatusRemarks: '',
      ProjectCode: 'None',
      CustomerName: '',
      ClosingDate: '',
      ClosingType: 'sos_Days',
      OpportunityType: 'boOpSales',
      UpdateDate: this.newdate,
      UpdateTime: this.time,
      U_TYPE: '',
      U_LSOURCE: '',
      U_FAV: 'N',
      U_PROBLTY: '',
      DocumentLines: '',
      SalesOpportunitiesLines: '',
      OppItem:[{
        Quantity:"",
  UnitPrice:"",
  DiscountPercent:"",
  ItemCode:"",
  ItemDescription:"",
  TaxCode:"",
  U_FGITEM:"",
  CostingCode2:"",
  ProjectCode:"",
  FreeText:"",
  Tax:"",
  UomNo:"",
      }],
    };

      isLoading: boolean = false;
    error = '';
    success = '';
    role: any;
    UserId: any;
    reportingTo: any;
    UserName: any;
    // basceurl = "http://103.234.187.199:8050/businesspartner/employee/";
    resetAlerts() {
      this.error = '';
      this.success = '';
    }
    constructor(private bridgeService2: BridgeService,private router: Router,private http: HttpClient) {
      this.baseUrl2 = this.bridgeService2.baseUrl2;
     }

    ngOnInit(): void {



      this.bridgeService2.autoCall();
      this.getBusinessPartmers();

      this.UserName = sessionStorage.getItem('UserName');
      this.UserId = sessionStorage.getItem('UserId');
      this.role = sessionStorage.getItem('role');
      this.reportingTo = sessionStorage.getItem('reportingTo');
      if(this.UserName == undefined){
        this.router.navigate(['/login']);
      }
     this.getBridge();
    }


    getBridge(): void {
      this.bridgeService2.getAll().subscribe(
        (data: Bridge[]) => {
          this.bridgess = data;
          for (let i = 0; i < this.bridgess.length; i++) {
            if(this.bridgess[i]['SalesEmployeeCode'] == '-1'){
              this.bridgess.splice(i, 1);
            }
            if(this.bridgess[i]['SalesEmployeeCode'] == ''){
              this.bridgess.splice(i, 1);
            }
            }

        },
        (err) => {
          console.log(err);
          this.error = err;
        }
      );
    }




    getBusinessPartmers(): void {
      this.bridgeService2.getBusinessPartmersdata().subscribe(
        (data: BusinessPartners[]) => {
          this.businesspartners = data;

        },
        (err) => {
          console.log(err);
          this.error = err;
        }
      );
    }
  contactPersoneList: any;
    selectedDay: string = '';
    selectChangeHandler (event: any) {
      this.selectedDay = event.target.value;
      this.bridgeService2.getContactPersone(this.selectedDay).subscribe(
        (data: any) => {
          this.contactPersoneList = data;
        });
      // this.http.post(this.baseUrl2+'/businesspartner/employee/'+'all', {"CardCode":this.selectedDay}).toPromise().then((data:any) => {

      // });
    }

    selectChangeHandler2 (event: any) {
      var id = event.target.value;
      this.bridgeService2.getContactPersoneone(id).subscribe(
        (data: any) => {
          this.opportunity.ContactPersonName = data[0]['FirstName'];
          this.opportunity.ContactPerson = data[0]['InternalCode'];
        });
      // this.http.post(this.baseUrl2+'/businesspartner/employee/'+'one', {"id":id}).toPromise().then((data:any) => {

      // });

    }

    selectChangeHandler3 (event: any) {
      var id = event.target.value;
      this.bridgeService2.getoneemployee(id).subscribe(
        (data: any) => {
          this.opportunity.SalesPersonName = data[0]['userName'];
          this.opportunity.SalesPerson = data[0]['SalesEmployeeCode'];
          this.opportunity.DataOwnershipName = data[0]['userName'];
          this.opportunity.DataOwnershipfield = data[0]['SalesEmployeeCode'];
        });
      // this.http.post(this.baseUrl2+'/employee/one', {"id":id}).toPromise().then((data:any) => {

      // });

    }

    addOpportunity(f: NgForm) {
      f = this.bridgeService2.GlobaleTrimFunc(f);
      this.resetAlerts();

      this.isLoading = true;
      this.opportunity.PredictedClosingDate = this.opportunity.ClosingDate;
      this.opportunity.SalesOpportunitiesLines = [
        {
          "DocumentType": this.opportunity.MaxLocalTotal,
          "MaxLocalTotal": "5000",
          "MaxSystemTotal": "60000",
          "SalesPerson": this.opportunity.SalesPerson,
          "StageKey": "2"
        }
         ]
      this.bridgeService2.storeopportunity(this.opportunity).subscribe(
        (res: opportunity) => {

          this.isLoading = false;
          // Update the list of cars
          this.opportunitys.push(res)
           alert('Add Opportunity successfully');
           this.router.navigate(['/opportunity']);
          // this.success = 'Created successfully';
          f.reset();
        },
        (err) => {

          this.isLoading = false;
          const delim = ":"
          const name = err.message
          const result = name.split(delim).slice(3).join(delim)
          alert(result);
          // window.location.reload();
        }
      );
    }


  }
