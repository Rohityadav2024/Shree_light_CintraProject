import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BpCatalog } from '../bridge';
import { BridgeService } from '../modules/service/bridge.service';
import { BusinessPartners } from '../businesspartners';
declare var $: any;

@Component({
  selector: 'app-bp-catalog',
  templateUrl: './bp-catalog.component.html',
  styleUrls: ['./bp-catalog.component.scss']
})
export class BPCatalogComponent implements OnInit {

  p: number = 1;
  payload:any;
  sortedColumn: string = '';
  sortsend: boolean | undefined;
  industry: BpCatalog[] = [];
  categorys: any[] = [];
  items: any[] = [];
  items2: any[] = [];
  indus: BpCatalog = {
    "CardCode":"",
    "CardName":"",
    "ItemGroup":"",
    "Item":"",
    "C_ItemCode":"",
    "C_ItemDescription":""
}

filter_customer: any = {CardCode:''};
  closeResult = '';
  UserName: any;
  error = '';
  success = '';
  searchValue: string = '';
  isLoading: boolean = false;
 // isLoading: boolean = true;
  isLoading2: boolean = false;
  nodata: boolean = false;
  pagelimit: any = 10;
  startind = 1;
  endind = 1;
  pagination: any = {
    PageNo: 1,
    maxItem: '10',
    PageShow:10
  }

  public addresses: any[] = [
    {
      "ItemGroup":"",
    "Item":"",
    "C_ItemCode":"",
    "C_ItemDescription":""
  }
];


addAddress(index:any) {
  this.addresses.push({
    "ItemGroup":"",
    "Item":"",
    "C_ItemCode":"",
    "C_ItemDescription":""
    })
}


removeAddress(i: number) {
  this.addresses.splice(i, 1);
  this.items2.splice(i, 1);
}

  businesspartners: BusinessPartners[] = [];
  totalCount:any;
  commonObj : any={exportLoading:false}
  order_by_field:any = 'id';
  order_by_value:any = 'desc';
  constructor(private modalService: NgbModal, private route: Router, private bridgeService2: BridgeService) { }

  ngOnInit(): void {
    this.bridgeService2.autoCall();
    this.getIndustryList();
    this.getCategory();
    this.getBusinessPartmers();
    this.UserName = sessionStorage.getItem('UserName');
    if (this.UserName == undefined) {
      this.route.navigate(['/login']);
    }

    $(document).mouseup(function (e: { target: any; }) {
      var popup = $(".sidepanel");
      if((document.getElementById("mySidepanel") as HTMLInputElement) != null){
      if (!$('.openbtn').is(e.target) && !popup.is(e.target) && popup.has(e.target).length == 0) {
        (document.getElementById("mySidepanel") as HTMLInputElement).style.width = "340";
        $('#mySidepanel').removeClass('sidepanel2');
        $('#mySidepanel').addClass('mySidepanelGo');
      }
    }
    });
  }


  getBusinessPartmers(): void {
    this.isLoading = true;
    this.bridgeService2.getBusinessPartmersShortdata().subscribe(
      (data: BusinessPartners[]) => {
        this.isLoading = false;
        this.businesspartners = data;

      },
      (err) => {
        console.log(err);
        this.error = err;
      }
    );
  }

