export interface TargetAssignment{
    TargetFor : string;
    StartYear : string;
    EndYear : string;
    SalesPersonCode : string;
    reportingTo : any;
    YearTarget : number;
    q1 : number;
    q2 : number;
    q3 : number;
    q4 : number;
    CreatedDate : string;
    UpdatedDate : string;
    Department  :string;
    status: number;
    id?: number;
} 

export interface TargeMonth{
    TargetFor: string;
    amount: string;
    monthYear: string;
    qtr: string;
    department: string;
    CreatedDate: string;
    UpdatedDate: string;
    SalesPersonCode: string;
    reportingTo: string;
    id?: number;
}

export interface TargeYear  {
Department:string;
StartYear:string;
EndYear:string;
SalesPersonCode:any;
reportingTo:string;
YearTarget:string;
CreatedDate:string;
UpdatedDate:string;
id?: number;
}



export interface TargeQuoter{
    
        SalesPersonCode:any;
        reportingTo:any;
        YearTarget:any;
        q1:any;
        q2:any;
        q3:any;
        q4:any;
        CreatedDate:any;
        UpdatedDate:any;
        monthly: any;
        id: string;
}


export interface TargeEmployeGet{
    StartYear:any;
    EndYear:any;
    Department:any;
    reportingTo:any;
    }