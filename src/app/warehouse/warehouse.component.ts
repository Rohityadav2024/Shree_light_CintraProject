import { Component, OnInit } from '@angular/core';
import { Bridge, EditBridge } from '../bridge';
import { BridgeService } from '../modules/service/bridge.service';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Warehouse } from '../warehouse';
declare var $: any;
@Component({
  selector: 'app-warehouse',
  templateUrl: './warehouse.component.html',
  styleUrls: ['./warehouse.component.css']
})
export class WarehouseComponent implements OnInit {

    p: number = 1;
    warehouses: Warehouse[] = [];
    bridges: Bridge[] = [];
    dateObj = new Date();
   time = this.dateObj.toLocaleTimeString();
   month2 = this.dateObj.getMonth()+1;
   month = (this.month2 < 10 ? '0' : '') + this.month2;
   day = (this.dateObj.getDate() < 10 ? '0' : '') + this.dateObj.getDate();
   year = this.dateObj.getUTCFullYear();
   months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
   newdate = this.day + "-" + this.month + "-" + this.year;

   newdatetime = this.newdate +" "+ this.time;


   warehouse: Warehouse =  {Name:'', Address:'',City:'',
   State:'', Pin:'',Country:'',
   Status:'1',
   CreatedDate: this.newdate,
   CreatedTime: this.time,
   UpdatedDate: this.newdate,
   UpdatedTime: this.time};

    bridge2: EditBridge =  {companyID:'', userName:'',password:'',
    firstName:'', middleName:'',lastName:'',
    Email:'', Mobile:'',role:'',SalesEmployeeCode: '',
    departement:'',
    zone:'',
    SalesEmployeeName: '',
    EmployeeID: '',
    position:'', branch:'',Active:'',passwordUpdatedOn:'', lastLoginOn:'',reportingTo:'',
    timestamp:'',id:0};

    searchValue!: string;
    fieldTextType: boolean | undefined;
    error = '';
    success = '';
    closeResult = '';
    UserName: any;
    role: any;
    isLoading: boolean = false;
    isLoading2: boolean = false;
    isLoading3: boolean = false;
    constructor(private bridgeService: BridgeService, private modalService: NgbModal,private route:Router) {
    }

    ngOnInit() {




      this.bridgeService.autoCall();
      // console.log(this.newdatetime)

      this.UserName = sessionStorage.getItem('UserName');
      this.role = sessionStorage.getItem('role');
      if(this.UserName == undefined){
        this.route.navigate(['/login']);
      }
      if(this.role != 'admin'){
        this.route.navigate(['/dashboard']);
      }
      this.getBridge();

      $(document).mouseup(function (e: { target: any; }) {
        var popup = $(".hover-show");
        if (!$('.edit-delete').is(e.target) && !popup.is(e.target) && popup.has(e.target).length == 0) {
            popup.hide();
        }
    });

    $(document).ready(function () {
      $('.hover-show').hide()
  });



    }

    resetAlerts() {
      this.error = '';
      this.success = '';
    }

     getBridge(): void {
      this.bridgeService.getwarehousedata().subscribe(
        (data: Warehouse[]) => {
          this.warehouses = data;

        },
        (err) => {
          console.log(err);
          this.error = err;
        }
      );
    }

    addUser(f: NgForm) {
      f = this.bridgeService.GlobaleTrimFunc(f);
      this.resetAlerts();
      this.isLoading = true;
      this.bridgeService.storeWarehouse(this.warehouse).subscribe(
        (res: Warehouse) => {
          // Update the list of cars
          this.warehouses.push(res)
          this.isLoading = false;
           $(".success-box").show();
           this.modalService.dismissAll();
          setTimeout(()=>{
            $(".success-box").fadeOut(1000);
            let currentUrl = this.route.url;
             this.route.routeReuseStrategy.shouldReuseRoute = () => false;
             this.route.onSameUrlNavigation = 'reload';
             this.route.navigate([currentUrl]);
        }, 2000);

        },
        (err) => {
          this.isLoading = false;
          const delim = ":"
          const name = err.message
          const result = name.split(delim).slice(3).join(delim)
          alert(result);
          this.modalService.dismissAll();
           this.ngOnInit();
        }
      );
    }



