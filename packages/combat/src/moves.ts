import type { AttackFrameData } from "./frame-data.js";
import type { Box } from "./boxes.js";
export interface MoveDefinition extends AttackFrameData { hitbox:Box; hurtbox:Box; }
export const STANDING_LIGHT:MoveDefinition={id:"standing-light",startup:3,active:2,recovery:7,damage:500,hitstun:10,blockstun:7,hitstop:5,hitbox:{x:28,y:18,width:52,height:34},hurtbox:{x:-28,y:0,width:56,height:112}};

export const STANDING_HEAVY_LAUNCHER:MoveDefinition={id:"standing-heavy-launcher",startup:6,active:3,recovery:16,damage:800,hitstun:24,blockstun:11,hitstop:7,hitbox:{x:30,y:22,width:68,height:72},hurtbox:{x:-30,y:0,width:60,height:112}};