  count = new Array();
  selectAll1() {
    let num = (document.getElementById("selectAll1") as HTMLInputElement);
    if (num.checked) {
      this.count = [];
      for (let i = 0; i < this.industry.length; i++) {
        this.count.push(this.industry[i].id);
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
      this.getIndustryList();
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
  getIndustryList(): void {
    this.isLoading2 = true;
    this.bridgeService2.getBPcatByPagination(this.pagination,this.searchValue,this.order_by_field,this.order_by_value,this.filter_customer).subscribe(
      (data: any) => {
        this.industry = data.data;
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

  isEdit:boolean = false;
  open(content: any, isEdit:boolean,data:any) {
    this.isEdit = isEdit;
    var newclass = '';
    if(isEdit == true){
      newclass = '';
      this.indus = JSON.parse(JSON.stringify(data));
      this.indus.ItemGroup = this.indus.ItemGroup.id;
      this.indus.Item = this.indus.Item.id;
      this.getITem(this.indus.ItemGroup);
    }
    else{
      newclass = 'width900';
      this.indus = {
        "CardCode":"",
        "CardName":"",
        "ItemGroup":"",
        "Item":"",
        "C_ItemCode":"",
        "C_ItemDescription":""
    }
    this.addresses = [
      {
        "ItemGroup":"",
      "Item":"",
      "C_ItemCode":"",
      "C_ItemDescription":""
    }
  ];
this.items2 = [];
    }
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', modalDialogClass: 'modal-dialog-centered order-cards-modal '+newclass,backdrop:'static' }).result.then((result) => {
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

  addIndustry(f: NgForm) {
    f = this.bridgeService2.GlobaleTrimFunc(f);
    this.resetAlerts();
    if (f.valid) {

      this.isLoading = true;
      if (!this.payload) {
        this.payload = []; // Initialize payload as an empty array if it's undefined
      }

      if (this.isEdit == false) {
        for(let i = 0;i<this.addresses.length;i++){
          let indus = {
            "CardCode":this.indus.CardCode,
            "CardName":this.indus.CardName,
            "ItemGroup":this.addresses[i].ItemGroup,
            "Item":this.addresses[i].Item,
            "C_ItemCode":this.addresses[i].C_ItemCode,
            "C_ItemDescription":this.addresses[i].C_ItemDescription
        }
          this.payload.push(indus);
        }  // Now you can safely push into payload
      } else {
        this.payload = this.indus;      // Overwrite payload when in edit mode
      }

      this.bridgeService2.insertBP(this.payload,this.isEdit).subscribe(
        (res: BpCatalog) => {
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
  getCategory(): void {
    this.bridgeService2.getItemCateByPagination({
      PageNo: 1,
      maxItem: 'All',
    },'',this.order_by_field,this.order_by_value).subscribe(
      (data: any) => {
        this.categorys = data.data;
      },
      (err) => {
        console.log(err);
        this.error = err;
      }
    );
  }

  getITem(cateID:any): void {
    this.bridgeService2.getItemByPagination({
      PageNo: 1,
      maxItem: 'All',
    },'',cateID,this.order_by_field,this.order_by_value).subscribe(
      (data: any) => {
        this.items = data.data;
      },
      (err) => {
        console.log(err);
        this.error = err;
      }
    );
  }

  SelectITemGroup(event:any){
    this.indus.Item = '';
    this.getITem(event.target.value);
  }


  SelectITemGroup2(event:any,index:any){
    this.indus.Item = '';
    this.getITem2(event.target.value,index);
  }


  getITem2(cateID:any,index:any): void {
    this.bridgeService2.getItemByPagination({
      PageNo: 1,
      maxItem: 'All',
    },'',cateID,this.order_by_field,this.order_by_value).subscribe(
      (data: any) => {
        this.items2[index] = data.data;
      },
      (err) => {
        console.log(err);
        this.error = err;
      }
    );
  }
  SelectBusinesspartner(event:any){
      var businesspartners = this.businesspartners.filter((cardName: any) => {
            return cardName.CardCode === event.target.value;
          });
          console.log(businesspartners)
          if(businesspartners.length != 0){
          this.indus.CardName = businesspartners[0].CardName
          }
  }


  resetfilter() {
    this.filter_customer =  {CardCode:''};
    this.RowPerPage();

  }
  openNav() {
    (document.getElementById("mySidepanel") as HTMLInputElement).style.width = "340px";
    (document.getElementById("mySidepanel") as HTMLInputElement).style.zIndex = "9";
    $('#mySidepanel').addClass('sidepanel2');
    $('#mySidepanel').removeClass('mySidepanelGo');
    $('.sidepanel').show();

  }

  /* Set the width of the sidebar to 0 (hide it) */
  closeNav() {
    (document.getElementById("mySidepanel") as HTMLInputElement).style.width = "340";
    $('#mySidepanel').removeClass('sidepanel2');
    $('#mySidepanel').addClass('mySidepanelGo');
  }

}
