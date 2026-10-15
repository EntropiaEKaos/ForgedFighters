import{describe,expect,it}from"vitest";import{beginAttack,createInitialState,type FighterInput}from"@forged-fighter/core";import{advanceAttack}from"./runtime.js";import{resolveSuperContact}from"./super-resolution.js";import{BASIC_SUPER}from"./moves.js";
const n=():FighterInput=>({left:false,right:false,up:false,down:false,light:false,medium:false,heavy:false,special:false,throw:false});
const activeSuper=()=>{let a={...createInitialState().fighters[0],x:0};a=beginAttack(a,BASIC_SUPER.id);for(let i=0;i<BASIC_SUPER.startup;i++)a=advanceAttack(a);return a;};
describe("deterministic super contact resolution",()=>{
 it("reports damage on a clean hit",()=>{const a=activeSuper(),d={...createInitialState().fighters[1],x:70};const r=resolveSuperContact(a,d,n());expect(r.didDamage).toBe(true);expect(r.defender.health).toBe(d.health-BASIC_SUPER.damage);expect(r.defender.mode).toBe("hitstun");});
 it("reports no damage when blocked",()=>{const a=activeSuper(),d={...createInitialState().fighters[1],x:70,facing:-1 as const};const r=resolveSuperContact(a,d,{...n(),right:true});expect(r.didDamage).toBe(false);expect(r.defender.health).toBe(d.health);expect(r.defender.mode).toBe("blockstun");});
 it("reports no damage on miss",()=>{const a=activeSuper(),d={...createInitialState().fighters[1],x:500};const r=resolveSuperContact(a,d,n());expect(r.didDamage).toBe(false);expect(r.defender).toEqual(d);});
});
