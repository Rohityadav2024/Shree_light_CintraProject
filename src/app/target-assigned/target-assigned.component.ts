import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { PaymentTerms } from '../bridge';
import { BridgeService } from '../modules/service/bridge.service';
import { HeadingServicesService } from '../modules/service/heading-services.service';
declare var $: any;
@Component({
  selector: 'app-target-assigned',
  templateUrl: './target-assigned.component.html',
  styleUrls: ['./target-assigned.component.css']
})
export class TargetAssignedComponent implements OnInit {

    p: number = 1;
    sortedColumn: string = '';
    sortsend: boolean | undefined;
    pyterms: PaymentTerms[] = [];
    pyaddterms: PaymentTerms = {
      GroupNumber: '',
      PaymentTermsGroupName: ''
    };
    closeResult = '';
    UserName: any;
    error = '';
    success = '';
    searchValue: string = '';
    isLoading: boolean = false;
    isLoading2: boolean = false;
    pagelimit: any = 10;
    startind = 1;
    endind = 1;
    CurrentPage:any = 1;
    pagination: any = {
      PageNo: 1,
      maxItem: '10',
      PageShow:10
    }
    totalCount:any;
    commonObj : any={exportLoading:false}
    order_by_field:any = 'id';
    order_by_value:any = 'desc';
  Headingss: any[] = [];
    constructor(private modalService: NgbModal, private route: Router, private bridgeService2: BridgeService,private HeadingServices: HeadingServicesService,) { }

    ngOnInit(): void {
      this.bridgeService2.autoCall();
      this.getPyterms();
      this.Headingss = this.HeadingServices.getModule11();
      this.UserName = sessionStorage.getItem('UserName');
      if (this.UserName == undefined) {
        this.route.navigate(['/login']);
      }
    }

    count = new Array();
    selectAll1() {
      let num = (document.getElementById("selectAll1") as HTMLInputElement);
      if (num.checked) {
        this.count = [];
        for (let i = 0; i < this.pyterms.length; i++) {
          this.count.push(this.pyterms[i].id);
        }
        $("input[class=checkbox]").prop("checked", $("#selectAll1").prop("checked"));
        $(".extra-area").show();
      }
      else {
        this.count = [];
        $("input[class=checkbox]").prop("checked", $("#selectAll1").prop("checked"), false);
        $(".extra-area").hide();
      }
      if (this.count.length == 1) {
        this.commonObj.tbCheckM_1 = true;
        this.commonObj.tbCheckM_2 = true;
      } else if (this.count.length > 1) {
        this.commonObj.tbCheckM_1 = true;
        this.commonObj.tbCheckM_2 = false;
      } else {
        this.commonObj.tbCheckM_1 = false;
        this.commonObj.tbCheckM_2 = false;
      }

    }

    checkboxclick(id: any) {
      if(this.count.includes(id)){
        const index = this.count.indexOf(id);
        if (index > -1) { // only splice array when item is found
          this.count.splice(index, 1); // 2nd parameter means remove one item only
        }
      }
      else{
      this.count.push(id);
      }
      if (this.count.length == 1) {
        this.commonObj.tbCheckM_1 = true;
        this.commonObj.tbCheckM_2 = true;
      } else if (this.count.length > 1) {
        this.commonObj.tbCheckM_1 = true;
        this.commonObj.tbCheckM_2 = false;
      } else {
        this.commonObj.tbCheckM_1 = false;
        this.commonObj.tbCheckM_2 = false;
      }
      if (this.count.length == 0) {
        $('#selectAll1').prop('checked', false);
      }

      if (this.endind == this.count.length) {
        $('#selectAll1').prop('checked', true);
      }
      else {
        $('#selectAll1').prop('checked', false);
      }

    }
    reload() {
      this.count = [];
        $('#selectAll1').prop('checked', false);
        this.commonObj.tbCheckM_1 = false;
        this.commonObj.tbCheckM_2 = false;
        this.setNew();
        this.getPyterms();
    }

    resetAlerts() {
      this.error = '';
      this.success = '';
    }
    pageChanged(event:any){
      this.pagination.PageNo = event;
      this.reload();
    }
    togglesortType(key: any) {
      this.sortsend = !this.sortsend;
      this.order_by_field = key;
      if(this.sortsend == true){
        this.order_by_value = 'asc';
      }
      else{
        this.order_by_value = 'desc';
      }
      this.RowPerPage();
    }
    emptySeach(){
      this.searchValue = '';
      this.RowPerPage();
    }
    RowPerPage() {
      this.pagination.PageNo = 1;
      this.reload();
    }

