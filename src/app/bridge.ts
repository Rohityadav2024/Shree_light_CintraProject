  export interface Bridge {
    companyID: string;
    app_id?:any;
    SalesEmployeeCode: string,
    SalesEmployeeName: string,
    EmployeeID: string,
    userName: string;
    password: string;
    firstName: string;
    middleName: string;
    lastName: string;
    Email: string;
    Mobile: string;
    role: string;
    position: string;
    branch: string;
    departement:string;
    zone:any;
    Active: string;
    passwordUpdatedOn: string;
    lastLoginOn: string;
    reportingTo: string;
    timestamp: string;
    id?: number;
  }

  export interface EditBridge {
    companyID: string;
    SalesEmployeeCode: string,
    SalesEmployeeName: string,
    EmployeeID: string,
    userName: string;
    password: string;
    firstName: string;
    middleName: string;
    lastName: string;
    Email: string;
    Mobile: string;
    role: string;
    departement:string;
    zone:any;
    position: string;
    branch: string;
    Active: string;
    passwordUpdatedOn: string;
    lastLoginOn: string;
    reportingTo: string;
    timestamp: string;
    id: number;
  }

  export interface Industry{
    id?: number,
    IndustryDescription: string,
    IndustryName: string,
    IndustryCode: string
  }

  export interface Segment{
    id?: number,
    Segment: string,
    Remarks: string,
  }

  export interface PrjectType{
    id?: number,
    ProjectType: string,
    Remarks: string,
  }


  export interface PriceList{
    id?: number,
    PriceListTitle:string,
    ItemGroup:any,
    Item:any,
    Brand:string,
    MRP:string,
    Discount:string,
    Remarks:string,
  }

  export interface Directory {
    DirectoryGroup: number;
    CompanyName: string;
    MobileNo: string;
    EmailID: string;
    Designation: string;
    Department: string;
    Website: string;
    Remarks?: string; // Optional
    Attachment?: any; // Optional, for file uploads
  }

  export interface addSmtp{
    id: string,
    Host: string,
    Port: string,
    Sender: string
    Password: string
  }
  export interface smtplist{
    id: string,
    Host: string,
    Port: string,
    Sender: string
    Password: string
  }
  export interface coType{
    id?: number,
    Type:string,
  }


  export interface ZoneMaster{
    id?: number,
    Name:string,
    Status?:string,
    Department?:string
  }



  export interface PaymentTerms{
    id?: number,
    GroupNumber: string,
    PaymentTermsGroupName: string;
    Attach?:any;
  }
  export interface Campaign_Ad{
    id?: number,
    campaignName: string,
    campaignSource: string,
    adName: string,
    formId: string,
  }


