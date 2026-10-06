import { describe,expect,it } from "vitest";
import { createInitialState,stepMatch } from "./simulation.js";
import type { FighterInput } from "./types.js";

const n: FighterInput={left:false,right:false,up:false,down:false,light:false,medium:false,heavy:false,special:false,throw:false};

describe("fighter movement state machine",()=>{
  it("walks and returns to idle",()=>{
    let s=createInitialState();
    s=stepMatch(s,[{...n,right:true},n]);
    expect(s.fighters[0].mode).toBe("walk");
    expect(s.fighters[0].x).toBe(-108);
    s=stepMatch(s,[n,n]);
    expect(s.fighters[0].mode).toBe("idle");
  });

  it("jumps, falls and lands deterministically",()=>{
    let s=createInitialState();
    s=stepMatch(s,[{...n,up:true},n]);
    expect(s.fighters[0].grounded).toBe(false);
    expect(s.fighters[0].mode).toBe("jump");
    for(let i=0;i<60 && !s.fighters[0].grounded;i+=1) s=stepMatch(s,[n,n]);
    expect(s.fighters[0].grounded).toBe(true);
    expect(s.fighters[0].y).toBe(0);
    expect(s.fighters[0].mode).toBe("idle");
  });

  it("crouches without horizontal movement",()=>{
    let s=createInitialState();
    s=stepMatch(s,[{...n,down:true,right:true},n]);
    expect(s.fighters[0].mode).toBe("crouch");
    expect(s.fighters[0].x).toBe(-120);
  });
});
