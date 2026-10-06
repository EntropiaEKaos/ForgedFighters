import type{FighterState}from"@forged-fighter/core";import{spawnBasicProjectile,type ProjectileState}from"./projectiles.js";
export interface ProjectileSpawnResolution{projectiles:readonly ProjectileState[];nextProjectileId:number;commandHeld:readonly[boolean,boolean];}
export function resolveProjectileSpawns(projectiles:readonly ProjectileState[],nextProjectileId:number,fighters:readonly[FighterState,FighterState],commands:readonly[boolean,boolean],previousHeld:readonly[boolean,boolean]):ProjectileSpawnResolution{
 const next=[...projectiles];let id=nextProjectileId;
 for(const player of[0,1]as const){if(commands[player]&&!previousHeld[player]&&fighters[player].mode==="idle"){const[p,n]=spawnBasicProjectile(id,fighters[player]);next.push(p);id=n;}}
 return{projectiles:next,nextProjectileId:id,commandHeld:commands};
}
