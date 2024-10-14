  import { Component, OnInit } from '@angular/core';
  import { ActivatedRoute, Router } from '@angular/router';
  import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
  import { BridgeService } from '../modules/service/bridge.service';
  import { NgForm } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Item } from '../warehouse';
import {Location} from '@angular/common';
  declare var $: any;

@Component({
  selector: 'app-inventory-details',
  templateUrl: './inventory-details.component.html',
  styleUrls: ['./inventory-details.component.css']
})
export class InventoryDetailsComponent implements OnInit {
  closeResult = '';
  UserName: any;
  idd: any;
  SalesEmployeeCode: any;
  error = '';
  success = '';
  isLoading2: boolean = false;
  isdataLoading:boolean=false;
  searchValue!: string;
  dateObj = new Date();
  time = this.dateObj.toLocaleTimeString();
  month2 = this.dateObj.getMonth()+1;
  month = (this.month2 < 10 ? '0' : '') + this.month2;
  day = (this.dateObj.getDate() < 10 ? '0' : '') + this.dateObj.getDate();
  year = this.dateObj.getUTCFullYear();

  newdate = this.day + "-" + this.month + "-" + this.year;


items: Item[] = [];
          constructor(private modalService: NgbModal,private route:Router,private _location: Location, private bridgeService2: BridgeService,private http: HttpClient,private router: ActivatedRoute) { }


    ngOnInit(): void {



      this.bridgeService2.autoCall();

      this.UserName = sessionStorage.getItem('UserName');
      this.SalesEmployeeCode = sessionStorage.getItem('SalesEmployeeCode');
      if(this.UserName == undefined){
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

  this.getItems();
  }

  InventoryDetails(){
    this.route.navigate(['/inventory-details']);
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

    backClicked(){
      this._location.back();

    }

    resetAlerts() {
      this.error = '';
      this.success = '';
    }

    getItems(): void {

      this.idd = this.router.snapshot.params.id;
        this.isdataLoading = true;
        this.bridgeService2.getInventoryOnedata(this.idd).subscribe(
          (data: Item[]) => {
            this.isdataLoading = false;
            this.items = data;

          },
          (err) => {
            this.isdataLoading = false;
            console.log(err);
            this.error = err;
          }
        );
      }

  }


