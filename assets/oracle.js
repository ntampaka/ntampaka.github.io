(()=>{'use strict';
// EDIT HERE: Cosmic Oracle fortunes.  Add or revise one quoted sentence per line.
// Double-space after sentence-ending periods, as in the rest of the site.
const fortunes = [
  "The Universe is under no obligation to converge.",
  "You are made of star stuff.",
  "The Universe is mostly empty space.  Make room for possibilities.",
  "A surprising result is an invitation, not an inconvenience.",
  "The data are trying to tell you something.  Unfortunately, they're terrible communicators.",
  "Curiosity is a renewable resource.",
  "Progress is not always monotonic.",
  "Even brilliant ideas require debugging.",
  "Small discoveries are still discoveries.",
  "A detour is not necessarily a mistake.",
  "The best scientists change their minds.",
  "The model is confident.  This is not reassuring.",
  "Domain shift is the Universe's way of saying, \"Surprise!\"",
  "Trust your intuition.  Then test it.",
  "An old idea deserves a new experiment.",
  "Something you dismissed as noise deserves another look.",
  "The cat knows something.",
  "The Universe is experiencing technical difficulties.  Please remain curious.",
  "Here we go, Steelers!",
  "Need some third-quarter inspiration? Play Renegade.",
  "Have you tried putting the fries and coleslaw on the sandwich?",
  "Follow your curiosity.  Knock something off a shelf.",
  "You cannot control the Universe.  You cannot even control the cat."
];
const galaxy=document.getElementById('oracle-trigger'), receipt=document.getElementById('oracle-receipt'),words=document.getElementById('oracle-words');
const close=document.getElementById('oracle-close');if(close&&receipt)close.addEventListener('click',()=>{receipt.hidden=true;receipt.classList.remove('oracle-print');galaxy?.focus();});
// Fortune text is rendered safely; the Pittsburgh sandwich has one italic word.
function renderFortune(entry){
 if(!words)return;
 words.replaceChildren();
 if(entry==='Have you tried putting the fries and coleslaw on the sandwich?'){
  words.append(document.createTextNode('Have you tried putting the fries and coleslaw '));
  const italic=document.createElement('em');italic.textContent='on';words.append(italic);
  words.append(document.createTextNode(' the sandwich?'));
 } else words.textContent=entry;
}

const reduce=window.matchMedia('(prefers-reduced-motion: reduce)');let oracleBusy=false,last=-1;
if(galaxy&&receipt){galaxy.addEventListener('click',()=>{if(oracleBusy)return;oracleBusy=true;galaxy.classList.remove('oracle-spin');receipt.hidden=true;receipt.classList.remove('oracle-print');void galaxy.offsetWidth;galaxy.classList.add('oracle-spin');const choice=last<0?Math.floor(Math.random()*fortunes.length):(last+1+Math.floor(Math.random()*(fortunes.length-1)))%fortunes.length;last=choice;setTimeout(()=>{renderFortune(fortunes[choice]);receipt.hidden=false;receipt.classList.add('oracle-print');},reduce.matches?0:1500);setTimeout(()=>{oracleBusy=false;galaxy.classList.remove('oracle-spin');},reduce.matches?10:2700);});}
})();
