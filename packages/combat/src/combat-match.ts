import{createInitialState,type MatchState}from"@forged-fighter/core";import{EMPTY_COMBO,type ComboState}from"./combo.js";import type{ThrowAttempt}from"./throws.js";
export interface CombatMatchState extends MatchState{combos:readonly[ComboState,ComboState];throws:readonly[ThrowAttempt|undefined,ThrowAttempt|undefined];}
export function createCombatMatchState(seed=1):CombatMatchState{return{...createInitialState(seed),combos:[{...EMPTY_COMBO},{...EMPTY_COMBO}],throws:[undefined,undefined]};}
export function asCombatMatchState(state:MatchState):CombatMatchState{if("combos"in state){const s=state as CombatMatchState;return"throws"in s?s:{...s,throws:[undefined,undefined]};}return{...state,combos:[{...EMPTY_COMBO},{...EMPTY_COMBO}],throws:[undefined,undefined]};}
