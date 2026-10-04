import{describe,expect,it}from"vitest";import type{FighterInput,FighterState}from"@forged-fighter/core";import{executeMeleeStarter,resolveMeleeStarter}from"./move-execution.js";import{AIR_JUGGLE_LIGHT,BOUNCE_LAUNCHER,STANDING_HEAVY_LAUNCHER,STANDING_LIGHT}from"./moves.js";
const n=():FighterInput=>({left:false,right:false,up:false,down:false,light:false,medium:false,heavy:false,special:false,throw:false});
const f=(patch:Partial<FighterState>={}):FighterState=>({playerId:0,x:0,y:0,vx:0,vy:0,facing:1,health:10000,meter:0,grounded:true,mode:"idle",stunFrames:0,hitstopFrames:0,...patch} as FighterState);
describe("deterministic melee move execution",()=>{
 it("executes each selected grounded starter",()=>{expect(executeMeleeStarter(f(),{...n(),light:true},"light").attack?.moveId).toBe(STANDING_LIGHT.id);expect(executeMeleeStarter(f(),{...n(),heavy:true},"heavy").attack?.moveId).toBe(STANDING_HEAVY_LAUNCHER.id);expect(executeMeleeStarter(f(),{...n(),special:true},"bounce").attack?.moveId).toBe(BOUNCE_LAUNCHER.id);});
 it("executes selected air light",()=>{expect(executeMeleeStarter(f({grounded:false,mode:"jump"}),{...n(),light:true},"air-light").attack?.moveId).toBe(AIR_JUGGLE_LIGHT.id);});
 it("leaves fighter unchanged for none",()=>{const fighter=f();expect(executeMeleeStarter(fighter,n(),"none")).toEqual(fighter);});
 it("composes selection and execution deterministically",()=>{expect(resolveMeleeStarter(f(),{...n(),light:true,heavy:true}).attack?.moveId).toBe(STANDING_HEAVY_LAUNCHER.id);});
});
