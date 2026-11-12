/* Fictional Mission Control crew records; player scores stay in this tab. */
(()=>{'use strict';
const names=['NOV','ORB','LUX','COM','PIX','JEL','OOD','CAT','BUG','ZZZ'];
const seeds=[100,90,80,70,60,50,40,30,20,10];
const entries={};
function board(id,unit){const el=document.getElementById(id);if(!el)return;const game=id.replace('-leaders','');const players=entries[game]||[];const ranked=[...names.map((initials,i)=>({initials,score:seeds[i],house:true})),...players].sort((x,y)=>y.score-x.score).slice(0,10);el.replaceChildren();for(const e of ranked){const li=document.createElement('li');li.textContent=e.initials+' — '+e.score+' '+unit+(e.house?' · HOUSE':' · YOU');if(!e.house)li.className='arcade-player-score';el.appendChild(li);}}
window.CosmicLeaderboard={render:board,submit(id,score,unit){const game=id.replace('-leaders','');let initials=window.prompt('ENTER YOUR INITIALS (1–3 LETTERS)','YOU');if(initials===null)initials='YOU';initials=initials.toUpperCase().replace(/[^A-Z]/g,'').slice(0,3)||'YOU';(entries[game]??=[]).push({initials,score:Math.max(0,Math.floor(score)),house:false});board(id,unit);}};
})();