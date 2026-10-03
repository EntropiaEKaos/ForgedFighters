export interface ComboRules{scaleStepBps:number;minimumScaleBps:number;resetAfterFrames:number;}
export interface ComboState{hits:number;totalDamage:number;lastHitFrame:number;}
export const DEFAULT_COMBO_RULES:ComboRules={scaleStepBps:1000,minimumScaleBps:2000,resetAfterFrames:90};
export const EMPTY_COMBO:ComboState={hits:0,totalDamage:0,lastHitFrame:-1};
export function damageScaleBps(hitsBefore:number,rules:ComboRules=DEFAULT_COMBO_RULES):number{return Math.max(rules.minimumScaleBps,10000-hitsBefore*rules.scaleStepBps);}
export function scaledDamage(baseDamage:number,hitsBefore:number,rules:ComboRules=DEFAULT_COMBO_RULES):number{return Math.max(1,Math.floor(baseDamage*damageScaleBps(hitsBefore,rules)/10000));}
export function addComboHit(combo:ComboState,baseDamage:number,frame:number,rules:ComboRules=DEFAULT_COMBO_RULES):{combo:ComboState;damage:number}{const damage=scaledDamage(baseDamage,combo.hits,rules);return{damage,combo:{hits:combo.hits+1,totalDamage:combo.totalDamage+damage,lastHitFrame:frame}};}
export function resetComboIfExpired(combo:ComboState,frame:number,rules:ComboRules=DEFAULT_COMBO_RULES):ComboState{return combo.hits>0&&frame-combo.lastHitFrame>rules.resetAfterFrames?EMPTY_COMBO:combo;}
