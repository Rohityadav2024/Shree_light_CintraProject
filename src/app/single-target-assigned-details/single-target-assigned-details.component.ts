import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { BridgeService } from '../modules/service/bridge.service';
import { Location } from '@angular/common';
declare var $: any;

@Component({
  selector: 'app-single-target-assigned-details',
  templateUrl: './single-target-assigned-details.component.html',
  styleUrls: ['./single-target-assigned-details.component.css']
})
export class SingleTargetAssignedDetailsComponent implements OnInit {


      closeResult = '';
            UserName: any;
            error = '';
            success = '';
            isLoading2: boolean = false;
            searchValue!: string;
            constructor(private modalService: NgbModal,private route:Router,private _location: Location, private bridgeService2: BridgeService) { }


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

      $(document).ready(function () {
        $('.hover-show').hide()
    });

      }

      suplier(item: any){
        this.route.navigate(['/target-assigned/target-assigned-details/'+item]);
      }
      backClicked() {
        this._location.back();
      }
    }


