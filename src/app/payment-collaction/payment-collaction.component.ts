import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { PaymentTerms } from '../bridge';
import { BridgeService } from '../modules/service/bridge.service';
import { BusinessPartners } from '../businesspartners';
import { HeadingServicesService } from '../modules/service/heading-services.service';
import { NotiferService } from '../modules/service/helpers/notifer.service';
import * as XLSX from 'xlsx'
declare var $: any;

@Component({
  selector: 'app-payment-collaction',
  templateUrl: './payment-collaction.component.html',
  styleUrls: ['./payment-collaction.component.scss']
})
export class PaymentCollactionComponent implements OnInit {
    p: number = 1;
    sortedColumn: string = '';
    sortsend: boolean | undefined;
    pyterms: PaymentTerms[] = [];
    pyaddterms: any = {
        "CardCode": "",
        "InvoiceNo": "",
        "TransactId": "",
        "TransactMod": "",
        "PaymentDate": "",
        "TotalAmt": "",
        "DueAmount": "",
        "ReceivedAmount": "",
        "Attach":"",
        "Remarks": "",
        "CreatedBy": sessionStorage.getItem('SalesEmployeeCode'),
        "UpdatedBy": sessionStorage.getItem('SalesEmployeeCode')
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
    businesspartners: BusinessPartners[] = [];
    invoice:any[]=[];
    Headingss: any[] = [];
    Attachment: any = {
      id: '',
      File: '',
      LinkType: '',
      LinkID: '',
      Caption:'',
      CreateDate: this.HeadingServices.getDate(),
      CreateTime: this.HeadingServices.getTime(),
      UpdateDate: this.HeadingServices.getDate(),
      UpdateTime: this.HeadingServices.getTime(),
    }

    fl: any = [];
    fl2: any = [];
    flAttach:any='';
    filter_customer: any = {CreateDate:'',CardCode:''};
  Headingss1: any[]=[];
  Headingss2: any[]=[];
  exportStatus: boolean = false;
  savedModules: any[] = [];
    constructor(private modalService: NgbModal,
      public HeadingServices: HeadingServicesService,
      private _NotifierService: NotiferService, private route: Router, private bridgeService2: BridgeService) { }

    ngOnInit(): void {
      if (!this.HeadingServices.isModuleView(9)) {
        this.route.navigate(['/dashboard']);
      }
      this.bridgeService2.autoCall();
      this.getPyterms();
      this.getBusinessPartmers();
      this.getInvoice();
      this.checkExportStatus();
      this.Headingss = this.HeadingServices.getModule9();
      
      // this.Headingss2 = this.HeadingServices.getModule8();
      this.UserName = sessionStorage.getItem('UserName');
      if (this.UserName == undefined) {
        this.route.navigate(['/login']);
      }

      const savedModulesString = sessionStorage.getItem('savedModules');
    if (savedModulesString) {
      this.savedModules = JSON.parse(savedModulesString);
    }

    }

    getspit(dat:any){
      // var ret = dat.split("\\");
      // return ret[ret.length-1]
      return dat;
    }
    onFileChanged(event: any) {
      this.fl = [];
      if(event.target.files.length > 1){
        this.flAttach = event.target.files.length+ ' Files';
      }
      else{
      this.flAttach = event.target.files[0].name;
      }
      for (var i = 0; i < event.target.files.length; i++) {
        this.fl.push(event.target.files[i]);
      }
    }
    onFileChanged2(event: any) {
      if(event.target.files.length > 1){
        this.flAttach = event.target.files.length+ ' Files';
      }
      else{
      this.flAttach = event.target.files[0].name;
      }
      if(confirm('Are you sure do you want to add this attachment')){
      this.fl2 = [];
      for (var i = 0; i < event.target.files.length; i++) {
        this.fl2.push(event.target.files[i]);
      }
      this.Attachment.File = this.fl2;
      this.bridgeService2.storeAttachmany(this.Attachment).subscribe(
        (res: any) => {
          if (Object(res)['status'] == "200") {
            this.isLoading = false;
            this.bridgeService2.getAttachdata(this.Attachment.LinkID,this.Attachment.LinkType).subscribe(
              (res2:any) => {
                this.pyaddterms.AttachDetails = res2;
                this.fl2 = [];
                this.flAttach = '';
                this.getPyterms();
              },
              (err:any) => { this.error = err;  }
            );
          }
          else {
            this._NotifierService.showError(Object(res)['message']);
            this.isLoading = false;
          }
        },
        (err) => {
          this.isLoading = false;
          const delim = ":"
          const name = err.message
          const result = name.split(delim).slice(3).join(delim)
          this._NotifierService.showError(result);
          this.ngOnInit();
        }
      );
      }
    }

    deleteAttachment(contentDelete: any){

      if (confirm("Are You Sure You Want to Delete Attachment?") == true) {
        this.bridgeService2.deleteAttach(contentDelete).subscribe(
          (res:any) => {
            this.bridgeService2.getAttachdata(this.Attachment.LinkID,this.Attachment.LinkType).subscribe(
              (res2:any) => {
                this.pyaddterms.AttachDetails = res2;
                this.getPyterms();
              },
              (err:any) => { this.error = err;  }
            );
          },
          (err:any) => { this.error = err;  }
        );
      }
    }

    selectChangeHandlerItem(event: any) {
      this.filter_customer.CardCode = event;
      this.getInvoice();
    }
    selectChangeHandlerItem2(event: any) {
      // this.filter_customer.CardCode = event;
      // this.getInvoice();
      this.bridgeService2.getOneInvoicedata(event).subscribe(
        (data: any[]) => {
          this.pyaddterms.TotalAmt =  Number(data[0].due_amount);
          this.pyaddterms.DueAmount = Number(this.pyaddterms.TotalAmt) - Number(this.pyaddterms.ReceivedAmount)
        },
        (err) => {
          console.log(err);
        }
      );
    }
    getBusinessPartmers(): void {
      this.bridgeService2.getBusinessPartmersShortdata().subscribe(
        (data: BusinessPartners[]) => {
          this.businesspartners = data;

        },
        (err) => {
          console.log(err);
          this.error = err;
        }
      );
    }

    calculateDue(){
      this.pyaddterms.DueAmount = Number(this.pyaddterms.TotalAmt) - Number(this.pyaddterms.ReceivedAmount)
    }
    getInvoice(): void {
      // this.isLoading2 = true;
      this.bridgeService2.getInvoiceByPagination({PageNo: 1,maxItem: 'All'},'',this.filter_customer,'id','desc').subscribe(
        (data: any) => {
          if (data.status == "200") {
          this.invoice = data.data;
      }

      else {
        this._NotifierService.showError(data.message);
        this.totalCount = 0;
        // this.isLoading2 = false;
      }
    },
        (err) => {
          this.isLoading2 = false;
          this.totalCount = 0;
          const delim = ':';
          const name = err.message;
          const result = name.split(delim).slice(3).join(delim);
          this._NotifierService.showError(result);
        }
      );
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
      var filterdata:any[] = this.bridgeService2.getAllFilter('payment');
      if(filterdata != undefined){
      this.pagination = filterdata[0];
      this.searchValue = filterdata[1];
      this.filter_customer = filterdata[2];
      this.order_by_field = filterdata[3];
      this.order_by_value = filterdata[4];
      }
    }
    setNew(){
      this.bridgeService2.setAllFilter('payment',[this.pagination,this.searchValue,this.filter_customer,this.order_by_field,this.order_by_value]);
    }
    getPyterms(): void {
      this.isLoading2 = true;
      this.setPrevious();
      this.bridgeService2.getPaymentCollactionByPagination(this.pagination,this.searchValue,this.order_by_field,this.order_by_value).subscribe(
        (data: any) => {
          this.pyterms = data.data;
          this.totalCount = data.meta.count;
          this.CurrentPage = this.pagination.PageNo;
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
          this._NotifierService.showError(Object(res)['message']);
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
      this.flAttach = '';
      if(isEdit == true){
        this.pyaddterms = JSON.parse(JSON.stringify(data));
        this.Attachment.LinkID =  this.pyaddterms.id;
        this.Attachment.LinkType = "Payment";
      }
      else{
        this.pyaddterms = {
          "CardCode": "",
          "InvoiceNo": "",
          "TransactId": "",
          "TransactMod": "",
          "PaymentDate": "",
          "TotalAmt": "",
          "DueAmount": "",
          "ReceivedAmount": "",
          "Attach":"",
          "Remarks": "",
          "CreatedBy": sessionStorage.getItem('SalesEmployeeCode'),
          "UpdatedBy": sessionStorage.getItem('SalesEmployeeCode')
      }
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
      if(this.isEdit == false){
      if (this.fl) {
        this.pyaddterms.Attach = this.fl;
      }
      else {
        this.pyaddterms.Attach = '';
      }
    }
      if (f.valid) {
        if(Number(this.pyaddterms.TotalAmt) != Number(this.pyaddterms.ReceivedAmount) + Number(this.pyaddterms.DueAmount)){
          this._NotifierService.showError('The amount will not divide properly');
        }
        else{
        this.bridgeService2.insertPaymentCollaction(this.pyaddterms,this.isEdit).subscribe(
          (res: PaymentTerms) => {
            if (Object(res)['status'] == "200") {
              this.isLoading = false;
              this._NotifierService.showSuccess(this.isEdit ? 'Payment Collection Updated Successfully !' : 'Payment Collection Added Successfully !')
              this.modalService.dismissAll();
                let currentUrl = this.route.url;
                this.route.routeReuseStrategy.shouldReuseRoute = () => false;
                this.route.onSameUrlNavigation = 'reload';
                this.route.navigate([currentUrl]);
            }
            else{
              this._NotifierService.showError(Object(res)['message']);
              this.isLoading = false;
            }


            // Reset the form
          },
          (err) => {
            const delim = ":"
            const name = err.message
            const result = name.split(delim).slice(3).join(delim);
            this._NotifierService.showError(result);
            this.modalService.dismissAll();
            this.ngOnInit();
          }
        );
      }
    }else {
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

    checkExportStatus() {
      const status = sessionStorage.getItem('exportStatus');
      this.exportStatus = status === 'true'; // sessionStorage stores everything as strings
    }
  
    // Default excel file name when download 
    fileName ="payment-collaction_export.xlsx";
  
    Exportexcel(){
      // passing table-id
      let data = document.getElementById("table-data");
      const ws:XLSX.WorkSheet = XLSX.utils.table_to_sheet(data)
  
      // Generete workbook and add the worksheet
      const wb:XLSX.WorkBook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb,ws, 'Sheet1')
  
      // Save to file
      XLSX.writeFile(wb, this.fileName)
  
    }

    isModuleViewadd(module_id: number): boolean {  
      const selectedModule = this.savedModules?.filter((module: any) => module.module_id === module_id);
      if (selectedModule && selectedModule.length > 0 && selectedModule[0].is_add) {
        return true;
      }
      return false;
    }

    isModuleViewedit(module_id: number): boolean {  
      const selectedModule = this.savedModules?.filter((module: any) => module.module_id === module_id);
      if (selectedModule && selectedModule.length > 0 && selectedModule[0].is_edit) {
        return true;
      }
      return false;
    }

    isModulefieldview(module_id: number, key: string): boolean {  
      const selectedModule = this.savedModules?.find((module: any) => module.module_id === module_id);
      if (selectedModule) {
          const hasViewPermission = selectedModule.data.some((item: any) => item.key === key && item.view);
          return hasViewPermission;
      }
      return false;
  }
  
  isModulefieldedit(module_id: number, key: string): boolean {  
    // debugger
    const selectedModule = this.savedModules?.find((module: any) => module.module_id === module_id);
    if (selectedModule) {
      // debugger
        const hasEditPermission = selectedModule.data.some((item: any) => item.key === key && item.edit);
        //  
 // console.log(key,hasEditPermission)
        return hasEditPermission;
    }
    return false;
  }
  }
