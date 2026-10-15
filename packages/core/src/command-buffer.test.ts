import {describe,expect,it} from "vitest";
import {CommandBuffer} from "./command-buffer.js";
import type {FighterInput} from "./types.js";
const n:FighterInput={left:false,right:false,up:false,down:false,light:false,medium:false,heavy:false,special:false,throw:false};
describe("command buffer",()=>{it("detects a deterministic double tap",()=>{const b=new CommandBuffer();b.push(0,n);b.push(1,{...n,right:true});b.push(2,n);b.push(3,{...n,right:true});expect(b.doubleTap("R")).toBe(true);});});
