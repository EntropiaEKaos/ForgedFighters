import {describe,expect,it} from "vitest";
import {createInitialState} from "./simulation.js";
import {clampToStage,resolvePushboxes} from "./stage.js";

describe("stage and pushboxes",()=>{
 it("clamps fighters inside stage bounds",()=>{const f={...createInitialState().fighters[0],x:-9999};expect(clampToStage(f,{left:-500,right:500}).x).toBe(-464);});
 it("separates overlapping grounded fighters deterministically",()=>{const s=createInitialState();const [a,b]=resolvePushboxes({...s.fighters[0],x:0},{...s.fighters[1],x:10});expect(b.x-a.x).toBe(72);});
});
