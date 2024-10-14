import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { CampaignName } from '../campaign';
import {ActivatedRoute,Router } from '@angular/router';
import { BridgeService } from '../modules/service/bridge.service';
declare var $: any;

@Component({
  selector: 'app-campaign-name-details',
  templateUrl: './campaign-name-details.component.html',
  styleUrls: ['./campaign-name-details.component.css']
})
export class CampaignNameDetailsComponent implements OnInit {
  compaignname :CampaignName[]=[];
  isLoading2: boolean = false;
  idd: any;
  UserName: any;
  baseUrl2:any;
  isLoading:boolean=false;

  constructor(private _location: Location, private route: Router,private router: ActivatedRoute,private bridgeService2: BridgeService) {
    this.baseUrl2 = this.bridgeService2.baseUrl2;
   }


  ngOnInit(): void {





    this.bridgeService2.autoCall();
    this.getCampaignNameDetils();

    this.UserName = sessionStorage.getItem('UserName');
    if (this.UserName == undefined) {
      this.route.navigate(['/login']);
    }
  }
  backClicked() {
    this._location.back();
  }
  Extension1:any;
  extensionresult:any;
  getCampaignNameDetils(): void {
    this.isLoading = true;
    // console.log("this.compaignname",this.compaignname)
    this.idd = this.router.snapshot.params.id;
    // console.log( this.idd)
    this.bridgeService2.getOneCampaignNamedata(this.idd).subscribe(
      (data: CampaignName[]) => {
        this.isLoading = false;
        this.compaignname = data;
        var test = data[0].Message;
        // console.log(data[0].Message);
        // console.log("yes",this.compaignname)
        this.Extension1=data[0].Attachments.split(".")
        this.extensionresult=this.Extension1[1]
        // console.log("as",this.Extension1)
        // console.log("as",this.extensionresult)



        });

  }
}
