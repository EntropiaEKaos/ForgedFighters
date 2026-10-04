import type{PlayerId}from"@forged-fighter/core";
export interface ProjectileState{id:number;owner:PlayerId;x:number;y:number;vx:number;vy:number;lifetime:number;damage:number;hitstun:number;hitstop:number;width:number;height:number;}
export interface ProjectileSpawn{owner:PlayerId;x:number;y:number;vx:number;vy?:number;lifetime:number;damage:number;hitstun:number;hitstop:number;width:number;height:number;}
export function spawnProjectile(nextId:number,spawn:ProjectileSpawn):readonly[ProjectileState,number]{return[{id:nextId,owner:spawn.owner,x:spawn.x,y:spawn.y,vx:spawn.vx,vy:spawn.vy??0,lifetime:Math.max(0,spawn.lifetime),damage:Math.max(0,spawn.damage),hitstun:Math.max(0,spawn.hitstun),hitstop:Math.max(0,spawn.hitstop),width:Math.max(0,spawn.width),height:Math.max(0,spawn.height)},nextId+1];}
export function tickProjectile(p:ProjectileState):ProjectileState|undefined{return p.lifetime<=1?undefined:{...p,x:p.x+p.vx,y:p.y+p.vy,lifetime:p.lifetime-1};}
export function tickProjectiles(projectiles:readonly ProjectileState[]):readonly ProjectileState[]{return projectiles.map(tickProjectile).filter((p):p is ProjectileState=>p!==undefined);}
