import { Component, OnInit } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-employee-milan',
  templateUrl: './employee-milan.component.html',
  styleUrls: ['./employee-milan.component.css']
})
export class EmployeeMilanComponent implements OnInit {

  UserName: any = 'Milan';
  closeResult = '';
  error = '';
  success = '';
  isLoading: boolean = false;
  constructor(private modalService: NgbModal) { }

  ngOnInit(): void {
    sessionStorage.removeItem('rolename');
    sessionStorage.removeItem('srolename');

    sessionStorage.removeItem('leadtype');
    sessionStorage.removeItem('leadstatus');
    sessionStorage.removeItem('leadcat');

    sessionStorage.removeItem('customerstates');

    sessionStorage.removeItem('opportunitystartdate');
    sessionStorage.removeItem('opportunitycustomer');
    sessionStorage.removeItem('opportunitysource');

    sessionStorage.removeItem('quotationstartdate');
    sessionStorage.removeItem('quotationcustomer');

    sessionStorage.removeItem('orderstartdate');
    sessionStorage.removeItem('ordercustomer');
  }

  open(content: any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
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
      return  `with: ${reason}`;
    }
  }

  resetAlerts() {
    this.error = '';
    this.success = '';
  }

  addUser(f: NgForm) {
    this.resetAlerts();
    this.isLoading = true;
  }

  getValues(val: any) {
    console.warn(val);
    // alert('hi')
  }
}
