import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { BridgeService } from '../modules/service/bridge.service';
import { CampaignSet, Compaign } from '../campaign';
import { Category } from '../warehouse';
import { Country, Industory, States } from '../customer';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { NotiferService } from '../modules/service/helpers/notifer.service';
import { HeadingServicesService } from '../modules/service/heading-services.service';
declare var $: any;

@Component({
  selector: 'app-add-campaign',
  templateUrl: './add-campaign.component.html',
  styleUrls: ['./add-campaign.component.css']
})
export class AddCampaignComponent implements OnInit {
  categorys: Category[] = [];
  countrys: Country[] = [];
  statess: States[] = [];
  industorys: Industory[] = [];
  // isLoading: boolean;
  dateObj = new Date();
  time = this.dateObj.toLocaleTimeString();
  month2 = this.dateObj.getMonth() + 1;
  month = (this.month2 < 10 ? '0' : '') + this.month2;
  day = (this.dateObj.getDate() < 10 ? '0' : '') + this.dateObj.getDate();
  year = this.dateObj.getUTCFullYear();
  months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  newdate = this.day + "-" + this.month + "-" + this.year;
  isLoading: boolean = false;
  compaign: CampaignSet[] = [];
  UserName: any;
  compaigns: Compaign = {
    CampaignSetName: "",
    CampaignAccess: "",
    Description: "",
    LeadSource: "",
    LeadPriority: "",
    LeadStatus: "",
    LeadFromDate: "",
    LeadToDate: "",
    OppType: "",
    OppSalePerson: "",
    OppStage: "",
    OppFromDate: "",
    OppToDate: "",
    BPType: "",
    BPSalePerson: "",
    BPCountry: "India",
    BPCountryCode: "IN",
    BPState: "",
    BPStateCode: "",
    BPIndustry: "",
    BPFromDate: "",
    // Subject: "",
    BPToDate: "",
    MemberList: "",
    Status: 1,
    CreateDate: this.newdate,
    CreateTime: "",
    CampaignSetOwner: "",
    CreateBy: "",
    AllLead: "",
    AllOpp: "",
    AllBP: ""
  };

  Countrys: string = 'IN, India';
  Statess: string = ''


  category: Category = {
    CategoryName: '',
    Status: '1',
    CreatedDate: this.newdate,
    CreatedTime: this.time,
    UpdatedDate: this.newdate,
    UpdatedTime: this.time,
  };
  empall: any;
  success: any;
  error: any;

  selectedDay: any;
  code: any[] = [];
  selectedDayState: any;
  source: any;

  codeState: any[] = [];
  dropdownList: any = [];
  dropdownListind: any = [];//for ind
  dropdownListemp: any = [];//for empl
  dropdownList1: any = [];//for status
  input_fld: any = 'input-fld3';
  dropdownSettings = {};
  dropdownSettings1 = {};
  selectleadsource: any ;
  selectleadstatus: any ;
  selectOppEmployeee: any ;
  selectBPEmployeee: any ;
  selectIndustory: any ;
  deselectCheck: boolean = false;
  deselectCheck1: boolean = false;
  deselectCheck2: boolean = false;
  // Country: any = 'IN, India';
  CampaignAccess:any;
  leadStatus:any;
  filterleadstatus=new Array;
  CampaignOpportunityType:any;
  savedModules: any[] = [];
  Headingss: any[] = [];
  constructor(private _location: Location,private HeadingServices: HeadingServicesService, private _NotifierService: NotiferService, private route: Router, private router: Router, private bridgeService: BridgeService, private modalService: NgbModal,

    private http: HttpClient,
  ) { }

  ngOnInit(): void {
    if (!this.HeadingServices.isModuleView(2) || !this.HeadingServices.isModuleViewadd(2)) {
      this.router.navigate(['/dashboard']);
    }
    localStorage.removeItem('rolename');

    this.bridgeService.autoCall();
    this.leadStatus=this.bridgeService.leadStatus;
    this.CampaignAccess=this.bridgeService.CampaignAccess;
    this.Headingss = this.HeadingServices.getModule21();
    this.CampaignOpportunityType=this.bridgeService.CampaignOpportunityType;
    this.getempall();
    this.getCountry();
    this.code[0] = 'IN'
    this.getState('IN');
    this.getIndustory();
    this.getAllSource();
    this.getLeadAll();
    this.compaigns.CreateBy = String(sessionStorage.getItem('SalesEmployeeCode'));
    this.compaigns.CampaignSetOwner = String(sessionStorage.getItem('SalesEmployeeCode'));
    // this.getDivisionList();
    this.UserName = sessionStorage.getItem('UserName');
    if (this.UserName == undefined) {
      this.route.navigate(['/login']);
    }

    for(let i=0; i<this.leadStatus.length; i++){
      this.filterleadstatus.push({ item_text: this.leadStatus[i] })
          }
          this.dropdownList1 = this.filterleadstatus
    // this.dropdownList1 = [
    //   { item_text: 'Follow Up' },
    //   { item_text: 'New' },
    //   { item_text: 'Qualified' },
    //   { item_text: 'Hold' },

    // ];

    this.dropdownSettings = {
      singleSelection: false,
      // idField: 'item_text',
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,

      allowSearchFilter: true
    }
    this.dropdownSettings1 = {
      singleSelection: false,
      idField: 'item_text',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 2,
      allowSearchFilter: true,
      enableCheckAll: true,
      limitSelection: -1,
      clearSearchFilter: true,
      maxHeight: 197,
      closeDropDownOnSelection: false,
      showSelectedItemsAtTop: false,
      defaultOpen: false,
    }

    const savedModulesString = sessionStorage.getItem('savedModules');
    if (savedModulesString) {
      this.savedModules = JSON.parse(savedModulesString);
    }

  };


