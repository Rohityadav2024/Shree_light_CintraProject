import { Component, OnInit } from '@angular/core';
import { BridgeService } from '../modules/service/bridge.service';

@Component({
  selector: 'app-confirm-app',
  templateUrl: './confirm-app.component.html',
  styleUrls: ['./confirm-app.component.scss']
})
export class ConfirmAppComponent implements OnInit {
  Application: any = {
    "application": "3",
    "license_cost": "0",
    "active_users": 2,
    "url": "",
    "backend_url": "",
    "start_date": "",
    "end_date": "",
    "payment_frequency": "Once",
    "subscription": "1",
    "customer": ''
}
  constructor(public bridgeService2: BridgeService) { }

  ngAfterViewInit() {
    (document.querySelector('.sidebar') as HTMLElement)?.classList?.add('d-none');
    (document.querySelector('.figma-sidebar') as HTMLElement)?.classList?.add('d-none');
  }
  ngOnInit(): void {
  }
  closeIt(){
  window.close();
  }


  upgradeIt(){
    window.location.href = 'http://superadmin.bridgexd.com/assets/html/serve.html#PricingSection';
    }

  confirmFun(){
    // if (confirm("Ready to enable Serve? Log in now!")) {
      var date = new Date();
      var monthss = date.getMonth() + 1;
      var month = (monthss < 10 ? '0' : '') + monthss;
      var dayss = (date.getDate() < 10 ? '0' : '') + date.getDate();
      var date2 = date.getFullYear() + "-" + month + "-" + dayss;
      // console.log(date2)
      var currentDate = new Date();
currentDate.setDate(date.getDate() + 30);
var monthss30 = currentDate.getMonth() + 1;
var month30 = (monthss30 < 10 ? '0' : '') + monthss30;
var dayss30 = (currentDate.getDate() < 10 ? '0' : '') + currentDate.getDate();
var date230 = currentDate.getFullYear() + "-" + month30 + "-" + dayss30;
      this.Application.customer = sessionStorage.getItem('client_id')
      this.Application.start_date = date2
      this.Application.end_date = date230
      this.bridgeService2.storeApplication(Array(this.Application),false).subscribe(
        (res: any) => {
          if (Object(res)['status'] == "200") {
          window.location.href = 'http://servesaas.bridgexd.com/#/login';
          }
          else {
            alert(Object(res)['errors']);
          }
        },
        (err) => {
          const delim = ':';
          const name = err.errors;
          const result = name.split(delim).slice(3).join(delim);
          alert(result);
          // window.location.reload();
        }
      );
    // }
  }
}
