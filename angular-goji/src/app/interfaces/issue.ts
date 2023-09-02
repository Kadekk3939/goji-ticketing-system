export interface Issue {
    issueId:number;
    requestId:number;
    responsibleUser:number;
    issueName:string;
    description:string;
    result:string;
    status:string;
    type:string;
    openDate:Date;
    inProgressDate:Date;
    finalizationDate:Date;
  }
