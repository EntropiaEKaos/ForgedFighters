import type{FighterInput,PlayerId}from"@forged-fighter/core";import type{InputHistory}from"./input-history.js";
export type RelativeDirection="N"|"F"|"B"|"U"|"D"|"UF"|"UB"|"DF"|"DB";
export interface CommandSpec{id:string;sequence:readonly RelativeDirection[];windowFrames:number;}
export const QCF:CommandSpec={id:"qcf",sequence:["D","DF","F"],windowFrames:12};
export const QCB:CommandSpec={id:"qcb",sequence:["D","DB","B"],windowFrames:12};
export const DP:CommandSpec={id:"dp",sequence:["F","D","DF"],windowFrames:12};
export function relativeDirection(input:FighterInput,facing:-1|1):RelativeDirection{const f=facing===1?input.right:input.left,b=facing===1?input.left:input.right,v=input.up?"U":input.down?"D":"";const h=f?"F":b?"B":"";return(v+h||"N")as RelativeDirection;}
export function recognizeCommand(history:InputHistory,player:PlayerId,endFrame:number,facing:-1|1,spec:CommandSpec):boolean{let wanted=spec.sequence.length-1;for(let frame=endFrame;frame>=Math.max(0,endFrame-spec.windowFrames+1)&&wanted>=0;frame--){const d=relativeDirection(history.get(frame)[player],facing);if(d===spec.sequence[wanted])wanted--;}return wanted<0;}
