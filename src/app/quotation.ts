export interface Quotation {
  is_draft?:any;
  DocumentStatus?: any;
  DocTotal?:any;
   U_QUOTNM: string;
   TaxDate: string;
   DocDueDate: string;
   ContactPersonCode: any;
   DiscountPercent: any;
   DocDate: string;
   CardCode: any;
   CardName: string;
   Comments: string;
   CreatedByPerson?:any;
   SalesPersonCode: any;
   U_OPPID: any;
   departement?:string,
   PRID:string,
   U_OPPRNM: string;
   PODate?:any;
   PONumber?:any;
   // AddressExtension:any;
   AddressExtension:any;
   DocumentLines: any;
   CreateDate: string;
   CreateTime: string;
   UpdateDate: string;
   UpdateTime: string;
   BPLID?:any;
   Attach?:any;
   OpportunityID?:any;
   U_QUOTID?:any
   FreightCharge?:any;
   PaymentGroupCode?:any;
   id?: any;
}

export interface OneQuotation {
  is_draft?:any;
  AttachDetails?:any;
  DocTotal?:any;
   U_QUOTNM: string;
   TaxDate: string;
   DocDueDate: string;
   ContactPersonCode: any;
   DiscountPercent: any;
   DocDate: string;
   CardCode: string;
   PRID:string;
   CardName: string;
   Comments: string;
   SalesPersonCode: any;
   U_OPPID: string;
   U_OPPRNM: string;
   // AddressExtension:any;
   AddressExtension: {
    BillToId?:any;
    ShipToId?:any;
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
   BPLID?:any;
   Attach?:any;
   OpportunityID?:any;
   FreightCharge?:any;
   PaymentGroupCode?:any;
}


export interface QuotationItem {
   UnitPrice: string;
   Currency: string;
   DiscountPercent: string;
   ItemCode: string;
   ItemName: string;
   TaxCode: string;

   id?: Number;
}

export interface QuoAttach {
   id?: number,
   quotId:string,
   Attach:string,
   CreateDate:string,
   CreateTime:string,


 }





 export interface Attachment {
  id: string;
  File: string;
  LinkType: string;
  LinkID: string;
  CreateDate: string;
  CreateTime: string;
  UpdateDate: string;
  UpdateTime: string;
  Caption: string;
  FileName?: string;
}


export interface EditQuotation {
  CreatedByPerson?:any;
  is_draft?:any;
  DocTotal?:any;
   U_QUOTNM: string;
   TaxDate: string;
   DocDueDate: string;
   ContactPersonCode: string;
   DiscountPercent: any;
   DocDate: string;
   CardCode: string;
   CardName: string;
   PRID:string;
   Comments: string;
   SalesPersonCode: string;
   U_OPPID: any;
   U_OPPRNM: string;
   AddressExtension: {
    BillToId?:any;
    ShipToId?:any;
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
   BPLID?:any;
   Attach?:any;
   OpportunityID?:any;
   FreightCharge?:any;
   PaymentGroupCode?:any;
}
