export interface Delivery {
  DocEntry: string;
  DocDueDate: string;
  DocDate: string;
  TaxDate: string;
  ContactPersonCode: string;
  DiscountPercent: string;
  CardCode: string;
  CardName: string;
  Comments: string;
  ShippedWith: string,
  ShippedType: string,
  SalesPersonCode: string;
  DocumentStatus: string;
  DocCurrency: string;
  DocTotal: string;
  VatSum: string;
  CreationDate: string;
  AddressExtension: any;
  DocumentLines: any;
  CreateDate: string;
  CreateTime: string;
  UpdateDate: string;
  UpdateTime: string;
  id?: number;
}

export interface EditAddress {
  // orderId?:number;
  id?: number;
  // ShipToBuilding: string;
  // ShipToZipCode: string;
  // ShipToCountry: string;
  // ShipToState: string;
  // U_SHPTYPS: string;
  // ShipToStreet: string;
  //OrderID?:number;

  DocEntry: string;
  DocDueDate: string;
  DocDate: string;
  TaxDate: string;
  ContactPersonCode: string;
  DiscountPercent: string;
  CardCode: string;
  CardName: string;
  Comments: string;
  SalesPersonCode: string;
  DocumentStatus: string;
  DocCurrency: string;
  DocTotal: string;
  VatSum: string;
  CreationDate: string;
  AddressExtension: {
    id?: number;
    ShipToBuilding: string;
    ShipToZipCode: string;
    ShipToCountry: string;
    ShipToState: string;
    U_SHPTYPS: string;
    ShipToStreet: string;
    OrderID?: number;
  };
  ShippedWith: string,
  ShippedType: string,
  DocumentLines: any;
  CreateDate: string;
  CreateTime: string;
  UpdateDate: string;
  UpdateTime: string;

  //OrderID?:number;
}
export interface AddLog {
  Title: string;
  Description: string;
  OrderID:string;
  createdBy:string;
  logStatus:string;
  createDate: string;
  createTime: string;
}