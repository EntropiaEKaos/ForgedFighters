import Phaser from "phaser";
import {createInitialState,TICK_MS,type FighterInput,type FighterState} from "@forged-fighter/core";
import {stepCombatMatch} from "@forged-fighter/combat";
const neutral=():FighterInput=>({left:false,right:false,up:false,down:false,light:false,medium:false,heavy:false,special:false,throw:false});
const WIDTH=1280,HEIGHT=720,FLOOR=580;
class FightScene extends Phaser.Scene{
 state=createInitialState(20261003); keys!:Record<string,Phaser.Input.Keyboard.Key>;fighters!:Phaser.GameObjects.Container[];
 bars!:Phaser.GameObjects.Rectangle[];meterBars!:Phaser.GameObjects.Rectangle[];statuses!:Phaser.GameObjects.Text[];timer!:Phaser.GameObjects.Text;effects!:Phaser.GameObjects.Graphics;
 accumulator=0;lastHealth=[10000,10000];lastContacts=["",""];roundSeconds=99;roundOver=false;paused=false;pauseText!:Phaser.GameObjects.Text;resultText!:Phaser.GameObjects.Text;hitFlashes!:Phaser.GameObjects.Circle[];limbs!:Array<{arm:Phaser.GameObjects.Rectangle;legs:Phaser.GameObjects.Rectangle;head:Phaser.GameObjects.Arc}>;
 create(){
  this.cameras.main.setBackgroundColor("#101523");
  const g=this.add.graphics();
  g.fillGradientStyle(0x202b47,0x202b47,0x11182a,0x11182a).fillRect(0,0,WIDTH,HEIGHT);
  for(let i=0;i<9;i++){g.lineStyle(2,0x455c83,0.16);g.lineBetween(0,210+i*42,WIDTH,210+i*42);}
  g.fillStyle(0x26324a).fillRect(0,FLOOR,WIDTH,HEIGHT-FLOOR);
  g.fillStyle(0x5a7194,0.5).fillRect(0,FLOOR,WIDTH,4);
  for(let i=0;i<20;i++){g.fillStyle(i%2?0x1d273b:0x222e43,0.8).fillRect(i*64,FLOOR+6,62,120);}
  this.add.text(WIDTH/2,24,"FORGED FIGHTERS",{fontFamily:"Arial",fontSize:"27px",fontStyle:"bold",color:"#f5d99b"}).setOrigin(0.5);
  this.add.text(36,29,"PLAYER 1",{fontFamily:"Arial",fontSize:"16px",color:"#8bd7ff"});
  this.add.text(WIDTH-36,29,"PLAYER 2",{fontFamily:"Arial",fontSize:"16px",color:"#ff9da9"}).setOrigin(1,0);
  this.add.rectangle(36,78,490,27,0x080c17).setOrigin(0,0.5);
  this.add.rectangle(WIDTH-36,78,490,27,0x080c17).setOrigin(1,0.5);
  this.bars=[this.add.rectangle(36,78,486,19,0x48b9ed).setOrigin(0,0.5),this.add.rectangle(WIDTH-36,78,486,19,0xff6178).setOrigin(1,0.5)];
  this.meterBars=[this.add.rectangle(36,115,0,9,0xf7d477).setOrigin(0,0.5),this.add.rectangle(WIDTH-36,115,0,9,0xf7d477).setOrigin(1,0.5)];
  this.timer=this.add.text(WIDTH/2,70,"99",{fontFamily:"Arial",fontSize:"35px",fontStyle:"bold",color:"#ffffff"}).setOrigin(0.5);this.resultText=this.add.text(WIDTH/2,260,"",{fontFamily:"Arial",fontSize:"42px",fontStyle:"bold",color:"#f7d477",align:"center",stroke:"#101523",strokeThickness:8}).setOrigin(0.5).setDepth(20);
  this.pauseText=this.add.text(WIDTH/2,200,"PAUSED · PRESS P TO RESUME",{fontFamily:"Arial",fontSize:"30px",fontStyle:"bold",color:"#f7d477",stroke:"#101523",strokeThickness:6}).setOrigin(0.5).setDepth(20).setVisible(false);
  this.statuses=[this.add.text(36,134,"READY",{fontFamily:"monospace",fontSize:"15px",color:"#b6dfff"}),this.add.text(WIDTH-36,134,"READY",{fontFamily:"monospace",fontSize:"15px",color:"#ffc1c9"}).setOrigin(1,0)];
  this.limbs=[];this.fighters=[this.makeFighter(0x48b9ed,0x163a60),this.makeFighter(0xff6178,0x6b2238)];
  this.effects=this.add.graphics().setDepth(10);this.hitFlashes=[this.add.circle(0,0,40,0xffffff,0).setDepth(12),this.add.circle(0,0,40,0xffffff,0).setDepth(12)];
  this.add.text(WIDTH/2,HEIGHT-51,"P PAUSE  ·  R RESTART",{fontFamily:"monospace",fontSize:"15px",color:"#f7d477"}).setOrigin(0.5);
  this.add.text(WIDTH/2,HEIGHT-28,"P1  A/D MOVE  W JUMP  S CROUCH  F LIGHT  G HEAVY  H SPECIAL  J THROW     |     P2  ARROWS  1 LIGHT  2 HEAVY  3 SPECIAL  0 THROW",{fontFamily:"monospace",fontSize:"13px",color:"#d0d8e6"}).setOrigin(0.5);
  this.keys=this.input.keyboard!.addKeys("A,D,W,S,F,G,H,J,R,P,LEFT,RIGHT,UP,DOWN,ONE,TWO,THREE,ZERO") as Record<string,Phaser.Input.Keyboard.Key>;
 }
 makeFighter(primary:number,dark:number){
  const c=this.add.container(0,0);
  const shadow=this.add.ellipse(0,0,100,19,0x000000,0.35);
  const legs=this.add.rectangle(0,-41,48,82,dark).setStrokeStyle(3,primary);
  const torso=this.add.rectangle(0,-124,76,90,primary).setStrokeStyle(3,0xffffff,0.25);
  const head=this.add.circle(0,-192,31,0xe5bd9e).setStrokeStyle(4,dark);
  const arm=this.add.rectangle(49,-116,23,80,dark).setStrokeStyle(3,primary);
  c.add([shadow,legs,torso,head,arm]);c.setDepth(5);this.limbs.push({arm,legs,head});return c;
 }
 readInputs():readonly[FighterInput,FighterInput]{
  const a=neutral(),b=neutral(),k=this.keys;
  a.left=k.A.isDown;a.right=k.D.isDown;a.up=k.W.isDown;a.down=k.S.isDown;a.light=k.F.isDown;a.heavy=k.G.isDown;a.special=k.H.isDown;a.throw=k.J.isDown;
  b.left=k.LEFT.isDown;b.right=k.RIGHT.isDown;b.up=k.UP.isDown;b.down=k.DOWN.isDown;b.light=k.ONE.isDown;b.heavy=k.TWO.isDown;b.special=k.THREE.isDown;b.throw=k.ZERO.isDown;
  return[a,b];
 }
 update(_time:number,delta:number){
  if(Phaser.Input.Keyboard.JustDown(this.keys.P)){this.paused=!this.paused;this.pauseText.setVisible(this.paused);this.accumulator=0;}\n  if(Phaser.Input.Keyboard.JustDown(this.keys.R)){this.state=createInitialState(20261003);this.accumulator=0;this.roundOver=false;this.paused=false;this.pauseText.setVisible(false);this.resultText.setText("");this.lastHealth=[10000,10000];this.tweens.killTweensOf(this.hitFlashes);for(const flash of this.hitFlashes)flash.setAlpha(0);}\n  if(this.paused)return;
  this.accumulator=Math.min(this.accumulator+delta,250);
  let ticks=0;while(this.accumulator>=TICK_MS&&ticks<8){if(!this.roundOver)this.state=stepCombatMatch(this.state,this.readInputs());this.accumulator-=TICK_MS;ticks++;}
  const fighters=this.state.fighters;
  fighters.forEach((f:FighterState,i:number)=>{
   this.fighters[i].setPosition(WIDTH/2+f.x,FLOOR-f.y).setScale(f.facing===1?1:-1,1);
   const limb=this.limbs[i];const motion=this.state.frame*0.16+i;const walking=f.mode==="walk";limb.legs.setAngle(walking?Math.sin(motion)*13:0);limb.arm.setAngle(f.mode==="attack"?-65:walking?Math.sin(motion+Math.PI)*14:0);limb.arm.x=f.mode==="attack"?75:49;limb.head.y=-192+(walking?Math.sin(motion*2)*3:0);
   this.fighters[i].setAlpha(f.hitstopFrames>0?0.78:1);const pose=f.mode==="attack"?1.08:f.mode==="crouch"?0.72:f.mode==="knockdown"?0.42:1;this.fighters[i].setScale((f.facing===1?1:-1)*(f.mode==="attack"?1.08:1),pose);this.fighters[i].setAngle(f.mode==="knockdown"?(i===0?-55:55):0);
   this.bars[i].width=486*Math.max(0,Math.min(1,f.health/10000));
   this.meterBars[i].width=486*Math.max(0,Math.min(1,f.meter/1000));
   this.statuses[i].setText(f.mode.toUpperCase()+(f.attack?" · "+f.attack.moveId.toUpperCase():""));
   if(f.health<this.lastHealth[i]){this.cameras.main.shake(75,0.003);const flash=this.hitFlashes[i];flash.setPosition(WIDTH/2+f.x,FLOOR-f.y-110).setAlpha(0.95).setScale(0.5);this.tweens.killTweensOf(flash);this.tweens.add({targets:flash,alpha:0,scale:2.2,duration:180,ease:"Cubic.Out"});}
   this.lastHealth[i]=f.health;
  });
  this.effects.clear();
  const remaining=Math.max(0,99-Math.floor(this.state.frame/60));this.timer.setText(String(remaining));if(!this.roundOver&&(remaining===0||fighters.some(f=>f.health<=0))){this.roundOver=true;const [a,b]=fighters;const winner=a.health===b.health?"DRAW":a.health>b.health?"PLAYER 1 WINS":"PLAYER 2 WINS";this.resultText.setText(winner+"\nPRESS R TO REMATCH");}
 }
}
new Phaser.Game({type:Phaser.AUTO,width:WIDTH,height:HEIGHT,parent:"game",scene:FightScene,backgroundColor:"#101523",scale:{mode:Phaser.Scale.FIT,autoCenter:Phaser.Scale.CENTER_BOTH},physics:{default:""}});
