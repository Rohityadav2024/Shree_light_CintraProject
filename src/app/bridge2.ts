export interface Bridge2 {
  date: string;
  campaign?: string;
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
  Attach:string,
  Caption:string,
  id?: any;
}




export interface EditBridge2 {
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
  Attach:string,
  Caption:string,
  id: any;
}

export interface Follow {
  Message: string;
  Mode:string;
  SourceID: string;
  SourceType: string;
  Emp: string;
  Emp_Name: string;
  UpdateDate: string;
  UpdateTime: any;
  id?: number;
}


export interface AddFollow2{
  To?:any;
  Subject:string;
  Mode:string;
  Comment:string;
  CreateDate:string;
  CreateTime:string;
  Emp:any;
  leadType:any;
  Emp_Name:string;
  From: string;
  SourceType: string;
  SourceID:string;
  Time: string;
  Type:string;
  id?: number;
}
export interface Type{
  Name:string;
  CreatedDate:string;
  CreatedTime:string;
  id?: number;
}

export interface Expense {
  id?: number;
  remarks : string;
  trip_name : string;
  type_of_expense : string;
  expense_from : string;
  expense_to : string;
  totalAmount : number;
  createDate : string;
  createTime : string;
  createdBy : number;
  employeeId:any;
  Attach:any;
}



export interface EditExpense {

  id: any;
  remarks: string;
  trip_name: string;
  type_of_expense: string;
  expense_from: string;
  expense_to: string;
  totalAmount: number;
  updateDate: string;
  updateTime: string;
  updatedBy: number;
  employeeId:any;
  Attach:any;
}

export interface Payment {
  InvoiceNo: string; TransactId: string; TotalAmt: number; TransactMod: string;
  DueAmount: number; PaymentDate: string; ReceivedAmount: number; CardCode:any; Remarks: string;createTime:string;
  createdBy:number; createDate:string; Attach:any;id?: number;
}

export interface EditPayment {
  id?:number; InvoiceNo: string; TransactId: string; TotalAmt: number; TransactMod: string;
  DueAmount: number; PaymentDate: string; ReceivedAmount: number; CardCode:any; Remarks: string; updateTime:string;
  updatedBy:number; updateDate:string; Attach:any;
}



