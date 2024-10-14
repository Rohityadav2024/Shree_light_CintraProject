export interface Customer {
  U_LEADID: any;
            U_LEADNM: string;
            CardCode: string;
            CardName: string;
            Industry: string;
            CardType: string;
            Website:  string;
            EmailAddress:  string;
            Phone1:  string;
            DiscountPercent:  string;
            Currency: string;
            IntrestRatePercent:  string;
            CommissionPercent:  string;
            Notes: string;
            PayTermsGrpCode: any;
            BPLID: any;
            CreditLimit: string;
            AttachmentEntry: string;
            SalesPersonCode: any;

            U_PARENTACC:  string;
            U_BPGRP:  string;
            U_CONTOWNR:  string;
            U_RATING:  string;
            U_TYPE:  string;
            U_ANLRVN:  string;
            U_CURBAL:  string;
            U_ACCNT:  string;
            U_INVNO:  string;
            CreateDate: string;
            CreateTime: string;
            UpdateDate: string;
            UpdateTime: string;
            U_LAT: string;
            U_LONG: string;
            BPAddresses:  [
                {
                  AddressName: string;
                  AddressType: string;
                  BPCode: string;
                  Block: string;
                  City: string;
                  Country: string;
                  RowNum: string;
                  State: string;
                  Street: string;
                  U_COUNTRY: string;
                  U_SHPTYP: string;
                  U_STATE: string;
                  ZipCode: string;
                },
                {
                  AddressName: string;
                  AddressType: string;
                  BPCode: string;
                  Block: string;
                  City: string;
                  Country: string;
                  RowNum: string;
                  State: string;
                  Street: string;
                  U_COUNTRY: string;
                  U_SHPTYP: string;
                  U_STATE: string;
                  ZipCode: string;
                }
              ],
              ContactEmployees:  [
                {
              Name: string;
              MobilePhone: string;
              E_Mail:string;
                }];
            id?: number;
  }

  export interface EditCustomer {
    CardCode: string;
    CardName: string;
    Industry: string;
    CardType: string;
    Website:  string;
    EmailAddress:  string;
    Phone1:  string;
    DiscountPercent:  string;
    Currency: string;
    IntrestRatePercent:  string;
    CommissionPercent:  string;
    Notes: string;
    PayTermsGrpCode: any;
    BPLID: any;
    CreditLimit: string;
    AttachmentEntry: string;
    SalesPersonCode: any;
    ContactEmployees:  [
      {
    Name: string;
    MobilePhone: string;
    E_Mail:string;
      }];
    U_PARENTACC:  string;
    U_BPGRP:  string;
    U_CONTOWNR:  string;
    U_RATING:  string;
    U_TYPE:  string;
    U_ANLRVN:  string;
    U_CURBAL:  string;
    U_ACCNT:  string;
    U_INVNO:  string;
    CreateDate: string;
    CreateTime: string;
    UpdateDate: string;
    UpdateTime: string;
    U_LAT: string;
    U_LONG: string;
    BPAddresses:  [
        {
          AddressName: string;
          AddressType: string;
          BPCode: string;
          Block: string;
          City: string;
          Country: string;
          RowNum: string;
          State: string;
          Street: string;
          U_COUNTRY: string;
          U_SHPTYP: string;
          U_STATE: string;
          ZipCode: string;
        },
        {
          AddressName: string;
          AddressType: string;
          BPCode: string;
          Block: string;
          City: string;
          Country: string;
          RowNum: string;
          State: string;
          Street: string;
          U_COUNTRY: string;
          U_SHPTYP: string;
          U_STATE: string;
          ZipCode: string;
        }
      ];
    id: string;
}

  export interface Industory {
    IndustryDescription: string;
            IndustryName: string;
            IndustryCode: string;
    id?: number;
  }

  export interface Country {
    Code: string;
    Name: string;
    id?: number;
  }

  export interface States {
    Code: string;
    Name: string;
    Country: string;
    id?: number;
  }



  export interface Branch {
    BPID: string;
    RowNum: string;
    BPCode: string;
    BranchName:string;
    AddressName:  string;
    AddressName2:  string;
    AddressName3:  string;
    BuildingFloorRoom:  string;
    Street:  string;
    Block:  string;
    County:  string;
    City:  string;
    State: string;
    ZipCode: string;
    Country: string;
    AddressType: string;
    Phone:  string;
    Fax:  string;
    Email:  string;
    TaxOffice:  string;
    GSTIN:  string;
    GstType:  string;
    ShippingType:  string;
    PaymentTerm:  string;
    CurrentBalance:  string;
    CreditLimit:  string;
    Lat:  string;
    Long:  string;
    Status:  string;
    Default:  string;
    U_SHPTYP: string;
    U_COUNTRY: string;
    U_STATE: string;
    CreateDate: string;
    CreateTime: string;
    UpdateDate: string;
    UpdateTime: string;
    id?: number;
  }


  export interface EditBranch {
    BPID: string;
    RowNum: string;
    BPCode: string;
    BranchName:string;
    AddressName:  string;
    AddressName2:  string;
    AddressName3:  string;
    BuildingFloorRoom:  string;
    Street:  string;
    Block:  string;
    County:  string;
    City:  string;
    State: string;
    ZipCode: string;
    Country: string;
    AddressType: string;
    Phone:  string;
    Fax:  string;
    Email:  string;
    TaxOffice:  string;
    GSTIN:  string;
    GstType:  string;
    ShippingType:  string;
    PaymentTerm:  string;
    CurrentBalance:  string;
    CreditLimit:  string;
    Lat:  string;
    Long:  string;
    Status:  string;
    Default:  string;
    U_SHPTYP: string;
    U_COUNTRY: string;
    U_STATE: string;
    CreateDate: string;
    CreateTime: string;
    UpdateDate: string;
    UpdateTime: string;
    id: string;
  }



  export interface ContactPerson {
    Title: string;
    FirstName: string;
    MiddleName: string;
    LastName: string;
    Position: string;
    Address: string;
    MobilePhone: string;
    Fax: string;
    E_Mail: string;
    Remarks1: string;
    InternalCode: string;
    DateOfBirth: string;
    Gender: string;
    Profession: string;
    CardCode: string;
    U_BPID: string;
    U_BRANCHID: string;
    U_NATIONALTY: string;
    CreateDate: string;
    CreateTime: string;
    UpdateDate: string;
    UpdateTime: string;
    id?: number;
  }


  export interface PaymentTerm {
    GroupNumber: string;
    PaymentTermsGroupName: string;
    id?: number;
  }


  export interface Branchs {
    BPLId: string;
      BPLName: string;
      Address: string;
      MainBPL: string;
      Disabled: string;
      UserSign2: string;
      UpdateDate: string;
      DflWhs: string;
      TaxIdNum: string;
      StreetNo: string;
      Building: string;
      ZipCode: string;
      City: string;
      State: string;
      Country: string;
    id?: number;
  }

  export interface MAP {

    Lat:string;
    Long:string;
    Address:string;
    Emp_Id:string;
    Emp_Name:string;
    UpdateDate:string;
    UpdateTime:string;
    type: string;
    shape: any;
    remark:string;

  }
