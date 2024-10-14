export interface opportunity {
    DocTotal?:any;
    SequentialNo: string;
    U_LEADID:any;
    U_LEADNM:string;
    CardCode: any;
    SalesPerson: string;
    SalesPersonName: string;
    ContactPerson: string;
    ContactPersonName: string;
    Source: string;
    StartDate: string;
    PredictedClosingDate: string;
    MaxLocalTotal: string;
    MaxSystemTotal: string;
    Remarks: string;
    Status: string;
    ReasonForClosing: string;
    TotalAmountLocal: string;
    TotalAmounSystem: string;
    CurrentStageNo: string;
    CurrentStageNumber: string;
    CurrentStageName: string;
    OpportunityName: string;
    Industry: string;
    LinkedDocumentType: string;
    DataOwnershipfield: any;
    DataOwnershipName: string;
    StatusRemarks: string;
    ProjectCode: string;
    CustomerName: string;
    ClosingDate: string;
    ClosingType: string;
    OpportunityType: string;
    UpdateDate: string;
    UpdateTime: string;
    U_TYPE: any;
    U_LSOURCE: string;
    U_FAV: string;
    U_PROBLTY: string;
    SalesOpportunitiesLines: any;
    DocumentLines:any;
      id?: number;
      OppItem:any;
  //     OppItem:[{
  //       Quantity:string,
  // UnitPrice:string,
  // DiscountPercent:string,
  // ItemCode:string,
  // ItemDescription:string,
  // TaxCode:string,
  // U_FGITEM:string,
  // CostingCode2:string,
  // ProjectCode:string,
  // FreeText:string,
  // Tax:string,
  // UomNo:string,
  //     }],
    }

    export interface oneopportunity {
      DocTotal?:any;
      SequentialNo: string;
      U_LEADID:number;
      U_LEADNM:string;
      CardCode: any;
      SalesPerson: string;
      SalesPersonName: string;
      ContactPerson: string;
      ContactPersonName: string;
      Source: string;
      StartDate: string;
      PredictedClosingDate: string;
      MaxLocalTotal: string;
      MaxSystemTotal: string;
      Remarks: string;
      Status: string;
      ReasonForClosing: string;
      TotalAmountLocal: string;
      TotalAmounSystem: string;
      CurrentStageNo: string;
      CurrentStageNumber: string;
      CurrentStageName: string;
      OpportunityName: string;
      Industry: string;
      LinkedDocumentType: string;
      DataOwnershipfield: any;
      DataOwnershipName: string;
      StatusRemarks: string;
      ProjectCode: string;
      CustomerName: string;
      ClosingDate: string;
      ClosingType: string;
      OpportunityType: string;
      UpdateDate: string;
      UpdateTime: string;
      U_TYPE: any;
      U_LSOURCE: string;
      U_FAV: string;
      U_PROBLTY: string;
      SalesOpportunitiesLines: any;
        id?: number;
        Attach:any;
        OppItem:any;
      }


    export interface Editopportunity {
      DocTotal?:any;
      SequentialNo: string;
      CardCode: string;
      U_LEADID:number,
      U_LEADNM:string,
      SalesPerson: string;
      SalesPersonName: string;
      ContactPerson: string;
      ContactPersonName: string;
      Source: string;
      StartDate: string;
      PredictedClosingDate: string;
      MaxLocalTotal: string;
      MaxSystemTotal: string;
      Remarks: string;
      Status: string;
      ReasonForClosing: string;
      TotalAmountLocal: string;
      TotalAmounSystem: string;
      CurrentStageNo: string;
      CurrentStageNumber: string;
      CurrentStageName: string;
      OpportunityName: string;
      Industry: string;
      LinkedDocumentType: string;
      DataOwnershipfield: any;
      DataOwnershipName: string;
      StatusRemarks: string;
      ProjectCode: string;
      CustomerName: string;
      ClosingDate: string;
      ClosingType: string;
      OpportunityType: string;
      UpdateDate: string;
      UpdateTime: string;
      U_TYPE: string;
      U_LSOURCE: string;
      U_FAV: string;
      U_PROBLTY: string;
      SalesOpportunitiesLines: any;
      id: string;
      OppItem:any;
    }
