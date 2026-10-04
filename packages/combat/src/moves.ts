import type { AttackFrameData } from "./frame-data.js";
import type { Box } from "./boxes.js";
export interface MoveDefinition extends AttackFrameData { hitbox:Box; hurtbox:Box; }
export const STANDING_LIGHT:MoveDefinition={id:"standing-light",startup:3,active:2,recovery:7,damage:500,hitstun:10,blockstun:7,hitstop:5,hitbox:{x:28,y:18,width:52,height:34},hurtbox:{x:-28,y:0,width:56,height:112}};

export const STANDING_HEAVY_LAUNCHER:MoveDefinition={id:"standing-heavy-launcher",startup:6,active:3,recovery:16,damage:800,hitstun:24,blockstun:11,hitstop:7,landingKnockdownFrames:18,hitbox:{x:30,y:22,width:68,height:72},hurtbox:{x:-30,y:0,width:60,height:112}};
export const AIR_JUGGLE_LIGHT:MoveDefinition={id:"air-juggle-light",startup:3,active:3,recovery:8,damage:350,hitstun:16,blockstun:6,hitstop:4,landingKnockdownFrames:12,hitbox:{x:24,y:-4,width:58,height:58},hurtbox:{x:-26,y:-12,width:52,height:104}};

export const BOUNCE_LAUNCHER:MoveDefinition={id:"bounce-launcher",startup:8,active:3,recovery:18,damage:900,hitstun:26,blockstun:12,hitstop:8,landingKnockdownFrames:20,bounce:{wall:true,ground:true},hitbox:{x:32,y:20,width:72,height:76},hurtbox:{x:-30,y:0,width:60,height:112}};

export const JUGGLE_LIGHT:MoveDefinition={id:"juggle-light",startup:2,active:3,recovery:8,damage:350,hitstun:14,blockstun:0,hitstop:4,hitbox:{x:30,y:40,width:76,height:96},hurtbox:{x:-28,y:0,width:56,height:112}};
