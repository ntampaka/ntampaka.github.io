/* OOD Pong: zero dependencies, no telemetry, all simulation happens locally. */
(()=>{'use strict';
const $=id=>document.getElementById(id);
const overlay=$('arcade-overlay'),canvas=$('arcade-canvas');
if(!overlay||!canvas)return;
const ctx=canvas.getContext('2d');if(!ctx)return;
const W=720,H=420,clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
let priorFocus=null;
function open(){priorFocus=document.activeElement;overlay.hidden=false;document.body.style.overflow='hidden';reset();$('arcade-start').focus();}
function close(){overlay.hidden=true;document.body.style.overflow='';state.running=false;state.paused=false;keys.clear();if(priorFocus&&priorFocus.focus)priorFocus.focus();}
window.RigorousArcade={openPong:open};
$('arcade-close').addEventListener('click',close);
overlay.addEventListener('click',e=>{if(e.target===overlay)close();});
const keys=new Set();function recordScore(n){window.CosmicLeaderboard?.submit('pong-leaders',n,'hits');}window.CosmicLeaderboard?.render('pong-leaders','hits');let state={};let raf=0,last=0;
function serve(){state.ball={x:W/2,y:H*.48,vx:(Math.random()>.5?1:-1)*175,vy:210,r:7};state.wait=.8;}
function reset(){state={running:false,paused:false,score:0,lives:3,domain:0,paddle:W/2,ball:null,wait:0,flash:0,flashText:'',over:false,elapsed:0};serve();updateUI();showMessage('READY, SCIENTIST?','Move with ← → or A / D.  You can also drag the paddle.','START GAME');draw();}
function showMessage(title,body,button){const m=$('arcade-message');m.hidden=false;m.querySelector('strong').textContent=title;m.querySelector('span').textContent=body;$('arcade-start').textContent=button;}
function hideMessage(){$('arcade-message').hidden=true;}
function start(){if(state.over)reset();state.running=true;state.paused=false;hideMessage();$('arcade-pause').textContent='PAUSE';last=performance.now();cancelAnimationFrame(raf);raf=requestAnimationFrame(frame);canvas.focus?.();}
$('arcade-start').addEventListener('click',start);
function pause(){if(!state.running)return;state.paused=!state.paused;$('arcade-pause').textContent=state.paused?'RESUME':'PAUSE';if(state.paused)showMessage('PAUSED','The Universe will wait.','RESUME');else{hideMessage();last=performance.now();raf=requestAnimationFrame(frame);}}
$('arcade-pause').addEventListener('click',()=>{if(state.running)pause();else if(!state.over)start();});
function updateUI(){$('arcade-score').textContent=String(state.score).padStart(2,'0');$('arcade-lives').textContent='●'.repeat(state.lives)+'○'.repeat(3-state.lives);$('arcade-domain').textContent=['TRAINING','COVARIATE SHIFT','NEW PHYSICS','OUT OF DISTRIBUTION'][state.domain];}
function domainForScore(score){return score<3?0:score<6?1:score<10?2:3;}
function frame(now){if(!state.running||state.paused||overlay.hidden)return;const dt=Math.min((now-last)/1000,.035);last=now;update(dt);draw();raf=requestAnimationFrame(frame);}
function update(dt){state.elapsed+=dt;if(keys.has('ArrowLeft')||keys.has('a'))state.paddle-=420*dt;if(keys.has('ArrowRight')||keys.has('d'))state.paddle+=420*dt;state.paddle=clamp(state.paddle,51,W-51);if(state.flash>0)state.flash-=dt;if(state.wait>0){state.wait-=dt;return;}const b=state.ball;const oldY=b.y;
// In later domains, constant lateral drift and a gentle periodic force invalidate the player's learned trajectory.
if(state.domain===1)b.vx+=22*dt;
if(state.domain===2)b.vx+=Math.sin(state.elapsed*2.8)*105*dt;
if(state.domain===3)b.vx+=Math.sin(state.elapsed*3.4)*160*dt+18*dt;
b.vx=clamp(b.vx,-440,440);b.x+=b.vx*dt;b.y+=b.vy*dt;
if(b.x<b.r){b.x=b.r;b.vx=Math.abs(b.vx);}if(b.x>W-b.r){b.x=W-b.r;b.vx=-Math.abs(b.vx);}if(b.y<b.r){b.y=b.r;b.vy=Math.abs(b.vy);}
const paddleY=H-40,paddleW=96;
if(b.vy>0&&oldY+b.r<=paddleY&&b.y+b.r>=paddleY&&Math.abs(b.x-state.paddle)<=paddleW/2+b.r){b.y=paddleY-b.r;b.vy=-Math.min(390,Math.abs(b.vy)*1.045+5);b.vx=clamp(b.vx*.58+((b.x-state.paddle)/(paddleW/2))*215,-360,360);state.score++;const next=domainForScore(state.score);if(next!==state.domain){state.domain=next;state.flash=2.2;state.flashText=['','COVARIATE SHIFT DETECTED','NEW PHYSICS DETECTED','OOD WARNING'][next];$('arcade-status').textContent='The rules changed.  Can you recalibrate?';}else $('arcade-status').textContent='Nice catch.  Keep adapting.';updateUI();}
if(b.y>H+12){state.lives--;updateUI();if(state.lives<=0){state.running=false;state.over=true;recordScore(state.score);showMessage('MODEL FAILURE',`You survived ${state.score} hits.  The data had other plans.`,'RETRAIN & RETRY');$('arcade-status').textContent='No model survives every distribution shift.';}else{serve();$('arcade-status').textContent='An observation slipped through.  Try again.';}}}
function drawDomainCue(){if(state.domain===0)return;
const sign=state.domain===1?1:Math.sin(state.elapsed*(state.domain===2?2.8:3.4));
ctx.save();ctx.fillStyle=state.domain===1?'rgba(107,129,116,.11)':'rgba(107,129,116,.11)';ctx.fillRect(0,0,W,H);
ctx.strokeStyle='#6B8174';ctx.fillStyle='#F6F4EE';ctx.lineWidth=2;
for(let i=0;i<5;i++){let x=105+i*130,y=65+(i%2)*26;ctx.beginPath();ctx.moveTo(x,y);ctx.lineTo(x+sign*34,y);ctx.stroke();ctx.beginPath();ctx.moveTo(x+sign*34,y);ctx.lineTo(x+sign*25,y-6);ctx.lineTo(x+sign*25,y+6);ctx.closePath();ctx.fill();}
ctx.font='bold 14px monospace';ctx.fillText(state.domain===1?'LATERAL DRIFT →':state.domain===2?'OSCILLATING FORCE ↔':'UNSTABLE FORCE ↔',18,48);
ctx.restore();}
function draw(){ctx.clearRect(0,0,W,H);ctx.fillStyle='#203342';ctx.fillRect(0,0,W,H);ctx.strokeStyle='rgba(246,244,238,.10)';ctx.lineWidth=1;for(let x=40;x<W;x+=40){ctx.beginPath();ctx.moveTo(x,0);ctx.lineTo(x,H);ctx.stroke();}for(let y=20;y<H;y+=40){ctx.beginPath();ctx.moveTo(0,y);ctx.lineTo(W,y);ctx.stroke();}
ctx.setLineDash([7,10]);ctx.strokeStyle='rgba(246,244,238,.26)';ctx.beginPath();ctx.moveTo(0,H/2);ctx.lineTo(W,H/2);ctx.stroke();ctx.setLineDash([]);
ctx.fillStyle='#F6F4EE';ctx.font='12px monospace';ctx.fillText('OBSERVATIONAL DOMAIN / '+['I','II','III','IV'][state.domain],18,24);
drawDomainCue();ctx.fillStyle='#6B8174';ctx.fillRect(state.paddle-48,H-40,96,9);ctx.fillStyle='#F6F4EE';const b=state.ball;ctx.beginPath();ctx.arc(b.x,b.y,b.r,0,Math.PI*2);ctx.fill();
ctx.strokeStyle='rgba(246,244,238,.32)';ctx.beginPath();ctx.moveTo(b.x-b.vx*.09,b.y-b.vy*.09);ctx.lineTo(b.x,b.y);ctx.stroke();
if(state.flash>0){ctx.fillStyle='#F6F4EE';ctx.textAlign='center';ctx.font='bold 22px monospace';ctx.fillText(state.flashText,W/2,90);ctx.textAlign='left';}}
function handleKey(e,down){if(overlay.hidden)return;if(e.target.closest('button,input,select,a')&&e.key!=='Escape')return;if(['ArrowLeft','ArrowRight',' ','Escape','a','d','A','D'].includes(e.key))e.preventDefault();if(e.key==='Escape'&&down){close();return;}if((e.key===' '||e.key==='Enter')&&down){if(!state.running)start();else pause();return;}const k=e.key.toLowerCase();if(down)keys.add(e.key.startsWith('Arrow')?e.key:k);else{keys.delete(e.key);keys.delete(k);}}
document.addEventListener('keydown',e=>handleKey(e,true));document.addEventListener('keyup',e=>handleKey(e,false));
function paddleFromPointer(e){const r=canvas.getBoundingClientRect();state.paddle=clamp((e.clientX-r.left)/r.width*W,51,W-51);if(!state.running&&!state.over)draw();}
canvas.addEventListener('pointermove',paddleFromPointer);canvas.addEventListener('pointerdown',paddleFromPointer);
for(const [id,key] of [['arcade-left','ArrowLeft'],['arcade-right','ArrowRight']]){const b=$(id);b.addEventListener('pointerdown',e=>{e.preventDefault();keys.add(key);b.setPointerCapture(e.pointerId);});for(const ev of ['pointerup','pointercancel','lostpointercapture'])b.addEventListener(ev,()=>keys.delete(key));}
document.addEventListener('visibilitychange',()=>{if(document.hidden&&state.running&&!state.paused)pause();});
})();
