export interface Bridge2Get {
  // DPCode:string;
  DivCode: string;
  junk: number;
  DivName: string;
  LeadItem: any;
  BPStatus: number;
  OPStatus: number;
  TDStatus: number;
  QTStatus: number;
  ODStatus: number;
  tender: number;
  date: string;
  location: string;
  companyName: string;
  source: string;
  contactPerson: string;
  phoneNumber: string;
  message: string;
  email: string;
  productInterest: string;
  assignedTo: any;
  timestamp: string;
  employeeId: any;
  numOfEmployee: string;
  turnover: string;
  designation: string;
  status: string;
  leadType: string;

  //   category:string;
  // groupType:string;
  // interestproductcategory:string;
  // interestprojectcategory:string;
  // country:string;
  // State:String;
  // city:string;

  category: string;
  groupType: string;
  intProdCat: string;
  intProjCat: string;
  country: string;
  country_code: string;
  state: string;
  state_code: string;
  city: string;


  id?: number;
}


export interface Bridge2 {
  junk: number;
  DivCode: string;
  DivName: string;
  LeadItem: any;
  tender: number;
  date: string;
  location: string;
  companyName: string;
  source: string;
  contactPerson: string;
  phoneNumber: string;
  message: string;
  email: string;
  productInterest: string;
  assignedTo: any;
  timestamp: string;
  employeeId: any;
  numOfEmployee: string;
  turnover: string;
  designation: string;
  status: string;
  leadType: string;
  //   category:string;
  // groupType:string;
  // interestproductcategory:string;
  // interestprojectcategory:string;
  // country:string;
  // State:String;
  // city:string;

  category: string;
  groupType: string;
  intProdCat: string;
  intProjCat: string;
  country: string;
  country_code: string;
  state: string;
  state_code: string;
  city: string;
  id?: number;
}

export interface EditBridge2 {
  DivCode: string;
  junk: number;
  DivName: string;
  LeadItem: any;
  date: string;
  location: string;
  companyName: string;
  source: string;
  contactPerson: string;
  phoneNumber: string;
  message: string;
  email: string;
  productInterest: string;
  assignedTo: any;
  timestamp: string;
  employeeId: any;
  numOfEmployee: string;
  turnover: string;
  designation: string;
  status: string;
  leadType: string;
  tender: any;

  //     category:string;
  // groupType:string;
  // interestproductcategory:string;
  // interestprojectcategory:string;
  // country:string;
  // State:String;
  // city:string;


  category: string;
  groupType: string;
  intProdCat: string;
  intProjCat: string;
  country: string;
  country_code: string;
  state: string;
  state_code: string;
  city: string;
  id: string;
}

export interface Follow {
  Message: string;
  SourceID: string;
  SourceType: string;
  Emp: string;
  Emp_Name: string;
  Mode: string;
  UpdateDate: string;
  UpdateTime: string;
  id?: number;
}

export interface AddFollow2 {
  Subject: string;
  Mode: string;
  Comment: string;
  CreateDate: string;
  CreateTime: string;
  Emp: any;
  leadType: any;
  Emp_Name: string;
  From: string;
  SourceType: string;
  SourceID: string;
  Time: string;
  Type: string;
  id?: number;
}

export interface Type {
  Name: string;
  CreatedDate: string;
  CreatedTime: string;
  id?: number;
}

export interface EditStatus {
  date: string;
  location: string;
  companyName: string;
  source: string;
  contactPerson: string;
  phoneNumber: string;
  message: string;
  email: string;
  productInterest: string;
  assignedTo: any;
  timestamp: string;
  employeeId: any;
  numOfEmployee: string;
  turnover: string;
  designation: string;
  status: string;
  leadType: string;
  id: string;
}
