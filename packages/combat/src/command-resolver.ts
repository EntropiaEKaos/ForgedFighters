import type{FighterInput}from"@forged-fighter/core";
export interface ResolvedCombatCommand{lockedInput:FighterInput;actionInput:FighterInput;superCommand:boolean;projectileCommand:boolean;}
const neutralizeLockedInput=(input:FighterInput):FighterInput=>({...input,left:false,right:false,up:false,down:false,light:false,medium:false,heavy:false,special:false});
export function resolveCombatCommand(input:FighterInput,throwLocked:boolean):ResolvedCombatCommand{
 const lockedInput=throwLocked?neutralizeLockedInput(input):input;
 const superCommand=lockedInput.down&&lockedInput.special;
 const projectileCommand=lockedInput.medium&&lockedInput.special&&!superCommand;
 const actionInput=projectileCommand?{...lockedInput,medium:false,special:false,throw:false}:superCommand?{...lockedInput,down:false,throw:false}:lockedInput;
 return{lockedInput,actionInput,superCommand,projectileCommand};
}
