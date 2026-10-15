import type { FighterInput } from "./types.js";

export type DirectionToken="N"|"L"|"R"|"U"|"D"|"UL"|"UR"|"DL"|"DR";
export type ButtonToken="L"|"M"|"H"|"S"|"T";

export interface BufferedInput { frame:number; direction:DirectionToken; buttons:readonly ButtonToken[]; }

export class CommandBuffer {
  private readonly history:BufferedInput[]=[];
  constructor(private readonly capacity=30){}

  push(frame:number,input:FighterInput):void{
    this.history.push({frame,direction:directionOf(input),buttons:buttonsOf(input)});
    while(this.history.length>this.capacity)this.history.shift();
  }

  recent(windowFrames:number):readonly BufferedInput[]{
    const latest=this.history.at(-1)?.frame??0;
    return this.history.filter(x=>x.frame>=latest-windowFrames+1);
  }

  doubleTap(direction:"L"|"R",windowFrames=12):boolean{
    const h=this.recent(windowFrames);
    let taps=0;let wasHeld=false;
    for(const x of h){const held=x.direction===direction||x.direction===`U${direction}`||x.direction===`D${direction}`;if(held&&!wasHeld)taps+=1;wasHeld=held;}
    return taps>=2;
  }
}

function directionOf(i:FighterInput):DirectionToken{
  const h=i.left?"L":i.right?"R":"";
  const v=i.up?"U":i.down?"D":"";
  return (v+h||"N") as DirectionToken;
}
function buttonsOf(i:FighterInput):ButtonToken[]{
  const b:ButtonToken[]=[];if(i.light)b.push("L");if(i.medium)b.push("M");if(i.heavy)b.push("H");if(i.special)b.push("S");if(i.throw)b.push("T");return b;
}
