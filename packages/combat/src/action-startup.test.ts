import{describe,expect,it}from"vitest";import{createInitialState,neutralInput}from"@forged-fighter/core";import{resolveCombatCommand}from"./command-resolver.js";import{resolveActionStartup}from"./action-startup.js";
const input=(patch:Partial<ReturnType<typeof neutralInput>>)=>({...neutralInput(),...patch});
describe("action startup",()=>{
 it("preserves super ownership over overlapping melee",()=>{const s=createInitialState(),i=input({down:true,medium:true,special:true}),c=resolveCombatCommand(i,false),r=resolveActionStartup(s.fighters,[c,resolveCombatCommand(neutralInput(),false)],[c.lockedInput,neutralInput()],[c.actionInput,neutralInput()],[null,null]);expect(r.fighters[0].attack?.moveId).toBe("basic-super");expect(r.throws).toEqual([null,null]);});
 it("starts throw only for throw owner while idle",()=>{const s=createInitialState(),i=input({throw:true}),c=resolveCombatCommand(i,false),n=resolveCombatCommand(neutralInput(),false),r=resolveActionStartup(s.fighters,[c,n],[c.lockedInput,n.lockedInput],[c.actionInput,n.actionInput],[null,null]);expect(r.throws[0]).not.toBeNull();expect(r.throws[1]).toBeNull();});
});
