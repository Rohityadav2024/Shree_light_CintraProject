export interface Quotation {
  U_LEADID: string;
  U_LEADNM: string;
  U_QUOTNM: string;
  TaxDate: string;
  DocDueDate: string;
  ContactPersonCode: any;
  BPLID: any;
  PaymentGroupCode: any;
  U_Term_Condition: any;
  DocumentStatus: string;
  CancelStatus: string;
  DocEntry: any;
  U_TermInterestRate: string;
  U_TermPaymentTerm: string;
  U_TermDueDate: string;
  U_PREQTNM: string;
  U_PREQUOTATION: string;
  DiscountPercent: string;
  DocDate: string;
  CardCode: string;
  CardName: string;
  Comments: string;
  FinalStatus: string;
  SalesPersonCode: any;
  U_OPPID: string;
  U_OPPRNM: string;
  AddressExtension: {
    BillToBuilding: string;
    ShipToState: string;
    BillToCity: string;
    ShipToCountry: string;
    BillToZipCode: string;
    ShipToStreet: string;
    BillToState: string;
    ShipToZipCode: string;
    BillToStreet: string;
    ShipToBuilding: string;
    ShipToCity: string;
    BillToCountry: string;
    U_SCOUNTRY: string;
    U_SSTATE: string;
    U_SHPTYPB: string;
    U_BSTATE: string;
    U_BCOUNTRY: string;
    U_SHPTYPS: string;
  }
  DocumentLines: any;
  CreateDate: string;
  CreateTime: string;
  UpdateDate: string;
  UpdateTime: string;
  id?: Number;
}


export interface QuotationItem {
  UnitPrice: string;
  Currency: string;
  DiscountPercent: string;
  ItemCode: string;
  ItemName: string;
  TaxCode: string;
  U_DIV: string;
  InStock: string;
  id?: Number;
}


export interface Department {
  FactorCode: string;
  FactorDescription: string;
}


export interface Approved {
  FinalStatus: string;
  SalesEmployeeCode: string;
  id: string;
}


export interface Category {
  Number: string;
  GroupName: string;
  id: string;
}

export interface EditQuotation {

  U_QUOTNM: string;
  TaxDate: string;
  DocDueDate: string;
  ContactPersonCode: string;
  BPLID: any;
  PaymentGroupCode: any;
  DiscountPercent: string;
  DocDate: string;
  CardCode: string;
  CardName: string;
  U_Term_Condition: any;
  DocumentStatus: string;
  CancelStatus: string;
  DocEntry: any;
  U_TermInterestRate: string;
  U_TermPaymentTerm: string;
  U_TermDueDate: string;
  U_PREQTNM: string;
  U_PREQUOTATION: string;
  Comments: string;
  SalesPersonCode: string;
  U_OPPID: string;
  U_OPPRNM: string;
  AddressExtension: {
    BillToBuilding: string;
    ShipToState: string;
    BillToCity: string;
    ShipToCountry: string;
    BillToZipCode: string;
    ShipToStreet: string;
    BillToState: string;
    ShipToZipCode: string;
    BillToStreet: string;
    ShipToBuilding: string;
    ShipToCity: string;
    BillToCountry: string;
    U_SCOUNTRY: string;
    U_SSTATE: string;
    U_SHPTYPB: string;
    U_BSTATE: string;
    U_BCOUNTRY: string;
    U_SHPTYPS: string;
  }
  DocumentLines: any;
  CreateDate: string;
  CreateTime: string;
  UpdateDate: string;
  UpdateTime: string;
  id: String;
}
