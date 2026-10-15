import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";
import { createHash } from "node:crypto";
const output="artifacts";
await mkdir(output,{recursive:true});
const browser=await chromium.launch({headless:true});
try{
 const page=await browser.newPage({viewport:{width:1280,height:720},deviceScaleFactor:1});
 const errors=[];page.on("pageerror",error=>errors.push(error.message));
 await page.goto("http://127.0.0.1:4173/",{waitUntil:"networkidle"});
 await page.waitForTimeout(1200);
 const canvas=page.locator("#game canvas");
 await canvas.waitFor({state:"visible",timeout:15000});
 if(await page.locator("vite-error-overlay").count())throw new Error("Vite error overlay detected");
 if(await canvas.count()!==1)throw new Error("Phaser canvas not mounted");
 const arena=await page.screenshot({path:`${output}/forged-fighters-arena.png`});
 await page.keyboard.down("f");await page.waitForTimeout(180);
 const attack=await page.screenshot({path:`${output}/forged-fighters-attack.png`});
 await page.keyboard.up("f");await page.keyboard.press("p");
 await page.waitForTimeout(200);
 const pause=await page.screenshot({path:`${output}/forged-fighters-pause.png`});
 const hashes=[arena,attack,pause].map(data=>createHash("sha256").update(data).digest("hex"));
 if(new Set(hashes).size!==3)throw new Error("Visual states are identical; expected distinct arena, attack and pause screenshots");
 if(errors.length)throw new Error("Browser runtime errors: "+errors.join(" | "));
 console.log("Captured arena, attack, and pause screenshots");
}finally{await browser.close();}
