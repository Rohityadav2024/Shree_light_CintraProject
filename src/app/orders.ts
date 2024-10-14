export interface Orders {
  CreatedByPerson?:any;
  is_draft?:any;
  DocTotal?:any;
    TaxDate: string;
    DocDueDate: string;
    ContactPersonCode: any;
    DiscountPercent: any;
    DocDate: string;
    CardCode: string;
    departement?:string,
    PRID:string,
    CardName: string;
    Comments: string;
    SalesPersonCode: any;
    // AddressExtension:any;
    U_QUOTNM:string
    U_QUOTID: any,
    U_OPPID:any,
    U_OPPRNM:string,
    AddressExtension:any;
    DocumentLines: any;
     CreateDate: string;
     CreateTime: string;
     UpdateDate: string;
     UpdateTime: string;
     id?: any;
     BPLID?:any;
     Attach?:any;
     QuotationID?:any;
     FreightCharge?:any;
     PaymentGroupCode?:any;
     PODate?:any;
     PONumber?:any;
     BaseEntry?:any;
     BaseType?:any;
    // Attach:any;
 }

 export interface OrdersOne {
  is_draft?:any;
  AttachDetails?:any;
  DocTotal?:any;
   TaxDate: string;
   DocDueDate: string;
   ContactPersonCode: any;
   DiscountPercent: any;
   DocDate: string;
   CardCode: string;
   CardName: string;
   PRID:string,
   Comments: string;
   SalesPersonCode: any;
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
      U_SHPTYPS:string;
   }
   DocumentLines: any;
    CreateDate: string;
    CreateTime: string;
    UpdateDate: string;
    UpdateTime: string;
    id?: Number;
    BPLID?:any;
    Attach?:any;
    QuotationID?:any;
    FreightCharge?:any;
    PaymentGroupCode?:any;
    PODate?:any;
    PONumber?:any;
    BaseEntry?:any;
    BaseType?:any;
}

 export interface OrAttach {
   id?: number,
   orderId:string,
   Attach:string,
   CreateDate:string,
   CreateTime:string,
 }



export interface EditOrders {
  is_draft?:any;
  DocTotal?:any;
   TaxDate: string;
   DocDueDate: string;
   ContactPersonCode: any;
   DiscountPercent: any;
   DocDate: string;
   CardCode: string;
   CardName: string;
   U_QUOTNM: string,
   U_QUOTID: string,
   U_OPPID: string,
   PRID:string,
   U_OPPRNM: string,
   Comments: string;
   SalesPersonCode: string;
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
      U_SHPTYPS:string;
   }
   DocumentLines: any;
    CreateDate: string;
    CreateTime: string;
    UpdateDate: string;
    UpdateTime: string;
    id: String;
    BPLID?:any;
    Attach?:any;
    QuotationID?:any;
    FreightCharge?:any;
    PaymentGroupCode?:any;
    PODate?:any;
    PONumber?:any;
    BaseEntry?:any;
    BaseType?:any;
}

export interface StageComplete {
  id?: any,
  File:any,
  Remarks:any,
  StageId:any,
  DeliveryID:any,
}

