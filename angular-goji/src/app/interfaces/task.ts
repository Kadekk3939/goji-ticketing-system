export interface Task {
    taskId:number;
    issueId:number;
    taskName:string;
    description:string;
    result:string;
    status:string;
    type:string;
    openDate:Date;
    inProgressDate:Date;
    finalizationDate:Date;
  }
