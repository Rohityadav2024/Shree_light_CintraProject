export interface Tender {
  TenderName: string;
  TenderType: string;
  CustomerName: string;
  CustomerContact: string;
  email: string;
  message: string;
  id?: number;
}

export interface TenderBasic {
  TenItem: any;
  U_LEADID: any;
  U_LEADNM: string;
  U_OPPID: string;
  U_OPPRNM: string;
  SalesPersonCode: any;
  OrganisationChain: string;
  TReferenceNo: string;
  TID: string;
  TType: string;
  TCategoey: string;
  GeneralTechEveAll: string;
  PaymentMode: string;
  MultiCurrency: string;
  FormOfContact: string;
  NoOfCovers: string;
  ItemTechEveAll: string;
  MultiCurrencyForBoq: string;
  TwoStageBidding: string;
  TenderFee: string;
  PayableTo: string;
  FeeExemptionAllow: string;
  FeePayableAt: string;
  EMDAmount: string;
  EMDFeeType: string;
  EMDPayableTo: string;
  EMDPayableAt: string;
  EMDExemptionAllow: string;
  EMDPercentage: string;
  InvitingAuthorityName: string;
  InvitingAuthorityAddress: string;
  PaymentInstrument: any,
  CoverDetail: any,
  WorkOrItemDetails: {

    Title: string;
    Description: string;
    PreQualficationDetails: string;
    Remarks: string;
    TenderValue: string;
    ProductCategory: string;
    ProductSubCategory: string;
    ContactType: string;
    BidValidity: string;
    PeriodOfWork: string;
    Location: string;
    Pincode: string;
    PreBidMeetingPlace: string;
    PreBidMeetingAddress: string;
    PreBidMeetingDate: string;
    BidOpeningPlace: string;
    NDATenderAllow: string;
    PreferentialBidderAllow: string;
  },
  CritcalDates: {

    PublishDate: string;
    BidOpeningDate: string;
    SaleStartDate: string;
    SaleEndDate: string;
    ClarificationStartDate: string;
    ClarificationEndDate: string;
    BidSubStartDate: string;
    BidSubEndDate: string;
  },


  id?: number;
}


export interface TenderDoc {
  TenderId: string;
  Type: string;
  Title: string;
  Description: string;
  File: string;
}


export interface TenderSubmission {
  TenderId: string;
  FeeStatus: string;
  PaymentRegNo: string;
  PaymentMode: string;
  FeeAmount: string;
  BankName: string;
  AccountNo: string;
  IFSCCode: string;

  EMDFeeStatus: string;
  EMDTerms: string;
  EMDPaymentMode: string;
  EMDFeeAmount: string;
  EMDBankName: string;
  EMDAccountNo: string;
  EMDIFSCCode: string;

}


export interface TenderTechnicalOpening {
  TenderId: string;
  CompanyName: string;
  QuotedModel: string;
  Part: string;
  Status: string;
}

export interface EditTenderTechnicalOpening {
  id: string;
  TenderId: string;
  CompanyName: string;
  QuotedModel: string;
  Part: string;
  Status: string;
}

export interface TenderOpening {
  TenderId: string;
  CompanyName: string;
  QuotedModel: string;
  Part: string;
  Status: string;


}


export interface EditTenderOpening {
  id: string;
  TenderId: string;
  CompanyName: string;
  QuotedModel: string;
  Part: string;
  Status: string;
}

export interface TenderTechnicalOpening {
  TenderId: string;
  CompanyName: string;
  QuotedModel: string;

}

export interface TenderLowestOne {
  TenderId: string;
  CompanyName: string;
  QuotedModel: string;
  Price: string;
  Remarks: string;
  Status: string;

}


export interface TenderClose {
  TenderId: string;
  Status: string;
  Comments: string;

}


export interface TenderStatusComplete {
  TenderId: any;
  StatusType: any;
  StageStatus: any;

}



export interface TenderGet {
  StageStatus: number;

  SalesPersonCode: any;
  OrganisationChain: string;
  TReferenceNo: string;
  TID: string;
  TType: string;
  TCategoey: string;
  GeneralTechEveAll: string;
  PaymentMode: string;
  MultiCurrency: string;
  FormOfContact: string;
  NoOfCovers: string;
  ItemTechEveAll: string;
  MultiCurrencyForBoq: string;
  TwoStageBidding: string;
  TenderFee: string;
  PayableTo: string;
  FeeExemptionAllow: string;
  FeePayableAt: string;
  EMDAmount: string;
  EMDFeeType: string;
  EMDPayableTo: string;
  EMDPayableAt: string;
  EMDExemptionAllow: string;
  EMDPercentage: string;
  InvitingAuthorityName: string;
  InvitingAuthorityAddress: string;
  Status: any,
  Comments: any,
  PaymentInstrument: any,
  CoverDetail: any,
  TenderSubStatus: any,
  TenderOpenStatus: any,
  TechOpenStatus: any,
  LowestOneStatus: any,
  WorkOrItemDetails: {

    Title: string;
    Description: string;
    PreQualficationDetails: string;
    Remarks: string;
    TenderValue: string;
    ProductCategory: string;
    ProductSubCategory: string;
    ContactType: string;
    BidValidity: string;
    PeriodOfWork: string;
    Location: string;
    Pincode: string;
    PreBidMeetingPlace: string;
    PreBidMeetingAddress: string;
    PreBidMeetingDate: string;
    BidOpeningPlace: string;
    NDATenderAllow: string;
    PreferentialBidderAllow: string;
  },
  CritcalDates: {

    PublishDate: string;
    BidOpeningDate: string;
    SaleStartDate: string;
    SaleEndDate: string;
    ClarificationStartDate: string;
    ClarificationEndDate: string;
    BidSubStartDate: string;
    BidSubEndDate: string;
  },
  Documents: [{
    Type: any;
    Title: any;
    Description: any;
    File: any;
  }],
  TenderSubmission: {
    id: string;
    TenderId: string;
    FeeStatus: string;
    PaymentRegNo: string;
    PaymentMode: string;
    EMDFeeStatus: string;
    EMDTerms: string;
    EMDPaymentMode: string;
  },
  TechnicalOpening: [
    {
      id: string;
      TenderId: string;
      CompanyName: string;
      QuotedModel: string;
      Part: string;
      Status: string;
    }],
  TenderOpening: [
    {
      id: string;
      TenderId: string;
      CompanyName: string;
      QuotedModel: string;
      Part: string;
      Status: string;
    }],
  LowestOne: [{
    id: string;
    TenderId: string;
    CompanyName: string;
    QuotedModel: string;
    Price: string;
    Remarks: string;
    Status: string;
  }]

  id?: number;
}
