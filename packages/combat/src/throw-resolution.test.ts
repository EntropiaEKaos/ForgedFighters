import{describe,expect,it}from"vitest";import type{FighterState}from"@forged-fighter/core";import{resolveThrowAttempt}from"./throw-resolution.js";import{advanceThrow,BASIC_THROW,beginThrow}from"./throws.js";
const f=(x:number):FighterState=>({playerId:0,x,y:0,vx:0,vy:0,facing:1,health:10000,meter:0,grounded:true,mode:"idle",stunFrames:0,hitstopFrames:0} as FighterState);
describe("deterministic throw resolution",()=>{
 it("clears a teched throw without damaging defender",()=>{const a=f(0),d=f(20),r=resolveThrowAttempt(a,d,beginThrow(),null,true);expect(r.attempt).toBeNull();expect(r.defender).toEqual(d);});
 it("connects at startup and applies canonical throw stun",()=>{const a=f(0),d=f(20);let t=beginThrow();for(let i=0;i<BASIC_THROW.startup;i++)t=advanceThrow(t);const r=resolveThrowAttempt(a,d,t,null,false);expect(r.attempt).toBeNull();expect(r.defender.health).toBe(d.health-BASIC_THROW.damage);expect(r.defender.mode).toBe("hitstun");expect(r.defender.stunFrames).toBe(BASIC_THROW.techWindow);});
 it("advances unresolved throws deterministically",()=>{const t=beginThrow(),r=resolveThrowAttempt(f(0),f(500),t,null,false);expect(r.attempt).toEqual(advanceThrow(t));});
});
