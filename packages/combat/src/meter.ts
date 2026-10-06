import type{FighterState}from"@forged-fighter/core";
export const MAX_METER=3000 as const;
export const LIGHT_HIT_METER_GAIN=100 as const;
export const SUPER_METER_COST=1000 as const;
export function gainMeter(f:FighterState,amount:number):FighterState{return{...f,meter:Math.min(MAX_METER,Math.max(0,f.meter+Math.max(0,amount)))};}
export function canSpendMeter(f:FighterState,cost:number):boolean{return cost>=0&&f.meter>=cost;}
export function spendMeter(f:FighterState,cost:number):FighterState{return canSpendMeter(f,cost)?{...f,meter:f.meter-cost}:f;}
