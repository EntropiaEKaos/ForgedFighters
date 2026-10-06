export interface CommandReceipt{commandId:string;frame:number;}
export function isCommandConsumed(receipts:readonly CommandReceipt[],commandId:string,frame:number):boolean{return receipts.some(r=>r.commandId===commandId&&r.frame===frame);}
export function consumeCommand(receipts:readonly CommandReceipt[],commandId:string,frame:number):readonly CommandReceipt[]{return isCommandConsumed(receipts,commandId,frame)?receipts:[...receipts,{commandId,frame}];}
export function pruneCommandReceipts(receipts:readonly CommandReceipt[],beforeFrame:number):readonly CommandReceipt[]{return receipts.filter(r=>r.frame>=beforeFrame);}
