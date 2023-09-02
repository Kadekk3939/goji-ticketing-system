export interface Task {
    taskId:number;
    issueId:number;
    responsibleUser:string;
    taskName:string;
    description:string;
    result:string;
    status:string;
    type:string;
    openDate:Date;
    inProgressDate:Date;
    finalizationDate:Date;
  }
