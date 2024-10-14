import { Component, OnInit } from '@angular/core';
import { Login } from '../login';
import { BridgeService } from '../modules/service/bridge.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NotiferService } from '../modules/service/helpers/notifer.service';
import { HeadingServicesService } from '../modules/service/heading-services.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  logins: Login[] = []
  login: any = { email: '', password: '', FCM: '',"app_id": "2" };
  verifyEmail: any = { email: '',app_id: "2"};
  verifyOtp: any = { email: '',password: '',otp:''};
  error = '';
  success = '';
  router: any;
  mobile:any;
  empName: any;
  empId: any;
  role: any;
  reportingTo: any;
  SalesEmployeeCode: any;
  fieldTextType: boolean = false;
  forgotPasswordClicked = '1';
  rememberMe: boolean = false;
  roleid: any;
  constructor(private bridgeService: BridgeService,
    public HeadingServices: HeadingServicesService,private _NotifierService: NotiferService, private route: Router, private http: HttpClient) {
  }

  ngAfterViewInit() {
    (document.querySelector('.sidebar') as HTMLElement)?.classList?.add('d-none');
    (document.querySelector('.figma-sidebar') as HTMLElement)?.classList?.add('d-none');
  }
  ngOnInit(): void {
    this.bridgeService.autoCall();

    var currentUserdat:any =  localStorage.getItem('currentUser')
    if (currentUserdat) {
      this.bridgeService.getHeader(currentUserdat)
      this.autoLogin(true);
    }
    // this.getCars();
  }
  showForgotPasswordForm(pos:any) {
    // if(pos == '2'){
    //   this.verifyEmail.email = '';
    // }
    this.forgotPasswordClicked = pos;
  }

  autoLogin(rememberMe:boolean){
    this.bridgeService.loginFunctionbyToken(rememberMe).subscribe((res: any) => {

      if (Object(res)['message'] == "Success" && Object(res)['status'] == 200) {
        this.loginLoder = false;
        this.empName = res.data[0]['firstName']+' '+res.data[0]['lastName'];
        this.empId = res.data[0]['id'];
        this.mobile = res.data[0]['Mobile'];
        this.role = res.data[0]['RoleDetails'].Name;
        this.reportingTo = res.data[0]['reportingTo'];


        this.SalesEmployeeCode = res.data[0]['SalesEmployeeCode'];
        sessionStorage.setItem('Currency', res.data[0]['ProjectSetting'][0].currency_value);
        sessionStorage.setItem('ProjectSetting', JSON.stringify(res.data[0]['ProjectSetting']));
        sessionStorage.setItem('UserName', this.empName);
        sessionStorage.setItem('client_id', res.data[0]['client_id']);
        sessionStorage.setItem('UserId', this.empId);
        sessionStorage.setItem('Mobile', this.mobile);
        sessionStorage.setItem('role', this.role.toLowerCase());
        sessionStorage.setItem('reportingTo', this.reportingTo);
        sessionStorage.setItem('currencySymbol', res.data[0]['ProjectSetting'][0].currency_value);
        sessionStorage.setItem('currencyCode', res.data[0]['ProjectSetting'][0].currency_type);
        sessionStorage.setItem('exportStatus', res.data[0]['ProjectSetting'][0].export_status);
        sessionStorage.setItem('SalesEmployeeCode', this.SalesEmployeeCode);


      }
      else {
        this.loginLoder = false;
        this._NotifierService.showError(Object(res)['message']);
      }
    },
      (err) => {
        this.loginLoder = false;
        const delim = ":"
        const name = err.message
        const result = name.split(delim).slice(3).join(delim)
        this._NotifierService.showError(result);
      }
    );
  }
  loginLoder:boolean = false;
  addLogin(f: NgForm) {
    this.loginLoder = true;
    f = this.bridgeService.GlobaleTrimFunc(f);
    this.resetAlerts();


    this.bridgeService.MainSessionloginFunction(this.login).subscribe(
      (ressession: any) => {
        if (ressession.status == 200) {

          this.bridgeService.loginFunctionbyToken(this.rememberMe).subscribe((res: any) => {

            if (Object(res)['message'] == "Success" && Object(res)['status'] == 200) {
              this.loginLoder = false;
              this.empName = res.data[0]['firstName']+' '+res.data[0]['lastName'];
              this.empId = res.data[0]['id'];
              this.mobile = res.data[0]['Mobile'];
              this.role = res.data[0]['RoleDetails'].Name;
              this.reportingTo = res.data[0]['reportingTo'];
              this.roleid= res.data[0]['role'];
              this.SalesEmployeeCode = res.data[0]['SalesEmployeeCode'];
              sessionStorage.setItem('UserName', this.empName);
              sessionStorage.setItem('client_id', res.data[0]['client_id']);
              sessionStorage.setItem('ProjectSetting', JSON.stringify(res.data[0]['ProjectSetting']));
              sessionStorage.setItem('Currency', res.data[0]['ProjectSetting'][0].currency_value);
              sessionStorage.setItem('currencySymbol', res.data[0]['ProjectSetting'][0].currency_value);
              sessionStorage.setItem('currencyCode', res.data[0]['ProjectSetting'][0].currency_type);
              sessionStorage.setItem('exportStatus', res.data[0]['ProjectSetting'][0].export_status);
              sessionStorage.setItem('UserId', this.empId);
              sessionStorage.setItem('Mobile', this.mobile);
              sessionStorage.setItem('role', this.role.toLowerCase());
              sessionStorage.setItem('FirstLogin', 'true');
              sessionStorage.setItem('reportingTo', this.reportingTo);
              sessionStorage.setItem('SalesEmployeeCode', this.SalesEmployeeCode);
              // this.bridgeService.logindatapost(res.data[0]);
              // this.route.navigate(['/dashboard']);
              this.bridgeService.getAccessManagementRole(this.roleid).subscribe((accessRes: any) => {
                  // console.log(accessRes.data);
                  res.data[0].AccessManagement = accessRes.data;
              this.bridgeService.logindatapost(res.data[0]);
                  sessionStorage.setItem('savedModules', JSON.stringify(accessRes.data));
                },
                (accessError: any) => {
                  console.error('Error fetching access modules', accessError);
                }
              );
              this.bridgeService.getFiledManagment().subscribe(
                (accessRes: any) => {
                  if (accessRes && accessRes.status === 200) {
                    // sessionStorage.setItem('Allfields', JSON.stringify(accessRes.data));
                    // console.log(accessRes.data);
                    this.HeadingServices.logindatapost(accessRes.data);
                  } else {
                    this._NotifierService.showError('Unexpected response status: ' + accessRes.status);
                  }
                },
                (accessError: any) => {
                  this._NotifierService.showError('Error fetching access modules. Please try again later:' + accessError.status);
                }
              );
              this.route.navigate(['/dashboard']);
            }
            else {
              this.loginLoder = false;
              this._NotifierService.showError(Object(res)['message']);
            }
          },
            (err) => {
              this.loginLoder = false;
              const delim = ":"
              const name = err.message
              const result = name.split(delim).slice(3).join(delim)
              this._NotifierService.showError(result);
            }
          );
        }
        else {
          this.loginLoder = false;
          // this._NotifierService.showError('Your Session is not Working');
          this._NotifierService.showError(Object(ressession)['errors']);
        }
      },
      (err) => {
        this.loginLoder = false;
        const delim = ":"
        const name = err.message
        const result = name.split(delim).slice(3).join(delim)
        this._NotifierService.showError(result);
      }
    );
    // console.log("login",this.login)


  }

  CheckEmail(f: NgForm) {
    this.loginLoder = true;
    f = this.bridgeService.GlobaleTrimFunc(f);
    this.resetAlerts();
    this.bridgeService.checkEmail(this.verifyEmail).subscribe(
      (ressession: any) => {
        if (ressession.status == 200) {
          this.loginLoder = false;
          this._NotifierService.showSuccess('OTP Send to '+this.verifyEmail.email)
          this.showForgotPasswordForm('3');
          this.verifyOtp.email = this.verifyEmail.email;
        }
        else {
          this.loginLoder = false;
          // this._NotifierService.showError('Your Session is not Working');
          this._NotifierService.showError(Object(ressession)['message']);
        }
      },
      (err) => {
        this.loginLoder = false;
        const delim = ":"
        const name = err.message
        const result = name.split(delim).slice(3).join(delim)
        this._NotifierService.showError(result);
      }
    );
  }


  CheckOtp(f: NgForm) {
    this.loginLoder = true;
    f = this.bridgeService.GlobaleTrimFunc(f);
    this.resetAlerts();
    this.bridgeService.VerifyOTP(this.verifyOtp).subscribe(
      (ressession: any) => {
        if (ressession.status == 200) {
          this.loginLoder = false;
          this._NotifierService.showSuccess('Update Password successfully')
          this.showForgotPasswordForm('1');
        }
        else {
          this.loginLoder = false;
          this._NotifierService.showError(Object(ressession)['message']);
        }
      },
      (err) => {
        this.loginLoder = false;
        const delim = ":"
        const name = err.message
        const result = name.split(delim).slice(3).join(delim)
        this._NotifierService.showError(result);
      }
    );
  }

  resetAlerts() {
    this.error = '';
    this.success = '';
  }


  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }
}
