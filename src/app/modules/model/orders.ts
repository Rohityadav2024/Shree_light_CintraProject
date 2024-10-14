export interface Orders {
  U_LEADID: string;
  U_OPPID: string;
  U_OPPRNM: string;
  U_LEADNM: string;
  TaxDate: string;
  DocDueDate: string;
  ContactPersonCode: any;
  BPLID: any;
  U_Term_Condition: any;
  PaymentGroupCode: any;
  DiscountPercent: string;
  DocDate: string;
  CardCode: string;
  CardName: string;
  Comments: string;
  U_QUOTNM: string;
  U_QUOTID: number;

  U_TermInterestRate: string;
  U_TermPaymentTerm: string;
  U_TermDueDate: string;
  DocumentStatus: string;
  CancelStatus: string;
  DocEntry: any;
  SalesPersonCode: any;
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



export interface EditOrders {

  TaxDate: string;
  DocDueDate: string;
  ContactPersonCode: string;
  BPLID: any;
  U_Term_Condition: any;
  PaymentGroupCode: any;
  DiscountPercent: string;
  DocDate: string;
  CardCode: string;
  CardName: string;
  Comments: string;
  U_QUOTNM: string;
  U_QUOTID: number;

  U_TermInterestRate: string;
  U_TermPaymentTerm: string;
  U_TermDueDate: string;
  DocumentStatus: string;
  CancelStatus: string;
  DocEntry: any;
  SalesPersonCode: string;
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
