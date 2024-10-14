import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons, } from '@ng-bootstrap/ng-bootstrap';
import { BridgeService } from '../modules/service/bridge.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { DatePipe } from '@angular/common';
declare var $: any;

@Component({
  selector: 'app-superadmindashboard',
  templateUrl: './superadmindashboard.component.html',
  styleUrls: ['./superadmindashboard.component.scss']
})
export class SuperadmindashboardComponent implements OnInit {
  UserName: any;
  SalesEmployeeCode: any;
  role: any;
  baseUrl2: any;
  dateObj = new Date();
  time = this.dateObj.toLocaleTimeString();
  month2 = this.dateObj.getMonth() + 1;
  month = (this.month2 < 10 ? '0' : '') + this.month2;
  day = (this.dateObj.getDate() < 10 ? '0' : '') + this.dateObj.getDate();
  year = this.dateObj.getUTCFullYear();
  newdate = this.day + "-" + this.month + "-" + this.year;

  closeResult = '';

  constructor(private modalService: NgbModal, public datepipe: DatePipe, private bridgeService: BridgeService, private route: Router, private http: HttpClient) {
    this.baseUrl2 = this.bridgeService.baseUrl2;
  }

  ngOnInit(): void {
    this.bridgeService.autoCall();

    this.UserName = sessionStorage.getItem('UserName');
    this.role = sessionStorage.getItem('role');
    this.SalesEmployeeCode = sessionStorage.getItem('SalesEmployeeCode');
    if (this.UserName == undefined) {
      this.route.navigate(['/login']);
    }
  }


  addCustomer(content: any) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', modalDialogClass: 'modal-dialog-centered payment-cards-modal' }).result.then((result) => {
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

  editcustomer(content: any) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', modalDialogClass: 'modal-dialog-centered payment-cards-modal' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  deletecustomer(){
    alert('Are You Delete Customer');
  }

}