    deleteid: number = 0;
    deleteUser(id: number) {
      $(".delete-success-box").show();
      $('.hover-show').hide();
      this.deleteid = id;

      setTimeout(()=>{
        $(".delete-success-box").fadeOut();
    }, 50000);
    }

    yesdeleteUser(status: number){
      if(status == 1){
      let id = [this.deleteid];
      this.resetAlerts();
      this.isLoading2 = true;
      this.bridgeService.deleteuser(id).subscribe(
        (res) => {
          this.bridges = this.bridges.filter(function (item) {
            return item['id'] && +item['id'] !== +id;
          });
          this.isLoading2 = false;
        },
        (err) => {this.error = err; this.isLoading2 = false; }
      );
        this.ngOnInit();
        $(".delete-success-box").hide();
      }
      else{
        this.modalService.dismissAll();
        this.ngOnInit();
        $(".delete-success-box").hide();
      }

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


    openEdit(contentEdit: any, item: Bridge) {
      this.modalService.open(contentEdit, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
        this.closeResult = `Closed with: ${result}`;
      }, (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      });
      // item.edit_id =

      this.bridge2.companyID = item.companyID;
      this.bridge2.id = Number(item.id);
      this.bridge2.userName = item.userName;
      this.bridge2.password = item.password;
      this.bridge2.firstName = item.firstName;
      this.bridge2.middleName = item.middleName;
      this.bridge2.lastName = item.lastName;
      this.bridge2.Email = item.Email;
      this.bridge2.Mobile = item.Mobile;
      this.bridge2.role = item.role;
      this.bridge2.position = item.position;
      this.bridge2.branch = item.branch;
      this.bridge2.passwordUpdatedOn = item.passwordUpdatedOn;
      this.bridge2.lastLoginOn = item.lastLoginOn;
      this.bridge2.reportingTo = item.reportingTo;
      this.bridge2.timestamp = item.timestamp;
      this.bridge2.SalesEmployeeCode = item.SalesEmployeeCode;
      this.bridge2.SalesEmployeeName = item.SalesEmployeeName;
      this.bridge2.EmployeeID = item.EmployeeID;
      this.bridge2.Active = item.Active;

    }



    editUser(fb: NgForm) {
      fb = this.bridgeService.GlobaleTrimFunc(fb);
      this.resetAlerts();
      this.bridge2.SalesEmployeeName = this.bridge2.firstName;
      this.isLoading3 = true;
      this.bridgeService.edituser(this.bridge2).subscribe(
        (res: EditBridge) => {
          this.bridges.push(res)
          this.isLoading3 = false;
          $(".edit-success-box").show();
          this.modalService.dismissAll();
         setTimeout(()=>{
           $(".edit-success-box").fadeOut(1000);
           let currentUrl = this.route.url;
            this.route.routeReuseStrategy.shouldReuseRoute = () => false;
            this.route.onSameUrlNavigation = 'reload';
            this.route.navigate([currentUrl]);
       }, 2000);
        },
        (err) => {
          this.isLoading3 = false;
          const delim = ":"
          const name = err.message
          const result = name.split(delim).slice(3).join(delim)
          alert(result);
          this.modalService.dismissAll();
           this.ngOnInit();
           let currentUrl = this.route.url;
           this.route.routeReuseStrategy.shouldReuseRoute = () => false;
           this.route.onSameUrlNavigation = 'reload';
           this.route.navigate([currentUrl]);
        }
      );
    }



    openPass(contentchangepassword: any, item: Bridge) {
      this.modalService.open(contentchangepassword, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
        this.closeResult = `Closed with: ${result}`;
      }, (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      });
      // item.edit_id =
      this.bridge2.id = Number(item.id);
    }

    toggleFieldTextType() {
      this.fieldTextType = !this.fieldTextType;
    }

    editdeletepop(item: Warehouse) {
      $('.hover-show'+item.id).show()
  }


  }


