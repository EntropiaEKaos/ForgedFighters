import type{FramedState}from"@forged-fighter/netcode";
export type RulesetCapability="teams"|"tag"|"assists"|"air-dash"|"double-jump"|"wall-bounce"|"ground-bounce"|"platforms"|"weapons"|"free-movement";
export interface RulesetMetadata{id:string;version:string;displayName:string;capabilities:readonly RulesetCapability[];}
export interface Ruleset<TState extends FramedState,TInput>{readonly metadata:RulesetMetadata;createInitialState(seed:number):TState;step(state:TState,input:TInput):TState;validate(state:TState):readonly string[];}
export function assertRulesetState<TState extends FramedState,TInput>(ruleset:Ruleset<TState,TInput>,state:TState):void{const errors=ruleset.validate(state);if(errors.length)throw new Error(`Invalid ruleset state: ${errors.join("; ")}`);}
