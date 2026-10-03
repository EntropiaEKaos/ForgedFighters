import{createInitialState,type MatchState}from"@forged-fighter/core";import{EMPTY_COMBO,type ComboState}from"./combo.js";
export interface CombatMatchState extends MatchState{combos:readonly[ComboState,ComboState];}
export function createCombatMatchState(seed=1):CombatMatchState{return{...createInitialState(seed),combos:[{...EMPTY_COMBO},{...EMPTY_COMBO}]};}
export function asCombatMatchState(state:MatchState):CombatMatchState{return"combos"in state?state as CombatMatchState:{...state,combos:[{...EMPTY_COMBO},{...EMPTY_COMBO}]};}
