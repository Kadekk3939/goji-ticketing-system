export interface Request {
    requestId:number;
    responsibleUser:string;
    requestName:string;
    description:string;
    productId:number;
    result:string;
    status:string;
    type:string;
    openDate:Date;
    inProgressDate:Date;
    finalizationDate:Date;
  }
