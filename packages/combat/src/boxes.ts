export interface Box { x:number;y:number;width:number;height:number; }
export interface WorldBox extends Box { owner:0|1; }
export const STANDING_BODY_HURTBOX:Box={x:-28,y:0,width:56,height:112};
export function intersects(a:Box,b:Box):boolean{
 return a.x < b.x+b.width && a.x+a.width > b.x && a.y < b.y+b.height && a.y+a.height > b.y;
}
export function toWorldBox(local:Box,owner:0|1,originX:number,originY:number,facing:-1|1):WorldBox{
 const x=facing===1?originX+local.x:originX-local.x-local.width;
 return {...local,owner,x,y:originY+local.y};
}
