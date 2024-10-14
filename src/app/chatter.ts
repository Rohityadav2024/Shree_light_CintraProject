export interface Chatter {
  Mode:string;
            Message: string;
            SourceID: string;
            SourceType: string;
            Emp: string;
            Emp_Name: string;
            UpdateDate: string;
            UpdateTime: string;
            id?: number;
  }


  export interface Activity {
    SourceID: string;
    SourceType: string;
    Subject: string;
    Comment: string;
    Name: string;
    RelatedTo: string;
    Emp: string;
    Title: string;
    Description: string;
    From: string;
    To: string;
    Time: any;
    Allday: any;
    Location: string;
    Host: string;
    Participants: any;
    ParticipantsType:any;
    Document: string;
    Repeated: string;
    Priority: string;
    ProgressStatus: string;
    Type: string;
    CreateDate: string;
    Status:any;
    ToTime?:any;
    CreateTime: string;
    id?: number;
}

export interface EditActivity {
  Opp_Id: string;
  Subject: string;
  Comment: string;
  Name: string;
  RelatedTo: string;
  Emp: string;
  Title: string;
  Description: string;
  From: string;
  To: string;
  Time: any;
  Allday: any;
  Location: string;
  Host: string;
  Participants: any;
  Document: string;
  Repeated: string;
  Priority: string;
  ProgressStatus: string;
  Type: any;
  CreateDate: string;
  Status:any;
  ToTime?:any;
  CreateTime: string;
  id: string;
}


export interface OppoAttach {
  id?: number,
  oppId:string,
  Attach:string,
  CreateDate:string,
  CreateTime:string,


}
