export interface AttackFrameData {
 id:string;
 startup:number;
 active:number;
 recovery:number;
 damage:number;
 hitstun:number;
 blockstun:number;
 hitstop:number;
 bounce?:{wall?:boolean;ground?:boolean};
}
export type AttackPhase="startup"|"active"|"recovery"|"complete";
export function totalFrames(a:AttackFrameData):number{return a.startup+a.active+a.recovery;}
export function attackPhase(a:AttackFrameData,frame:number):AttackPhase{
 if(frame<0)return "complete";
 if(frame<a.startup)return "startup";
 if(frame<a.startup+a.active)return "active";
 if(frame<totalFrames(a))return "recovery";
 return "complete";
}
