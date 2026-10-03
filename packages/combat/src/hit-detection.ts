import {intersects,type WorldBox} from "./boxes.js";
export interface HitResult { attacker:0|1; defender:0|1; }
export function detectHit(hitbox:WorldBox,hurtboxes:readonly WorldBox[]):HitResult|undefined{
 const hurt=hurtboxes.find(h=>h.owner!==hitbox.owner&&intersects(hitbox,h));
 return hurt?{attacker:hitbox.owner,defender:hurt.owner}:undefined;
}
