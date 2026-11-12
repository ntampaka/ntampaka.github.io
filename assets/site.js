/* Local progressive enhancement. No analytics or external requests. */
(()=>{'use strict';
 document.documentElement.classList.add('js');
 const toggle=document.querySelector('.menu-toggle'),nav=document.querySelector('#primary-nav');
 if(toggle&&nav){toggle.addEventListener('click',()=>{const open=toggle.getAttribute('aria-expanded')!=='true';toggle.setAttribute('aria-expanded',String(open));nav.classList.toggle('open',open);toggle.querySelector('span').textContent=open?'\u2212':'+';});document.addEventListener('keydown',e=>{if(e.key==='Escape'&&nav.classList.contains('open')){nav.classList.remove('open');toggle.setAttribute('aria-expanded','false');toggle.querySelector('span').textContent='+';toggle.focus();}});}
 const filter=document.querySelector('#publication-filter');
 if(filter){const rows=[...document.querySelectorAll('.publication')];const clean=t=>t.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'');filter.addEventListener('input',()=>{const query=clean(filter.value.trim());let n=0;rows.forEach(row=>{row.hidden=!clean(row.textContent).includes(query);if(!row.hidden)n++;});document.querySelector('#publication-count').textContent=n+' of '+rows.length+' selected papers';document.querySelector('.no-papers').hidden=n>0;});}
 // Existing game dialogs retain their gameplay, but trap keyboard focus while open.
 document.addEventListener('keydown',e=>{const overlay=document.querySelector('.arcade-overlay:not([hidden])');if(!overlay||e.key!=='Tab')return;const items=[...overlay.querySelectorAll('button,a[href],input,select,canvas[tabindex],[tabindex="0"]')].filter(x=>!x.disabled&&x.getClientRects().length);if(!items.length)return;const first=items[0],last=items[items.length-1];if(e.shiftKey&&(document.activeElement===first||!overlay.contains(document.activeElement))){e.preventDefault();last.focus();}else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus();}},true);
 const main=document.querySelector('main'),head=document.querySelector('.site-header'),foot=document.querySelector('.site-footer');
 function updateModal(){const open=!!document.querySelector('.arcade-overlay:not([hidden])');[main,head,foot].forEach(el=>{if(el)el.inert=open;});}
 document.querySelectorAll('.arcade-overlay').forEach(el=>new MutationObserver(updateModal).observe(el,{attributes:true,attributeFilter:['hidden']}));
})();

/* Accessible field-guide tooltips and hidden career trail. */
(()=>{'use strict';
 document.querySelectorAll('.hover-plate .plate-info').forEach(b=>b.addEventListener('click',()=>b.closest('.hover-plate').classList.toggle('is-tip-open')));
 // EDIT HERE: Career timeline milestones (year and caption).
 // These are the hover previews and the expanded whole-story entries.
 const items = [
  ["2004", "Began teaching physics and science"],
  ["2012", "M. Hildred Blewett Fellowship, American Physical Society"],
  ["2016", "McWilliams Presidential Fellowship, Carnegie Mellon University"],
  ["2017", "Physics PhD, Carnegie Mellon University"],
  ["2017", "Harvard Data Science Fellow"],
  ["2020", "STScI Data Scientist"],
  ["2022", "STScI Deputy Head of the Data Science Mission Office"],
  ["2022", "NASA Astrophysics Theory Program award (PI)"],
  ["2023", "NSF Astronomy and Astrophysics research grant (PI)"],
  ["2026", "STScI Acting Mission Head of the Data Science Mission Office"],
  ["2026", "Tenure awarded, STScI"]
];
 const trail=document.getElementById('paw-trail'),toggle=document.getElementById('timeline-toggle'),live=document.getElementById('timeline-live');
 if(trail&&toggle){items.forEach(([year,event],i)=>{const li=document.createElement('li');li.innerHTML='<span class="pawprint" role="img" tabindex="0" aria-label="'+year+': '+event+'" style="--paw-rotation:'+([-8,6,-4,9,-6,4,-3,7,0][i%9])+'deg"><svg viewBox="0 0 32 32" aria-hidden="true" fill="#203342"><ellipse cx="16" cy="20.5" rx="8" ry="6.4"/><ellipse cx="7.1" cy="12.8" rx="2.8" ry="3.6" transform="rotate(-25 7.1 12.8)"/><ellipse cx="12.7" cy="8.2" rx="2.8" ry="3.5"/><ellipse cx="19.3" cy="8.4" rx="2.8" ry="3.5"/><ellipse cx="25.2" cy="13.5" rx="2.8" ry="3.5" transform="rotate(25 25.2 13.5)"/></svg></span><span class="paw-year">'+year+'</span><span class="paw-event">'+event+'</span>';trail.appendChild(li);});toggle.addEventListener('click',()=>{const on=!trail.classList.contains('expanded');trail.classList.toggle('expanded',on);toggle.textContent=on?'Hide the story':'Show the whole story';toggle.setAttribute('aria-expanded',String(on));if(live)live.textContent='';});}
 const oracle=document.getElementById('oracle-close');if(oracle){oracle.addEventListener('click',()=>{const r=document.getElementById('oracle-receipt');r.hidden=true;r.classList.remove('oracle-print');document.getElementById('oracle-trigger').focus();});}
})();
