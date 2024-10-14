import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-campaign-lead-list',
  templateUrl: './campaign-lead-list.component.html',
  styleUrls: ['./campaign-lead-list.component.css']
})
export class CampaignLeadListComponent implements OnInit {
  UserName: any;
  constructor(private router: Router,) { }

  ngOnInit(): void {




    this.UserName = sessionStorage.getItem('UserName');
    // this.UserId = sessionStorage.getItem('UserId');
    // this.role = sessionStorage.getItem('role');
    // this.reportingTo = sessionStorage.getItem('reportingTo');
    if(this.UserName == undefined){
      this.router.navigate(['/login']);
    }
    // console.log(this.campaignleadList);
  }

  campaignleadList:any[]=[
    {lead_id:'campaign name', company_Name:'campaign source', Phone:'Rahul Kumar', Name:'123456', Email:'email@gmail.com', Address:'Cinntra noida up' , dateTime:'05-08-2022 04 PM'},
    {lead_id:'campaign name', company_Name:'campaign source', Phone:'Rahul Kumar', Name:'123456', Email:'Lead', Address:'Cinntra noida up' , dateTime:'05-08-2022 04 PM'},
    {lead_id:'campaign name', company_Name:'campaign source', Phone:'Rahul Kumar', Name:'123456', Email:'Lead', Address:'Cinntra noida up' , dateTime:'05-08-2022 04 PM'},

   ]

}
