export interface Chatter {
            Message: string;
            SourceID: string;
            SourceType: string;
            Mode: any;
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
    Allday: string;
    leadType: string;
    Location: string;
    Host: string;
    Participants: string;
    Document: string;
    Repeated: string;
    Priority: string;
    ProgressStatus: string;
    Type: string;
    CreateDate: string;
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
  Allday: string;
  Location: string;
  Host: string;
  Participants: string;
  Document: string;
  Repeated: string;
  Priority: string;
  ProgressStatus: string;
  Type: string;
  CreateDate: string;
  CreateTime: string;
  id: string;
}