  onItemSelect(item: any) {

  }
  onSelectAll(items: any) {
    // console.log(items)
  }
  public onDeSelectAll(items: any) {
    // console.log(items);
  }

  onDeSelect(items: any) {
    // console.log("ff", items)

  }

  onItemSelect1(item: any) {

  }
  onSelectAll1(items: any) {
    // console.log(items)
  }
  public onDeSelectAll1(items: any) {
    // console.log(items);
  }

  onDeSelect1(items: any) {
    // console.log("ff", items)

  }
  //for Employee

  onItemSelect2(item: any) {

  }
  onSelectAll2(items: any) {
    // console.log(items)
  }
  public onDeSelectAll2(items: any) {
    // console.log(items);
  }

  onDeSelect2(items: any) {
    // console.log("ff", items)

  }





  backClicked() {
    this._location.back();
  }
  resetAlerts() {
    this.error = '';
    this.success = '';
  }

  lead_Type:any;
  filterLeadPriority=new Array;
  getLeadAll(): void {
    this.bridgeService.getLeadTypedata().subscribe(
      (data: any[]) => {
        this.lead_Type = data;
        //console.log('this.lead_Type',this.lead_Type);

      },
      (err) => {
        console.log(err);
        this.error = err;
      }
    );
  }

  sourcelead: any = [];
  sourceStatus: any = [];
  OpportunityEmployee: any = [];
  BPEmployee: any = [];
  IndustorySelect: any = [];
  addCampaignSet(f: NgForm) {

    f = this.bridgeService.GlobaleTrimFunc(f);
    for(let [keys,value] of Object.entries(f.value)){
     if(!!!f.value[keys]){
        f.value[keys] = "";
      }
    }
    // leadsource
    // console.log(this.selectleadsource);
    // return 1
    if (this.selectleadsource == undefined) {
      this.compaigns.LeadSource = "";
    }
    else {
      this.compaigns.LeadSource = this.selectleadsource.join(",");
      // for (let i = 0; i < this.selectleadsource.length; i++) {
      //   this.sourcelead.push(this.selectleadsource[i].item_text)
      //   var textlead = this.sourcelead.toString();
      //   this.compaigns.LeadSource = textlead
      // }
    }

    //status
    if (this.selectleadstatus == undefined) {
      this.compaigns.LeadStatus = ""
    }
    else {
      this.compaigns.LeadStatus = this.selectleadstatus.join(",");
      // for (let i = 0; i < this.selectleadstatus.length; i++) {
      //   this.sourceStatus.push(this.selectleadstatus[i].item_text)
      //   var textlead = this.sourceStatus.toString();

      //   this.compaigns.LeadStatus = textlead
      // }
    }

    //for Employee
    if (this.selectOppEmployeee == undefined) {
      this.compaigns.OppSalePerson = ""
    }
    else {
      this.compaigns.OppSalePerson = this.selectleadsource.join(",");
      // for (let i = 0; i < this.selectOppEmployeee.length; i++) {
      //   this.OpportunityEmployee.push(this.selectOppEmployeee[i].item_id)
      //   var textEmpl = this.OpportunityEmployee.toString();

      //   this.compaigns.OppSalePerson = textEmpl
      // }
    }
    // console.log("emp1", this.compaigns.OppSalePerson)

    //for Bp Employee
    if (this.selectBPEmployeee == undefined) {
      this.compaigns.BPSalePerson = ""
    }
    else {
      this.compaigns.BPSalePerson = this.selectBPEmployeee.join(",");
      // for (let i = 0; i < this.selectBPEmployeee.length; i++) {
      //   this.BPEmployee.push(this.selectBPEmployeee[i].item_id)
      //   var textBPEmpl = this.BPEmployee.toString();

      //   this.compaigns.BPSalePerson = textBPEmpl
      // }
    }

    //for industory
    if (this.selectIndustory == undefined) {
      this.compaigns.BPIndustry = ""
    }
    else {
      this.compaigns.BPIndustry = this.selectIndustory.join(",");
      for (let i = 0; i < this.selectIndustory.length; i++) {
        this.IndustorySelect.push(this.selectIndustory[i].item_id)
        var textBPIndu = this.IndustorySelect.toString();

        this.compaigns.BPIndustry = textBPIndu
      }
    }



    this.resetAlerts();
    let num = (<HTMLInputElement>document.getElementById("flexCheckDefaultAlllead"));
    if (num.checked) {
      this.compaigns.AllLead = '1';
    }
    else {
      this.compaigns.AllLead = '0';
    }
    let numAop = (<HTMLInputElement>document.getElementById("flexCheckDefault1"));
    if (numAop.checked) {
      this.compaigns.AllOpp = '1';
    }
    else {
      this.compaigns.AllOpp = '0';
    }
    let numAbp = (<HTMLInputElement>document.getElementById("flexCheckDefaultAllBP"));
    if (numAbp.checked) {
      this.compaigns.AllBP = '1';
    }
    else {
      this.compaigns.AllBP = '0';
    }

    // console.log(this.compaigns.AllLead);

    if (f.valid) {
      this.isLoading = true;
      this.bridgeService.insertCampaignSet(this.compaigns).subscribe(

        (res: Compaign) => {
          if (Object(res)['status'] == "200") {
            this.modalService.dismissAll();
            this._NotifierService.showSuccess('Campaign Set Added Successfully !');
              this.router.navigate(['/campaign']);
              this.isLoading = false;
          }
          else {
            this._NotifierService.showError(Object(res)['message']);
            this.isLoading = false;
          }
        },
        (err: { message: any; }) => {
          this.isLoading = false;
          const delim = ':';
          const name = err.message;
          const result = name.split(delim).slice(3).join(delim);
          this._NotifierService.showError(result);
        }
      );
    } else {
      this._NotifierService.showError('Please Fill Valid Data');
      this.isLoading = false;
      for (let i = 0; i < Object.keys(f.value).length; i++) {
        var keyys = Object.keys(f.value)[i];
        if (f.value[keyys].length == 0) {

          if ($("input[name=" + keyys + "]").hasClass('required-fld')) {
            $("input[name=" + keyys + "]").addClass("red-line-border");
            $("input[name=" + keyys + "]").focus();
          }
          else if ($("ng-select[name=" + keyys + "]").hasClass('required-fld')) {
            $("ng-select[name=" + keyys + "]").addClass("red-line-border");
            $("ng-select[name=" + keyys + "]").focus();
          }
          else if ($("select[name=" + keyys + "]").hasClass('required-fld')) {
            $("select[name=" + keyys + "]").addClass("red-line-border");
            $("select[name=" + keyys + "]").focus();
          }
          else if ($("textarea[name=" + keyys + "]").hasClass('required-fld')) {
            $("textarea[name=" + keyys + "]").addClass("red-line-border");
            $("textarea[name=" + keyys + "]").focus();
          }
        }
        else {
          $("input[name=" + keyys + "]").removeClass("red-line-border");
          $("ng-select[name=" + keyys + "]").removeClass("red-line-border");
          $("select[name=" + keyys + "]").removeClass("red-line-border");
          $("textarea[name=" + keyys + "]").removeClass("red-line-border");
        }
      }
    }
  }
  // arr:any[]=[];
  // getVal(f: NgForm){
  //var get =e.target.value;
  // console.log(f);
  // this.arr.push(get)
  // console.log(e.target.value);
  //sessionStorage.setItem("newData",f);
  // }

