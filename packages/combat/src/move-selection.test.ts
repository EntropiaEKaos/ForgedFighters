import{describe,expect,it}from"vitest";import type{FighterInput,FighterState}from"@forged-fighter/core";import{selectMeleeStarter}from"./move-selection.js";
const n=():FighterInput=>({left:false,right:false,up:false,down:false,light:false,medium:false,heavy:false,special:false,throw:false});
const f=(patch:Partial<FighterState>={}):FighterState=>({playerId:0,x:0,y:0,vx:0,vy:0,facing:1,health:10000,meter:0,grounded:true,mode:"idle",stunFrames:0,hitstopFrames:0,...patch} as FighterState);
describe("deterministic melee move selection",()=>{
 it("preserves current grounded starter priority",()=>{expect(selectMeleeStarter(f(),{...n(),light:true,heavy:true,special:true})).toBe("bounce");expect(selectMeleeStarter(f(),{...n(),light:true,heavy:true})).toBe("heavy");expect(selectMeleeStarter(f(),{...n(),light:true})).toBe("light");});
 it("selects air light before grounded starters",()=>{expect(selectMeleeStarter(f({grounded:false,mode:"jump"}),{...n(),light:true,heavy:true})).toBe("air-light");});
 it("does not start melee while fighter is busy",()=>{expect(selectMeleeStarter(f({mode:"attack"}),{...n(),light:true,heavy:true,special:true})).toBe("none");});
});
