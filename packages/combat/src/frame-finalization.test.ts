import{describe,expect,it}from"vitest";import{beginAttack,createInitialState}from"@forged-fighter/core";import{beginArmor,beginParry}from"./defense-reactions.js";import{finalizeCombatFrame}from"./frame-finalization.js";import{STANDING_LIGHT}from"./moves.js";
describe("frame finalization",()=>{
 it("advances both attacks exactly once",()=>{const s=createInitialState(),a=beginAttack(s.fighters[0],STANDING_LIGHT.id),b=beginAttack(s.fighters[1],STANDING_LIGHT.id);const r=finalizeCombatFrame([a,b],[beginArmor(3),beginParry(4)]);expect(r.fighters[0].attack?.frame).toBe((a.attack?.frame??0)+1);expect(r.fighters[1].attack?.frame).toBe((b.attack?.frame??0)+1);});
 it("ticks both defense reactions exactly once",()=>{const s=createInitialState();const r=finalizeCombatFrame(s.fighters,[beginArmor(3),beginParry(4)]);expect(r.defenseReactions[0].frames).toBe(2);expect(r.defenseReactions[1].frames).toBe(3);});
});
