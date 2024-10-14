export interface CampaignSet {
  id?: number,
  CampaignSetName: string,
  CampaignAccess: string,
  Description: string
  LeadSource: any
  LeadPriority: string
  LeadStatus: any
  LeadFromDate: string
  LeadToDate: string
  OppType: string
  OppSalePerson: any
  OppStage: string
  OppFromDate: string
  OppToDate: string
  BPType: string
  BPSalePerson: any
  BPCountry: string
  BPCountryCode: string
  BPState: string
  BPStateCode: string
  BPIndustry: any
  BPFromDate: string
  BPToDate: string
  MemberList: string
  Status: string
  CreateDate: string
  CreateTime: string
  CampaignSetOwner: any
  CreateBy: string
  AllLead: string;
  AllOpp: string;
  AllBP: string;
}

export interface Compaign {
  CampaignSetName: string;
  // Subject: string;
  CampaignAccess: string;
  Description: string;
  LeadSource: any;
  LeadPriority: string;
  LeadStatus: any;
  LeadFromDate: string;
  LeadToDate: string;
  OppType: string;
  OppSalePerson: any;
  OppStage: string;
  OppFromDate: string;
  OppToDate: string;
  BPType: string;
  BPSalePerson: any;
  BPCountry: string;
  BPCountryCode: string;
  BPState: string;
  BPStateCode: string;
  BPIndustry: any;
  BPFromDate: string;
  BPToDate: string;
  MemberList: string;
  Status: any;
  CreateDate: string;
  CreateTime: string;
  CampaignSetOwner: string;
  CreateBy: string;
  AllLead: string;
  AllOpp: string;
  AllBP: string;

  id?: number;
}



export interface EditCompaign {
  CampaignSetName: string;
  CampaignAccess: string;
  Description: string;
  LeadSource: any;
  LeadPriority: string;
  LeadStatus: any;
  LeadFromDate: string;
  LeadToDate: string;
  OppType: string;
  OppSalePerson: any;
  OppStage: string;
  OppFromDate: string;
  OppToDate: string;
  BPType: string;
  BPSalePerson: any;
  BPCountry: string;
  BPCountryCode: string;
  BPState: string;
  BPStateCode: string;
  BPIndustry: any;
  BPFromDate: string;
  BPToDate: string;
  MemberList: string;
  Status: any;
  CreateDate: string;
  CreateTime: string;
  CampaignSetOwner: string;
  CreateBy: string;
  AllLead: string;
  AllOpp: string;
  AllBP: string;
  id: string;
}
export interface CampaignName {
  id?: number,
  CampaignName: string,
  CampaignSetId: number,
  Subject: string,
  StartDate: string,
  EndDate: string
  Type: string
  Frequency: string
  WeekDay: any,
  MonthlyDate: any,
  Message: string
  QualityResponse: string
  Sent: string
  Delivered: string
  Opened: string
  Responded: string
  Status: any
  CreateDate: string
  CreateTime: string
  CampaignOwner: any
  RunTime: any
  Attachments:string

}


export interface UpdateAction {
  id?: number,
  CampaignId:string;
  Status:string;

}
export interface UpdateCampaignSetStatus {
  id?: number,
  CampaignSetId:string;
  Status:string;

}

export interface CampaignNameCreate {
  id?: number,
  CampaignName: string,
  CampaignOwner: string,
  Subject: string,
  WeekDay: any,
  MonthlyDate: any,
  CampaignSetId: any,
  StartDate: string
  EndDate: string
  Type: string
  Frequency: string
  Message: string
  Status: any;
  CreateDate: string
  CreateTime: string
  RunTime: any
  Attachments:string

}
export interface editCampaignNameCreate {

  CampaignName: string,
  CampaignOwner: string,
  WeekDay: any,
  Subject: string,
  MonthlyDate: any,
  CampaignSetId: any,
  StartDate: string
  EndDate: string
  Type: string
  Frequency: string
  Message: string
  Status: any;
  CreateDate: string
  CreateTime: string
  id: string,
  RunTime: any,
  Attachments:string

}
export interface cutomerAttach {
  id?: number,
  cust_id:any,
  Attach:string,
  CreateDate:string,
  CreateTime:string,


}
export interface getcutomerAttach {
  id?: number,
  Attach:string,
  cust_id:string,
  CreateDate:string,
  CreateTime:string,

}
export interface updatecutomerAttach {
  id: string,
  Attach:string,
  cust_id:string,
  UpdateDate:string,
  UpdateTime:string,

}
