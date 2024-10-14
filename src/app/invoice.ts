export interface Invoice {
    DocEntry: string;
    DocDueDate: string;
    DocDate: string;
    TaxDate: string;
    ContactPersonCode: any;
    DiscountPercent: string;
    CardCode: string;
    CardName: string;
    Comments: string;
    SalesPersonCode: any;
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
    Attach?:any;
    id?: number;
  }
