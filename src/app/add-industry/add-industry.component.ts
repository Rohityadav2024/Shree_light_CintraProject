import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Industry } from '../bridge';
import { BridgeService } from '../modules/service/bridge.service';

@Component({
  selector: 'app-add-industry',
  templateUrl: './add-industry.component.html',
  styleUrls: ['./add-industry.component.css']
})
export class AddIndustryComponent implements OnInit {

  industry :Industry[] = [];
  indus: Industry = {
    IndustryDescription: "",
    IndustryName: "",
    IndustryCode: ''
  }
  isLoading: boolean = false;
  error = '';
  success = '';
  role: any;
  UserId: any;
  reportingTo: any;
  UserName: any;

  constructor(private bridgeService2: BridgeService,private router: Router, private modalService: NgbModal,private http: HttpClient) { }
  resetAlerts() {
    this.error = '';
    this.success = '';
  }

  ngOnInit(): void {
    this.bridgeService2.autoCall();
    this.UserName = sessionStorage.getItem('UserName');
    if(this.UserName == undefined){
      this.router.navigate(['/login']);
    }

    localStorage.removeItem('rolename');

  }

  addIndustry(f: NgForm) {
    f = this.bridgeService2.GlobaleTrimFunc(f);
    this.resetAlerts();
    // this.isLoading = true;
    this.bridgeService2.insertIndustry(this.indus,false).subscribe(
      (res: Industry) => {
        this.isLoading = false;
        // Update the list of cars
        this.industry.push(res);
        // $(".success-box").show();
        this.modalService.dismissAll();
        setTimeout(()=>{
          // $(".success-box").fadeOut(1000);
          this.router.navigate(['/industry']);
        }, 2000);
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
