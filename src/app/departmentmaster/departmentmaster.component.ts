import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ZoneMaster } from '../bridge';
import { BridgeService } from '../modules/service/bridge.service';
declare var $: any;

@Component({
  selector: 'app-departmentmaster',
  templateUrl: './departmentmaster.component.html',
  styleUrls: ['./departmentmaster.component.scss']
})
export class DepartmentmasterComponent implements OnInit {

      p: number = 1;
      sortedColumn: string = '';
      sortsend: boolean | undefined;
      customertype: ZoneMaster[] = [];
      type: ZoneMaster = {
        Name: "",
        Status:'1'

      }
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
      pagination: any = {
        PageNo: 1,
        maxItem: '10',
        PageShow:10
      }
      isEdit:boolean = false;
      totalCount:any;
      commonObj : any={exportLoading:false}
      order_by_field:any = 'id';
      order_by_value:any = 'desc';
      constructor(private modalService: NgbModal, private route: Router, private bridgeService2: BridgeService) { }

      ngOnInit(): void {
        this.bridgeService2.autoCall();
        this.getCustomerTypeList();
        localStorage.removeItem('rolename');
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
          for (let i = 0; i < this.customertype.length; i++) {
            this.count.push(this.customertype[i].id);
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
          this.getCustomerTypeList();
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
      getCustomerTypeList(): void {
        this.isLoading2 = true;
        this.bridgeService2.getdepartmentsMasterPagination(this.pagination,this.searchValue,this.order_by_field,this.order_by_value).subscribe(
          (data: any) => {
            this.customertype = data.data;
            this.totalCount = data.meta.count;
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


      open(content: any, isEdit:boolean,data:any) {
        this.isEdit = isEdit;
        if(isEdit == true){
          this.type = JSON.parse(JSON.stringify(data));
        }

        this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', modalDialogClass: 'modal-dialog-centered order-cards-modal' }).result.then((result) => {
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


      addCustomerType(f: NgForm) {
        f = this.bridgeService2.GlobaleTrimFunc(f);
        this.resetAlerts();
        if (f.valid) {
          this.bridgeService2.addEditdepartmentsMaster(this.type,this.isEdit).subscribe(
            (res: any) => {
              if (Object(res)['status'] == "200") {
              this.isLoading = false;
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


    }

