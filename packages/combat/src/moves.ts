import type { AttackFrameData } from "./frame-data.js";
import type { Box } from "./boxes.js";
export interface MoveDefinition extends AttackFrameData { hitbox:Box; hurtbox:Box; }
export const STANDING_LIGHT:MoveDefinition={id:"standing-light",startup:3,active:2,recovery:7,damage:500,hitstun:10,blockstun:7,hitstop:5,hitbox:{x:28,y:18,width:52,height:34},hurtbox:{x:-28,y:0,width:56,height:112}};