    setPrevious(){
      var filterdata:any[] = this.bridgeService2.getAllFilter('customer');
      if(filterdata != undefined){
      this.pagination = filterdata[0];
      this.searchValue = filterdata[1];
      this.order_by_field = filterdata[2];
      this.order_by_value = filterdata[3];
      }
    }
    setNew(){
      this.bridgeService2.setAllFilter('customer',[this.pagination,this.searchValue,this.order_by_field,this.order_by_value]);
    }
    getPyterms(): void {
      this.isLoading2 = true;
      this.setPrevious();
      // this.bridgeService2.getTargetAssignedData().subscribe(
        this.bridgeService2.getTargetByPagination(this.pagination,this.searchValue,this.order_by_field,this.order_by_value).subscribe(
        (data: any) => {
          this.pyterms = data.data;
          this.totalCount = data.meta.count;
          this.CurrentPage = this.pagination.PageNo;
          // this.totalCount = data.data.length;
          this.isLoading2 = false;
          if(this.pagination.maxItem != 'All'){
          this.startind = ((this.pagination.PageNo - 1) * Number(this.pagination.maxItem)) + 1;
          this.endind = ((this.pagination.PageNo - 1) * Number(this.pagination.maxItem)) + Number(this.pagination.maxItem);
          if (this.endind > this.totalCount) {
            this.endind = this.totalCount;
          }
          this.pagination.PageShow = Number(this.pagination.maxItem);
        }
        else{
          this.startind = 1;
          this.endind = this.totalCount;
          this.pagination.PageShow = Number(this.totalCount);
        }
        if(this.totalCount == 0){
          this.startind = this.totalCount;
        }
        },
        (err) => {
          this.isLoading2 = false;
          console.log(err);
          this.error = err;
        }
      );
    }

    deletePay(id:any){
      if (confirm("Are You Sure Do You Want To Delete This Data ?")) {
      this.bridgeService2.deletePaymentTerms(id).subscribe(
        (res) => {
          if (Object(res)['status'] == "200") {
          this.getPyterms();
          }
        else {
          alert(Object(res)['message']);
        }
        },
        (err) => {
          this.error = err;
        }
      );
      };
    }
    isEdit:boolean = false;
    open(content: any, isEdit:boolean,data:any) {
      this.isEdit = isEdit;
      if(isEdit == true){
        this.pyaddterms = JSON.parse(JSON.stringify(data));
      }
      this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', modalDialogClass: 'modal-dialog-centered userList-cards-modal' }).result.then((result) => {
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

    addPaymentTerms(f: NgForm) {
      f = this.bridgeService2.GlobaleTrimFunc(f);
      this.resetAlerts();
      if (f.valid) {
        this.bridgeService2.insertPaymentTerms(this.pyaddterms,this.isEdit).subscribe(
          (res: PaymentTerms) => {
            if (Object(res)['status'] == "200") {
              this.isLoading = false;
              // this.pyterms.push(res)
              // Inform the user
              $(".success-box").show();
              this.modalService.dismissAll();
              setTimeout(() => {
                $(".success-box").fadeOut(1000);
                let currentUrl = this.route.url;
                this.route.routeReuseStrategy.shouldReuseRoute = () => false;
                this.route.onSameUrlNavigation = 'reload';
                this.route.navigate([currentUrl]);
              }, 2000);
            }
            else{
              alert(Object(res)['message']);
              this.isLoading = false;
            }


            // Reset the form
          },
          (err) => {
            const delim = ":"
            const name = err.message
            const result = name.split(delim).slice(3).join(delim)
            alert(result);
            this.modalService.dismissAll();
            this.ngOnInit();
          }
        );
      } else {
        for (let i = 0; i < Object.keys(f.value).length; i++) {
          var keyys = Object.keys(f.value)[i];
          if (f.value[keyys].length == 0) {
            if ($("input[name=" + keyys + "]").hasClass('required-fld')) {
              $("input[name=" + keyys + "]").addClass("red-line-border");
              $("input[name=" + keyys + "]").focus();
            }
          }
          else {
            $("input[name=" + keyys + "]").removeClass("red-line-border");
          }
        }
      }
    }

    suplier(item: any){
      this.route.navigate(['/target-assisment/target-assisment-details/'+item]);
    }
}