  fireLead(event: any) {
    let isCheck = event.target.checked;
    // console.log(isCheck)
    if (isCheck) {
      $('.Alllead').attr("disabled", true);
      this.compaigns.AllLead = '1';
      $('.Alllead').css({ "background": "#ced5e6", "color": "#fff" });
      this.deselectCheck = true;
    }
    else {
      $('.Alllead').attr("disabled", false);
      $('.Alllead').css({ "background": "#fff", "color": "#000" });
      this.compaigns.AllLead = '0';
      this.deselectCheck = false;

    }


    // $(".Alllead").toggle(
    //   function(){$(".Alllead").attr("disabled", true);},
    //   function(){$(".Alllead").attr("disabled", false);}
    // );

    // $('.Alllead').click(function() {
    //     var $listSort = $('.Alllead');
    //     if ($listSort.attr('disabled',false)) {
    //       $listSort.attr('disabled', true);
    //     } else {
    //       $listSort.removeAttr('disabled');
    //     }
    // });

  }


  fireAllOP(event: any) {
    var isOPcheck = event.target.checked
    if (isOPcheck) {

      $('.AllOppcl').attr("disabled", true);
      this.compaigns.AllOpp = '1';
      $('.AllOppcl').css({ "background": "#ced5e6", "color": "#fff" });
      this.deselectCheck1 = true;
    }
    else {
      $('.AllOppcl').attr("disabled", false);
      $('.AllOppcl').css({ "background": "#fff", "color": "#000" });
      this.compaigns.AllOpp = '0';
      this.deselectCheck1 = false;

    }

  }
  fireBP(event: any) {
    var isBPCheck = event.target.checked
    if (isBPCheck) {
      $('.AllBP').attr("disabled", true);
      this.compaigns.AllBP = '1';
      $('.AllBP').css({ "background": "#ced5e6", "color": "#fff" });
      this.deselectCheck2 = true;

    }
    else {
      $('.AllBP').attr("disabled", false);
      $('.AllBP').css({ "background": "#fff", "color": "#000" });
      this.compaigns.AllBP = '0';
      this.deselectCheck2 = false;

    }

  }
  employeeitem: any = [];
  getempall(): void {
    this.isLoading = true;
    this.bridgeService.getAll().subscribe(
      (data: any) => {
        this.empall = data;
        this.isLoading = false;
        // console.log("bn",this.empall[0].SalesEmployeeName)
        for (let i = 0; i < this.empall.length; i++) {
          var itm1 = {
            item_id: this.empall[i].SalesEmployeeCode, item_text: this.empall[i].SalesEmployeeName
          }
          this.employeeitem.push(itm1)

        }
        this.dropdownListemp = this.employeeitem
        // console.log("code", this.dropdownListemp)
      },
    );
  }

