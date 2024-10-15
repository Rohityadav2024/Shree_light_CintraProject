import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { addSmtp, Bridge, Directory, EditBridge, Industry, PaymentTerms } from '../../bridge';
import { AddFollow2, Bridge2, EditBridge2, EditExpense, EditPayment, Expense, Follow, Payment } from '../../bridge2';
import { Employee } from '../../employee';

import { Editopportunity, opportunity } from '../../opportunity';
// import { Bridge2 } from './bridge2';

import { Quotation, EditQuotation, QuoAttach, Attachment } from '../../quotation';
import { Login, Target, TargeEmployeGet, TargeYear, TargeQuoter } from '../../login';
import { Stages, CreateStages, ChangeStages, CompleteStages } from '../../stage';
import { Chatter, Activity, EditActivity, OppoAttach } from '../../chatter';

import { Customer, EditCustomer, Branch, EditBranch, ContactPerson, updateContactPerson } from '../../customer';
import { EditOrders, OrAttach, Orders, StageComplete } from '../../orders';
import { Category, EditItem, Item, Product, Warehouse } from '../../warehouse';
import { Router, NavigationEnd } from '@angular/router';
import { CampaignNameCreate, Compaign, cutomerAttach, editCampaignNameCreate, EditCompaign, UpdateAction, UpdateCampaignSetStatus, updatecutomerAttach } from '../../campaign';
import { BehaviorSubject, Subject } from 'rxjs';
import { AddLog, EditAddress } from 'src/app/delivery';
import { MAP } from '../model/customer';
import { DomSanitizer } from '@angular/platform-browser';
@Injectable({
  providedIn: 'root'
})
export class BridgeService {
  private loggedIn: boolean = false;
  leftNavBar = new Subject<any>();
  loginDataSubject = new Subject<any>();
  loginData: any;
  UserName = sessionStorage.getItem('UserName');
  FirstLogin = 'false';
  UserId = sessionStorage.getItem('UserId');
  role = sessionStorage.getItem('role');
  SalesEmployeeCode = sessionStorage.getItem('SalesEmployeeCode');
  // baseUrl2 = 'http://103.234.187.197:8111';
  // SuperbaseUrl = 'http://103.234.187.197:8084/api';
  baseUrl2 = 'http://103.234.187.197:8124';
  SuperbaseUrl = 'http://103.234.187.197:8096/api';
  // baseUrl2 = 'http://192.168.29.103:8002';
  // SuperbaseUrl = 'http://192.168.29.103:8000/api';
  // baseUrl2 = 'http://192.168.77.231:8002';
  // SuperbaseUrl = 'http://192.168.77.231:8000/api';
  UserFilter: any = { pageNumber: 1, ShowRows: '10', searchValue: '',short:{order_by_field:'',order_by_value:''}, Filter: { filterusersrole: '', filteruserposition: '', filteruserreporting: '' } };
  AllFilter:any;
  private previousUrl: any;
  private currentUrl: any;
  accessToken: any;
  sessionheaders: any;
  constructor(private http: HttpClient, private router: Router, private sanitizer: DomSanitizer) {
    this.currentUrl = this.router.url;
    router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.previousUrl = this.currentUrl;
        // sessionStorage.setItem('previousUrl', this.previousUrl);
        this.currentUrl = event.url;
      };
    });


  }

