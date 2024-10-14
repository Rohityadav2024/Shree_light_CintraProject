import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { BridgeService } from '../modules/service/bridge.service';
import { Customer, Branch,EditBranch } from '../customer';
import { Delivery } from '../delivery';
import { Orders } from '../orders';
import { Quotation } from '../quotation';
import { Bridge2, Follow } from '../bridge2';
declare var $: any;

@Component({
  selector: 'app-lead-campaign-details',
  templateUrl: './lead-campaign-details.component.html',
  styleUrls: ['./lead-campaign-details.component.css']
})
export class LeadCampaignDetailsComponent implements OnInit {


        dateObj = new Date();
        time = this.dateObj.toLocaleTimeString();
        month = this.dateObj.getUTCMonth() + 1; //months from 1-12
        day = this.dateObj.getUTCDate();
        year = this.dateObj.getUTCFullYear();
        months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        newdate = this.day + "-" + this.month + "-" + this.year;

   chatdate = this.months[this.month - 1] + " " + this.day + ", " + this.year;
        chattime = this.time.slice(0, -6);
  chattime2 = this.time.slice(-2);
      orders: Orders[] = [];

      Bridge2: Bridge2[] = [];
      Follow: Follow[] = [];
      chatterr: Follow =  {
        Message: '',
        Mode:'Call',
        SourceID: '',
        SourceType: '',
        Emp: '',
        UpdateDate: this.chatdate,
      UpdateTime: this.chattime+ " " +this.chattime2,
      Emp_Name: ''};
        closeResult = '';
        UserName: any;
        UserId: any;
        error = '';
        success = '';
        idd:any;
        CardCode: any;
        isLoading: boolean = false;
        isLoading2: boolean = false;
        ordertype: string = 'over';
          constructor(private bridgeService: BridgeService,private route:Router,private router: ActivatedRoute,private modalService: NgbModal) {
          }

          ngOnInit(): void {




            this.bridgeService.autoCall();

            this.UserName = sessionStorage.getItem('UserName');
            this.UserId = sessionStorage.getItem('UserId');
            if(this.UserName == undefined){
              this.route.navigate(['/login']);
            }
          }




        }


