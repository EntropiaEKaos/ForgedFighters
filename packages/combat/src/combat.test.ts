import{describe,expect,it}from"vitest";import{attackPhase,detectHit,toWorldBox,type AttackFrameData}from"./index.js";
const jab:AttackFrameData={id:"jab",startup:3,active:2,recovery:7,damage:500,hitstun:10,blockstun:7,hitstop:5};
describe("combat primitives",()=>{
 it("resolves attack phases from frame data",()=>{expect(attackPhase(jab,0)).toBe("startup");expect(attackPhase(jab,3)).toBe("active");expect(attackPhase(jab,5)).toBe("recovery");expect(attackPhase(jab,12)).toBe("complete");});
 it("mirrors local boxes by facing",()=>{expect(toWorldBox({x:20,y:10,width:30,height:20},0,100,0,-1).x).toBe(50);});
 it("detects hitbox versus opponent hurtbox",()=>{const hit=toWorldBox({x:0,y:0,width:50,height:50},0,0,0,1);const hurt=toWorldBox({x:0,y:0,width:50,height:50},1,25,0,1);expect(detectHit(hit,[hurt])).toEqual({attacker:0,defender:1});});
});
