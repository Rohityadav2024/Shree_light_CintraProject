import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { BridgeService } from '../modules/service/bridge.service';
import { Customer } from '../customer';
import { Orders } from '../orders';
import { Quotation } from '../quotation';
declare var $: any;

@Component({
  selector: 'app-lead-campaign',
  templateUrl: './lead-campaign.component.html',
  styleUrls: ['./lead-campaign.component.css']
})
export class LeadCampaignComponent implements OnInit {


    orders: Orders[] = [];
      customers: Customer[] = [];
        closeResult = '';
        UserName: any;
        error = '';
        success = '';
        isLoading2: boolean = false;
        searchValue!: string;
        constructor(private modalService: NgbModal,private route:Router, private bridgeService2: BridgeService) { }

        ngOnInit(): void {




          this.bridgeService2.autoCall();

          this.UserName = sessionStorage.getItem('UserName');
          if(this.UserName == undefined){
            this.route.navigate(['/login']);
          }

          $(document).mouseup(function (e: { target: any; }) {
            var popup = $(".hover-show");
            if (!$('.edit-delete').is(e.target) && !popup.is(e.target) && popup.has(e.target).length == 0) {
                popup.hide();
            }
        });

        $(document).mouseup(function (e: { target: any; }) {
          var popup = $(".hover-show span ul");
          if (!$('.hover-show span ul').is(e.target) && !popup.is(e.target) && popup.has(e.target).length == 0) {
              popup.hide();
          }
      });

        $(document).ready(function () {
          $('.hover-show').hide();
          $('.hover-show span ul').hide();
      });

        }


suplier(item: any){
  this.route.navigate(['/lead/campaign-details/'+item]);
}


editdeletepop(item: number) {
  $('.hover-show1').show()
}

CallTriger(item: number) {
  $('.hover-show span ul').show()
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


selectAll1(){
  $("input[class=checkbox1]").prop("checked", $("#selectAll1").prop("checked"));
  let num = (<HTMLInputElement>document.getElementById("selectAll1"));
  if(num.checked){
  $(".extra-area").show();
  }
  else{
    $(".extra-area").hide();
  }
}



reload(){
  $('#selectAll1').prop('checked', false);
  $("input[class=checkbox1]").prop('checked', false);
  setTimeout(()=>{
  $(".extra-area").hide();
  this.ngOnInit();
}, 100);
}

      }
