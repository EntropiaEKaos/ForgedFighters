import{describe,expect,it}from"vitest";import{createInitialState}from"@forged-fighter/core";import{stepCombatMatch}from"@forged-fighter/combat";
const n=()=>({left:false,right:false,up:false,down:false,light:false,medium:false,heavy:false,special:false,throw:false});
describe("client engine smoke",()=>{it("advances the authoritative combat simulation",()=>{const s=createInitialState(42),next=stepCombatMatch(s,[{...n(),right:true},n()]);expect(next.frame).toBe(1);expect(next.fighters[0].x).toBeGreaterThan(s.fighters[0].x);expect(next.fighters[0].health).toBe(10000);});});
