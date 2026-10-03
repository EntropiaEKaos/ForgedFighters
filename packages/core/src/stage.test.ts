import {describe,expect,it} from "vitest";
import {createInitialState} from "./simulation.js";
import {clampToStage,resolvePushboxes,resolveStagePushboxes,PUSHBOX_HALF_WIDTH} from "./stage.js";

describe("stage and pushboxes",()=>{
 it("clamps fighters inside stage bounds",()=>{const f={...createInitialState().fighters[0],x:-9999};expect(clampToStage(f,{left:-500,right:500}).x).toBe(-464);});
 it("separates overlapping grounded fighters deterministically",()=>{const s=createInitialState();const [a,b]=resolvePushboxes({...s.fighters[0],x:0},{...s.fighters[1],x:10});expect(b.x-a.x).toBe(72);});
it("preserves separation when defender is pinned to right wall",()=>{const s=createInitialState(),stage={left:-500,right:500},max=500-PUSHBOX_HALF_WIDTH;const[a,b]=resolveStagePushboxes({...s.fighters[0],x:max-20},{...s.fighters[1],x:max},stage);expect(b.x).toBe(max);expect(b.x-a.x).toBe(72);});it("preserves separation when defender is pinned to left wall",()=>{const s=createInitialState(),stage={left:-500,right:500},min=-500+PUSHBOX_HALF_WIDTH;const[a,b]=resolveStagePushboxes({...s.fighters[0],x:min},{...s.fighters[1],x:min+20},stage);expect(a.x).toBe(min);expect(b.x-a.x).toBe(72);});it("solves reversed fighter ordering symmetrically",()=>{const s=createInitialState(),stage={left:-500,right:500};const[a,b]=resolveStagePushboxes({...s.fighters[0],x:100},{...s.fighters[1],x:50},stage);expect(Math.abs(b.x-a.x)).toBe(72);});});