  // selectChangeHandler(event: any) {
  //   //update the ui
  //   this.selectedDay = event.target.value;
  //   this.code = this.selectedDay.split(',');
  //   this.compaigns.BPCountryCode = this.code[0];
  //   this.compaigns.BPCountry = this.code[1];
  //   this.getState();
  // }
  selectChangeHandler(event: any) {
    //update the ui
    this.selectedDay = event.target.value;
    this.bridgeService.getCountrydata().subscribe(
      (data: Country[]) => {
        this.code=data.filter((country:any)=>country.Code===this.selectedDay);
        this.compaigns.BPCountryCode = this.code[0].Code;
    this.compaigns.BPCountry = this.code[0].Name;
    this.getState(this.code[0].Code);
      });
  }
  getCountry(): void {

    this.bridgeService.getCountrydata().subscribe(
      (data: Country[]) => {
        this.countrys = data;

      },
      (err) => {
        console.log(err);
        this.error = err;
      }
    );
  }
  sourceitem: any = [];

  getAllSource(): void {
    this.bridgeService.getAllSourcedata().subscribe(
      (data: any[]) => {
        this.source = data;
        for (let i = 0; i < this.source.length; i++) {
          var itm = {
            item_text: this.source[i].Name
          }
          this.sourceitem.push(itm)

        }
        this.dropdownList = this.sourceitem
        // console.log('shy',this.dropdownList)

      },
      (err) => {
        console.log(err);
        this.error = err;
      }
    );
  }

  selectChangeHandlerState(event: any) {
    //update the ui
    // this.selectedDayState = event.target.value;
    // this.codeState = this.selectedDayState.split(',');
    // this.compaigns.BPStateCode = this.codeState[0];
    // this.compaigns.BPState = this.codeState[1].trim();
    this.selectedDayState = event.target.value;
    this.bridgeService.getStatedata(this.code[0].Code).subscribe(
      (data: States[]) => {
        this.codeState = data.filter((state:any)=>state.Code===this.selectedDayState);
        this.compaigns.BPStateCode = this.codeState[0].Code;
        this.compaigns.BPState = this.codeState[0].Name;

      }
    );
  }


  getState(evt:any): void {
    this.bridgeService.getStatedata(evt).subscribe(

      (data: States[]) => {
        this.statess = data;

      },
      (err) => {
        console.log(err);
        this.error = err;
      }
    );
  }

  industoryitem: any = [];
  getIndustory(): void {
    this.bridgeService.getIndustorydata().subscribe(
      (data: Industory[]) => {
        this.industorys = data;
        // console.log("dd", this.industorys)



        for (let i = 0; i < this.industorys.length; i++) {
          var itm4 = {
            item_id: this.industorys[i].IndustryCode, item_text: this.industorys[i].IndustryName
          }
          this.industoryitem.push(itm4)

        }
        this.dropdownListind = this.industoryitem
        // console.log("code", this.dropdownListind)

      },
      (err) => {
        console.log(err);
        this.error = err;
      }
    );
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
