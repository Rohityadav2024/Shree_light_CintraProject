export interface Bridge {
  div: any;
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
    position: string;
    branch: string;
    Active: string;
    passwordUpdatedOn: string;
    lastLoginOn: string;
    reportingTo: string;
    salesUnit : string;
    timestamp: string;
    id?: number;
  }

  export interface EditBridge {
    div: any;
    companyID: string;
    SalesEmployeeCode: string,
    SalesEmployeeName: string,
    EmployeeID: string,
    userName: string;
    password: string;
    firstName: string;
    middleName: string;
    lastName: string;
    salesUnit : string;
    Email: string;
    Mobile: string;
    role: string;
    position: string;
    branch: string;
    Active: string;
    passwordUpdatedOn: string;
    lastLoginOn: string;
    reportingTo: string;
    timestamp: string;
    id: number;


  }

  
  export interface StatesAll {
    id?: number;
    Code: string;
    Country: string;
    Name: string;
  }
  export interface paymentget {
    id?: number;
    GroupNumber: string;
    PaymentTermsGroupName: string;
  }
  export interface paymentget {
    id?: number;
    GroupNumber: string;
    PaymentTermsGroupName: string;
  }
  export interface addSource {
    id?: number;
    Name: string;
    CreatedDate: string;
    CreatedTime: string;
  }
  export interface editSource {
    id: string;
    Name: string;
    CreatedDate: string;
    CreatedTime: string;
  }

export interface sourceGet {
    id?: number;
    Name: string;
    CreatedDate: string;
    CreatedTime: string;
  }