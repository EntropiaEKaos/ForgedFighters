import type{FighterState}from"@forged-fighter/core";import{resolveProjectileContacts,tickProjectiles,type ProjectileState}from"./projectiles.js";
export interface ProjectileLifecycleResolution{projectiles:readonly ProjectileState[];fighters:readonly[FighterState,FighterState];}
export function resolveProjectileLifecycle(projectiles:readonly ProjectileState[],fighters:readonly[FighterState,FighterState]):ProjectileLifecycleResolution{return resolveProjectileContacts(tickProjectiles(projectiles),fighters);}
