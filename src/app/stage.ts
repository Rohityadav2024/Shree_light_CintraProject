export interface Stages {
            SequenceNo: string;
            Name: string;
            Stageno: string;
            ClosingPercentage: string;
            Cancelled: string;
            IsSales: string;
            IsPurchasing: string;
            Comment: string;
            File: string;
            CreateDate: string;
            UpdateDate: string;
            Status: string;
            Opp_Id: string;
            Class: string;
            Color: string;
            popup1: string;
            popup2: string;
            popup3: string;
            id?: number;
    }


    export interface CreateStages {
        SequenceNo: string;
        Name: string;
        Stageno: string;
        ClosingPercentage: string;
        Cancelled: string;
        IsSales: string;
        IsPurchasing: string;

        CreateDate: string;
        UpdateDate: string;
        Opp_Id: string;
        id?: number;
}
export interface ChangeStages
{
        Stageno: string;
        Opp_Id: string;
        Comment: string;
        File: string;
        UpdateDate: string;
        UpdateTime: string;
        DocId: any;
        StartDate: any;
        EndDate: any;
        Status: any;
       }


export interface CompleteStages    {
        Opp_Id:string;
        Remarks: string;
        Status: string;
        UpdateDate: string;
        UpdateTime: string;
       }