// Super Admin Api

  MainSessionloginFunction(login: any) {
    return this.http.post(`${this.SuperbaseUrl}/user/login`, login).pipe(
      map((res: any) => {
        sessionStorage.setItem('accesstoken', res.token);
        this.getHeader();
        return res;
      })
    );
  }

  isValidExportStatus() {
   return sessionStorage.getItem('exportStatus') === 'true' ? true:false; // sessionStorage stores everything as strings
  }

  ApplistByCLient(idd: any) {
    return this.http.post(`${this.SuperbaseUrl}/customer/customer_all_apps`, { "id": idd }, { 'headers': this.getHeader() }).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  resetEmplyeeUserPassword(bridge2: any) {
    return this.http.post(`${this.SuperbaseUrl}/user/change_password`, bridge2, { 'headers': this.getHeader() }).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  checkEmail(payload: any) {
    return this.http.post(`${this.SuperbaseUrl}/user/forgot_password`, payload).pipe(
      map((res: any) => {
        return res;
      })
    );
  }



  VerifyOTP(payload: any) {
    return this.http.post(`${this.SuperbaseUrl}/user/verify_otp`, payload).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  ApplistAll() {
    return this.http.get(`${this.SuperbaseUrl}/application/all`, { 'headers': this.getHeader() }).pipe(
      map((res: any) => {
        return res;
      })
    );
  }


storeApplication(customer: any,appEdit:boolean) {
  //console.log(customer);
  if(appEdit == true){
    customer = customer[0]
  }
  return this.http.post(`${this.SuperbaseUrl}/customer/${appEdit ? 'update_application_detail' : 'add_application_details'}`, customer, { 'headers': this.getHeader() }).pipe(
    map((res: any) => {
      return res;
    })
  );
}

  resetUserFilter() {
    this.UserFilter = { pageNumber: 1, ShowRows: '10', searchValue: '',short:{order_by_field:'',order_by_value:''}, Filter: { filterusersrole: '', filteruserposition: '', filteruserreporting: '' } };
  }
  setUserFilter(Type: any, data: any) {
    if (Type == 'pageno') {
      this.UserFilter.pageNumber = data;
    }
    else if (Type == 'pageshow') {
      this.UserFilter.ShowRows = data;
    }
    else if (Type == 'Filter') {
      this.UserFilter.Filter = data;
    }
    else if (Type == 'searchValue') {
      this.UserFilter.searchValue = data;
    }
    else if (Type == 'short') {
      this.UserFilter.short = data;
    }
  }

  setAllFilter(Type: any, data: any) {
    this.AllFilter = data;
  }

  getAllFilter(Type: any){
    return this.AllFilter
  }

  GlobaleTrimFunc(Keys: any) {
    for (const key in Keys.controls) {
      if (typeof (Keys.controls[key].value) == 'string') {
        if (Keys.controls[key].value == null) {
          Keys.controls[key].value = '';
        }
        const value2 = Keys.controls[key].value;
        const trimmedValue = value2.trim();
        Keys.controls[key].setValue(trimmedValue)
      }
    }
    return Keys
  }

  saniter(content: any) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(content);
  }

  isTicketsValue(data: any) {
    return !!data ? data : '---';
  }
  logindatapost(data: any) {
    // debugger
    sessionStorage.setItem('UserName', data['firstName'] + ' ' + data['lastName']);
    sessionStorage.setItem('UserId', data['id']);
    sessionStorage.setItem('role', data['RoleDetails'].Name.toLowerCase());
    sessionStorage.setItem('reportingTo', data['reportingTo']);
    sessionStorage.setItem('SalesEmployeeCode', data.SalesEmployeeCode);
    sessionStorage.setItem('FirstLogin', 'true');
    sessionStorage.setItem('ProjectSetting', JSON.stringify(data.ProjectSetting));
    sessionStorage.setItem('currencySymbol', data.ProjectSetting[0].currency_value);
    sessionStorage.setItem('currencyCode', data.ProjectSetting[0].currency_type);
    this.FirstLogin = 'true';
    this.UserName = sessionStorage.getItem('UserName');
    this.UserId = sessionStorage.getItem('UserId');
    this.role = sessionStorage.getItem('role');
    this.SalesEmployeeCode = sessionStorage.getItem('SalesEmployeeCode');
    this.loginDataSubject.next(data);
  }
  getLoginData() {
    return this.loginDataSubject.asObservable();
  }
  public getPreviousUrl() {
    // return sessionStorage.getItem('previousUrl');
    return this.previousUrl;
  }

  autoCall() {
    this.UserName = sessionStorage.getItem('UserName');
    this.UserId = sessionStorage.getItem('UserId');
    this.role = sessionStorage.getItem('role');
    this.SalesEmployeeCode = sessionStorage.getItem('SalesEmployeeCode');
    this.baseUrl2 = this.baseUrl2;
  }

  encoderData(encodeData: any) {
    return btoa(encodeData);
  }
  decoderData(decoderData: any) {
    return atob(decoderData);
  }
  getHeader(settok?:any) {
    if(!settok){
    this.accessToken = sessionStorage.getItem('accesstoken');
    }
    else{
      this.accessToken = settok
      sessionStorage.setItem('accesstoken', settok);
    }
    this.sessionheaders = new HttpHeaders()
      // .set('content-type', 'application/json')
      .set('Authorization', 'Token ' + this.accessToken);
    return this.sessionheaders
  }

  getHeader2() {
    var sessionheaders = new HttpHeaders()
      // .set('content-type', 'application/json')
      .set('Authorization','eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI0NjgxODEiLCJpc3MiOiJodHRwczovL2Nsb3VkcGhvbmUudGF0YXRlbGVzZXJ2aWNlcy5jb20vdG9rZW4vZ2VuZXJhdGUiLCJpYXQiOjE3MTQ5OTM2MDMsImV4cCI6MjAxNDk5MzYwMywibmJmIjoxNzE0OTkzNjAzLCJqdGkiOiJEWmVpbGJzc3Q0UjhuQUZVIn0.frMED93D-c5umcMoPWGHRRa0kTGohBQxHO1pnSWKxWQ');
    return sessionheaders
  }
  // MainSessionloginFunction(login: any) {
  //   return this.http.post(`${this.baseUrl2}/login/`, login).pipe(
  //     map((res: any) => {
  //       sessionStorage.setItem('accesstoken', res.token);
  //       this.getHeader();
  //       return res;
  //     })
  //   );
  // }
  getAll() {
    // return this.http.post(`${this.baseUrl2}/employee/all_filter`, { "SalesEmployeeCode": this.SalesEmployeeCode }, { 'headers': this.getHeader() }).pipe(
    //   map((res: any) => {
    //     // //console.log(res)
    //     return res['data'];
    //   })
    // );
    return this.http.post(`${this.baseUrl2}/employee/all_filter_page`, {
      "SalesPersonCode": this.SalesEmployeeCode,
      "PageNo": 1,
      "maxItem": 'All',
      "order_by_field": 'id',
      "order_by_value": 'desc',
      "SearchText": '', "field": {
        'departement_id__in': [1, 2],
      }
    }, { 'headers': this.getHeader() }).pipe(
      map((res: any) => {
        // //console.log(res)
        return res['data'];
      })
    );

  }
  getLocationAddress(lat: any, long: any) {
    return this.http.get(`https://apis.mapmyindia.com/advancedmaps/v1/AIzaSyAiPvRFmfyB8vuyzTDRScLZCRhaW84R25U/rev_geocode?lat=${lat}&lng=${long}&region=IND&lang=hi`, { 'headers': this.getHeader() }).pipe(
      map((res: any) => {
        // //console.log(res)
        return res['data'];
      })
    );

  }

  getempall() {
    return this.http.get(`${this.baseUrl2}/employee/all`, { 'headers': this.getHeader() }).pipe(
      map((res: any) => {
        return res['data'];
      })
    );
  }

  getLeadCount() {
    return this.http.post(`${this.baseUrl2}/lead/all_count`, { "assignedTo": this.UserId, "leadType": "All" }, { 'headers': this.getHeader() }).pipe(
      map((res: any) => {
        // //console.log(res);
        return res['data'];
      })
    );
  }

  getAll2(pagenumber: number, leadcount: number) {
    return this.http.post(`${this.baseUrl2}/lead/all_filter`, { "assignedTo": this.UserId, "leadType": "All", "PageNo": pagenumber, "maxItem": leadcount }, { 'headers': this.getHeader() }).pipe(
      map((res: any) => {
        // //console.log(res);
        return res['data'];
      })
    );
  }

  junkLeadall() {

    return this.http.post(`${this.baseUrl2}/lead/all_filter_junk`, { "assignedTo": this.UserId }, { 'headers': this.getHeader() }).pipe(
      map((res: any) => {
        // //console.log(res);
        return res['data'];
      })
    );
  }

  loginFunctionbyToken(rememberMe:any) {
    // console.log(this.getHeader())
    return this.http.get(`${this.baseUrl2}/employee/get_user_info`, { 'headers': this.getHeader() }).pipe(
      map((res: any) => {
        if (rememberMe) {
          localStorage.setItem('currentUser', this.accessToken);
        }
        return res;
      })
    );
  }

  logout(): void {
    this.loggedIn = false;
    localStorage.removeItem('currentUser');
    sessionStorage.clear();
    console.clear();
    this.router.navigate(['/login']);
  }
  isLoggedIn(): boolean {
    return this.loggedIn;
  }
  loginFunction(login: Login) {
    return this.http.post(`${this.baseUrl2}/employee/login`, login, { 'headers': this.getHeader() }).pipe(
      map((res: any) => {
        return res;
      })
    );
  }


  storeuser(bridge: Bridge) {
    //  //console.log(bridge);
    return this.http.post(`${this.baseUrl2}/employee/create`, bridge, { 'headers': this.getHeader() }).pipe(
      map((res: any) => {
        return res;
      })
    );
  }


  deleteuser(id: any) {
    const params = new HttpParams()
      .set('id', id.toString());
    return this.http.post(`${this.baseUrl2}/employee/delete`, { id: id }, { 'headers': this.getHeader() }).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  deletereport(id: any) {
    const params = new HttpParams()
      .set('id', id.toString());
    return this.http.post(`${this.baseUrl2}/mis_reports/delete_report_history`, { id: id }, { 'headers': this.getHeader() }).pipe(
      map((res: any) => {
        return res;
      })
    );
  }


  edituser(bridge2: EditBridge) {
    return this.http.post(`${this.baseUrl2}/employee/update`, bridge2, { 'headers': this.getHeader() }).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  /* leads area */
  adduploadlead(lead: any) {
    //  //console.log(lead);
    return this.http.post(`${this.baseUrl2}/lead/create`, lead, { 'headers': this.getHeader() }).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  addlead(bridge2: Bridge2) {
    ////console.log(bridge2);
    return this.http.post(`${this.baseUrl2}/lead/create`, [bridge2], { 'headers': this.getHeader() }).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  junkleads(id: any, status: any) {
    const params = new HttpParams()
      .set('id', id.toString());
    return this.http.post(`${this.baseUrl2}/lead/mark_junk`, { "id": id, "status": status }, { 'headers': this.getHeader() }).pipe(
      map((res: any) => {
        return res
      })
    );
  }

  deleteleads(id: any) {
    const params = new HttpParams()
      .set('id', id.toString());
    return this.http.post(`${this.baseUrl2}/lead/delete`, { id: id }, { 'headers': this.getHeader() }).pipe(
      map((res: any) => {
        return res
      })
    );
  }


  editleads(editbridges: EditBridge2) {
    //console.log(editbridges);
    return this.http.post(`${this.baseUrl2}/lead/update`, editbridges, { 'headers': this.getHeader() }).pipe(

      map((res: any) => {
        return res;
      })
    );
  }


  getexpnensedata() {
    return this.http.get(`${this.baseUrl2}/expense/all`, { 'headers': this.getHeader() }).pipe(
      map((res: any) => {
        return res['data'];
      })
    );
  }

  addexpense(bridge2: Expense) {

    //  //console.log(bridge2)
    const uploadData = new FormData();
    for (let i = 0; i < Object.keys(bridge2).length; i++) {

      uploadData.append(Object.keys(bridge2)[i], Object.values(bridge2)[i]);
    }

    if (bridge2.Attach.length != 0) {

      uploadData.delete('Attach');
      for (var i = 0; i < bridge2.Attach.length; i++) {
        uploadData.append("Attach", bridge2.Attach[i]);
      }
    }
    return this.http.post(`${this.baseUrl2}/expense/create`, uploadData, { 'headers': this.getHeader() }).pipe(
      map((res: any) => {
        //console.log("zz ", res)
        return res;
      })
    );


  }

  getOneexpensedata(idd: number) {
    return this.http.post(`${this.baseUrl2}/expense/one`, { "id": idd }, { 'headers': this.getHeader() }).pipe(
      map((res: any) => {
        return res['data'];
      })
    );
  }

  editexpense(editexpense: EditExpense) {
    //console.log(editexpense);
    // return this.http.post(`${this.baseUrl2}/expense/update`, editexpense).pipe(

    //   map((res: any) => {
    //     return res['data'];
    //   })
    // );

    //  //console.log(editexpense)
    const uploadData = new FormData();
    for (let i = 0; i < Object.keys(editexpense).length; i++) {

      uploadData.append(Object.keys(editexpense)[i], Object.values(editexpense)[i]);
    }

    if (editexpense.Attach.length != 0) {

      uploadData.delete('Attach');
      for (var i = 0; i < editexpense.Attach.length; i++) {
        uploadData.append("Attach", editexpense.Attach[i]);
      }
    }
    return this.http.post(`${this.baseUrl2}/expense/update`, uploadData, { 'headers': this.getHeader() }).pipe(
      map((res: any) => {
        //console.log("zz ", res)
        return res;
      })
    );


  }

  deleteexpense(id: any) {
    // //console.log();
    const params = new HttpParams()
      .set('id', id.toString());
    return this.http.post(`${this.baseUrl2}/expense/delete`, { id: [id] }, { 'headers': this.getHeader() }).pipe(
      map((res: any) => {
        return res['data'];
      })
    );
  }

  deleteexpenseimg(id: any, imageId: any) {
    //console.log(id);
    //console.log(imageId);
    // const params = new HttpParams()
    //   .set('id', id.toString());
    return this.http.post(`${this.baseUrl2}/expense/expense_img_delete`, { id: id, image_id: imageId }, { 'headers': this.getHeader() }).pipe(
      map((res: any) => {
        return res['data'];
      })
    );
  }

  getemployeeexpensedata(idd: number) {
    return this.http.post(`${this.baseUrl2}/employee/empExpen`, { "empId": idd }, { 'headers': this.getHeader() }).pipe(
      map((res: any) => {
        //console.log(res['data']);
        return res['data'];

      })
    );
  }

  getpaymentdata() {
    return this.http.get(`${this.baseUrl2}/payment/all`, { 'headers': this.getHeader() }).pipe(
      map((res: any) => {
        return res['data'];
      })
    );
  }

  addpayment(bridge2: Payment) {

    //  //console.log(bridge2)
    const uploadData = new FormData();
    for (let i = 0; i < Object.keys(bridge2).length; i++) {

      uploadData.append(Object.keys(bridge2)[i], Object.values(bridge2)[i]);
    }

    if (bridge2.Attach.length != 0) {

      uploadData.delete('Attach');
      for (var i = 0; i < bridge2.Attach.length; i++) {
        uploadData.append("Attach", bridge2.Attach[i]);
      }
    }
    return this.http.post(`${this.baseUrl2}/payment/create`, uploadData, { 'headers': this.getHeader() }).pipe(
      map((res: any) => {
        //console.log("zz ", res)
        return res;
      })
    );


  }

  getOnepaymentdata(idd: number) {
    return this.http.post(`${this.baseUrl2}/payment/one`, { "id": idd }, { 'headers': this.getHeader() }).pipe(
      map((res: any) => {
        return res['data'];
      })
    );
  }

  editpaymentform(editpay: EditPayment) {
    //console.log(editpay);

    const uploadData = new FormData();
    for (let i = 0; i < Object.keys(editpay).length; i++) {

      uploadData.append(Object.keys(editpay)[i], Object.values(editpay)[i]);
    }

    if (editpay.Attach.length != 0) {

      uploadData.delete('Attach');
      for (var i = 0; i < editpay.Attach.length; i++) {
        uploadData.append("Attach", editpay.Attach[i]);
      }
    }
    return this.http.post(`${this.baseUrl2}/payment/update`, uploadData, { 'headers': this.getHeader() }).pipe(
      map((res: any) => {
        //console.log("zz ", res)
        return res;
      })
    );


  }

  deletepayment(id: any) {
    // //console.log();
    const params = new HttpParams()
      .set('id', id.toString());
    return this.http.post(`${this.baseUrl2}/payment/delete`, { id: id }, { 'headers': this.getHeader() }).pipe(
      map((res: any) => {
        return res['data'];
      })
    );
  }

  deletepaymentimg(id: any, imageId: any) {
    //console.log(id);
    //console.log(imageId);
    // const params = new HttpParams()
    //   .set('id', id.toString());
    return this.http.post(`${this.baseUrl2}/payment/payment_img_delete`, { id: id, image_id: imageId }, { 'headers': this.getHeader() }).pipe(
      map((res: any) => {
        return res['data'];
      })
    );
  }

  getoneemployee(idd: any) {
    return this.http.post(`${this.baseUrl2}/employee/one`, { "id": idd }, { 'headers': this.getHeader() }).pipe(map((res: any) => {
      return res['data'];
    }))
  }

  getoneemployeechecklogout(idd: any) {
    return this.http.post(`${this.baseUrl2}/employee/one`, { "id": idd }, { 'headers': this.getHeader() }).pipe(map((res: any) => {
      return res;
    }))
  }

  getOneLeaddata(idd: number) {
    //console.log(idd);
    return this.http.post(`${this.baseUrl2}/lead/one`, { "id": idd }, { 'headers': this.getHeader() }).pipe(
      map((res: any) => {
        return res['data'];
      })
    );
  }

  BusinessPartnermonthsale(evt: any) {
    return this.http.post(`${this.baseUrl2}/businesspartner/monthlySales`, { "CardCode": evt }, { 'headers': this.getHeader() }).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  CustomerPaymentSummary(evt: any) {
    return this.http.post(`${this.baseUrl2}/businesspartner/payment_summary`, { "CardCode": evt }, { 'headers': this.getHeader() }).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  getFollowLeaddata(idd: number) {
    return this.http.post(`${this.baseUrl2}/activity/chatter_all`, { "SourceID": idd, "SourceType": "Lead", "Emp": this.UserId }, { 'headers': this.getHeader() }).pipe(
      map((res: any) => {
        return res['data'];
      })
    );
  }

  EmpDashboard(evt: any) {
    return this.http.post(`${this.baseUrl2}/employee/dashboard`, { "SalesEmployeeCode": evt }, { 'headers': this.getHeader() }).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  targetAnuAch(evt: any) {
    return this.http.post(`${this.baseUrl2}/employee/target_anu_ach`, { "SalesPersonCode": evt }, { 'headers': this.getHeader() }).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  collectionProjection(evt: any) {
    return this.http.post(`${this.baseUrl2}/employee/employee_target`, { "SalesPersonCode": evt }, { 'headers': this.getHeader() }).pipe(
      map((res: any) => {
        return res;
      })
    );
  }
  topFivecustomers(evt: any, NoOfBP: number) {
    return this.http.post(`${this.baseUrl2}/employee/top_bp_by_order`, { "SalesPersonCode": evt, "NoOfBP": NoOfBP }, { 'headers': this.getHeader() }).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  mostTypeofOrder(evt: any) {
    return this.http.post(`${this.baseUrl2}/employee/movingitems`, { "SalesEmployeeCode": evt }, { 'headers': this.getHeader() }).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  EmployeeMonthlySales(evt: any) {
    return this.http.post(`${this.baseUrl2}/employee/monthlySalesEmp`, { "SalesEmployeeCode": evt }, { 'headers': this.getHeader() }).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  ProsoldEmpl(evt: any) {
    return this.http.post(`${this.baseUrl2}/employee/proSoldEmp`, { "SalesEmployeeCode": evt }, { 'headers': this.getHeader() }).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  employeeTotalSale(evt: any) {
    return this.http.post(`${this.baseUrl2}/employee/total_sale`, { "SalesEmployeeCode": evt }, { 'headers': this.getHeader() }).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  employeeTotalOutstanding(evt: any) {
    return this.http.post(`${this.baseUrl2}/employee/total_outstanding`, { "SalesEmployeeCode": evt }, { 'headers': this.getHeader() }).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  BestsellingItembyAmount(evt: any) {
    return this.http.post(`${this.baseUrl2}/employee/top5itembyamount`, { "SalesPersonCode": evt }, { 'headers': this.getHeader() }).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  HotWarmDealsGraph(evt: any) {
    return this.http.post(`${this.baseUrl2}/employee/monthly_lead_report`,
      {
        "SalesEmployeeCode": evt,
        "FromDate": "2023-01-01",
        "ToDate": "2024-12-31"
      },
      { 'headers': this.getHeader() }).pipe(
        map((res: any) => {
          return res;
        })
      );
  }

  delieveryStatus(evt: any) {
    return this.http.post(`${this.baseUrl2}/employee/opportunity_bystage`, { "SalesEmployeeCode": evt }, { 'headers': this.getHeader() }).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  leadAssign(lead_id: any, selectedValue: any) {
    return this.http.post(`${this.baseUrl2}/lead/assign`, { id: lead_id, employeeId: selectedValue }, { 'headers': this.getHeader() }).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  pushMap(mapp: MAP) {
    //console.log(mapp);
    return this.http.post(`${this.baseUrl2}/activity/maps`, mapp, { 'headers': this.getHeader() }).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  getMapAll(saleEmpCode: number) {
    return this.http.post(`${this.baseUrl2}/activity/map_all`, { "SalesEmployeeCode": saleEmpCode, }, { 'headers': this.getHeader() }).pipe(
      map((res: any) => {
        return res['data'];
      })
    );
  }


  storeleadfollow(Follow: Follow) {
    //console.log(Follow);
    return this.http.post(`${this.baseUrl2}/activity/chatter`, Follow, { 'headers': this.getHeader() }).pipe(
      map((res: any) => {
        return res['data'];
      })
    );
  }



  getOpportunitydata() {
    return this.http.post(`${this.baseUrl2}/opportunity/all_filter`, { "SalesPerson": this.SalesEmployeeCode }, { 'headers': this.getHeader() }).pipe(
      map((res: any) => {
        return res['data'];
      })
    );
  }


  getOneOpportunitydata(idd: number) {
    return this.http.post(`${this.baseUrl2}/opportunity/one`, { "id": idd }, { 'headers': this.getHeader() }).pipe(
      map((res: any) => {
        return res['data'];
      })
    );
  }

  getOneCampaignSetdata(idd: number) {
    return this.http.post(`${this.baseUrl2}/campset/one`, { "id": idd }, { 'headers': this.getHeader() }).pipe(
      map((res: any) => {
        return res['data'];
      })
    );
  }

  getEditCampaignSetdata(idd: number) {
    return this.http.post(`${this.baseUrl2}/campset/one`, { "id": idd }, { 'headers': this.getHeader() }).pipe(
      map((res: any) => {
        // //console.log("arif",res);
        return res['data'];
      })
    );
  }

  getEditCampaigndata(idd: number) {
    return this.http.post(`${this.baseUrl2}/camp/one`, { "id": idd }, { 'headers': this.getHeader() }).pipe(
      map((res: any) => {
        // //console.log("arif",res);
        return res['data'];
      })
    );
  }


  // memberlist
  getmemberlist(idd: number) {
    return this.http.post(`${this.baseUrl2}/camp/memberlist`, { "CampSetId": idd }, { 'headers': this.getHeader() }).pipe(map((res: any) => {
      return res['data'];
    }))
  }

  member: any;

  PostOnemember(member: any) {
    this.member = member;
  }

  getOnemember() {
    return this.member;
  }

  getOneCampaignNamedata(idd: number) {
    return this.http.post(`${this.baseUrl2}/camp/one`, { "id": idd }, { 'headers': this.getHeader() }).pipe(
      map((res: any) => {
        return res['data'];
      })
    );
  }



  storeopportunity(bridge: opportunity) {
    //console.log(bridge);
    return this.http.post(`${this.baseUrl2}/opportunity/create`, bridge, { 'headers': this.getHeader() }).pipe(
      map((res: any) => {
        return res;
      })
    );
  }


  editopportunity(bridge: Editopportunity) {
    //console.log(bridge);
    return this.http.post(`${this.baseUrl2}/opportunity/update`, bridge, { 'headers': this.getHeader() }).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  deleteOppo(id: any) {
    const params = new HttpParams()
      .set('id', id.toString());
    return this.http.post(`${this.baseUrl2}/opportunity/deletee`, { id: [id] }, { 'headers': this.getHeader() }).pipe(
      map((res: any) => {
      })
    );
  }





  getBusinessPartmersdata() {
    return this.http.get(`${this.baseUrl2}/businesspartner/all`, { 'headers': this.getHeader() }).pipe(
      map((res: any) => {
        return res['data'];
      })
    );
  }

  getAllSourcedata() {      // ``
    return this.http.get(`${this.baseUrl2}/lead/source_all`, { 'headers': this.getHeader() }).pipe(
      map((res: any) => {
        //console.log(res)
        return res['data'];
      })
    );
  }



  getStagedata(idd: number) {
    return this.http.post(`${this.baseUrl2}/stage/all`, { "Opp_Id": idd }, { 'headers': this.getHeader() }).pipe(
      map((res: any) => {
        return res['data'];
      })
    );
  }




  storeStage(bridge2: CreateStages) {
    //console.log(bridge2);
    return this.http.post(`${this.baseUrl2}/stage/create`, bridge2, { 'headers': this.getHeader() }).pipe(
      map((res: any) => {
        return res;
      })
    );
  }


  ChangeStage(bridge2: ChangeStages) {
    //console.log(bridge2);
    return this.http.post(`${this.baseUrl2}/opportunity/change_stage`, bridge2, { 'headers': this.getHeader() }).pipe(
      map((res: any) => {
        return res;
      })
    );
  }



  CompleteStage(bridge2: CompleteStages) {
    //console.log(bridge2);
    return this.http.post(`${this.baseUrl2}/opportunity/complete`, bridge2, { 'headers': this.getHeader() }).pipe(
      map((res: any) => {
        return res['data'];
      })
    );
  }



  getChatterdata(idd: number) {
    return this.http.post(`${this.baseUrl2}/activity/chatter_all`, { "Emp": this.UserId, "SourceType": 'Opportunity', "SourceID": idd }, { 'headers': this.getHeader() }).pipe(
      map((res: any) => {
        return res['data'];
      })
    );
  }


  getActivitydata(idd: number) {
    return this.http.post(`${this.baseUrl2}/activity/all`, { "Emp": idd }, { 'headers': this.getHeader() }).pipe(
      map((res: any) => {
        return res['data'];
      })
    );
  }



  storechatter(bridge2: Chatter) {
    //console.log(bridge2);
    return this.http.post(`${this.baseUrl2}/activity/chatter`, bridge2, { 'headers': this.getHeader() }).pipe(
      map((res: any) => {
        return res['data'];
      })
    );
  }




  storeactivity(bridge2: Activity) {
    // //console.log(bridge2);
    return this.http.post(`${this.baseUrl2}/activity/create`, bridge2, { 'headers': this.getHeader() }).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  storeactivitynew(bridge2: Activity) {
    // //console.log(bridge2);
    return this.http.post(`${this.baseUrl2}/activity/create`, bridge2, { 'headers': this.getHeader() }).pipe(
      map((res: any) => {
        return res;
      })
    );
  }


  deleteActivity(id: any) {
    const params = new HttpParams()
      .set('id', id.toString());
    return this.http.post(`${this.baseUrl2}/activity/delete`, { id: id }, { 'headers': this.getHeader() }).pipe(
      map((res: any) => {
      })
    );
  }


  storeEditactivity(bridge2: EditActivity) {
    // //console.log(bridge2);
    return this.http.post(`${this.baseUrl2}/activity/update`, bridge2, { 'headers': this.getHeader() }).pipe(
      map((res: any) => {
        return res['data'];
      })
    );
  }



  getCustomerdata() {
    return this.http.get(`${this.baseUrl2}/businesspartner/all`, { 'headers': this.getHeader() }).pipe(
      map((res: any) => {
        return res['data'];
      })
    );
  }

  getCustomerbpdata() {
    return this.http.get(`${this.baseUrl2}/businesspartner/get_bp`, { 'headers': this.getHeader() }).pipe(
      map((res: any) => {
        return res['data'];
      })
    );
  }


  storeCustomer(customer: Customer) {
    //console.log(customer);
    return this.http.post(`${this.baseUrl2}/businesspartner/create`, customer, { 'headers': this.getHeader() }).pipe(
      map((res: any) => {
        return res;
      })
    );
  }
  editleadstest(editbridges: any) {
    //console.log(editbridges);
    return this.http.post(`${this.baseUrl2}/lead/update`, editbridges, { 'headers': this.getHeader() }).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  getIndustorydata() {
    return this.http.get(`${this.baseUrl2}/industries/all`, { 'headers': this.getHeader() }).pipe(
      map((res: any) => {
        return res['data'];
      })
    );
  }


  getCountrydata() {
    return this.http.get(`${this.baseUrl2}/countries/all`, { 'headers': this.getHeader() }).pipe(
      map((res: any) => {
        return res['data'];
      })
    );
  }


  getStatedata(code: any) {
    return this.http.post(`${this.baseUrl2}/states/all`, { "Country": code }, { 'headers': this.getHeader() }).pipe(
      map((res: any) => {
        return res['data'];
      })
    );
  }



  deleteCustomer(id: any) {
    const params = new HttpParams()
      .set('id', id.toString());
    return this.http.post(`${this.baseUrl2}/businesspartner/delete`, { id: id }, { 'headers': this.getHeader() }).pipe(
      map((res: any) => {
      })
    );
  }


  getOneCustomerdata(idd: number) {
    return this.http.post(`${this.baseUrl2}/businesspartner/one`, { "CardCode": idd }, { 'headers': this.getHeader() }).pipe(
      map((res: any) => {
        return res['data'];
      })
    );
  }





  getCustomerBranchdata(idd: String) {
    return this.http.post(`${this.baseUrl2}/businesspartner/branch/all`, { "BPCode": idd,"PageNo": 1,
    "maxItem": 'All',
    "order_by_field": 'id',
    "order_by_value": 'asc',
    "SearchText": "",
    "field": {}  }, { 'headers': this.getHeader() }).pipe(
      map((res: any) => {
        return res['data'];
      })
    );
  }


  storeBpBranch(customer: Branch) {
    //console.log(customer);
    return this.http.post(`${this.baseUrl2}/businesspartner/branch/create`, customer, { 'headers': this.getHeader() }).pipe(
      map((res: any) => {
        return res['data'];
      })
    );
  }

  storeBpBranch1(customer: Branch) {
    //console.log(customer);
    return this.http.post(`${this.baseUrl2}/businesspartner/branch/create`, customer, { 'headers': this.getHeader() }).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  storeEditBpBranch(customer: EditBranch) {
    //console.log(customer);
    return this.http.post(`${this.baseUrl2}/businesspartner/branch/update`, customer, { 'headers': this.getHeader() }).pipe(
      map((res: any) => {
        return res['data'];
      })
    );
  }
  storeEditBpBranch1(customer: EditBranch) {
    //console.log(customer);
    return this.http.post(`${this.baseUrl2}/businesspartner/branch/update`, customer, { 'headers': this.getHeader() }).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  getOneBpBranch1(id: any) {
    //console.log(customer);
    return this.http.post(`${this.baseUrl2}/businesspartner/branch/one`, {id:id}, { 'headers': this.getHeader() }).pipe(
      map((res: any) => {
        return res;
      })
    );
  }
  storeEditContactPerson(customer: updateContactPerson) {
    //console.log(customer);
    return this.http.post(`${this.baseUrl2}/businesspartner/employee/update`, customer, { 'headers': this.getHeader() }).pipe(
      map((res: any) => {
        return res;
      })
    );
  }


  deleteCustomerBranch(id: any) {
    const params = new HttpParams()
      .set('id', id.toString());
    return this.http.post(`${this.baseUrl2}/businesspartner/branch/delete`, { id: id }, { 'headers': this.getHeader() }).pipe(
      map((res: any) => {
      })
    );
  }


  deleteCustomerContactPerson(id: any) {
    const params = new HttpParams()
      .set('id', id.toString());
    return this.http.post(`${this.baseUrl2}/businesspartner/employee/delete`, { id: id }, { 'headers': this.getHeader() }).pipe(
      map((res: any) => {
      })
    );
  }

  EditCustomer(customer: EditCustomer) {
    //console.log(customer);
    return this.http.post(`${this.baseUrl2}/businesspartner/update`, customer, { 'headers': this.getHeader() }).pipe(
      map((res: any) => {
        return res;
      })
    );
  }


  getContactPersone(CardCode: any) {
    return this.http.post(`${this.baseUrl2}/businesspartner/employee/all`, { CardCode: CardCode }, { 'headers': this.getHeader() }).pipe(
      map((res: any) => {
        return res['data'];
      })
    );
  }
  getCampaignnameList() {
    return this.http.get(`${this.baseUrl2}/camp/sourcecampset`, { 'headers': this.getHeader() }).pipe(
      map((res: any) => {
        return res['data'];
      })
    );
  }

  getContactPersoneone(CardCode: any) {
    return this.http.post(`${this.baseUrl2}/businesspartner/employee/one`, { id: CardCode }, { 'headers': this.getHeader() }).pipe(
      map((res: any) => {
        return res['data'];
      })
    );
  }


  storeContractPersone(ContactPerson: ContactPerson) {
    //  //console.log(ContactPerson.Title);
    return this.http.post(`${this.baseUrl2}/businesspartner/employee/create`, ContactPerson, { 'headers': this.getHeader() }).pipe(
      map((res: any) => {
        //console.log(res);
        return res;
      })
    );
  }

  campaignCreateMember(member: any) {
    return this.http.post(`${this.baseUrl2}/camp/create_member`, member, { 'headers': this.getHeader() }).pipe(
      map((res: any) => {
        return res;
      })
    );
  }


  // Quotation

  getQuotationfilterdata() {
    return this.http.post(`${this.baseUrl2}/quotation/all_filter`, { "SalesPersonCode": this.SalesEmployeeCode }, { 'headers': this.getHeader() }).pipe(
      map((res: any) => {
        return res['data'];
      })
    );
    // return this.http.get(`${this.baseUrl2}/quotation/all`).pipe(
    //   map((res: any) => {
    //     return res['data'];
    //   })
    // );
  }

  getQuotationdata() {

    return this.http.get(`${this.baseUrl2}/quotation/all`, { 'headers': this.getHeader() }).pipe(
      map((res: any) => {
        return res['data'];
      })
    );
  }


  getOneQuotationdata(idd: number) {
    return this.http.post(`${this.baseUrl2}/quotation/one`, { "id": idd }, { 'headers': this.getHeader() }).pipe(
      map((res: any) => {
        return res['data'];
      })
    );
  }



  getQuotationItemdata(pagenumber: any, CatID?: any) {
    return this.http.post(`${this.baseUrl2}/item/all`, {
      "PageNo": pagenumber,
      "maxItem": 10,
      "CatID": CatID
    }, { 'headers': this.getHeader() }).pipe(
      map((res: any) => {
        return res['data'];
      })
    );
  }

  storeQuotation(Quotation: Quotation) {
    console.log(Quotation);
    Quotation.AddressExtension = JSON.stringify(Quotation.AddressExtension);
    Quotation.DocumentLines = JSON.stringify(Quotation.DocumentLines);
    const uploadData = new FormData();
    for (let i = 0; i < Object.keys(Quotation).length; i++) {
      uploadData.append(Object.keys(Quotation)[i], Object.values(Quotation)[i]);
    }
    if (Quotation.Attach != '') {
      uploadData.delete('Attach');
      for (var i = 0; i < Quotation.Attach.length; i++) {
        uploadData.append("Attach", Quotation.Attach[i]);
      }
    }
    return this.http.post(`${this.baseUrl2}/quotation/create`, uploadData, { 'headers': this.getHeader() }).pipe(
      map((res: any) => {
        return res;
      })
    );
  }


  editQuotation(Quotation: EditQuotation) {
    //console.log(Quotation);
    return this.http.post(`${this.baseUrl2}/quotation/update`, Quotation, { 'headers': this.getHeader() }).pipe(
      map((res: any) => {
        return res;
      })
    );
  }



  // Orders

  getOrdersfilterdata() {
    return this.http.post(`${this.baseUrl2}/order/all_filter`, { "SalesPersonCode": this.SalesEmployeeCode }, { 'headers': this.getHeader() }).pipe(
      map((res: any) => {
        return res['data'];
      })
    );
  }

  getOrdersdata() {
    return this.http.get(`${this.baseUrl2}/order/all`, { 'headers': this.getHeader() }).pipe(
      map((res: any) => {
        return res['data'];
      })
    );
  }


  storeOrders(Quotation: Orders) {
    console.log(Quotation);
    return this.http.post(`${this.baseUrl2}/order/create`, Quotation, { 'headers': this.getHeader() }).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  addEditOrders(Quotation: Orders,isEdit:boolean) {
    console.log(Quotation);
    // console.log(Quotation);
    Quotation.AddressExtension = JSON.stringify(Quotation.AddressExtension);
    Quotation.DocumentLines = JSON.stringify(Quotation.DocumentLines);
    const uploadData = new FormData();
    for (let i = 0; i < Object.keys(Quotation).length; i++) {
      uploadData.append(Object.keys(Quotation)[i], Object.values(Quotation)[i]);
    }
    if (Quotation.Attach != '') {
      uploadData.delete('Attach');
      for (var i = 0; i < Quotation.Attach.length; i++) {
        uploadData.append("Attach", Quotation.Attach[i]);
      }
    }
    return this.http.post(`${this.baseUrl2}/order/${isEdit ? 'update' : 'create'}`, uploadData, { 'headers': this.getHeader() }).pipe(
      map((res: any) => {
        return res;
      })
    );
  }


  addEditInvoice(Quotation: Orders,isEdit:boolean) {
    //console.log(Quotation);
    return this.http.post(`${this.baseUrl2}/invoice/${isEdit ? 'update' : 'create'}`, Quotation, { 'headers': this.getHeader() }).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  getOneOrderdata(idd: number) {
    return this.http.post(`${this.baseUrl2}/order/one`, { "id": idd }, { 'headers': this.getHeader() }).pipe(
      map((res: any) => {
        return res['data'];
      })
    );
  }




  editOrder(Quotation: EditOrders) {
    //console.log(Quotation);
    return this.http.post(`${this.baseUrl2}/order/update`, Quotation, { 'headers': this.getHeader() }).pipe(
      map((res: any) => {
        return res;
      })
    );
  }



  getAllEventTaskdata(date: any) {
    return this.http.post(`${this.baseUrl2}/activity/all_filter`, { Emp: this.UserId, date: date }, { 'headers': this.getHeader() }).pipe(
      map((res: any) => {
        return res['data'];
      })
    );
  }



  // logininsap(){


  //   const httpOptions = {
  //     headers: new HttpHeaders({
  //       'Content-Type': 'application/json',
  //       'Access-Control-Allow-Origin': '*',
  //       'Access-Control-Allow-Headers': 'Content-Type',
  //       'Access-Control-Allow-Methods': 'POST'
  //     }),
  //   };


  //   return this.http.post(`http://103.234.187.86:8001/inventory/getinventory`, {CompanyDB:"INTERNAL_APP",Password:"manager",UserName:"manager"}, httpOptions).pipe(
  //     map((res: any) => {
  //       return res['data'];
  //     })
  //   );
  // }

  // storeTarget(Quotation: Target) {
  //   //console.log(Quotation);
  //   return this.http.post(`${this.baseUrl2}/employee/targetyr_create`, [Quotation]).pipe(
  //     map((res: any) => {
  //       return res['data'];
  //     })
  //   );
  // }

  /* store target assignment added by millan on 03-May-2022 */
  storeTargetAssignment(insTar: TargeYear) {
    return this.http.post(`${this.baseUrl2}/employee/targetyr_create`, [insTar], { 'headers': this.getHeader() }).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  storeTargetAssignmentMulti(insTar: any) {
    //console.log(insTar);
    return this.http.post(`${this.baseUrl2}/employee/targetyr_create`, insTar, { 'headers': this.getHeader() }).pipe(
      map((res: any) => {
        return res;
      })
    );
  }
  /* store target assignment added by millan on 03-May-2022 */

  /* fetch target assignment details added by millan on 04-May-2022 */
  getTargetAssignedData() {
    return this.http.post(`${this.baseUrl2}/employee/targetyr_all`, { "SalesPersonCode": this.SalesEmployeeCode }, { 'headers': this.getHeader() }).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  getTargetAssignedOne(id: any) {
    return this.http.post(`${this.baseUrl2}/employee/targetyr_one`, { "id": id }, { 'headers': this.getHeader() }).pipe(
      map((res: any) => {
        return res['data'];
      })
    );
  }

  getTargetQuoterData(idd: any) {
    return this.http.post(`${this.baseUrl2}/employee/targetqtm_all`, { "YearTarget": idd }, { 'headers': this.getHeader() }).pipe(
      map((res: any) => {
        return res['data'];
      })
    );
  }


  getTargetEmployee(NewSalesEmpCode: any) {
    return this.http.post(`${this.baseUrl2}/employee/all_filter_reportingto`, { "SalesEmployeeCode": NewSalesEmpCode }, { 'headers': this.getHeader() }).pipe(
      map((res: any) => {
        return res['data'];
      })
    );

  }

  getTargetEmployeeFill(TargeEmployeGet: TargeEmployeGet) {
    // //console.log(TargeEmployeGet);
    return this.http.post(`${this.baseUrl2}/employee/targetyr_all_filter`, TargeEmployeGet, { 'headers': this.getHeader() }).pipe(
      map((res: any) => {
        return res['data'];
      })
    );

  }
  /* fetch target assignment details added by millan on 04-May-2022 */


  // storeTarget(Quotation: Target) {
  //   //console.log(Quotation);
  //   return this.http.post(`${this.baseUrl2}/employee/target`, Quotation).pipe(
  //     map((res: any) => {
  //       return res['data'];
  //     })
  //   );
  // }

  // CloseTarget(idd: any) {
  //   //console.log(idd);
  //   return this.http.post(`${this.baseUrl2}/employee/targetqty_close`, { "id": idd }).pipe(
  //     map((res: any) => {
  //       return res['data'];
  //     })
  //   );
  // }


  tenderStoreQuoter(TargeQuoter: TargeQuoter) {
    //console.log(TargeQuoter);
    return this.http.post(`${this.baseUrl2}/employee/targetqtm_create`, TargeQuoter, { 'headers': this.getHeader() }).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  allassignmentData(date: any) {
    return this.http.post(`${this.baseUrl2}/employee/target_all`, { Emp: this.UserId, date: date }, { 'headers': this.getHeader() }).pipe(
      map((res: any) => {
        return res['data'];
      })
    );
  }

  // Delivery

  editshipaddress(shipaddress: EditAddress) {
    //console.log(shipaddress);
    return this.http.post(`${this.baseUrl2}/order/update`, shipaddress, { 'headers': this.getHeader() }).pipe(
      map((res: any) => {
        // return res['data'];
        return res;
      })
    );
  }

  getDeliverydata(ordertype: string) {
    return this.http.post(`${this.baseUrl2}/order/delivery`, { Type: ordertype, SalesEmployeeCode: this.SalesEmployeeCode }, { 'headers': this.getHeader() }).pipe(
      map((res: any) => {
        return res['data'];
      })
    );
  }

  adddeliveryLog(logdd: AddLog) {

    //  //console.log(bridge2)
    return this.http.post(`${this.baseUrl2}/order/ord_log_create`, logdd, { 'headers': this.getHeader() }).pipe(
      map((res: any) => {
        return res;
      })
    );


  }


  // invoice

  gererateinvoice(id: any) {
    const params = new HttpParams()
      .set('id', id.toString());
    return this.http.post(`${this.baseUrl2}/invoice/create`, { oid: id }, { 'headers': this.getHeader() }).pipe(
      // return this.http.post(`http://103.107.67.186:8000/static/html/quotation.html`, { oid: id }).pipe(
      map((res: any) => {
      })
    );
  }


  getinvoicedata() {
    return this.http.get(`${this.baseUrl2}/invoice/all`, { 'headers': this.getHeader() }).pipe(
      map((res: any) => {
        return res['data'];
      })
    );
  }


  getOneInvoicedata(idd: number) {
    return this.http.post(`${this.baseUrl2}/invoice/one`, { "id": idd }, { 'headers': this.getHeader() }).pipe(
      map((res: any) => {
        return res['data'];
      })
    );
  }



  getwarehousedata() {
    return this.http.get(`${this.baseUrl2}/warehouse/all`, { 'headers': this.getHeader() }).pipe(
      map((res: any) => {
        return res['data'];
      })
    );
  }


  storeWarehouse(Warehouse: Warehouse) {
    //console.log(Warehouse);
    return this.http.post(`${this.baseUrl2}/warehouse/create`, Warehouse, { 'headers': this.getHeader() }).pipe(
      map((res: any) => {
        return res['data'];
      })
    );
  }




  getproductdata() {
    return this.http.get(`${this.baseUrl2}/product/all`, { 'headers': this.getHeader() }).pipe(
      map((res: any) => {
        return res['data'];
      })
    );
  }


  storeProduct(Product: Product) {
    //console.log(Product);
    return this.http.post(`${this.baseUrl2}/product/create`, Product, { 'headers': this.getHeader() }).pipe(
      map((res: any) => {
        return res['data'];
      })
    );
  }



  getInventoryCategorydata() {
    return this.http.get(`${this.baseUrl2}/item/category_all`, { 'headers': this.getHeader() }).pipe(
      map((res: any) => {
        return res['data'];
      })
    );
  }

  updateInventory(Category: EditItem) {
    const uploadData = new FormData();
    for (let i = 0; i < Object.keys(Category).length; i++) {

      uploadData.append(Object.keys(Category)[i], Object.values(Category)[i]);
    }

    if (Category.ItemImageURL.length != 0) {

      uploadData.delete('CategoryImageURL');
      for (var i = 0; i < Category.ItemImageURL.length; i++) {
        uploadData.append("ItemImageURL", Category.ItemImageURL[i]);
      }
    }
    return this.http.post(`${this.baseUrl2}/item/update`, uploadData, { 'headers': this.getHeader() }).pipe(
      map((res: any) => {
        return res;
      })
    );
  }


  storeInventoryCategory(Category: Category, isEdit: boolean) {
    //console.log(Category);
    const uploadData = new FormData();
    for (let i = 0; i < Object.keys(Category).length; i++) {

      uploadData.append(Object.keys(Category)[i], Object.values(Category)[i]);
    }

    if (Category.CategoryImageURL.length != 0) {

      uploadData.delete('CategoryImageURL');
      for (var i = 0; i < Category.CategoryImageURL.length; i++) {
        uploadData.append("CategoryImageURL", Category.CategoryImageURL[i]);
      }
    }
    return this.http.post(`${this.baseUrl2}/item/category_${isEdit ? 'update' : 'create'}`, uploadData, { 'headers': this.getHeader() }).pipe(
      map((res: any) => {
        return res;
        // return res['data'];
      })
    );
  }
  getoneInventoryCategory(id: any) {
    //console.log(Category);
    return this.http.post(`${this.baseUrl2}/item/category_one`, { id: id }, { 'headers': this.getHeader() }).pipe(
      map((res: any) => {
        return res['data'];
      })
    );
  }

  deleteInventoryCategory(id: any) {
    const params = new HttpParams()
      .set('id', id.toString());
    return this.http.post(`${this.baseUrl2}/item/category_delete`, { id: id }, { 'headers': this.getHeader() }).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  getInventorydata(idd: any) {
    return this.http.post(`${this.baseUrl2}/item/all`, { CatID: idd }, { 'headers': this.getHeader() }).pipe(
      map((res: any) => {
        return res['data'];
      })
    );
  }


  getInventoryOnedata(idd: any) {
    return this.http.post(`${this.baseUrl2}/item/one`, { id: idd }, { 'headers': this.getHeader() }).pipe(
      map((res: any) => {
        return res['data'];
      })
    );
  }


  storeInventory(Category: Item) {
    // console.log(Category);
    Category.AdditionalInfo = JSON.stringify(Category.AdditionalInfo);
    const uploadData = new FormData();
    for (let i = 0; i < Object.keys(Category).length; i++) {

      uploadData.append(Object.keys(Category)[i], Object.values(Category)[i]);
    }

    if (Category.ItemImageURL.length != 0) {

      uploadData.delete('ItemImageURL');
      for (var i = 0; i < Category.ItemImageURL.length; i++) {
        uploadData.append("ItemImageURL", Category.ItemImageURL[i]);
      }
    }
    return this.http.post(`${this.baseUrl2}/item/create`, uploadData, { 'headers': this.getHeader() }).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  storeInventory2(Category: Item,isEdit:boolean) {
    // console.log(Category);
    Category.AdditionalInfo = JSON.stringify(Category.AdditionalInfo);
    const uploadData = new FormData();
    for (let i = 0; i < Object.keys(Category).length; i++) {

      uploadData.append(Object.keys(Category)[i], Object.values(Category)[i]);
    }

    if (Category.ItemImageURL.length != 0) {

      uploadData.delete('ItemImageURL');
      for (var i = 0; i < Category.ItemImageURL.length; i++) {
        uploadData.append("ItemImageURL", Category.ItemImageURL[i]);
      }
    }
    return this.http.post(`${this.baseUrl2}/item/${isEdit ? 'update' : 'create'}`, uploadData, { 'headers': this.getHeader() }).pipe(
      map((res: any) => {
        return res;
      })
    );
  }


  getPaymentTermsdata() {
    return this.http.get(`${this.baseUrl2}/paymenttermstypes/all`, { 'headers': this.getHeader() }).pipe(
      map((res: any) => {
        return res['data'];
      })
    );
  }


  getPaymentTermsOnedata(id:any) {
    return this.http.post(`${this.baseUrl2}/paymenttermstypes/one`,{id:id}, { 'headers': this.getHeader() }).pipe(
      map((res: any) => {
        return res['data'];
      })
    );
  }

  /* fetch industry data */
  getIndustryData() {
    return this.http.get(`${this.baseUrl2}/industries/all`, { 'headers': this.getHeader() }).pipe(
      map((res: any) => {
        return res['data'];
      })
    );
  }
  getSmtpSettingData() {
    return this.http.get(`${this.baseUrl2}/smtp/all`, { 'headers': this.getHeader() }).pipe(
      map((res: any) => {
        return res['data'];
      })
    );
  }
  getCustomerTypeData() {
    return this.http.get(`${this.baseUrl2}/businesspartner/alltype`, { 'headers': this.getHeader() }).pipe(
      map((res: any) => {
        return res['data'];
      })
    );
  }
  getOpportunityTypeData() {
    return this.http.get(`${this.baseUrl2}/opportunity/alltype`, { 'headers': this.getHeader() }).pipe(
      map((res: any) => {
        return res['data'];
      })
    );
  }

  /* fetch industry data */

  /* create industry data */
  insertIndustry(indusadd: any, isEdit: boolean) {
    return this.http.post(`${this.baseUrl2}/industries/${isEdit ? 'update' : 'create'}`, indusadd, { 'headers': this.getHeader() }).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  //change


  insertSmtp(indusadd: addSmtp) {
    return this.http.post(`${this.baseUrl2}/smtp/create`, indusadd, { 'headers': this.getHeader() }).pipe(
      map((res: any) => {
        //console.log("ap", res)
        return res;
      })
    );
  }
  insertOpportunityType(indusadd: any, isEdit: boolean) {
    return this.http.post(`${this.baseUrl2}/opportunity/${isEdit ? 'updatetype' : 'createtype'}`, indusadd, { 'headers': this.getHeader() }).pipe(
      map((res: any) => {
        return res;
      })
    );
  }
  insertCustomerType(indusadd: any, isEdit: boolean) {
    return this.http.post(`${this.baseUrl2}/businesspartner/${isEdit ? 'updatetype' : 'createtype'}`, indusadd, { 'headers': this.getHeader() }).pipe(
      map((res: any) => {
        return res['data'];
      })
    );
  }




  getCampaignSetData() {
    return this.http.get(`${this.baseUrl2}/campset/all`, { 'headers': this.getHeader() }).pipe(
      map((res: any) => {

        return res['data'];
      })
    );
  }


  insertCampaignSet(camp: Compaign) {
    //console.log(camp)
    return this.http.post(`${this.baseUrl2}/campset/create`, camp, { 'headers': this.getHeader() }).pipe(
      map((res: any) => {
        // //console.log(res)
        return res;
      })
    );
  }

  updateCampaignSet(camp: EditCompaign) {
    //console.log(camp)
    return this.http.post(`${this.baseUrl2}/campset/update`, camp, { 'headers': this.getHeader() }).pipe(
      map((res: any) => {
        //console.log("up ", res)
        return res;
      })
    );
  }

  updateCampaign(camp: editCampaignNameCreate) {
    //console.log(camp)
    const uploadData = new FormData();
    for (let i = 0; i < Object.keys(camp).length; i++) {
      uploadData.append(Object.keys(camp)[i], Object.values(camp)[i]);
    }
    return this.http.post(`${this.baseUrl2}/camp/update`, uploadData, { 'headers': this.getHeader() }).pipe(
      map((res: any) => {
        //console.log("zz ", res)
        return res;
      })
    );
  }

  // getCampaignNameData() {
  //   return this.http.get(`${this.baseUrl2}/camp/all`).pipe(
  //   map((res: any) => {
  //     // //console.log(res)

  //     return res['data'];
  //   })
  // );
  // }

  getCampaignNameData(campn: any) {
    // //console.log("id",campn)
    return this.http.post(`${this.baseUrl2}/camp/filter_campaign`, { CampaignSetId: campn }, { 'headers': this.getHeader() }).pipe(
      map((res: any) => {
        // //console.log("ssaSa",res)

        return res['data'];
      })
    );
  }
  // getcustmrAttach(idd: number) {
  //   return this.http.post(`${this.baseUrl2}/bp_attachments`, { "cust_id": idd }).pipe(map((res: any) => {
  //     return res;
  //   }))
  // }

  // insertCustmerAttach(cstattach: cutomerAttach) {
  //   const uploadData = new FormData();
  //   for (let i = 0; i < Object.keys(cstattach).length; i++) {
  //     uploadData.append(Object.keys(cstattach)[i], Object.values(cstattach)[i]);
  //   }
  //   return this.http.post(`${this.baseUrl2}/bp_attachment_create`, uploadData).pipe(
  //     map((res: any) => {
  //       //console.log(cstattach, res)
  //       return res;
  //     })
  //   );
  // }

  insertCampaignName(campn: CampaignNameCreate) {
    const uploadData = new FormData();
    for (let i = 0; i < Object.keys(campn).length; i++) {
      uploadData.append(Object.keys(campn)[i], Object.values(campn)[i]);
    }
    return this.http.post(`${this.baseUrl2}/camp/create`, uploadData, { 'headers': this.getHeader() }).pipe(
      map((res: any) => {
        //console.log(campn, res)
        return res;
      })
    );
  }

  campaignAction(campn: UpdateAction) {
    return this.http.post(`${this.baseUrl2}/camp/status`, campn, { 'headers': this.getHeader() }).pipe(
      map((res: any) => {
        return res;
      })
    );
  }
  campaignSetAction(campn: UpdateCampaignSetStatus) {
    return this.http.post(`${this.baseUrl2}/campset/status`, campn, { 'headers': this.getHeader() }).pipe(
      map((res: any) => {
        return res;
      })
    );
  }
  /* create industry data ends */

  /* fetch Payment Term data */
  getPaymentTermsData() {
    return this.http.get(`${this.baseUrl2}/paymenttermstypes/all`, { 'headers': this.getHeader() }).pipe(
      map((res: any) => {
        return res['data'];
      })
    );
  }
  /* fetch Payment Term data */

  /* insert Payment Term data */
  insertPaymentTerms(pyadd: PaymentTerms, isEdit: boolean) {
    return this.http.post(`${this.baseUrl2}/paymenttermstypes/${isEdit ? 'update' : 'create'}`, pyadd, { 'headers': this.getHeader() }).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  storeleadfollow2(Follow: AddFollow2) {
    //console.log(Follow);
    return this.http.post(`${this.baseUrl2}/activity/followup`, Follow, { 'headers': this.getHeader() }).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  TaskStatus(bridge2: CompleteStages) {
    //console.log(bridge2);

    return this.http.post(`${this.baseUrl2}/activity/status`, { "id": bridge2 }, { 'headers': this.getHeader() }).pipe(
      map((res: any) => {
        return res['data'];
      })
    );
  }


  getLeadTypedata() {
    return this.http.get(`${this.baseUrl2}/lead/type_all`, { 'headers': this.getHeader() }).pipe(
      map((res: any) => {
        return res['data'];
      })
    );
  }

  getAllEventTaskdata2(date: any) {
    return this.http.post(`${this.baseUrl2}/activity/all_filter_by_date`, { Emp: this.UserId, date: date }, { 'headers': this.getHeader() }).pipe(
      map((res: any) => {
        return res['data'];
      })
    );
  }


  deletecustomerAttachment(itemid: any, ctmrid: any) {
    // const params = new HttpParams().set('id', id.toString());
    return this.http.post(`${this.baseUrl2}/businesspartner/bp_attachment_delete`, { cust_id: ctmrid, id: itemid }, { 'headers': this.getHeader() }).pipe(
      map((res: any) => {
      })
    );
  }

  getcustmrAttach(id: any) {
    // //console.log(idd)
    return this.http.post(`${this.baseUrl2}/businesspartner/bp_attachments`, { "cust_id": id }, { 'headers': this.getHeader() }).pipe(map((res: any) => {
      //console.log("ssaSa", res)
      return res;
    }))
  }





  opportunitydetailsAttach(opprtu: OppoAttach) {
    //  //console.log(bridge2)
    const uploadData = new FormData();
    for (let i = 0; i < Object.keys(opprtu).length; i++) {

      uploadData.append(Object.keys(opprtu)[i], Object.values(opprtu)[i]);
    }

    if (opprtu.Attach.length != 0) {

      uploadData.delete('Attach');
      for (var i = 0; i < opprtu.Attach.length; i++) {
        uploadData.append("Attach", opprtu.Attach[i]);
      }
    }
    return this.http.post(`${this.baseUrl2}/opportunity/opp_attachment_create`, uploadData, { 'headers': this.getHeader() }).pipe(
      map((res: any) => {
        //console.log("zz ", res)
        return res;
      })
    );
  }

  deleteoppoAttachment(oppId: any, id: any) {
    // const params = new HttpParams().set('id', id.toString());
    return this.http.post(`${this.baseUrl2}/opportunity/opp_attachment_delete`, { oppId: oppId, id: id }, { 'headers': this.getHeader() }).pipe(
      map((res: any) => {
        return res;
      })
    );
  }


  quotationdetailsAttach(quota: QuoAttach) {
    //  //console.log(bridge2)
    const uploadData = new FormData();
    for (let i = 0; i < Object.keys(quota).length; i++) {

      uploadData.append(Object.keys(quota)[i], Object.values(quota)[i]);
    }

    if (quota.Attach.length != 0) {

      uploadData.delete('Attach');
      for (var i = 0; i < quota.Attach.length; i++) {
        uploadData.append("Attach", quota.Attach[i]);
      }
    }
    return this.http.post(`${this.baseUrl2}/quotation/quot_attachment_create`, uploadData, { 'headers': this.getHeader() }).pipe(
      map((res: any) => {
        //console.log("zz ", res)
        return res;
      })
    );
  }

  deletequotationAttachment(quotId: any, id: any) {
    // const params = new HttpParams().set('id', id.toString());
    return this.http.post(`${this.baseUrl2}/quotation/quot_attachment_delete`, { quotId: quotId, id: id }, { 'headers': this.getHeader() }).pipe(
      map((res: any) => {
        return res;
      })
    );
  }


  orderdetailsAttach(orderattach: OrAttach) {
    //  //console.log(bridge2)
    const uploadData = new FormData();
    for (let i = 0; i < Object.keys(orderattach).length; i++) {

      uploadData.append(Object.keys(orderattach)[i], Object.values(orderattach)[i]);
    }

    if (orderattach.Attach.length != 0) {

      uploadData.delete('Attach');
      for (var i = 0; i < orderattach.Attach.length; i++) {
        uploadData.append("Attach", orderattach.Attach[i]);
      }
    }
    return this.http.post(`${this.baseUrl2}/order/ord_attachment_create`, uploadData, { 'headers': this.getHeader() }).pipe(
      map((res: any) => {
        //console.log("zz ", res)
        return res;
      })
    );
  }

  deleteorderAttachment(ordId: any, id: any) {
    // const params = new HttpParams().set('id', id.toString());
    return this.http.post(`${this.baseUrl2}/order/ord_attachment_delete`, { ordId: ordId, id: id }, { 'headers': this.getHeader() }).pipe(
      map((res: any) => {
        return res;
      })
    );
  }


  insertCustmerAttach(cstattach: cutomerAttach) {
    const uploadData = new FormData();
    //console.log("uploadData", uploadData)
    //console.log('attachment',cstattach);


    for (let i = 0; i < Object.keys(cstattach).length; i++) {
      uploadData.append(Object.keys(cstattach)[i], Object.values(cstattach)[i]);
    }
    if (cstattach.Attach.length != 0) {

      uploadData.delete('Attach');
      for (var i = 0; i < cstattach.Attach.length; i++) {
        uploadData.append("Attach", cstattach.Attach[i]);
      }
    }

    //console.log("uploadData1", uploadData)

    return this.http.post(`${this.baseUrl2}/businesspartner/bp_attachment_create`, uploadData, { 'headers': this.getHeader() }).pipe(
      map((res: any) => {
        //console.log(cstattach, res)
        return res;
      })
    );
  }

  updateCustmerAttach(updatecutomerAttach1: updatecutomerAttach) {
    //console.log(updatecutomerAttach1);
    const uploadData = new FormData();
    for (let i = 0; i < Object.keys(updatecutomerAttach1).length; i++) {
      uploadData.append(Object.keys(updatecutomerAttach1)[i], Object.values(updatecutomerAttach1)[i]);
    }
    return this.http.post(`${this.baseUrl2}/businesspartner/bp_attachment_update`, uploadData, { 'headers': this.getHeader() }).pipe(

      map((res: any) => {
        //console.log(res)
        return res['data'];
      })
    );
  }



  // Attachment start

  leadgetlist(idd: number | any) {
    return this.http.post(`${this.baseUrl2}/lead/lead_attachments`, { "lead_id": idd }, { 'headers': this.getHeader() }).pipe(
      map((res: any) => {
        return res['data'];
      })
    );
  }

  deleteattach(id: any, leadid: number | any) {
    return this.http.post(`${this.baseUrl2}/lead/lead_attachment_delete`, { "id": id, "lead_id": leadid }, { 'headers': this.getHeader() }).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  leadAttach(lead_id: any, CreatedBy: any, CreateDate: any, CreateTime: any, Attach: any) {
    const uploadData = new FormData();
    uploadData.append('lead_id', lead_id);
    uploadData.append('CreatedBy', CreatedBy);
    uploadData.append('CreateDate', CreateDate);
    uploadData.append('CreateTime', CreateTime);

    for (let i = 0; i < Attach.length; i++) {
      uploadData.append('Attach', Attach[i]);
    }

    return this.http.post(`${this.baseUrl2}/lead/lead_attachment_create`, uploadData, { 'headers': this.getHeader() }).pipe(
      map((res: any) => {
        //console.log("respose", res)
        return res;
      })
    );
  }

  // attachment close

  //start notification
  getNotification() {
    return this.http.post(`${this.baseUrl2}/notification/all`, { Emp: this.UserId }, { 'headers': this.getHeader() }).pipe(
      map((res: any) => {
        return res['data'];
      })
    );
  }

  readNotification(id: any) {
    return this.http.post(`${this.baseUrl2}/notification/read`, { id: id }, { 'headers': this.getHeader() }).pipe(
      map((res: any) => {
        // //console.log(res)
      })
    );
  }

  getonelocation(idd: number, date: any) {
    return this.http.post(`${this.baseUrl2}/activity/map_filter`, { "Emp_Id": idd, "UpdateDate": date, "shape": "meeting" }, { 'headers': this.getHeader() }).pipe(map((res: any) => {
      return res['data'];
    }))
  }

  getonelocationall(idd: number, date: any) {
    return this.http.post(`${this.baseUrl2}/activity/map_filter`, { "Emp_Id": idd, "UpdateDate": date, "shape": "" }, { 'headers': this.getHeader() }).pipe(map((res: any) => {
      return res['data'];
    }))
  }

  getAllLocation() {
    return this.http.get(`${this.baseUrl2}/activity/map_filter_last_location`, { 'headers': this.getHeader() }).pipe(
      map((res: any) => {

        return res['data'];
      })
    );
  }

  userRole = ['manager', 'salesman'];
  userStatus: any[] = [{ name: 'Active', value: 'tYES', num: 1 }, { name: 'Inactive', value: 'tNO', num: 0 }];
  TypeofExpense: any[] = ['Hotel Stay', 'Travel'];
  leadStatus = ['Follow Up', 'New', 'Qualified', 'Hold','Dead','Prospect'];
  LeadPriority = ['High', 'Low', 'Medium'];
  ModeOfCommunication = ['Call', 'Whatsapp', 'SMS', 'Email', 'Visit'];
  paginationOption: any[] = [{ name: '10', value: 10 }, { name: '20', value: 20 }, { name: '50', value: 50 }, { name: 'All', value: 1000 }];
  ActivityType = ['Event', 'Task'];
  Rating: any[] = [{ name: 'Rating 1', value: 1 }, { name: 'Rating 2', value: 2 }, { name: 'Rating 3', value: 3 }, { name: 'Rating 4', value: 4 }, { name: 'Rating 5', value: 5 }];
  ShippingType = ['Motor Express', 'UPS Ground', 'UPS Red', 'Fedex EM', 'Fedex ON'];
  CampaignAccess = ['Public', 'Private'];
  CampaignOpportunityType = ['New Business', 'Existing Business'];
  CampaignFrequency = ['Once', 'Weekly', 'Daily', 'Monthly'];
  CampaignDay = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  CampaignDate = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31'];
  OpportunityProbability = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100];
  TaskProgressStatus: any[] = [{ name: 'In Progress', value: 'inprogress' }, { name: 'Complete', value: 'complete' }];
  OrderStage = [{ name: 'Sold', key: 'sos_Sold' }, { name: 'Won', key: 'sos_Won' }];
  TransactionMode = ['Online', 'Bank Transfer', 'Card', 'Cash'];
  TargetYear = [2022, 2023, 2024, 2025, 2026];
  CampaignSource = ['facebook', 'linkedin', 'instagram']

  // New Apis By Rahul
  findRemovedOrEmptyKeys(originalObject: any, modifiedObject: any) {
    const removedOrEmptyKeys = [];

    // Check for removed keys
    for (const key in originalObject) {
      if (!(key in modifiedObject)) {
        removedOrEmptyKeys.push(key);
      }
    }

    // Check for empty values in modified object
    for (const key in modifiedObject) {
      if (!modifiedObject[key]) {
        removedOrEmptyKeys.push(key);
      }
    }

    return removedOrEmptyKeys;
  }
  checkKeyEpty(datakey: any) {
    if (datakey == '') {
      return undefined
    }
    else {
      return datakey
    }
  }


  getEmployeeByPagination(pagination: any, searchValue: any, filteruser: any, filteruserposition: any, order_by_field: any, order_by_value: any, filteruserreporting?: any) {
    filteruser = this.checkKeyEpty(filteruser);
    filteruserposition = this.checkKeyEpty(filteruserposition);
    filteruserreporting = this.checkKeyEpty(filteruserreporting);
    return this.http.post(`${this.baseUrl2}/employee/all_filter_page`, {
      "SalesPersonCode": this.SalesEmployeeCode,
      "PageNo": pagination.PageNo,
      "maxItem": pagination.maxItem,
      "order_by_field": order_by_field,
      "order_by_value": order_by_value,
      "SearchText": searchValue, "field": {
        "role": filteruser,
        "Active": filteruserposition,
        "reportingTo__in": filteruserreporting,
        // 'departement': '2',
        'departement_id__in': [1, 2],
      }
    }, { 'headers': this.getHeader() }).pipe(
      map((res: any) => {
        // //console.log(res)
        return res;
      })
    );

  }


  getEmployeeForDropDown(pagination: any, searchValue: any, order_by_field: any, order_by_value: any) {
    return this.http.post(`${this.baseUrl2}/employee/all_filter_page`, {
      "SalesPersonCode": this.SalesEmployeeCode,
      "PageNo": pagination.PageNo,
      "maxItem": pagination.maxItem,
      "order_by_field": order_by_field,
      "order_by_value": order_by_value,
      "SearchText": searchValue, "field": {
        'departement_id__in': [1, 2],
      }
    }, { 'headers': this.getHeader() }).pipe(
      map((res: any) => {
        // //console.log(res)
        return res;
      })
    );

  }


  getLeadByPagination(pagination: any, searchValue: any, filter: any, order_by_field: any, order_by_value: any, leadType: any) {
    // console.log(filter)
    // filter = this.findRemovedOrEmptyKeys(filter,filter)
    filter.assignedTo = this.checkKeyEpty(filter.assignedTo);
    filter.source = this.checkKeyEpty(filter.source);
    filter.CreateDate__gte = this.checkKeyEpty(filter.CreateDate__gte);
    filter.CreateDate__lte = this.checkKeyEpty(filter.CreateDate__lte);
    return this.http.post(`${this.baseUrl2}/lead/all_filter_page`, {
      "SalesPersonCode": this.SalesEmployeeCode,
      "PageNo": pagination.PageNo,
      "maxItem": pagination.maxItem,
      "order_by_field": order_by_field,
      "order_by_value": order_by_value,
      "SearchText": searchValue,
      "leadType": leadType,
      "field": {
        assignedTo_id__in: filter.assignedTo,
        source__in: filter.source,
        CreateDate__gte: filter.CreateDate__gte,
        CreateDate__lte: filter.CreateDate__lte
      }
    }, { 'headers': this.getHeader() }).pipe(
      map((res: any) => {
        // //console.log(res)
        return res;
      })
    );

  }

  deleteLead(id: any) {
    const params = new HttpParams()
      .set('id', id.toString());
    return this.http.post(`${this.baseUrl2}/lead/delete`, { id: id }, { 'headers': this.getHeader() }).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  FilterTabs:any[] = [];
  getReportsByPagination(pagination: any, searchValue: any, order_by_field: any, order_by_value: any,filteruser: any) {
    filteruser.report_category = this.checkKeyEpty(filteruser.report_category);
    return this.http.post(`${this.baseUrl2}/mis_reports/item/all_filter_item`, {
      "PageNo": pagination.PageNo,
      "maxItem": pagination.maxItem,
      "order_by_field": order_by_field,
      "order_by_value": order_by_value,
      "SearchText": searchValue,
      "field": {
        report_category:filteruser.report_category
      }
    }, { 'headers': this.getHeader() }).pipe(
      map((res: any) => {
        return res;
      })
    );
  }
  getReportCatrogydata() {
    return this.http.get(`${this.baseUrl2}/mis_reports/category/all`, { 'headers': this.getHeader() }).pipe(
      map((res: any) => {
        return res['data'];
      })
    );
  }

  UpdateReportsByPagination(bridge2: any) {
    return this.http.post(`${this.baseUrl2}/mis_reports/item/update`, bridge2, { 'headers': this.getHeader() }).pipe(
      map((res: any) => {
        return res;
      })
    );
  }
  getCustomerByPagination(pagination: any, searchValue: any, filteruser: any, order_by_field: any, order_by_value: any) {
    filteruser.Name = this.checkKeyEpty(filteruser.Name);
    filteruser.ctype = this.checkKeyEpty(filteruser.ctype);
    filteruser.industry = this.checkKeyEpty(filteruser.industry);
    filteruser.saleemp = this.checkKeyEpty(filteruser.saleemp);
    filteruser.pterms = this.checkKeyEpty(filteruser.pterms);
    filteruser.CreateDate__gte = this.checkKeyEpty(filteruser.CreateDate__gte);
    filteruser.CreateDate__lte = this.checkKeyEpty(filteruser.CreateDate__lte);
    return this.http.post(`${this.baseUrl2}/businesspartner/all_filter_page`, {
      "SalesPersonCode": this.SalesEmployeeCode,
      "PageNo": pagination.PageNo,
      "maxItem": pagination.maxItem,
      "order_by_field": order_by_field,
      "order_by_value": order_by_value,
      "SearchText": searchValue,
      "field": {
        "U_TYPE": filteruser.ctype,
        "Industry": filteruser.industry,
        "SalesPersonCode": filteruser.saleemp,
        "PayTermsGrpCode": filteruser.pterms,
        CreateDate__gte: filteruser.CreateDate__gte,
        CreateDate__lte: filteruser.CreateDate__lte
      }
    }, { 'headers': this.getHeader() }).pipe(
      map((res: any) => {
        // //console.log(res)
        return res;
      })
    );

  }

  getCampsetByPagination(pagination: any, searchValue: any, order_by_field: any, order_by_value: any) {
    return this.http.post(`${this.baseUrl2}/campset/all_filter_camp_set_page`, {
      "SalesPersonCode": this.SalesEmployeeCode,
      "PageNo": pagination.PageNo,
      "maxItem": pagination.maxItem,
      "order_by_field": order_by_field,
      "order_by_value": order_by_value,
      "SearchText": searchValue,
      "field": {}
    }, { 'headers': this.getHeader() }).pipe(
      map((res: any) => {
        // //console.log(res)
        return res;
      })
    );

  }
  getCampsetlistByPagination(pagination: any, searchValue: any, order_by_field: any, order_by_value: any, CampaignSetId: any) {
    return this.http.post(`${this.baseUrl2}/camp/all_filter_camp_page`, {
      "SalesPersonCode": this.SalesEmployeeCode,
      "PageNo": pagination.PageNo,
      "maxItem": pagination.maxItem,
      "order_by_field": order_by_field,
      "order_by_value": order_by_value,
      "SearchText": searchValue,
      "field": { "CampaignSetId": CampaignSetId }
    }, { 'headers': this.getHeader() }).pipe(
      map((res: any) => {
        // //console.log(res)
        return res;
      })
    );

  }

  getMemberlistByPagination(pagination: any, searchValue: any, order_by_field: any, order_by_value: any, CampaignSetId: any) {
    return this.http.post(`${this.baseUrl2}/camp/all_filter_member_list_page`, {
      "PageNo": pagination.PageNo,
      "CampSetId": CampaignSetId,
      "maxItem": pagination.maxItem,
      "order_by_field": order_by_field,
      "order_by_value": order_by_value,
      "SearchText": searchValue,
      "field": {}
    }, { 'headers': this.getHeader() }).pipe(
      map((res: any) => {
        // //console.log(res)
        return res;
      })
    );

  }

  getOpportunityByPagination(pagination: any, searchValue: any, filteruser: any, order_by_field: any, order_by_value: any) {
    filteruser.StartDate = this.checkKeyEpty(filteruser.StartDate);
    filteruser.CardCode = this.checkKeyEpty(filteruser.CardCode);
    filteruser.U_LSOURCE = this.checkKeyEpty(filteruser.U_LSOURCE);
    filteruser.oppotype = this.checkKeyEpty(filteruser.oppotype);
    filteruser.CreateDate__gte = this.checkKeyEpty(filteruser.CreateDate__gte);
    filteruser.CreateDate__lte = this.checkKeyEpty(filteruser.CreateDate__lte);
    filteruser.assignedTo = this.checkKeyEpty(filteruser.assignedTo);
    return this.http.post(`${this.baseUrl2}/opportunity/all_filter_page`, {
      "SalesPersonCode": this.SalesEmployeeCode,
      "PageNo": pagination.PageNo,
      "maxItem": pagination.maxItem,
      "order_by_field": order_by_field,
      "order_by_value": order_by_value,
      "SearchText": searchValue,
      "field": {
        "StartDate": filteruser.StartDate,
        "CardCode": filteruser.CardCode,
        "U_LSOURCE": filteruser.U_LSOURCE,
        "U_TYPE": filteruser.oppotype,
        StartDate__gte: filteruser.CreateDate__gte,
        StartDate__lte: filteruser.CreateDate__lte,
        SalesPerson__in: filteruser.assignedTo,
      }
    }, { 'headers': this.getHeader() }).pipe(
      map((res: any) => {
        // //console.log(res)
        return res;
      })
    );

  }

  getQuotationByPagination(pagination: any, searchValue: any, filteruser: any, order_by_field: any, order_by_value: any) {
    filteruser.CreateDate = this.checkKeyEpty(filteruser.CreateDate);
    filteruser.CardCode = this.checkKeyEpty(filteruser.CardCode);
    filteruser.OppID = this.checkKeyEpty(filteruser.OppID);
    filteruser.CancelStatus = this.checkKeyEpty(filteruser.CancelStatus);
    filteruser.DocumentStatus = this.checkKeyEpty(filteruser.DocumentStatus);
    filteruser.CreateDate__gte = this.checkKeyEpty(filteruser.CreateDate__gte);
    filteruser.CreateDate__lte = this.checkKeyEpty(filteruser.CreateDate__lte);
    filteruser.is_draft = this.checkKeyEpty(filteruser.is_draft);
    return this.http.post(`${this.baseUrl2}/quotation/all_filter_page`, {
      "SalesPersonCode": this.SalesEmployeeCode,
      "PageNo": pagination.PageNo,
      "maxItem": pagination.maxItem,
      "order_by_field": order_by_field,
      "order_by_value": order_by_value,
      "SearchText": searchValue,
      "field": {
        "CreateDate": filteruser.CreateDate,
        "CardCode": filteruser.CardCode,
        "U_OPPID": filteruser.OppID,
        "DocumentStatus":filteruser.DocumentStatus,
        "CancelStatus":filteruser.CancelStatus,
        "departement": '2',
        is_draft:filteruser.is_draft,
        CreateDate__gte: filteruser.CreateDate__gte,
        CreateDate__lte: filteruser.CreateDate__lte
      }
    }, { 'headers': this.getHeader() }).pipe(
      map((res: any) => {
        // //console.log(res)
        return res;
      })
    );

  }

  getOrderByPagination(pagination: any, searchValue: any, filteruser: any, order_by_field: any, order_by_value: any) {
    filteruser.CreateDate = this.checkKeyEpty(filteruser.CreateDate);
    filteruser.CardCode = this.checkKeyEpty(filteruser.CardCode);
    filteruser.OppID = this.checkKeyEpty(filteruser.OppID);
    filteruser.CancelStatus = this.checkKeyEpty(filteruser.CancelStatus);
    filteruser.DocumentStatus = this.checkKeyEpty(filteruser.DocumentStatus);
    filteruser.CreateDate__gte = this.checkKeyEpty(filteruser.CreateDate__gte);
    filteruser.CreateDate__lte = this.checkKeyEpty(filteruser.CreateDate__lte);
    filteruser.is_draft = this.checkKeyEpty(filteruser.is_draft);
    return this.http.post(`${this.baseUrl2}/order/all_filter_page`, {
      "SalesPersonCode": this.SalesEmployeeCode,
      "PageNo": pagination.PageNo,
      "maxItem": pagination.maxItem,
      "order_by_field": order_by_field,
      "order_by_value": order_by_value,
      "SearchText": searchValue,
      "field": {
        "CreateDate": filteruser.CreateDate,
        "CardCode": filteruser.CardCode,
        "U_OPPID": filteruser.OppID,
        "DocumentStatus":filteruser.DocumentStatus,
        "CancelStatus":filteruser.CancelStatus,
        "departement": '2',
        is_draft:filteruser.is_draft,
        CreateDate__gte: filteruser.CreateDate__gte,
        CreateDate__lte: filteruser.CreateDate__lte
      }
    }, { 'headers': this.getHeader() }).pipe(
      map((res: any) => {
        // //console.log(res)
        return res;
      })
    );

  }

  getInvoiceByPagination(pagination: any, searchValue: any, filteruser: any, order_by_field: any, order_by_value: any) {
    filteruser.CreateDate = this.checkKeyEpty(filteruser.CreateDate);
    filteruser.CardCode = this.checkKeyEpty(filteruser.CardCode);
    filteruser.CancelStatus = this.checkKeyEpty(filteruser.CancelStatus);
    filteruser.DocumentStatus = this.checkKeyEpty(filteruser.DocumentStatus);
    filteruser.CreateDate__gte = this.checkKeyEpty(filteruser.CreateDate__gte);
    filteruser.CreateDate__lte = this.checkKeyEpty(filteruser.CreateDate__lte);
    return this.http.post(`${this.baseUrl2}/invoice/all_filter_page`, {
      "SalesPersonCode": this.SalesEmployeeCode,
      "PageNo": pagination.PageNo,
      "maxItem": pagination.maxItem,
      "order_by_field": order_by_field,
      "order_by_value": order_by_value,
      "SearchText": searchValue,
      "field": {
        "CreateDate": filteruser.CreateDate,
        "CardCode": filteruser.CardCode,
        "DocumentStatus":filteruser.DocumentStatus,
        "CancelStatus":filteruser.CancelStatus,
        CreateDate__gte: filteruser.CreateDate__gte,
        CreateDate__lte: filteruser.CreateDate__lte
      }
    }, { 'headers': this.getHeader() }).pipe(
      map((res: any) => {
        // //console.log(res)
        return res;
      })
    );

  }

  getDeliveryByPagination(pagination: any, searchValue: any, filteruser: any, order_by_field: any, order_by_value: any) {
    filteruser.CreateDate = this.checkKeyEpty(filteruser.CreateDate);
    filteruser.CardCode = this.checkKeyEpty(filteruser.CardCode);
    filteruser.CancelStatus = this.checkKeyEpty(filteruser.CancelStatus);
    filteruser.DocumentStatus = this.checkKeyEpty(filteruser.DocumentStatus);
    return this.http.post(`${this.baseUrl2}/delivery/all_filter_page`, {
      "SalesPersonCode": this.SalesEmployeeCode,
      "PageNo": pagination.PageNo,
      "maxItem": pagination.maxItem,
      "order_by_field": order_by_field,
      "order_by_value": order_by_value,
      "SearchText": searchValue,
      "field": {
        "CreateDate": filteruser.CreateDate,
        "CardCode": filteruser.CardCode,
        "DocumentStatus":filteruser.DocumentStatus,
        "CancelStatus":filteruser.CancelStatus,
      }
    }, { 'headers': this.getHeader() }).pipe(
      map((res: any) => {
        // //console.log(res)
        return res;
      })
    );

  }

  getDeliveryLogsByPagination(pagination: any, searchValue: any, DeliveryID: any, order_by_field: any, order_by_value: any) {
    // filteruser.CreateDate = this.checkKeyEpty(filteruser.CreateDate);
    // filteruser.CardCode = this.checkKeyEpty(filteruser.CardCode);
    return this.http.post(`${this.baseUrl2}/delivery/all_filter_log`, {
      "PageNo": pagination.PageNo,
      "maxItem": pagination.maxItem,
      "order_by_field": order_by_field,
      "order_by_value": order_by_value,
      "SearchText": searchValue,
      "field": {
        "DeliveryID": DeliveryID,
      }
    }, { 'headers': this.getHeader() }).pipe(
      map((res: any) => {
        // //console.log(res)
        return res;
      })
    );

  }

  getItemCateByPagination(pagination: any, searchValue: any, order_by_field: any, order_by_value: any) {
    return this.http.post(`${this.baseUrl2}/item/category_filter_page`, {
      "PageNo": pagination.PageNo,
      "maxItem": pagination.maxItem,
      "order_by_field": order_by_field,
      "order_by_value": order_by_value,
      "SearchText": searchValue,
      "field": {}
    }, { 'headers': this.getHeader() }).pipe(
      map((res: any) => {
        // //console.log(res)
        return res;
      })
    );
  }


  getActivityByPagination(pagination: any, searchValue: any, filteruser: any, order_by_field: any, order_by_value: any,Emp:any) {
    filteruser.SourceID = this.checkKeyEpty(filteruser.SourceID);
    filteruser.SourceType = this.checkKeyEpty(filteruser.SourceType);
    return this.http.post(`${this.baseUrl2}/activity/all_filter`, {
      "Emp":Emp,
      "PageNo": pagination.PageNo,
      "maxItem": pagination.maxItem,
      "order_by_field": order_by_field,
      "order_by_value": order_by_value,
      "SearchText": searchValue,
      "field": {
        "SourceID": filteruser.SourceID,
        "SourceType": filteruser.SourceType,
      }
    }, { 'headers': this.getHeader() }).pipe(
      map((res: any) => {
        // //console.log(res)
        return res;
      })
    );
  }

  getItemByPagination(pagination: any, searchValue: any, filteruser: any, order_by_field: any, order_by_value: any,status?:any,ItemType?:any) {
    filteruser = this.checkKeyEpty(filteruser);
    status = this.checkKeyEpty(status);
    ItemType = this.checkKeyEpty(ItemType);
    return this.http.post(`${this.baseUrl2}/item/all_filter_page`, {
      "PageNo": pagination.PageNo,
      "maxItem": pagination.maxItem,
      "order_by_field": order_by_field,
      "order_by_value": order_by_value,
      "SearchText": searchValue,
      "field": {
        "CatID": filteruser,
        "ItemType":ItemType,
        "Status":status,
      }
    }, { 'headers': this.getHeader() }).pipe(
      map((res: any) => {
        // //console.log(res)
        return res;
      })
    );
  }


  getIndustoryByPagination(pagination: any, searchValue: any, order_by_field: any, order_by_value: any) {
    return this.http.post(`${this.baseUrl2}/industries/all_filter_page`, {
      "PageNo": pagination.PageNo,
      "maxItem": pagination.maxItem,
      "order_by_field": order_by_field,
      "order_by_value": order_by_value,
      "SearchText": searchValue,
      "field": {}
    }, { 'headers': this.getHeader() }).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  //change
  getCompetitordByPagination(pagination: any, searchValue: any, order_by_field: any, order_by_value: any) {
    return this.http.post(`${this.baseUrl2}/industries/all_filter_page`, {
      "PageNo": pagination.PageNo,
      "maxItem": pagination.maxItem,
      "order_by_field": order_by_field,
      "order_by_value": order_by_value,
      "SearchText": searchValue,
      "field": {}
    }, { 'headers': this.getHeader() }).pipe(
      map((res: any) => {
        return res;
      })
    );
  }


  getCustomerTypeByPagination(pagination: any, searchValue: any, order_by_field: any, order_by_value: any) {
    return this.http.post(`${this.baseUrl2}/businesspartner/bp_type_filter_page`, {
      "PageNo": pagination.PageNo,
      "maxItem": pagination.maxItem,
      "order_by_field": order_by_field,
      "order_by_value": order_by_value,
      "SearchText": searchValue,
      "field": {}
    }, { 'headers': this.getHeader() }).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  getZoneMasterPagination(pagination: any, searchValue: any, order_by_field: any, order_by_value: any) {
    return this.http.post(`${this.baseUrl2}/dropdown/zone/all_filter_page`, {
      "PageNo": pagination.PageNo,
      "maxItem": pagination.maxItem,
      "order_by_field": order_by_field,
      "order_by_value": order_by_value,
      "SearchText": searchValue,
      "field": {}
    }, { 'headers': this.getHeader() }).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  addEditZoneMaster(indusadd: any, isEdit: boolean) {
    return this.http.post(`${this.baseUrl2}/dropdown/zone/${isEdit ? 'update' : 'create'}`, indusadd, { 'headers': this.getHeader() }).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  getBranchMasterPagination(pagination: any, searchValue: any, order_by_field: any, order_by_value: any) {
    return this.http.post(`${this.baseUrl2}/company/branch/all_filter`, {
      "PageNo": pagination.PageNo,
      "maxItem": pagination.maxItem,
      "order_by_field": order_by_field,
      "order_by_value": order_by_value,
      "SearchText": searchValue,
      "field": {}
    }, { 'headers': this.getHeader() }).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  addEditBranchMaster(indusadd: any, isEdit: boolean) {
    return this.http.post(`${this.baseUrl2}/company/branch/${isEdit ? 'update' : 'create'}`, indusadd, { 'headers': this.getHeader() }).pipe(
      map((res: any) => {
        return res;
      })
    );
  }
  OneBranchMaster(id: any) {
    return this.http.post(`${this.baseUrl2}/company/branch/one`, {id:id}, { 'headers': this.getHeader() }).pipe(
      map((res: any) => {
        return res;
      })
    );
  }
  getdepartmentsMasterPagination(pagination: any, searchValue: any, order_by_field: any, order_by_value: any) {
    return this.http.post(`${this.baseUrl2}/dropdown/departments/all_filter_page`, {
      "PageNo": pagination.PageNo,
      "maxItem": pagination.maxItem,
      "order_by_field": order_by_field,
      "order_by_value": order_by_value,
      "SearchText": searchValue,
      "field": {}
    }, { 'headers': this.getHeader() }).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  addEditdepartmentsMaster(indusadd: any, isEdit: boolean) {
    return this.http.post(`${this.baseUrl2}/dropdown/departments/${isEdit ? 'update' : 'create'}`, indusadd, { 'headers': this.getHeader() }).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  getRoleMasterPagination(pagination: any, searchValue: any, order_by_field: any, order_by_value: any) {
    return this.http.post(`${this.baseUrl2}/dropdown/roles/all_filter_page`, {
      "PageNo": pagination.PageNo,
      "maxItem": pagination.maxItem,
      "order_by_field": order_by_field,
      "order_by_value": order_by_value,
      "SearchText": searchValue,
      "field": {}
    }, { 'headers': this.getHeader() }).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  getRoleMasterByDepartmentPagination(pagination: any, searchValue: any, order_by_field: any, order_by_value: any) {
    return this.http.post(`${this.baseUrl2}/dropdown/roles/all_filter_page`, {
      "PageNo": pagination.PageNo,
      "maxItem": pagination.maxItem,
      "order_by_field": order_by_field,
      "order_by_value": order_by_value,
      "SearchText": searchValue,
      "field": { "Department__in": [1, 2] }
    }, { 'headers': this.getHeader() }).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  addEditRoleMaster(indusadd: any, isEdit: boolean) {
    return this.http.post(`${this.baseUrl2}/dropdown/roles/${isEdit ? 'update' : 'create'}`, indusadd, { 'headers': this.getHeader() }).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  getOppTypeByPagination(pagination: any, searchValue: any, order_by_field: any, order_by_value: any) {
    return this.http.post(`${this.baseUrl2}/opportunity/opp_type_all_filter_page`, {
      "PageNo": pagination.PageNo,
      "maxItem": pagination.maxItem,
      "order_by_field": order_by_field,
      "order_by_value": order_by_value,
      "SearchText": searchValue,
      "field": {}
    }, { 'headers': this.getHeader() }).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  getPaymentTermsByPagination(pagination: any, searchValue: any, order_by_field: any, order_by_value: any) {
    return this.http.post(`${this.baseUrl2}/paymenttermstypes/all_filter_page`, {
      "PageNo": pagination.PageNo,
      "maxItem": pagination.maxItem,
      "order_by_field": order_by_field,
      "order_by_value": order_by_value,
      "SearchText": searchValue,
      "field": {}
    }, { 'headers': this.getHeader() }).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  getPaymentCollactionByPagination(pagination: any, searchValue: any, order_by_field: any, order_by_value: any) {
    return this.http.post(`${this.baseUrl2}/payment/all_filter_page`, {
      "PageNo": pagination.PageNo,
      "maxItem": pagination.maxItem,
      "order_by_field": order_by_field,
      "order_by_value": order_by_value,
      "SearchText": searchValue,
      "field": {}
    }, { 'headers': this.getHeader() }).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  getTargetByPagination(pagination: any, searchValue: any, order_by_field: any, order_by_value: any) {
    return this.http.post(`${this.baseUrl2}/employee/targetyr_all_filter_page`, {
      "SalesPersonCode": this.SalesEmployeeCode,
      "PageNo": pagination.PageNo,
      "maxItem": pagination.maxItem,
      "order_by_field": order_by_field,
      "order_by_value": order_by_value,
      "SearchText": searchValue,
      "field": {}
    }, { 'headers': this.getHeader() }).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  insertPaymentCollaction(Quotation: PaymentTerms, isEdit: boolean) {
    if (isEdit == false) {
      const uploadData = new FormData();
      for (let i = 0; i < Object.keys(Quotation).length; i++) {
        uploadData.append(Object.keys(Quotation)[i], Object.values(Quotation)[i]);
      }
      if (Quotation.Attach != '') {
        uploadData.delete('Attach');
        for (var i = 0; i < Quotation.Attach.length; i++) {
          uploadData.append("Attach", Quotation.Attach[i]);
        }
      }
      return this.http.post(`${this.baseUrl2}/payment/create`, uploadData, { 'headers': this.getHeader() }).pipe(
        map((res: any) => {
          return res;
        })
      );
    }
    else {
      return this.http.post(`${this.baseUrl2}/payment/update`, Quotation, { 'headers': this.getHeader() }).pipe(
        map((res: any) => {
          return res;
        })
      );
    }
  }

  deletePaymentTerms(id: any) {
    return this.http.post(`${this.baseUrl2}/paymenttermstypes/delete`, { id: id }, { 'headers': this.getHeader() }).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  resetUserPassword(bridge2: any) {
    return this.http.post(`${this.baseUrl2}/employee/update_password`, bridge2, { 'headers': this.getHeader() }).pipe(
      map((res: any) => {
        return res;
      })
    );
  }


  replaceNullWithSpace(obj: any) {
    for (let key in obj) {
      if (obj.hasOwnProperty(key) && obj[key] === null) {
        obj[key] = "";
      }
    }
    return obj;
  }












  tableFilter: any;
  filterData(data: any) {
    this.tableFilter = data;
    // //console.log('filter data 123',this.tableFilter)
  }

  getfilterData() {
    return this.tableFilter;
  }


  inventorydata1: any;
  inventorydata(item: any) {
    this.inventorydata1 = item;
    //console.log(this.inventorydata1);
  }

  getinventorydata() {
    return this.inventorydata1;
  }




  paginationNumber: any;
  paginationData(num: any) {
    this.paginationNumber = num;
  }

  getPaginationNumber() {
    return this.paginationNumber;
  }


  searchpush: any;
  pushSearch(val: any) {
    this.searchpush = val;
  }

  getseach() {
    return this.searchpush;
  }
  _quotationitem: any;
  _quotation(item: any) {
    this._quotationitem = item;
  }

  get_quotation() {
    return this._quotationitem;
  }


  cardcode: any;
  setBpCardcode(id: any) {
    this.cardcode = id;
  }

  getBpCardcode() {
    return this.cardcode;
  }
  OpportunityID: any;
  setOpportunityID(id: any) {
    this.OpportunityID = id;
  }

  getOpportunityID() {
    return this.OpportunityID;
  }

  leadID: any;
  setLeadID(id: any) {
    this.leadID = id;
  }

  getLeadId() {
    return this.leadID;
  }

  quotid: any;
  SetQuotationId(id: any) {
    this.quotid = id;
  }

  getQuotationId() {
    return this.quotid;
  }

  ordid: any;
  SetOrderId(id: any) {
    this.ordid = id;
  }

  getOrderId() {
    return this.ordid;
  }

  ordType: any;
  SetOrderType(id: any) {
    this.ordType = id;
  }

  getOrderType() {
    return this.ordType;
  }

  orderData: any;
  orderpreview(data: any) {
    this.orderData = data;
  }

  getOrderpreview() {
    return this.orderData;
  }

  orderbackData: any;
  orderback(data: any) {
    this.orderbackData = data;
  }

  getOrderback() {
    return this.orderbackData;
  }

  getBusinessPartmersShortdata() {
    return this.http.post(`${this.baseUrl2}/businesspartner/all_bp`, { "SalesPersonCode": this.SalesEmployeeCode }, { 'headers': this.getHeader() }).pipe(
      map((res: any) => {
        return res['data'];
      })
    );
  }

  getOpportunityShortdata() {
    return this.http.post(`${this.baseUrl2}/opportunity/all_opp`, { "SalesPersonCode": this.SalesEmployeeCode }, { 'headers': this.getHeader() }).pipe(
      map((res: any) => {
        return res['data'];
      })
    );
  }


  getQuotationShortdata() {
    return this.http.post(`${this.baseUrl2}/quotation/all_quot`, { "departement": 2, "SalesPersonCode": this.SalesEmployeeCode }, { 'headers': this.getHeader() }).pipe(
      map((res: any) => {
        return res['data'];
      })
    );
  }

  getOrderShortdata() {
    return this.http.post(`${this.baseUrl2}/order/all_ord`, { "departement": 2, "SalesPersonCode": this.SalesEmployeeCode }, { 'headers': this.getHeader() }).pipe(
      map((res: any) => {
        return res['data'];
      })
    );
  }

  getLeadShortdata() {
    return this.http.post(`${this.baseUrl2}/lead/all_lead`, { "SalesPersonCode": this.SalesEmployeeCode }, { 'headers': this.getHeader() }).pipe(
      map((res: any) => {
        return res['data'];
      })
    );
  }
  getCurrentTime() {
    var dateObj = new Date();
    var curtime = ("0" + dateObj.getHours()).slice(-2) + ':' + ("0" + dateObj.getMinutes()).slice(-2);
    return curtime;
  }
  storeAttachmany(Attachment: Attachment) {
    console.log("bridge", Attachment)
    const uploadData = new FormData();
    for (let i = 0; i < Object.keys(Attachment).length; i++) {
      uploadData.append(Object.keys(Attachment)[i], Object.values(Attachment)[i]);
    }
    uploadData.delete('File');
    for (var i = 0; i < Attachment.File.length; i++) {
      uploadData.append("File", Attachment.File[i]);
    }
    return this.http.post(`${this.baseUrl2}/attachment/createmany`, uploadData, { 'headers': this.getHeader() }).pipe(
      map((res: any) => {
        console.log("res", res)
        return res;
      })
    );
  }

  deleteAttach(id: any) {
    const params = new HttpParams()
      .set('id', id.toString());
    return this.http.post(`${this.baseUrl2}/attachment/delete`, { id: id }, { 'headers': this.getHeader() }).pipe(
      map((res: any) => {
      })
    );
  }


  getAttachdata(id: any, type: any) {
    return this.http.post(`${this.baseUrl2}/attachment/all`, { "LinkID": id, "LinkType": type }, { 'headers': this.getHeader() }).pipe(
      map((res: any) => {
        return res['data'];
      })
    );
  }


  storeDelivery(Quotation: Orders) {
    //console.log(Quotation);
    return this.http.post(`${this.baseUrl2}/delivery/create`, Quotation, { 'headers': this.getHeader() }).pipe(
      map((res: any) => {
        return res;
      })
    );
  }
  getOneDeliverydata(idd: number) {
    return this.http.post(`${this.baseUrl2}/delivery/one`, { "id": idd }, { 'headers': this.getHeader() }).pipe(
      map((res: any) => {
        return res['data'];
      })
    );
  }

  DeliveryStageComplete(Quotation: StageComplete) {
    const uploadData = new FormData();
    for (let i = 0; i < Object.keys(Quotation).length; i++) {
      uploadData.append(Object.keys(Quotation)[i], Object.values(Quotation)[i]);
    }
    if (Quotation.File != '') {
      uploadData.delete('File');
      for (var i = 0; i < Quotation.File.length; i++) {
        uploadData.append("File", Quotation.File[i]);
      }
    }
    return this.http.post(`${this.baseUrl2}/delivery/complete_stage`, uploadData, { 'headers': this.getHeader() }).pipe(
      map((res: any) => {
        return res;
      })
    );
  }


  addLogsFunction(pyadd: any) {
    return this.http.post(`${this.baseUrl2}/delivery/create_log`, pyadd, { 'headers': this.getHeader() }).pipe(
      map((res: any) => {
        return res;
      })
    );
  }


replaceKeyInArray(arr: any[], oldKey: string, newKey: string): any[] {
    // Iterate over each object in the array
    return arr.map(obj => {
      // Create a new object to hold the modified key
      const newObj: any = {};
      // Iterate over the keys of the current object
      Object.keys(obj).forEach(key => {
        // Check if the current key is the one to be replaced
        if (key === oldKey) {
          // Replace the key with the new key
          newObj[newKey] = obj[key];
        } else {
          // Copy the key-value pair as is
          newObj[key] = obj[key];
        }
      });
      return newObj;
    });
  }

  CancelQuotation(id: any) {
    const params = new HttpParams()
      .set('id', id.toString());
    return this.http.post(`${this.baseUrl2}/quotation/cancel`, { id: id }, { 'headers': this.getHeader() }).pipe(
      map((res: any) => {
        return res;
      })
    );
  }


  CancelOrder(id: any) {
    const params = new HttpParams()
      .set('id', id.toString());
    return this.http.post(`${this.baseUrl2}/order/cancel`, { id: id }, { 'headers': this.getHeader() }).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  CancelInvoice(id: any) {
    const params = new HttpParams()
      .set('id', id.toString());
    return this.http.post(`${this.baseUrl2}/invoice/cancel`, { id: id }, { 'headers': this.getHeader() }).pipe(
      map((res: any) => {
        return res;
      })
    );
  }
  CancelDelivery(id: any) {
    const params = new HttpParams()
      .set('id', id.toString());
    return this.http.post(`${this.baseUrl2}/delivery/cancel`, { id: id }, { 'headers': this.getHeader() }).pipe(
      map((res: any) => {
        return res;
      })
    );
  }


  SettingUpdate(indusadd: any) {
    return this.http.post(`${this.baseUrl2}/projectsetting/update`, indusadd, { 'headers': this.getHeader() }).pipe(
      map((res: any) => {
        //console.log("ap", res)
        return res;
      })
    );
  }

  getCurrencyData() {
    return this.http.get(`${this.baseUrl2}/currency/all`, { 'headers': this.getHeader() }).pipe(
      map((res: any) => {
        return res['data'];
      })
    );
  }
  getModuleName() {
    return this.http.get(`${this.baseUrl2}/projectsetting/getModule`, { 'headers': this.getHeader() }).pipe(
      map((res: any) => {
        return res['data'];
      })
    );
  }


  createMis(payload: any) {
    return this.http.post(`${this.baseUrl2}/mis_reports/item/create`, payload, { 'headers': this.getHeader() }).pipe(
      map((res: any) => {
        // //console.log(res)
        return res;
      })
    );

  }


  deleteMis(payload: any) {
    return this.http.post(`${this.baseUrl2}/mis_reports/item/delete`, payload, { 'headers': this.getHeader() }).pipe(
      map((res: any) => {
        // //console.log(res)
        return res;
      })
    );

  }


  callerAPi(obj:any) {
    return this.http.post(`https://api-smartflo.tatateleservices.com/v1/click_to_call`, obj, { 'headers': this.getHeader2() }).pipe(map((res: any) => {
      return res['data'];
    }))
  }
  CallRecoderd(data:any){
    return this.http.post(`https://api-smartflo.tatateleservices.com/v1/click_to_call`,data,{ 'headers': this.getHeader2() }
  ).pipe(
      map((res: any) => {
        //console.log("ap", res)
        return res[data];
      })
    );
  }

  RecordData(){
    return this.http.get(`https://api-smartflo.tatateleservices.com/v1/call/records`, { 'headers': this.getHeader2() }
  ).pipe(
      map((res: any) => {
        //console.log("ap", res)
        return res;
      })
    );
  }

  reportDetails(id:any,pagination:any,searchValue:any,datefilter:any,download:string){
    // console.log("PageNo:", pagination.PageNo);
    if (datefilter && typeof datefilter === 'object') {
      for (const key in datefilter) {
        if (datefilter[key] === '') {
          delete datefilter[key];
        }
      }
      if (Object.keys(datefilter).length === 0) {
        datefilter = undefined;
      }
    }
    return this.http.post(`${this.baseUrl2}/mis_reports/view_report`, {
      "report_id": id,
      "PageNo": pagination.PageNo,
      "maxItem": pagination.maxItem,
      "filters":datefilter,
      "search_text": searchValue,
      "SalesPersonCode": this.SalesEmployeeCode,
      "download":download,
    }, { 'headers': this.getHeader() }).pipe(
      map((res: any) => {
        // //console.log(res)
        return res;
      })
    );
  }

  ModuleList(){
    return this.http.get(`${this.baseUrl2}/projectsetting/getModule`,{ 'headers': this.getHeader2() }
  ).pipe(
      map((res: any) => {
        //console.log("ap", res)
        return res;
      })
    );
  }

  GetRoles(){
    return this.http.get(`${this.baseUrl2}/dropdown/roles/all`,{ 'headers': this.getHeader2() }
  ).pipe(
      map((res: any) => {
        //console.log("ap", res)
        return res;
      })
    );
  }

  ViewAddEdit(payload: any) {
    return this.http.post(`${this.baseUrl2}/accessmanagement`, payload, { 'headers': this.getHeader() }).pipe(
      map((res: any) => {
        // //console.log(res)
        return res;
      })
    );
  }

  getAddEdit() {
    return this.http.get(`${this.baseUrl2}/accessmanagement`, { 'headers': this.getHeader() }).pipe(
      map((res: any) => {
        // //console.log(res)
        return res;
      })
    );
  }

  // getAccessManagementRole(id: any) {
  //   return this.http.post(`${this.baseUrl2}/accessmanagement/role/${id}`,{id:id}, { 'headers': this.getHeader() }).pipe(
  //     map((res: any) => {
  //       return res;
  //     })
  //   );
  // }

  getAccessManagementRole(id: any) {
    return this.http.post(`${this.baseUrl2}/accessmanagement/role/${id}`,{id:id}, { 'headers': this.getHeader() }).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  getFiledManagment() {
    return this.http.get(`${this.baseUrl2}/useraccessmanagement`, { 'headers': this.getHeader() }).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  SaveFiledManagment(Payload: any) {
    //console.log(camp)
    return this.http.post(`${this.baseUrl2}/useraccessmanagement`, {modules_name:Payload}, { 'headers': this.getHeader() }).pipe(
      map((res: any) => {
        // //console.log(res)
        return res;
      })
    );
  }

  // UpdateAccessModule(payload: any) {
  //   return this.http.patch(`${this.baseUrl2}/accessmanagement`, payload, { headers: this.getHeader() }).pipe(
  //     map((res: any) => {
  //       return res;
  //     })
  //   );
  // }
  // GetAccessModule(id: number) {

  //   return this.http.post(`${this.baseUrl2}/accessmanagement`,{"id": id},  { headers: this.getHeader() }).pipe(
  //     map((res: any) => {
  //       return res;
  //     })
  //   );
  // }

  GenerateReport(payload: any) {
    // console.log(payload);
    if(payload.filter.field.CreateDate__gte == ''){
      payload.filter.field.CreateDate__gte = undefined;
    }

    if(payload.filter.field.CreateDate__lte == ''){
      payload.filter.field.CreateDate__lte = undefined;
    }

    if (payload.filter.field.assignedTo_id__in !== undefined &&
      (payload.filter.field.assignedTo_id__in == '' || payload.filter.field.assignedTo_id__in.length == 0)) {
      payload.filter.field.assignedTo_id__in = undefined;
  }

    if(payload.filter.field.source__in == '' || payload.filter.field.source__in.length == 0){
      payload.filter.field.source__in = undefined;
    }
    return this.http.post(`${this.baseUrl2}/lead/filter_page/report`, payload, { 'headers': this.getHeader() }).pipe(
      map((res: any) => {
        // //console.log(res)
        return res;
      })
    );
  }
  // GenerateReport2(payload: any) {
  // //   console.log(payload);
  // //   if(payload.filter.field.CreateDate__gte == ''){
  // //     payload.filter.field.CreateDate__gte = undefined;
  // //   }

  // //   if(payload.filter.field.CreateDate__lte == ''){
  // //     payload.filter.field.CreateDate__lte = undefined;
  // //   }

  // //   if (payload.filter.field.assignedTo_id__in !== undefined &&
  // //     (payload.filter.field.assignedTo_id__in == '' || payload.filter.field.assignedTo_id__in.length == 0)) {
  // //     payload.filter.field.assignedTo_id__in = undefined;
  // // }

  // //   if(payload.filter.field.source__in == '' || payload.filter.field.source__in.length == 0){
  // //     payload.filter.field.source__in = undefined;
  // //   }
  //   return this.http.post(`${this.baseUrl2}/mis_reports/view_report1`, payload, { 'headers': this.getHeader() }).pipe(
  //     map((res: any) => {
  //       // //console.log(res)
  //       return res;
  //     })
  //   );
  // }

  getReportList() {
    return this.http.get(`${this.baseUrl2}/mis_reports/report_history/?user_id=${this.SalesEmployeeCode}`, { 'headers': this.getHeader() }).pipe(
      map((res: any) => {
        // //console.log(res)
        return res;
      })
    );
  }


  OneWorkFlow(id: any) {
    return this.http.post(`${this.baseUrl2}/get_workflow`,{
      "workflow_id": id
  }
  , { 'headers': this.getHeader() }).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  AddWorkFlow(Payload: any,isEdit:boolean) {
    return this.http.post(`${this.baseUrl2}/${isEdit ? 'update_workflow' : 'create_workflow'}`,Payload
      , { 'headers': this.getHeader() }).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  GetWorkflow(){
    return this.http.get(`${this.baseUrl2}/list_workflows`,{ 'headers': this.getHeader() }
  ).pipe(
      map((res: any) => {
        //console.log("ap", res)
        return res;
      })
    );
  }

  AppruvedHistory(id: any,module_id:any){
    return this.http.get(`${this.baseUrl2}/fieldsapprovallist?field_id=${id}&SalesPersonCode=${this.SalesEmployeeCode}&module_id=${module_id}`
      , { 'headers': this.getHeader() }).pipe(
      map((res: any) => {
        return res;
      })
    );
  }


  AppruvedRequest(Payload: any,id:any){
    return this.http.patch(`${this.baseUrl2}/fieldsapprovallist/${id}`,Payload
      , { 'headers': this.getHeader() }).pipe(
      map((res: any) => {
        return res;
      })
    );
  }
//New Competitors

  getCompetitorByPagination(pagination: any, searchValue: any, order_by_field: any, order_by_value: any) {
    return this.http.post(`${this.baseUrl2}/master_api/competitors/all_filter_page`, {
      "SalesPersonCode":this.SalesEmployeeCode,
      "PageNo": pagination.PageNo,
      "maxItem": pagination.maxItem,
      "order_by_field": order_by_field,
      "order_by_value": order_by_value,
      "SearchText": searchValue,
      "field": {}
    }, { 'headers': this.getHeader() }).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  insertCompetitors(indusadd: Industry, isEdit: boolean) {
    return this.http.post(`${this.baseUrl2}/master_api/competitors/${isEdit ? 'update' : 'create'}`, indusadd, { 'headers': this.getHeader() }).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

//details of Competitors:

getOneCompetitorsdata(idd: number) {
  return this.http.post(`${this.baseUrl2}/master_api/competitors/one`, { "id": idd }, { 'headers': this.getHeader() }).pipe(
    map((res: any) => {
      return res['data'];
    })
  );
}



getCompetitorEngineerByPagination(pagination: any, searchValue: any, order_by_field: any, order_by_value: any,id:any) {
  return this.http.post(`${this.baseUrl2}/master_api/competitors_engineer/all_filter_page`, {
    "SalesPersonCode":this.SalesEmployeeCode,
    "PageNo": pagination.PageNo,
    "maxItem": pagination.maxItem,
    "order_by_field": order_by_field,
    "order_by_value": order_by_value,
    "SearchText": searchValue,
    "field": {Competitors_id:id}
  }, { 'headers': this.getHeader() }).pipe(
    map((res: any) => {
      return res;
    })
  );
}


insertEngineers(indusadd: Industry, isEdit: boolean) {
  return this.http.post(`${this.baseUrl2}/master_api/competitors_engineer/${isEdit ? 'update' : 'create'}`, indusadd, { 'headers': this.getHeader() }).pipe(
    map((res: any) => {
      return res;
    })
  );
}


insertDirectorPartner(indusadd: Industry, isEdit: boolean) {
  return this.http.post(`${this.baseUrl2}/master_api/directory_group/${isEdit ? 'update' : 'create'}`, indusadd, { 'headers': this.getHeader() }).pipe(
    map((res: any) => {
      return res;
    })
  );
}
getDirectoryByPagination(pagination: any, searchValue: any, order_by_field: any, order_by_value: any) {
  return this.http.post(`${this.baseUrl2}/master_api/directory_group/all_filter_page`, {
    "SalesPersonCode":this.SalesEmployeeCode,
    "PageNo": pagination.PageNo,
    "maxItem": pagination.maxItem,
    "order_by_field": order_by_field,
    "order_by_value": order_by_value,
    "SearchText": searchValue,
    "field": {}
  }, { 'headers': this.getHeader() }).pipe(
    map((res: any) => {
      return res;
    })
  );
}
getDirectoryPagination(pagination: any, searchValue: any, order_by_field: any, order_by_value: any,id:any) {
  return this.http.post(`${this.baseUrl2}/master_api/group_contact_person/all_filter_page`, {
    "SalesPersonCode":this.SalesEmployeeCode,
    "PageNo": pagination.PageNo,
    "maxItem": pagination.maxItem,
    "order_by_field": order_by_field,
    "order_by_value": order_by_value,
    "SearchText": searchValue,
    "field": {DirectoryGroup_id:id}
  }, { 'headers': this.getHeader() }).pipe(
    map((res: any) => {
      return res;
    })
  );
}
insertDirectorypartner(Quotation: Directory, isEdit: boolean) {
  const uploadData = new FormData();
  for (let i = 0; i < Object.keys(Quotation).length; i++) {
    uploadData.append(Object.keys(Quotation)[i], Object.values(Quotation)[i]);
  }
  if (Quotation.Attachment != '') {
    uploadData.delete('Attachment');
    for (var i = 0; i < Quotation.Attachment.length; i++) {
      uploadData.append("Attachment", Quotation.Attachment[i]);
    }
  }
  else{
    uploadData.delete('Attachment');
  }
  return this.http.post(`${this.baseUrl2}/master_api/group_contact_person/${isEdit ? 'update' : 'create'}`, uploadData, { 'headers': this.getHeader() }).pipe(
    map((res: any) => {
      return res;
    })
  );
}

getDpPagination(pagination: any, searchValue: any, order_by_field: any, order_by_value: any) {
  return this.http.post(`${this.baseUrl2}/master_api/group_contact_person/contact_person_by_dp`, {
    // "SalesPersonCode":this.SalesEmployeeCode,
    // "PageNo": pagination.PageNo,
    // "maxItem": pagination.maxItem,
    // "order_by_field": order_by_field,
    // "order_by_value": order_by_value,
    // "SearchText": searchValue,
    "field": {}
  }, { 'headers': this.getHeader() }).pipe(
    map((res: any) => {
      return res;
    })
  );
}


getSegmentByPagination(pagination: any, searchValue: any, order_by_field: any, order_by_value: any) {
  return this.http.post(`${this.baseUrl2}/master_api/customer_segment/all_filter_page`, {
    "PageNo": pagination.PageNo,
    "maxItem": pagination.maxItem,
    "order_by_field": order_by_field,
    "order_by_value": order_by_value,
    "SearchText": searchValue,
    "field": {}
  }, { 'headers': this.getHeader() }).pipe(
    map((res: any) => {
      return res;
    })
  );
}

  insertSegment(indusadd: any, isEdit: boolean) {
    return this.http.post(`${this.baseUrl2}/master_api/customer_segment/${isEdit ? 'update' : 'create'}`, indusadd, { 'headers': this.getHeader() }).pipe(
      map((res: any) => {
        return res;
      })
    );
  }
  insertProject(indusadd: any, isEdit: boolean) {
    return this.http.post(`${this.baseUrl2}/master_api/project_type/${isEdit ? 'update' : 'create'}`, indusadd, { 'headers': this.getHeader() }).pipe(
      map((res: any) => {
        return res;
      })
    );
  }



getProjectByPagination(pagination: any, searchValue: any, order_by_field: any, order_by_value: any) {
  return this.http.post(`${this.baseUrl2}/master_api/project_type/all_filter_page`, {
    "PageNo": pagination.PageNo,
    "maxItem": pagination.maxItem,
    "order_by_field": order_by_field,
    "order_by_value": order_by_value,
    "SearchText": searchValue,
    "field": {}
  }, { 'headers': this.getHeader() }).pipe(
    map((res: any) => {
      return res;
    })
  );
}

getPricelistByPagination(pagination: any, searchValue: any, order_by_field: any, order_by_value: any) {
  return this.http.post(`${this.baseUrl2}/master_api/price_list/all_filter_page`, {
    "PageNo": pagination.PageNo,
    "maxItem": pagination.maxItem,
    "order_by_field": order_by_field,
    "order_by_value": order_by_value,
    "SearchText": searchValue,
    "field": {}
  }, { 'headers': this.getHeader() }).pipe(
    map((res: any) => {
      return res;
    })
  );
}

insertPrice(indusadd: any, isEdit: boolean) {
  return this.http.post(`${this.baseUrl2}/master_api/price_list/${isEdit ? 'update' : 'create'}`, indusadd, { 'headers': this.getHeader() }).pipe(
    map((res: any) => {
      return res;
    })
  );
}

getBPcatByPagination(pagination: any, searchValue: any, order_by_field: any, order_by_value: any, filteruser: any) {
  filteruser.CardCode = this.checkKeyEpty(filteruser.CardCode);
  return this.http.post(`${this.baseUrl2}/master_api/bp_catalogue/all_filter_page`, {
    "PageNo": pagination.PageNo,
    "maxItem": pagination.maxItem,
    "order_by_field": order_by_field,
    "order_by_value": order_by_value,
    "SearchText": searchValue,
    "field": {
      "CardCode": filteruser.CardCode,
    }
  }, { 'headers': this.getHeader() }).pipe(
    map((res: any) => {
      return res;
    })
  );
}
insertBP(indusadd: any, isEdit: boolean) {
  return this.http.post(`${this.baseUrl2}/master_api/bp_catalogue/${isEdit ? 'update' : 'create'}`, indusadd, { 'headers': this.getHeader() }).pipe(
    map((res: any) => {
      return res;
    })
  );
}

getComptitorQuotationByPagination(pagination: any, searchValue: any, filteruser: any, order_by_field: any, order_by_value: any) {
  filteruser.CreateDate = this.checkKeyEpty(filteruser.CreateDate);
  filteruser.CardCode = this.checkKeyEpty(filteruser.CardCode);
  filteruser.OppID = this.checkKeyEpty(filteruser.OppID);
  filteruser.CancelStatus = this.checkKeyEpty(filteruser.CancelStatus);
  filteruser.DocumentStatus = this.checkKeyEpty(filteruser.DocumentStatus);
  filteruser.CreateDate__gte = this.checkKeyEpty(filteruser.CreateDate__gte);
  filteruser.CreateDate__lte = this.checkKeyEpty(filteruser.CreateDate__lte);
  filteruser.is_draft = this.checkKeyEpty(filteruser.is_draft);
  return this.http.post(`${this.baseUrl2}/competitor_quotation/all_filter_page`, {
    "SalesPersonCode": this.SalesEmployeeCode,
    "PageNo": pagination.PageNo,
    "maxItem": pagination.maxItem,
    "order_by_field": order_by_field,
    "order_by_value": order_by_value,
    "SearchText": searchValue,
    "field": {
      // "CreateDate": filteruser.CreateDate,
      // "CardCode": filteruser.CardCode,
      // "U_OPPID": filteruser.OppID,
      // "DocumentStatus":filteruser.DocumentStatus,
      // "CancelStatus":filteruser.CancelStatus,
      // "departement": '2',
      // is_draft:filteruser.is_draft,
      // CreateDate__gte: filteruser.CreateDate__gte,
      // CreateDate__lte: filteruser.CreateDate__lte
    }
  }, { 'headers': this.getHeader() }).pipe(
    map((res: any) => {
      // //console.log(res)
      return res;
    })
  );

}

}
