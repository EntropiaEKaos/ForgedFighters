export type CancelTarget="normal"|"special"|"super"|"jump"|"dash";
export interface CancelWindow{from:number;to:number;targets:readonly CancelTarget[];requireHit?:boolean;requireBlock?:boolean;}
export interface CancelContext{frame:number;connected:boolean;blocked:boolean;}
export function canCancel(windows:readonly CancelWindow[],target:CancelTarget,ctx:CancelContext):boolean{return windows.some(w=>ctx.frame>=w.from&&ctx.frame<=w.to&&w.targets.includes(target)&&(!w.requireHit||ctx.connected)&&(!w.requireBlock||ctx.blocked));}
