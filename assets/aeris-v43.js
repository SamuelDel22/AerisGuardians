/* AERIS V43 — FINAL PREMIUM MISSION SYSTEM */
(function(){
  'use strict';
  const $=id=>document.getElementById(id);
  const qs=(s,r=document)=>[...r.querySelectorAll(s)];
  const reduce=window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const BADGES={
    explorer:'assets/guardian-badges/aeris_badge_explorer.png',
    scientist:'assets/guardian-badges/aeris_badge_evidence-scout.png',
    guardian:'assets/guardian-badges/aeris_badge_river-guardian.png',
    champion:'assets/guardian-badges/aeris_badge_mission-champion.png',
    emblem:'assets/guardian/cauca-guardian-emblem.png',
    water:'assets/relics/water-core.png',
    seed:'assets/relics/life-seed.png'
  };
  const routeMeta={
    en:[
      {id:'territory',label:'Territory',sub:'Discover the river',target:'story',icon:BADGES.explorer,desc:'Start with the river, its ecosystems and the communities connected to it.'},
      {id:'mercury',label:'Mercury',sub:'Trace the pathway',target:'lab',icon:BADGES.water,desc:'Follow the environmental pathway from mining activity to water, food webs and fish.'},
      {id:'evidence',label:'Evidence',sub:'Verify the facts',target:'evidence',icon:BADGES.scientist,desc:'Check scientific and official evidence before turning a claim into a conclusion.'},
      {id:'challenge',label:'Challenge',sub:'Test your knowledge',target:'game',icon:BADGES.guardian,desc:'Use what you learned, answer the mission and earn Guardian Energy.'},
      {id:'legacy',label:'Legacy',sub:'Choose your next move',target:'passport',icon:BADGES.champion,desc:'Your score and choices become a Guardian profile and a lasting mission legacy.'}
    ],
    es:[
      {id:'territory',label:'Territorio',sub:'Descubre el río',target:'story',icon:BADGES.explorer,desc:'Empieza por el río, sus ecosistemas y las comunidades conectadas a él.'},
      {id:'mercury',label:'Mercurio',sub:'Sigue la ruta',target:'lab',icon:BADGES.water,desc:'Sigue la ruta ambiental desde la minería hasta el agua, la red alimentaria y los peces.'},
      {id:'evidence',label:'Evidencia',sub:'Verifica los datos',target:'evidence',icon:BADGES.scientist,desc:'Comprueba la evidencia científica y oficial antes de convertir una afirmación en conclusión.'},
      {id:'challenge',label:'Desafío',sub:'Pon a prueba lo aprendido',target:'game',icon:BADGES.guardian,desc:'Usa lo aprendido, completa la misión y consigue Energía de Guardián.'},
      {id:'legacy',label:'Legado',sub:'Elige tu siguiente paso',target:'passport',icon:BADGES.champion,desc:'Tu puntaje y tus decisiones forman tu perfil y el legado de tu misión.'}
    ]
  };
  function currentLang(){return window.currentLang==='es'?'es':'en'}
  function core(){return window.AERIS&&window.AERIS.getState?window.AERIS:null}
  function state(){const a=core();return a?a.getState():{best:0,energy:0,relics:0,badges:[],visited:[],missionStage:0,name:'Guardian'}}
  function score(){const p=state();return Math.max(Number(p.best)||0,Number(p.score)||0)}
  function routeUnlocked(id){
    if(id==='legacy')return score()>=7;
    if(id==='challenge')return true;
    return true;
  }
  function routeVisited(id,p){
    const map=id==='legacy'?'action':id;
    return (p.visited||[]).includes(map);
  }
  function routeIndex(id){return routeMeta[currentLang()].findIndex(x=>x.id===id)}
  function visit(id){
    if(!core())return;
    const coreId=id==='legacy'?'action':id;
    try{core().visit(coreId)}catch(e){}
  }
  function scrollTarget(id){
    const meta=routeMeta[currentLang()].find(x=>x.id===id);if(!meta)return;
    const go=()=>{const target=$(meta.target);if(!target)return;target.classList.add('v16-navPulse');target.scrollIntoView({behavior:reduce?'auto':'smooth',block:'start'});setTimeout(()=>target.classList.remove('v16-navPulse'),800)};
    // V40 intentionally exposes one destination at a time. Mission Map navigation
    // therefore switches the destination first, then lands on the exact mission stage.
    if((meta.target==='game'||meta.target==='passport')&&document.body.classList.contains('aeris-single-mode')&&document.body.dataset.aerisMode!=='game'){
      document.querySelector('.aerisTopLink[href="#game"]')?.click();
      setTimeout(go,180);
      return;
    }
    if(meta.target==='guardianAI'&&document.body.classList.contains('aeris-single-mode')&&document.body.dataset.aerisMode!=='chatbot'){
      document.querySelector('.aerisTopLink[href="#guardianAI"]')?.click();
      setTimeout(go,180);
      return;
    }
    go();
  }
  function ensureMap(){
    const map=$('mapNodes');if(!map||map.dataset.v43Ready==='1')return;
    map.dataset.v43Ready='1';
    const wrap=map.parentElement;
    const top=document.createElement('div');top.className='v43-map-topline';top.innerHTML='<div class="v43-map-progress-copy"><i class="v43-map-status-dot"></i><div><strong id="v43MapProgressLabel">MISSION CONTROL</strong><small id="v43MapProgressSub">5 stages · one connected mission</small></div></div><b class="v43-map-percent" id="v43MapPercent">0%</b>';
    const track=document.createElement('div');track.className='v43-map-track';track.innerHTML='<i id="v43MapTrackFill"></i>';
    wrap.insertBefore(top,map);wrap.insertBefore(track,map);
    renderMap();
  }
  function renderMap(){
    const map=$('mapNodes');if(!map)return;ensureMapOnce();
    const lang=currentLang(), data=routeMeta[lang], p=state();
    map.innerHTML=data.map((r,i)=>`<button class="mapNode" data-v43-route="${r.id}" data-map="${i}" type="button" aria-label="${r.label}"><div class="v43-map-icon"><img src="${r.icon}" alt="" aria-hidden="true"></div><span class="v43-map-index">0${i+1}</span><b>${r.label}</b><small>${r.sub}</small><span class="v43-map-state">AVAILABLE</span></button>`).join('');
    const unlocked=data.filter(r=>routeUnlocked(r.id));
    let currentId=null;
    for(const r of data){if(routeUnlocked(r.id)&&!routeVisited(r.id,p)){currentId=r.id;break}}
    const visitedCount=data.filter(r=>routeVisited(r.id,p)).length;
    const percent=Math.round((visitedCount/5)*100);
    const fill=$('v43MapTrackFill');if(fill)fill.style.width=percent+'%';
    const pct=$('v43MapPercent');if(pct)pct.textContent=percent+'%';
    const sub=$('v43MapProgressSub');if(sub)sub.textContent=lang==='es'?`${visitedCount}/5 etapas registradas`:`${visitedCount}/5 stages logged`;
    data.forEach((r,i)=>{
      const b=map.querySelector(`[data-v43-route="${r.id}"]`);if(!b)return;
      const locked=!routeUnlocked(r.id), complete=routeVisited(r.id,p), current=!locked&&r.id===currentId;
      b.classList.toggle('v43-locked',locked);b.classList.toggle('v43-complete',complete);b.classList.toggle('v43-current',current);b.classList.toggle('v43-available',!locked&&!complete&&!current);
      const s=b.querySelector('.v43-map-state');if(s)s.textContent=locked?(lang==='es'?'BLOQUEADO':'LOCKED'):complete?(lang==='es'?'COMPLETADO':'COMPLETED'):current?(lang==='es'?'ACTUAL':'CURRENT'):(lang==='es'?'DISPONIBLE':'AVAILABLE');
      b.setAttribute('aria-disabled',String(locked));
      b.addEventListener('click',()=>{
        if(!routeUnlocked(r.id)){
          if(window.showToast)window.showToast(lang==='es'?'Consigue 7/10 para desbloquear el legado.':'Reach 7/10 to unlock the legacy stage.');
          return;
        }
        visit(r.id);updateMapDetail(r.id);scrollTarget(r.id);play('select');
      });
    });
    updateMapDetail(currentId||data[0].id,true);
  }
  function ensureMapOnce(){
    const map=$('mapNodes');if(!map)return;
    if(!$('v43MapTrackFill')){
      const wrap=map.parentElement;
      const top=document.createElement('div');top.className='v43-map-topline';top.innerHTML='<div class="v43-map-progress-copy"><i class="v43-map-status-dot"></i><div><strong id="v43MapProgressLabel">MISSION CONTROL</strong><small id="v43MapProgressSub">5 stages · one connected mission</small></div></div><b class="v43-map-percent" id="v43MapPercent">0%</b>';
      const track=document.createElement('div');track.className='v43-map-track';track.innerHTML='<i id="v43MapTrackFill"></i>';
      wrap.insertBefore(top,map);wrap.insertBefore(track,map);
    }
  }
  function updateMapDetail(id,quiet){
    const detail=$('mapDetail');if(!detail)return;
    const d=routeMeta[currentLang()].find(x=>x.id===id)||routeMeta[currentLang()][0];
    const p=state();const complete=routeVisited(d.id,p),locked=!routeUnlocked(d.id);
    const status=locked?(currentLang()==='es'?'BLOQUEADO':'LOCKED'):complete?(currentLang()==='es'?'COMPLETADO':'COMPLETED'):(currentLang()==='es'?'DISPONIBLE':'AVAILABLE');
    detail.innerHTML=`<strong>0${routeIndex(d.id)+1} · ${d.label}</strong><p>${d.desc}</p><div class="v43-map-detail-meta"><span>${status}</span><span>${currentLang()==='es'?'NAVEGACIÓN DIRECTA':'DIRECT NAVIGATION'}</span></div>`;
    if(!quiet)detail.classList.add('missionPulse'),setTimeout(()=>detail.classList.remove('missionPulse'),650);
  }
  function bindCore(){
    core()?.on?.(()=>{renderMap();refreshProfile();});
    window.addEventListener('storage',()=>{renderMap();refreshProfile()});
  }
  function refreshProfile(){
    const card=document.querySelector('.guardianCard');if(card)card.classList.add('v43-profile');
    const signal=$('.v43-profile-signal');if(signal){const p=state(),xp=core()?.xp?.()||0;signal.querySelector('b').textContent=`${xp}/100 XP`;signal.querySelector('span').textContent=currentLang()==='es'?'SEÑAL DE MISIÓN ACTIVA':'MISSION SIGNAL ACTIVE'}
    const row=$('badges');if(row&&row.dataset.v43Ready!=='1'){row.dataset.v43Ready='1';}
    if(row){
      const p=state(),set=new Set(p.badges||[]);if(score()>=0)set.add('explorer');if(score()>=5)set.add('scientist');if(score()>=7)set.add('guardian');if(score()>=9)set.add('champion');
      const names=currentLang()==='es'?{explorer:'Explorador',scientist:'Explorador de evidencia',guardian:'Guardián del río',champion:'Campeón de misión'}:{explorer:'Explorer',scientist:'Evidence Scout',guardian:'River Guardian',champion:'Mission Champion'};
      row.innerHTML=['explorer','scientist','guardian','champion'].map(k=>`<span class="badge v43-badge-chip ${set.has(k)?'on':''}"><img src="${BADGES[k]}" alt="" aria-hidden="true"><span>${names[k]}</span></span>`).join('');
    }
  }
  function ensureProfileSignal(){
    const card=document.querySelector('.guardianCard');if(!card||$('v43ProfileSignal'))return;
    const el=document.createElement('div');el.id='v43ProfileSignal';el.className='v43-profile-signal';el.innerHTML='<span>MISSION SIGNAL ACTIVE</span><b>0/100 XP</b>';card.insertBefore(el,card.querySelector('.hqActions'));
  }
  function enhanceLab(){
    const lab=document.querySelector('.labVisual');if(!lab)return;lab.classList.add('v43-lab');
    if(!$('v43LabSignal')){
      const signal=document.createElement('div');signal.id='v43LabSignal';signal.className='v43-lab-signal';signal.innerHTML='<span></span><b>PATHWAY SIGNAL · ACTIVE</b><small>Source → system → food web → fish</small>';
      const meter=lab.querySelector('.labMeter');if(meter)meter.parentNode.insertBefore(signal,meter);else lab.querySelector('.labScene')?.after(signal);
    }
  }
  function enhanceChallenge(){
    const game=document.querySelector('#game .game');if(!game)return;game.classList.add('v43-game');
    if(!$('v43ChallengeMeta')){
      const q=game.querySelector('.question');if(!q)return;
      const meta=document.createElement('div');meta.id='v43ChallengeMeta';meta.className='v43-challengeMeta';meta.innerHTML='<div class="v43-meta-left"><i class="v43-meta-dot"></i><strong>GUARDIAN CHALLENGE · EVIDENCE MODE</strong></div><small>Select → Next → review</small>';
      q.insertBefore(meta,q.firstChild);
      const signal=document.createElement('div');signal.id='v43AnswerSignal';signal.className='v43-answer-signal';signal.textContent=currentLang()==='es'?'Elige una respuesta. La evaluación aparece al pulsar Siguiente.':'Choose an answer. Feedback appears after you press Next.';
      const nav=q.querySelector('.gameNav'); if(nav) q.insertBefore(signal,nav); else q.appendChild(signal);
    }
    const options=$('options');if(options&&!options.dataset.v43Bound){
      options.dataset.v43Bound='1';options.addEventListener('click',()=>{setTimeout(()=>{const selected=options.querySelector('.option.selected');const sig=$('v43AnswerSignal');if(sig){sig.classList.toggle('ready',!!selected);sig.textContent=selected?(currentLang()==='es'?'Respuesta registrada · pulsa Siguiente para comprobarla.':'Answer locked · press Next to check it.'):currentLang()==='es'?'Elige una respuesta. La evaluación aparece al pulsar Siguiente.':'Choose an answer. Feedback appears after you press Next.'}},30)});
    }
    if(!$('v43ChallengeMeta').dataset.bound){
      $('v43ChallengeMeta').dataset.bound='1';
      $('next')?.addEventListener('click',()=>{const sig=$('v43AnswerSignal');if(sig){sig.classList.remove('ready');sig.textContent=currentLang()==='es'?'Evaluando la evidencia…':'Checking the evidence…'}});
    }
  }
  function enhanceResult(){
    const result=$('result');if(!result)return;
    const scoreText=$('finalScore')?.textContent||'0/10';const n=Number(scoreText.split('/')[0])||0;
    const badge=n>=9?BADGES.champion:n>=7?BADGES.guardian:n>=5?BADGES.scientist:BADGES.explorer;
    const title=n>=9?(currentLang()==='es'?'Campeón de misión':'Mission Champion'):n>=7?(currentLang()==='es'?'Guardián del río':'River Guardian'):n>=5?(currentLang()==='es'?'Explorador de evidencia':'Evidence Scout'):(currentLang()==='es'?'Explorador':'Explorer');
    let hero=$('v43ResultHero');
    if(!hero){hero=document.createElement('div');hero.id='v43ResultHero';hero.className='v43-resultHero';const anchor=$('finalText');anchor?.parentNode?.insertBefore(hero,anchor);}
    hero.innerHTML=`<img src="${badge}" alt="${title}"><div><strong>${title}</strong><small>${currentLang()==='es'?'Tu rango evoluciona con evidencia, progreso y acción.':'Your rank evolves through evidence, progress and action.'}</small><div class="v43-resultScore">${n}/10 · ${n>=7?(currentLang()==='es'?'LEGADO DESBLOQUEADO':'LEGACY UNLOCKED'):(currentLang()==='es'?'MISIÓN REGISTRADA':'MISSION LOGGED')}</div></div>`;
    const titleBox=$('title');if(titleBox){titleBox.textContent=title;titleBox.closest('.title')?.setAttribute('data-v43-title','1')}
    if(core()){
      try{core().visit('challenge')}catch(e){}
      if(n>=7){/* legacy becomes available; visit only after the user chooses it */}
    }
  }
  function enhanceAI(){
    const box=document.querySelector('.guardianAIBox');if(!box)return;box.classList.add('v43-ai');
    const status=$('aiStatus');if(status&&!$('v43AiStatus')){
      const s=document.createElement('div');s.id='v43AiStatus';s.className='v43-ai-status';s.innerHTML='<i></i><span>FIELD INTELLIGENCE · OFFLINE FALLBACK READY</span>';status.parentNode.appendChild(s);
    }
  }
  function fillAISuggestions(){
    const box=$('aiSuggestions');if(!box)return;
    const es=currentLang()==='es';
    const data=es?[
      [BADGES.scientist,'¿Qué es el metilmercurio?','¿Qué es el metilmercurio y por qué importa?'],
      [BADGES.water,'Ruta del mercurio','¿Cómo puede el mercurio llegar a los peces?'],
      [BADGES.explorer,'Bajo Cauca','¿Qué municipios forman el Bajo Cauca?'],
      [BADGES.guardian,'Proteger el río','¿Qué se puede hacer para proteger el río Cauca?']
    ]:[
      [BADGES.scientist,'Methylmercury','What is methylmercury and why does it matter?'],
      [BADGES.water,'Mercury pathway','How can mercury reach fish?'],
      [BADGES.explorer,'Bajo Cauca','Which municipalities are in Bajo Cauca?'],
      [BADGES.guardian,'Protect the river','What can be done to protect the Cauca River?']
    ];
    box.innerHTML=data.map((x,i)=>`<button class="aiSuggestion" type="button" data-v43-ai-q="${x[2].replace(/"/g,'&quot;')}"><img src="${x[0]}" alt="" aria-hidden="true"><span>${x[1]}</span></button>`).join('');
    box.querySelectorAll('[data-v43-ai-q]').forEach(b=>b.addEventListener('click',()=>{
      const input=$('aiInput');if(!input)return;input.value=b.dataset.v43AiQ;input.focus();$('aiForm')?.requestSubmit();
    }));
  }
  function aiFooter(){
    const box=document.querySelector('.guardianAIBox');if(!box||$('v43AiFooter'))return;
    const el=document.createElement('div');el.id='v43AiFooter';el.className='v43-ai-footer';el.innerHTML='<b>FIELD INTELLIGENCE</b><span>Project knowledge first · AI API when configured · evidence over invention</span>';box.appendChild(el);
  }
  function enhanceLegacy(){
    const grid=document.querySelector('.legacyGrid');if(grid){grid.classList.add('v43-legacyGrid');
      const data={restore:BADGES.seed,verify:BADGES.scientist,protect:BADGES.guardian};
      grid.querySelectorAll('.legacyBtn').forEach(b=>{const img=data[b.dataset.ending];const span=b.querySelector('span');if(span&&img)span.innerHTML=`<img src="${img}" alt="" aria-hidden="true">`;if(!b.dataset.v43Bound)b.dataset.v43Bound='1'});
    }
    const ending=$('endingIcon');if(ending){ending.classList.add('v43-endingIcon');ending.innerHTML=`<img src="${BADGES.guardian}" alt="Cauca Guardian badge">`}
    const chip=$('endingGuardianName');if(chip)chip.classList.add('v43-nameChip'),chip.textContent=(state().name||'Guardian');
    qs('.legacyBtn').forEach(b=>{if(b.dataset.v43ActionBound==='1')return;b.dataset.v43ActionBound='1';b.addEventListener('click',()=>setTimeout(()=>{const p=b.dataset.ending;const map={restore:'action',verify:'action',protect:'action'};if(map[p]&&core())core().visit(map[p]);refreshProfile();renderMap();},80));});
  }
  function enhanceMoves(){
    const moves=$('moves');if(!moves)return;const icons=[BADGES.explorer,BADGES.seed,BADGES.scientist,BADGES.guardian];moves.querySelectorAll('.card').forEach((c,i)=>{c.classList.add('v43-moveCard');const e=c.querySelector('.emoji');if(e){e.innerHTML=`<img src="${icons[i]||BADGES.guardian}" alt="" aria-hidden="true">`;e.setAttribute('aria-hidden','true')}})}
  function enhanceFooter(){
    const footer=document.querySelector('footer');if(!footer||$('v43FooterStrip'))return;
    const el=document.createElement('div');el.id='v43FooterStrip';el.className='v43-footerStrip';el.innerHTML='<strong>AERIS · CAUCA GUARDIANS</strong><span>Evidence first · Educational experience · V43 PREMIUM MISSION</span>';footer.querySelector('.wrap')?.appendChild(el);
  }
  function setupRouteObserver(){
    if(!('IntersectionObserver' in window))return;
    const meta=routeMeta.en;
    const targets=meta.map(x=>$(x.target)).filter(Boolean);
    const io=new IntersectionObserver(entries=>{
      entries.forEach(entry=>{if(!entry.isIntersecting||entry.intersectionRatio<.35)return;const id=meta.find(x=>$(x.target)===entry.target)?.id;if(!id)return;if(id==='legacy'&&!routeUnlocked('legacy'))return;visit(id);renderMap();});
    },{threshold:[.35]});
    targets.forEach(t=>io.observe(t));
  }
  function setupApplyLanguage(){
    if(!window.applyLanguage||window.applyLanguage.__v43)return;
    const original=window.applyLanguage;
    const wrapped=function(){original.apply(this,arguments);setTimeout(()=>{renderMap();refreshProfile();fillAISuggestions();enhanceMoves();enhanceLegacy();updateChallengeCopy();},0)};
    wrapped.__v43=true;window.applyLanguage=wrapped;
  }
  function updateChallengeCopy(){
    const meta=$('v43ChallengeMeta');if(meta){const es=currentLang()==='es';meta.querySelector('strong').textContent=es?'DESAFÍO DEL GUARDIÁN · MODO EVIDENCIA':'GUARDIAN CHALLENGE · EVIDENCE MODE';meta.querySelector('small').textContent=es?'Elige → Siguiente → comprueba':'Select → Next → review'}
    const sig=$('v43AnswerSignal');if(sig&&!document.querySelector('#options .selected'))sig.textContent=currentLang()==='es'?'Elige una respuesta. La evaluación aparece al pulsar Siguiente.':'Choose an answer. Feedback appears after you press Next.';
  }
  function play(kind){try{window.playFX?.(kind)}catch(e){}}
  function preload(){Object.values(BADGES).forEach(src=>{const i=new Image();i.src=src})}
  function init(){
    document.documentElement.dataset.aerisVersion='43';
    ensureProfileSignal();ensureMap();ensureMapOnce();renderMap();refreshProfile();enhanceLab();enhanceChallenge();enhanceAI();fillAISuggestions();aiFooter();enhanceLegacy();enhanceMoves();enhanceFooter();setupRouteObserver();setupApplyLanguage();preload();updateChallengeCopy();
    const originalFinish=window.finish;
    if(typeof originalFinish==='function'&&!originalFinish.__v43){
      const wrapped=function(){originalFinish.apply(this,arguments);setTimeout(()=>{enhanceResult();refreshProfile();renderMap();},90)};wrapped.__v43=true;window.finish=wrapped;
    }
    const originalChoose=window.choose;
    if(typeof originalChoose==='function'&&!originalChoose.__v43){/* Keep selection behavior untouched; the challenge signal is event-driven. */}
    window.addEventListener('aeris:state',()=>{refreshProfile();renderMap()});
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})();
