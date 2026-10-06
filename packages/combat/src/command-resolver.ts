import type{FighterInput}from"@forged-fighter/core";
export type CombatCommandOwner="none"|"super"|"projectile"|"throw";
export interface ResolvedCombatCommand{lockedInput:FighterInput;actionInput:FighterInput;owner:CombatCommandOwner;}
const neutralizeLockedInput=(input:FighterInput):FighterInput=>({...input,left:false,right:false,up:false,down:false,light:false,medium:false,heavy:false,special:false});
export function resolveCombatCommand(input:FighterInput,throwLocked:boolean):ResolvedCombatCommand{
 const lockedInput=throwLocked?neutralizeLockedInput(input):input;
 const superCommand=lockedInput.down&&lockedInput.special;
 const projectileCommand=lockedInput.medium&&lockedInput.special&&!superCommand;
 const owner:CombatCommandOwner=superCommand?"super":projectileCommand?"projectile":!throwLocked&&lockedInput.throw?"throw":"none";
 const actionInput=projectileCommand?{...lockedInput,medium:false,special:false,throw:false}:superCommand?{...lockedInput,down:false,throw:false}:lockedInput;
 return{lockedInput,actionInput,owner};
}
