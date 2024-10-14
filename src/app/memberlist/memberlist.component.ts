
import { Component, OnInit, HostListener } from '@angular/core';
import * as XLSX from 'xlsx';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CampaignSet } from '../campaign';
import { Industry } from '../bridge';
import { BridgeService } from '../modules/service/bridge.service';
import { Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';
declare var $: any;

@Component({
  selector: 'app-memberlist',
  templateUrl: './memberlist.component.html',
  styleUrls: ['./memberlist.component.css']
})
export class MemberlistComponent implements OnInit {
  p: number = 1;
  baseUrl2: any;
  sortedColumn: string = '';
  sortsend: boolean | undefined;
  // compaign :CampaignSet[] = [];
  compaign: any = [];
  isLoading2: boolean = false;

  closeResult = '';
  UserName: any;
  error = '';
  success = '';
  // isLoading: boolean = false;
  nodata: boolean = false;
  idd: any;
  pagination: any = {
    PageNo: 1,
    maxItem: 'All',
    PageShow:10
  }
  searchValue: string = '';
  startind = 1;
  endind = 1;
  commonObj : any={exportLoading:false}
  totalCount:any;
  order_by_field:any = 'id';
  order_by_value:any = 'desc';
  constructor(private http: HttpClient, private _location: Location, private modalService: NgbModal, private route: Router, private router: ActivatedRoute, private bridgeService2: BridgeService,) {
    this.baseUrl2 = this.bridgeService2.baseUrl2;
  }
  ngOnInit(): void {



    this.bridgeService2.autoCall();

    this.UserName = sessionStorage.getItem('UserName');
    if (this.UserName == undefined) {
      this.route.navigate(['/login']);
    }
    this.idd = this.router.snapshot.params.id;
    this.getCustomer();
    // this.getMember();
  }


  backClicked() {
    this._location.back();
  }

  count = new Array();
  selectAll1() {
    let num = (document.getElementById("selectAll1") as HTMLInputElement);
    if (num.checked) {
      this.count = [];
      for (let i = 0; i < this.compaign.length; i++) {
        this.count.push(this.compaign[i].id);
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
      this.getCustomer();
  }

  resetAlerts() {
    this.error = '';
    this.success = '';
  }

  emptySeach(){
    this.searchValue = '';
    this.RowPerPage();
  }
  RowPerPage() {
    this.pagination.PageNo = 1;
    this.reload();
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

  getCustomer(): void {
    this.isLoading2 = true;
    this.bridgeService2.getMemberlistByPagination(this.pagination,this.searchValue,this.order_by_field,this.order_by_value,this.idd).subscribe(
      (data: any) => {
        if (data.status == "200") {
        this.compaign = data.data;
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
    }

    else {
      alert(data.message);
      this.totalCount = 0;
      this.isLoading2 = false;
    }
  },
      (err) => {
        this.isLoading2 = false;
        this.totalCount = 0;
        const delim = ':';
        const name = err.message;
        const result = name.split(delim).slice(3).join(delim);
        alert(result);
      }
    );
  }


  onFileChange(evt: any) {
    // alert('HI')
    const target: DataTransfer =(evt.target as DataTransfer);
    if (target.files.length !== 1) throw new Error('Cannot use multiple files');
    const reader: FileReader = new FileReader();
    reader.onload = (e: any) => {
      const bstr: string = e.target.result;
      const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });
      const wsname: string = wb.SheetNames[0];
      const ws: XLSX.WorkSheet = wb.Sheets[wsname];
      this.compaign = XLSX.utils.sheet_to_json(ws, { header: 1 });

      if (confirm('Are You Sure Do You Want To Import Data')) {
        var x: number[][] = this.compaign.slice(1);
        var excelupload = new Array();
        let leng = x.length;
        for (let i = 0; i < leng; i++) {
          let y = x[i];
          let assto = '';
         // console.log(y)


          if (y[0] != undefined || y[1] != undefined || y[2] != undefined) {
            var empArray = {
              "Name": y[0],
              "Email": y[2],
              "Phone": y[1],
              "CampSetId": this.router.snapshot.params.id

            };

            excelupload.push(empArray);
          }
          // else{
          //   alert('Somthing Went Wrong')
          // }
        }

        this.isLoading2 = true;
        this.bridgeService2.campaignCreateMember(excelupload).subscribe(
          (data: any) => {
            if (Object(data)['status'] == "200") {
              alert('Data Imported Successfully');
              this.isLoading2 = false;
              this.ngOnInit();
            } else {
              this.isLoading2 = false;
              alert(Object(data)['message']);
            }
          });
        // this.http.post(this.baseUrl2 + '/camp/create_member', excelupload).toPromise().then((data: any) => {
        //   console.log(data);

        // });
        // console.log(excelupload);

      }

    };
    reader.readAsBinaryString(target.files[0]);
  }


  exportexcel(exportElement:any): void {
    /* pass here the table id */
    // exportElement.disabled = true;
    this.commonObj.exportLoading = true;
    let element = document.getElementById('excel-table');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);
    //  const worksheet = XLSX.utils.aoa_to_sheet([
    //   ["A1", "B1", "C1"],
    //   ["A2", "B2", "C2"],
    //   ["A3", "B3", "C3"]
    // ]);

    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    // XLSX.utils.book_append_sheet(wb, worksheet, 'Sheet2');

    /* save to file */
    setTimeout(() => {
      XLSX.writeFile(wb, 'MemberList.xlsx');
      // exportElement.disabled = false;
      this.commonObj.exportLoading = false;
    },2000)
  }

}
